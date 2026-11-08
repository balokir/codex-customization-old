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
- **Primary invariant `INV-ACP-ATTRIBUTION`:** every live conclusion is tied to
  the exact IDEA Custom ACP configuration, adapter identity, bundled Codex
  identity, ACP session/process lifetime, hook definition hash, trust state,
  handler evidence, and host outcome. Evidence from standalone `codex` TUI or
  `codex exec` is never substituted for ACP evidence.
- **Depends on:** D1 commit
  `20fcc53a3ec6b4dbecc110baa303f3e6ed7eb5fb`, unchanged ENGINE runtime
  artifacts, the known inactive user-link state, and the existing IDEA Custom
  ACP configuration.
- **Provides:** one ACP-specific root-cause classification or the smallest
  explicitly bounded unresolved ACP layer, plus the correct follow-up handoff.
- **Scope boundary:** dependency-free diagnostic handlers and fixtures, bounded
  sanitized evidence, the exact temporary user-level diagnostic link, fresh
  IDEA Custom ACP sessions, and exact-definition trust changes performed only
  through a trust surface exposed to the target ACP integration.
- **Minimum closure:** prove the actual ACP process identity; prove hook
  discovery and exact-definition trust within the target integration; prove
  whether a new ACP session invokes the diagnostic handler; capture the
  allowlisted `PreToolUse` shape; prove deterministic diagnostic denial; trace
  the unchanged ENGINE decision through a transparent proxy when permitted;
  correlate ACP lifecycle and host outcome; and restore the inactive state.
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
user-level source. The investigation must observe both through IDEA. It must
not invoke these private methods out of band as substitute target evidence.

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
  capability negotiation or the adapter's private hook extensions. Those are
  verified from the installed adapter and the running target integration.

Documentation drift is evidence. A material contract change stops execution
and requires plan revision.

### Trigger Scan

| Trigger | Result | ACP-specific consequence |
|---|---|---|
| `LIFECYCLE` | `YES` | Link, trust, ACP process, thread, and turn states must be explicit |
| `CONCURRENCY` | `YES` | Other matching hooks and simultaneous ACP sessions must be excluded or attributed |
| `AUTHORITY` | `YES` | Discovery, trust, invocation, decision, and enforcement are separate facts |
| `RECOVERY` | `YES` | Every failure path removes only the verified exact link and closes task-owned diagnostics |
| `COMPATIBILITY` | `YES` | ACP adapter, bundled Codex, tool mapping, event keys, and Windows execution may differ |
| `READINESS` | `YES` | A cause claim requires complete ACP-boundary attribution |
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
| IDEA does not negotiate the adapter's ACP v1 `codexHooks` capability | ACP protocol/capability compatibility issue |
| Capability is negotiated but the adapter does not list the exact user-level source, including because of its `sessionFlags` filter | ACP source/filter compatibility issue |
| Target ACP discovers the source but exposes no authorized exact-definition trust path | ACP trust-surface compatibility issue |
| Trusted definition is active but handler is not invoked | ACP-to-Codex hook transport or process-start issue |
| Handler runs but input violates the documented shape | ACP/Codex host-contract compatibility issue |
| Synthetic diagnostic deny is emitted but ACP host executes | ACP decision-consumption issue |
| Synthetic diagnostic deny blocks but transparent ENGINE proxy emits no deny | ENGINE classification or ACP event-shape compatibility issue |
| ENGINE proxy emits a valid deny but ACP host executes | ACP handling issue specific to the production decision path |
| Diagnostic proxy blocks but production definition does not | production definition discovery, trust, or invocation issue |
| Competing hook or concurrent session can affect the result | evidence unattributable until isolated or fully accounted for |
| No row receives complete evidence | unresolved; report the smallest unproven ACP boundary without a root-cause claim |

IDEA UI output, ACP lifecycle events, process observations, and diagnostic
handler records are distinct evidence sources. None may silently stand in for
another.

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

- **Status:** `Ready for execution`.
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
- The target ACP integration can surface negotiated capability and
  discovery/trust state, or an explicit absence of one of those surfaces,
  without falling back to a standalone CLI.
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
- the Codex-managed trust record for each exact diagnostic definition, changed
  only through a trust interaction exposed by the target IDEA Custom ACP
  integration.

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
- If target ACP trust requires an unauthorized configuration mutation, record
  the trust-surface boundary and stop instead of using another client.
- Do not call `_codex/hooks/list` or `_codex/hooks/trust` from a separate ACP
  harness. Only the capability negotiated and actions exposed by the configured
  IDEA client count as target evidence.

### Lifecycle And Recovery

