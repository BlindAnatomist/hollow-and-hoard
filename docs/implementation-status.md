# Implementation Status

Repository: `BlindAnatomist/hollow-and-hoard`

Visibility: public

Default branch: `main`

Status date: 2026-07-31

## Project identity

Hollow & Hoard is an independent nocturnal creature-merging game. It may inherit deliberately selected lessons from Moticos for Cynthia, but it must remain separate in code, assets, vocabulary, history, visual identity, sound design, and progression.

The authoritative working design foundation is `docs/PROJECT_DEFINITION.md`.

## Current accepted repository state

The public repository has been created under the accepted name:

`hollow-and-hoard`

The initial governance and definition foundation consists of:

- `README.md`
- `AGENTS.md`
- `.github/ZERO_DOLLAR_AUTOMATION_POLICY.md`
- `docs/PREFLIGHT.md`
- `docs/KNOWN_PROBLEMS_AND_PROVEN_SOLUTIONS.md`
- `docs/PROJECT_DEFINITION.md`
- `docs/implementation-status.md`

No application code, package manager, dependency, workflow, deployment configuration, external service, paid asset, or hosting target has been added.

## Concept source status

The originating Claude React prototype was supplied in conversation and assessed as concept evidence rather than accepted production architecture.

Its useful elements include:

- the title and nocturnal setting;
- goblin and gargoyle bloodlines;
- a discovery Codex;
- procedural creature placeholders;
- a board, merge operation, timed spawning, and save concept.

Its unresolved or rejected-as-automatic elements include:

- tap-only movement rather than satisfying drag;
- Claude-specific `window.storage` persistence;
- passive six-second cooldowns;
- adjacency rules combined with unrestricted relocation;
- completed blossoms that can occupy board space permanently;
- no actual Hoard Chamber or relic system;
- placeholder rather than final artwork and sound.

The exact prototype source has not yet been committed. It must be preserved through a clearly marked reference path before implementation if it is needed as an active source reference.

## Zero-dollar position

The repository is governed by `.github/ZERO_DOLLAR_AUTOMATION_POLICY.md`.

Current cost state:

- no paid runner;
- no paid infrastructure;
- no paid API;
- no external deployment;
- no purchased asset;
- no subscription;
- no billable service;
- no GitHub Actions workflow.

Standard GitHub-hosted Actions may be considered later only when confirmed zero-dollar for this public repository, the technical stack is known, and a bounded assignment establishes the exact checks.

## Accessibility position

Accessibility is part of the first implementation, not a later repair phase.

The game must support reliable iPhone VoiceOver operation, including:

- concise names and nonduplicative descriptions;
- logical reading and focus order;
- complete nonvisual access to board and game state;
- an accessible operation equivalent to dragging that uses the same rules;
- clear merge, discovery, failure, and recovery feedback;
- no dependence on color, animation, spatial position, sound, or drag precision alone;
- real-device VoiceOver testing at defined checkpoints.

## Player-experience position

Cynthia's prior testing establishes design evidence, not automatic acceptance of this game.

The first playable must pursue:

- satisfying movement;
- uncluttered beauty;
- gentle sound without painful high-frequency effects;
- meaningful progression;
- advanced forms that become more distinctive and composed rather than simply larger or busier.

Cynthia's direct testing is required before those qualities can be marked accepted.

## Recorded incidents

No Hollow & Hoard-specific implementation incident has yet occurred.

General proven standards and future incident records belong in `docs/KNOWN_PROBLEMS_AND_PROVEN_SOLUTIONS.md`.

## Unresolved implementation decisions

Before application code is scaffolded, establish:

1. exact board dimensions;
2. movement, adjacency, relocation, and merge rules;
3. first bloodline and final relic;
4. spawning and crowding behavior;
5. Hoard Chamber transition and environmental consequence;
6. undo, reset, and recovery behavior;
7. technical stack and package manager;
8. save system and schema;
9. artwork method and licensing;
10. sound method and safe temporary sound set;
11. test strategy;
12. first VoiceOver acceptance checkpoint;
13. hosted preview mechanism, only after separate authorization.

## Next bounded task

Perform the first implementation-planning pass:

1. inspect the Moticos repository only for deliberate transferable technical and accessibility lessons;
2. inspect its current package structure and testing approach without copying its game code or assets;
3. choose the smallest suitable zero-dollar stack;
4. define the first playable state machine and acceptance tests;
5. preserve the Claude prototype as a clearly marked reference if needed;
6. scaffold the application on a bounded development branch;
7. add only the minimum checks required by the chosen stack;
8. stop before deployment until the owner explicitly authorizes a hosted preview.

## Prohibited assumptions

Until explicitly decided, do not assume:

- that the Claude prototype should become the application entry point;
- that Moticos code or assets should be copied;
- that a six-by-six board, timed spawning, or adjacency rule is accepted;
- that React, Vite, TypeScript, or another framework is authorized merely because another prototype used it;
- that repository setup authorizes Actions, deployment, publication, or release;
- that free-tier availability authorizes creation of an external service;
- that visual attractiveness establishes accessibility or Cynthia's acceptance.
