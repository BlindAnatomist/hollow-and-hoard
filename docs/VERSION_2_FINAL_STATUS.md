# Version 2 Final Pre-Cynthia Status

Status: implemented, browser-tested, hosted, and awaiting Cynthia acceptance

Branch: `version-2-cynthia-feedback`

Draft pull request: `#2`

Preview: `https://blindanatomist.github.io/hollow-and-hoard/`

## Implemented

Version 2 preserves the accepted Version 1 control model and visual identity while responding directly to Cynthia’s feedback.

Implemented changes:

- dedicated title, story, and how-to-play screen before the board;
- explicit story that the Hoard is what the Hollow remembers when a lineage is completed;
- four opening Imps and four opening Mosscaps;
- complete Goblin Hollowkin and Gargoyle lineages;
- separate Goblin Spawner and Moonstone Nest;
- Relic Blossom and Moonlit Relic completion;
- dual-family Codex and Hoard displays;
- Version 1 save migration;
- higher-resolution production atlas derived from approved art;
- 192×192 creature crops from a 1152×960 atlas;
- stronger but still low and rounded event cues;
- family-specific sound character and gentle ambient sound;
- fireflies, drifting lights, lantern flicker, idle creature movement, merge bloom, relic ceremony, and persistent environmental response;
- refined board treatment and larger creature presence.

## Verification

Passed:

- ten Node rule and production-asset integrity tests;
- desktop Chromium at 1280×900;
- mobile WebKit at 430×932;
- introductory story and Start Game transition;
- both spawners;
- relocation;
- same-family merging;
- mixed-family and unequal-tier rejection;
- Undo;
- reset;
- local persistence and Version 1 migration;
- Codex;
- Hoard;
- sound toggle;
- Goblin and Gargoyle relic completion;
- fireflies and environmental-memory state;
- browser console and page-error checks.

Browser evidence is preserved under `docs/test-evidence/version-2/` and summarized in `docs/VERSION_2_BROWSER_GATE_RESULT.md`.

## Hosted verification

The Pages preview was deployed from the tested Version 2 branch.

The hosted runtime was downloaded and compared byte-for-byte with the tested branch for:

- `index.html`;
- all active `src` modules;
- the production atlas map;
- all five production-atlas Base64 parts.

The hosted commit marker matched the tested branch head at deployment time.

## Repository state

- PR 2 remains draft and unmerged.
- PR 2 is stacked on the preserved Version 1 branch.
- `main` remains at `d66e35158d6e4c75ea2daa299988a59221ef54aa`.
- Version 1 remains at `cfc29a2363662969f82f831d0695aa8457a9a98d`.
- The Version 1 Netlify preview was not changed.
- Temporary workflows, source archives, relay fragments, probe files, duplicate atlas records, and unused atlas parts were removed.
- The four temporary Google Drive transport files were deleted.
- No paid runner, paid service, production release, or possible cost was introduced.

## Remaining acceptance gate

Cynthia must judge the Version 2 preview on her actual device for:

- character sharpness and professional finish;
- story clarity;
- understanding of the Hoard;
- Gargoyle appeal;
- drag feel;
- sound audibility and comfort;
- animation and environmental life;
- board atmosphere and visual density;
- pacing;
- relic satisfaction;
- desire to continue playing.

Do not merge or mark PR 2 ready until her feedback has been reviewed and demonstrated defects have been repaired.
