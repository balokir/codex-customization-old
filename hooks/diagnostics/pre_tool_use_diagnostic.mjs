import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  existsSync,
  readFileSync,
  realpathSync,
  writeFileSync,
} from "node:fs";
import { isAbsolute, join, relative } from "node:path";
import { tmpdir } from "node:os";

const EVIDENCE_LIMIT_BYTES = 4096;
const MATCHER = "^Bash$";
const TRANSPORT_REASON = "diagnostic-transport-deny";
const DENY_OUTPUT = Object.freeze({
  hookSpecificOutput: {
    hookEventName: "PreToolUse",
    permissionDecision: "deny",
    permissionDecisionReason: TRANSPORT_REASON,
  },
});

function jsonType(value) {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}

function safeLabel(value, fallback) {
  return typeof value === "string" && /^[A-Za-z0-9._-]{1,80}$/u.test(value)
    ? value
    : fallback;
}

function safeSha256(value) {
  return typeof value === "string" && /^[a-f0-9]{64}$/u.test(value)
    ? value
    : null;
}

function safeCorrelationId(value) {
  return typeof value === "string" && /^[A-Za-z0-9._:-]{1,160}$/u.test(value)
    ? value
    : null;
}

function boundedKeys(value) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return [];
  }
  return Object.keys(value)
    .filter((key) => key.length <= 64)
    .sort()
    .slice(0, 24);
}

function sha256Text(value) {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function sha256File(path) {
  return typeof path === "string" && isAbsolute(path) && existsSync(path)
    ? createHash("sha256").update(readFileSync(path)).digest("hex")
    : null;
}

function readSpec(path) {
  if (typeof path !== "string" || !isAbsolute(path) || !existsSync(path)) return null;
  try {
    const parsed = JSON.parse(readFileSync(path, "utf8"));
    const target = parsed?.targetAcp;
    const valid = target !== null && typeof target === "object"
      && typeof target.configuredCommand === "string"
      && safeSha256(target.configuredCommandSha256) !== null
      && safeLabel(target.adapterVersion, null) !== null
      && safeSha256(target.entryModuleSha256) !== null
      && safeLabel(target.bundledCodexVersion, null) !== null
      && safeSha256(target.bundledCodexSha256) !== null
      && safeSha256(parsed?.probes?.benign?.commandSha256) !== null
      && safeSha256(parsed?.probes?.transportDeny?.commandSha256) !== null
      && safeSha256(parsed?.probes?.engineProxy?.commandSha256) !== null;
    return valid ? parsed : null;
  } catch {
    return null;
  }
}

function normalizedEventName(envelope) {
  if (envelope === null || typeof envelope !== "object" || Array.isArray(envelope)
      || !("hook_event_name" in envelope)) {
    return "missing";
  }
  if (typeof envelope.hook_event_name !== "string") return "non-string";
  return envelope.hook_event_name === "PreToolUse" ? "PreToolUse" : "other";
}

function normalizedToolName(envelope) {
  if (envelope === null || typeof envelope !== "object" || Array.isArray(envelope)
      || !("tool_name" in envelope)) {
    return "missing";
  }
  if (typeof envelope.tool_name !== "string") return "non-string";
  return envelope.tool_name === "Bash" ? "Bash" : "other";
}

function classifyCommand(envelope, expectedSha256s) {
  const toolInput = envelope !== null && typeof envelope === "object"
    && !Array.isArray(envelope)
    ? envelope.tool_input
    : undefined;
  if (toolInput === null || typeof toolInput !== "object" || Array.isArray(toolInput)
      || !("command" in toolInput)) {
    return {
      commandType: "missing",
      commandLength: null,
      commandSha256: null,
      shapeClass: "missing",
    };
  }
  if (typeof toolInput.command !== "string") {
    return {
      commandType: jsonType(toolInput.command),
      commandLength: null,
      commandSha256: null,
      shapeClass: "non-string",
    };
  }

  const commandSha256 = sha256Text(toolInput.command);
  if (expectedSha256s.includes(commandSha256)) {
    return {
      commandType: "string",
      commandLength: toolInput.command.length,
      commandSha256,
      shapeClass: "expected-raw",
    };
  }

  const wrapper = /^\s*(?:"[^"]*\\)?(?:pwsh|powershell)(?:\.exe)?"?\s+(?:-[A-Za-z]+\s+)*-Command\b/iu
    .test(toolInput.command);
  return {
    commandType: "string",
    commandLength: toolInput.command.length,
    commandSha256: null,
    shapeClass: wrapper ? "pwsh-wrapper" : "other",
  };
}

