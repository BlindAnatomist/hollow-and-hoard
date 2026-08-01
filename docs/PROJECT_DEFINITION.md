# Hollow & Hoard Project Definition

Status: working foundation for review and implementation planning

Date established: 2026-07-31

Repository: `BlindAnatomist/hollow-and-hoard`

## 1. Project identity

Hollow & Hoard is an independent merge game about cultivating strange creatures in a moonlit hollow, completing evolutionary bloodlines, uncovering relics, and gradually awakening the surrounding world.

It is not a renamed version, sequel, fork, or content expansion of Moticos for Cynthia. It may deliberately inherit proven lessons about movement, pacing, accessibility, sound comfort, testing, and repository discipline, but its mechanics, artwork, sound world, vocabulary, progression, and emotional character must remain its own.

## 2. Intended experience

The game should feel:

- tactile rather than menu-driven;
- nocturnal, warm, mysterious, and gently mischievous;
- beautiful without visual congestion;
- materially grounded rather than full of sharp synthetic effects;
- discoverable without becoming obscure;
- rewarding without requiring long repetitive accumulation;
- coherent for both visual and nonvisual play.

The player should feel that the hollow is becoming inhabited, remembered, and transformed by play.

## 3. Established player preferences inherited as design evidence

Cynthia's testing of the separate Moticos project established useful evidence:

- she liked moving pieces and the feeling of dragging them;
- she found the game visually attractive;
- high, sharp sounds could be physically unpleasant;
- progression should produce meaningful change rather than merely more clutter;
- advanced forms should become more beautiful, composed, and distinctive rather than simply larger or more ornamented.

These are design requirements for prototypes, but no Hollow & Hoard implementation is considered accepted until Cynthia tests it directly.

## 4. Core game structure

The working core loop is:

1. Enchanted nests or equivalent sources produce starter creatures.
2. The player moves or drags matching creatures together.
3. A valid merge creates the next distinct creature in that bloodline.
4. Advanced creatures uncover relic fragments or reveal changes in the hollow.
5. Completing a bloodline awakens its guardian and creates a Hoard Relic.
6. The completed relic leaves the active board and enters the Hoard Chamber.
7. Hoarded relics permanently change the hollow and eventually unlock additional creature families, spaces, or events.

The Codex and Hoard Chamber are separate systems:

- the Codex records creatures and living discoveries;
- the Hoard Chamber records completed achievements and persistent world change.

## 5. Initial creature families

The concept prototype established two initial bloodlines.

### Goblin line

1. Imp
2. Goblin
3. Hobgoblin
4. Troll
5. Ogre
6. Hoard Blossom or another final goblin relic to be named during design review

Working character: warm, unruly, bodily, curious, and mischievous.

### Gargoyle line

1. Mosscap
2. Gargoyle Hatchling
3. Gargoyle
4. Elder Gargoyle
5. Moonpetal or another final gargoyle relic to be named during design review

Working character: quiet, stony, watchful, architectural, and lunar.

The different chain lengths in the concept prototype require deliberate balancing rather than accidental equivalence.

## 6. Board and movement direction

The concept prototype used a six-by-six board, tap selection, unrestricted relocation to empty cells, adjacency-limited merging, and six-second summon cooldowns.

Those rules are not accepted automatically.

The preferred first-playable direction is:

- begin with a smaller, more legible board, provisionally five by five;
- make direct dragging the primary touch and pointer interaction;
- provide a complete nonvisual select-and-destination operation using the same state and rules;
- ensure that valid moves, invalid moves, merges, and consequences are understandable before commitment;
- prevent completed chains from permanently clogging the board;
- replace passive waiting timers unless testing proves that a timer creates meaningful rhythm rather than dead time;
- provide a recovery mechanism when the board becomes crowded;
- include undo when it can be implemented without undermining the intended rules.

Adjacency, free relocation, spawning, and board-expansion rules must be established explicitly before implementation.

## 7. Progression and the meaning of the title

“Hollow” is the place that changes.

“Hoard” is the permanent accumulation of relics and remembered accomplishments.

The title requires a real hoard system, not merely a discovery counter. Relics should have identity, placement, description, and consequences. Completing a relic should create board space and change the larger environment.

Possible environmental consequences include:

- new plants or moss growth;
- opened ruins or chambers;
- altered firefly behavior;
- changes in moonlight or ambient sound;
- new nests or creature families;
- rare visitors or hidden events.

