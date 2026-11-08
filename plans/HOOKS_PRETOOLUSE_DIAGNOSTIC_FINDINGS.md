# PreToolUse ACP Diagnostic Findings and Recovery Paths

This document consolidates the problems, corrections, failed approaches, and
remaining recovery paths discovered while executing
[`HOOKS_PRETOOLUSE_DIAGNOSTIC_PLAN.md`](HOOKS_PRETOOLUSE_DIAGNOSTIC_PLAN.md).
The execution plan remains authoritative. This file is a supporting diagnostic
record and must not be used to bypass its scope, evidence, trust, or rollback
requirements.

## Current State

As of 2026-11-08:

- C1 is complete in commit `7c3da29 test(hooks): freeze ACP diagnostic baseline`.
- C2 is complete after independent review of the simplified functional
  acceptance criteria. The IDEA ACP benign and diagnostic-deny observations
  prove handler execution and host enforcement; additional internal ACP
  telemetry is not a C2 functional requirement.
- C3 is complete after two separate fresh IDEA Custom ACP sessions exercised
  the ENGINE proxy. Both invocations reached the unchanged production ENGINE
  and both resulting denials were enforced before shell execution.
- C4 is complete. The exact diagnostic activation link was removed, and a fresh
  IDEA Custom ACP session executed the benign canary with exit code `0` and no
  hook message. The benign record remained at `invocation_count: 3` and
  `decision_class: allow`, proving non-invocation after removal.
- The exact `C:\Users\user\.codex\hooks.json` link and task-owned evidence
  directory
  `C:\Users\user\AppData\Local\Temp\codex-pretooluse-diagnostic-acp-20261108-7c97e4`
  are absent. C4 removed only that verified directory after confirming its three
  bounded records matched the documented C2/C3 probes.
- The C2 checkpoint below preserves the sanitized evidence values and direct
  host outcomes formerly held in the transient records. Those records contained
  one C2 session ID, distinct turn IDs, and the canary-time definition hash;
  per-canary process provenance was not captured. The earlier fresh-session ID
  `01a1ba90-3f53-7933-8c69-f4df7b638149` is not silently attributed to them.
- The C2 checkpoint identifies the corrected canary-time transport definition
  by source hash. A later commit accidentally replaced the `commandWindows`
  property name with an empty key; that current tracked defect is distinct from
  and later than the completed C2 observations.

The diagnostic link was intentional but transient and is now removed. An empty
or absent evidence directory alone is not proof that discovery, trust, or
invocation succeeded or failed; the inactive conclusion instead uses the fresh
host outcome and unchanged invocation counter recorded before cleanup.

## Verified Runtime Boundary

The intended host is the following complete chain:

```text
IDEA AI Chat
  -> Custom ACP client configuration
  -> C:\nvm4w\nodejs\codex-acp.cmd
  -> NVM Node v25.0.0
  -> @agentclientprotocol/codex-acp 2.5.0
  -> bundled @openai/codex 0.165.0
```

C1 verified the configured shim, adapter entry module, bundled Codex binary,
and live process provenance. It also distinguished the configured NVM chain
from the global Codex CLI and JetBrains' separate bundled ACP installation.

The adapter inspection established that:

- the AIR `codexHooks` capability is advertised on the ACP v1 path;
- `_codex/hooks/list` and `_codex/hooks/trust` exist as adapter extensions;
- the hook list is filtered to App Server sources classified as
  `sessionFlags`; and
- these implementation facts do not prove that IDEA negotiated the capability,
  exposed the user-level definition, supplied a trust action, or enforced a
  returned decision.

## Problems and Resolutions