function outputMetadata(stdout) {
  if (stdout.length === 0) {
    return {
      topLevelKeys: [],
      hookSpecificKeys: [],
      decisionClass: "allow",
    };
  }

  let parsed;
  try {
    parsed = JSON.parse(stdout.toString("utf8"));
  } catch {
    return {
      topLevelKeys: [],
      hookSpecificKeys: [],
      decisionClass: "invalid-json",
    };
  }

  const topLevelKeys = boundedKeys(parsed);
  const hookSpecific = parsed !== null && typeof parsed === "object"
    && !Array.isArray(parsed)
    ? parsed.hookSpecificOutput
    : undefined;
  const hookSpecificKeys = boundedKeys(hookSpecific);
  let decisionClass = "other-json";
  if (hookSpecific?.permissionDecision === "deny" || parsed?.decision === "block") {
    decisionClass = "deny";
  } else if (typeof hookSpecific?.additionalContext === "string") {
    decisionClass = "guidance";
  } else if (hookSpecific?.permissionDecision === "allow") {
    decisionClass = "allow";
  }
  return { topLevelKeys, hookSpecificKeys, decisionClass };
}

function evidenceDirectory(configured) {
  if (typeof configured !== "string" || configured.length === 0) return null;
  if (!existsSync(configured)) return null;
  const resolvedDirectory = realpathSync(configured);
  const resolvedTemp = realpathSync(tmpdir());
  const fromTemp = relative(resolvedTemp, resolvedDirectory);
  if (fromTemp === "" || fromTemp.startsWith("..") || isAbsolute(fromTemp)) return null;
  return resolvedDirectory;
}

function baseEvidence(
  envelope,
  branch,
  command,
  output,
  reasonCode,
  exitCode,
  probeId,
  spec,
  hookSourceSha256,
  chatPhase,
) {
  const toolInput = envelope !== null && typeof envelope === "object"
    && !Array.isArray(envelope)
    ? envelope.tool_input
    : undefined;
  return {
    probe_id: probeId,
    configured_acp_command: spec.targetAcp.configuredCommand,
    configured_acp_command_sha256: spec.targetAcp.configuredCommandSha256,
    adapter_version: spec.targetAcp.adapterVersion,
    acp_entry_sha256: spec.targetAcp.entryModuleSha256,
    bundled_codex_version: spec.targetAcp.bundledCodexVersion,
    bundled_codex_sha256: spec.targetAcp.bundledCodexSha256,
    chat_phase: safeLabel(chatPhase, "unknown"),
    acp_session_id: safeCorrelationId(envelope?.session_id),
    acp_turn_id: safeCorrelationId(envelope?.turn_id),
    hook_source_sha256: hookSourceSha256,
    matcher: MATCHER,
    synchronous: true,
    timeout_seconds: 5,
    trust_class: "runtime-unobserved",
    invocation_count: 1,
    hook_event_name: normalizedEventName(envelope),
    tool_name: normalizedToolName(envelope),
    event_json_type: envelope === undefined ? "invalid-json" : jsonType(envelope),
    tool_input_json_type: jsonType(toolInput),
    tool_input_keys: boundedKeys(toolInput),
    command_type: command.commandType,
    command_length: command.commandLength,
    command_sha256: command.commandSha256,
    shape_class: command.shapeClass,
    diagnostic_branch: branch,
    handler_exit_code: exitCode,
    output_json_key_names: {
      top_level: output.topLevelKeys,
      hook_specific: output.hookSpecificKeys,
    },
    decision_class: output.decisionClass,
    reason_code: reasonCode,
    host_outcome: "unknown",
  };
}

function writeEvidence(record, configuredDirectory) {
  const directory = evidenceDirectory(configuredDirectory);
  if (directory === null) return;
  const path = join(directory, `${record.probe_id}.json`);
  if (existsSync(path)) {
    try {
      const previous = JSON.parse(readFileSync(path, "utf8"));
      if (Number.isSafeInteger(previous.invocation_count) && previous.invocation_count > 0) {
        record.invocation_count = previous.invocation_count + 1;
      }
    } catch {
      // Replace invalid task-owned evidence with the current bounded record.
    }
  }
  const serialized = `${JSON.stringify(record)}\n`;
  if (Buffer.byteLength(serialized, "utf8") > EVIDENCE_LIMIT_BYTES) {
    throw new Error("diagnostic evidence exceeded 4 KiB");
  }
  writeFileSync(path, serialized, { encoding: "utf8", flag: "w" });
}

function tryWriteEvidence(record, configuredDirectory) {
  try {
    writeEvidence(record, configuredDirectory);
  } catch {
    // Evidence failures must not change the handler or proxied ENGINE result.
  }
}

function readEnvelope(rawInput) {
  try {
    return JSON.parse(rawInput.toString("utf8"));
  } catch {
    return undefined;
  }
}

