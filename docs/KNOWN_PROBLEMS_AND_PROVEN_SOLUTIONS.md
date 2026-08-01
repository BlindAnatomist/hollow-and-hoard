# Known Problems and Proven Solutions

This is the consolidated operational memory for `BlindAnatomist/hollow-and-hoard`.

Record a problem here only after it has actually occurred and its cause or solution has been established with evidence. Do not copy unrelated incidents from other repositories merely because they may be cautionary.

## Current state

No Hollow & Hoard-specific implementation incidents have yet been recorded.

## Repository-wide proven standards

These standards are inherited because the underlying mechanisms are general, not because another repository's history governs Hollow & Hoard.

### Change method after two confirmed failures

When the same connector, transfer path, command, workflow, or deployment mechanism fails twice for the same established reason, stop repeating it and choose a materially different route.

Required response:

1. Preserve the exact state already completed.
2. Identify the one remaining gate.
3. State why the current mechanism is invalid.
4. Select a replacement mechanism that preserves source fidelity.
5. Define the new stop condition.
6. Keep the owner informed while the replacement route is executed.

Do not manually rebuild large source files from overlapping fragments when an authenticated checkout, direct file route, verified artifact, or other exact method is available.

### Accessibility failures are mechanism failures

When VoiceOver announces the wrong item, repeats content, lands focus incorrectly, or exposes an unusable swipe path, diagnose the semantic mechanism rather than patching the spoken symptom alone.

Preserve these distinctions:

- accessible name: concise identity of the control;
- accessible description: supplementary instruction or consequence;
- visible text: information available in ordinary reading order;
- live feedback: transient confirmation or error information;
- focus movement: deliberate relocation only when required for comprehension or recovery;
- game-state summary: persistent nonvisual access to the board, selection, legal actions, and consequences.

A control should not absorb an adjacent paragraph into its accessible name merely to force that paragraph to be spoken.

### Drag must not become an accessibility fork

A satisfying drag interaction may be the primary pointer and touch experience, but the accessible alternative must operate the same game state and obey the same rules. Do not create a simplified VoiceOver-only game that diverges from ordinary play.

The accessible operation model must expose:

- the selected creature;
- possible destinations or matches;
- whether a move will relocate, merge, or fail;
- the resulting creature or relic;
- a reliable cancellation and recovery path.

### Completion must create space, not punish success

A completed chain should not permanently consume active board capacity unless that obstruction is an intentional, tested mechanic with a recovery path. The current design direction moves completed relics into the Hoard Chamber so progression frees space and changes the world.

This is a project-definition standard, not yet an implementation incident.

## Incident entry template

Use the following structure for each verified incident.

### HAH-000 — Concise problem name

Status: `investigating`, `proven`, `failed-do-not-repeat`, or `superseded`

First observed: YYYY-MM-DD

Affected area:

#### Symptoms

Describe what the user, test, workflow, or hosted environment actually did.

#### Cause

State the established technical or procedural mechanism. Distinguish evidence from inference.

#### Failed approaches

Record approaches that were attempted and why they failed or should not be repeated.

#### Proven solution

Describe the exact solution that worked, including relevant files, commands, commits, pull requests, or acceptance evidence.

#### Prevention rule

State the reusable rule that should govern future work.

#### Scope

State whether the rule is specific to one component, repository-wide, or a candidate for deliberate use elsewhere.
