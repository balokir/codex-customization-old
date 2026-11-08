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
- C2 is still open, but it now has confirmed allow-path transport and
  deterministic diagnostic-deny enforcement observations from the current IDEA
  Custom ACP conversation. The remaining attribution gaps are listed below.
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
- The repository worktree already contained uncommitted changes to
  `hooks/diagnostics/hooks.transport-deny.json` and
  `hooks/tests/diagnostics/run-tests.mjs` for the Windows launch correction.
  They were inspected but not modified by this documentation update.

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
| P1 | The first diagnostic run used the global standalone Codex CLI `0.159.0`. | Its discovery, trust, event-shape, and enforcement observations were incorrectly attributed to the IDEA Custom ACP host. | The old verdict was invalidated. The revised plan binds every live conclusion to the configured NVM ACP chain, exact definition hash, session/process identity, trust state, handler evidence, and host outcome. |
| P2 | Existing diagnostic assets still encoded CLI `0.159.0`, `codex exec`, environment-injected metadata, and terminal-session assumptions. | They could not produce attributable IDEA ACP evidence and could retain the wrong identity fields. | C1 replaced these assumptions with exact ACP identities, explicit fresh-chat phases, a fixed probe specification, bounded evidence paths, and reviewed handler arguments. |
| P3 | Matching package versions existed in both the configured NVM installation and JetBrains' separate bundled installation. | Version matching alone could misattribute a probe to the wrong process chain. | Require path, PID, parent PID, start time, shim hash, adapter entry hash, and bundled Codex hash for each live session. |
| P4 | Discovery, exact-definition trust, handler invocation, emitted decision, and host enforcement were initially treated too much like one outcome. | A visible command item or a blocked command could be mistaken for proof of another layer. | Observe and record each layer separately. Handler evidence, ACP lifecycle events, and host outcomes must be correlated but never substituted for one another. |
| P5 | The adapter's `sessionFlags` source filter may hide a valid user-level hook from IDEA. | The hook can exist on disk and still be absent from the target ACP hook surface. | C2 must observe the exact source through the target IDEA integration. A separate harness can characterize the adapter but cannot replace this observation. |
| P6 | `computer-use` was selected to automate IDEA AI Chat. Its mandatory safety rules prohibit automating Codex extensions inside Windows applications. | The continuation agent repeatedly tried to solve an impossible UI-automation task and entered a loop before producing probe evidence. | Do not invoke `computer-use` or CUA for C2. The user opens the required IDEA chats manually. If a trust or discovery observation requires UI, the agent asks one concrete manual question and waits; it does not retry through automation. |
| P7 | “Fresh agent” and “fresh IDEA ACP session” were conflated. | Spawning a subagent was incorrectly treated either as equivalent to a new ACP process or as incapable of using hooks at all. Both statements are too broad. | A subagent runs inside the existing Codex session and can use hooks already loaded by that session. It does not independently launch `codex-acp.cmd`, renegotiate IDEA ACP capabilities, or guarantee rediscovery of a hook added after the parent session started. After an activation-state change, create a fresh IDEA Custom ACP chat/process. |
| P8 | The manual continuation prompt said only to “continue C2” and did not forbid UI automation. | The new session interpreted the plan's IDEA observations as authorization to call `computer-use`. | Continuation prompts must state that the current conversation is already the fresh target session, forbid `computer-use`/CUA and additional chats, and require a single manual question if UI evidence is necessary. |
| P9 | The `cli` subcommand of `codex-acp.cmd` was overlooked. | The investigation treated the command only as an ACP server entry point and missed a relevant exact-version control path. | Installed `codex-acp 2.5.0` dispatches `codex-acp.cmd cli ...` to `runCodexCli`, which starts its bundled `@openai/codex/bin/codex.js` with inherited stdio and forwarded arguments. This launches bundled Codex CLI `0.165.0`. |
| P10 | The bundled CLI control and the IDEA ACP target prove different boundaries. | A successful CLI result could be overclaimed as proof that IDEA negotiated hooks or consumed the ACP decision. | Use `codex-acp.cmd cli` only as a bounded lower-layer control: it can prove discovery, trust, `PreToolUse`, and denial in the exact bundled Codex version, but it bypasses IDEA, ACP capability negotiation, adapter hook filtering, and IDEA decision consumption. |
| P11 | Running `/hooks` in bundled CLI may update the same exact-definition trust record used by IDEA. | The control can contaminate the target trust observation and make it impossible to tell which client established trust. | The bundled CLI control has now run. No preserved pre-control IDEA trust observation is recorded here, so its trust result cannot satisfy C2's IDEA trust requirement. |
| P12 | The plan excludes a different ACP harness as target proof. | A headless harness could make the adapter appear healthy while bypassing the exact IDEA behavior under investigation. | A harness may be authorized later as a control, but its client capabilities, trust interactions, lifecycle events, and decision consumption must be classified separately from IDEA. Do not call `_codex/hooks/list` or `_codex/hooks/trust` out of band and label the result as IDEA evidence. |
| P13 | The active diagnostic link can outlive an interrupted investigation. | Later Codex sessions could discover the diagnostic definition unexpectedly, and the repository could appear clean while user-level state remains active. | Treat user-level link state and the task-owned temp directory as part of every checkpoint. Remove only the verified exact link on a terminal route or cleanup; never overwrite or delete an unexpected object. |
| P14 | The transport handler's Windows command began with a quoted executable path. | PowerShell failed before the diagnostic handler could run, so a launch failure could be mistaken for missing hook transport. | The user reports that removing only the leading executable quotes from `commandWindows` corrected the launch. Static inspection confirms the pending definition and fixture-assertion changes, and the user reports all 19 diagnostic fixture groups passing afterward. |
| P15 | The newly confirmed host outcomes and handler records came from different observation channels. | Treating either channel as the other would overstate discovery, trust, attribution, or enforcement. | Record shell exit/block messages as direct host observations and the supplied JSON fields as user-reported handler evidence. Do not infer the still-missing IDEA capability, exact-source, trust-action, provenance, or ACP lifecycle observations. |

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