function parseArguments(argv) {
  const result = {
    branch: null,
    engine: null,
    spec: null,
    hookSource: null,
    evidenceDir: null,
    chatPhase: null,
    probeId: null,
  };
  const options = new Map([
    ["--branch", "branch"],
    ["--engine", "engine"],
    ["--spec", "spec"],
    ["--hook-source", "hookSource"],
    ["--evidence-dir", "evidenceDir"],
    ["--chat-phase", "chatPhase"],
    ["--probe-id", "probeId"],
  ]);
  for (let index = 0; index < argv.length; index += 1) {
    const property = options.get(argv[index]);
    if (property !== undefined) result[property] = argv[index + 1] ?? null;
  }
  return result;
}

function selectedTransportProbe(command, spec, fixtureProbeId) {
  const fixture = safeLabel(fixtureProbeId, null);
  if (fixture !== null) return fixture;
  if (command.commandSha256 === spec.probes.transportDeny.commandSha256) {
    return spec.probes.transportDeny.probeId;
  }
  if (command.commandSha256 === spec.probes.benign.commandSha256) {
    return spec.probes.benign.probeId;
  }
  return null;
}

function runTransport(rawInput, envelope, args, spec) {
  if (spec === null) return;
  const expectedSha256s = [
    spec.probes.benign.commandSha256,
    spec.probes.transportDeny.commandSha256,
  ];
  const command = classifyCommand(envelope, expectedSha256s);
  const shouldDeny = normalizedEventName(envelope) === "PreToolUse"
    && normalizedToolName(envelope) === "Bash"
    && command.commandSha256 === spec.probes.transportDeny.commandSha256;
  const stdout = shouldDeny ? Buffer.from(`${JSON.stringify(DENY_OUTPUT)}\n`, "utf8") : Buffer.alloc(0);
  const output = outputMetadata(stdout);
  const probeId = selectedTransportProbe(command, spec, args.probeId);
  if (probeId !== null) {
    const evidence = baseEvidence(
      envelope,
      "transport-deny",
      command,
      output,
      shouldDeny ? "transport-deny" : "transport-allow",
      0,
      probeId,
      spec,
      sha256File(args.hookSource),
      args.chatPhase,
    );
    tryWriteEvidence(evidence, args.evidenceDir);
  }
  if (stdout.length > 0) process.stdout.write(stdout);
}

function runEngineProxy(rawInput, envelope, args, spec) {
  const expectedSha256s = spec === null ? [] : [spec.probes.engineProxy.commandSha256];
  const command = classifyCommand(envelope, expectedSha256s);
  const enginePath = args.engine;
  const result = typeof enginePath === "string" && isAbsolute(enginePath)
    ? spawnSync(process.execPath, [enginePath], {
        input: rawInput,
        encoding: null,
        windowsHide: true,
        maxBuffer: 1024 * 1024,
      })
    : { status: 1, stdout: Buffer.alloc(0), stderr: Buffer.alloc(0), error: new Error("invalid engine") };
  const stdout = Buffer.isBuffer(result.stdout) ? result.stdout : Buffer.alloc(0);
  const stderr = Buffer.isBuffer(result.stderr) ? result.stderr : Buffer.alloc(0);
  const exitCode = Number.isInteger(result.status) ? result.status : 1;
  const output = outputMetadata(stdout);
  const reasonCode = result.error
    ? "engine-error"
    : output.decisionClass === "deny"
      ? "engine-deny"
      : output.decisionClass === "guidance"
        ? "engine-guidance"
        : output.decisionClass === "allow"
          ? "engine-allow"
          : "engine-other";
  const fixtureProbeId = safeLabel(args.probeId, null);
  const probeId = spec === null
    ? null
    : fixtureProbeId !== null
      ? fixtureProbeId
      : command.commandSha256 === spec.probes.engineProxy.commandSha256
      ? spec.probes.engineProxy.probeId
      : null;
  if (probeId !== null) {
    const evidence = baseEvidence(
      envelope,
      "engine-proxy",
      command,
      output,
      reasonCode,
      exitCode,
      probeId,
      spec,
      sha256File(args.hookSource),
      args.chatPhase,
    );
    tryWriteEvidence(evidence, args.evidenceDir);
  }
  if (stdout.length > 0) process.stdout.write(stdout);
  if (stderr.length > 0) process.stderr.write(stderr);
  process.exitCode = exitCode;
}

const rawInput = readFileSync(0);
const envelope = readEnvelope(rawInput);
const args = parseArguments(process.argv.slice(2));
const spec = readSpec(args.spec);

if (args.branch === "transport-deny") {
  runTransport(rawInput, envelope, args, spec);
} else if (args.branch === "engine-proxy") {
  runEngineProxy(rawInput, envelope, args, spec);
} else {
  process.exitCode = 1;
}
