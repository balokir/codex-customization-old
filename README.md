# Codex Customization

This repository is the versioned source of truth for personal, user-level
Codex customization. It keeps authored configuration separate from the runtime
state stored in `~/.codex`.

## Contents

- [`AGENTS.md`](AGENTS.md) — active global instructions for safe tool output
  handling and bounded tool discovery.
- [`HOOKS_INTENT.md`](HOOKS_INTENT.md) — design and acceptance criteria for
  executable guardrails that may enforce deterministic parts of those rules.
- [`HOOKS_PLAN.md`](HOOKS_PLAN.md) — kindless orchestration parent and source
  allocation for the hooks work.
- [`ENGINE plan`](plans/HOOKS_ENGINE_PLAN.md),
  [`DEPLOYMENT plan`](plans/HOOKS_DEPLOYMENT_PLAN.md), and
  [`ACCEPTANCE plan`](plans/HOOKS_ACCEPTANCE_PLAN.md) — independently reviewed
  implementation-authority plans.
- [`LICENSE`](LICENSE) — repository license.

Personal Codex skills are intentionally maintained in the separate
`C:\work\balokir\my-skills` repository.

## Current Status

`AGENTS.md` is ready for user-level activation through a symbolic link.

`HOOKS_INTENT.md` is the design source. All three child hooks plans are
`Ready for execution`; hook configuration, scripts, and tests have not been
implemented yet. The rules in `AGENTS.md` remain authoritative until hooks
exist and remain the semantic fallback after hooks are added.

## Install Global Instructions On Windows

Windows Developer Mode must be enabled, or the shell must have permission to
create symbolic links. Run the following from this repository's root in
PowerShell:

```powershell
$sourcePath = (Resolve-Path -LiteralPath ".\AGENTS.md").Path
$codexHome = Join-Path $env:USERPROFILE ".codex"
$linkPath = Join-Path $codexHome "AGENTS.md"

New-Item -ItemType Directory -Force -Path $codexHome | Out-Null

if (Test-Path -LiteralPath $linkPath) {
    throw "Codex AGENTS.md already exists: $linkPath"
}

New-Item -ItemType SymbolicLink -Path $linkPath -Target $sourcePath |
    Out-Null
```

The command deliberately refuses to replace an existing file or link. Inspect
and preserve any existing global instructions before installing this one.

Verify the active link with:

```powershell
$link = Get-Item -LiteralPath "$env:USERPROFILE\.codex\AGENTS.md" -Force
$link | Select-Object FullName, LinkType, Target
```

The expected `LinkType` is `SymbolicLink`, and `Target` should resolve to this
repository's `AGENTS.md`.

Start a new Codex session after installing the link or changing global
instructions so the session receives the current rules.

## Why Use A Symbolic Link

The repository contains only authored customization. Codex may store session
history, caches, authentication data, logs, and other runtime state under
`~/.codex`; that directory should not be treated as a Git working tree.

A symbolic link provides a stable boundary:

- Git tracks the source file in this repository.
- Codex discovers it at the normal user-level path.
- A checkout or pull may replace the target file without breaking the link.
- Runtime state remains outside version control.

## Editing And Validation

Edit customization in this repository, not through copied files under
`~/.codex`. Keep global rules repository-independent; project-specific rules
belong in the project's own `AGENTS.md`.

Check changed Markdown with
[`rumdl`](https://github.com/rvben/rumdl):

```powershell
rumdl check README.md
rumdl check AGENTS.md
rumdl check HOOKS_INTENT.md
```

Validate only the files changed by the current work unless a full repository
check is explicitly required.

## Hooks

Before implementing hooks, follow [`HOOKS_INTENT.md`](HOOKS_INTENT.md). It
defines the deployment model, guardrails, required tests, trust review, and
rollback expectations.

Hooks should enforce only deterministic cases. They must not be presented as a
replacement for instructions that require context or semantic judgment.