These examples are design possibilities, not yet a committed content list.

## 8. Visual direction

The target is a handcrafted nocturnal storybook world rather than glossy generic mobile fantasy.

Preferred material vocabulary:

- clay;
- carved and weathered stone;
- worn fabric;
- moss and lichen;
- muted pigment;
- moonlit paper;
- irregular but readable silhouettes.

Each creature family should feel made from a different material. Evolution should change silhouette, posture, expression, and character—not merely scale, color, horns, cracks, or accessories.

The procedural SVG art in the Claude prototype is concept evidence and placeholder work. It is not the accepted final art system.

## 9. Sound direction

The sound world should be soft, low, rounded, and materially specific.

Working examples:

- goblin merge: felted thump, soft wood, or leaf leather;
- gargoyle merge: low stone contact and mossy scrape;
- wing motion: cloth flutter rather than bright shimmer;
- relic discovery: warm wood, muted glass, or low harmonic resonance;
- major reward: rounded harmony without piercing upper frequencies.

Do not rely on sharp pings, high bells, brittle magical sparkles, or toy-like synthesized sounds.

Sound must communicate useful state without becoming compulsory for understanding the game.

## 10. Accessibility model

Accessibility is part of the game system.

The first playable must provide:

- concise control names;
- useful but nonduplicative descriptions;
- logical VoiceOver swipe order;
- reliable focus after overlays, discoveries, errors, and state changes;
- a persistent way to inspect the board and current selection;
- explicit announcement of creature identity, tier, state, and available operation;
- a complete accessible alternative to dragging that uses the same game rules;
- announcement of merge results and newly discovered creatures without excessive repetition;
- a way to inspect the Codex and Hoard Chamber without visual inference;
- reduced-motion support;
- no dependence on color, animation, spatial position, or sound alone;
- enough time for VoiceOver speech to finish before short consequential sounds when overlap would obscure them.

Real-device iPhone VoiceOver testing is required at defined checkpoints.

## 11. First playable checkpoint

The preferred first playable should be deliberately narrow:

- one complete creature family;
- one starter source;
- one board with accepted movement and merge rules;
- direct drag interaction;
- the complete VoiceOver-equivalent movement model;
- one completed guardian or relic transition;
- a minimal Codex;
- a minimal Hoard Chamber;
- board-space recovery through relic completion;
- representative sound treatment using safe, gentle temporary sounds;
- save and reset behavior;
- automated state, build, and accessibility checks where useful;
- a hosted candidate only after separate authorization.

The first playable is successful when the complete loop can be understood and enjoyed, not when the repository contains many creatures.

## 12. Claude concept prototype

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

The prototype is valuable as design evidence, vocabulary, and behavioral reference. It is not production architecture. In particular:

- `window.storage` is environment-specific and must be replaced;
- the drag behavior Cynthia values is absent;
- the Hoard system promised by the title is absent;
- completed blossoms can clog the board;
- blurbs exist in data but are not fully surfaced;
- inaccessible or arbitrary movement rules require redesign;
- artwork and sound remain placeholders.

Before application implementation begins, preserve the exact prototype source in a clearly marked reference location or reconstruct it from the original supplied source through a source-faithful route. Do not silently transform it into active production code.

## 13. Initial non-goals

The foundation does not authorize:

- copying the Moticos codebase;
- building multiple creature families before the first loop is proven;
- monetization, advertising, in-app purchases, or paid services;
- social accounts, leaderboards, cloud saves, analytics, or user tracking;
- automatic deployment;
- a large content pipeline;
- music;
- a production release;
- treating automated accessibility output as VoiceOver acceptance.

## 14. Decisions required before scaffolding

The next implementation-planning assignment must establish:

1. exact board dimensions and movement rules;
2. the first creature family and chain length;
3. spawning and crowding rules;
4. completion and Hoard transition behavior;
5. undo and recovery behavior;
6. technical stack and package manager;
7. save format and migration strategy;
8. artwork production method and licensing;
9. temporary and final sound production method;
10. automated test and accessibility strategy;
11. first hosted-preview mechanism, subject to explicit deployment authorization and the zero-dollar policy.

## 15. Acceptance authority

Repository checks can establish technical correctness. The owner establishes VoiceOver acceptance. Cynthia establishes whether movement, artwork, sound, pacing, and delight are successful for the intended player experience.
