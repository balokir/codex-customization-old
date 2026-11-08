# Codex Hooks DEPLOYMENT Implementation Authority

This artifact contains the child-owned Planning Gate result and independently
reviewed child plan for DEPLOYMENT. The kindless orchestration parent and source
allocation are in [`HOOKS_PLAN.md`](../HOOKS_PLAN.md).

## Prior Live Evidence Invalidation

The attempted D2 lifecycle through standalone OpenAI Codex terminal CLI
`0.159.0` used the wrong host boundary. Its discovery, trust, canary, handler
error, inactive proof, and rollback observations are invalid for the intended
IDEA Custom ACP deployment and must not be used for D2 or Final Conformance.

D1's original version-bound configuration and isolated-link fixture results
remain historical evidence. D2 is incomplete. Completed C1-C4 diagnostics
proved `PreToolUse` and real ENGINE denial through IDEA Custom ACP, then
restored inactive state. The production `hooks/hooks.json` still has a quoted
leading Node executable in `commandWindows`; the diagnostic fix did not repair
this production launch incompatibility. Correct it under separate reviewed
change authority before D2 activation. This revision changes documentation only.

## Planning Gate Result: `PKG-HOOK-DEPLOYMENT`

### Package Contract

- **Kind:** `DELIVERY`.
- **Sources:** every DEPLOYMENT-owned row in the
  [parent mapping](../HOOKS_PLAN.md#pass-1-source-mapping), including Objective
  and Non-Goals, Deployment Model, Proposed Layout, Hook Behavior timeout,
  manual Verification items 1, 2, and 5, and Acceptance.
- **Inherited G1:** the parent Scope Baseline.
- **Primary invariant `INV-ACTIVATION-STATE`:** exact ENGINE identity,
  activation link, independent runtime, timeout, current-definition trust,
  and active/inactive/restored IDEA outcomes form one reversible lifecycle.
- **Depends on:** completed ENGINE with its exact content identity.
- **Provides:** one version-bound production hook active and lifecycle-verified
  in IDEA through the independently installed Custom ACP agent.
- **Scope boundary:** production deployment definition and fixtures, exact
  user activation link, documented interactive Codex trust workflow, and
  IDEA Custom ACP lifecycle tests.
- **Minimum closure:** verify exact ENGINE/config/runtime and working Windows
  launcher; install and trust the user-level link; observe production canary
  denied while active, allowed when link absent, and denied after restore,
  each in a fresh IDEA Custom ACP session.
- **Explicit exclusions:** standalone CLI execution as proof of IDEA behavior,
  JetBrains-bundled ACP, classifier semantics, behavioral ACCEPTANCE, README
  publication, runtime upgrades, and unrelated Codex configuration.
- **Minimum verification boundary:** verified exact production definition,
  timeout and independent runtime, link and trust state, and observed IDEA
  active/inactive/restored outcomes. Per-canary process/session/hash tracking,
  IDEA `codexHooks` management UI and ACP lifecycle notifications are optional
  diagnostics, not completion gates.

### Target ACP Identity

The deployment target is:

```text
IDEA AI Chat
  -> Custom ACP client
  -> C:\nvm4w\nodejs\codex-acp.cmd
  -> C:\nvm4w\nodejs\node.exe
  -> @agentclientprotocol/codex-acp 2.5.0
  -> bundled @openai/codex 0.165.0
```

At revision time, the ACP entry module SHA-256 is
`15de6b2dd5203876a48b12861378bcf87040d623ab2159e05052dc9d54c32b16`
and the bundled `codex.exe` SHA-256 is
`d4b2e6a054ea1dfe53217f9d8942c5f8a9f4b76171a1e0bb76ced5759915300a`.
Execution must confirm that IDEA still uses the independently installed
Custom ACP from the C1 runtime baseline; investigate additional process IDs
only if a concrete wrong-host or competing-session concern arises.

The installed adapter provides `codexHooks`, `_codex/hooks/list` and
`_codex/hooks/trust` extensions on supported ACP paths, with a `sessionFlags`
listing filter. C2/C3 proved invocation and enforcement without these
management surfaces. IDEA capability negotiation or hook-management UI is
therefore optional for D2, not a functional prerequisite.

The accepted [`HOOKS_INTENT.md`](../HOOKS_INTENT.md) requires discovery and
trust review of the active hook. Bundled Codex CLI `/hooks` can display and
approve the exact current definition under the independent installation.
Using the CLI for trust management is permitted; CLI shell execution is not
proof of an IDEA ACP outcome.

Official context: [Codex hooks](https://learn.chatgpt.com/docs/hooks),
[Codex App Server](https://learn.chatgpt.com/docs/app-server). ACP hook
lifecycle notifications remain optional troubleshooting information.

### Trigger Scan

| Trigger | Result | Reason |
|---|---|---|
| `LIFECYCLE` | `YES` | Link and trust state must be checked at each transition |
| `CONCURRENCY` | `YES` | Concurrent matching hooks or canaries may invalidate host outcomes |
| `AUTHORITY` | `YES` | The exact production definition must be shown as trusted |
| `RECOVERY` | `NO` | Rollback is a normal reviewed transition |
| `COMPATIBILITY` | `YES` | ACP adapter, bundled Codex, engine, runtime, config, and trust identities may differ |
| `READINESS` | `YES` | A working, version-bound source and all three host states are necessary |
| `MULTI_ATOMICITY` | `NO` | One exact link/version state is accepted at a time |
| `CROSS_LAYER` | `NO` | No invariant spans a database boundary |

### Pass 2 Decomposition Conclusion

Activation, trust, compatibility, concurrency and readiness remain one
versioned DEPLOYMENT lifecycle. The same exact link is installed, disabled,
and restored without changing source content or unrelated user state. Fresh
IDEA chats verify actual behavior. Optional protocol telemetry is only
needed if functional evidence is contradicted.

### ART-STATE: Activation Lifecycle

| State | Transition | Required evidence or outcome |
|---|---|---|
| Inactive | Verify reviewed ENGINE, production config and Windows launch | Exact source/runtime/timeout valid; otherwise stop |
| Ready | Install only the exact user-level link | Destination was absent; preserve unexpected paths |
| Linked | Review current definition with bundled CLI `/hooks` or IDEA UI | Exact source shown enabled and `Trusted` |
| Trusted | Fresh IDEA chat, active production canary | Command blocked before execution by the production hook |
| Active | Remove only verified exact link | Link absent, source intact |
| Inactive | Fresh IDEA chat, identical canary | Command executes normally with no diagnostic hook effect |
| Inactive verified | Restore identical link and trust | Same reviewed source enabled and trusted |
| Restored | Fresh IDEA chat, identical canary | Production denial reproduced |
| Any mismatch | Stop and restore known inactive state when safe | Never overwrite unexpected state or edit trust records |

Duplicate installation is not success. Changed definitions need fresh
version-bound review and trust; never silently accept an old hash.

### ART-AUTHORITY: Exact Definition Trust

```text
DEPLOYMENT_DEFINITION_IS_AUTHORITATIVE
IFF the active symlink, config, ENGINE identity, runtime, and timeout match
the reviewed handoff
AND the production Windows command is verified launch-compatible
AND the configured IDEA Custom ACP uses the independent Codex installation
AND the exact current definition is enabled and trusted in Codex through
a documented interactive trust surface (bundled CLI or IDEA, if available)
```

An older trusted definition never authorizes a modified production source.
Trust cannot be established solely by successful command execution.

### ART-COMPAT: Activation Identity

| Activation | Runtime/definition condition | Required action |
|---|---|---|
| Missing | Reviewed ENGINE, independent Node and Custom ACP | Validate launcher, install link, review trust |
| Matching | Identical source/runtime/config | Verify trust and active IDEA behavior |
| Changed | Different ENGINE or production definition | Separate reviewed version-bound correction before deployment |
| Wrong host | IDE-owned Node or JetBrains-bundled ACP | Stop, not target integration |
| CLI control | Bundled CLI only | Trust management allowed, not IDEA enforcement evidence |
| Incompatible | ACP/Node version changed | Re-evaluate compatibility |
| Partial failure | Any | Recover verified inactive state before retry |

### ART-READINESS: Deployment

```text
DEPLOYMENT_READY
IFF exact production ENGINE and config match a reviewed version-bound handoff
AND commandWindows launches the independent Node runtime under PowerShell
AND the short explicit timeout is configured
AND the user hook symlink resolves to that reviewed version
AND the current definition is enabled and trusted by Codex
AND IDEA uses the independently installed Custom ACP agent
AND the production canary is blocked in a fresh active IDEA chat
AND the same canary succeeds in a fresh IDEA chat with the link absent
AND the identical version is restored, trusted, and blocks again
AND there is no concrete competing-hook or concurrent-test ambiguity
```

IDEA management UI, per-probe PID/session hashes and lifecycle notifications
are optional diagnostic inputs, not additional deployment gates.

### Decisions And Proof Conclusion

DEPLOYMENT owns one exact active production version and its reversible link
lifecycle. Codex bundled CLI may perform documented trust approval; IDEA
Custom ACP remains the functional host for active/inactive/restored canaries.
The completed diagnostic validates actual hook enforcement but does not
fix or validate the still-quoted production `commandWindows` value.

Revised D2 gate verdict: **pending independent review**. The former `READY`
verdict applies to the previous D2 contract and does not authorize revised
D2 execution. Production launch correction requires separate change authority
and a reviewed version-bound handoff before activation.

## Child Plan: DEPLOYMENT

### DEPLOYMENT Plan Core

- **Status:** `Draft` (D2 revision pending independent review and production command correction).
- **Permitting result:**
  [`PKG-HOOK-DEPLOYMENT`](#planning-gate-result-pkg-hook-deployment),
  `DELIVERY`.
- **Previous reviewed repository baseline:**
  `ce129a32dba1b158f111887e68ce798cd317f917`.
  The revised D2 contract has not yet been independently reviewed.
- **Goal:** activate and lifecycle-verify one exact completed ENGINE identity in
  the configured IDEA Custom ACP integration.
- **Canonical sources:** every [parent-mapping](../HOOKS_PLAN.md#pass-1-source-mapping) row owned by DEPLOYMENT.
- **Target state:** `INV-ACTIVATION-STATE` holds for the target ACP without
  claiming general guardrail behavioral acceptance.

### DEPLOYMENT External Prerequisites

- The ENGINE child plan is `Completed`.
- ENGINE Final Conformance records one exact content identity.
- Windows Developer Mode or equivalent symlink permission is available.
- IDEA still configures the Custom ACP client as
  `C:\nvm4w\nodejs\codex-acp.cmd`.
- `@agentclientprotocol/codex-acp` `2.5.0` and its bundled OpenAI Codex `0.165.0`
  still match the reviewed target identities.
- The production Windows hook command has been corrected under separate
  change authority, and its version-bound test handoff reviewed before D2.
- New IDEA Custom ACP chats can be started after activation-state changes.
- `C:\nvm4w\nodejs\node.exe` remains the selected independent runtime.

### DEPLOYMENT Writable Authorization

The single authoritative DEPLOYMENT writable boundary is:

- `C:\work\balokir\codex-customization\hooks\hooks.json`;
- `C:\work\balokir\codex-customization\hooks\tests\run-tests.mjs`;
- the exact link `C:\Users\user\.codex\hooks.json`; and
- the Codex-managed trust record for the exact current hook definition,
  changed only through documented Codex interactive trust (bundled CLI or
  supported IDEA UI), never by editing trust data directly.

No other user-managed path under `C:\Users\user\.codex` is writable. No other
Codex-managed trust or enable state is authorized. DEPLOYMENT must not edit
ENGINE, README, intent, ACCEPTANCE, IDEA settings, Custom ACP configuration,
ACP packages, Codex binaries, or Node installations.

### DEPLOYMENT Delivery Impact

- **Requirements:** the DEPLOYMENT source rows are the complete authority.
- **QA impact:** none; lifecycle verification is engineering evidence.
- **Documentation impact:** no operator-document publication. The child plan
  records actual lifecycle evidence for ACCEPTANCE to consume.
- **Affected build root:** deployment config and dependency-free Node fixtures
  in this repository.

### DEPLOYMENT Execution Rule

Do not begin D2 until an independent review approves these revised criteria
and a separately authorized production command correction provides a reviewed
exact-version handoff. D1 retains its historical completion status.
Once authorized, run each lifecycle step in sequence, using new IDEA chats
after state changes and preserving unrelated paths. Stop on unexpected source,
trust or host behavior. Commit only owned repository changes; do not push.

### DEPLOYMENT Compact Execution Surface

| Order | Transition | Depends on | Provides |
|---|---|---|---|
| 1 | [`D1`](#d1-bind-deployment-to-the-engine-identity) | ENGINE handoff | Version-bound deployment config |
| 2 | [`D2`](#d2-activate-trust-disable-and-restore) | `D1` | Active lifecycle-verified version |

Table order is the reviewed total transition order. D1 is retained as completed;
D2 is the remaining planned transition, currently blocked by review and the
production launcher prerequisite. Each heading is the canonical state owner.

### D1: Bind Deployment To The ENGINE Identity

State: `[x]`

- **Resulting truth:** versioned `hooks.json` invokes the exact completed
  ENGINE identity through the independent Node runtime and has deterministic
  deployment lifecycle fixtures.
- **Authorization:** `PKG-HOOK-DEPLOYMENT`; its parent-mapped Deployment Model,
  Hook Behavior timeout, and Acceptance clauses.
- **Predecessors:** none; completed ENGINE is an external prerequisite.
- **Canonical inputs:** ENGINE content identity and DEPLOYMENT Gate artifacts.
- **Constraints:** `commandWindows` must not resolve Node from `PATH`; the
  handler has an explicit reviewed short timeout; config and diagnostic output
  contain no secrets or payloads.
- **Completion proof boundary:** config and timeout parsing plus isolated link,
  missing, existing-destination, wrong-target, runtime, disable, and restore
  fixtures.
- **Focused assertion:** config and lifecycle behavior remain bound to the
  exact ENGINE identity and preserve unrelated state.
- **Completion evidence:** `C:\nvm4w\nodejs\node.exe
  .\hooks\tests\run-tests.mjs` exited `0` under Node `v25.0.0` and reported
  `E1/E2/E3: 67 fixture cases passed; D1: 8 deployment fixture cases passed`.
  The D1 fixtures parse the current Codex `PreToolUse` command-handler shape,
  require the absolute `C:\nvm4w\nodejs\node.exe` `commandWindows` runtime,
  the absolute completed ENGINE path, and an explicit five-second timeout,
  and verify the ENGINE script and policy SHA-256 identities from Final
  Conformance. Actual isolated symbolic-link fixtures cover install, missing
  source, preserved existing destination, preserved wrong target, independent
  runtime execution, exact-link disable, and exact-source restore while an
  unrelated sentinel remains unchanged.

### D2: Activate, Trust, Disable, And Restore

State: `[ ]` (not executable until revised-plan review and production correction)

- **Resulting truth:** the exact reviewed production hook blocks the selected
  read-only canary when active, permits it while the user link is removed,
  and blocks it again after exact restoration through IDEA Custom ACP.
- **Authorization:** `PKG-HOOK-DEPLOYMENT`, revised review pending.
- **Predecessor:** D1 historical handoff plus an authorized correction of the
  production Windows launch command and reviewed current-version fixtures.
- **Inputs:** exact production config and ENGINE identity, independent ACP
  baseline, documented trust flow, ART-STATE lifecycle, and C1-C4 findings.
- **Canary:** `Get-Content -LiteralPath 'C:\work\balokir\codex-customization\AGENTS.md' | Out-Null`.
- **Work:** validate PowerShell-compatible production `commandWindows` and
  version-bound tests; install exact symlink; approve actual active definition
  via bundled CLI `/hooks` or supported IDEA UI; run canary in fresh IDEA
  chat and observe denial; remove only that verified link; rerun identical
  canary in a fresh chat and observe normal execution; restore the same source
  and trust; repeat the active denial in another fresh IDEA chat.
- **Constraints:** do not overwrite unknown destinations, modify trust files
  directly, change broad hook enable state, or run competing canaries. Preserve
  unrelated state. CLI invocation of the canary is not IDEA ACP evidence.
- **Completion proof:** exact reviewed source, independent runtime, timeout,
  trusted definition and link plus active/inactive/restored host outcomes
  (`deny`/`allow`/`deny`) with no material attribution contradiction.
- **Optional diagnostics:** IDEA hook-management capability, per-canary process
  IDs, definition hashes and ACP lifecycle events.
- **Completion evidence:** pending execution.

### DEPLOYMENT Final Conformance

After D2 has been reviewed and completed:

1. rerun the version-bound deployment fixtures for the exact production source;
2. verify the reviewed ENGINE/config/runtime/timeout/link and current trust;
3. confirm production canary `deny` / inactive `allow` / restored `deny`
   using fresh IDEA Custom ACP chats;
4. confirm unrelated user state and child-owned files were preserved; and
5. publish the exact active-version lifecycle handoff to ACCEPTANCE.

#### DEPLOYMENT Final Conformance Evidence

Pending execution. Record active source identity, trust, runtime, IDEA
host outcomes, inactive/restore proof and ACCEPTANCE handoff. Capture
optional protocol telemetry only to diagnose a concrete mismatch.

## Independent Review Record

Independent REVIEW evaluated the prior-evidence invalidation, target ACP
identity, adapter capability and filtering behavior, accepted-source mapping,
writable boundary, prerequisites, transition order, concurrency attribution,
wrong-host exclusions, rollback lifecycle, exact canary, proof obligations, and
completion-evidence surfaces.

Review evidence on 2026-11-08:

- the configured NVM command shim resolves to `@agentclientprotocol/codex-acp`
  `2.5.0`, with the reviewed entry and bundled Codex `0.165.0` hashes above;
- bounded adapter inspection confirmed the `codexHooks` capability,
  `_codex/hooks/list`, `_codex/hooks/trust`, ACP-v1 advertisement condition, and
  `sessionFlags` source filter;
- the official hooks and App Server contracts were rechecked and do not claim
  that IDEA negotiated or exposed those adapter facilities;
- ENGINE and policy hashes match the completed handoff; the user activation
  link is absent; and the complete fixture suite reports
  `E1/E2/E3: 67 fixture cases passed; D1: 8 deployment fixture cases passed`;
- direct ENGINE evaluation denies the exact D2 canary, while the command itself
  is read-only and suppresses output when the hook is inactive; and
- local links, plan-state coordination, whitespace, and final-newline checks
  pass.

Original DEPLOYMENT review verdict: `Ready for execution`.

Review of the revised D2 criteria: **pending**. The prior review does not
approve this revision. Production Windows command correction must be
separately authorized, reviewed, and verified before activation.
