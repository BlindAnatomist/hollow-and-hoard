# Hollow & Hoard Project Definition

Status: accepted working foundation for implementation planning

Date established: 2026-07-31

Repository: `BlindAnatomist/hollow-and-hoard`

## 1. Project identity

Hollow & Hoard is an independent merge game about cultivating strange creatures in a moonlit hollow, completing evolutionary bloodlines, uncovering relics, and gradually awakening the surrounding world.

It is not a renamed version, sequel, fork, or content expansion of Moticos for Cynthia. It may deliberately inherit proven lessons about movement, pacing, sound comfort, testing, and repository discipline, but its mechanics, artwork, sound world, vocabulary, progression, and emotional character must remain its own.

## 2. Intended player and acceptance authority

This game is for Cynthia.

The primary experience is visual and tactile. Cynthia is the acceptance authority for:

- beauty and atmosphere;
- satisfying dragging and movement;
- creature appeal and clarity;
- sound comfort;
- pacing;
- delight and replay interest.

The blind owner remains the project director and authorization authority. Visual work must therefore be inspected and described to him in concrete language, but VoiceOver controls and nonvisual board operation are not first-playable requirements.

## 3. Intended experience

The game should feel:

- tactile rather than menu-driven;
- nocturnal, warm, mysterious, and gently mischievous;
- beautiful without visual congestion;
- materially grounded rather than full of sharp synthetic effects;
- discoverable without becoming obscure;
- rewarding without requiring long repetitive accumulation;
- calm enough that the creatures and their movement remain the visual focus.

The player should feel that the hollow is becoming inhabited, remembered, and transformed by play.

## 4. Established player preferences

Cynthia's testing of the separate Moticos project established useful evidence:

- she liked moving pieces and the feeling of dragging them;
- she found the game visually attractive;
- high, sharp sounds could be physically unpleasant;
- progression should produce meaningful change rather than merely more clutter;
- advanced forms should become more beautiful, composed, and distinctive rather than simply larger or more ornamented.

These are design requirements for prototypes, but no Hollow & Hoard implementation is considered accepted until Cynthia tests it directly.

## 5. Core game structure

The working core loop is:

1. An enchanted Spawner produces starter creatures.
2. The player drags matching creatures together.
3. A valid merge creates the next distinct creature in that bloodline.
4. Advanced creatures reveal changes in the hollow.
5. Completing a bloodline creates a Hoard Relic.
6. The completed relic leaves the active board and enters the Hoard Chamber.
7. Hoarded relics permanently change the hollow and eventually unlock additional families, spaces, or events.

The Codex and Hoard Chamber are separate systems:

- the Codex records creatures and living discoveries;
- the Hoard Chamber records completed achievements and persistent world change.

## 6. Initial creature families

### Goblin Hollowkin line

1. Imp
2. Goblin
3. Hobgoblin
4. Troll
5. Ogre
6. Relic Blossom

Working progression of character:

- Imp: impulsive;
- Goblin: curious;
- Hobgoblin: resourceful;
- Troll: steadfast;
- Ogre: guardian;
- Relic Blossom: legacy.

The Goblin Hollowkin line is the selected first-playable family.

### Gargoyle line

1. Mosscap
2. Gargoyle Hatchling
3. Gargoyle
4. Elder Gargoyle
5. Moonlit Relic

Working progression of character:

- Mosscap: dormant;
- Hatchling: awakening;
- Gargoyle: watcher;
- Elder Gargoyle: keeper;
- Moonlit Relic: remembrance.

The Gargoyle line is reserved for the next content expansion after the first complete loop is proven.

## 7. Board and movement direction

The concept prototype used a six-by-six board, tap selection, unrestricted relocation to empty cells, adjacency-limited merging, and six-second summon cooldowns. Those rules are not accepted automatically.

The first-playable direction is:

- a five-by-five board;
- direct dragging as the primary interaction;
- drag onto an empty tile to relocate;
- drag onto an identical creature to merge;
- drag onto an incompatible occupied tile to return the creature to its origin with gentle feedback;
- no adjacency requirement for the first playable;
- no turn limit;
- no currency economy;
- no passive six-second waiting loop;
- no permanent board obstruction from completed relics;
- an Undo action when technically practical;
- a clear board-recovery path when the board is full.

