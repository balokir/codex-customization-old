import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const script = fileURLToPath(new URL("../post_tool_use_probe.mjs", import.meta.url));
const fixtureDir = mkdtempSync(join(tmpdir(), "post-hook-probe-"));
const file = join(fixtureDir, "codex-posttooluse-probe-20261108.json");
const env = { ...process.env, TMPDIR: fixtureDir, TMP: fixtureDir, TEMP: fixtureDir };
const base = {
  hook_event_name: "PostToolUse",
  tool_name: "Bash",
  tool_input: { command: "Write-Output 'CPTD-POST-20261108-PROBE'" },
};
function invoke(input) {
  const proc = spawnSync(process.execPath, [script], {
    input: typeof input === "string" ? input : JSON.stringify(input),
    encoding: "utf8", env,
  });
  assert.equal(proc.status, 0, proc.stderr);
  assert.equal(proc.stdout, "");
  assert.equal(proc.stderr, "");
}
function record() {
  return JSON.parse(readFileSync(file, "utf8"));
}
try {
  invoke({ ...base, tool_response: { output: "ok", exit_code: 0, secret: "do not log" } });
  assert.equal(record().truncation_marker_present, false);
  assert.equal(record().response_type, "object");
  assert.deepEqual(record().response_keys, ["output", "exit_code"]);
  assert.equal(readFileSync(file, "utf8").includes("do not log"), false);
  invoke({ ...base, tool_response: { content: [{ type: "text", text: "Warning: truncated output (original token count: 50000)" }] } });
  assert.equal(record().truncation_marker_present, true);
  invoke({ ...base, tool_response: ["truncated output"] });
  assert.equal(record().response_type, "array");
  assert.equal(record().truncation_marker_present, true);
  invoke({ ...base, tool_response: "ok" });
  assert.equal(record().truncation_marker_present, false);
  const baseline = readFileSync(file, "utf8");
  invoke({ ...base, tool_input: { command: "Write-Output 'other'" }, tool_response: "Warning: truncated output" });
  assert.equal(readFileSync(file, "utf8"), baseline);
  invoke("{malformed");
  assert.equal(readFileSync(file, "utf8"), baseline);
  invoke("x".repeat(1024 * 1024 + 1));
  assert.equal(readFileSync(file, "utf8"), baseline);
  invoke({ ...base, hook_event_name: "PreToolUse", tool_response: "Warning: truncated output" });
  assert.equal(readFileSync(file, "utf8"), baseline);
  assert.equal(existsSync(file), true);
  console.log("PostToolUse probe: 8 fixture groups passed");
} finally {
  rmSync(fixtureDir, { recursive: true, force: true });
}
