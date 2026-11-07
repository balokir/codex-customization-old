# Codex Hooks ACCEPTANCE Implementation Authority

This artifact contains the child-owned Planning Gate result and independently
reviewable child plan for ACCEPTANCE. The kindless orchestration parent and source
allocation are in [`HOOKS_PLAN.md`](../HOOKS_PLAN.md).

## Planning Gate Result: `PKG-HOOK-ACCEPTANCE`

### Package Contract

- **Kind:** `CHARACTERIZATION`.
- **Sources:** every ACCEPTANCE-owned row in the
  [parent mapping](../HOOKS_PLAN.md#pass-1-source-mapping), including Objective
  and Non-Goals, manual Verification items 3 and 4, no-leak and fallback, and
  operator documentation.
- **Inherited G1:** the parent Scope Baseline.
- **Observation closure:** observe the exact active version at the real host
  boundary, classify guardrail outcomes, and publish verified operator
  guidance without changing hook behavior or activation state.
- **Depends on:** completed `PKG-HOOK-DEPLOYMENT` and its exact ENGINE handoff.
- **Provides:** bounded host evidence and operator guidance tied to the exact
  accepted installation.
- **Scope boundary:** acceptance fixtures, bounded evidence records, and
  `README.md` operator guidance.
- **Minimum closure:** effective matching-hook inventory and attribution,
  actual envelope classification, safe, deny, ambiguous, and no-leak canaries,
  plus semantic and structural README validation.
- **Explicit exclusions:** hook code, policy, configuration, activation link,
  trust state, target semantics, and accepted-source changes.
- **Minimum verification boundary:** a fresh Codex session using the exact
  DEPLOYMENT handoff, a bounded inventory of every hook that can match each
  canary, attribution of the target hook's contribution, and sanitized observed
  metadata.

### Trigger Scan

| Trigger | Result | Observation dimension |
|---|---|---|
| `LIFECYCLE` | `YES` | Observe the effective hook inventory at evidence time |
| `CONCURRENCY` | `YES` | Other matching hooks may concurrently affect outcomes |
| `AUTHORITY` | `YES` | Observe safe, deny, and no-decision outcomes |
| `RECOVERY` | `NO` | No runtime state is changed |
| `COMPATIBILITY` | `YES` | Observe actual host tool and input-key shapes |
| `READINESS` | `YES` | Classify whether evidence satisfies acceptance closure |
| `MULTI_ATOMICITY` | `NO` | No commit or rollback scope is introduced |
| `CROSS_LAYER` | `NO` | No invariant spans a database boundary |

### ART-OBSERVATION: Acceptance Contract

| Claim family | Observation question | Evidence boundary and feasible path | Publication owner | Completion condition |
|---|---|---|---|---|
| Effective hook environment | Which hooks can match each canary, and how is the target contribution distinguished? | Fresh-session `/hooks` inventory plus bounded source, hash, matcher, and per-canary attribution evidence | ACCEPTANCE evidence | Every canary is attributable to the exact handoff or its evidence is invalid |
| Host compatibility | Do actual tool names and input-key shapes match supported contracts? | Attributed fresh session; retain names and keys only | ACCEPTANCE evidence | All required shapes classified positive or negative |
| Decision authority | What safe, denied, and ambiguous outcomes occur for the exact target hook? | Attributed fresh session with synthetic canaries | ACCEPTANCE evidence | Every required outcome classified positive or negative |
| Confidentiality | Is target-hook output bounded, and is payload or metadata disclosed? | Inspect attributed model-visible result and captured bounded output | ACCEPTANCE evidence | Disclosure presence or absence classified and published |
| Operator guidance | Which README install, trust, verify, troubleshoot, disable, rollback, and restore claims are supported? | Compare each claim with ENGINE, DEPLOYMENT, and attributed ACCEPTANCE evidence; run non-mutating guidance | `README.md` and ACCEPTANCE evidence | Every claim classified; README publishes only supported current behavior and observed limitations |

No justified-gap completion is permitted by the accepted source. Missing,
invalid, or unattributable evidence blocks the affected characterization.
Valid negative or contradictory evidence is classified and published; it may
block a positive acceptance claim but not its own characterization.

### Proof Conclusion And Verdict

The observation contract covers every approved claim family and triggered
dimension, accounts for the effective concurrent matching-hook environment,
uses feasible attributable fresh-session evidence, and publishes positive or
negative classifications into the canonical plan evidence surface and
`README.md`. It does not assert subject outcomes in advance or authorize target
changes.

Open decisions: none. Unmapped scope: none. Scope escape: none.

Child Gate verdict: `READY`. Planning is allowed only for the child ACCEPTANCE
plan below.

## Child Plan: ACCEPTANCE

### ACCEPTANCE Plan Core

- **Status:** `Ready for execution`.
- **Permitting result:**
  [`PKG-HOOK-ACCEPTANCE`](#planning-gate-result-pkg-hook-acceptance),
  `CHARACTERIZATION`.
- **Reviewed baseline:**
  `6d4eac87905928e8ae7735c0ed6928f4bb7895ae`.
- **Goal:** acquire and publish real host evidence for the exact active version.
- **Canonical sources:** the ACCEPTANCE-owned rows in the [parent mapping](../HOOKS_PLAN.md#pass-1-source-mapping).
- **Target state:** the complete observation contract is satisfied without
  changing target behavior or runtime configuration.

### ACCEPTANCE External Prerequisites

- ENGINE and DEPLOYMENT child plans are `Completed`.
- DEPLOYMENT hands off one exact active ENGINE identity and complete lifecycle
  evidence.
- A fresh Codex session can exercise supported local tool paths.
- The effective `/hooks` inventory can be inspected and every competing hook
  that may match a canary can be excluded from or accounted for in attribution.

### ACCEPTANCE Writable Authorization

The single authoritative ACCEPTANCE writable boundary is:

- `C:\work\balokir\codex-customization\hooks\tests\acceptance\**`; and
- `C:\work\balokir\codex-customization\README.md`.

ACCEPTANCE must not edit ENGINE, deployment config, the activation link,
`HOOKS_INTENT.md`, trust state, or unrelated user configuration.

### ACCEPTANCE Delivery Impact

- **Requirements:** the ACCEPTANCE source rows are the complete authority.
- **QA impact:** none; canaries are characterization evidence, not product QA.
- **Documentation impact:** `README.md` is consumer/operator guidance. It may
  claim only behavior established by ENGINE, DEPLOYMENT, and fresh ACCEPTANCE
  evidence. The update becomes valid after `A1` completes and is owned by
  `A2`.
- **Affected build root:** acceptance fixtures and Markdown in this repository.

### ACCEPTANCE Compact Execution Surface

| Order | Transition | Depends on | Provides |
|---|---|---|---|
| 1 | [`A1`](#a1-acquire-real-host-boundary-evidence) | ENGINE and DEPLOYMENT handoffs | Classified host evidence |
| 2 | [`A2`](#a2-publish-verified-operator-guidance) | `A1` | Evidence-backed README |

Table order is the reviewed total transition order. Each heading below is the
single canonical state owner.

### A1: Acquire Real Host-Boundary Evidence

State: `[ ]`

- **Resulting truth:** the exact active version has bounded, attributable
  positive or negative classifications for actual envelope compatibility,
  safe, denied, ambiguous, and no-leak outcomes.
- **Authorization:** `PKG-HOOK-ACCEPTANCE`; verification and no-leak clauses.
- **Predecessors:** none; completed child handoffs are external prerequisites.
- **Canonical inputs:** the ART-OBSERVATION contract, exact active identity,
  effective matching-hook inventory, ENGINE supported-shape catalog, and
  DEPLOYMENT lifecycle evidence.
- **Constraints:** record only bounded hook source, hash, matcher, canonical
  tool names, input JSON types and keys, decision class, bounded reason, and
  host outcome; never retain payloads, commands, descriptors, file contents,
  or secrets; do not change runtime state.
- **Completion proof boundary:** before each representative safe, deny,
  ambiguous, and no-leak canary, a fresh session establishes the effective
  matching-hook inventory and either excludes competing influence or accounts
  for every matching hook in the target attribution.
- **Focused assertion:** every required claim family receives an attributable,
  evidence-backed positive or negative classification for the exact active
  version without overclaiming hosted-tool or security-boundary coverage.
- **Completion evidence:** pending execution.

A valid negative or contradictory observation is recorded and may complete
`A1`; it follows the parent mismatch contract only for any separately
authorized correction. Set `A1` to `[!]` only for an invalid or missing handoff,
unexercisable or unattributable evidence, or scope escape.

### A2: Publish Verified Operator Guidance

State: `[ ]`

- **Resulting truth:** README installation, runtime, trust, verification,
  troubleshooting, disable, rollback, and restore guidance agrees with the
  exact verified lifecycle and host evidence.
- **Authorization:** `PKG-HOOK-ACCEPTANCE`; documentation clauses.
- **Predecessor:** `A1`.
- **Canonical inputs:** ENGINE and DEPLOYMENT handoffs plus `A1` evidence.
- **Constraints:** publish current behavior only; do not change intent or
  prescribe unverified paths; structural lint is separate from semantic proof.
- **Completion proof boundary:** map every operational README claim to recorded
  evidence; execute non-mutating guidance against the actual installation;
  use DEPLOYMENT evidence for mutating lifecycle steps; validate Markdown and
  local links separately.
- **Focused assertion:** following README from its stated preconditions leads
  to verified states and outcomes without JetBrains ACP dependency or mutation
  of unrelated `~/.codex` state.
- **Completion evidence:** pending execution.

### ACCEPTANCE Final Conformance

After `A1` and `A2` are complete and before ACCEPTANCE becomes `Completed`:

1. confirm every ART-OBSERVATION row has valid attributable evidence and no
   justified gap;
2. confirm observed results are classifications, not new target authority;
3. confirm README claims map to ENGINE, DEPLOYMENT, or ACCEPTANCE evidence;
4. validate changed Markdown and local links with the repository workflow;
5. review ACCEPTANCE changes for payload leakage and scope drift; and
6. confirm no hook code, activation, trust, intent, or unrelated state changed.

#### ACCEPTANCE Final Conformance Evidence

Pending execution. Record actual canaries and outcomes, sanitized observed
shapes, README semantic mapping, Markdown validation, and external limitations
here.

## Review Handoff

Independent REVIEW must evaluate this ACCEPTANCE child against its Gate result,
writable boundary, prerequisites, transition order, proof obligations, and
completion-evidence surfaces. Readiness belongs only to this child plan.
