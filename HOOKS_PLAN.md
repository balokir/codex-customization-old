# Codex Hooks Implementation Plan

Status: `Draft`

This plan delivers the executable guardrails defined by
[`HOOKS_INTENT.md`](HOOKS_INTENT.md). It does not authorize execution until an
independent complete-plan review publishes `Ready for execution`.

## Planning Gate Result

### Scope Baseline

- **Goal:** convert deterministic parts of the global tool-output and
  tool-discovery rules into user-level Codex guardrails.
- **Accepted design:** use user-level Codex hooks backed by versioned,
  Windows-native PowerShell sources in this repository.
- **Allowed boundaries:** hook configuration, policy, scripts, fixtures,
  tests, deployment documentation, and the exact user-level activation link.
- **Required behavior:** block only deterministically unsafe supported calls;
  allow safe calls unchanged; fail open with bounded guidance when a call
  cannot be classified safely.
- **Exclusions:** a general shell parser, a security sandbox, hosted-tool
  interception, automatic hook trust, argument rewriting, and unrelated
  Codex configuration.

### Approved Source Mapping

| Source | Disposition | Minimum closure | Owner |
|---|---|---|---|
| `HOOKS_INTENT.md` | `IN_SCOPE` | Deployment, behavior, tests, trust, and rollback | `PKG-HOOKS` |
| `AGENTS.md` / Tool Output Integrity | `IN_SCOPE` | Deterministic bounded-read guardrail | `PKG-HOOKS` |
| `AGENTS.md` / Tool Discovery Output Safety | `IN_SCOPE` | Deterministic `ALL_TOOLS` guardrail | `PKG-HOOKS` |

All three sources share one implementation boundary, one activation lifecycle,
and one end-to-end verification boundary. They therefore form one package.

Deferred, extracted, and no-action items: none.

### Package `PKG-HOOKS`

- **Kind:** `DELIVERY`.
- **Primary invariant:** every supported local tool call classified as unsafe
  by the reviewed policy is denied before execution; other calls are either
  allowed unchanged or receive bounded, non-blocking guidance.
- **Depends on:** a supported Codex hooks runtime, Windows PowerShell 7, and
  user review of the hook through Codex.
- **Provides:** a versioned, tested user-level `PreToolUse` guardrail.
- **Scope boundary:** this repository's hook implementation and the exact
  `~/.codex/hooks.json` activation link.
- **Minimum closure:** both guardrails, deterministic tests, real Codex
  verification, installation and trust instructions, and verified rollback.
- **Explicit exclusions:** semantic policy enforcement, hosted tools,
  managed enterprise hooks, non-Windows deployment, and general parsing.
- **Minimum verification boundary:** direct fixture execution plus a fresh
  Codex session exercising safe, denied, ambiguous, and rollback cases.

### Proof Trigger Scan

| Trigger | Result | Reason |
|---|---|---|
| `LIFECYCLE` | `YES` | Installation, trust, change, disable, and rollback states persist |
| `CONCURRENCY` | `NO` | Classification is stateless and has no shared mutable data |
| `AUTHORITY` | `YES` | A pre-execution decision controls whether a tool may run |
| `RECOVERY` | `NO` | Failures fail open and create no recovery work |
| `COMPATIBILITY` | `YES` | Hook envelopes and tool-input shapes may change |
| `READINESS` | `YES` | Discovery alone does not prove trusted, active behavior |
| `MULTI_ATOMICITY` | `NO` | No multi-commit or rollback transaction is introduced |
| `CROSS_LAYER` | `YES` | Policy, JSON output, and Codex behavior must agree |

### ART-STATE: Activation Lifecycle