| ID | Problem | Consequence | Resolution or current path |
|---|---|---|---|
| P1 | The first diagnostic run used the global standalone Codex CLI `0.159.0`. | Its results were incorrectly attributed to IDEA Custom ACP. | Invalidated the wrong-host verdict; functional C2 relies on C1's independent runtime baseline and direct IDEA evidence. |
| P2 | Existing diagnostic assets still encoded CLI `0.159.0`, `codex exec`, environment-injected metadata, and terminal-session assumptions. | They could not produce attributable IDEA ACP evidence and could retain the wrong identity fields. | C1 replaced these assumptions with exact ACP identities, explicit fresh-chat phases, a fixed probe specification, bounded evidence paths, and reviewed handler arguments. |
| P3 | Matching package versions existed in both the configured NVM installation and JetBrains' separate bundled installation. | Version matching alone could misattribute a probe to the wrong process chain. | C1 fixed the configured NVM runtime chain and live provenance. Per-canary process identity remains useful when investigating ambiguity, but revised functional C2 may use that baseline with matching handler and host evidence when no concrete wrong-host contradiction exists. |
| P4 | Internal discovery, trust, and invocation were treated as a single acceptance target. | Mandatory ACP telemetry obscured the functional allow/deny test. | Correlate handler evidence with target IDEA host outcomes; treat UI and lifecycle events as optional diagnostics. |
| P5 | The adapter's `sessionFlags` filter may hide a valid user-level hook from IDEA management UI. | Listing can be unavailable while Codex still enforces hooks. | IDEA hook-management listing is not a C2 gate when handler invocation and enforcement are confirmed. |
| P6 | `computer-use` was selected to automate IDEA AI Chat. Its mandatory safety rules prohibit automating Codex extensions inside Windows applications. | The continuation agent repeatedly tried to solve an impossible UI-automation task and entered a loop before producing probe evidence. | Do not invoke `computer-use` or CUA for C2. The user opens the required IDEA chats manually. If a trust or discovery observation requires UI, the agent asks one concrete manual question and waits; it does not retry through automation. |
| P7 | “Fresh agent” and “fresh IDEA ACP session” were conflated. | Spawning a subagent was incorrectly treated either as equivalent to a new ACP process or as incapable of using hooks at all. Both statements are too broad. | A subagent runs inside the existing Codex session and can use hooks already loaded by that session. It does not independently launch `codex-acp.cmd`, renegotiate IDEA ACP capabilities, or guarantee rediscovery of a hook added after the parent session started. After an activation-state change, create a fresh IDEA Custom ACP chat/process. |
| P8 | The manual continuation prompt said only to “continue C2” and did not forbid UI automation. | The new session interpreted the plan's IDEA observations as authorization to call `computer-use`. | Continuation prompts must state that the current conversation is already the fresh target session, forbid `computer-use`/CUA and additional chats, and require a single manual question if UI evidence is necessary. |
| P9 | The `cli` subcommand of `codex-acp.cmd` was overlooked. | The investigation treated the command only as an ACP server entry point and missed a relevant exact-version control path. | Installed `codex-acp 2.5.0` dispatches `codex-acp.cmd cli ...` to `runCodexCli`, which starts its bundled `@openai/codex/bin/codex.js` with inherited stdio and forwarded arguments. This launches bundled Codex CLI `0.165.0`. |
| P10 | The bundled CLI control and the IDEA ACP target prove different boundaries. | A successful CLI result could be overclaimed as proof that IDEA negotiated hooks or consumed the ACP decision. | Use `codex-acp.cmd cli` only as a bounded lower-layer control: it can prove discovery, trust, `PreToolUse`, and denial in the exact bundled Codex version, but it bypasses IDEA, ACP capability negotiation, adapter hook filtering, and IDEA decision consumption. |
| P11 | Running `/hooks` in bundled CLI may update shared Codex trust state. | The earlier C2 gate required trust specifically via IDEA. | Bundled CLI trust is consistent with independent Codex management; IDEA canaries separately prove target execution and enforcement. |
| P12 | The plan excludes a different ACP harness as target proof. | A headless harness could make the adapter appear healthy while bypassing the exact IDEA behavior under investigation. | A harness may be authorized later as a control, but its client capabilities, trust interactions, lifecycle events, and decision consumption must be classified separately from IDEA. Do not call `_codex/hooks/list` or `_codex/hooks/trust` out of band and label the result as IDEA evidence. |
| P13 | The active diagnostic link can outlive an interrupted investigation. | Later Codex sessions could discover the diagnostic definition unexpectedly, and the repository could appear clean while user-level state remains active. | Treat user-level link state and the task-owned temp directory as part of every checkpoint. Remove only the verified exact link on a terminal route or cleanup; never overwrite or delete an unexpected object. |
| P14 | The transport handler's Windows command began with a quoted executable path. | PowerShell failed before the diagnostic handler could run, so a launch failure could be mistaken for missing hook transport. | Removing only the leading executable quotes from `commandWindows` corrected the launch. The retained C2 records cite the SHA-256 of that correct canary-time definition. Commit `cb77d22` later recorded an empty property name instead of `commandWindows`; this does not invalidate the earlier evidence but remains a tracked-definition defect outside this documentation-only review. |
| P15 | Host outcomes and handler records were observed through separate channels. | Either alone could overstate functional success. | Preserve both evidence classes and correlate them; missing optional capabilities, trust UI, and lifecycle events are not functional C2 failures. |

