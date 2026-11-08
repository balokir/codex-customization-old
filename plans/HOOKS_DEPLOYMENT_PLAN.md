# Codex Hooks DEPLOYMENT Implementation Authority

This artifact contains the child-owned Planning Gate result and independently
reviewed child plan for DEPLOYMENT. The kindless orchestration parent and source
allocation are in [`HOOKS_PLAN.md`](../HOOKS_PLAN.md).

## Prior Live Evidence Invalidation

The attempted D2 lifecycle through standalone OpenAI Codex terminal CLI
`0.159.0` used the wrong host boundary. Its discovery, trust, canary, handler
error, inactive proof, and rollback observations are invalid for the intended
IDEA Custom ACP deployment and must not be used for D2 or Final Conformance.

D1 remains complete because its versioned configuration, independent runtime,
hash, timeout, and isolated link-fixture proofs do not depend on the live Codex
host. D2 remains incomplete. No prior live attempt authorizes activation or
restoration in the target ACP integration.

## Planning Gate Result: `PKG-HOOK-DEPLOYMENT`

### Package Contract

- **Kind:** `DELIVERY`.
- **Sources:** every DEPLOYMENT-owned row in the
  [parent mapping](../HOOKS_PLAN.md#pass-1-source-mapping), including Objective
  and Non-Goals, Deployment Model, Proposed Layout, Hook Behavior timeout,
  manual Verification items 1, 2, and 5, and Acceptance.
- **Inherited G1:** the parent Scope Baseline.
- **Primary invariant `INV-ACTIVATION-STATE`:** the reviewed engine identity,
  activation link, independent runtime, explicit timeout, IDEA Custom ACP
  identity, discovery and trust identity, inactive target-host proof, rollback,
  and restored state agree as one installation lifecycle.
- **Depends on:** completed `PKG-HOOK-ENGINE` with an exact content identity.
- **Provides:** one exact reviewed engine version active and lifecycle-verified
  at the user-level hook path in the target IDEA Custom ACP integration.
- **Scope boundary:** deployment configuration, deployment fixtures, the exact
  user-level activation link, the target IDEA Custom ACP lifecycle, and the
  Codex-managed trust record for the exact current hook definition through a
  trust interaction exposed by that target integration.
- **Minimum closure:** verify the configured ACP command and process identity;
  install, discover, trust, enforce the explicit short timeout, disable or
  remove, prove target-host behavior while inactive, rollback, restore, verify
  version compatibility, and retain bounded deployment diagnostics.
- **Explicit exclusions:** standalone CLI, `codex exec`, terminal TUI evidence,
  JetBrains' separate bundled ACP installation, classifier semantics, live
  guardrail acceptance, operator-document publication, runtime upgrades,
  Custom ACP reconfiguration, and accepted-source changes.
- **Minimum verification boundary:** actual link, runtime, timeout, target ACP
  process provenance, target-exposed discovery and trust state, the same
  harmless discriminating canary in fresh IDEA Custom ACP sessions with the
  hook active and the link removed, and restored lifecycle for the exact engine
  identity.

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
Execution must reverify the configured command, adapter version, bundled Codex
version, hashes, and live process provenance before changing activation state.
Matching binaries in another installation do not establish target provenance.

The reviewed `codex-acp` `2.5.0` adapter contains the JetBrains AIR
`codexHooks` capability and the `_codex/hooks/list` and `_codex/hooks/trust`
extension methods. The capability is advertised only on the adapter's ACP v1
initialization path. Its list implementation also filters App Server results to
hooks whose source is `sessionFlags`. Therefore static adapter support does not
prove that the user-level `~/.codex/hooks.json` source is negotiated, listed, or
trustable in the running IDEA integration. D2 must verify the negotiated
capability and the exact user-level source through IDEA before recording trust.
If the exact source is absent, D2 must restore the inactive state and stop with
an ACP trust-surface compatibility result.

Official contract references:

- [Codex hooks](https://learn.chatgpt.com/docs/hooks) defines user hook
  discovery, exact-definition trust, and `PreToolUse` coverage for unified
  execution;
- [Codex app server](https://learn.chatgpt.com/docs/app-server) defines hook
  lifecycle notifications for rich clients.

Neither contract proves that the configured ACP adapter exposes discovery,
trust, or lifecycle notifications through IDEA. D2 must establish that target
capability directly and must stop as unsupported if it is absent.

Parent-mapped manual Verification item 2 requires the expected source to be
listed and reviewed. Its literal `/hooks` command is specific to the terminal
CLI and is not authorized as target evidence. For IDEA Custom ACP, only the
equivalent negotiated target capability can satisfy that required truth.

### Trigger Scan

| Trigger | Result | Reason |
|---|---|---|
| `LIFECYCLE` | `YES` | Activation and trust states persist |
| `CONCURRENCY` | `YES` | Deployment is serialized, but other live ACP sessions or hooks can affect attribution |
| `AUTHORITY` | `YES` | A discovered definition is unusable until its exact hash is trusted |
| `RECOVERY` | `NO` | Rollback is a normal reviewed transition |
| `COMPATIBILITY` | `YES` | ACP adapter, bundled Codex, engine, runtime, config, and trust identities may differ |
| `READINESS` | `YES` | Discovery may occur before trust and exact-version validity |
| `MULTI_ATOMICITY` | `NO` | One exact link/version state is accepted at a time |
| `CROSS_LAYER` | `NO` | No invariant spans a database boundary |

### Pass 2 Decomposition Conclusion

`LIFECYCLE`, `CONCURRENCY`, `AUTHORITY`, `COMPATIBILITY`, and `READINESS` are
predicates over the same versioned activation and trust state. They share:

- the exact state-change and rollback boundary;
- the same correctness moment for each activation transition;
- serialized live probes whose process and session provenance prevent
  attribution to another ACP session or hook;
- one failure and restore lifecycle; and
- no independently valid deployment result while version, link, runtime, or
  trust is incompatible or incomplete.

State-transition checks are subproofs, not independent package closure. The
dimensions therefore remain merged in `PKG-HOOK-DEPLOYMENT`.

### ART-STATE: Activation Lifecycle

| Current state | Event | Preconditions | Result | Failure/result |
|---|---|---|---|---|
| Missing | Install exact link | Destination absent; ENGINE and target ACP identities complete | Link installed; discovery pending | Preserve existing destination |
| Link installed; discovery pending | Start new IDEA Custom ACP chat and list hooks | Target provenance and negotiated `codexHooks` capability verified | Target-discovered, untrusted | Remove exact link and record compatibility result if capability or source is absent |
| Target-discovered, untrusted | Review through target ACP trust surface | Exact definition reviewed in target integration | Active exact version | Remain skipped if untrusted or no target trust path exists |
| Active exact version | Start new IDEA Custom ACP chat | Link, runtime, target ACP, and identity unchanged | Fresh active target session | Stop on wrong process provenance |
| Fresh active target session | Run harmless discriminating canary | Exact ENGINE canary selected | Active, hook-denied baseline established | Do not claim discrimination |
| Active, baseline established | Remove exact link | Exact link verified | Inactive | Do not alter repository source |
| Inactive | Run the same canary in a new IDEA Custom ACP chat | Exact link absent; target provenance verified | Inactive, normal no-hook behavior verified | Remain inactive on unexpected hook behavior |
| Inactive, host-verified | Restore same version | Exact source, destination, and target ACP verified | Target-discovered; trust rechecked | Remain inactive on mismatch |
| Any | Definition or engine changes | New reviewed ENGINE handoff | New deployment required | Never reuse old completion |
| Any | Invalid runtime or link | None | Not deployment-ready | Fail without unrelated mutation |

Duplicate installation is not success when the destination already exists.
Stale, changed, or incompatible versions are never accepted implicitly.

### ART-AUTHORITY: Exact Definition Trust

```text
DEPLOYMENT_DEFINITION_IS_AUTHORITATIVE
IFF the active link, config, engine identity, and runtime match the ENGINE handoff
AND the live host resolves to the configured IDEA Custom ACP command chain
AND that target ACP discovers the exact current definition
AND the current definition hash has been reviewed and trusted through the target
ACP integration
```

When false, the definition remains missing, inactive, incompatible, or
discovered-but-untrusted and must not participate in tool calls. Partial trust
or trust for an older hash never authorizes the current definition.

### ART-COMPAT: Activation Identity

| Current activation | Requested engine/runtime | Required action |
|---|---|---|
| None | Reviewed current ENGINE, independent Node, and target ACP | Install and review in target ACP |
| Same exact identity | Same runtime, config, and target ACP | Recheck target discovery, trust, and process provenance |
| Old exact identity | New ENGINE identity | New DEPLOYMENT Gate and plan |
| Current identity | JetBrains or IDE-owned Node | Unsupported |
| Current identity | Standalone CLI or terminal TUI host | Unsupported; wrong host boundary |
| Current identity | JetBrains-bundled ACP instead of configured Custom ACP | Unsupported; wrong process provenance |
| Current identity | Changed Custom ACP adapter or bundled Codex identity | Re-review this plan before execution |
| Current identity | Missing independent Node | Block deployment |
| Current identity | Changed config or script hash | Re-review trust state |
| Failed or partial | Retry | First restore a known inactive state |

Old and new versions do not overlap as accepted active installations.

### ART-READINESS: Deployment

```text
DEPLOYMENT_READY
IFF the source engine identity equals the reviewed ENGINE handoff
AND hooks.json resolves to that engine and the independent Node runtime
AND the handler declares the reviewed explicit short timeout
AND the exact user-level link resolves to the versioned hooks.json
AND the live host resolves to the configured IDEA Custom ACP command chain
AND IDEA negotiated the target adapter's codexHooks capability
AND the target ACP discovers the exact user-level source
AND the current definition is reviewed and trusted through the target integration
AND no competing hook or session makes the canary result unattributable
AND normal behavior is verified in a fresh target ACP session while the exact
link is disabled or removed
AND the same exact identity is restored, rediscovered, and trusted in target ACP
```

When false, report inactive, untrusted, incompatible, failed, or unverified.
No background completion before deployment readiness is allowed.

### Decisions And Proof Conclusion

Resolved decisions:

- ownership: `PKG-HOOK-DEPLOYMENT`;
- persisted representation: versioned config plus exact symbolic link;
- lifecycle: the state matrix above;
- authority: only the exact current hash discovered and reviewed through the
  target IDEA Custom ACP integration;
- compatibility: exact ENGINE, independent runtime, target ACP, config, and
  trust identities;
- readiness: the predicate above;
- failure and rollback: return to a known inactive state without touching
  unrelated `~/.codex` content.

Minimum proof exercises the explicit timeout, real activation link, exact-hash
trust through the target ACP lifecycle, one harmless discriminating canary in
new IDEA Custom ACP chats while active and inactive, and exact-version
restoration for the ENGINE handoff. It does not claim general active guardrail
behavioral acceptance.

The invariant, selected artifacts, and proof path cover the approved minimum
closure. Open decisions: none. Unmapped scope: none. Scope escape: none.

Child Gate verdict: `READY`. Planning is allowed only for the child DEPLOYMENT
plan below.

## Child Plan: DEPLOYMENT

### DEPLOYMENT Plan Core

- **Status:** `Ready for execution`.
- **Permitting result:**
  [`PKG-HOOK-DEPLOYMENT`](#planning-gate-result-pkg-hook-deployment),
  `DELIVERY`.
- **Reviewed repository baseline:**
  `ce129a32dba1b158f111887e68ce798cd317f917`.
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
- IDEA can expose the adapter's negotiated `codexHooks` capability or an
  explicit unsupported result without falling back to a standalone CLI.
- New IDEA Custom ACP chats can be started after activation-state changes.
- `C:\nvm4w\nodejs\node.exe` remains the selected independent runtime.

### DEPLOYMENT Writable Authorization

The single authoritative DEPLOYMENT writable boundary is:

- `C:\work\balokir\codex-customization\hooks\hooks.json`;
- `C:\work\balokir\codex-customization\hooks\tests\run-tests.mjs`;
- the exact link `C:\Users\user\.codex\hooks.json`; and
- the Codex-managed trust record for the exact current hook definition, mutated
  only through a trust interaction exposed by the target IDEA Custom ACP
  integration.

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

This independent review publishes `Ready for execution`. Start a fresh agent
for each remaining top-level step and continue automatically after each
completed step. Commit a completed top-level step only when it produced
repository changes; do not create empty commits and do not push. A fresh step
agent does not replace the requirement for a newly started IDEA Custom ACP
chat/process after each live state change. Wrong-host evidence, missing target
trust support, scope escape, or failed rollback stops execution.

### DEPLOYMENT Compact Execution Surface

| Order | Transition | Depends on | Provides |
|---|---|---|---|
| 1 | [`D1`](#d1-bind-deployment-to-the-engine-identity) | ENGINE handoff | Version-bound deployment config |
| 2 | [`D2`](#d2-activate-trust-disable-and-restore) | `D1` | Active lifecycle-verified version |

Table order is the reviewed total transition order. D1 is retained as completed;
D2 is the single remaining executable transition. Each heading below is the
single canonical state owner.

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

State: `[ ]`

- **Resulting truth:** the exact reviewed version is linked, discovered, and
  trusted; normal host behavior is established while its exact link is disabled
  or removed; the same version is then restored according to the state matrix.
- **Authorization:** `PKG-HOOK-DEPLOYMENT`; its parent-mapped manual
  Verification items 1, 2, and 5.
- **Predecessor:** `D1`.
- **Canonical inputs:** version-bound config, exact activation state matrix,
  target ACP identity and `codexHooks` capability baseline, official hooks
  contract, and target-exposed trust workflow.
- **Exact canary:** `Get-Content -LiteralPath 'C:\work\balokir\codex-customization\AGENTS.md' | Out-Null`.
- **Constraints:** inspect and preserve an existing destination; mutate only
  the exact link and exact-definition trust record; never infer trust; remove
  the link rather than changing broader enable state; use a newly started IDEA
  Custom ACP chat after state changes; prove process provenance for every live
  probe; retain only process path, version, hash, PID, parent PID, and start time
  for provenance, never full command lines or environment values; verify that
  IDEA negotiated `codexHooks` and lists the exact user-level source before
  using its trust action; do not substitute literal `/hooks`, direct trust-state
  edits, standalone CLI, or TUI evidence; inventory target-visible matching
  hooks and stop if another hook or session makes attribution ambiguous; the
  exact canary above is read-only, has no side effect, and suppresses output
  when the hook is inactive.
- **Completion proof boundary:** the real user-level link, verified target ACP
  process identity, negotiated target capability, target-visible exact
  user-level source, exact-hash trust through the target integration, absence
  of unattributed competing hooks or sessions, active denial of the selected
  canary, link removal, successful no-output execution of the same canary in a
  fresh inactive target session, exact-version restore, and post-restore target
  discovery and trust.
- **Focused assertion:** every lifecycle state is visible, reversible, bound to
  the reviewed engine and configured Custom ACP identity, uses an independent
  Node runtime rather than an IDE-owned Node, and is consistent with the
  required target-host consequence.
- **Completion evidence:** pending execution.

### DEPLOYMENT Final Conformance

After `D1` and `D2` are complete and before DEPLOYMENT becomes `Completed`:

1. rerun deterministic deployment fixtures;
2. confirm the exact active link, engine identity, runtime, timeout, target ACP
   identity, negotiated `codexHooks` capability, exact user-level source, and
   trust;
3. confirm inactive target-host behavior and exact-version restore evidence in
   newly started IDEA Custom ACP chats;
4. confirm no unrelated `~/.codex` or child-owned artifact changed; and
5. publish the exact active-version and lifecycle handoff to ACCEPTANCE.

#### DEPLOYMENT Final Conformance Evidence

Pending execution. Record target ACP process provenance, actual
invocations, target-exposed hook lifecycle observations, link and trust states,
active identity, rollback and restore outcomes, and external limitations here.

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

Review verdict: `Ready for execution`.
