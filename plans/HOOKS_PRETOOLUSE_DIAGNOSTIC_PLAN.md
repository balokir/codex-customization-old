# Codex Hooks PRETOOLUSE-DIAGNOSTIC Investigation Plan

This artifact is a standalone follow-up investigation for the failed live
denial proof in DEPLOYMENT `D2`. It does not reopen ENGINE, complete D2, or
authorize a production correction. Its independent complete-plan review has
published `Ready for execution`.

## Planning Gate Result: `PKG-HOOK-PRETOOLUSE-DIAGNOSTIC`

### Package Contract

- **Kind:** `CHARACTERIZATION`.
- **Trigger:** the exact user-level hook was discovered and trusted during D2,
  but a harmless two-read canary executed in fresh Codex CLI sessions while
  direct ENGINE simulation denied the intended raw `PreToolUse` envelope.
- **Sources:** the parent mismatch contract in
  [`HOOKS_PLAN.md`](../HOOKS_PLAN.md#cross-child-mismatch-and-follow-up-contract),
  [DEPLOYMENT D2's proof obligations](HOOKS_DEPLOYMENT_PLAN.md#d2-activate-trust-disable-and-restore),
  the completed ENGINE handoff, the D1 deployment configuration, the observed
  D2 rollback state, and the current
  [official OpenAI Hooks contract](https://learn.chatgpt.com/docs/hooks).
- **Primary invariant `INV-DIAGNOSTIC-ATTRIBUTION`:** every conclusion is tied
  to one exact CLI version, hook definition hash, trust state, session mode,
  event shape, handler result, and host outcome; an execution-process wrapper
  is never treated as hook input without direct hook-boundary evidence.
- **Depends on:** D1 commit
  `20fcc53a3ec6b4dbecc110baa303f3e6ed7eb5fb`, unchanged ENGINE runtime
  artifacts, and the known inactive user-link state after the failed D2 attempt.
- **Provides:** one evidence-backed root-cause classification or the smallest
  explicitly bounded unresolved layer, plus the correct follow-up handoff.
- **Scope boundary:** dependency-free diagnostic fixtures and handlers,
  bounded sanitized evidence, the exact temporary user-level diagnostic link,
  and exact-definition trust changes performed only through `/hooks`.
- **Minimum closure:** prove whether the diagnostic hook runs and capture the
  allowlisted `PreToolUse` shape; if deterministic diagnostic denial is invoked
  and enforced, trace the unchanged ENGINE decision through a transparent
  proxy; otherwise classify the terminal transport boundary. In every branch,
  correlate the handler result with the host outcome, rollback to the known
  inactive state, and classify the failing layer or smallest unresolved layer.
- **Explicit exclusions:** production ENGINE or policy changes, production
  `hooks.json` changes, D2 completion, README or intent changes, ACCEPTANCE,
  Codex upgrade or downgrade, project-folder trust changes, external issue
  submission, and unrelated `~/.codex` mutation.

### Current Evidence Baseline

The investigation starts from these observations, not from a presumed cause:

- repository HEAD after D1 is
  `20fcc53a3ec6b4dbecc110baa303f3e6ed7eb5fb`;
- `hooks/hooks.json` SHA-256 is
  `0ee2edb0ff7f4b35a24cd1099baf0dc86260911ee958a64aa070cd87af4d9879`;
- the attempted host was Codex CLI `0.159.0` on Windows with independent Node
  `C:\nvm4w\nodejs\node.exe`;
- `/hooks` displayed and trusted the exact user source, matcher, command, and
  five-second timeout;
- multiple fresh noninteractive sessions executed the harmless two-read
  canary with exit `0` and empty output;
- direct ENGINE simulation denied the intended raw event with the expected
  multiple-read reason;
- a session `CommandExecution` record showed Codex launching
  `pwsh.exe -Command <canary>`, but that record describes the executor process
  and does not establish what the hook received on stdin;
- the exact user activation link was removed after the failed proof and is
  currently absent; and
- the exact trusted-definition record may remain persisted but is inactive
  while its source link is absent.

### Official Contract Baseline

The investigation must recheck the current official OpenAI Hooks documentation
at execution time and record the access date. The present planning baseline is:

- unified exec is covered by `PreToolUse` and matches as `Bash`;
- a command hook receives one JSON object on stdin;
- shell events expose the command as `tool_input.command`;
- a synchronous `PreToolUse` deny uses the documented hook-specific JSON shape
  or the documented exit-code path; and
- `/hooks` is the supported review and exact-definition trust surface.

Documentation drift is evidence. If the official contract materially changes,
stop and revise this plan before running live probes.

### Trigger Scan

| Trigger | Result | Diagnostic consequence |
|---|---|---|
| `LIFECYCLE` | `YES` | Temporary link and trust states must be explicit and reversible |
| `CONCURRENCY` | `YES` | Every other matching hook must be excluded or attributed |
| `AUTHORITY` | `YES` | Discovery, trust, invocation, decision, and enforcement are separate facts |
| `RECOVERY` | `YES` | Every failure path returns to an absent exact link |
| `COMPATIBILITY` | `YES` | CLI mode, tool name, input keys, and Windows execution may differ |
| `READINESS` | `YES` | A cause claim requires complete boundary attribution |
| `MULTI_ATOMICITY` | `NO` | No production state becomes accepted in this investigation |
| `CROSS_LAYER` | `NO` | No database or remote service boundary is involved |

### ART-DIAGNOSTIC: Evidence Contract

Diagnostic code and recorded evidence may retain only:

- a non-secret probe identifier;
- CLI version and session-mode label;
- hook source hash, matcher, and observed trust class;
- hook invocation count;
- `hook_event_name`, canonical `tool_name`, JSON value types, and input key names;
- command length, SHA-256 for a known synthetic canary, and one allowlisted shape
  class: `expected-raw`, `pwsh-wrapper`, `other`, `missing`, or `non-string`;
- diagnostic branch, handler exit code, output JSON key names, decision class,
  and a fixed bounded reason code; and
- host outcome: `blocked`, `executed`, `hook-error`, `timeout`, or `unknown`.

It must not retain raw commands, prompts, payloads, file contents, transcript
content, environment values, tool descriptors, schemas, credentials, or
secrets. Per-probe evidence is capped at 4 KiB. Unknown shapes are classified
without copying their values.

### ART-CAUSE: Decision Tree

| Observation | Classification |
|---|---|
| Diagnostic handler is not invoked | discovery, trust, feature, matcher, or session-mode layer; subdivide with `/hooks` and mode matrix |
| Handler runs but event or `tool_input.command` violates the documented shape | Codex host-contract compatibility issue |
| Synthetic diagnostic deny is emitted but host executes | host decision-consumption issue |
| Synthetic diagnostic deny blocks, but transparent ENGINE proxy emits no deny | ENGINE classification or event-shape compatibility issue |
| ENGINE proxy emits a valid deny but host executes | host handling issue specific to the proxied decision path |
| Proxy blocks but production definition does not | production discovery, trust, command invocation, or definition-specific issue |
| Competing hook can affect the result | evidence is unattributable until isolated or fully accounted for |
| No row receives complete evidence | unresolved; report the smallest unproven boundary without a root-cause claim |

`pwsh.exe` is classified as hook input only if the diagnostic handler directly
classifies its stdin that way. Executor traces alone cannot satisfy that proof.

### Gate Conclusion

The scope is sufficient for a non-mutating production diagnosis: it separates
hook discovery from invocation, handler input from executor implementation,
ENGINE decision from host enforcement, and diagnosis from correction. It has a
bounded evidence contract and a mandatory rollback path.

Open decisions: none. Unmapped diagnostic scope: none. Production correction
authority: none.

Review verdict: `READY`. The independent complete-plan review verified the
official contract baseline on 2026-11-08, corrected the conditional execution
graph and cleanup order, made symbolic-link capability explicit, and found no
remaining prerequisite, dependency, ordering, or proof-obligation gap.

## Child Plan: PRETOOLUSE-DIAGNOSTIC

### Plan Core

- **Status:** `Ready for execution`.
- **Permitting result:**
  [`PKG-HOOK-PRETOOLUSE-DIAGNOSTIC`](#planning-gate-result-pkg-hook-pretooluse-diagnostic),
  `CHARACTERIZATION`.
- **Reviewed baseline:**
  `20fcc53a3ec6b4dbecc110baa303f3e6ed7eb5fb`.
- **Goal:** identify why a trusted user-level `PreToolUse` hook did not produce
  the expected active denial in fresh Codex CLI sessions.
- **Target state:** one attributable root-cause classification or a precisely
  bounded unresolved layer, with the user activation link absent afterward.

### External Prerequisites

- D1 remains complete; commit
  `20fcc53a3ec6b4dbecc110baa303f3e6ed7eb5fb` remains in the current history and
  D1-owned artifacts still match its recorded identities.
- ENGINE script and policy hashes still match ENGINE Final Conformance.
- `C:\nvm4w\nodejs\node.exe` is available.
- Windows symbolic-link permission remains available for the exact user link.
- The exact user activation link is absent before investigation.
- Codex CLI `0.159.0` remains available for baseline reproduction.
- `/hooks` can inspect and review the exact temporary diagnostic definition.
- A fresh task-owned temporary directory can be created and resolved before it
  is passed to diagnostic code.

### Writable Authorization

The proposed writable boundary is limited to:

- `C:\work\balokir\codex-customization\hooks\diagnostics\**`;
- `C:\work\balokir\codex-customization\hooks\tests\diagnostics\**`;
- this plan's state and bounded completion-evidence sections;
- one exact, pre-resolved task-owned directory below the operating-system temp
  directory for transient sanitized probe records;
- the exact link `C:\Users\user\.codex\hooks.json`; and
- the Codex-managed trust record for each exact diagnostic definition, changed
  only through `/hooks`.

No other user-managed path under `C:\Users\user\.codex` is writable. The plan
must not edit `hooks/pre_tool_use.mjs`, `hooks/policy.json`, production
`hooks/hooks.json`, ENGINE, DEPLOYMENT, ACCEPTANCE, README, `HOOKS_INTENT.md`,
Codex configuration, project trust, or the Codex installation.

### Diagnostic Design Constraints

- Use dependency-free Node.js and the independent runtime.
- Match only `^Bash$` for live probes.
- Use a unique synthetic marker and a harmless no-output canary.
- The diagnostic handler has two reviewed branches:
  1. a deterministic transport-deny branch independent of ENGINE; and
  2. a transparent ENGINE-proxy branch that forwards the original stdin,
     captures only allowlisted metadata about ENGINE's result, and preserves
     its stdout, stderr, and exit status unchanged.
- Fixture tests must prove the 4 KiB evidence cap, allowlist, unknown-shape
  behavior, no raw-value retention, output pass-through, and cleanup.
- Never infer hook invocation from command execution or transcript presence.
- Never use `--dangerously-bypass-hook-trust`.
- Do not upgrade or downgrade Codex during the baseline matrix.
- If interactive CLI requires saving project-folder trust, record that mode as
  unavailable; do not authorize the mutation.

### Lifecycle And Recovery

| State | Event | Required result |
|---|---|---|
| Inactive | Install exact diagnostic link | Discovered, review required |
| Discovered | Review through `/hooks` | Exact diagnostic definition trusted |
| Trusted | Run transport probe in fresh session | Invocation and deterministic deny classified |
| Trusted | Run ENGINE-proxy probe in fresh session | Event, ENGINE decision, and host result correlated |
| Any active diagnostic state | Aborting failure or investigation completion | Remove only the verified exact link |
| Link absent | Verify inactive canary | Exit `0`, no output, no diagnostic record |
| Inactive verified | Remove transient evidence directory | No task-owned temp evidence remains |

An unexpected destination, changed source hash, or failed cleanup stops
execution. Preserve the unexpected object and report it; do not overwrite or
delete unverified state. A competing unattributed hook stops further live
probing and routes to I4 as a bounded evidence gap after recovery removes the
verified exact diagnostic link.

### Execution Rule

Execute `I1 -> I2 -> I3 -> I4` when I2 proves that the deterministic diagnostic
deny is invoked and enforced. If I2 instead reaches a terminal transport result,
execute `I1 -> I2 -> I4` and record I3 as not applicable. Start a fresh agent
for each executed top-level step and continue automatically after each completed
step. Commit a completed top-level step only when it produced repository
changes; do not create empty commits and do not push. A contradiction, scope
escape, or failed rollback stops the cycle and is recorded before handoff.

### Compact Execution Surface

| Order | Transition | Depends on | Provides |
|---|---|---|---|
| 1 | [`I1`](#i1-freeze-the-baseline-and-build-bounded-diagnostics) | reviewed plan and external prerequisites | Tested diagnostic package and exact matrix |
| 2 | [`I2`](#i2-prove-live-hook-transport) | `I1` | Attributed transport classification and one I3/I4 route |
| 3 | [`I3`](#i3-trace-the-engine-decision-path) | `I2` proves diagnostic denial is invoked and enforced | Correlated event, ENGINE decision, and host outcome |
| 4 | [`I4`](#i4-classify-the-cause-and-publish-the-handoff) | completed `I3`, or an `I2` terminal transport result | Root-cause or bounded-unresolved handoff and restored state |

### I1: Freeze The Baseline And Build Bounded Diagnostics

State: `[x]`

- **Resulting truth:** the exact baseline, session-mode matrix, canaries, and
  diagnostic handler are fixed and fixture-verified before any live mutation.
- **Predecessors:** none; reviewed plan and external prerequisites are required.
- **Work:** verify hashes and inactive state; record official-contract access
  date; enumerate only the relevant matching hook sources; implement the
  bounded diagnostic handler, config, and fixtures; pre-resolve the temp path.
- **Completion proof:** tests cover supported and malformed events, both handler
  branches, ENGINE pass-through, fixed decision shapes, evidence allowlisting,
  size limit, confidentiality, and cleanup without invoking Codex.
- **Completion evidence:** On 2026-11-08, the official OpenAI Hooks contract was
  rechecked at `https://learn.chatgpt.com/docs/hooks`. It still states that
  unified exec matches `PreToolUse` as `Bash`, command hooks receive one JSON
  object on stdin, Bash exposes `tool_input.command`, the documented
  hook-specific deny shape and exit-code `2` path block supported calls, and
  `/hooks` reviews and trusts an exact definition hash. No material contract
  drift was found.

  HEAD `7e61c977a9a6ca67ebf8a6fbae13a4272866a3f2` contains required D1 commit
  `20fcc53a3ec6b4dbecc110baa303f3e6ed7eb5fb`. The verified SHA-256 identities
  remained `0b15771495bd4164ebd5db9c28f4980fa14758b76924fc9684faa055d09518e3`
  for `hooks/pre_tool_use.mjs`,
  `5959c76e353c0be962ebe60e0efc5ccffaba98509794220afdff651544aef046`
  for `hooks/policy.json`, and
  `0ee2edb0ff7f4b35a24cd1099baf0dc86260911ee958a64aa070cd87af4d9879`
  for production `hooks/hooks.json`. Independent Node reported `v25.0.0` and
  Codex reported `codex-cli 0.159.0`. The exact user activation link was absent.
  Symbolic-link capability was fixture-verified inside the pre-resolved,
  initially empty task directory
  `C:\Users\user\AppData\Local\Temp\codex-pretooluse-diagnostic-20261108-6f3a2c`.

  The relevant filesystem source scan found no inline user `PreToolUse`, no
  project `.codex` hook source, and no installed plugin `hooks/hooks.json`;
  production matcher `*` remained versioned but inactive because its exact user
  link was absent. Live `/hooks` enumeration remains an I2 attribution check.

  I1 added only the authorized diagnostic package and fixtures. The bounded
  handler SHA-256 is
  `6a1378d8574110241e239a77b210bb70f85d06bcb2c98d73f3304ff9244d7f64`;
  exact transport and ENGINE-proxy definition hashes are respectively
  `cc34cde3fdc2b78e17236da4f12c84302777f83863714d9813002b2945530f65`
  and `83c8dc83e8a53b95d48fce4e4150f87ac3c959056829b7f85f86a1a3846d3169`.
  The fixed matrix covers fresh default exec, fresh ephemeral exec, and fresh
  interactive mode, with the interactive mode skipped if it would persist
  project trust. The benign, transport-deny, and ENGINE-proxy canaries retain
  only lengths and SHA-256 identities in the probe specification.

  `C:\nvm4w\nodejs\node.exe .\hooks\tests\diagnostics\run-tests.mjs`
  exited `0` with `I1: 16 diagnostic fixture groups passed`. The fixtures cover
  supported and malformed events, all allowlisted shape classes, exact deny
  keys, invocation counting, unknown-shape confidentiality, the 4 KiB cap,
  byte-for-byte ENGINE stdout/stderr and exit-status pass-through, non-zero
  proxy results, and cleanup without invoking Codex. The existing ENGINE/D1
  suite also exited `0` with
  `E1/E2/E3: 67 fixture cases passed; D1: 8 deployment fixture cases passed`.

### I2: Prove Live Hook Transport

State: `[x]`

- **Resulting truth:** discovery, exact trust, and host outcome are observed for
  each attempted fresh-session mode; invocation, event shape, diagnostic
  decision, and enforcement are either observed or bounded at the first absent
  or incompatible transport layer.
- **Predecessor:** `I1`.
- **Work:** install and verify the exact diagnostic link; review through
  `/hooks`; run a benign probe and the unique transport-deny probe; correlate
  the bounded diagnostic record with the host result; do not run ENGINE proxy
  until deterministic transport denial is attributable.
- **Completion proof:** every attempted mode is classified without inferring
  hook input from executor logs, and I2 records exactly one route: proceed to I3
  only when a trusted handler invocation emits an attributable deterministic
  deny that the host enforces, or proceed directly to I4 with a terminal
  transport classification or the smallest bounded transport gap.
- **Routing rule:** skip I3 and proceed to I4 if no mode invokes the trusted
  handler, the documented input contract is violated, an attributable deny is
  emitted but not enforced, or competing hook behavior cannot be isolated or
  fully accounted for. Lifecycle recovery still removes the verified exact link
  on any failure before execution stops.
- **Completion evidence:** On 2026-11-08, the exact symbolic link to the
  transport definition hash
  `cc34cde3fdc2b78e17236da4f12c84302777f83863714d9813002b2945530f65`
  was installed and reviewed through `/hooks`. The review surface showed one
  user `PreToolUse` definition, matcher `^Bash$`, the exact diagnostic command,
  synchronous mode, and a five-second timeout. After exact-definition trust,
  `/hooks` reported `Installed=1`, `Active=1`, no pending review, and no
  competing hook.

  The fresh-session matrix produced this bounded result:

  | Session mode | Benign host outcome | Transport-deny host outcome | Handler record |
  |---|---|---|---|
  | `exec-default-fresh` | `executed`, exit `0` | `executed`, exit `0` | absent for both probes |
  | `exec-ephemeral-fresh` | `executed`, exit `0` | `executed`, exit `0` | absent for both probes |
  | `interactive-fresh` | `hook-error` | `hook-error` | absent for both probes |

  Both interactive probes reported hook process creation failure as bounded
  reason `access-denied-os-error-5`; unified exec did not start in those
  sessions. Interactive startup did not request or persist project-folder
  trust. No mode produced diagnostic evidence, so no hook-boundary event shape
  or handler decision exists to support I3. Executor output was used only to
  classify host outcome and was not substituted for hook input.

  I2 therefore selects the terminal `I4` route and bounds the unresolved layer
  between an exact trusted active definition and diagnostic-handler process
  start/invocation, with session-mode-dependent host handling. The ENGINE proxy
  was not run. Recovery reverified the exact link type, target, and source hash,
  removed only that link, and proved the target remained intact and the user
  activation path was absent. The resolved task temp directory remains present
  for I4 cleanup and contains zero probe records.

### I3: Trace The ENGINE Decision Path

State: `[N/A]` under I2's terminal transport routing rule.

- **Resulting truth:** the exact live event, unchanged ENGINE result, and host
  outcome are correlated without modifying ENGINE or retaining the command.
- **Predecessor:** `I2` with an attributable diagnostic deny that the host
  enforced.
- **Work:** run the transparent ENGINE-proxy branch with the harmless
  discriminating canary; compare only allowlisted shape classes and decision
  metadata with the direct fixture result; repeat once in a fresh session to
  exclude one-off state.
- **Completion proof:** the ART-CAUSE decision tree selects exactly one supported
  layer or identifies the smallest remaining evidence gap.
- **Completion evidence:** pending execution.

### I4: Classify The Cause And Publish The Handoff

State: `[ ]`

- **Resulting truth:** the investigation has an evidence-backed conclusion,
  all live diagnostic state is removed, and correction work has a correctly
  scoped next authority.
- **Predecessor:** completed `I3`, or `I2` with a recorded terminal transport
  route.
- **Work:** remove only the verified diagnostic link; prove inactive behavior;
  record and verify the sanitized matrix and cause classification in this plan;
  then remove the resolved temp directory; prepare but do not submit an
  issue-ready reproduction if the host is implicated.
- **Follow-up routing:** ENGINE incompatibility requires a new DELIVERY Gate and
  plan; Codex host behavior requires an external issue or version-compatibility
  decision; configuration or trust mismatch requires a new exact-version
  DEPLOYMENT plan. This investigation authorizes none of those corrections.
- **Completion proof:** link absent, transient evidence removed, excluded files
  unchanged, and every conclusion maps to recorded bounded evidence.
- **Completion evidence:** pending execution.

### Final Conformance

After every applicable step is complete, with I3 either complete or explicitly
recorded as not applicable under I2's routing rule:

1. confirm every retained field satisfies ART-DIAGNOSTIC and the 4 KiB cap;
2. confirm ART-CAUSE selects one supported classification or explicitly bounded
   unresolved layer;
3. confirm executor evidence was not substituted for hook-boundary evidence;
4. confirm ENGINE, policy, production config, D2, intent, README, ACCEPTANCE,
   Codex configuration, project trust, and installation did not change;
5. confirm the exact user activation link is absent and inactive behavior was
   observed in a fresh session; and
6. confirm no transient diagnostic evidence remains outside tracked authorized
   artifacts.

#### Final Conformance Evidence

Pending execution. Record exact versions and hashes, sanitized mode matrix,
invocation and decision classes, host outcomes, rollback proof, retained-file
inventory, and the selected follow-up route.

## Review Verdict

Independent REVIEW verified the official-contract baseline, evidence allowlist,
cause tree, writable boundary, diagnostic proxy transparency, session-mode
feasibility, rollback path, conditional execution order, and proof obligations.
The plan is `Ready for execution`.
