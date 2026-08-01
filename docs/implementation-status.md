# Implementation Status

Repository: `BlindAnatomist/hollow-and-hoard`

Visibility: public

Default branch: `main`

Active development branch: `art-direction-and-first-assets`

Status date: 2026-07-31

## Project identity

Hollow & Hoard is an independent nocturnal creature-merging game for Cynthia. It inherits deliberately selected structural lessons from Moticos for Cynthia while remaining separate in code, assets, vocabulary, history, visual identity, sound design, and progression.

The authoritative working foundations are:

- `docs/PROJECT_DEFINITION.md`
- `docs/VISUAL_DIRECTION.md`
- `docs/FIRST_PLAYABLE_ARCHITECTURE.md`

## Audience authority

The game is for Cynthia, not for the owner.

VoiceOver-specific operation is not a first-playable requirement. The owner remains project director and must receive inspected verbal descriptions of visual work. Cynthia is the acceptance authority for movement, artwork, sound comfort, pacing, and delight.

## Current implementation

A dependency-free static first-playable scaffold now exists.

Project files include:

- `index.html`
- `package.json`
- `package-lock.json`
- `src/app.js`
- `src/gameLogic.js`
- `src/storage.js`
- `src/atlas.js`
- `src/audio.js`
- `src/styles.css`
- `tests/gameLogic.test.js`

The scaffold uses native HTML, CSS, JavaScript ES modules, Pointer Events, Canvas sprite cropping, localStorage, native Web Audio, and the Node built-in test runner.

No third-party runtime dependency, framework, package installation, build service, database, analytics system, or paid service is required.

## Implemented first-playable behavior

Implemented in code:

- five-by-five board;
- deterministic starting state with eight Imps;
- direct drag threshold before movement begins;
- floating drag copy;
- restrained magnetic pull toward a matching creature;
- relocation to any empty tile;
- equal-tier merging anywhere on the board;
- unequal and outside drops returning to origin;
- Imp, Goblin, Hobgoblin, Troll, and Ogre progression;
- two Ogres producing a Relic Blossom;
- completed relic transfer to a separate Hoard Chamber while freeing both board spaces;
- twin-Imp Spawner with full-board handling;
- one-step Undo;
- versioned local save and reset;
- discovery Codex;
- Hoard Chamber relic count;
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

## Art-direction state

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

The approved compact art reference and provisional atlas remain under:

- `assets/art-development/concepts/`
- `assets/art-development/provisional/`

The application does not regenerate those images. It loads the exact committed Base64 WebP transport, verifies its expected dimensions, and crops individual sprites at runtime from `atlas-map.json`.

Generated words inside UI reference regions remain non-authoritative and are not used as final interface copy.

## Art continuity rule

Future image work must begin from the approved references or preserved atlas whenever technically possible.

Use extraction, cropping, masking, compositing, scaling, color correction, or controlled editing before fresh generation. New broad image generation requires a concrete missing need or an explicit rejection of the current design.

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

## Verification completed

Completed:

- direct inspection of the broad and refined art passes;
- owner authorization of the accepted visual corrections;
- preservation of visual continuity through an art bible, asset manifest, and atlas metadata;
- atlas transport committed with recorded decoded size and SHA-256;
- architecture plan committed;
- dependency-free package and lock metadata committed;
- pure game logic executed with Node `22.16.0`;
- nine rule tests passed;
- no rule test failed;
- superseded controller removed so only `src/app.js` is active;
- entry page points to the corrected delegated-pointer controller.

The passing rules cover:

- starting board;
- relocation without mutation;
- unrestricted equal-tier merge;
- invalid-drop rejection;
- Ogre-to-Relic transfer;
- twin spawning;
- last-space and full-board behavior;
- save validation;
- complete lineage progression.

## Verification not completed

Still unverified:

- actual browser execution of the committed application;
- exact atlas crop appearance in the running board;
- board-scale silhouette separation;
- drag animation timing on a real iPhone;
- sound character on Cynthia's device;
- dialog layout on iPhone;
- persistence through a real browser reload;
- Cynthia play testing;
- hosted preview.

A headless Chromium screenshot route was attempted twice in the implementation environment. Chromium initialized but did not complete screenshot capture. Under the repository failure rule, that mechanism will not be repeated without a materially different environment or method.

## Cost and external-state record

- GitHub Actions dispatched: no.
- External deployment created or changed: no.
- Paid runner used: no.
- Paid infrastructure used: no.
- Paid API used: no.
- Third-party stock asset introduced: no.
- New runtime dependency introduced: no.
- Possible cost introduced: no.

## Next bounded task

The next gate is a real browser smoke test in a file-capable environment that can run the committed branch.

Required checks:

1. load the committed static application;
2. confirm the atlas decodes and every mapped crop is correct;
3. inspect the complete first screen at ordinary and large iPhone dimensions;
4. exercise relocation, merge, invalid snap-back, Spawner, Undo, Codex, Hoard Chamber, mute, reset, and reload persistence;
5. describe the running visual result concretely for the blind owner;
6. correct only defects revealed by that running inspection;
7. do not generate a new broad art set;
8. stop before deployment unless separately authorized.

## Prohibited assumptions

Do not assume:

- the static scaffold has passed a browser smoke test;
- the atlas crops are final at board scale;
- the provisional assets are accepted production art;
- visual attractiveness in still references guarantees satisfying movement;
- repository setup authorizes Actions, deployment, publication, merge, or release;
- a free-tier service may be created without explicit authorization;
- fresh generation is preferable to correcting the approved art.
