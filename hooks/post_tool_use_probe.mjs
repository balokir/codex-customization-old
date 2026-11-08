import { writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Temporary diagnostic only. Never changes the completed tool result.
const PROBE_ID = "CPTD-POST-20261108-PROBE";
const EVIDENCE_NAME = "codex-posttooluse-probe-20261108.json";
const MAX_INPUT_BYTES = 1024 * 1024;
const TRUNCATION_MARKER = /\b(?:warning\s*:\s*truncated output|output (?:was |has been )?truncated|truncated output)\b/iu;
const RECOGNIZED_KEYS = new Set([
  "output", "stdout", "stderr", "content", "text", "exit_code",
  "exitCode", "aggregated_output", "isError", "truncated",
  "original_token_count", "originalTokenCount", "total_lines",
]);

async function readBoundedInput() {
  const chunks = [];
  let bytes = 0;
  for await (const chunk of process.stdin) {
    bytes += chunk.length;
    if (bytes > MAX_INPUT_BYTES) return null;
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

async function main() {
  const raw = await readBoundedInput();
  if (raw === null) return;
  let event;
  try {
    event = JSON.parse(raw);
  } catch {
    return;
  }
  if (event?.hook_event_name !== "PostToolUse" || event?.tool_name !== "Bash"
      || typeof event?.tool_input?.command !== "string"
      || !event.tool_input.command.includes(PROBE_ID)) return;

  const response = event.tool_response;
  const serialized = response === undefined ? "" : JSON.stringify(response);
  const record = {
    probe: PROBE_ID,
    event: "PostToolUse",
    tool: "Bash",
    response_present: response !== undefined,
    response_type: response === null ? "null"
      : Array.isArray(response) ? "array" : typeof response,
    response_bytes: Buffer.byteLength(serialized, "utf8"),
    response_keys: response && typeof response === "object" && !Array.isArray(response)
      ? Object.keys(response).filter((key) => RECOGNIZED_KEYS.has(key)).slice(0, 16)
      : [],
    truncation_marker_present: TRUNCATION_MARKER.test(serialized),
  };

  // No command, path, raw response, model metadata, or credentials are retained.
  try {
    writeFileSync(join(tmpdir(), EVIDENCE_NAME), JSON.stringify(record) + "\n", {
      encoding: "utf8", flag: "w", mode: 0o600,
    });
  } catch {
    // The diagnostic must not change tool execution or model-visible output.
  }
}

await main();
