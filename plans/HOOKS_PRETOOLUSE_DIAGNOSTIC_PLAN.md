# Codex Hooks PRETOOLUSE-DIAGNOSTIC Investigation Authority

This artifact replaces the invalid terminal-CLI diagnostic plan with an
independently reviewed ACP-specific investigation for the actual target host.
It does not reopen ENGINE, complete DEPLOYMENT `D2`, or authorize a production
correction.

## Prior Result Invalidation

The execution recorded by commits `7e61c97`, `4691dd8`, `7cf2852`, and
`ce129a3` exercised the standalone OpenAI Codex terminal CLI `0.159.0`. That
host was not the intended integration boundary. Its verdict
`COMPLETE — BOUNDED UNRESOLVED` is withdrawn for this workstream and must not be
used as evidence about IDEA, ACP, DEPLOYMENT readiness, or ENGINE compatibility.

The previous run remains available in Git history only as wrong-host
characterization. Its fixture code may be reused after review, but none of its
live discovery, trust, invocation, error, or host-outcome observations satisfy
this revised plan.

## Planning Gate Result: `PKG-HOOK-PRETOOLUSE-DIAGNOSTIC-ACP`

### Package Contract

- **Kind:** `CHARACTERIZATION`.
- **Trigger:** DEPLOYMENT `D2` requires live proof for the Codex instance used
  from IDEA, while the completed diagnostic run exercised an unrelated global
  terminal CLI.
- **Target host:** IDEA AI Chat configured with the Custom ACP client command
  `C:\nvm4w\nodejs\codex-acp.cmd`.
- **Resolved runtime chain:** the configured command uses the independent NVM
  Node runtime to start `@agentclientprotocol/codex-acp` `2.5.0`, which bundles
  `@openai/codex` `0.165.0`. The user confirmed that the current conversation
  uses this exact Custom ACP integration.
