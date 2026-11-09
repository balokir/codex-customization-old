// Detect Codex's own truncation warning in completed Bash output.
// Unrelated, malformed, and unsupported responses pass through unchanged.
const MAX_INPUT_BYTES = 1024 * 1024;
const TRUNCATED = /(?:^|\r?\n)[ \t]*Warning: truncated output \(original token count: [0-9]+\)(?:\r?\n|$)/u;
const REASON = "Tool output was truncated and is incomplete. Retry with smaller, explicitly bounded output; do not treat the previous result as complete.";

async function readBounded() {
  let bytes = 0;
  const chunks = [];
  for await (const chunk of process.stdin) {
    bytes += chunk.length;
    if (bytes > MAX_INPUT_BYTES) return null;
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

const raw = await readBounded();
if (raw !== null) {
  let event;
  try {
    event = JSON.parse(raw);
  } catch {
    // Malformed input: avoid affecting tool execution.
  }
  if (event?.hook_event_name === "PostToolUse"
      && event.tool_name === "Bash"
      && typeof event.tool_response === "string"
      && TRUNCATED.test(event.tool_response)) {
    process.stdout.write(JSON.stringify({ decision: "block", reason: REASON }) + "\n");
  }
}
