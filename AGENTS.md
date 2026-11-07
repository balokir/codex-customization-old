# Global Agent Instructions

## Tool Output Integrity

These rules apply to every tool call, including instruction and skill loading:

- Bound potentially large output at the producer with file ranges, scoped searches, concise summaries, targeted diffs,
  counts, or log slices. Do not rely on the tool-execution envelope or a requested output-token limit to preserve
  oversized output.
- Never batch multiple complete `SKILL.md`, rule, log, report, or similarly potentially large files into one tool
  result. Read instruction and rule files individually.
- Keep at most one potentially high-volume result in a single `functions.exec` evaluation and leave capacity for
  wrapper metadata and other emitted content.
- Before reading an unknown or potentially large file completely, inspect its byte size or line count. Read large
  evidence in deterministic sequential portions and verify continuous coverage through EOF when completeness matters.
- Treat every truncation or omission marker, unexpected discontinuity, or missing requested boundary as incomplete
  evidence. Incomplete output cannot support implementation, completion, review, or readiness conclusions.
- After truncation, narrow or divide the request. Do not blindly repeat the same unbounded read or merely increase the
  output limit.
- Output truncation does not undo a command or invalidate its exit status. Do not rerun a non-idempotent action solely
  because its output was truncated; inspect the resulting state with separate bounded read-only checks.

## Tool Discovery Output Safety

These rules apply to every tool-discovery operation that uses `ALL_TOOLS`, regardless of the current repository,
plugin, MCP server, or task:

- Do not perform tool inventory when the required tool name is already known from the prompt, an applicable skill, or
  other authoritative instructions.
- Never emit, print, serialize, or otherwise expose `ALL_TOOLS` as a whole.
- Never emit complete tool descriptor objects, descriptions, parameter schemas, or other tool metadata during
  discovery.
- Inspect only the `name` field. Do not search or filter by `description` or any other metadata field.
- Search only by explicit exact names or explicit name prefixes that are relevant to the current task.
- Do not use generic discovery terms such as `skill`, `tool`, `search`, or `memory`.
- Always limit emitted discovery results. Emit at most 100 tool names.
- Return only a bounded summary such as `{ count, names }`.
- When checking whether one known method exists, use an exact-name availability check instead of inventory.

Safe bounded discovery by explicit prefixes:

```js
const names = ALL_TOOLS
  .map(x => x.name)
  .filter(name =>
    name.startsWith("mcp__idea__") ||
    name.startsWith("mcp__engineering_memory__")
  );

text({
  count: names.length,
  names: names.slice(0, 100)
});
```

Safe availability check for one known method:

```js
const available = ALL_TOOLS.some(
  x => x.name === "mcp__idea__git_status"
);

text({ available });
```
