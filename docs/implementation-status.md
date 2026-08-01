# Implementation Status

Repository: `BlindAnatomist/hollow-and-hoard`

Visibility: public

Default branch: `main`

Active development branch: `art-direction-and-first-assets`

Status date: 2026-07-31

## Project identity

Hollow & Hoard is an independent nocturnal creature-merging game for Cynthia. It may inherit deliberately selected lessons from Moticos for Cynthia, but it remains separate in code, assets, vocabulary, history, visual identity, sound design, and progression.

The authoritative working foundations are:

- `docs/PROJECT_DEFINITION.md`
- `docs/VISUAL_DIRECTION.md`

## Current repository state

The governance foundation consists of:

- `README.md`
- `AGENTS.md`
- `.github/ZERO_DOLLAR_AUTOMATION_POLICY.md`
- `docs/PREFLIGHT.md`
- `docs/KNOWN_PROBLEMS_AND_PROVEN_SOLUTIONS.md`
- `docs/PROJECT_DEFINITION.md`
- `docs/VISUAL_DIRECTION.md`
- `docs/implementation-status.md`

No application framework, package manager, workflow, deployment configuration, external service, or hosting target has yet been added.

## Audience correction

The game is for Cynthia, not for the owner.

VoiceOver-specific operation is not a first-playable requirement. The owner remains project director and must receive inspected verbal descriptions of visual work. Cynthia is the acceptance authority for movement, artwork, sound, pacing, and delight.

## Art-direction state

The first broad concept pass established:

- the moonlit hollow;
- warm goblin materials;
- architectural gargoyle materials;
- the Mosscap;
- the gentle guardian Ogre;
- parchment Codex treatment;
- a carved stone board;
- a separate glowing Hoard Chamber;
- amber-versus-lavender lighting.

The second refinement pass corrected:

- weak early goblin silhouette separation;
- the gargoyle final form, turning it into a true relic;
- an overcrowded and mechanically invented board interface;
- generic mobile-game currency and shop language.

The approved reference set is represented under:

`assets/art-development/concepts/`

The first composited transparent production candidates are represented under:

`assets/art-development/provisional/`

They include the Goblin Hollowkin lineage, Relic Blossom, stone tile, Goblin Spawner, Hoard Chamber, and Codex treatment. These are provisional production candidates, not final accepted art.

## Art continuity rule

Future image work must use the approved references and extracted or composited assets as source material whenever possible.

Broad regeneration from scratch is not the default. New generation must answer a concrete missing requirement or an identified failure that cannot be corrected through editing, extraction, masking, or compositing.

## Selected first playable

The selected first-playable family is the Goblin Hollowkin line.

The working first-playable scope is:

- one five-by-five board;
- direct drag relocation;
- merge identical creatures anywhere on the board;
- one Spawner;
- one Relic Blossom completion;
- one minimal Codex section;
- one minimal Hoard Chamber;
- save and reset;
- undo when technically practical;
- gentle representative sound;
- no currency;
- no turn limit;
- no passive waiting timer;
- no deployment without separate authorization.

## Concept source status

The originating Claude React prototype remains concept evidence rather than production architecture.

Useful inherited ideas:

- title and nocturnal setting;
- creature bloodlines;
- discovery Codex;
- board and merge concept;
- firefly ambience.

Not automatically accepted:

- six-by-six board;
- tap-only movement;
- adjacency-limited merging;
- six-second spawning cooldowns;
- Claude-specific `window.storage`;
- procedural SVG artwork;
- completed objects that clog the board.

## Zero-dollar position

Current cost state:

- no paid runner;
- no paid infrastructure;
- no paid API;
- no external deployment;
- no purchased asset;
- no subscription;
- no billable service;
- no GitHub Actions workflow.

The art references and provisional assets were generated and processed within the available project tools. No third-party stock asset was introduced.

## Current verification

Completed:

- direct inspection of the concept and refinement passes;
- owner authorization of the accepted corrections;
- transparent-background verification for extracted provisional components;
- preservation of visual continuity through an art bible, asset manifest, and atlas metadata;
- incident records for unexplained image output, continuity loss, and invented game systems.

Not yet completed:

- transfer verification for the playable atlas bytes;
- board-scale silhouette testing in a running application;
- animation testing;
- Cynthia play testing;
- sound implementation;
- save-state testing;
- production build;
- hosted preview.

## Next bounded task

Complete the art transport, then create the first application scaffold on the active development branch:

1. verify that the provisional atlas bytes decode to the recorded hashes;
2. choose a minimal static web stack suitable for touch dragging;
3. implement a five-by-five board;
4. load the preserved Goblin Hollowkin assets;
5. implement relocation and identical-pair merging;
6. implement Spawner, Relic Blossom transfer, Codex, and Hoard Chamber placeholders;
7. add only the minimum local checks required by the chosen stack;
8. stop before deployment;
9. inspect the running layout at actual iPhone scale before generating additional art.

## Prohibited assumptions

Do not assume:

- the Claude prototype should become the application entry point;
- Moticos code or assets should be copied;
- new images should replace approved images merely because generation is available;
- the provisional assets are final;
- repository setup authorizes Actions, deployment, publication, or release;
- free-tier availability authorizes creation of an external service;
- visual attractiveness in a still image guarantees good movement or Cynthia's acceptance.
