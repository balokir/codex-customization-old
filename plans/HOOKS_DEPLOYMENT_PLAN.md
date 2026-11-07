# Codex Hooks DEPLOYMENT Implementation Authority

This artifact contains the child-owned Planning Gate result and independently
reviewable child plan for DEPLOYMENT. The kindless orchestration parent and source
allocation are in [`HOOKS_PLAN.md`](../HOOKS_PLAN.md).

## Planning Gate Result: `PKG-HOOK-DEPLOYMENT`

### Package Contract

- **Kind:** `DELIVERY`.
- **Sources:** every DEPLOYMENT-owned row in the
  [parent mapping](../HOOKS_PLAN.md#pass-1-source-mapping), including Objective
  and Non-Goals, Deployment Model, Proposed Layout, Hook Behavior timeout,
  manual Verification items 1, 2, and 5, and Acceptance.
- **Inherited G1:** the parent Scope Baseline.
- **Primary invariant `INV-ACTIVATION-STATE`:** the reviewed engine identity,
  activation link, independent runtime, explicit timeout, discovery and trust
  identity, inactive normal-host proof, rollback, and restored state agree as
  one installation lifecycle.
- **Depends on:** completed `PKG-HOOK-ENGINE` with an exact content identity.
- **Provides:** one exact reviewed engine version active and lifecycle-verified
  at the user-level hook path.
- **Scope boundary:** deployment configuration, deployment fixtures, the exact
  user-level activation link, and the Codex-managed trust record for the exact
  current hook definition through `/hooks`.
- **Minimum closure:** install, discover, trust, explicit short timeout,
  disable or removal, normal host behavior while inactive, rollback, restore,
  version compatibility, and bounded deployment diagnostics.
- **Explicit exclusions:** classifier semantics, live guardrail acceptance,
  operator-document publication, and accepted-source changes.
- **Minimum verification boundary:** actual link, runtime, timeout, `/hooks`
  state, the same harmless discriminating canary with the hook active and the
  link removed, and restored lifecycle for the exact engine identity.

### Trigger Scan

| Trigger | Result | Reason |
|---|---|---|
| `LIFECYCLE` | `YES` | Activation and trust states persist |
| `CONCURRENCY` | `NO` | Deployment is serialized by parent contract |
| `AUTHORITY` | `YES` | A discovered definition is unusable until its exact hash is trusted |
| `RECOVERY` | `NO` | Rollback is a normal reviewed transition |
| `COMPATIBILITY` | `YES` | Engine, runtime, config, and trust identities may differ |
| `READINESS` | `YES` | Discovery may occur before trust and exact-version validity |
| `MULTI_ATOMICITY` | `NO` | One exact link/version state is accepted at a time |
| `CROSS_LAYER` | `NO` | No invariant spans a database boundary |

### Pass 2 Decomposition Conclusion

`LIFECYCLE`, `AUTHORITY`, `COMPATIBILITY`, and `READINESS` are predicates over
the same versioned activation and trust state. They share:

- the exact state-change and rollback boundary;
- the same correctness moment for each activation transition;
- one failure and restore lifecycle; and
- no independently valid deployment result while version, link, runtime, or
  trust is incompatible or incomplete.

State-transition checks are subproofs, not independent package closure. The
dimensions therefore remain merged in `PKG-HOOK-DEPLOYMENT`.

### ART-STATE: Activation Lifecycle

| Current state | Event | Preconditions | Result | Failure/result |
|---|---|---|---|---|
| Missing | Install link | Destination absent; ENGINE identity complete | Discovered, untrusted | Preserve existing destination |
| Discovered, untrusted | Trust through `/hooks` | Exact definition reviewed | Active exact version | Remain skipped if untrusted |
| Active exact version | Restart or resume | Link, runtime, and identity unchanged | Active exact version | Recheck visible state |
| Active exact version | Run harmless discriminating canary | Exact ENGINE canary selected | Active, hook-denied baseline established | Do not claim discrimination |
| Active, baseline established | Remove exact link | Exact link verified | Inactive | Do not alter repository source |
| Inactive | Run the same canary in a fresh session | Exact link absent | Inactive, normal no-hook behavior verified | Remain inactive on unexpected hook behavior |
| Inactive, host-verified | Restore same version | Exact source and destination verified | Discovered; trust rechecked | Remain inactive on mismatch |
| Any | Definition or engine changes | New reviewed ENGINE handoff | New deployment required | Never reuse old completion |
| Any | Invalid runtime or link | None | Not deployment-ready | Fail without unrelated mutation |

Duplicate installation is not success when the destination already exists.
Stale, changed, or incompatible versions are never accepted implicitly.

### ART-AUTHORITY: Exact Definition Trust

```text
DEPLOYMENT_DEFINITION_IS_AUTHORITATIVE
IFF the active link, config, engine identity, and runtime match the ENGINE handoff
AND Codex discovers that exact current definition
AND the current definition hash has been reviewed and trusted through /hooks
```

When false, the definition remains missing, inactive, incompatible, or
discovered-but-untrusted and must not participate in tool calls. Partial trust
or trust for an older hash never authorizes the current definition.

### ART-COMPAT: Activation Identity

| Current activation | Requested engine/runtime | Required action |
|---|---|---|
| None | Reviewed current ENGINE and independent Node | Install and review |
| Same exact identity | Same runtime and config | Recheck discovery and trust |
| Old exact identity | New ENGINE identity | New DEPLOYMENT Gate and plan |
| Current identity | JetBrains or IDE-owned Node | Unsupported |
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
AND Codex discovers the expected source
AND the current definition is reviewed and trusted
AND normal host behavior is verified while the exact link is disabled or removed
AND the same exact identity is restored, rediscovered, and trusted
```

When false, report inactive, untrusted, incompatible, failed, or unverified.
No background completion before deployment readiness is allowed.

### Decisions And Proof Conclusion

Resolved decisions:

- ownership: `PKG-HOOK-DEPLOYMENT`;
- persisted representation: versioned config plus exact symbolic link;
- lifecycle: the state matrix above;
- authority: only the discovered exact current hash reviewed through `/hooks`;
- compatibility: exact identity, independent runtime, and trust state;
- readiness: the predicate above;
- failure and rollback: return to a known inactive state without touching
  unrelated `~/.codex` content.

Minimum proof exercises the explicit timeout, real activation link, exact-hash
trust through `/hooks`, one harmless discriminating canary while active and
inactive, and exact-version restoration for the ENGINE handoff. It does not
claim general active guardrail behavioral acceptance.

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
- **Reviewed baseline:**
  `6d4eac87905928e8ae7735c0ed6928f4bb7895ae`.
- **Goal:** activate and lifecycle-verify one exact completed ENGINE identity.
- **Canonical sources:** every [parent-mapping](../HOOKS_PLAN.md#pass-1-source-mapping) row owned by DEPLOYMENT.
- **Target state:** `INV-ACTIVATION-STATE` holds without claiming guardrail
  behavioral acceptance.

### DEPLOYMENT External Prerequisites

- The ENGINE child plan is `Completed`.
- ENGINE Final Conformance records one exact content identity.
- Windows Developer Mode or equivalent symlink permission is available.
- Codex user-level hooks and `/hooks` trust review are available.
- `C:\nvm4w\nodejs\node.exe` remains the selected independent runtime.

### DEPLOYMENT Writable Authorization

The single authoritative DEPLOYMENT writable boundary is:

- `C:\work\balokir\codex-customization\hooks\hooks.json`;
- `C:\work\balokir\codex-customization\hooks\tests\run-tests.mjs`;
- the exact link `C:\Users\user\.codex\hooks.json`; and
- the Codex-managed trust record for the exact current hook definition,
  mutated only through `/hooks` review.

No other user-managed path under `C:\Users\user\.codex` is writable. No other
Codex-managed trust or enable state is authorized. DEPLOYMENT must not edit
ENGINE, README, intent, or ACCEPTANCE artifacts.

### DEPLOYMENT Delivery Impact

- **Requirements:** the DEPLOYMENT source rows are the complete authority.
- **QA impact:** none; lifecycle verification is engineering evidence.
- **Documentation impact:** no operator-document publication. The child plan
  records actual lifecycle evidence for ACCEPTANCE to consume.
- **Affected build root:** deployment config and dependency-free Node fixtures
  in this repository.

### DEPLOYMENT Compact Execution Surface

| Order | Transition | Depends on | Provides |
|---|---|---|---|
| 1 | [`D1`](#d1-bind-deployment-to-the-engine-identity) | ENGINE handoff | Version-bound deployment config |
| 2 | [`D2`](#d2-activate-trust-disable-and-restore) | `D1` | Active lifecycle-verified version |

Table order is the reviewed total transition order. Each heading below is the
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
  and official trust workflow.
- **Constraints:** inspect and preserve an existing destination; mutate only
  the exact link and exact-definition trust record; never infer trust; remove
  the link rather than changing broader enable state; use a fresh session after
  state changes; use one harmless discriminating ENGINE canary whose inactive
  execution has no side effect or output.
- **Completion proof boundary:** the real user-level link and `/hooks` source,
  exact-hash trust, active denial of the selected canary, link removal,
  successful no-output execution of the same canary in a fresh inactive
  session, exact-version restore, and post-restore discovery and trust.
- **Focused assertion:** every lifecycle state is visible, reversible, bound to
  the reviewed engine, independent of JetBrains ACP, and consistent with the
  required host consequence.
- **Completion evidence:** pending execution.

### DEPLOYMENT Final Conformance

After `D1` and `D2` are complete and before DEPLOYMENT becomes `Completed`:

1. rerun deterministic deployment fixtures;
2. confirm the exact active link, engine identity, runtime, timeout, source,
   and trust;
3. confirm inactive normal-host behavior and exact-version restore evidence;
4. confirm no unrelated `~/.codex` or child-owned artifact changed; and
5. publish the exact active-version and lifecycle handoff to ACCEPTANCE.

#### DEPLOYMENT Final Conformance Evidence

Pending execution. Record actual invocations, link and trust observations,
active identity, rollback and restore outcomes, and external limitations here.

## Review Handoff

Independent REVIEW must evaluate this DEPLOYMENT child against its Gate result,
writable boundary, prerequisites, transition order, proof obligations, and
completion-evidence surfaces. Readiness belongs only to this child plan.