## Corrections Completed in C1

C1 made the diagnostic package ACP-specific without activating a live user
hook. The resulting assets:

- bind the configured ACP shim, adapter, entry module, bundled Codex, exact
  source, evidence directory, and fresh-chat phase;
- retain evidence only for known synthetic probes;
- classify unknown Bash input without retaining its command value;
- cap each evidence record at 4 KiB;
- cover supported and malformed envelopes;
- implement deterministic transport denial independently of ENGINE;
- preserve ENGINE proxy stdin, stdout, stderr, and exit status unchanged; and
- clean task-owned evidence without scanning unrelated temp content.

Verification completed in C1:

- `C1: 19 ACP diagnostic fixture groups passed`;
- `E1/E2/E3: 67 fixture cases passed`;
- `D1: 8 deployment fixture cases passed`; and
- ENGINE, policy, and production hook definition hashes remained unchanged.

## Failed or Incomplete Approaches

### Global Codex CLI 0.159.0

This was a wrong-host experiment. It remains useful only as historical evidence
that the global installation behaved differently. It must not support IDEA,
ACP, ENGINE compatibility, or deployment-readiness conclusions.

### Windows UI Automation

This approach is prohibited for Codex extensions inside Windows applications.
Repeated attempts do not make the evidence stronger and must stop after the
first confirmed boundary. Manual IDEA interaction is the required handoff.

### Spawning a Subagent from a Pre-activation Session

This does not guarantee a new ACP initialization or hook rediscovery. The
subagent can exercise hooks already loaded by its parent, but it is not a
replacement for a fresh IDEA Custom ACP session after changing the link or
definition.

### Separate ACP Harness as a Substitute for IDEA

This changes the ACP client, advertised capabilities, trust surface, and host
decision consumer. It can isolate lower layers but cannot close the IDEA target
investigation by itself.

### Bundled Codex CLI 0.165.0

This lower-layer control has now been run. The user reports that the hook was
discovered, enabled, and trusted, that the benign command executed, and that
the handler recorded `decision_class: allow`. It is materially different from
the invalid global CLI `0.159.0` because it uses the exact Codex version bundled
with the target adapter. It still bypasses IDEA and ACP, so it does not prove
IDEA capability negotiation, exact-source exposure, IDEA trust, ACP lifecycle
forwarding, or IDEA decision consumption.

## C2 Evidence Checkpoint

