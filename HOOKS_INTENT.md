# Codex Hooks Intent

Implementation is governed by [`HOOKS_PLAN.md`](HOOKS_PLAN.md). The plan must
complete independent review before execution begins.

## Objective

Create user-level Codex hooks that turn the most important rules from
`AGENTS.md` into executable guardrails while keeping the versioned source in
this repository.

The first implementation must address:

1. unsafe or unbounded reads of large files and command output;
2. unsafe discovery or exposure of `ALL_TOOLS` metadata.

The hooks complement `AGENTS.md`. They do not replace instructions that
require semantic judgment.

## Deployment Model

- Keep hook configuration, scripts, fixtures, and tests in this repository.
- Expose the active user configuration through
  `C:\Users\user\.codex\hooks.json` without copying versioned files.
- Prefer a symbolic link so a Git checkout cannot silently leave an outdated
  active copy.
- Use user-level hooks, not project-local hooks, so the guardrails apply in
  every repository.
- Use Windows-native commands and avoid runtime dependencies that are not
  present in a normal Codex installation.
- Document the Codex trust review required after a hook definition or script
  changes.

## Proposed Layout

```text
codex-customization/
├── AGENTS.md
├── HOOKS_INTENT.md
└── hooks/
    ├── hooks.json
    ├── pre_tool_use.ps1
    ├── policy.psd1
    └── tests/
```

The exact layout may change during implementation if Codex path resolution or
hook trust behavior requires it.

## Guardrail 1: Bounded Reads

Use `PreToolUse` to inspect supported local tool calls before execution.

The hook should deny an operation when it can establish that the operation
attempts one of the following:

- reading an unknown or large file completely without a preceding size or
  line-count probe;
- emitting an entire potentially large log, report, instruction file, or
  generated artifact;
- combining several potentially high-volume reads in one tool invocation;
- repeating an already truncated unbounded read without narrowing the
  requested range;
- relying only on a consumer-side token limit instead of bounding output at
  the producer.

The first version should cover deterministic, testable command shapes used on
Windows, including PowerShell file reads and common shell search commands. It
should also cover file-reading MCP tools when their structured arguments expose
a path, offset, range, or limit.

The hook must fail open when it cannot parse a command reliably. Ambiguous
cases should receive concise model-visible guidance rather than a false claim
that the operation is safe.

## Guardrail 2: Tool Discovery Output Safety

Inspect code-mode calls that reference `ALL_TOOLS` and deny clearly unsafe
source patterns, including:

- direct serialization or emission of `ALL_TOOLS`;
- filtering or searching complete descriptor objects or their descriptions;
- unrestricted inventory without an exact name or explicit name prefix;
- emitting complete descriptors, schemas, or more than 100 names.

Allow known safe patterns:

- exact-name availability checks with `Array.prototype.some`;
- mapping to `name` before filtering;
- filtering by explicit exact names or explicit prefixes;
- returning only a bounded `{ count, names }` summary.

This check is a best-effort policy guardrail, not a JavaScript security
boundary. Obfuscated or dynamically assembled source cannot be classified
safely and must remain governed by `AGENTS.md`.

## Hook Behavior

- Use the current Codex `PreToolUse` denial response with
  `permissionDecision: "deny"` and a short reason.
- Keep stdout valid JSON when a structured response is returned.
- Write diagnostics only when needed and never echo complete tool input, file
  contents, environment variables, or tool descriptors.
- Keep hook output small and actionable.
- Set an explicit short timeout.
- Do not mutate files, commands, or tool arguments in the first version.
- Do not use `PostToolUse` to pretend an already executed side effect was prevented.

## Non-Goals

- Building a general shell parser.
- Treating hooks as a complete sandbox or security boundary.
- Blocking hosted tools that Codex hooks cannot observe.
- Enforcing subjective repository workflow rules.
- Automatically trusting modified hooks.
- Moving Codex runtime state into this repository.

## Verification

Automated tests must feed representative hook input JSON through the script and
assert exit status and structured output. At minimum, cover:

- allowed bounded file reads;
- denied unbounded reads of known large files;
- allowed size and line-count probes;
- allowed exact-name and explicit-prefix discovery;
- denied `ALL_TOOLS` serialization and descriptor inspection;
- malformed JSON input;
- unknown tool shapes;
- output that contains no leaked input payload or metadata.

Manual verification must confirm:

1. Codex discovers the user-level hook configuration.
2. `/hooks` shows the expected source and requires review after changes.
3. A safe tool call proceeds unchanged.
4. An unsafe fixture is denied before execution with a concise reason.
5. Disabling or removing the user-level hook restores normal Codex behavior.

## Acceptance Criteria

- All versioned hook sources live under `C:\work\balokir\codex-customization`.
- The active user hook configuration resolves to the versioned source.
- Tests demonstrate the required allow and deny cases without external dependencies.
- Hook output never exposes full `ALL_TOOLS` metadata or unbounded file content.
- The implementation documents installation, trust review, testing, and rollback.
- `AGENTS.md` remains the authoritative fallback for cases hooks cannot observe
  or classify.

## References

- [OpenAI Codex hooks documentation](https://learn.chatgpt.com/docs/hooks)
- [OpenAI plugin packaging documentation](https://developers.openai.com/plugins/build/plugins)
