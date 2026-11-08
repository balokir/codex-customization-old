import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  existsSync,
  mkdtempSync,
  readdirSync,
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
const ACP_SHIM = "C:\\nvm4w\\nodejs\\codex-acp.cmd";
const ACP_ENTRY = "C:\\nvm4w\\nodejs\\node_modules\\@agentclientprotocol\\codex-acp\\dist\\index.js";
const BUNDLED_CODEX = "C:\\nvm4w\\nodejs\\node_modules\\@agentclientprotocol\\codex-acp\\node_modules\\@openai\\codex-win32-x64\\vendor\\x86_64-pc-windows-msvc\\bin\\codex.exe";
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
  `$null = 'CPTD-ENGINE-20261108-BD8741'`,
  `$null = Get-Content -Raw -LiteralPath '${join(ROOT, "hooks", "policy.json")}'`,
  `$null = Get-Content -Raw -LiteralPath '${join(ROOT, "hooks", "hooks.json")}'`,
].join("; ");

const spec = JSON.parse(readFileSync(SPEC_PATH, "utf8"));
const transportConfig = JSON.parse(readFileSync(TRANSPORT_CONFIG, "utf8"));
const proxyConfig = JSON.parse(readFileSync(PROXY_CONFIG, "utf8"));

assert.equal(spec.targetAcp.configuredCommand, ACP_SHIM);
assert.equal(spec.targetAcp.configuredCommandSha256, sha256File(ACP_SHIM));
assert.equal(spec.targetAcp.adapterVersion, "2.5.0");
assert.equal(spec.targetAcp.entryModuleSha256, sha256File(ACP_ENTRY));
assert.equal(spec.targetAcp.bundledCodexVersion, "0.165.0");
assert.equal(spec.targetAcp.bundledCodexSha256, sha256File(BUNDLED_CODEX));
assert.equal(spec.independentRuntime, RUNTIME);
assert.equal(resolve(spec.evidenceDirectory).startsWith(resolve(tmpdir())), true);
assert.equal(spec.matcher, "^Bash$");
assert.equal(spec.synchronous, true);
assert.equal(spec.timeoutSeconds, 5);
assert.equal(spec.evidenceLimitBytes, EVIDENCE_LIMIT_BYTES);
assert.equal(spec.probes.benign.commandLength, benignCommand.length);
assert.equal(spec.probes.benign.commandSha256, sha256Text(benignCommand));
assert.equal(spec.probes.transportDeny.commandLength, transportCommand.length);
assert.equal(spec.probes.transportDeny.commandSha256, sha256Text(transportCommand));
assert.equal(spec.probes.engineProxy.commandLength, engineCommand.length);
assert.equal(spec.probes.engineProxy.commandSha256, sha256Text(engineCommand));
assert.deepEqual(spec.freshChatPhases.map((phase) => phase.label), [
  "c1-inactive-control",
  "c2-linked-discovery",
  "c2-trusted-transport",
  "c3-trusted-engine-first",
  "c3-trusted-engine-repeat",
  "c4-inactive-rollback",
]);
assert.equal(spec.freshChatPhases.slice(1).every((phase) => phase.requiresFreshChat), true);

for (const [config, branch] of [
  [transportConfig, "transport-deny"],
  [proxyConfig, "engine-proxy"],
]) {
  const matcherGroup = config.hooks?.PreToolUse?.[0];
  const handler = matcherGroup?.hooks?.[0];
  assert.equal(matcherGroup.matcher, "^Bash$");
  assert.equal(handler.type, "command");
  assert.equal(
    handler.commandWindows,
    handler.command.replace(`"${RUNTIME}"`, RUNTIME),
  );
  assert.equal(handler.timeout, 5);
  assert.match(handler.command, /^"C:\\nvm4w\\nodejs\\node\.exe"/u);
  assert.match(handler.command, new RegExp(`--branch ${branch}`, "u"));
  assert.equal(handler.command.includes(resolve(HANDLER)), true);
  assert.equal(handler.command.includes(`--spec \"${resolve(SPEC_PATH)}\"`), true);
  assert.equal(handler.command.includes(`--evidence-dir \"${resolve(spec.evidenceDirectory)}\"`), true);
  assert.equal(handler.command.includes("--hook-source"), true);
  assert.equal(handler.command.includes("--chat-phase"), true);
}
assert.equal(proxyConfig.hooks.PreToolUse[0].hooks[0].command.includes(resolve(ENGINE)), true);

const fixtureRoot = mkdtempSync(join(tmpdir(), "codex-pretooluse-diagnostic-fixture-"));
const evidenceDir = join(fixtureRoot, "evidence");
writeFileSync(join(fixtureRoot, "sentinel.txt"), "preserve", "utf8");
await import("node:fs").then(({ mkdirSync }) => mkdirSync(evidenceDir));

