# Hollow & Hoard Version 2 Implementation Status

Status date: 2026-08-01

Branch: `version-2-cynthia-feedback`

Draft pull request: `#2`

Base: preserved Version 1 branch `art-direction-and-first-assets`

Hosted preview:

`https://blindanatomist.github.io/hollow-and-hoard/`

## Why Version 2 exists

Cynthia accepted the first playable as cute, pretty, and easy to control. She also identified five clear deficiencies:

1. creature art looked pixelated and blurry rather than professional;
2. sound cues were too quiet or too sparse to be useful;
3. the Gargoyle family promised by the concept was absent;
4. the meaning of the Hoard and the game’s story were unclear;
5. the Hollow felt too plain and insufficiently animated.

The owner also requested a separate introductory screen so story and instructions would not crowd the active board.

## Implemented Version 2 changes

### Story threshold

The game now opens on a dedicated introductory screen containing:

- the title;
- the story premise;
- concise drag-and-merge instructions;
- a clear explanation that completed lineages become relics and that the Hoard is what the Hollow remembers;
- a Start Game control;
- a return path from the game to the story screen.

Long explanation is kept off the active board.

### Two creature families

Goblin Hollowkin:

1. Imp
2. Goblin
3. Hobgoblin
4. Troll
5. Ogre
6. Relic Blossom

Gargoyle line:

1. Mosscap
2. Gargoyle Hatchling
3. Gargoyle
4. Elder Gargoyle
5. Moonlit Relic

The starting board contains four Imps and four Mosscaps so both families are present immediately.

Only equal-family, equal-tier creatures merge. Mixed-family and unequal-tier drops return gently to their origin.

Each completed family creates its own relic, frees both board spaces, and changes the remembered state of the Hollow.

### Professional-resolution art transport

Version 2 no longer enlarges the compact 384-by-256 Version 1 atlas.

The approved designs were preserved and repackaged into a 960-by-800 production atlas. Creature crops are 160 by 160 pixels before being displayed at approximately 76 pixels on a large iPhone, providing more than twice the required display resolution.

The compact carrier uses a black outer matte. `src/productionAssets.js` removes only edge-connected near-black pixels at runtime, preserving black eyes, internal shadows, wings, ears, moss, lanterns, and shrine architecture.

Production atlas record:

- dimensions: `960 x 800`;
- decoded bytes: `50,572`;
- Base64 characters: `67,432`;
- SHA-256: `f4984ddb57af91b8b484ba54930a1cb992d56c4ae156d8b4b1e027e8533865ba`;
- transport: nine bounded ordered Base64 parts.

The asset set contains:

- six Goblin lineage images including Relic Blossom;
- five Gargoyle lineage images including Moonlit Relic;
- Goblin and Gargoyle dwellings;
- Hoard Chamber;
- Codex icon;
- story-screen moonlit hollow artwork.

### Living hollow

Version 2 adds restrained atmospheric motion:

- drifting fireflies;
- slow lantern flicker;
- moon haze and environmental motes;
- gentle creature idle movement;
- merge bloom;
- relic-transfer ceremony;
- persistent visual memory after relic completion;
- reduced-motion substitutions.

### Sound revision

The native Web Audio system now provides clearer event coverage while preserving low, rounded, non-shrill character.

Covered events include:

- pickup;
- relocation;
- invalid drop;
- Goblin merge;
- Gargoyle merge;
- Goblin spawn;
- Gargoyle spawn;
- Codex opening;
- Hoard opening;
- relic completion;
- ambient night.

Cynthia must still judge comfort and audibility on her actual device.

### Board refinement

Version 2 preserves the accepted five-by-five board and controls while adding:

- larger creature presence;
- reduced visual weight in the cell depressions;
- restrained stone variation;
- more environmental integration;
- distinct merge and invalid-drop feedback;
- two clearly different dwellings;
- no currencies, turn limits, shops, or passive timers.

## Verification completed

### Source and asset import

The Version 2 source archive was reconstructed through a temporary, self-deleting GitHub workflow.

The workflow required:

- exact source archive SHA-256;
- JavaScript syntax validation;
- production-atlas Base64 length, decoded byte count, dimensions, and SHA-256;
- ten passing rule, save-migration, and asset-integrity tests.

Temporary source transport and import workflows were removed after success.

### Browser gate

The exact-head browser gate passed:

- desktop Chromium;
- mobile WebKit at large-iPhone dimensions;
- introductory screen and Start Game transition;
- both spawning controls;
- Goblin and Gargoyle relocation and merging;
- mixed-family and unequal-tier rejection;
- dual Codex and Hoard rendering;
- Relic Blossom and Moonlit Relic completion;
- firefly and environmental-memory states;
- sound toggle;
- save migration, reload, Undo, and reset;
- browser console and page-error monitoring.

The exact workflow run and tested commit are recorded in:

`docs/VERSION_2_BROWSER_GATE_RESULT.md`

### Runtime and hosted verification

A runtime-only artifact was generated only after proving no runtime drift from the passing browser commit. The artifact record is stored in:

`docs/VERSION_2_RUNTIME_ARTIFACT_RESULT.md`

The exact tested runtime was deployed to GitHub Pages. Every hosted runtime file was downloaded and matched against its local SHA-256. The deployment record is stored in:

`docs/VERSION_2_HOSTED_PREVIEW_RESULT.md`

## Preserved boundaries

- `main` remains unchanged.
- PR 1 remains the Version 1 baseline.
- Version 1 Netlify preview remains available and unchanged.
- PR 2 remains draft and unmerged.
- No paid runner, paid service, metered API, purchased asset, or possible cost was introduced.
- The unused blank Netlify project created during preview-route evaluation contains no game deployment.

## Remaining acceptance gate

Version 2 now requires Cynthia’s actual-device judgment.

She should evaluate:

- whether the creatures now look crisp and professional;
- whether the Gargoyle family is visually satisfying and clearly distinct;
- whether the introductory story makes the Hoard understandable;
- whether sounds are audible without becoming uncomfortable;
- whether fireflies and ambient motion make the Hollow feel alive;
- whether the board remains calm rather than crowded;
- whether she wants to continue playing.

Only demonstrated Cynthia-facing defects should be repaired before PR 2 is considered ready.