| Boundary | Observation | Evidence classification |
|---|---|---|
| Independently verified runtime baseline | C1 fixed `codex-acp 2.5.0`, bundled Codex `0.165.0`, and the configured NVM command chain. The tracked C1 record reports 19 diagnostic fixture groups passing. | Repository-authoritative C1 evidence; the suite was not rerun during this documentation update. |
| Windows handler launch | The C2 records cited source SHA-256 `ab3b59c5fc64d9c16da3a5070440dd52b6f99f0a7ab0b7dc2032a7f76697006d`, which matches the transport definition with a named `commandWindows` property and an unquoted leading executable. | Independently verified before C4 cleanup against the transient records and reconstructed canary-time definition. The current tracked file instead has an empty property name and a different hash. |
| Bundled CLI control | Hook discovered, enabled, and trusted; benign command executed; handler classified `allow`. | User-reported control outcome and handler evidence. Not target IDEA ACP evidence. |
| IDEA ACP benign host outcome | The normal shell tool returned exit code `0` with no hook-failure message. | Directly observed host outcome in the current conversation. It proves execution, not handler invocation by itself. |
| IDEA ACP benign handler evidence | `invocation_count` increased `2 -> 3`; `PreToolUse`; `Bash`; `expected-raw`; `allow`. | Independently reread from the 1,282-byte bounded record before C4 cleanup. |
| IDEA ACP deny host outcome | The host reported `Command blocked by PreToolUse hook: diagnostic-transport-deny` and did not execute the shell command. | Directly observed host outcome in the current conversation. |
| IDEA ACP deny handler evidence | `invocation_count: 1`; `PreToolUse`; `Bash`; `expected-raw`; `deny`; `reason_code: transport-deny`. | Independently reread from the 1,366-byte bounded record before C4 cleanup. |

Together, the IDEA observations meet the simplified functional C2 criteria:
the independent ACP baseline, handler `allow`, and handler `deny` enforced
by the target IDEA host. The exact per-canary process identity,
IDEA capability/trust UI, and ACP lifecycle events were not captured, but are
optional diagnostic context rather than acceptance requirements. The transient
handler records contained session/turn identifiers and the canary-time source
hash. Independent review found no material contradiction and closed C2.
Production ENGINE behavior through the diagnostic proxy was subsequently
verified by C3 as recorded below.

## C3 Evidence Checkpoint

| Boundary | Observation | Evidence classification |
|---|---|---|
| Fresh target sessions | The same C3 canary was submitted in two separate fresh IDEA Custom ACP sessions. Both were blocked before shell execution with `Multiple potentially high-volume reads must be split into individually bounded tool calls.` | Confirmed target-host outcomes satisfying the required repetition. |
| Transparent ENGINE path | The ENGINE proxy invoked the unchanged production `pre_tool_use.mjs`; the diagnostic result was `decision_class: deny` with `reason_code: engine-deny`. | Confirmed production ENGINE decision passed through the diagnostic proxy. |
| Correlated ACP evidence | After the second invocation, the evidence recorded `invocation_count: 2`, `hook_event_name: PreToolUse`, `tool_name: Bash`, `shape_class: expected-raw`, and `diagnostic_branch: engine-proxy`. | Allowlisted event, shape, branch, and invocation metadata correlate the ENGINE result with both host denials. |

These results satisfy C3's existing completion criteria. The expected ACP event
and input shape reached the transparent proxy, the production ENGINE emitted a
valid denial, and IDEA enforced that denial before shell execution in both
fresh sessions. ART-ACP-CAUSE therefore supports the production ENGINE decision
path through the target ACP host; it identifies no remaining C3 evidence gap
and does not require another canary or optional telemetry.

## C4 Completion Checkpoint