| State | Event | Required result |
|---|---|---|
| Inactive | Reverify target ACP identity and initialization | Exact configured NVM ACP chain and negotiated capability state established |
| Inactive | Install exact diagnostic link | Exact target source becomes listed or the capability/source-filter gap is recorded |
| Discovered | Review through target ACP trust surface | Exact diagnostic definition trusted, or trust boundary classified |
| Trusted | Start new IDEA Custom ACP chat | New ACP process/session identity recorded |
| Fresh target session | Run transport probe | Invocation and deterministic deny classified |
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
| 2 | [`C2`](#c2-prove-discovery-trust-and-live-acp-transport) | `C1` | Attributed target-ACP lifecycle and transport evidence |
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

### C2: Prove Discovery, Trust, And Live ACP Transport

State: `[ ]`

- **Resulting truth:** the target Custom ACP integration's discovery, trust,
  process/session identity, live handler invocation, actual event shape,
  diagnostic decision, and host enforcement are separately observed or bounded
  at the first unavailable layer.
- **Predecessor:** `C1`.
- **Work:** install and verify the exact transport definition; start a new IDEA
  Custom ACP chat; observe target-process provenance and the initialization
  protocol/capabilities; verify that the negotiated `codexHooks` surface lists
  the exact user-level definition despite the adapter's `sessionFlags` filter;
  use only the trust action exposed by IDEA; after exact trust, start another
  new target chat; run benign and deterministic transport-deny probes from that
  chat; correlate bounded handler evidence with any ACP hook lifecycle events
  and the host outcome.
- **Completion proof:** exact target provenance is established for every live
  probe and one route is selected: proceed to C3 only after an attributable
  diagnostic deny is emitted and enforced, or proceed directly to C4 with the
  smallest discovery, trust, transport, event-shape, or enforcement boundary.
- **Stop conditions:** wrong host; missing negotiated capability; exact source
  absent; no authorized target trust path; no handler invocation; invalid
  documented input; emitted deny not enforced; competing hook/session influence
  that cannot be isolated; or failed exact-link cleanup.
- **Completion evidence:** pending execution.

### C3: Trace The ENGINE Decision Through ACP

State: `[ ]`

- **Resulting truth:** the exact ACP-delivered event, unchanged ENGINE result,
  and target host outcome are correlated without modifying ENGINE or retaining
  the command.
- **Predecessor:** `C2` with attributable diagnostic invocation and enforced
  deterministic denial.
- **Work:** activate the exact ENGINE-proxy definition through the target ACP
  trust lifecycle; start a new IDEA Custom ACP chat; run the harmless
  discriminating canary; compare only allowlisted shape and decision metadata
  with the direct fixture result; repeat once in another fresh target session.
- **Completion proof:** ART-ACP-CAUSE selects exactly one supported layer or
  identifies the smallest remaining ACP evidence gap.
- **Completion evidence:** pending execution.

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
  plan; ACP adapter or bundled Codex behavior requires an external issue or an
  exact-version compatibility decision; missing ACP capability, exact-source
  exposure, or trust support requires an ACP compatibility or deployment-design
  revision. This investigation authorizes none of those corrections.
- **Completion proof:** link absent, transient evidence removed, excluded files
  unchanged, all retained live evidence has target provenance, and every
  conclusion maps to bounded ACP-specific evidence.
- **Completion evidence:** pending execution.

### Final Conformance

After every applicable step is complete, with `C3` either complete or explicitly
not applicable under `C2`'s routing rule:

1. confirm every live probe resolves to the configured NVM Custom ACP chain;
2. confirm no evidence from standalone CLI or JetBrains-bundled ACP was used;
3. confirm every retained field satisfies ART-ACP-EVIDENCE and the 4 KiB cap;
4. confirm ART-ACP-CAUSE selects one supported classification or explicitly
   bounded unresolved ACP layer;
5. confirm handler records, ACP lifecycle events, and host outcomes were
   correlated without substituting one evidence source for another;
6. confirm ENGINE, policy, production config, D2, intent, README, ACCEPTANCE,
   IDEA, Custom ACP configuration, Codex configuration, project trust, packages,
   and installations did not change;
7. confirm the exact user activation link is absent and inactive behavior was
   observed in a fresh target ACP session; and
8. confirm no transient diagnostic evidence remains outside tracked authorized
   artifacts.

#### Final Conformance Evidence

Pending execution. Record exact target-command provenance, versions and hashes,
sanitized ACP session matrix, discovery and trust observations, handler
invocation and decision classes, available lifecycle events, host outcomes,
rollback proof, retained-file inventory, and selected follow-up route.

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
  `codex-acp` processes alive concurrently, confirming that every live probe
  needs the plan's PID, parent PID, start-time, path, and fresh-session
  attribution rather than version matching alone;
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

Review verdict: `Ready for execution`.
