# Hollow & Hoard Version 2 Clean Rebuild Status

Status date: August 5, 2026

Branch: `work/version-2-clean-rebuild`

Authoritative base: `cfc29a2363662969f82f831d0695aa8457a9a98d`

Status: clean source implementation and bounded local browser gate complete; Cynthia acceptance remains open

## Why this branch exists

The earlier `version-2-cynthia-feedback` branch contains contradictory implementation records, obsolete transport material, and a runtime that does not establish the claimed Version 2 source authority. Its damaged archive and production-atlas fragments are not used by this rebuild.

This branch begins directly from the accepted Version 1 commit and rebuilds Version 2 without inheriting the damaged Version 2 branch, temporary workflows, PR-comment relays, Base64 source archives, trigger markers, or probe files.

## Implemented product changes

The clean rebuild includes:

- a dedicated introductory story and how-to-play screen;
- the explanation that the Hoard is what the Hollow remembers after a lineage is completed;
- a five-by-five board preserving the Version 1 movement model;
- four opening Imps and four opening Mosscaps;
- separate Goblin Spawner and Moonstone Nest controls;
- complete Goblin and Gargoyle progressions;
- same-family, same-tier merging;
- mixed-family and unequal-tier rejection;
- Relic Blossom and Moonlit Relic completion that frees board space;
- separate Codex and Hoard surfaces;
- one-step Undo, reset, save, and Version 1 save migration;
- family-specific low, rounded sound cues and gentle ambient sound;
- magnetic drag targeting, invalid return, merge bloom, relic ceremony, fireflies, and persistent environmental memory;
- responsive phone and desktop layout;
- reduced-motion behavior;
- crisp self-contained SVG artwork for both creature families, relics, dwellings, Codex, Hoard, and story surface.

## Deliberate asset decision

The nine files under the earlier branch's `assets/production/v2/` path do not reconstruct the recorded production WebP. One fragment contains terminal Base64 padding before a later fragment begins. The old status prose, fragment count, byte count, and checked-in files therefore do not agree.

The clean rebuild does not repair, splice, or import those fragments. It uses repository-native vector artwork so the implementation is deterministic, scalable, reviewable as text, and independent of the corrupted transport.

This vector artwork is a clean production candidate, not Cynthia-accepted final art.

## Local verification completed

Passed in the available unmetered environment:

- JavaScript syntax checks for every source and Node test file;
- 13 game-rule and migration tests;
- four source-structure and import-authority tests;
- 17 tests total;
- exact 25-cell board contract;
- both starting families;
- both spawners;
- relocation;
- same-family merging;
- mixed-family and unequal-tier rejection;
- both relic paths;
- constrained spawning when the board is nearly full;
- Version 1 save migration;
- invalid-save recovery;
- complete relative-import resolution;
- required story, board, Codex, Hoard, Undo, and reset surfaces;
- absence of any dependency on the damaged Version 2 transport.

## Browser evidence completed

The clean source passed a bounded local Chromium gate without GitHub Actions, external hosting, dependencies, or network access.

Verified at phone and desktop sizes:

- mobile viewport: `430 x 932`;
- desktop viewport: `1280 x 900`;
- introductory story screen and `Start Game` transition;
- exactly 25 board cells;
- four opening Goblins and four opening Gargoyles;
- Goblin Spawner increasing the Goblin family from four to six;
- Moonstone Nest increasing the Gargoyle family from four to six;
- Codex opening and closing;
- Hoard opening and closing;
- 19 rendered vector-art elements after spawning;
- zero browser console errors;
- zero uncaught page errors.

Direct screenshot inspection found:

- the story screen atmospheric, legible, and free of board clutter;
- the two families immediately distinguishable by silhouette, material, and color;
- the five-by-five board dominant and readable at large-iPhone scale;
- both dwellings, Codex, Hoard, Undo, reset, and status surfaces legible;
- the desktop composition centered, calm, and proportionate;
- no visible clipping, overlap, horizontal overflow, or collapsed controls.

Evidence is preserved locally under `test-output/clean-rebuild/`. It is verification evidence, not a committed runtime dependency.

Cynthia must still judge beauty, sound comfort, drag feel, pacing, and desire to continue on her actual device.

## Preserved boundaries

- `main` is unchanged.
- `art-direction-and-first-assets` is unchanged.
- `version-2-cynthia-feedback` and PR 2 are unchanged by this rebuild.
- no pull request is created by this checkpoint;
- no workflow is added, edited, triggered, or rerun;
- the inherited manual browser workflow is removed from this clean branch so it cannot be dispatched accidentally;
- no deployment or publication occurs;
- no paid dependency, service, runner, asset, or possible cost is introduced.

## Next bounded gate

Provide one stable exact build to Cynthia for judgment of:

- story and Hoard clarity;
- creature and Gargoyle appeal;
- visual sharpness;
- drag feel;
- sound audibility and comfort;
- animation and environmental life;
- board calmness;
- relic satisfaction;
- desire to continue playing.

Do not merge, publish, or claim Cynthia acceptance before those gates are completed.
