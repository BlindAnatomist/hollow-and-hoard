# Hollow & Hoard Version 2 — Cynthia Feedback Plan

Status: authorized for implementation

Date: 2026-08-01

Starting baseline:

- branch: `art-direction-and-first-assets`
- tested application source through: `643833c93b872e32d4c7e5fea5012c8b0fa95a43`
- current branch head before Version 2 branch creation: `cfc29a2363662969f82f831d0695aa8457a9a98d`
- isolated tested preview: `https://hollow-and-hoard-preview.netlify.app`
- draft PR 1 remains the preserved Version 1 baseline

## 1. Acceptance evidence from Cynthia

Cynthia played the first hosted version and reported:

Accepted:

- the game is cute and pretty;
- she likes the controls.

Defects and unmet expectations:

- the characters are pixelated and blurry and do not resemble professional game art;
- sounds are too quiet or too sparse to provide satisfying feedback;
- the Gargoyle family expected from the concept is absent;
- the story and meaning of the Hoard are not understandable during play;
- the game feels plainer and less alive than the original concept, especially because fireflies and richer animation are missing.

The owner additionally reaffirmed earlier concerns:

- the board should feel more integrated into the hollow and less like repetitive manufactured buttons;
- creature pieces should command more visual presence inside their cells;
- the Hollow should visibly remember completed relics;
- explanatory copy should not crowd the active game board.

## 2. Version 2 product proposition

Version 2 should feel like entering a living nocturnal sanctuary rather than opening directly onto a utility board.

The player first encounters a dedicated introductory screen containing:

- the title `Hollow & Hoard`;
- a concise story premise;
- concise instructions for dragging and merging;
- a clear explanation that completed lineages become relics and that the Hoard is what the Hollow remembers;
- a `Start Game` control.

The introduction carries narrative and instructional weight so the active board can remain visually calm.

## 3. Story foundation

Working story:

The Hollow is an old moonlit sanctuary where small forgotten creatures awaken from enchanted dwellings. When two alike creatures meet, they remember what they can become. Each completed family leaves behind a relic: not treasure taken from the creatures, but the lasting form of everything their lineage learned.

The Hoard is the Hollow's memory. As relics gather, the sanctuary becomes warmer, more inhabited, and more awake.

This story should be communicated lightly through:

- the introductory screen;
- one short line when a family is completed;
- the Codex;
- the Hoard Chamber;
- persistent environmental changes.

Do not place long explanatory paragraphs beside the active board.

## 4. Version 2 implementation priorities

### Priority 1 — Professional creature assets

Replace the compact 384-by-256 provisional atlas as the visible production source.

Requirements:

- high-resolution source art;
- crisp rendering at large iPhone board scale;
- transparent or safely isolated backgrounds;
- consistent viewing angle and lighting;
- stronger silhouette separation;
- approved Goblin designs preserved rather than reinvented;
- Gargoyle designs derived from the approved Gargoyle concept family;
- no baked-in interface text.

The current atlas remains a continuity reference and fallback, not the Version 2 visual target.

### Priority 2 — Introductory story screen

Create a separate opening view before the game board.

It must:

- explain the Hollow and Hoard in plain, evocative language;
- explain drag-to-move and drag-matching-to-merge;
- avoid generic tutorial clutter;
- permit returning players to start quickly;
- remain visually atmospheric rather than text-heavy;
- include reduced-motion behavior.

### Priority 3 — Restore Gargoyle progression

Add the complete approved Gargoyle line:

1. Mosscap
2. Gargoyle Hatchling
3. Gargoyle
4. Elder Gargoyle
5. Moonlit Relic

The family progresses from stillness, to awakening, to witness, to remembrance.

The Gargoyle source must be visually and mechanically distinguishable from the Goblin Spawner. Its sound material should be low stone, moss, cloth-wing movement, and muted moonlit resonance.

### Priority 4 — Sound audibility and event coverage

