# Implementation Status

Repository: `BlindAnatomist/hollow-and-hoard`

Visibility: public

Default branch: `main`

Active development branch: `art-direction-and-first-assets`

Draft pull request: `#1`

Status date: 2026-07-31

## Project identity

Hollow & Hoard is an independent nocturnal creature-merging game for Cynthia. It inherits deliberately selected structural lessons from Moticos for Cynthia while remaining separate in code, assets, vocabulary, history, visual identity, sound design, and progression.

The authoritative working foundations are:

- `docs/PROJECT_DEFINITION.md`
- `docs/VISUAL_DIRECTION.md`
- `docs/FIRST_PLAYABLE_ARCHITECTURE.md`
- `docs/KNOWN_PROBLEMS_AND_PROVEN_SOLUTIONS.md`

## Audience authority

The game is for Cynthia, not for the owner.

VoiceOver-specific operation is not a first-playable requirement. The owner remains project director and must receive inspected verbal descriptions of visual work. Cynthia is the acceptance authority for movement, artwork, sound comfort, pacing, and delight.

## Current implementation

A dependency-free static first-playable exists on the active development branch.

Primary files:

- `index.html`
- `src/app.js`
- `src/gameLogic.js`
- `src/storage.js`
- `src/atlas.js`
- `src/audio.js`
- `src/relicSummary.js`
- `src/styles.css`
- `tests/gameLogic.test.js`
- `tests/assetIntegrity.test.js`
- `tests/relicSummary.test.js`
- `tests/browser-smoke.mjs`

The application uses native HTML, CSS, JavaScript ES modules, Pointer Events, Canvas sprite cropping, localStorage, native Web Audio, and the Node built-in test runner.

No third-party runtime dependency, framework, database, analytics system, paid API, or paid service is required. Playwright is installed only transiently inside the bounded manual test workflow.

## Implemented first-playable behavior

Implemented and browser-tested:

- five-by-five board;
- deterministic starting state with eight Imps;
- six-pixel drag threshold;
- floating drag copy with subdued source;
- restrained magnetic pull toward a valid matching creature;
- relocation to any empty tile;
- equal-tier merging anywhere on the board;
- unequal and outside drops returning to origin;
- Imp, Goblin, Hobgoblin, Troll, and Ogre progression;
- two Ogres producing a Relic Blossom;
- completed relic transfer to a separate Hoard Chamber while freeing both board spaces;
- twin-Imp Spawner with last-space and full-board handling;
- one-step Undo;
- versioned local save and reset;
- persistence through browser reload;
- discovery Codex;
- Hoard Chamber relic count with correct singular and plural grammar;
- sound mute;
- low, rounded native sound cues;
- reduced-motion behavior;
- iPhone safe-area styling.

Not included:

- currency;
- turn limit;
- passive waiting timer;
- shop patterns;
- monetization;
- Gargoyle family;
- music;
- cloud saves;
- social features.

## Art and asset state

Approved visual continuity includes:

- moonlit hollow setting;
- warm lantern interiors against cool lavender-blue night;
- Goblin Hollowkin lineage;
- separate Relic Blossom shrine;
- five-by-five carved stone board;
- Goblin Spawner;
- Hoard Chamber;
- parchment Codex language;
- restrained purple, moss, parchment, stone, and amber palette.

The application does not regenerate the approved artwork. It reconstructs the canonical compact WebP atlas from four bounded Base64 parts, verifies its byte count, WebP signatures, SHA-256, and dimensions, then crops individual sprites at runtime from `atlas-map.json`.

Canonical atlas record:

- Base64 characters: `36,160`;
- decoded bytes: `27,118`;
- dimensions: `384 x 256`;
- SHA-256: `f460c77a7caec6e8d6b92f1cf847a6758128e901797dfc6f81cf2d18dd2a04d8`.

Screenshot inspection found and corrected overly generous crop rectangles. The final Spawner, Hoard Chamber, and Relic Blossom crops contain no neighboring atlas fragments. The tightened creature rectangles also improve Imp scale and clarity on the board.

Future image work must begin from the approved references or preserved atlas whenever technically possible. Use extraction, cropping, masking, compositing, scaling, color correction, or controlled editing before fresh generation.

## Architecture transfer from Moticos

Inspected and deliberately inherited mechanisms:

- pure game logic separated from rendering;
- board interaction isolated from state rules;
- Pointer Events for touch and mouse;
- six-pixel drag threshold;
- floating drag copy with subdued source;
- magnetic attraction toward valid matching pieces;
- short snap-back for invalid drops;
- one complete previous-state snapshot for Undo;
- pure rule tests;
- safe-area-aware iPhone layout.

Not copied:

- Moticos source files;
- collage mechanics;
- artwork;
- terminology;
- rewards;
- postcard system;
- Tone.js audio implementation;
- route structure.

## Automated verification completed

Final successful bounded browser gate:

- workflow run: `30683744112`;
- job: `91325784930`;
- application branch source through commit: `643833c93b872e32d4c7e5fea5012c8b0fa95a43`;
- tested pull-request merge commit: `2bded6ebf4750d3fea405cc702b6b69c6e3d3438`;
- result: success.

