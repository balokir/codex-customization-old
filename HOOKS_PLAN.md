# Codex Hooks Implementation Authority

This document is the kindless orchestration parent and index for three
independently reviewable child plans. It is allocation and coordination
authority only and never permits implementation.

Child plan navigation:

- [`ENGINE`](plans/HOOKS_ENGINE_PLAN.md#engine-plan-core).
- [`DEPLOYMENT`](plans/HOOKS_DEPLOYMENT_PLAN.md#deployment-plan-core).
- [`ACCEPTANCE`](plans/HOOKS_ACCEPTANCE_PLAN.md#acceptance-plan-core).

No child plan is executable until an independent complete-plan review publishes
`Ready for execution` for that child.

## Planning Gate Result: Orchestration Parent

The parent is allocation and coordination authority only. It has no executable
package kind and does not permit implementation.

### Scope Baseline

- **Goal:** turn deterministic parts of the global output-integrity and
  tool-discovery rules into safe user-level Codex guardrails.
- **Accepted design:** dependency-free JavaScript under an independently
  managed Node.js runtime, deployed through user-level Codex hooks.
- **Allowed boundaries:** versioned engine, deployment configuration, tests,
  the exact user-level activation link, verified operator guidance, and plan
  execution records.
- **Required behavior:** recognized unsafe supported calls are denied before
  execution; safe calls are unchanged; unparseable, ambiguous, or otherwise
  unclassifiable input fails open with bounded guidance.
- **Exclusions:** a general shell or JavaScript parser, hosted-tool
  interception, managed enterprise hooks, automatic trust, input rewriting,
  semantic policy enforcement, and unrelated Codex configuration.

### Pass 1 Source Mapping

| Source item | Disposition | Minimum closure | Owner package |
|---|---|---|---|
| `AGENTS.md` / Tool Output Integrity | `IN_SCOPE` | Deterministic bounded-read decisions | `PKG-HOOK-ENGINE` |
| `AGENTS.md` / Tool Discovery Output Safety | `IN_SCOPE` | Deterministic `ALL_TOOLS` decisions | `PKG-HOOK-ENGINE` |
| `HOOKS_INTENT.md` / Objective and Non-Goals | `IN_SCOPE` | Shared goal, fallback, and exclusions | All three child packages |
| `HOOKS_INTENT.md` / Deployment Model: versioned script, policy, fixtures, and tests | `IN_SCOPE` | Repository-owned dependency-free engine inputs | `PKG-HOOK-ENGINE` |
| `HOOKS_INTENT.md` / Deployment Model: user link, scope, runtime, and trust | `IN_SCOPE` | Exact user-level installation lifecycle | `PKG-HOOK-DEPLOYMENT` |
| `HOOKS_INTENT.md` / Proposed Layout | `IN_SCOPE` | Owned paths may vary only for verified host constraints | `PKG-HOOK-ENGINE`, `PKG-HOOK-DEPLOYMENT` |
| `HOOKS_INTENT.md` / Guardrail 1 and Guardrail 2 | `IN_SCOPE` | Bounded-read and `ALL_TOOLS` decisions | `PKG-HOOK-ENGINE` |
| `HOOKS_INTENT.md` / Hook Behavior except explicit timeout | `IN_SCOPE` | Deny protocol, bounded confidential output, and no mutation | `PKG-HOOK-ENGINE` |
| `HOOKS_INTENT.md` / Hook Behavior: explicit short timeout | `IN_SCOPE` | Versioned handler timeout configuration and proof | `PKG-HOOK-DEPLOYMENT` |
| `HOOKS_INTENT.md` / Verification: automated cases | `IN_SCOPE` | Engine fixture proof | `PKG-HOOK-ENGINE` |
| `HOOKS_INTENT.md` / Manual verification items 1-2 | `IN_SCOPE` | Discovery and trust-review proof | `PKG-HOOK-DEPLOYMENT` |
| `HOOKS_INTENT.md` / Manual verification items 3-4 | `IN_SCOPE` | Active safe and denied host outcomes | `PKG-HOOK-ACCEPTANCE` |
| `HOOKS_INTENT.md` / Manual verification item 5 | `IN_SCOPE` | Normal host behavior while disabled or removed, then restore | `PKG-HOOK-DEPLOYMENT` |
| `HOOKS_INTENT.md` / Acceptance: versioned sources and tests | `IN_SCOPE` | Exact version and dependency-free proof | `PKG-HOOK-ENGINE`, `PKG-HOOK-DEPLOYMENT` |
| `HOOKS_INTENT.md` / Acceptance: active config | `IN_SCOPE` | Active link resolves to reviewed source | `PKG-HOOK-DEPLOYMENT` |
| `HOOKS_INTENT.md` / Acceptance: no leak and fallback | `IN_SCOPE` | Engine proof and host classification | `PKG-HOOK-ENGINE`, `PKG-HOOK-ACCEPTANCE` |
| `HOOKS_INTENT.md` / Acceptance: operator documentation | `IN_SCOPE` | Verified install, trust, test, and rollback guidance | `PKG-HOOK-ACCEPTANCE` |

Candidate packages: `ENGINE`, `DEPLOYMENT`, and `ACCEPTANCE`.

Deferred, extracted, and no-action items: none.

Unmapped scope: none.

### Package Graph

| Child result | Kind | Depends on | Provides | Gate verdict |
|---|---|---|---|---|
| [`PKG-HOOK-ENGINE`](plans/HOOKS_ENGINE_PLAN.md#planning-gate-result-pkg-hook-engine) | `DELIVERY` | None | Reviewed engine version | `READY` |
| [`PKG-HOOK-DEPLOYMENT`](plans/HOOKS_DEPLOYMENT_PLAN.md#planning-gate-result-pkg-hook-deployment) | `DELIVERY` | Completed ENGINE handoff | Active reviewed version | `READY` |
| [`PKG-HOOK-ACCEPTANCE`](plans/HOOKS_ACCEPTANCE_PLAN.md#planning-gate-result-pkg-hook-acceptance) | `CHARACTERIZATION` | Completed DEPLOYMENT handoff | Host evidence and guidance | `READY` |

### Parent Coordination Contract

- Child execution order is `ENGINE -> DEPLOYMENT -> ACCEPTANCE`.
- Child execution is non-concurrent.
- ENGINE hands off one exact reviewed content identity.
- DEPLOYMENT hands off the exact active engine identity and its lifecycle
  evidence.
- ACCEPTANCE consumes those handoffs without changing either predecessor.
- `HOOKS_INTENT.md` is immutable during execution.
- A material contradiction with an accepted source stops affected work and
  follows the applicable source decision, Planning Gate G4, AUTHOR revision,
  and fresh independent REVIEW path.

### Aggregate State

Aggregate Planning Gate state: `READY`.

Implementation planning is allowed only against each child-owned `READY`
result. The aggregate parent is not permitting authority.

## Cross-Child Mismatch And Follow-Up Contract

An ACCEPTANCE mismatch or other negative observed outcome does not block
evidence acquisition, classification, or canonical publication and never
authorizes mutation of ENGINE, DEPLOYMENT, or `HOOKS_INTENT.md`.

- ACCEPTANCE may complete its approved characterization against valid handoffs
  regardless of whether the observed outcome is positive or negative.
- ACCEPTANCE is blocked only when a required handoff is invalid or missing, its
  approved evidence boundary cannot be exercised, or scope escape is found.
- A negative outcome may block an acceptance or success claim and may identify
  separately authorized follow-up delivery; it is not itself delivery authority.
- If the affected ENGINE or DEPLOYMENT plan is `Draft`, `Ready for execution`,
  or in progress, apply required readiness invalidation, AUTHOR revision, and
  fresh independent REVIEW before correction.
- If an affected predecessor is `Completed`, never reopen it. Create a new
  authorized follow-up DELIVERY Gate result and plan for ENGINE correction or
  exact-version DEPLOYMENT as applicable.
- A corrected engine version requires a corresponding newly authorized
  deployment result; an old completed DEPLOYMENT plan cannot deploy it.
- Dependent work may consume corrected predecessor handoffs only after the
  applicable child-owned Gate and plan lifecycle publishes valid replacements.
- Each child or follow-up plan remains the sole owner of its proof obligations,
  verification mechanics, execution evidence, and readiness verdict.
- A new supported tool surface or changed accepted semantics uses Planning
  Gate G4 or accepted-source re-entry instead of silent expansion.

## Review Handoff

Independent REVIEW must evaluate each linked child plan separately against its
own Gate result, writable boundary, prerequisites, transition order, proof
obligations, and completion-evidence surfaces. Readiness may be published per
child only; this orchestration parent never becomes permitting authority.
