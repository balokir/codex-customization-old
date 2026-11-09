# Codex Customization

User-level Codex ACP guardrails: `PostToolUse` checks received tool
results; `PreToolUse` checks structured MCP reads and `ALL_TOOLS` discovery.
Supports IntelliJ IDEA Custom ACP Agent.

## Install (Windows)

Use your own Node.js (outside IDEA) and enable Windows Developer Mode or
other permission to create symbolic links. From this checkout:

```powershell
node .\hooks\setup.mjs install
node .\hooks\setup.mjs status
```

The installer selects **the Node executable running the installer** and
the current checkout. It creates exactly three links under `~/.codex`
(or `CODEX_HOME`):

- `hooks.json` -> the versioned `hooks/hooks.json`.
- `codex-customization-hooks` -> this checkout's `hooks/` directory.
- `codex-customization-node.exe` -> the selected Node executable.

The versioned configuration contains no machine-specific paths. It uses
the stable links, so Codex does not need to resolve Node from the IDE's PATH.
Existing destinations are never overwritten. Repeating install is safe.

Restart Codex (or create a new IDEA Custom ACP chat). Open `/hooks` in the
bundled Codex CLI, verify both installed hook definitions, and trust
them if prompted. Never bypass hook trust.

If you move the checkout or replace your Node installation, uninstall
using the old checkout first, then install again with the new one.

## Verify

```powershell
node .\hooks\tests\run-tests.mjs
```

Then use a fresh IDEA Custom ACP chat for two shell commands:

- `Write-Output 'ok'` should execute normally.
- `Get-Content -Raw -LiteralPath 'AGENTS.md'` should no longer be blocked
  by `PreToolUse` solely because of its name. `PostToolUse` blocks only
  if the completed shell result actually contains a truncation warning.

CLI-only hook execution does not prove IDEA enforcement. Earlier C1–C4
diagnostics established hook transport and ENGINE enforcement through IDEA.

### Verified on Windows (2026-11-08)

The portable installation was tested using independently installed Node.js
v25.0.0. The installer succeeded, all three user-level links reported
`linked`, and the ENGINE and portable installation smoke suite passed
(67 ENGINE fixture cases).

In a fresh IntelliJ IDEA Custom ACP chat, the **installed production hook**
produced these outcomes:

- `Write-Output 'ok'` executed normally (exit code `0`).
- `Get-Content -Raw -LiteralPath 'AGENTS.md'` was blocked before execution:
  `Complete read of a known high-volume target requires an explicit
  producer-side range or limit.`

These user-reported host outcomes verify the production allow/deny smoke
path through IDEA Custom ACP. They do not establish coverage for every
supported tool shape or policy rule. The uninstall/inactive-state test for
this portable installation has not yet been run; the previous diagnostic
installation was separately tested for clean deactivation.

## PostToolUse truncation guardrail

The production `PostToolUse` uses matcher `*`, accepting events from
any tool for which the host supports this lifecycle hook. It checks string
results, text in recognized structured response fields (including MCP-style
`content` arrays), and explicit output-truncation flags. Its primary
verified signal is Codex's own `Warning: truncated output (original token
count: N)`. On detection it returns `decision: "block"`
and asks the agent to retry with smaller, bounded output. Other results
pass through without output. No `AGENTS.md` instruction or diagnostic
logging is required.

Wildcard matching does **not** mean every tool emits `PostToolUse`.
The verified end-to-end scenario is Codex `Bash` on CLI and IDEA ACP;
structured MCP and other tools have fixture coverage only and require
separate host verification. The hook cannot undo completed tool side effects
or guarantee the CLI hides all printed lines. A result containing the exact
standalone warning could trigger a false positive; an unfamiliar truncation
format or an oversized hook event (>1 MiB) is not caught. `PreToolUse` now
leaves Bash read/search output sizing to `PostToolUse`, while retaining
structured MCP read checks and `ALL_TOOLS` discovery rules.

In a separate `CODEX_HOME` without `AGENTS.md` and with only this
kind of `PostToolUse` handler, Codex CLI v0.165.0 and IDEA Custom ACP
both returned a block after a 6000-row output, and the agent independently
retried with a short result. The universal production variant requires
a fresh-session smoke test after installation.

## Isolated PostToolUse truncation experiment

The diagnostic is **not** installed in the normal user hooks configuration.
Create a disposable Codex profile and an empty working directory:

```powershell
node .\experiments\post-tool-use\setup.mjs
$env:CODEX_HOME = Join-Path $env:TEMP 'codex-posttooluse-isolated\codex-home'
Set-Location (Join-Path $env:TEMP 'codex-posttooluse-isolated\workspace')
& 'C:\nvm4w\nodejs\codex-acp.cmd' cli
```

The lab's hooks.json contains only a non-blocking `PostToolUse` diagnostic.
The normal user `PreToolUse` and user-level `AGENTS.md` are absent from this
separate `CODEX_HOME`; the empty workspace avoids project instructions.
The setup stops if an ancestor already has an `AGENTS.md`,
`AGENTS.override.md`, or project-local Codex configuration.

The isolated profile may require separate interactive login. Do not copy
`auth.json` or tokens from the working Codex profile.

In the bundled CLI open `/hooks`, verify that the only listed hook is the
PostToolUse probe, and approve it if needed. Run exactly one command:

```powershell
Write-Output 'CPTD-POST-20261108-PROBE'; 1..6000 | ForEach-Object { 'row {0:D5} {1}' -f $_, ('X' * 30) }
```

Compare the CLI-visible truncation warning with metadata in
`$env:TEMP\codex-posttooluse-probe-20261108.json`, especially
`response_present`, `response_bytes`, `response_type`, and
`truncation_marker_present`. The hook stores no response content.

If evidence is absent or no marker is recorded, do not conclude the
result was complete: hook invocation may be skipped, its 1 MiB input cap
may be exceeded, or truncation may occur after the hook runs.

To repeat through IDEA, use a **separately configured** Custom ACP agent
with this `CODEX_HOME` and open the empty lab workspace as the IDEA project.
Do not use your normal project: its `AGENTS.md` would invalidate isolation.

## Uninstall

```powershell
node .\hooks\setup.mjs uninstall
```

Only the three owned symlinks are removed; user settings, trust records,
repository files, and other `~/.codex` data are untouched.
Start a fresh session to verify deactivation.

## Rules and maintenance

`AGENTS.md` supplies semantic rules that the hook cannot enforce. If you
want global instructions, link it separately to `~/.codex/AGENTS.md`; the
hook installer never overwrites existing instructions.

For routine changes: **edit -> test -> smoke-test if behavior changes ->
commit**. Independent review is useful for material policy, security, or
architectural changes, not minor configuration edits.

Historical planning and diagnostic records remain in `plans/` and
`HOOKS_PLAN.md`. They are reference material rather than mandatory workflow
for routine maintenance.

The hooks are best-effort guardrails for tool output completeness,
structured MCP reads, and names-only `ALL_TOOLS` discovery; they are not
a security sandbox.