Together, the IDEA observations confirm new diagnostic handler invocations and
host enforcement of the transport denial in this conversation. They do not
independently establish the exact target process/session chain, active
definition identity, negotiated `codexHooks` capability, exact-source listing,
IDEA trust action, or ACP hook lifecycle-event correlation required by C2.
They provide no evidence about the production ENGINE path.

## Recommended Continuation

1. Keep C2 open until the exact process/session provenance and active-definition
   identity for both IDEA probes are established or explicitly bounded.
2. Record whether the target IDEA client negotiated `codexHooks`, listed the
   exact user-level source, and exposed/performed the exact-definition trust
   action. Do not substitute invocation evidence or the bundled CLI's shared
   trust state for these observations.
3. Record the presence or explicit absence of correlated ACP `hook/started` and
   `hook/completed` lifecycle events for the probes.
4. Do not rerun the already proven canaries merely to fill a documentation gap.
   If the missing attribution cannot be recovered, route C2 to C4 with that
   smallest bounded layer instead of claiming full completion.
5. Do not begin C3 until every C2 completion condition is satisfied. No
   ENGINE-proxy or production ENGINE enforcement result exists yet.
6. On the eventual terminal route, follow C4's exact-link, inactive-session, and
   task-owned evidence cleanup requirements.

## Safe Continuation Prompt

The following constraints prevent the previously observed automation loop:

```text
Continue the open C2 checkpoint from
plans/HOOKS_PRETOOLUSE_DIAGNOSTIC_PLAN.md. The benign and transport-deny
canaries already produced confirmed host outcomes and user-reported bounded
handler evidence; do not rerun them merely for documentation. Do not invoke
computer-use or CUA, spawn another C2 agent, use a separate ACP harness, or
call private ACP methods. Recover or explicitly bound the missing per-probe
process/session and definition attribution, IDEA capability/discovery/trust
observations, and ACP lifecycle-event correlation. Do not perform C3 or claim
production ENGINE enforcement until C2 is complete. Follow the plan's exact
link and evidence cleanup lifecycle on the eventual terminal route.
```

## Evidence Interpretation Rules

- A process list proves process identity, not hook invocation.
- An ACP lifecycle event proves an event was surfaced, not that the handler
  produced the expected decision.
- A handler record proves invocation, not that IDEA enforced the result.
- A blocked command proves a host outcome, not which hook caused it unless the
  exact handler evidence and session/process attribution are correlated.
- An empty evidence directory is compatible with undiscovered, untrusted,
  uninvoked, wrong-shape, or wrong-session states; it is not a root cause.
- Bundled CLI success proves the exact Codex hook engine can work under the CLI
  client. It does not prove IDEA ACP capability negotiation or enforcement.
- IDEA ACP success is end-to-end evidence only when exact source, trust,
  invocation, decision, and host outcome all belong to the same attributable
  activation state and session chain.

## Authoritative References

- [`HOOKS_PRETOOLUSE_DIAGNOSTIC_PLAN.md`](HOOKS_PRETOOLUSE_DIAGNOSTIC_PLAN.md)
- [`HOOKS_PLAN.md`](../HOOKS_PLAN.md)
- [`HOOKS_DEPLOYMENT_PLAN.md`](HOOKS_DEPLOYMENT_PLAN.md)
- [`hooks/diagnostics/probe-spec.json`](../hooks/diagnostics/probe-spec.json)
- [`hooks/diagnostics/pre_tool_use_diagnostic.mjs`](../hooks/diagnostics/pre_tool_use_diagnostic.mjs)
- [Official OpenAI Hooks documentation](https://learn.chatgpt.com/docs/hooks)
- [Official Codex App Server documentation](https://learn.chatgpt.com/docs/app-server)

