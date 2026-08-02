# First-Playable Architecture

Status: accepted implementation plan for the first local playable

Date: 2026-07-31

Branch: `art-direction-and-first-assets`

## 1. Decision

The first playable will be a dependency-free static web application using:

- semantic HTML;
- modern CSS;
- native JavaScript ES modules;
- Pointer Events for dragging;
- Canvas only for cropping preserved atlas sprites into individual renderable pieces;
- `localStorage` for a versioned local save;
- the Node built-in test runner for pure game-logic tests.

No framework, package installation, third-party runtime library, paid service, build service, database, analytics service, or deployment service is required.

A minimal `package.json` exists only to establish ES-module behavior and reproducible local commands. It has no dependencies.

## 2. Why this stack

The Moticos project proved several useful structural patterns:

- keep game rules in pure functions separate from rendering;
- isolate board rendering and pointer interaction;
- use Pointer Events rather than separate mouse and touch systems;
- render a floating drag copy while dimming the source;
- use a small movement threshold before committing to a drag;
- magnetically attract a dragged piece toward a valid matching piece;
- animate invalid drops back to their origin;
- preserve one complete previous state for Undo;
- test rules independently from the visual layer;
- test at both ordinary and large iPhone dimensions.

Hollow & Hoard will inherit those mechanisms, not Moticos code, artwork, rewards, audio, terminology, or progression.

A React and Vite stack would also work, but it would add package installation, transitive dependencies, a generated lockfile, and a build step before the first interaction question is answered. The current game can prove its core loop without those costs.

## 3. First-playable rules

### Board

- Five columns by five rows.
- A creature may be dragged to any empty tile.
- Two creatures of the same tier may be merged anywhere on the board.
- Adjacency is not required.
- A creature dropped onto a different tier returns to its origin.
- A creature dropped outside the board returns to its origin.

### Goblin Hollowkin lineage

1. Imp
2. Goblin
3. Hobgoblin
4. Troll
5. Ogre
6. Relic Blossom

Merging two equal non-Ogre creatures removes the dragged creature and replaces the target creature with the next tier.

Merging two Ogres removes both from the board, creates one Relic Blossom in the Hoard Chamber, and frees both active tiles.

### Spawner

The first-playable Spawner summons two Imps into random empty spaces.

This twin-spawn rule is provisional pacing. It avoids a passive timer and allows the complete lineage to be reached without thirty-two separate summon actions.

If fewer than two spaces are available, it summons as many Imps as the board can hold. If no space is available, it explains that the player must merge first.

### Starting state

A new game begins with eight Imps placed in a deterministic, visually balanced pattern. This provides immediate merging while leaving the board calm enough to read.

### Codex

- Begins with the Imp discovered.
- Reveals each new creature when it is first created through a merge.
- Records the Relic Blossom after the first completed lineage.
- Uses controlled HTML text; generated image text is never authoritative.

### Hoard Chamber

- Records the number of completed Relic Blossoms.
- Displays the preserved Relic Blossom art.
- Remains separate from the active board.

### Undo

- Stores one complete prior state.
- Reverses the most recent relocation, merge, twin summon, or relic completion.
- Does not create an unlimited history in the first playable.

### Save and reset

- Saves after each accepted action.
- Uses schema version `1`.
- Invalid or unreadable saves are ignored safely.
- Reset clears the save and restores the deterministic starting state.

## 4. Interaction model

### Drag start

- Pointer capture begins on a creature.
- Movement below six CSS pixels remains a tap and does not begin a drag.
- Once the threshold is crossed, a floating copy follows the pointer and the source becomes visually subdued.

### Drag movement

- The pointer location identifies the current board tile.
- A matching creature within approximately one tile radius exerts a restrained magnetic pull.
- Empty destinations receive a relocation highlight.
- Matching destinations receive a merge highlight.
- Unequal destinations receive a brief invalid highlight.

### Drop

- Empty tile: relocate.
- Equal creature: merge.
- Unequal creature, origin tile, outside board, or missing target: snap back.
- During the short merge flight, further board input is locked.

### Reduced motion

When the operating system requests reduced motion:

- magnetic movement remains functional but less animated;
- snap-back and merge travel become nearly immediate;
- decorative drifting and pulsing are disabled.

## 5. Visual implementation

The preserved atlas remains authoritative source material for the first scaffold:

`assets/art-development/provisional/first-playable-atlas.webp.base64`

The browser loads the Base64 transport text, constructs a WebP data URL, and decodes it once.

Each sprite is cropped from the atlas into a small canvas using:

`assets/art-development/provisional/atlas-map.json`

This means:

- no fresh generation;
- no lossy screenshot recapture;
- no manual redrawing;
- no duplicated binary transport requirement;
- no dependency on generated words baked into UI references.

The first layout will use:

- Goblin Hollowkin creature sprites;
- Relic Blossom;
- stone tile;
- Goblin Spawner;
- Hoard Chamber;
- Codex icon.

Play and Return button image regions are visual references only. Final button words are HTML text.

## 6. Sound implementation

The first sound layer uses native Web Audio only after a player gesture.

Sound constraints:

- low gain;
- rounded envelopes;
- low or middle fundamentals;
- low-pass filtering;
- no high bells, sharp pings, brittle sparkles, or high-pass emphasis.

Initial events:

- pickup: very soft short wooden contact;
- relocation: muted low tap;
- merge: warm two-note thump;
- invalid drop: quiet dull return cue;
- relic completion: low rounded chord with a longer release.

Sound can be muted. Sound never carries required game information alone.

## 7. File structure

```text
index.html
package.json
package-lock.json
src/
  main.js
  gameLogic.js
  atlas.js
  audio.js
  storage.js
  styles.css
tests/
  gameLogic.test.js
assets/
  art-development/
    concepts/
    provisional/
```

## 8. Test strategy

Pure game-logic tests cover:

- deterministic five-by-five starting board;
- relocation to an empty tile;
- equal-tier merge;
- rejection of self and unequal merges;
- complete Imp-to-Relic route;
- Relic Blossom removal from the board and addition to the Hoard Chamber;
- twin spawning and board-capacity behavior;
- Undo snapshot integrity;
- save-schema validation.

Browser checks, added after the local scaffold works, will cover:

- drag threshold;
- valid relocation;
- valid merge;
- invalid snap-back;
- iPhone safe-area layout;
- Codex and Hoard Chamber dialogs;
- reset and reload persistence.

No GitHub Actions workflow is authorized or required for this scaffold.

## 9. First acceptance gate

The first local playable is ready for visual inspection when:

- the atlas decodes without regeneration;
- the five-by-five board renders at iPhone scale;
- all five creature tiers are visibly distinct at board size;
- direct dragging, relocation, merging, and snap-back work;
- two Ogres create and transfer a Relic Blossom;
- the Codex and Hoard Chamber open and close correctly;
- save, Undo, mute, and reset work;
- pure logic tests pass;
- no currency, turn limit, passive timer, or shop pattern appears.

The owner receives a concrete visual description after inspection. Cynthia testing follows only after a hosted preview is separately authorized and created.

## 10. Stop conditions

This assignment does not authorize:

- deployment;
- a GitHub Actions workflow;
- merging the development branch;
- production release;
- the Gargoyle family;
- new broad image generation;
- music;
- monetization;
- analytics;
- cloud saves;
- social features.

New art is permitted only when the running first playable reveals a specific defect that cannot be corrected by scaling, cropping, masking, compositing, color adjustment, or controlled editing of the preserved sources.