- **Sources:** the current user correction; the parent mismatch contract in
  [`HOOKS_PLAN.md`](../HOOKS_PLAN.md#cross-child-mismatch-and-follow-up-contract);
  [DEPLOYMENT D2](HOOKS_DEPLOYMENT_PLAN.md#d2-activate-trust-disable-and-restore);
  the completed ENGINE handoff; the D1 deployment configuration; the
  [official OpenAI Hooks contract](https://learn.chatgpt.com/docs/hooks);
  the [official Codex IDE integration guidance](https://learn.chatgpt.com/docs/codex/ide);
  and the [official Codex App Server lifecycle reference](https://learn.chatgpt.com/docs/app-server).
- **Primary invariant `INV-ACP-ATTRIBUTION`:** functional acceptance uses
  the C1 independent ACP runtime baseline together with IDEA handler evidence
  and observed IDEA shell outcomes. Bundled CLI controls do not substitute for
  target IDEA evidence. Per-canary process/session identities and definition
  hashes, IDEA hook-management capabilities and trust UI, and ACP lifecycle
  notifications are optional diagnostics, not C2 acceptance gates.
- **Depends on:** D1 commit
  `20fcc53a3ec6b4dbecc110baa303f3e6ed7eb5fb`, unchanged ENGINE runtime
  artifacts, the known inactive user-link state, and the existing IDEA Custom
  ACP configuration.
- **Provides:** one ACP-specific root-cause classification or the smallest
  explicitly bounded unresolved ACP layer, plus the correct follow-up handoff.
- **Scope boundary:** dependency-free diagnostic handlers and fixtures, bounded
  sanitized evidence, the exact temporary user-level diagnostic link, fresh
  IDEA Custom ACP sessions, and trust managed through documented interactive
  Codex mechanisms (including the independent bundled CLI).
- **Minimum closure:** establish the configured independent ACP runtime
  baseline; prove benign `PreToolUse` handler invocation and `allow` through
  IDEA; prove diagnostic `deny` emitted by the handler and enforced before
  shell execution in IDEA; check ENGINE through the C3 proxy when permitted;
  and restore the inactive user-level state in C4.
- **Explicit exclusions:** standalone CLI `0.159.0`; `codex exec`; terminal TUI
  evidence; JetBrains' separate bundled ACP installation; production ENGINE,
  policy, or `hooks.json` changes; D2 completion; README, intent, or ACCEPTANCE
  changes; ACP package, Codex, Node, IDEA, or plugin upgrades; Custom ACP client
  reconfiguration; project-folder trust changes; external issue submission;
  and unrelated `~/.codex` mutation.

### Target Runtime Identity

The reviewed baseline resolves the target chain as follows:

```text
IDEA AI Chat
  -> Custom ACP client
  -> C:\nvm4w\nodejs\codex-acp.cmd
  -> C:\nvm4w\nodejs\node.exe
  -> @agentclientprotocol/codex-acp 2.5.0
  -> bundled @openai/codex 0.165.0
```

At plan revision time:

- `C:\nvm4w\nodejs` is a symbolic link to the active NVM Node `v25.0.0` root;
- `codex-acp.cmd` is the npm command shim for
  `@agentclientprotocol/codex-acp\dist\index.js`;
- the ACP entry module SHA-256 is
  `15de6b2dd5203876a48b12861378bcf87040d623ab2159e05052dc9d54c32b16`;
- the configured `codex-acp.cmd` shim SHA-256 is
  `333a7c36daf9e73d55f123d36af6a46d2ed2dd5a14a9894f0f525b09f4c4a039`;
- the bundled `codex.exe` reports `codex-cli 0.165.0` and has SHA-256
  `d4b2e6a054ea1dfe53217f9d8942c5f8a9f4b76171a1e0bb76ced5759915300a`;
  and
- matching versions and hashes in JetBrains' separate bundled installation do
  not make that installation the target. Process provenance must resolve to the
  configured NVM command chain above.

Execution must reverify every identity before live mutation. A changed command,
package version, binary hash, or process provenance invalidates this baseline
and requires plan review before continuing.

The reviewed `codex-acp` `2.5.0` implementation contains the JetBrains AIR
`codexHooks` capability and the `_codex/hooks/list` and `_codex/hooks/trust`
extension methods. It advertises `codexHooks` only on the ACP v1 initialization
path, and its list implementation filters App Server results to hooks whose
source is `sessionFlags`. This is adapter implementation evidence, not proof
that the running IDEA client negotiated the capability or can see the exact
user-level source. IDEA capability negotiation, hook-management UI, and source listing are
optional compatibility diagnostics, not conditions for functional
`PreToolUse` verification. Private ACP methods must not be called out of band
and then attributed to IDEA.

### Official Contract Baseline

The investigation must recheck the official OpenAI documentation at execution
time and record the access date. The present baseline is:

- local synchronous hooks use the documented discovery, trust, input, decision,
  and timeout contracts;
- unified exec is covered by `PreToolUse` and matches as `Bash` in the Codex
  hook contract;
- shell events expose the tool input command as `tool_input.command`;
- Codex rich clients may receive `hook/started` and `hook/completed` lifecycle
  notifications for synchronous hooks;
- official App Server behavior is supporting context, not proof that
  `codex-acp` forwards those notifications unchanged to IDEA; and
- official OpenAI documentation does not establish JetBrains Custom ACP
  capability negotiation or the adapter's private hook extensions. These are
  optional compatibility diagnostics rather than C2 acceptance requirements.

Documentation drift is evidence. A material contract change stops execution
and requires plan revision.

### Trigger Scan

| Trigger | Result | ACP-specific consequence |
|---|---|---|
| `LIFECYCLE` | `YES` | Exact link activation, new chat after changes, and rollback must be explicit |
| `CONCURRENCY` | `YES` | Other matching hooks and simultaneous ACP sessions must be excluded or attributed |
| `AUTHORITY` | `YES` | Handler decisions and IDEA host outcomes are separate evidence sources |
| `RECOVERY` | `YES` | Every failure path removes only the verified exact link and closes task-owned diagnostics |
| `COMPATIBILITY` | `YES` | ACP adapter, bundled Codex, tool mapping, event keys, and Windows execution may differ |
| `READINESS` | `YES` | Functional success requires correlated handler evidence and IDEA host enforcement |
| `MULTI_ATOMICITY` | `NO` | No production state becomes accepted during characterization |
| `CROSS_LAYER` | `NO` | No database or remote service boundary is involved |

### ART-ACP-EVIDENCE: Bounded Evidence Contract

Diagnostic code and retained evidence may record only:

- a non-secret probe identifier;
- the configured ACP command path and its SHA-256 identity;
- adapter version, ACP entry hash, bundled Codex version and binary hash;
- ACP process ID, parent process ID, start time, and an allowlisted provenance
  class without command-line arguments or environment values;
- ACP session/thread/turn identifiers only when already surfaced by the client
  and needed for hook-event correlation;
- hook source hash, matcher, synchronous flag, timeout, and observed trust class;
- handler invocation count;
- `hook_event_name`, canonical `tool_name`, JSON value types, and input key names;
- command length, SHA-256 for a known synthetic canary, and one allowlisted shape
  class: `expected-raw`, `pwsh-wrapper`, `other`, `missing`, or `non-string`;
- handler branch, exit code, output JSON key names, decision class, and fixed
  bounded reason code;
- presence or absence of ACP-visible hook lifecycle events, retaining only event
  names, status, and correlation identifiers; and
- host outcome: `blocked`, `executed`, `hook-error`, `timeout`, or `unknown`.

It must not retain raw commands, prompts, payloads, file contents, transcript
content, full process command lines, environment values, tool descriptors,
schemas, credentials, or secrets. Per-probe evidence is capped at 4 KiB.
Unknown shapes are classified without copying their values.

### ART-ACP-CAUSE: Decision Tree

| Observation | Classification |
|---|---|
| Process provenance does not resolve to the configured NVM `codex-acp.cmd` chain | wrong host; evidence invalid |
| IDEA lacks ACP hook-management capability, listing, or trust UI while hooks execute | Optional client management limitation, not a C2 failure |
| The configured IDEA ACP session produces no handler evidence | Check active definition, trust, shell matcher, and handler launch |
| Trusted definition is active but handler is not invoked | ACP-to-Codex hook transport or process-start issue |
| Handler runs but input violates the documented shape | ACP/Codex host-contract compatibility issue |
| Synthetic diagnostic deny is emitted but ACP host executes | ACP decision-consumption issue |
| Synthetic diagnostic deny blocks but transparent ENGINE proxy emits no deny | ENGINE classification or ACP event-shape compatibility issue |
| ENGINE proxy emits a valid deny but ACP host executes | ACP handling issue specific to the production decision path |
| Diagnostic proxy blocks but production definition does not | production definition discovery, trust, or invocation issue |
| Competing hook or concurrent session can affect the result | evidence unattributable until isolated or fully accounted for |
| No row receives complete evidence | unresolved; report the smallest unproven ACP boundary without a root-cause claim |

Handler evidence and IDEA host outcomes must be evaluated independently and
correlated for functional acceptance. ACP lifecycle events, process telemetry,
and IDEA hook-management UI are optional diagnostics.

### Gate Conclusion

The revised scope isolates the actual IDEA Custom ACP host, rejects the invalid
terminal-CLI evidence, separates ACP process identity from hook invocation, and
preserves the prior bounded confidentiality and rollback contracts. It does not
assert that IDEA exposes a trust UI or hook lifecycle notifications; those are
subjects of characterization.

Open decisions: none. Unmapped ACP diagnostic scope: none. Production
correction authority: none.

Gate verdict: `READY`. Planning is allowed only for the child investigation
plan below.

## Child Plan: PRETOOLUSE-DIAGNOSTIC-ACP

### Plan Core

- **Status:** `In execution`.
- **Permitting result:**
  [`PKG-HOOK-PRETOOLUSE-DIAGNOSTIC-ACP`](#planning-gate-result-pkg-hook-pretooluse-diagnostic-acp),
  `CHARACTERIZATION`.
- **Reviewed baseline:**
  `ce129a32dba1b158f111887e68ce798cd317f917`.
- **Goal:** identify why the target IDEA Custom ACP integration does or does not
  invoke and enforce the user-level `PreToolUse` hook.
- **Target state:** one attributable ACP-specific root-cause classification or
  a precisely bounded unresolved ACP layer, with the user activation link absent
  and all task-owned transient evidence removed afterward.

### External Prerequisites

- The user-confirmed IDEA Custom ACP configuration still launches
  `C:\nvm4w\nodejs\codex-acp.cmd`.
- D1 remains complete and the ENGINE script, policy, and production config
  hashes still match their recorded handoffs.
- `C:\nvm4w\nodejs\node.exe` is available independently of IDEA.
- The exact user activation link is absent before investigation.
- A new IDEA Custom ACP chat can start after each activation-state change.
- The configured IDEA Custom ACP chat can execute the diagnostic canaries;
  IDEA-specific discovery and trust controls are not prerequisites.
- A fresh task-owned temporary directory can be created, resolved, bounded, and
  removed without scanning unrelated temp content.

### Writable Authorization

The writable boundary is limited to:

- `C:\work\balokir\codex-customization\hooks\diagnostics\**`;
- `C:\work\balokir\codex-customization\hooks\tests\diagnostics\**`;
- this plan's state and bounded completion-evidence sections;
- one exact, pre-resolved task-owned directory below the operating-system temp
  directory for transient sanitized ACP probe records;
- the exact link `C:\Users\user\.codex\hooks.json`; and
- the Codex-managed trust record for the exact diagnostic definition, changed
  only through the documented Codex trust workflow (including the bundled
  CLI), not through direct trust-file editing.

No other user-managed path under `C:\Users\user\.codex` is writable. Execution
must not edit `codex-acp.cmd`, its npm package, bundled Codex, IDEA settings,
Custom ACP client configuration, `hooks/pre_tool_use.mjs`, `hooks/policy.json`,
production `hooks/hooks.json`, ENGINE, DEPLOYMENT, ACCEPTANCE, README,
`HOOKS_INTENT.md`, Codex configuration, project trust, or the Codex installation.

### Diagnostic Design Constraints

- Use dependency-free Node.js and the independent NVM runtime.
- Reuse existing diagnostic assets only after C1 proves their bounded evidence,
  confidentiality, pass-through, and cleanup properties still hold.
- Before live use, C1 must replace all CLI `0.159.0`, `cliVersion`, `codex exec`,
  and CLI session-mode assumptions in the existing diagnostic definitions,
  probe specification, handler evidence fields, and fixtures with reviewed
  target-ACP identities and fresh IDEA chat/session semantics.
- Match only `^Bash$` for live probes.
- Use a unique synthetic marker and harmless no-output canaries.
- The diagnostic handler has two reviewed branches:
  1. a deterministic transport-deny branch independent of ENGINE; and
  2. a transparent ENGINE-proxy branch that forwards original stdin, records
     only allowlisted metadata about ENGINE's result, and preserves stdout,
     stderr, and exit status unchanged.
- Never use `codex exec`, terminal TUI, JetBrains' bundled ACP copy, or a
  different ACP harness as live proof for the target host.
- Never use `--dangerously-bypass-hook-trust`.
- Never infer handler invocation from a command-execution item, process list,
  IDEA status text, or ACP lifecycle event alone.
- Do not upgrade, downgrade, reinstall, or reconfigure any runtime during the
  baseline matrix.
- Use documented bundled CLI approval when necessary, but never present CLI
  canary execution as proof of IDEA ACP enforcement.
- Do not call private `_codex/hooks/list` or `_codex/hooks/trust` from another
  harness or require those methods for functional C2 acceptance.

### Lifecycle And Recovery

| State | Event | Required result |
|---|---|---|
| Inactive | Check the configured Custom ACP runtime against C1 | Independent NVM ACP selected |
| Inactive | Activate exact diagnostic link; approve via documented Codex trust if required | Diagnostic definition ready for fresh IDEA chat |
| Configured | Start a new IDEA Custom ACP chat | Target shell available for canary |
| Fresh target session | Run benign and transport-deny canaries | Handler `allow` and executed shell; handler `deny` and blocked shell |
| Proven transport | Run ENGINE-proxy probe in another fresh target session | Event, ENGINE decision, and host result correlated |
| Any active diagnostic state | Failure or completion | Remove only the verified exact link |
| Link absent | Start new target ACP chat and run inactive canary | Normal behavior, no diagnostic record |
| Inactive verified | Remove transient evidence directory | No task-owned temp evidence remains |

An unexpected destination, changed runtime identity, competing unattributed
hook, wrong process provenance, or failed cleanup stops execution. Preserve an
unexpected object and report it; do not overwrite or delete unverified state.

### Execution Rule

Execute `C1` through `C4` in the reviewed total order. Start a fresh agent for
each top-level step and continue automatically after each completed step. Commit
a completed top-level step only when it produced repository changes; do not
create empty commits and do not push. Fresh-agent ownership does not replace the
requirement for a newly started IDEA Custom ACP chat/process after each live
activation-state change. A contradiction, scope escape, wrong-host observation,
or failed rollback stops the cycle and is recorded before handoff.

### Compact Execution Surface

| Order | Transition | Depends on | Provides |
|---|---|---|---|
| 1 | [`C1`](#c1-freeze-the-actual-acp-baseline) | reviewed plan and external prerequisites | Verified target identity and reviewed diagnostic package |
| 2 | [`C2`](#c2-prove-live-pretooluse-transport-and-denial) | `C1` | Target handler invocation and enforced diagnostic denial |
| 3 | [`C3`](#c3-trace-the-engine-decision-through-acp) | `C2` proves handler invocation and enforced denial | Correlated ACP event, ENGINE decision, and host outcome |
| 4 | [`C4`](#c4-classify-the-acp-cause-and-restore-state) | `C3`, or terminal classification from `C2` | ACP-specific handoff and restored inactive state |

### C1: Freeze The Actual ACP Baseline

State: `[x]`

- **Resulting truth:** the exact IDEA Custom ACP command chain, live process
  provenance, versions, hashes, source state, canaries, and diagnostic assets
  are fixed and verified before live mutation.
- **Predecessors:** none; reviewed plan and external prerequisites are required.
- **Work:** verify the configured `codex-acp.cmd` path without editing IDEA;
  resolve the NVM link; verify adapter and bundled Codex identities; distinguish
  the target processes from standalone CLI and JetBrains-bundled processes;
  recheck official contracts; inspect only relevant adapter hook-capability and
  source-filter code; replace the known CLI-specific diagnostic metadata,
  probes, evidence fields, session matrix, and assertions with ACP-specific
  equivalents; then rerun and correct the authorized diagnostic fixtures.
- **Completion proof:** the current conversation or a designated fresh control
  chat has target provenance; fixtures cover supported and malformed events,
  both handler branches, ENGINE pass-through, decision shapes, evidence
  allowlisting, the 4 KiB cap, confidentiality, and cleanup without live hooks.
- **Completion evidence:** completed on 2026-11-08 without installing the user
  activation link. `C:\nvm4w\nodejs` still resolves to NVM Node `v25.0.0`;
  `codex-acp.cmd` reports adapter `2.5.0` and retains SHA-256
  `333a7c36daf9e73d55f123d36af6a46d2ed2dd5a14a9894f0f525b09f4c4a039`;
  the ACP entry retains SHA-256
  `15de6b2dd5203876a48b12861378bcf87040d623ab2159e05052dc9d54c32b16`;
  and the bundled `codex.exe` reports `0.165.0` with SHA-256
  `d4b2e6a054ea1dfe53217f9d8942c5f8a9f4b76171a1e0bb76ced5759915300a`.
  The control chat was attributed from IDEA PID `57128` through `cmd.exe` to
  configured-NVM ACP PID `39836` (started
  `2026-11-08T12:29:35.8008450+03:00`), NVM Codex launcher PID `49216`, and
  the configured package's bundled Codex PID `32884`; no standalone or
  JetBrains-bundled process supplied control evidence.

  The official Hooks, Codex IDE, and App Server documentation was rechecked on
  2026-11-08 with no material drift from the reviewed contract: unified exec
  matches `Bash`, `tool_input.command` carries the shell input, the documented
  deny shape is unchanged, and synchronous App Server hooks expose
  `hook/started` and `hook/completed`. Bounded installed-adapter inspection
  reconfirmed ACP-v1-only AIR `codexHooks`, `_codex/hooks/list`,
  `_codex/hooks/trust`, and the `sessionFlags` source filter.

  The diagnostic definitions, spec, handler evidence, and fixtures now bind
  the configured ACP identities and fresh IDEA chat phases rather than CLI
  `0.159.0`, `codex exec`, environment-injected probe metadata, or terminal
  session modes. The live definitions carry the exact spec, source, bounded
  task-owned temp destination, and phase arguments; unknown Bash commands are
  not retained. Fixtures proved supported and malformed envelopes, both
  handler branches, known-canary-only command hashing, fixed allowlisted
  evidence under 4 KiB, confidentiality, invocation counting, deterministic
  denial, exact ENGINE stdin/stdout/stderr/exit preservation, and cleanup.
  `C:\nvm4w\nodejs\node.exe .\hooks\tests\diagnostics\run-tests.mjs`
  reported `C1: 19 ACP diagnostic fixture groups passed`; the complete existing
  suite reported
  `E1/E2/E3: 67 fixture cases passed; D1: 8 deployment fixture cases passed`.
  The exact user link and the reserved evidence directory remained absent;
  ENGINE script SHA-256
  `0b15771495bd4164ebd5db9c28f4980fa14758b76924fc9684faa055d09518e3`,
  policy SHA-256
  `5959c76e353c0be962ebe60e0efc5ccffaba98509794220afdff651544aef046`,
  and the D1 production definition remained unchanged.

### C2: Prove Live PreToolUse Transport And Denial

State: `[x]`

- **Resulting truth:** the user-level diagnostic `PreToolUse` handler executes
  and enforces a deterministic denial through the configured IDEA Custom ACP.
- **Predecessor:** C1 identifies the independently installed ACP runtime.
- **Work:** activate the diagnostic definition; use documented interactive
  Codex trust controls if needed; start a fresh IDEA Custom ACP chat; submit
  the exact benign and transport-deny commands using the normal shell tool.
- **Completion proof:** the benign canary yields handler evidence with
  `PreToolUse`, `Bash`, `expected-raw`, `allow`, and successful shell execution;
  the deny canary yields matching `deny` handler evidence with the diagnostic
  reason and is blocked before shell execution. Correlate the handler record
  and target IDEA host outcome, using C1 for the independent runtime baseline.
- **Optional diagnostics, not gates:** per-probe PID, session ID, definition
  hash, IDEA `codexHooks` negotiation/listing/trust UI, and ACP
  `hook/started` / `hook/completed` notifications.
- **Stop conditions:** wrong host, no handler evidence for a known canary,
  invalid input shape, diagnostic `deny` not enforced, or competing activity
  making the observed evidence ambiguous.
- **Completion evidence (2026-11-08):** The diagnostic PowerShell launcher
  initially failed before Node due to a quoted leading executable path.
  Removing those quotes from `commandWindows` fixed the launch. The user
  reported all 19 diagnostic fixture groups passing afterward.

  Bundled Codex CLI `0.165.0` verified discovery, trust, and benign `allow`
  only as a lower-layer control. In IDEA Custom ACP, the benign command
  executed without hook failure, and the user-reported evidence counter rose
  `2 -> 3` with `PreToolUse`, `Bash`, `expected-raw`, `allow`.
  The target host reported `diagnostic-transport-deny` and blocked the deny
  canary before shell execution. Separately supplied handler evidence showed
  `invocation_count: 1`, `decision_class: deny`,
  `reason_code: transport-deny`, and matching event/tool/shape classes.

  Independent review on 2026-11-08 reread both retained evidence records.
  Each is below the 4 KiB cap, matches the fixed probe identifier, command
  length, and command hash in `probe-spec.json`, and records the same target
  C2 ACP session. The benign record contains `PreToolUse`, `Bash`,
  `expected-raw`, and `allow`; the transport record contains the matching
  event/tool/shape classes, `deny`, and `transport-deny`. Correlated with the
  observed IDEA execution and block outcomes and the C1 independent runtime
  baseline, these observations satisfy the revised C2 criteria. No recorded
  competing use or other material attribution contradiction was found.

  The retained records cite hook-source SHA-256
  `ab3b59c5fc64d9c16da3a5070440dd52b6f99f0a7ab0b7dc2032a7f76697006d`,
  which matches the canary-time transport definition with the corrected
  `commandWindows` executable form. The later committed transport definition
  has an empty property name in place of `commandWindows` and therefore a
  different hash. That post-observation repository defect does not invalidate
  the completed functional proof, but this documentation-only review does not
  correct or authorize reliance on the malformed current definition.

### C3: Trace The ENGINE Decision Through ACP

State: `[x]`

- **Resulting truth:** the exact ACP-delivered event, unchanged ENGINE result,
  and target host outcome are correlated without modifying ENGINE or retaining
  the command.
- **Predecessor:** C2 completed against the reviewed functional criteria.
- **Work:** activate the exact ENGINE-proxy definition, using documented
  Codex trust controls if necessary; start a new IDEA Custom ACP chat; run the harmless
  discriminating canary; compare only allowlisted shape and decision metadata
  with the direct fixture result; repeat once in another fresh target session.
- **Completion proof:** ART-ACP-CAUSE selects exactly one supported layer or
  identifies the smallest remaining ACP evidence gap.
- **Completion evidence (2026-11-08):** Two fresh IDEA Custom ACP sessions each
  submitted the fixed C3 canary through the ENGINE-proxy definition. In both
  sessions the proxy invoked the unchanged production `pre_tool_use.mjs`, and
  IDEA blocked the canary before shell execution with
  `Multiple potentially high-volume reads must be split into individually
  bounded tool calls.`

  After the second invocation, the bounded diagnostic evidence recorded
  `invocation_count: 2`, `hook_event_name: PreToolUse`, `tool_name: Bash`,
  `shape_class: expected-raw`, `diagnostic_branch: engine-proxy`,
  `decision_class: deny`, and `reason_code: engine-deny`. The two independent
  target-session outcomes correlate the ACP-delivered event, the transparent
  production ENGINE denial, and host enforcement without retaining the command.
  Under ART-ACP-CAUSE, the production ENGINE decision path is supported through
  the target ACP host: a valid proxy denial was emitted and enforced, leaving no
  C3 evidence gap. This closes C3 only; C4 cleanup and inactive-state proof
  remain pending.

### C4: Classify The ACP Cause And Restore State

State: `[ ]`

- **Resulting truth:** the investigation has an ACP-specific evidence-backed
  conclusion, all live diagnostic state is removed, and correction work has a
  correctly scoped next authority.
- **Predecessor:** completed `C3`, or `C2` with a recorded terminal route.
- **Work:** remove only the verified diagnostic link; start a new target ACP
  chat; prove inactive behavior; remove the resolved temp directory; record the
  sanitized matrix and cause classification; prepare but do not submit an
  issue-ready reproduction if the ACP host or adapter is implicated.
- **Follow-up routing:** ENGINE incompatibility requires a new DELIVERY Gate and
  plan; demonstrated ACP adapter or bundled Codex execution failures require
  an external issue or exact-version compatibility decision. Missing IDEA hook
  management UI alone is not a functional failure. This investigation does not
  authorize those corrections.
- **Completion proof:** link absent, transient evidence removed, excluded files
  unchanged, all retained live evidence has target provenance, and every
  conclusion maps to bounded ACP-specific evidence.
- **Completion evidence:** pending execution.

### Final Conformance

After every applicable step is complete, with `C3` either complete or explicitly
not applicable under `C2`'s routing rule:

1. confirm IDEA canaries used the independently installed NVM Custom ACP
   based on the C1 runtime baseline;
2. distinguish bundled CLI controls from IDEA ACP handler and host evidence;
3. confirm every retained field satisfies ART-ACP-EVIDENCE and the 4 KiB cap;
4. confirm the functional result through correlated handler records and IDEA
   host outcomes, or report the remaining functional uncertainty;
5. treat optional ACP lifecycle and IDEA hook-management UI details only as
   diagnostic information;
6. confirm ENGINE, policy, production config, D2, intent, README, ACCEPTANCE,
   IDEA, Custom ACP configuration, Codex configuration, project trust, packages,
   and installations did not change;
7. confirm the exact user activation link is absent and inactive behavior was
   observed in a fresh target ACP session; and
8. confirm no transient diagnostic evidence remains outside tracked authorized
   artifacts.

#### Final Conformance Evidence

Pending execution. Record the C1 independent runtime baseline, bounded IDEA
handler decisions and host outcomes, C3 ENGINE evidence, rollback proof,
and retained-file inventory. ACP/UI telemetry is optional.

## Independent Review Record

Independent REVIEW verified the prior-result invalidation, target ACP identity,
official-contract baseline, installed adapter capability and filtering behavior,
known CLI-specific diagnostic assets and their mandatory C1 replacement,
evidence allowlist, cause tree, writable boundary, diagnostic proxy
transparency, fresh-process feasibility, target-only trust path, rollback
lifecycle, execution order, and proof obligations.

Review evidence on 2026-11-08:

- the configured NVM shim, adapter `2.5.0`, ACP entry module, and bundled Codex
  `0.165.0` match the recorded paths, versions, and hashes;
- bounded adapter inspection confirmed the ACP-v1-only `codexHooks` capability,
  `_codex/hooks/list`, `_codex/hooks/trust`, and `sessionFlags` source filter;
- a sanitized process check found configured-NVM and JetBrains-runtime
  `codex-acp` processes alive concurrently, confirming that version matching
  alone is insufficient and motivating the C1 runtime baseline; under the
  revised C2 criteria, per-canary process attribution is optional when matching
  handler and host evidence presents no concrete wrong-host contradiction;
- the official hooks and App Server contracts do not claim that IDEA negotiated
  or exposed those adapter facilities;
- the existing diagnostic definitions, probe specification, handler fields, and
  fixtures retain CLI `0.159.0` assumptions, and C1 now explicitly owns their
  ACP-specific replacement before any live activation;
- static proxy inspection confirms raw stdin, stdout, stderr, and exit status are
  preserved for the bounded ENGINE canary path while retained evidence remains
  allowlisted and capped; and
- writable scope, recovery, transition routing, local links, status
  coordination, whitespace, and final-newline checks pass.

Original plan review verdict: `Ready for execution`.

Independent review of the revised C2 functional acceptance criteria completed
on 2026-11-08 with verdict: **C2 complete**. The C1 independent runtime
baseline plus the retained benign and transport-deny handler records and the
corresponding IDEA host outcomes directly demonstrate that independently
installed Codex ACP executes and enforces the user-level `PreToolUse` hook.
Per-canary process identities, IDEA hook-management capability negotiation or
trust UI, and ACP lifecycle notifications are not needed for that functional
conclusion, and their absence creates no concrete contradiction in the recorded
evidence. This review does not begin or complete C3 or C4.