| Boundary | Observation | Evidence classification |
|---|---|---|
| Exact-link rollback | `C:\Users\user\.codex\hooks.json` was removed without changing its ENGINE-proxy target definition, repository files, or trust records. | Verified C4.1 rollback to the inactive user-level state. |
| Fresh inactive session | The benign canary exited `0` with no `PreToolUse` message; its record remained at `invocation_count: 3` and `decision_class: allow`. | Correlated host and handler evidence proving no post-removal invocation. |
| Task-owned evidence cleanup | The documented directory was a normal directory containing only the three expected bounded records and no nested directories or reparse points; it was removed and is absent. | Verified exact-scope cleanup with no scan or deletion of unrelated temp content. |
| Tracked definitions | Final checks found no tracked hook-definition diff. | ENGINE, policies, hook definitions, and tests were not modified by C4. |

The completed cause classification is functional success, not an ACP defect.
The target IDEA ACP path invokes and enforces user-level `PreToolUse` decisions
when the reviewed definition is active, including the production ENGINE denial,
and becomes inactive after exact-link removal. The earlier handler launch
failure maps to the diagnostic definition's Windows command syntax. No external
ACP issue or production correction follows from this investigation.

## Recommended Continuation

1. Do not repeat the completed C2 or C3 canaries solely to collect optional
   telemetry.
2. Keep the diagnostic link and evidence directory absent. Any later hook
   activation must use separate authority.
3. Resume the original hook lifecycle only at DEPLOYMENT D2 under
   [`HOOKS_DEPLOYMENT_PLAN.md`](HOOKS_DEPLOYMENT_PLAN.md); ACCEPTANCE remains
   gated by that completed handoff.

## Completion Handoff

The PRETOOLUSE-DIAGNOSTIC child plan is complete:

```text
Treat plans/HOOKS_PRETOOLUSE_DIAGNOSTIC_PLAN.md as completed. Do not restore its
diagnostic link, recreate its transient evidence, or rerun canaries for optional
telemetry. Continue only under separately reviewed downstream authority.
```

## Independent C2 Review Verdict

Review completed on 2026-11-08 with verdict: **C2 complete**. The revised
criteria preserve the original functional objective and the existing evidence
satisfies them. The benign record proves handler invocation and `allow` while
IDEA executed the shell; the transport record proves handler `deny` with
`transport-deny` while IDEA blocked the shell. C1 supplies the independently
installed ACP runtime baseline. Missing per-canary process IDs, IDEA hook
management or trust UI observations, and ACP lifecycle notifications create no
contradiction affecting this functional acceptance.

## Evidence Interpretation Rules

- A process list proves process identity, not hook invocation.
- An ACP lifecycle event proves an event was surfaced, not that the handler
  produced the expected decision.
- A handler record proves invocation, not that IDEA enforced the result.
- A blocked command is a host outcome; correlate its diagnostic reason with
  handler evidence. Per-canary process/session IDs are not necessary for C2.
- An empty evidence directory is compatible with undiscovered, untrusted,
  uninvoked, wrong-shape, or wrong-session states; it is not a root cause.
- Bundled CLI success proves the exact Codex hook engine can work under the CLI
  client. It does not prove IDEA ACP capability negotiation or enforcement.
- IDEA ACP functional success uses the C1 independent runtime baseline plus
  matching handler evidence and target host outcomes; UI and lifecycle
  telemetry are optional.

## Authoritative References

- [`HOOKS_PRETOOLUSE_DIAGNOSTIC_PLAN.md`](HOOKS_PRETOOLUSE_DIAGNOSTIC_PLAN.md)
- [`HOOKS_PLAN.md`](../HOOKS_PLAN.md)
- [`HOOKS_DEPLOYMENT_PLAN.md`](HOOKS_DEPLOYMENT_PLAN.md)
- [`hooks/diagnostics/probe-spec.json`](../hooks/diagnostics/probe-spec.json)
- [`hooks/diagnostics/pre_tool_use_diagnostic.mjs`](../hooks/diagnostics/pre_tool_use_diagnostic.mjs)
- [Official OpenAI Hooks documentation](https://learn.chatgpt.com/docs/hooks)
- [Official Codex App Server documentation](https://learn.chatgpt.com/docs/app-server)