Twelve Node tests passed and zero failed:

1. canonical atlas reconstruction and SHA;
2. initial board;
3. relocation;
4. equal-tier merge;
5. invalid-drop rejection;
6. Ogre-to-Relic completion;
7. twin spawning;
8. last-space and full-board handling;
9. save validation;
10. complete lineage progression;
11. relic singular and plural grammar;
12. invalid and fractional relic-count normalization.

Browser matrix:

- desktop Chromium at `1280 x 900`;
- mobile WebKit at `430 x 932`, modeled on a large iPhone.

Both browser projects passed the complete interaction sequence:

- initial load;
- atlas decode and visible-pixel inspection;
- twenty-five board cells;
- Codex open and close;
- Hoard Chamber open and close;
- sound toggle;
- Spawner;
- Undo;
- reload persistence;
- reset;
- relocation;
- equal-tier merge;
- unequal-drop snap-back and ghost cleanup;
- injected Ogre pair completion;
- Relic Blossom transfer;
- Hoard relic artwork and count;
- final reset.

No browser console error or page error occurred.

Measured layout:

- desktop board width: `638 px`;
- desktop minimum cell dimension: `121.1875 px`;
- mobile board width: `398 px` inside a `430 px` viewport;
- mobile minimum cell dimension: `76.390625 px`;
- horizontal overflow: none in either browser.

## Direct visual inspection completed

Final screenshots were inspected after the automated gate.

Mobile first screen:

- dark violet-black nocturnal field with restrained star and firefly flecks;
- centered cream title and amber eyebrow;
- Sound and Codex controls at the upper corners;
- separate illustrated Goblin Spawner and Hoard Chamber cards;
- a large, contained five-by-five gray stone board;
- eight warm green Imps distributed across the board;
- large Undo and Reset controls below;
- readable instruction copy with no horizontal clipping.

Codex:

- parchment field inside a dark purple framed dialog;
- large close control;
- discovered Imp shown with artwork and description;
- undiscovered lineage entries shown consistently and scrollably.

Hoard Chamber:

- parchment dialog with clean isolated Relic Blossom shrine artwork;
- correct `1 Relic Blossom` singular copy in both the background card and dialog;
- no adjacent Ogre slice or other atlas contamination.

The desktop composition remains centered, restrained, and proportionate rather than stretching to fill the entire monitor.

## Defects found and repaired during the gate

1. Corrupted single-line Base64 atlas transport.
   Repaired with four bounded transport parts plus executable integrity and runtime verification.

2. Spawner, Hoard Chamber, and Relic Blossom crops included neighboring atlas fragments.
   Repaired by tightening `atlas-map.json` and inspecting replacement screenshots.

3. Background Hoard card said `1 Relic Blossoms`.
   Repaired with `src/relicSummary.js` and unit coverage.

The exact mechanisms and prevention rules are recorded as HAH-004 through HAH-006 in `docs/KNOWN_PROBLEMS_AND_PROVEN_SOLUTIONS.md`.

## Test workflow state

`.github/workflows/bounded-browser-smoke.yml` is retained but frozen to `workflow_dispatch` only.

It will not run on ordinary commits or pull-request synchronization. A future expensive browser run requires an explicit manual dispatch.

The workflow uses:

- public-repository GitHub-hosted runner;
- read-only contents permission;
- twenty-minute timeout;
- transient Playwright installation;
- one-day artifact retention.

## Preview and deployment state

A dedicated zero-cost Netlify project named `hollow-and-hoard-preview` was created to avoid contaminating another site.

No game deploy was created.

The tested runtime artifact was generated successfully from the passing workflow, but this execution environment could not obtain the official `@netlify/mcp` package:

- the internal npm mirror returned 404;
- a materially different public-registry request timed out.

The deployment route is recorded as HAH-006 and must not be repeated in this environment without a new mechanism. The site name or undeployed URL must not be handed to Cynthia as though it were live.

## Cost and external-state record

- standard public-repository GitHub-hosted Actions used: yes, bounded and completed;
- paid runner used: no;
- paid infrastructure used: no;
- paid API used: no;
- production deployment created or changed: no;
- game preview deployed: no;
- pull request merged: no;
- pull request marked ready: no;
- third-party stock asset introduced: no;
- possible cost introduced: no.

## Remaining acceptance gates

Automated browser readiness is complete. Remaining before handoff to Cynthia:

1. deploy the exact tested runtime through a working binary-capable or official Netlify route;
2. smoke-test the resulting hosted URL on an actual iPhone;
3. have Cynthia judge drag feel, movement satisfaction, sound comfort, pacing, visual delight, and whether she wants to keep playing;
4. repair only defects demonstrated by hosted or Cynthia testing;
5. keep draft PR 1 unmerged until those gates are explicitly accepted.

## Prohibited assumptions

Do not assume:

- automated mobile WebKit is equivalent to Cynthia's real-device judgment;
- the blank Netlify project contains a live game;
- the provisional assets are final production art;
- a passing browser gate authorizes merge, production release, or handoff;
- a free-tier service may be created or modified beyond the authorized isolated preview without explicit approval;
- fresh generation is preferable to correcting the approved art.
