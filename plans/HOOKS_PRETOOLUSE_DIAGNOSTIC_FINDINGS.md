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
- C2 remains formally open pending independent review of simplified functional
  acceptance criteria. The IDEA ACP benign and diagnostic-deny canaries passed;
  additional internal ACP telemetry is no longer a C2 functional requirement.
- The last recorded link state was an active
  `C:\Users\user\.codex\hooks.json` symbolic link to
  `hooks/diagnostics/hooks.transport-deny.json`. This documentation-only
  checkpoint did not re-inspect or change the link, so it does not restate that
  earlier observation as current fact.
- The task-owned evidence directory is
  `C:\Users\user\AppData\Local\Temp\codex-pretooluse-diagnostic-acp-20261108-7c97e4`.
  The user supplied the bounded evidence values recorded below; the files were
  not independently reread during this documentation update.
- The current conversation supplied direct host outcomes, but its exact
  process/session provenance and active-definition hash were not captured for
  the probes. The earlier fresh-session ID
  `01a1ba90-3f53-7933-8c69-f4df7b638149` is not silently attributed to them.
- An earlier checkpoint recorded uncommitted command-launch and fixture
  corrections. Both corrections are present in the pushed `feature/hooks`
  branch; this revision does not inspect the local worktree.

When present, the diagnostic link is intentional but transient. It must be
removed on a terminal C2 route, failure, or final C4 cleanup. An empty evidence
directory is not proof that discovery, trust, or invocation succeeded or
failed.

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
| P3 | Matching package versions existed in both the configured NVM installation and JetBrains' separate bundled installation. | Version matching alone could misattribute a probe to the wrong process chain. | Require path, PID, parent PID, start time, shim hash, adapter entry hash, and bundled Codex hash for each live session. |
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
| P14 | The transport handler's Windows command began with a quoted executable path. | PowerShell failed before the diagnostic handler could run, so a launch failure could be mistaken for missing hook transport. | The user reports that removing only the leading executable quotes from `commandWindows` corrected the launch. Static inspection confirms the pending definition and fixture-assertion changes, and the user reports all 19 diagnostic fixture groups passing afterward. |
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
| Windows handler launch | `commandWindows` no longer begins with executable quotes for the transport definition, and the fixture assertion matches that form. | Independently inspected pending worktree state. The correction of the live PowerShell failure and the post-change 19-group pass are user-reported outcomes. |
| Bundled CLI control | Hook discovered, enabled, and trusted; benign command executed; handler classified `allow`. | User-reported control outcome and handler evidence. Not target IDEA ACP evidence. |
| IDEA ACP benign host outcome | The normal shell tool returned exit code `0` with no hook-failure message. | Directly observed host outcome in the current conversation. It proves execution, not handler invocation by itself. |
| IDEA ACP benign handler evidence | `invocation_count` increased `2 -> 3`; `PreToolUse`; `Bash`; `expected-raw`; `allow`. | User-reported bounded evidence-file transcription. The file was not reread for this update. |
| IDEA ACP deny host outcome | The host reported `Command blocked by PreToolUse hook: diagnostic-transport-deny` and did not execute the shell command. | Directly observed host outcome in the current conversation. |
| IDEA ACP deny handler evidence | `invocation_count: 1`; `PreToolUse`; `Bash`; `expected-raw`; `deny`; `reason_code: transport-deny`. | User-reported bounded evidence-file transcription. The file was not reread for this update. |

Together, the IDEA observations meet the simplified functional C2 criteria:
the independent ACP baseline, handler `allow`, and handler `deny` enforced
by the target IDEA host. The exact per-canary process/session identity,
definition hashes, IDEA capability/trust UI, and ACP lifecycle events were
not captured, but are optional diagnostic context rather than acceptance
requirements. Production ENGINE behavior remains untested; independent
review of the new gate is still required before marking C2 complete.

## Recommended Continuation

1. Obtain independent review of the simplified C2 functional criteria;
   do not repeat successful canaries solely to collect optional telemetry.
2. If the review approves the revised criteria, mark C2 complete using
   the existing IDEA benign and diagnostic-deny observations.
3. Proceed to the C3 ENGINE-proxy test in a fresh IDEA ACP session.
4. Complete C4 with exact-link removal, inactive-state verification, and
   cleanup of the task-owned evidence directory.

## Safe Continuation Prompt

The next operation is an independent review, not another live probe:

```text
Review the simplified C2 acceptance criteria in
plans/HOOKS_PRETOOLUSE_DIAGNOSTIC_PLAN.md against the recorded IDEA
benign and transport-deny evidence. Determine whether the independent ACP
runtime baseline, handler invocation, and host enforcement sufficiently
demonstrate the original integration objective. IDEA management UI,
per-canary PIDs, and ACP lifecycle events are optional diagnostics.
Do not rerun canaries, start C3/C4, or modify hook definitions or trust.
Report substantive contradictions before closing C2.
```

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

