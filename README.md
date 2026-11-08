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

CLI-only hook execution does not prove IDEA enforcement. The older C1–C4
diagnostics already verified IDEA hook transport and real ENGINE denial
with a diagnostic proxy; the new portable production launcher still needs
its first live Windows/IDEA smoke test.

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
