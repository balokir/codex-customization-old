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
- C2 is not complete and has no discovery, trust, invocation, or enforcement
  verdict.
- `C:\Users\user\.codex\hooks.json` is an active symbolic link to
  `hooks/diagnostics/hooks.transport-deny.json`.
- The active definition SHA-256 is
  `ceea82bb8a5ff1365c28ca65b7782be0fcdb92b5f92345d74c76b4f7bfa2258e`.
- The task-owned evidence directory is
  `C:\Users\user\AppData\Local\Temp\codex-pretooluse-diagnostic-acp-20261108-7c97e4`.
  It exists and is empty.
- The fresh IDEA Custom ACP session created after link activation has ID
  `01a1ba90-3f53-7933-8c69-f4df7b638149`, but its attempted continuation did
  not produce valid C2 evidence because the agent entered a `computer-use`
  loop before running the reviewed probes.
- The repository worktree was clean when this state was last verified.

The active link is intentional but transient. It must be removed on a terminal
C2 route, failure, or final C4 cleanup. An empty evidence directory is not proof
that discovery, trust, or invocation succeeded or failed.

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
| P11 | Running `/hooks` in bundled CLI may update the same exact-definition trust record used by IDEA. | The control can contaminate the target trust observation and make it impossible to tell which client established trust. | Before running the CLI control, either preserve and compare the pre-control trust state or revise the plan to provide an isolated trust/configuration location. Do not use CLI trust silently during the current C2 matrix. |
| P12 | The plan excludes a different ACP harness as target proof. | A headless harness could make the adapter appear healthy while bypassing the exact IDEA behavior under investigation. | A harness may be authorized later as a control, but its client capabilities, trust interactions, lifecycle events, and decision consumption must be classified separately from IDEA. Do not call `_codex/hooks/list` or `_codex/hooks/trust` out of band and label the result as IDEA evidence. |
| P13 | The active diagnostic link can outlive an interrupted investigation. | Later Codex sessions could discover the diagnostic definition unexpectedly, and the repository could appear clean while user-level state remains active. | Treat user-level link state and the task-owned temp directory as part of every checkpoint. Remove only the verified exact link on a terminal route or cleanup; never overwrite or delete an unexpected object. |

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

This path has now been identified but has not yet been run as part of the
revised investigation. It is materially different from the invalid global CLI
`0.159.0`: it is the exact Codex version bundled with the target adapter. It is
still a control rather than end-to-end IDEA ACP evidence.

## Recommended Continuation

1. Preserve the current active-link hash, empty evidence-directory state, and
   fresh IDEA session identity before any further trust action.
2. Continue C2 in session `01a1ba90-3f53-7933-8c69-f4df7b638149` without
   `computer-use`, CUA, another chat, or another C2 agent.
3. Treat that conversation as the already-created post-activation target
   session. Use shell inspection only for process provenance, the exact link,
   hashes, and bounded evidence records.
4. If IDEA exposes discovery or trust only in UI, ask the user for one exact
   observation or action. Record whether the exact definition and hash were
   shown; do not infer trust from invocation alone.
5. Run only the reviewed C2 canaries from
   `hooks/diagnostics/probe-spec.json`. Correlate invocation count, allowlisted
   shape, deterministic decision, ACP-visible lifecycle events when available,
   and the host outcome.
6. Add `codex-acp.cmd cli` as an explicitly non-target control only after the
   plan defines how to prevent shared-trust contamination. Its result should
   classify the bundled Codex hook engine, not IDEA ACP behavior.
7. Route to C3 only after an attributable diagnostic denial is both emitted and
   enforced. Otherwise route to C4 with the smallest proven boundary.
8. On every terminal route, remove the verified exact link, start a fresh
   inactive IDEA chat for the rollback canary, and remove the exact task-owned
   evidence directory.

## Safe Continuation Prompt

The following constraints prevent the previously observed automation loop:

```text
This conversation is already the fresh IDEA Custom ACP session created after
activation of the exact transport diagnostic link.

Continue C2 from plans/HOOKS_PRETOOLUSE_DIAGNOSTIC_PLAN.md in this session.
Do not invoke computer-use or CUA. Do not open or request another chat. Do not
spawn another C2 agent. Do not use standalone Codex, a separate ACP harness, or
private ACP methods. Use shell-only read-only checks for provenance, link/hash,
and bounded evidence. Run only the exact C2 probes from probe-spec.json. If UI
discovery or trust evidence is required, stop and ask the user one concrete
manual question. Follow the plan's stop conditions and exact-link rollback.
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

