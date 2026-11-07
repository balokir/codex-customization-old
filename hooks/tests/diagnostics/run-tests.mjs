import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";

const TEST_DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(TEST_DIR, "..", "..", "..");
const HANDLER = join(ROOT, "hooks", "diagnostics", "pre_tool_use_diagnostic.mjs");
const TRANSPORT_CONFIG = join(ROOT, "hooks", "diagnostics", "hooks.transport-deny.json");
const PROXY_CONFIG = join(ROOT, "hooks", "diagnostics", "hooks.engine-proxy.json");
const SPEC_PATH = join(ROOT, "hooks", "diagnostics", "probe-spec.json");
const ENGINE = join(ROOT, "hooks", "pre_tool_use.mjs");
const RUNTIME = "C:\\nvm4w\\nodejs\\node.exe";
const EVIDENCE_LIMIT_BYTES = 4096;
const SECRET_COMMAND = "CPTD-SECRET-COMMAND-MUST-NOT-PERSIST";
const SECRET_PAYLOAD = "CPTD-SECRET-PAYLOAD-MUST-NOT-PERSIST";

function sha256Text(value) {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function sha256File(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function markerCommand(parts) {
  return `$null = '${parts.join("-")}'`;
}

const benignCommand = markerCommand(["CPTD", "BENIGN", "20261108", "901D7E"]);
const transportCommand = markerCommand(["CPTD", "TRANSPORT", "20261108", "6F3A2C"]);
const engineCommand = [
  `$null = Get-Content -Raw -LiteralPath '${join(ROOT, "hooks", "policy.json")}'`,
  `$null = Get-Content -Raw -LiteralPath '${join(ROOT, "hooks", "hooks.json")}'`,
].join("; ");

const spec = JSON.parse(readFileSync(SPEC_PATH, "utf8"));
const transportConfig = JSON.parse(readFileSync(TRANSPORT_CONFIG, "utf8"));
const proxyConfig = JSON.parse(readFileSync(PROXY_CONFIG, "utf8"));

assert.equal(spec.cliVersion, "0.159.0");
assert.equal(spec.independentRuntime, RUNTIME);
assert.equal(spec.matcher, "^Bash$");
assert.equal(spec.evidenceLimitBytes, EVIDENCE_LIMIT_BYTES);
assert.equal(spec.probes.benign.commandLength, benignCommand.length);
assert.equal(spec.probes.benign.commandSha256, sha256Text(benignCommand));
assert.equal(spec.probes.transportDeny.commandLength, transportCommand.length);
assert.equal(spec.probes.transportDeny.commandSha256, sha256Text(transportCommand));
assert.equal(spec.probes.engineProxy.commandLength, engineCommand.length);
assert.equal(spec.probes.engineProxy.commandSha256, sha256Text(engineCommand));
assert.deepEqual(spec.sessionModes.map((mode) => mode.label), [
  "exec-default-fresh",
  "exec-ephemeral-fresh",
  "interactive-fresh",
]);

for (const [config, branch] of [
  [transportConfig, "transport-deny"],
  [proxyConfig, "engine-proxy"],
]) {
  const matcherGroup = config.hooks?.PreToolUse?.[0];
  const handler = matcherGroup?.hooks?.[0];
  assert.equal(matcherGroup.matcher, "^Bash$");
  assert.equal(handler.type, "command");
  assert.equal(handler.commandWindows, handler.command);
  assert.equal(handler.timeout, 5);
  assert.match(handler.command, /^"C:\\nvm4w\\nodejs\\node\.exe"/u);
  assert.match(handler.command, new RegExp(`--branch ${branch}`, "u"));
  assert.equal(handler.command.includes(resolve(HANDLER)), true);
}
assert.equal(proxyConfig.hooks.PreToolUse[0].hooks[0].command.includes(resolve(ENGINE)), true);

const fixtureRoot = mkdtempSync(join(tmpdir(), "codex-pretooluse-diagnostic-fixture-"));
const evidenceDir = join(fixtureRoot, "evidence");
writeFileSync(join(fixtureRoot, "sentinel.txt"), "preserve", "utf8");
await import("node:fs").then(({ mkdirSync }) => mkdirSync(evidenceDir));

function envelope(command, overrides = {}) {
  return {
    hook_event_name: "PreToolUse",
    tool_name: "Bash",
    tool_input: { command },
    ...overrides,
  };
}

function invoke({
  branch,
  input,
  probeId,
  expectedSha256,
  engine = ENGINE,
  hookSha256 = sha256File(branch === "engine-proxy" ? PROXY_CONFIG : TRANSPORT_CONFIG),
}) {
  const args = [HANDLER, "--branch", branch];
  if (branch === "engine-proxy") args.push("--engine", engine);
  return spawnSync(RUNTIME, args, {
    input: typeof input === "string" ? input : JSON.stringify(input),
    encoding: null,
    windowsHide: true,
    env: {
      ...process.env,
      CODEX_HOOK_DIAGNOSTIC_EVIDENCE_DIR: evidenceDir,
      CODEX_HOOK_DIAGNOSTIC_PROBE_ID: probeId,
      CODEX_HOOK_DIAGNOSTIC_SESSION_MODE: "fixture",
      CODEX_HOOK_DIAGNOSTIC_CLI_VERSION: spec.cliVersion,
      CODEX_HOOK_DIAGNOSTIC_HOOK_SHA256: hookSha256,
      CODEX_HOOK_DIAGNOSTIC_TRUST_CLASS: "fixture",
      CODEX_HOOK_DIAGNOSTIC_EXPECTED_SHA256: expectedSha256,
    },
  });
}

function evidence(probeId) {
  const path = join(evidenceDir, `${probeId}.json`);
  assert.equal(existsSync(path), true, `missing evidence for ${probeId}`);
  assert.ok(statSync(path).size <= EVIDENCE_LIMIT_BYTES, `${probeId} evidence exceeded 4 KiB`);
  return {
    path,
    text: readFileSync(path, "utf8"),
    value: JSON.parse(readFileSync(path, "utf8")),
  };
}

const evidenceKeys = [
  "cli_version",
  "command_length",
  "command_sha256",
  "command_type",
  "decision_class",
  "diagnostic_branch",
  "event_json_type",
  "handler_exit_code",
  "hook_event_name",
  "hook_source_sha256",
  "host_outcome",
  "invocation_count",
  "matcher",
  "output_json_key_names",
  "probe_id",
  "reason_code",
  "session_mode",
  "shape_class",
  "tool_input_json_type",
  "tool_input_keys",
  "tool_name",
  "trust_class",
].sort();

try {
  const deny = invoke({
    branch: "transport-deny",
    input: envelope(transportCommand),
    probeId: "transport-deny",
    expectedSha256: spec.probes.transportDeny.commandSha256,
  });
  assert.equal(deny.status, 0, deny.stderr.toString("utf8"));
  assert.equal(deny.stderr.length, 0);
  const denyOutput = JSON.parse(deny.stdout.toString("utf8"));
  assert.deepEqual(Object.keys(denyOutput), ["hookSpecificOutput"]);
  assert.deepEqual(Object.keys(denyOutput.hookSpecificOutput), [
    "hookEventName",
    "permissionDecision",
    "permissionDecisionReason",
  ]);
  assert.equal(denyOutput.hookSpecificOutput.hookEventName, "PreToolUse");
  assert.equal(denyOutput.hookSpecificOutput.permissionDecision, "deny");
  assert.equal(denyOutput.hookSpecificOutput.permissionDecisionReason, "diagnostic-transport-deny");
  const denyEvidence = evidence("transport-deny");
  assert.deepEqual(Object.keys(denyEvidence.value).sort(), evidenceKeys);
  assert.equal(denyEvidence.value.shape_class, "expected-raw");
  assert.equal(denyEvidence.value.command_sha256, spec.probes.transportDeny.commandSha256);
  assert.equal(denyEvidence.value.decision_class, "deny");
  assert.equal(denyEvidence.value.reason_code, "transport-deny");

  const benign = invoke({
    branch: "transport-deny",
    input: envelope(benignCommand),
    probeId: "benign",
    expectedSha256: spec.probes.transportDeny.commandSha256,
  });
  assert.equal(benign.status, 0, benign.stderr.toString("utf8"));
  assert.equal(benign.stdout.length, 0);
  const benignEvidence = evidence("benign").value;
  assert.equal(benignEvidence.shape_class, "other");
  assert.equal(benignEvidence.command_sha256, null);
  assert.equal(benignEvidence.decision_class, "allow");

  const wrapperProbe = "wrapper-shape";
  const wrapper = invoke({
    branch: "transport-deny",
    input: envelope(`pwsh.exe -Command ${SECRET_COMMAND}`),
    probeId: wrapperProbe,
    expectedSha256: spec.probes.transportDeny.commandSha256,
  });
  assert.equal(wrapper.status, 0, wrapper.stderr.toString("utf8"));
  assert.equal(wrapper.stdout.length, 0);
  const wrapperEvidence = evidence(wrapperProbe);
  assert.equal(wrapperEvidence.value.shape_class, "pwsh-wrapper");
  assert.equal(wrapperEvidence.text.includes(SECRET_COMMAND), false);

  const missing = invoke({
    branch: "transport-deny",
    input: { hook_event_name: "PreToolUse", tool_name: "Bash", tool_input: {} },
    probeId: "missing-command",
    expectedSha256: spec.probes.transportDeny.commandSha256,
  });
  assert.equal(missing.status, 0);
  assert.equal(evidence("missing-command").value.shape_class, "missing");

  const nonString = invoke({
    branch: "transport-deny",
    input: envelope({ nested: SECRET_PAYLOAD }),
    probeId: "non-string-command",
    expectedSha256: spec.probes.transportDeny.commandSha256,
  });
  assert.equal(nonString.status, 0);
  const nonStringEvidence = evidence("non-string-command");
  assert.equal(nonStringEvidence.value.shape_class, "non-string");
  assert.equal(nonStringEvidence.value.command_type, "object");
  assert.equal(nonStringEvidence.text.includes(SECRET_PAYLOAD), false);

  const malformed = invoke({
    branch: "transport-deny",
    input: `{not-json:${SECRET_PAYLOAD}`,
    probeId: "malformed-json",
    expectedSha256: spec.probes.transportDeny.commandSha256,
  });
  assert.equal(malformed.status, 0);
  const malformedEvidence = evidence("malformed-json");
  assert.equal(malformedEvidence.value.event_json_type, "invalid-json");
  assert.equal(malformedEvidence.value.shape_class, "missing");
  assert.equal(malformedEvidence.text.includes(SECRET_PAYLOAD), false);

  const manyKeys = Object.fromEntries(Array.from(
    { length: 200 },
    (_, index) => [`key-${String(index).padStart(3, "0")}`, SECRET_PAYLOAD],
  ));
  const bounded = invoke({
    branch: "transport-deny",
    input: envelope(SECRET_COMMAND, { tool_input: { command: SECRET_COMMAND, ...manyKeys } }),
    probeId: "bounded-evidence",
    expectedSha256: spec.probes.transportDeny.commandSha256,
  });
  assert.equal(bounded.status, 0);
  const boundedEvidence = evidence("bounded-evidence");
  assert.ok(boundedEvidence.value.tool_input_keys.length <= 24);
  assert.equal(boundedEvidence.text.includes(SECRET_COMMAND), false);
  assert.equal(boundedEvidence.text.includes(SECRET_PAYLOAD), false);

  const repeatedInput = envelope(benignCommand);
  invoke({
    branch: "transport-deny",
    input: repeatedInput,
    probeId: "invocation-count",
    expectedSha256: spec.probes.transportDeny.commandSha256,
  });
  invoke({
    branch: "transport-deny",
    input: repeatedInput,
    probeId: "invocation-count",
    expectedSha256: spec.probes.transportDeny.commandSha256,
  });
  assert.equal(evidence("invocation-count").value.invocation_count, 2);

  for (const [name, input] of [
    ["proxy-deny", envelope(engineCommand)],
    ["proxy-allow", envelope(benignCommand)],
    ["proxy-guidance", `{not-json:${SECRET_PAYLOAD}`],
  ]) {
    const direct = spawnSync(RUNTIME, [ENGINE], {
      input: typeof input === "string" ? input : JSON.stringify(input),
      encoding: null,
      windowsHide: true,
    });
    const proxied = invoke({
      branch: "engine-proxy",
      input,
      probeId: name,
      expectedSha256: spec.probes.engineProxy.commandSha256,
    });
    assert.equal(proxied.status, direct.status, `${name} exit status changed`);
    assert.deepEqual(proxied.stdout, direct.stdout, `${name} stdout changed`);
    assert.deepEqual(proxied.stderr, direct.stderr, `${name} stderr changed`);
    const proxyEvidence = evidence(name);
    assert.equal(proxyEvidence.text.includes(SECRET_PAYLOAD), false);
    assert.equal(proxyEvidence.value.diagnostic_branch, "engine-proxy");
  }
  assert.equal(evidence("proxy-deny").value.decision_class, "deny");
  assert.equal(evidence("proxy-deny").value.shape_class, "expected-raw");
  assert.equal(evidence("proxy-allow").value.decision_class, "allow");
  assert.equal(evidence("proxy-guidance").value.decision_class, "guidance");

  const fakeEngine = join(fixtureRoot, "fake-engine.mjs");
  writeFileSync(
    fakeEngine,
    "process.stdout.write('fixed-stdout'); process.stderr.write('fixed-stderr'); process.exitCode = 7;\n",
    "utf8",
  );
  const directFake = spawnSync(RUNTIME, [fakeEngine], { input: "{}", encoding: null, windowsHide: true });
  const proxyFake = invoke({
    branch: "engine-proxy",
    input: "{}",
    probeId: "proxy-nonzero",
    expectedSha256: spec.probes.engineProxy.commandSha256,
    engine: fakeEngine,
  });
  assert.equal(proxyFake.status, directFake.status);
  assert.deepEqual(proxyFake.stdout, directFake.stdout);
  assert.deepEqual(proxyFake.stderr, directFake.stderr);
  assert.equal(evidence("proxy-nonzero").value.handler_exit_code, 7);
  assert.equal(evidence("proxy-nonzero").value.decision_class, "invalid-json");

  assert.equal(readFileSync(join(fixtureRoot, "sentinel.txt"), "utf8"), "preserve");
} finally {
  rmSync(fixtureRoot, { recursive: true, force: true });
}

assert.equal(existsSync(fixtureRoot), false);
console.log("I1: 16 diagnostic fixture groups passed");
