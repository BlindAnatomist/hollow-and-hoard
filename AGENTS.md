# Repository Instructions

This file governs all agent work in `BlindAnatomist/hollow-and-hoard`.

## Authoritative reconstruction

Before changing the repository:

1. Confirm the exact repository, branch, starting commit, and any open pull request in scope.
2. Read `.github/ZERO_DOLLAR_AUTOMATION_POLICY.md`.
3. Read `docs/PREFLIGHT.md`.
4. Read `docs/implementation-status.md`.
5. Read `docs/PROJECT_DEFINITION.md`.
6. Read `docs/VISUAL_DIRECTION.md`.
7. Read the relevant entries in `docs/KNOWN_PROBLEMS_AND_PROVEN_SOLUTIONS.md`.
8. Inspect the current implementation and preserve behavior and visual decisions already recorded as accepted unless the assignment explicitly changes them.

Do not rely on conversation history alone when the repository can establish the current state.

## Repository character

This is a public repository. Never commit secrets, credentials, access tokens, private correspondence, personal identifying information, or assets that Cynthia or the owner has not authorized for public release.

Hollow & Hoard is independent from Moticos for Cynthia and every other project. General lessons may be transferred deliberately, but code, assets, names, mechanics, and history must not be copied merely because another repository appears similar.

## Zero-dollar authority

The zero-dollar policy is binding.

- Do not create, enable, select, or connect any paid service, paid runner, paid tier, billable API, billable storage, paid asset library, subscription, or infrastructure that can incur cost.
- Standard GitHub-hosted Actions runners may be used only when they are available at zero cost for this public repository and materially support a bounded assignment.
- Do not dispatch Actions merely to explore or guess. Inspect first and batch coherent verified changes.
- Do not publish or deploy through any external service without explicit authorization, even when the service has a free tier.
- When cost status is uncertain, stop before activation and identify the uncertainty.

## Scope and authorization

Treat each assignment as bounded.

- Do not broaden a repair into redesign, cleanup, or a new feature phase.
- Do not merge, publish, deploy, release, or alter external production state without explicit authorization for that action.
- Do not delete accepted work merely because another implementation appears cleaner.
- Do not import the Claude concept prototype as production architecture without review.
- When instructions conflict, stop before an irreversible action and identify the conflict.

## Player and product authority

Hollow & Hoard is a game for Cynthia.

The primary design authority is her visual, tactile, aesthetic, pacing, and sound experience. VoiceOver-specific controls and nonvisual board operation are not first-playable requirements unless the owner explicitly adds them later.

Do not make owner-operated VoiceOver testing a release gate for this game. The owner remains the project director and authorization authority, but Cynthia is the acceptance authority for play feel, beauty, movement, sound comfort, pacing, and delight.

Maintain ordinary web quality:

- use stable controls and predictable interaction;
- avoid unnecessary motion and provide reduced-motion behavior where practical;
- preserve readable contrast and text sizing;
- do not create avoidable keyboard or touch traps;
- keep instructions and error states understandable.

These are baseline product standards, not a requirement to build a separate screen-reader version of the game.

## Visual-development continuity

Approved visual work is source material, not disposable inspiration.

Before generating or changing art:

1. Inspect the currently approved concept references and asset manifest.
2. Identify the exact element being preserved, extracted, corrected, or extended.
3. Prefer editing, masking, cropping, compositing, style transfer, or asset extraction over starting from a blank prompt.
4. Generate from scratch only when no approved source can support the required result or when the assignment explicitly calls for a new direction.
5. Record why a fresh generation was necessary.
6. Preserve the strongest existing design decisions even when correcting a local flaw.

Every completed image pass must be followed by:

- direct inspection of the result;
- a concrete verbal description for the blind owner;
- a judgment about what succeeded, what failed, and what should carry forward;
- a clear classification as exploratory reference, approved reference, provisional production asset, or accepted production asset.

Text rendered inside generated images is never authoritative game copy. Recreate final text in code or controlled design assets.

## Cynthia experience authority

The intended player experience must preserve the established preferences recorded in `docs/PROJECT_DEFINITION.md` and `docs/VISUAL_DIRECTION.md`, including:

- satisfying movement and dragging;
- beautiful but uncluttered presentation;
- gentle, materially grounded sound;
- no painfully sharp high-frequency effects;
- meaningful progression rather than repetitive accumulation;
- higher-tier creatures that become more composed and distinctive rather than merely larger or busier.

Do not claim these qualities are accepted until Cynthia has actually tested the relevant build.

## Working method

- Inspect before editing.
- Use the smallest coherent change that satisfies the assignment.
- Run available relevant checks before pushing.
- Batch coherent verified changes rather than using CI as an exploratory guessing loop.
- Give the owner concise progress reports during multi-step work, including the current gate, any blocker, and the replacement method when a method fails.
- Never claim completion without repository evidence and verification results.

## Failure and transport rule

When a connector, transfer path, command, workflow, image-edit route, or deployment mechanism fails twice for the same confirmed reason, stop repeating that mechanism and change methods. Preserve exact source fidelity, but do not confuse fidelity with loyalty to a failed transport route.

Manual reconstruction of large files from overlapping fragments is prohibited when a safer source-preserving route exists.

## Completion record

At the end of a repository assignment, report:

- the exact branch and final commit;
- files changed;
- checks run and their results;
- art references or production assets created, reused, edited, extracted, or rejected;
- Actions or deployments triggered, if any;
- anything intentionally left unchanged;
- the next bounded step and whether it requires owner or Cynthia testing or authorization.
