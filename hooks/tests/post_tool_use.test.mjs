import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const HOOK = fileURLToPath(new URL("../post_tool_use.mjs", import.meta.url));
const warning = "Warning: truncated output (original token count: 15843)\nTotal output lines: 6001\nrow 05999";
const base = {
  hook_event_name: "PostToolUse",
  tool_name: "Bash",
  tool_input: { command: "Get-Content -Raw notes.txt" },
  tool_response: "ordinary complete output",
};
let cases = 0;
function invoke(input) {
  const result = spawnSync(process.execPath, [HOOK], {
    input: typeof input === "string" ? input : JSON.stringify(input),
    encoding: "utf8",
    windowsHide: true,
  });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stderr, "");
  return result.stdout;
}
function allow(label, payload) {
  assert.equal(invoke(payload), "", label);
  cases++;
}
function deny(label, payload) {
  const result = invoke(payload);
  const output = JSON.parse(result);
  assert.deepEqual(Object.keys(output), ["decision", "reason"], label);
  assert.equal(output.decision, "block", label);
  assert.match(output.reason, /truncated.*incomplete/u, label);
  assert.equal(result.includes("notes.txt"), false, label);
  cases++;
}
allow("normal output", base);
deny("truncation warning", { ...base, tool_response: warning });
deny("warning after command metadata", { ...base, tool_response: "Wall time: 2.0s\nOutput:\n" + warning });
deny("CRLF warning", { ...base, tool_response: warning.replaceAll("\n", "\r\n") });
deny("no special canary required", { ...base, tool_input: { command: "Get-Content server.log" }, tool_response: warning });
allow("normal phrase", { ...base, tool_response: "output was truncated earlier" });
allow("warning is not a standalone line", { ...base, tool_response: "log: Warning: truncated output (original token count: 15843)\nTotal output lines: 6001" });
allow("quoted source line", { ...base, tool_response: "const x = 'Warning: truncated output (original token count: 15843)';" });
allow("no token count", { ...base, tool_response: "Warning: truncated output" });
allow("wrong hook event", { ...base, hook_event_name: "PreToolUse", tool_response: warning });
allow("wrong tool", { ...base, tool_name: "functions.exec", tool_response: warning });
allow("unexpected response object", { ...base, tool_response: { output: warning } });
allow("missing response", { ...base, tool_response: undefined });
allow("malformed JSON", "{not-json");
allow("oversized event", "x".repeat(1024 * 1024 + 1));
allow("empty input", "");
console.log("PostToolUse output completeness: " + cases + " fixtures passed");
