# Codex Customization

User-level instructions and `PreToolUse` guardrails for an independently
installed Codex ACP agent, including IntelliJ IDEA's Custom ACP Agent.

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
bundled Codex CLI, verify the installed `PreToolUse` definition, and trust
it if prompted. Never bypass hook trust.

If you move the checkout or replace your Node installation, uninstall
using the old checkout first, then install again with the new one.

## Verify

```powershell
node .\hooks\tests\run-tests.mjs
```

Then use a fresh IDEA Custom ACP chat for two shell commands:

- `Write-Output 'ok'` should execute normally.
- `Get-Content -Raw -LiteralPath 'AGENTS.md'` should be blocked before
  execution by the bounded-read policy (the file need not exist).

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

The hook is a best-effort guardrail for bounded reads and names-only
`ALL_TOOLS` discovery; it is not a security sandbox.