function envelope(command, overrides = {}) {
  return {
    session_id: "fixture-session",
    turn_id: "fixture-turn",
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
  engine = ENGINE,
}) {
  const hookSource = branch === "engine-proxy" ? PROXY_CONFIG : TRANSPORT_CONFIG;
  const args = [
    HANDLER,
    "--branch", branch,
    "--spec", SPEC_PATH,
    "--hook-source", hookSource,
    "--evidence-dir", evidenceDir,
    "--chat-phase", "fixture",
  ];
  if (probeId !== null) args.push("--probe-id", probeId);
  if (branch === "engine-proxy") args.push("--engine", engine);
  return spawnSync(RUNTIME, args, {
    input: typeof input === "string" ? input : JSON.stringify(input),
    encoding: null,
    windowsHide: true,
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
  "acp_entry_sha256",
  "acp_session_id",
  "acp_turn_id",
  "adapter_version",
  "bundled_codex_sha256",
  "bundled_codex_version",
  "chat_phase",
  "command_length",
  "command_sha256",
  "command_type",
  "configured_acp_command",
  "configured_acp_command_sha256",
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
  "shape_class",
  "synchronous",
  "timeout_seconds",
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
  assert.equal(denyEvidence.value.configured_acp_command, ACP_SHIM);
  assert.equal(denyEvidence.value.configured_acp_command_sha256, sha256File(ACP_SHIM));
  assert.equal(denyEvidence.value.adapter_version, "2.5.0");
  assert.equal(denyEvidence.value.acp_entry_sha256, sha256File(ACP_ENTRY));
  assert.equal(denyEvidence.value.bundled_codex_version, "0.165.0");
  assert.equal(denyEvidence.value.bundled_codex_sha256, sha256File(BUNDLED_CODEX));
  assert.equal(denyEvidence.value.acp_session_id, "fixture-session");
  assert.equal(denyEvidence.value.acp_turn_id, "fixture-turn");
  assert.equal(denyEvidence.value.hook_source_sha256, sha256File(TRANSPORT_CONFIG));
  assert.equal(denyEvidence.value.synchronous, true);
  assert.equal(denyEvidence.value.timeout_seconds, 5);

  const benign = invoke({
    branch: "transport-deny",
    input: envelope(benignCommand),
    probeId: "benign",
  });
  assert.equal(benign.status, 0, benign.stderr.toString("utf8"));
  assert.equal(benign.stdout.length, 0);
  const benignEvidence = evidence("benign").value;
  assert.equal(benignEvidence.shape_class, "expected-raw");
  assert.equal(benignEvidence.command_sha256, spec.probes.benign.commandSha256);
  assert.equal(benignEvidence.decision_class, "allow");

  const evidenceCountBeforeUnknown = readdirSync(evidenceDir).length;
  const unknown = invoke({
    branch: "transport-deny",
    input: envelope(SECRET_COMMAND),
    probeId: null,
  });
  assert.equal(unknown.status, 0, unknown.stderr.toString("utf8"));
  assert.equal(unknown.stdout.length, 0);
  assert.equal(readdirSync(evidenceDir).length, evidenceCountBeforeUnknown);

  for (const [probeId, overrides, expectedEvent, expectedTool] of [
    ["wrong-event", { hook_event_name: "PostToolUse" }, "other", "Bash"],
    ["wrong-tool", { tool_name: "apply_patch" }, "PreToolUse", "other"],
  ]) {
    const nonMatching = invoke({
      branch: "transport-deny",
      input: envelope(transportCommand, overrides),
      probeId,
    });
    assert.equal(nonMatching.status, 0, nonMatching.stderr.toString("utf8"));
    assert.equal(nonMatching.stdout.length, 0);
    const nonMatchingEvidence = evidence(probeId).value;
    assert.equal(nonMatchingEvidence.hook_event_name, expectedEvent);
    assert.equal(nonMatchingEvidence.tool_name, expectedTool);
    assert.equal(nonMatchingEvidence.decision_class, "allow");
    assert.equal(nonMatchingEvidence.reason_code, "transport-allow");
  }

  const wrapperProbe = "wrapper-shape";
  const wrapper = invoke({
    branch: "transport-deny",
    input: envelope(`pwsh.exe -Command ${SECRET_COMMAND}`),
    probeId: wrapperProbe,
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
  });
  assert.equal(missing.status, 0);
  assert.equal(evidence("missing-command").value.shape_class, "missing");

  const nonString = invoke({
    branch: "transport-deny",
    input: envelope({ nested: SECRET_PAYLOAD }),
    probeId: "non-string-command",
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
  });
  invoke({
    branch: "transport-deny",
    input: repeatedInput,
    probeId: "invocation-count",
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
console.log("C1: 19 ACP diagnostic fixture groups passed");
