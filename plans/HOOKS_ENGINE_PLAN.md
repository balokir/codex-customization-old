# Codex Hooks ENGINE Implementation Authority

This artifact contains the child-owned Planning Gate result and independently
reviewable child plan for ENGINE. The kindless orchestration parent and source
allocation are in [`HOOKS_PLAN.md`](../HOOKS_PLAN.md).

## Planning Gate Result: `PKG-HOOK-ENGINE`

### Package Contract

- **Kind:** `DELIVERY`.
- **Sources:** both `AGENTS.md` policy sections and every ENGINE-owned row in
  the [parent mapping](../HOOKS_PLAN.md#pass-1-source-mapping), including
  Objective and Non-Goals, Deployment Model, Proposed Layout, Guardrail 1,
  Guardrail 2, Hook Behavior, automated Verification, and Acceptance.
- **Inherited G1:** the parent Scope Baseline.
- **Primary invariant `INV-DECISION-INTEGRITY`:** for one supported
  `PreToolUse` call, compatible input normalization, classification authority,
  and serialized allow, deny, or no-decision output form one atomic result.
- **Depends on:** the current official documented hooks contract and an
  independently managed Node.js runtime.
- **Provides:** one fixture-verified, version-identifiable hook engine.
- **Scope boundary:** versioned classifier, policy, and engine fixtures.
- **Minimum closure:** bounded-read and `ALL_TOOLS` rules, fail-open handling,
  output confidentiality, dependency-free versioned sources, and every
  automated Verification case.
- **Explicit exclusions:** activation, trust, live host claims, operator
  guidance, and changes to accepted sources.
- **Minimum verification boundary:** direct engine execution over documented
  envelopes and supported synthetic tool-input fixtures.

### Trigger Scan

| Trigger | Result | Reason |
|---|---|---|
| `LIFECYCLE` | `NO` | Engine classification is stateless |
| `CONCURRENCY` | `NO` | Calls share no mutable engine state |
| `AUTHORITY` | `YES` | A parsed call may be denied before execution |
| `RECOVERY` | `NO` | Failure creates no follow-up work |
| `COMPATIBILITY` | `YES` | Hook and tool-input envelopes may differ |
| `READINESS` | `NO` | Engine closure is fixture-verifiable without activation |
| `MULTI_ATOMICITY` | `NO` | Each decision has one output boundary |
| `CROSS_LAYER` | `NO` | No invariant spans a database boundary |

### Pass 2 Decomposition Conclusion

`AUTHORITY` and `COMPATIBILITY` are proof dimensions of
`INV-DECISION-INTEGRITY`, not independently consumable behavior results. They
share:

- the same atomic output for one hook call;
- the same call-time correctness moment;
- the same fail-open failure lifecycle; and
- no independently valid result when compatible parsing, authority, or
  serialization is absent.

Focused subcondition tests do not create independent package closure. The
dimensions therefore remain merged in `PKG-HOOK-ENGINE`.

### ART-AUTHORITY: Engine Decision

```text
ENGINE_DECISION_IS_AUTHORITATIVE
IFF hook_event_name is PreToolUse
AND the tool and relevant input shape are supported
AND the complete relevant input is parsed without ambiguity
AND one reviewed policy outcome is established
AND any emitted output uses the supported JSON shape
```

When false, the engine must not deny. A recognized safe call produces
authoritative empty output. Partial input never authorizes denial.

### ART-COMPAT: Engine Protocol

| Current engine | Requested input | Required action |
|---|---|---|
| Current | Documented supported envelope | Classify normally |
| Current | Supported synthetic tool shape | Classify normally |
| Current | Unknown tool | Fail open with bounded actionable guidance |
| Current | Unknown or dynamic input shape | Fail open with bounded actionable guidance |
| Current | Missing required field | Fail open with bounded actionable guidance |
| Current | Malformed JSON | Fail open with bounded actionable generic guidance |
| Current | Newer unsupported schema | Fail open with bounded actionable guidance; require reviewed support work |
| Old | New reviewed policy semantics | Unsupported; create a new engine version |

Every fail-open row requires a non-denying successful exit, valid bounded
model-visible guidance, and no payload or metadata disclosure. Empty output is
reserved for a recognized safe call.

No engine transition claims knowledge of an observed host envelope. Host
compatibility is acquired only by `PKG-HOOK-ACCEPTANCE`.

### Decisions And Proof Conclusion

Resolved decisions:

- ownership: `PKG-HOOK-ENGINE`;
- persisted representation: versioned JavaScript and JSON policy;
- authority: the predicate above;
- compatibility: fail open outside reviewed shapes;
- public behavior: no input rewriting and no false security-boundary claim;
- failure behavior: no denial without a complete supported match.

Minimum proof exercises the actual JavaScript engine process with table-driven
fixtures for every reviewed outcome and validates valid bounded output, exit
behavior, and absence of payload leakage.

The invariant, selected artifacts, and proof path cover the approved minimum
closure. Open decisions: none. Unmapped scope: none. Scope escape: none.

Child Gate verdict: `READY`. Planning is allowed only for the child ENGINE
plan below.

## Child Plan: ENGINE

### ENGINE Plan Core

- **Status:** `Completed`.
- **Permitting result:**
  [`PKG-HOOK-ENGINE`](#planning-gate-result-pkg-hook-engine), `DELIVERY`.
- **Reviewed baseline:**
  `6d4eac87905928e8ae7735c0ed6928f4bb7895ae`.
- **Goal:** produce one dependency-free, fixture-verified decision engine.
- **Canonical sources:** every [parent-mapping](../HOOKS_PLAN.md#pass-1-source-mapping) row owned by ENGINE.
- **Target state:** the versioned engine satisfies
  `INV-DECISION-INTEGRITY` without claiming live host acceptance.

### ENGINE External Prerequisites

- The current official hooks contract documents common and `PreToolUse`
  fields, command input, MCP/local-function arguments, and deny output.
- `C:\nvm4w\nodejs\node.exe` exists and is independent of JetBrains ACP.
- The selected Node version supports the built-in ECMAScript and file APIs
  used by the engine.

Observed host envelopes are not an ENGINE prerequisite.

### ENGINE Writable Authorization

The single authoritative ENGINE writable boundary follows the accepted layout:

- `C:\work\balokir\codex-customization\hooks\pre_tool_use.mjs`;
- `C:\work\balokir\codex-customization\hooks\policy.json`; and
- `C:\work\balokir\codex-customization\hooks\tests\run-tests.mjs`.

ENGINE must not edit activation configuration, `~/.codex`, `README.md`,
`HOOKS_INTENT.md`, or sibling child regions.

### ENGINE Delivery Impact

- **Requirements:** the ENGINE source rows are the complete authority.
- **QA impact:** none; fixture verification is engineering evidence, not a
  product QA mapping.
- **Documentation impact:** no operator documentation. Internal fixture and
  policy comments may describe only implemented engine behavior.
- **Affected build root:** this repository's dependency-free Node sources.

### ENGINE Compact Execution Surface

| Order | Transition | Depends on | Provides |
|---|---|---|---|
| 1 | [`E1`](#e1-establish-the-documented-engine-contract) | External prerequisites | Valid fail-open engine foundation |
| 2 | [`E2`](#e2-enforce-bounded-read-decisions) | `E1` | Bounded-read decisions |
| 3 | [`E3`](#e3-enforce-tool-discovery-decisions) | `E2` | Complete reviewed engine |

Table order is the reviewed total transition order. Each heading below is the
single canonical state owner.

### E1: Establish The Documented Engine Contract

State: `[x]`

- **Resulting truth:** the JavaScript process consumes documented hook
  envelopes, normalizes supported synthetic tool inputs, and emits only valid,
  bounded supported output.
- **Authorization:** `PKG-HOOK-ENGINE`; its parent-mapped Hook Behavior and
  automated Verification clauses.
- **Predecessors:** none.
- **Canonical inputs:** official documented hook fields, ENGINE Gate artifacts,
  and synthetic fixture contracts. No observed-host input is assumed.
- **Constraints:** built-in Node APIs only; no npm package, transpilation,
  build step, transcript parsing, prior-call ledger, or payload logging.
- **Completion proof boundary:** actual engine process over recognized-safe,
  irrelevant-event, unknown-tool, missing-field, malformed-JSON,
  newer-unsupported-schema, and no-leak envelope fixtures.
- **Focused assertion:** every envelope case produces the reviewed decision and
  exit behavior; every E1 fail-open class produces valid bounded actionable
  model-visible guidance; every structured response is valid JSON and
  discloses no payload or metadata.
- **Completion evidence:** `C:\nvm4w\nodejs\node.exe
  .\hooks\tests\run-tests.mjs` exited `0` under Node `v25.0.0` and reported
  `E1: 13 fixture cases passed`. The process fixtures cover documented safe,
  irrelevant-event, supported freeform/object/structured normalization,
  unknown-tool, missing-field, malformed-JSON, unsupported-schema,
  invalid-tool-input, oversized-envelope, and payload/metadata no-leak cases.
  Every fail-open fixture returned valid JSON, bounded guidance of at most 240
  characters, no deny decision, and no fixture payload or metadata.

### E2: Enforce Bounded-Read Decisions

State: `[x]`

- **Resulting truth:** every supported read or search shape receives the
  reviewed allow, deny, or no-decision outcome.
- **Authorization:** `PKG-HOOK-ENGINE`; Tool Output Integrity.
- **Predecessor:** `E1`.
- **Canonical inputs:** ENGINE authority and compatibility artifacts plus
  supported synthetic shell and structured-tool fixtures.
- **Constraints:** producer-bounded reads and size or line-count probes are
  allowed; a complete known-large read or another source-enumerated unsafe
  shape is denied only when every required unsafe precondition is established;
  an unknown-target complete read receives no decision when the stateless input
  cannot establish whether an adequate preceding probe occurred; no numeric
  safe-size threshold is inferred; consumer token limits do not make an
  operation bounded; ambiguity fails open with bounded guidance.
- **Completion proof boundary:** table-driven fixtures cover allowed size and
  line-count probes, producer-bounded ranges, missing files, dynamic and quoted
  paths, unknown complete reads with unavailable prior-probe evidence, complete
  known-large reads, multi-read batching, broad search, and consumer-only
  limits.
- **Focused assertion:** recognized and fully established unsafe operations are
  denied; bounded reads, size probes, and line-count probes pass unchanged;
  every E2 ambiguity or unavailable-prior-probe case produces no decision, a
  successful non-denying exit, valid bounded actionable guidance, and no
  payload or metadata disclosure.
- **Completion evidence:** `C:\nvm4w\nodejs\node.exe
  .\hooks\tests\run-tests.mjs` exited `0` under Node `v25.0.0` and reported
  `E1/E2: 38 fixture cases passed`. E2 process fixtures cover size and
  line-count probes, quoted producer-bounded reads, explicit ranges,
  structured limits, missing and dynamic paths, unknown complete reads with
  unavailable prior-probe evidence, complete known-high-volume reads,
  multi-read batching, broad and unbounded scoped search, consumer-only
  limits, and structured missing, dynamic, and multi-path inputs. Every
  deterministic unsafe case returned the documented deny shape; every
  ambiguous case exited successfully with bounded non-denying guidance; no
  fixture payload or metadata appeared in structured output.

### E3: Enforce Tool-Discovery Decisions

State: `[x]`

- **Resulting truth:** recognized unsafe `ALL_TOOLS` source is denied while
  exact-name and bounded explicit-prefix discovery remains usable.
- **Authorization:** `PKG-HOOK-ENGINE`; Tool Discovery Output Safety.
- **Predecessor:** `E2`.
- **Canonical inputs:** ENGINE authority and compatibility artifacts plus
  supported synthetic code-mode fixtures.
- **Constraints:** inspect names only; at most 100 names; output is limited to
  `{ count, names }`; dynamic ambiguity fails open; no general JavaScript
  parser is introduced.
- **Completion proof boundary:** fixtures cover every allowed and denied
  source pattern, limits 0, 100, and 101, generic terms, metadata access,
  ordering of name reduction and filtering, obfuscation, and leakage.
- **Focused assertion:** all deterministically unsafe examples are denied and
  all approved examples pass unchanged; every E3 dynamic, obfuscated, or
  otherwise unclassifiable case produces no decision, a successful non-denying
  exit, valid bounded actionable guidance, and no payload, descriptor, schema,
  or other tool metadata disclosure.
- **Completion evidence:** `C:\nvm4w\nodejs\node.exe
  .\hooks\tests\run-tests.mjs` exited `0` under Node `v25.0.0` and reported
  `E1/E2/E3: 67 fixture cases passed`. E3 process fixtures cover exact-name
  availability, exact-name and explicit-prefix names-only filtering, limits
  `0`, `100`, and `101`, direct serialization and emission, complete
  descriptors, description and schema access, descriptor `find` and
  `findIndex` searches, unrestricted inventory, generic terms, name-reduction
  ordering, same-chain filter and limit association,
  summary-only output, additional output sinks, aliases, computed properties,
  regular-expression tokens, and template interpolation. Deterministically
  unsafe source returned the documented deny shape; dynamic or obfuscated
  source exited successfully with bounded non-denying guidance; no fixture
  payload or metadata appeared in output.

### ENGINE Final Conformance

After `E1` through `E3` are complete and before ENGINE becomes `Completed`:

1. run the complete engine fixture suite under the independent Node runtime;
2. confirm every Gate outcome and confidentiality claim has evidence;
3. confirm no activation, user-level config, README, or intent file changed;
4. review ENGINE-owned changes for dependency additions and scope drift; and
5. record the exact engine content identity handed to DEPLOYMENT.

#### ENGINE Final Conformance Evidence

`C:\nvm4w\nodejs\node.exe .\hooks\tests\run-tests.mjs` exited `0` under
Node `v25.0.0` and reported `E1/E2/E3: 67 fixture cases passed`. The complete
suite re-established the reviewed allow, deny, and fail-open outcomes, valid
bounded structured output, and payload/metadata confidentiality for the Gate
contract.

The ENGINE execution range from `1490d61` through producing commit
`7f18706b4189dcce9a61dd40f9e08cbcfc439235` changed only the three authorized
engine artifacts and this ENGINE plan record. `README.md`, `HOOKS_INTENT.md`,
activation configuration, and the DEPLOYMENT and ACCEPTANCE child regions did
not change during ENGINE execution. Source inspection found only built-in
`node:` imports and no package or lock file, dependency addition, or scope
drift.

Exact ENGINE content identity handed to DEPLOYMENT (SHA-256):

- `hooks/pre_tool_use.mjs`:
  `0b15771495bd4164ebd5db9c28f4980fa14758b76924fc9684faa055d09518e3`;
- `hooks/policy.json`:
  `5959c76e353c0be962ebe60e0efc5ccffaba98509794220afdff651544aef046`;
- `hooks/tests/run-tests.mjs`:
  `f2aa2dc21b71ff8a01cb1fe4dc7293278c6f78735d089a9a07697ff538cf643a`.

External limitation: this fixture-only ENGINE conformance does not claim live
host compatibility, activation, trust, or behavioral acceptance; those remain
owned by DEPLOYMENT and ACCEPTANCE.

## Review Handoff

Independent REVIEW must evaluate this ENGINE child against its Gate result,
writable boundary, prerequisites, transition order, proof obligations, and
completion-evidence surfaces. Readiness belongs only to this child plan.