| Current state | Event | Preconditions | Result | Failure/result |
|---|---|---|---|---|
| Not installed | Create activation link | Source and destination verified | Discovered on next session | Existing destination is preserved |
| Discovered, untrusted | Trust through `/hooks` | Definition reviewed | Active | Remains skipped if not trusted |
| Active | Safe source change | Tests pass; review repeated | Active with new version | Old trust is not assumed |
| Active | Definition or script changes | New session and trust review | New version active | Skipped or failed state is visible |
| Active | Hook error or timeout | None | Tool proceeds unchanged | Bounded warning, no false denial |
| Active | Disable or remove link | Exact link verified | Inactive after reload | Repository sources remain intact |
| Inactive | Reinstall same reviewed version | Valid link and review | Active | Normal review path applies |

No hook-owned session state, transcript parsing, cache, or prior-call ledger is
allowed. Duplicate and concurrent invocations remain independent.

### ART-AUTHORITY: Denial Predicate

```text
DENIAL_IS_AUTHORITATIVE
IFF hook_event_name is PreToolUse
AND the tool and input envelope are recognized
AND the complete relevant input was parsed without ambiguity
AND one reviewed deny rule matches
AND the emitted JSON is the supported PreToolUse deny shape
```

When the predicate is false, the hook must not deny the call. A recognized
safe call produces authoritative empty output. A recognized ambiguous call may
produce only concise, non-blocking guidance. Partial input is never sufficient
for denial.

### ART-COMPAT: Hook Protocol Compatibility

| Persisted/current | Runtime/requested | Required action |
|---|---|---|
| Current config and policy | Supported current envelope | Classify normally |
| Current config and policy | Unknown tool | Allow unchanged |
| Current config and policy | Unknown input shape | Allow with bounded guidance |
| Current config and policy | Missing optional field | Use defined default |
| Current config and policy | Missing required field | Fail open |
| Current config and policy | Malformed input JSON | Fail open with generic warning |
| Current config and policy | Newer unsupported schema | Fail open; add fixture before support |
| Changed script or config | Previously trusted runtime | Require trust-state recheck |
| Windows implementation | Non-Windows runtime | Unsupported; do not activate |

The implementation must use the current documented
`hookSpecificOutput.permissionDecision: "deny"` shape. Legacy output forms are
not an implementation target.

### ART-READINESS: Active Guardrail Predicate

```text
ACTIVE_AND_VERIFIED
IFF all versioned hook files exist
AND deterministic fixture tests pass
AND the activation path resolves to the versioned hooks.json
AND Codex discovers the user-level hook
AND the current hook is reviewed and trusted
AND a safe call proceeds unchanged
AND each unsafe canary is denied before execution
AND an ambiguous canary fails open with bounded guidance
AND rollback has been demonstrated
```

When false, the installation must be described as inactive, untrusted,
failed, or unverified rather than complete. No background completion before
readiness is allowed.

### ART-CROSS-LAYER: Decision Integrity

| Concept | Policy/runtime | Serialized hook I/O | Codex behavior |
|---|---|---|---|
| Safe call | `ALLOW` | Exit 0; no output | Tool runs unchanged |
| Unsafe call | `DENY` with short reason | Supported deny JSON | Tool does not run |
| Ambiguous call | `NO_DECISION` | Bounded context only | Tool runs unchanged |
| Malformed input | `NO_DECISION` | Generic bounded warning | Tool runs unchanged |
| Confidentiality | Input used only in memory | No input echoed | No payload leakage |
| Policy limit | Fixed reviewed values | Stable JSON types | Consistent enforcement |

### Proof Conclusion And Verdict

The source closure is covered by one package. The activation lifecycle,
authority predicate, compatibility behavior, readiness predicate, and
cross-layer decision representation are defined and have feasible fixture and
runtime evidence paths.

- **Unmapped scope:** none.
- **Open material decisions:** none.
- **Scope escape:** none.
- **Planning Gate verdict:** `READY`.
- **Implementation planning:** allowed for `PKG-HOOKS` only.

## Plan Core

