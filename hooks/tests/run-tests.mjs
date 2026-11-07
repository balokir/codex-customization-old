import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ENGINE_URL = new URL("../pre_tool_use.mjs", import.meta.url);
const ENGINE_PATH = fileURLToPath(ENGINE_URL);
const SECRET_PAYLOAD = "E1_SECRET_PAYLOAD_7391";
const SECRET_METADATA = "E1_SECRET_METADATA_1842";

function invoke(input) {
  const result = spawnSync(process.execPath, [ENGINE_PATH], {
    input: typeof input === "string" ? input : JSON.stringify(input),
    encoding: "utf8",
    windowsHide: true,
  });

  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stderr, "");
  return result.stdout;
}

function assertEmpty(name, input) {
  assert.equal(invoke(input), "", `${name} should produce empty output`);
}

function assertGuidance(name, input) {
  const stdout = invoke(input);
  assert.notEqual(stdout, "", `${name} should produce guidance`);

  const output = JSON.parse(stdout);
  assert.deepEqual(Object.keys(output), ["hookSpecificOutput"]);
  assert.deepEqual(Object.keys(output.hookSpecificOutput), [
    "hookEventName",
    "additionalContext",
  ]);
  assert.equal(output.hookSpecificOutput.hookEventName, "PreToolUse");
  assert.equal(typeof output.hookSpecificOutput.additionalContext, "string");
  assert.ok(output.hookSpecificOutput.additionalContext.length > 0);
  assert.ok(output.hookSpecificOutput.additionalContext.length <= 240);
  assert.equal("permissionDecision" in output.hookSpecificOutput, false);
  assert.equal(stdout.includes(SECRET_PAYLOAD), false);
  assert.equal(stdout.includes(SECRET_METADATA), false);
}

const safeEnvelope = {
  session_id: "fixture-session",
  transcript_path: null,
  cwd: "C:\\fixture",
  hook_event_name: "PreToolUse",
  model: "fixture-model",
  permission_mode: "default",
  turn_id: "fixture-turn",
  tool_name: "Bash",
  tool_use_id: "fixture-tool-use",
  tool_input: { command: "Write-Output 'bounded fixture'" },
};

assertEmpty("recognized safe documented envelope", safeEnvelope);
assertEmpty("irrelevant event", {
  ...safeEnvelope,
  hook_event_name: "PostToolUse",
});
assertEmpty("supported code freeform shape", {
  ...safeEnvelope,
  tool_name: "functions.exec",
  tool_input: "text('bounded fixture')",
});
assertEmpty("supported code object shape", {
  ...safeEnvelope,
  tool_name: "functions.exec",
  tool_input: { code: "text('bounded fixture')" },
});
assertEmpty("supported structured shape", {
  ...safeEnvelope,
  tool_name: "mcp__fixture__read_file",
  tool_input: { path: "fixture.txt", offset: 0, limit: 10 },
});

assertGuidance("unknown tool", {
  ...safeEnvelope,
  tool_name: "UnknownFixtureTool",
  tool_input: { payload: SECRET_PAYLOAD },
  private_metadata: SECRET_METADATA,
});
assertGuidance("missing event", {
  tool_name: "Bash",
  tool_input: { command: SECRET_PAYLOAD },
  private_metadata: SECRET_METADATA,
});
assertGuidance("missing tool name", {
  ...safeEnvelope,
  tool_name: undefined,
  tool_input: { command: SECRET_PAYLOAD },
  private_metadata: SECRET_METADATA,
});
assertGuidance("missing tool input", {
  ...safeEnvelope,
  tool_input: undefined,
  private_metadata: SECRET_METADATA,
});
assertGuidance("malformed JSON", `{not-json:${SECRET_PAYLOAD}:${SECRET_METADATA}`);
assertGuidance("newer unsupported schema", {
  ...safeEnvelope,
  schema_version: 2,
  tool_input: { command: SECRET_PAYLOAD },
  private_metadata: SECRET_METADATA,
});
assertGuidance("invalid supported tool input", {
  ...safeEnvelope,
  tool_input: { command: { payload: SECRET_PAYLOAD } },
  private_metadata: SECRET_METADATA,
});
assertGuidance("oversized envelope", "x".repeat(65537) + SECRET_PAYLOAD + SECRET_METADATA);

console.log("E1: 13 fixture cases passed");