The exact Spawner cadence and first-playable progression length remain tuning decisions, not visual-generation decisions.

## 8. Progression and the meaning of the title

“Hollow” is the place that changes.

“Hoard” is the permanent accumulation of relics and remembered accomplishments.

The title requires a real hoard system, not merely a discovery counter. Relics have identity, placement, description, and environmental consequences. Completing a relic creates board space and changes the larger environment.

Possible consequences include:

- new plants or moss growth;
- opened ruins or chambers;
- altered firefly behavior;
- changes in moonlight or ambient sound;
- new nests or creature families;
- rare visitors or hidden events.

## 9. Visual direction

The accepted direction is a handcrafted nocturnal storybook world rather than glossy generic mobile fantasy.

Preferred material vocabulary:

- clay;
- carved and weathered stone;
- worn fabric;
- moss and lichen;
- leaf leather;
- aged brass;
- warm lantern glass;
- parchment;
- irregular but readable silhouettes.

Goblin Hollowkin use rounded, organic, stitched, improvised shapes and warm earth colors.

Gargoyles use architectural, angular, carved, symmetrical shapes and cooler stone colors.

Evolution changes silhouette, posture, expression, role, and material presence—not merely scale, color, horns, cracks, or accessories.

The procedural SVG art in the Claude prototype remains concept evidence and placeholder work. It is not the accepted final art system.

Detailed approved and rejected visual decisions are recorded in `docs/VISUAL_DIRECTION.md`.

## 10. Art continuity rule

Approved concept images are not to be discarded at each generation.

Future art work must:

- reuse approved references;
- preserve strong designs;
- extract individual assets where possible;
- correct local problems without changing unrelated features;
- use new generation only when editing cannot produce the required result;
- classify assets as exploratory, approved reference, provisional production, or accepted production.

Generated lettering is never final interface text.

## 11. Sound direction

The sound world should be soft, low, rounded, and materially specific.

Working examples:

- goblin merge: felted thump, soft wood, or leaf leather;
- gargoyle merge: low stone contact and mossy scrape;
- wing motion: cloth flutter rather than bright shimmer;
- relic discovery: warm wood, muted glass, or low harmonic resonance;
- major reward: rounded harmony without piercing upper frequencies.

Do not rely on sharp pings, high bells, brittle magical sparkles, or toy-like synthesized sounds.

## 12. Baseline usability

Hollow & Hoard does not require a VoiceOver-specific game mode for the first playable.

The implementation should still preserve ordinary quality:

- readable contrast;
- stable touch targets;
- predictable buttons;
- reduced-motion behavior where practical;
- no avoidable interaction traps;
- instructions and errors that are understandable to the intended player.

## 13. First playable checkpoint

The first playable is deliberately narrow:

- the complete Goblin Hollowkin family;
- one Spawner;
- one five-by-five board;
- direct drag relocation and merging;
- one Relic Blossom completion;
- one minimal Codex section;
- one minimal Hoard Chamber;
- board-space recovery through relic completion;
- representative gentle sound treatment;
- save, reset, and undo behavior where practical;
- automated state and build checks where useful;
- a hosted candidate only after separate authorization.

The first playable is successful when the complete loop is attractive, understandable, satisfying to move through, and enjoyable for Cynthia—not when the repository contains many creatures.

## 14. Claude concept prototype

The originating concept was supplied as a React component containing:

- a six-by-six board;
- goblin and gargoyle merge chains;
- procedural SVG creature art;
- tap selection and relocation;
- adjacency-limited merging;
- timed spawning;
- local save behavior through a Claude-specific `window.storage` API;
- a discovery Codex;
- firefly ambience and a nocturnal color system.

The prototype is valuable as design evidence, vocabulary, and behavioral reference. It is not production architecture.

## 15. Initial non-goals

The foundation does not authorize:

- copying the Moticos codebase;
- building multiple active creature families before the first loop is proven;
- monetization, advertising, in-app purchases, or paid services;
- social accounts, leaderboards, cloud saves, analytics, or user tracking;
- automatic deployment;
- a large content pipeline;
- music;
- a production release;
- a separate VoiceOver-first control system.

## 16. Acceptance authority

Repository checks establish technical correctness.

The owner establishes project direction and authorizes consequential actions.

Cynthia establishes whether movement, artwork, sound, pacing, and delight are successful for the intended player experience.