- **Plan status:** `Draft`.
- **Permitting package:** [`PKG-HOOKS`](#package-pkg-hooks), `DELIVERY`.
- **Reviewed baseline:**
  `057d9af67d4e87ead0fb8123983c0888fe793ce5`.
- **Canonical source:** [`HOOKS_INTENT.md`](HOOKS_INTENT.md).
- **Protocol reference:**
  [official OpenAI hooks documentation](https://learn.chatgpt.com/docs/hooks).
- **Target state:** tested user-level hooks enforce the two deterministic
  guardrails and remain safely removable.

The Reviewed baseline is the durable review anchor. The current untracked
customization files and this Draft are the candidate delta against that anchor;
they must remain visible to the independent reviewer.

## Reviewed Decisions And Constraints

1. Use one synchronous `PreToolUse` command hook with no matcher, so it sees
   every supported local function-tool path and quickly ignores irrelevant
   calls.
2. Implement the hook in PowerShell 7 with no downloaded modules or external
   runtime dependencies.
3. Keep classification stateless. Do not inspect transcripts or remember a
   previous size probe.
4. For literal local paths, the hook may inspect file metadata itself. An
   unbounded complete read is denied when a recognized file is larger than
   64 KiB. Unknown or dynamic paths fail open with guidance.
5. A producer-side bound is required. Consumer output-token limits do not make
   an otherwise unbounded operation safe.
6. `ALL_TOOLS` enforcement uses deterministic source-pattern recognition, not
   a general JavaScript parser. Ambiguous or dynamically constructed source
   fails open with guidance.
7. Denial reasons and guidance must be generic and no longer than 1 KiB. They
   must not echo command text, file contents, environment values, or tool
   descriptors.
8. The hook timeout is five seconds. Timeout and internal failure follow the
   documented fail-open behavior.
9. The first version never rewrites tool input and never relies on
   `PostToolUse` to claim prevention.
10. Hosted tools are outside the enforceable boundary and remain governed by
    `AGENTS.md`.

## Intended Repository Layout

```text
codex-customization/
├── AGENTS.md
├── HOOKS_INTENT.md
├── HOOKS_PLAN.md
├── README.md
└── hooks/
    ├── hooks.json
    ├── policy.psd1
    ├── pre_tool_use.ps1
    └── tests/
        ├── fixtures/
        └── run-tests.ps1
```

Concrete fixture filenames and internal function names remain implementation
discretion.

## Writable Authorization

The single authoritative writable boundary is:

- `C:\work\balokir\codex-customization\hooks\**`;
- documentation in `C:\work\balokir\codex-customization` when required by
  the transitions below; and
- the exact activation link `C:\Users\user\.codex\hooks.json`.

No other file under `C:\Users\user\.codex` is writable under this plan.
Existing unrelated repository or user-level changes must remain untouched.

## Policy Outcome Matrix

### Bounded Reads

- Allow explicit size and line-count probes with compact output.
- Allow deterministic range, count, or first-N reads whose bound is visible in
  the producer command or structured tool arguments.
- Allow one complete literal file read only when the hook can establish that
  the file is at most 64 KiB.
- Deny a recognized complete literal file read above 64 KiB.
- Deny recognized batching of multiple complete potentially large reads.
- Deny a recognized broad search or listing when it has neither a scoped input
  boundary nor a producer-side result bound.
- Treat a requested tool-output token limit only as a consumer limit.
- Allow an unrecognized or dynamically assembled command, but provide bounded
  guidance when the ambiguity itself is recognized.

The supported command and MCP shapes must be derived from observed current
hook envelopes and locked into fixtures. Supporting a new shape requires a new
fixture before adding a deny rule.

### Tool Discovery

For recognized code-mode source that references `ALL_TOOLS`:

- allow an exact-name availability check;
- allow mapping descriptors to `name` before explicit exact-name or explicit
  prefix filtering;
- require output to be limited to `{ count, names }` with at most 100 names;
- deny direct emission or serialization of `ALL_TOOLS`;
- deny descriptor, description, schema, or other metadata inspection;
- deny filtering descriptors before reducing them to names;
- deny unrestricted or generically keyed inventory; and
- fail open with bounded guidance for dynamic source that cannot be classified
  reliably.

## Compact Execution Surface

| Order | Transition | State | Depends on | Provides |
|---|---|---|---|---|
| 1 | [`T1`](#t1-establish-the-hook-protocol-and-policy-foundation) | `[ ]` | External prerequisites | Tested hook foundation |
| 2 | [`T2`](#t2-enforce-bounded-read-safety) | `[ ]` | `T1` | Bounded-read guardrail |
| 3 | [`T3`](#t3-enforce-tool-discovery-safety) | `[ ]` | `T2` | `ALL_TOOLS` guardrail |
| 4 | [`T4`](#t4-deploy-trust-verify-and-document) | `[ ]` | `T3` | Active verified installation |

The table order is the reviewed total transition order. Each transition
heading below is its single canonical state owner.

## External Prerequisites

- PowerShell 7 is available as `pwsh`.
- Windows Developer Mode or equivalent symlink permission is available.
- Codex hooks are enabled.
- The official hook contract still supports user-level `hooks.json`,
  synchronous command hooks, and `PreToolUse` denial.
- The user performs trust review when Codex requests it.

## T1: Establish The Hook Protocol And Policy Foundation

State: `[ ]`

- **Resulting truth:** versioned hook configuration and a stateless PowerShell
  classifier consume current `PreToolUse` envelopes and emit only valid,
  bounded supported output.
- **Authorization:** `PKG-HOOKS`; `HOOKS_INTENT.md` deployment and behavior
  contracts.
- **Predecessors:** none.
- **Canonical inputs:** official hooks documentation, the Planning Gate proof
  artifacts above, and current observed Codex hook envelopes.
- **Required work:** create the intended hook layout; implement strict JSON
  parsing, normalization, policy loading, dispatch, top-level fail-open error
  handling, and a dependency-free fixture runner. Capture only tool name and
  input-key shape during protocol characterization; never capture complete
  payloads.
- **Completion proof boundary:** execute valid, irrelevant, missing-field,
  malformed-JSON, exception, timeout-contract, and no-leak fixtures directly
  against the script.
- **Focused assertion:** every case produces the reviewed decision class,
  exit behavior, valid bounded JSON when present, and no input disclosure.
- **Completion evidence:** pending execution.

## T2: Enforce Bounded-Read Safety

State: `[ ]`

- **Resulting truth:** every supported read or search shape in the reviewed
  policy matrix is classified consistently before execution.
- **Authorization:** `PKG-HOOKS`; `AGENTS.md` Tool Output Integrity.
- **Predecessor:** `T1` tested hook foundation.
- **Canonical inputs:** the bounded-read outcome matrix above and supported
  tool envelopes captured by `T1`.
- **Required work:** implement literal-path resolution relative to event
  `cwd`, metadata checks, recognized producer-bound detection, multi-read and
  broad-search detection, and fail-open handling for ambiguous shapes.
- **Completion proof boundary:** table-driven fixtures cover every allow,
  deny, and ambiguous outcome required by `HOOKS_INTENT.md`, including large
  files, missing files, dynamic paths, quoted paths, multiple reads, and
  consumer-only output limits.
- **Focused assertion:** unsafe recognized operations are denied; safe
  operations are unchanged; ambiguity never creates a false denial.
- **Completion evidence:** pending execution.

## T3: Enforce Tool-Discovery Safety

State: `[ ]`

- **Resulting truth:** recognized unsafe `ALL_TOOLS` discovery source is denied
  without exposing descriptor metadata, while approved exact-name and bounded
  explicit-prefix patterns remain usable.
- **Authorization:** `PKG-HOOKS`; `AGENTS.md` Tool Discovery Output Safety.
- **Predecessor:** `T2` completed and its shared classifier behavior retained.
- **Canonical inputs:** the tool-discovery outcome matrix above and current
  code-mode hook envelope captured by `T1`.
- **Required work:** classify direct serialization, descriptor inspection,
  ordering of name reduction and filtering, explicit query forms, bounded
  output shape, and dynamic ambiguity.
- **Completion proof boundary:** table-driven fixtures cover every allowed and
  denied example from `AGENTS.md`, result limits of 0, 100, and 101, generic
  discovery terms, descriptor-property access, obfuscated input, and payload
  leakage.
- **Focused assertion:** all deterministically unsafe examples are denied, all
  approved examples pass unchanged, and no result exposes tool metadata.
- **Completion evidence:** pending execution.

## T4: Deploy, Trust, Verify, And Document

State: `[ ]`

- **Resulting truth:** the tested hook is discoverable and trusted at the
  user-level path, real canaries demonstrate both guardrails, and a documented
  rollback returns Codex to normal behavior without changing versioned files.
- **Authorization:** `PKG-HOOKS`; `HOOKS_INTENT.md` deployment, verification,
  and acceptance contracts.
- **Predecessor:** `T3`; all deterministic fixture tests pass.
- **Canonical inputs:** tested hook sources, activation lifecycle, readiness
  predicate, and official trust workflow.
- **Required work:** create the exact `~/.codex/hooks.json` symbolic link only
  after verifying the destination; start a fresh session; review through
  `/hooks`; run safe, deny, ambiguous, and no-leak canaries; test disabling or
  removing only the exact link; restore the reviewed installation; update
  `README.md` with installation, trust, testing, troubleshooting, and rollback
  guidance; update `HOOKS_INTENT.md` only if verified contract facts changed.
- **Completion proof boundary:** a fresh Codex session observes the active
  hook and demonstrates every condition in `ACTIVE_AND_VERIFIED`.
- **Focused assertion:** deployment behavior matches fixture behavior, unsafe
  operations are stopped before execution, and rollback is complete and
  recoverable.
- **Completion evidence:** pending execution.

## Delivery Impact

### Requirements

There is no separate requirements system in this repository. The three
approved sources in the Planning Gate mapping are the complete requirement
authority for this package.

### QA

QA mapping impact: none. The fixture runner and real Codex canaries are
engineering verification for personal configuration, not product QA cases.

### Documentation

- `README.md`, current user guidance: replace the hooks-not-implemented status
  and document installation, trust review, testing, troubleshooting, and
  rollback after `T4` establishes those claims.
- `HOOKS_INTENT.md`, accepted design intent: retain as the source contract;
  change it only when verified platform constraints contradict a material
  design statement.
- `HOOKS_PLAN.md`, implementation authority and execution record: update only
  canonical transition state and completion evidence during execution.

### Security And Privacy

- Do not log complete hook input, commands, paths containing secrets, file
  contents, environment variables, or tool metadata.
- Fixtures use synthetic values only.
- Error output is bounded and generic.
- A hook denial is a guardrail decision, not a claim of sandbox isolation.

## Final Conformance

After all four transitions are complete and before marking this plan
`Completed`:

1. run the full deterministic fixture suite and record the actual invocation
   and result;
2. repeat the fresh-session safe, denied, ambiguous, no-leak, and rollback
   canaries;
3. confirm the activation link resolves exactly to the versioned
   `hooks.json`;
4. confirm `/hooks` reports the expected reviewed source and active state;
5. validate changed Markdown with the repository's `rumdl` workflow;
6. review the complete task diff for scope, secrets, and unintended changes;
7. confirm `AGENTS.md` remains the authoritative semantic fallback; and
8. record all completion evidence, then set status to `Completed` only if no
   required claim remains unresolved.

## Review Handoff

An independent reviewer must validate the complete Draft against the Reviewed
baseline, the three approved sources, and the official current hook contract.
Only that review may change the plan status to `Ready for execution`.
