# Visual Direction

Status: accepted art-direction foundation with provisional composited assets

Date: 2026-07-31

## 1. Core visual proposition

Hollow & Hoard is a quiet nocturnal storybook world made from touchable materials.

The defining contrast is:

- cool moonlight over the larger hollow;
- warm amber lantern light inside inhabited places.

The world should feel old, softened, occupied, and cared for rather than ruined and hostile.

## 2. Approved world language

Preserve:

- moonlit stone courtyards;
- moss, lichen, vines, and small muted-purple flowers;
- warm creature dwellings cut into old architecture;
- lanterns, candles, parchment, carved wood, aged brass, and worn cloth;
- water used sparingly as reflective calm;
- creatures who feel like residents and keepers rather than combat units;
- a separate Spawner and Hoard Chamber integrated into the environment;
- a parchment Codex that feels like a field journal.

Avoid:

- glossy mobile-fantasy surfaces;
- excessive particle effects;
- generic magical neon;
- hostile high-fantasy combat presentation;
- every surface carrying decoration;
- interface elements that resemble stores or monetization systems.

## 3. Goblin Hollowkin family

Approved lineage:

1. Imp — tiny, lively, sproutlike, impulsive.
2. Goblin — compact, curious, lantern-bearing.
3. Hobgoblin — hooded, equipped, capable, planning-oriented.
4. Troll — broad, low, sturdy, builder and gatherer.
5. Ogre — tall, gentle, protective, guardian of the hoard.
6. Relic Blossom — a separate illuminated shrine object representing legacy.

Material language:

- clay;
- leaf leather;
- carved wood;
- stitched cloth;
- moss;
- aged brass;
- warm lantern glass.

Silhouette rule:

The first three stages must remain distinguishable at board-piece size. Preserve strong differences in height, hood shape, carried prop, posture, and width. Do not rely on facial details alone.

## 4. Gargoyle family

Approved lineage:

1. Mosscap — a moss-covered stone almost indistinguishable from the ground.
2. Hatchling — small awakened body with emerging wings.
3. Gargoyle — fully formed watcher.
4. Elder Gargoyle — architectural keeper with deeper carving and greater stillness.
5. Moonlit Relic — a separate moon shrine or vessel, not another gargoyle body.

Material language:

- weathered stone;
- carved relief;
- moss and lichen;
- muted violet crystal;
- candle and lantern light;
- restrained moonlit water.

Conceptual rule:

The family progresses from stillness, to life, to witness, to sacred memory.

## 5. Board

Approved:

- five-by-five grid;
- large pale carved stone slabs;
- restrained environmental framing;
- Spawner on the left;
- Hoard Chamber on the right;
- creature pieces large enough to read clearly;
- the hollow surrounding the board rather than competing with it.

Correct in production:

- reduce carving detail on individual tiles;
- remove any invented currencies, turn counters, end-turn controls, or merge-three instructions;
- do not assume the bottom inventory row belongs in the game;
- keep permanent labels out of the environment unless usability testing proves they are useful;
- exaggerate creature silhouettes enough to remain distinct during movement.

## 6. Interface

Approved:

- parchment Codex;
- carved wood and stone frames;
- restrained purple for primary actions;
- moss green for secondary actions;
- parchment-brown for tertiary actions;
- simple icons based on books, paws, mushrooms, leaves, lanterns, chests, feathers, and places;
- Hoard Chamber presented as a real room rather than a collection spreadsheet;
- environmental status panels such as “Night Quiet.”

Reject:

- multiple currencies;
- energy counters;
- purchase-like plus buttons;
- locked monetization tracks;
- shop-card patterns;
- excessive simultaneous panels;
- generated text as final copy.

## 7. Density and hierarchy

Key art may be richly detailed.

Playable screens must be calmer.

Hierarchy:

1. movable creatures;
2. legal destinations and merge targets;
3. board state;
4. Spawner and Hoard Chamber;
5. background atmosphere;
6. decorative detail.

No decorative element may make the current creature or destination harder to read.

## 8. Lighting

Use warm lantern amber for safety, habitation, reward, and goblin life.

Use lavender moonlight and cool blue-gray stone for distance, memory, and gargoyle presence.

Avoid high-saturation electric purple except as a restrained relic accent.

## 9. Current reference and asset set

The compact approved reference is stored under:

`assets/art-development/concepts/`

The first transparent production atlases are stored under:

`assets/art-development/provisional/`

Because the current GitHub connector cannot reliably commit binary image bytes, the WebP files are preserved as exact Base64 transport files with an atlas map. A file-capable implementation environment may decode them without regenerating the art.

These assets are provisional. They may be used for the first scaffold, but must be inspected at actual board scale before acceptance.

## 10. Generation and editing discipline

When a good element already exists:

- edit it;
- crop it;
- isolate it;
- simplify it;
- composite it;
- generate a controlled variation from it.

Do not start over merely because generation is available.

A fresh image is justified only when:

- the required subject does not exist;
- the source composition prevents a safe edit;
- a new viewing angle is necessary;
- the existing design was explicitly rejected;
- or a production constraint cannot be met through extraction or editing.

Every fresh generation must inherit the accepted material, lighting, and shape language.

## 11. Current production assessment

The Goblin Hollowkin and world-element atlases are suitable for early layout and interaction prototyping.

They are not yet accepted final art because:

- the Troll and Ogre require board-scale comparison;
- the earliest stages need silhouette testing;
- the Spawner, Hoard Chamber, and tile must be tested together in a real screen;
- animations have not been designed;
- the assets have not yet been reviewed by Cynthia in motion.

## 12. Next visual task

Build the first playable using the current atlases before commissioning another broad concept pass.

Only generate or edit new art in response to a concrete implementation need discovered during that build.