Preserve the gentle, low, rounded sound language while making cues clearly audible on Cynthia's device.

Add or strengthen distinct cues for:

- picking up a creature;
- moving to an empty tile;
- successful Goblin merge;
- successful Gargoyle merge;
- invalid drop and return;
- spawning;
- opening the Codex;
- opening the Hoard;
- family completion;
- relic arrival;
- persistent ambient night.

Avoid painful upper-frequency transients, shrill bells, or sudden loudness. The goal is presence, not volume.

### Priority 5 — Ambient life and animation

Add restrained animation that makes the Hollow breathe:

- drifting fireflies around but not over the most important board information;
- slow lantern flicker;
- subtle atmospheric motes;
- creature idle motion that preserves silhouette clarity;
- a short merge bloom;
- gentle magnetic movement toward valid matches;
- a ceremonial relic transfer;
- a persistent environmental response after a relic is collected.

Respect reduced-motion preferences by replacing travel and drift with static glow or minimal fades.

### Priority 6 — Board refinement

Preserve the five-by-five structure and accepted controls.

Improve:

- larger creature presence inside cells;
- less visual weight in the circular cell depressions;
- subtle nonrepeating stone variation;
- restrained moss or carved detail at selected edges;
- stronger integration between the board and surrounding hollow;
- visible but calm merge-target feedback;
- no currencies, turn limits, shop patterns, or instructional clutter on the board.

## 5. Mechanical direction for two families

Version 2 must not create accidental frustration from mixed starter families.

Working approach:

- two distinct summon controls or dwellings, one Goblin and one Gargoyle;
- both generate starter creatures directly without passive timers;
- family identity remains obvious through shape, material, lighting, and sound;
- equal family and equal tier are required to merge;
- mismatched drops return gently;
- each completed lineage moves its separate relic to the Hoard and frees board space.

Exact starting population and summon balance should be tested rather than assumed.

## 6. Hoard and environmental memory

The Hoard must become legible as memory rather than inventory.

Version 2 should include:

- distinct Relic Blossom and Moonlit Relic displays;
- one-line story meaning for each relic;
- persistent counts;
- at least one visible environmental change after each family completion;
- a general Hoard statement: `What the Hollow remembers.`

Possible first changes:

- Goblin relic: warm gold flowers or lantern growth near the board;
- Gargoyle relic: a moonlit carved symbol, lavender water glow, or awakened stone guardian.

## 7. Preserve from Version 1

Do not regress:

- satisfying drag controls;
- six-pixel threshold;
- floating drag copy;
- magnetic valid-target pull;
- invalid snap-back;
- five-by-five board;
- relocation to empty cells;
- one-step Undo;
- save and reset;
- responsive iPhone layout;
- Codex and Hoard separation;
- no currency, monetization, turn limit, or passive timer;
- zero-dollar infrastructure;
- draft and unmerged development workflow.

## 8. Verification plan

Before Cynthia receives Version 2:

1. pure tests for both lineages, relics, spawn rules, save migration, and Hoard copy;
2. asset integrity and dimensions;
3. desktop Chromium and mobile WebKit smoke tests;
4. introductory-screen navigation and return-to-introduction behavior;
5. visual inspection at actual iPhone scale;
6. sprite sharpness and silhouette review;
7. animation review including reduced-motion behavior;
8. sound event coverage and gain inspection;
9. hosted byte verification;
10. actual-device testing by Cynthia.

Automated checks cannot establish sound comfort, professional appearance, delight, or satisfying motion. Cynthia remains the acceptance authority.

## 9. Branch and release boundary

Version 2 will be developed on a new branch from the preserved Version 1 branch head.

- do not modify `main`;
- do not merge PR 1;
- keep Version 1 preview available as the comparison baseline;
- create a separate Version 2 draft PR;
- do not replace the existing Cynthia preview until the new build passes its own gate;
- no paid service or possible cost may be introduced.
