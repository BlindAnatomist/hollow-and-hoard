# Known Problems and Proven Solutions

This is the consolidated operational memory for `BlindAnatomist/hollow-and-hoard`.

Record a problem here only after it has actually occurred and its cause or solution has been established with evidence. Do not copy unrelated incidents from other repositories merely because they may be cautionary.

## Repository-wide proven standards

### Change method after two confirmed failures

When the same connector, transfer path, command, workflow, image-edit route, or deployment mechanism fails twice for the same established reason, stop repeating it and choose a materially different route.

Required response:

1. Preserve the exact state already completed.
2. Identify the one remaining gate.
3. State why the current mechanism is invalid.
4. Select a replacement mechanism that preserves source fidelity.
5. Define the new stop condition.
6. Keep the owner informed while the replacement route is executed.

Do not manually rebuild large source files from overlapping fragments when an authenticated checkout, direct file route, verified artifact, or other exact method is available.

### Completion must create space, not punish success

A completed chain should not permanently consume active board capacity unless that obstruction is an intentional, tested mechanic with a recovery path.

The accepted direction moves completed relics into the Hoard Chamber so progression frees space and changes the world.

### Generated text is not interface copy

Text rendered inside generated images may contain spelling errors, inconsistent labels, invented mechanics, or visual artifacts.

Use generated text only to understand placement and hierarchy. Recreate final labels, instructions, counters, and buttons in controlled code or design assets.

## Verified incidents

### HAH-001 — Image generation completed without owner-readable inspection

Status: `proven`

First observed: 2026-07-31

Affected area: art-direction workflow and owner communication

#### Symptoms

A concept-image batch completed and the tool displayed the images, but the blind owner received no immediate description, evaluation, or explanation of what had been created.

#### Cause

The image-generation event was treated as the completion of the art task. The required human-level inspection and translation step was omitted.

#### Failed approaches

- relying on the image tool output to communicate completion;
- assuming the owner could infer the result from tool activity;
- postponing visual judgment until the owner asked what had happened.

#### Proven solution

Every image pass must be followed by:

1. direct inspection;
2. concrete verbal description;
3. judgment of strengths and failures;
4. classification of each result;
5. the next correction or preservation decision.

#### Prevention rule

Silence after image generation is not completion. The owner must receive the equivalent of looking at the work together.

#### Scope

Repository-wide for every visual task.

### HAH-002 — Fresh generation can discard approved visual continuity

Status: `proven`

First observed: 2026-07-31

Affected area: image-generation and production-asset workflow

#### Symptoms

Successive broad prompts risked producing unrelated reinterpretations of creature designs, board details, interface systems, and invented mechanics even after strong elements had already been identified.

The owner explicitly questioned whether each pass was unnecessarily starting over.

#### Cause

Image generation is optimized to synthesize a complete new image unless the task is tightly anchored to approved source material and a specific local correction.

#### Failed approaches

- treating every new requirement as a blank-prompt illustration;
- requesting broad redesigns when only extraction or cleanup was needed;
- allowing generated boards to invent currencies, turn limits, and merge rules;
- failing to preserve a formal asset manifest.

#### Proven solution

The approved references were preserved, transparent asset atlases were composited from the approved designs, and an atlas map was created.

Future work must prefer:

- source-referenced edits;
- cropping;
- masking;
- compositing;
- sprite extraction;
- controlled variations;
- local regeneration only where the source cannot satisfy the requirement.

#### Prevention rule

Do not start from scratch when an approved source contains the required design. Name the source and the exact local correction before generating.

#### Scope

Repository-wide for art direction, UI work, creature design, environment design, and production assets.

### HAH-003 — Generated concept screens invented unauthorized game systems

Status: `proven`

First observed: 2026-07-31

Affected area: board and interface concept art

#### Symptoms

Early concept screens introduced merge-three instructions, a turn limit, currencies, energy-like counters, shop-style plus buttons, and card-economy patterns that had not been approved.

#### Cause

A broad “fantasy game UI” request activated common mobile-game visual conventions.

#### Proven solution

Separate visual authority from mechanical authority.

Concept images may propose composition, material, light, and hierarchy. They may not establish rules, economies, counters, or progression systems.

The accepted design explicitly rejects:

- currency systems;
- monetization language;
- turn limits;
- passive waiting loops;
- automatically accepted merge-three rules.

#### Prevention rule

All mechanics shown in generated art are placeholders unless independently recorded in `docs/PROJECT_DEFINITION.md`.

#### Scope

Repository-wide for visual concepts and prototypes.

### HAH-004 — Long single-line Base64 transport corrupted the playable atlas

Status: `proven`

First observed: 2026-07-31

Affected area: repository asset transport and browser startup

#### Symptoms

The rule suite and static server passed, but Chromium and WebKit both failed before the hollow opened because the committed atlas could not be decoded. The browser reported an invalid image source even though the canonical local WebP was valid.

#### Cause

The GitHub connector transport truncated or altered the very long single-line Base64 value. The canonical source remained valid at 27,118 decoded bytes, 384 by 256 pixels, with SHA-256 `f460c77a7caec6e8d6b92f1cf847a6758128e901797dfc6f81cf2d18dd2a04d8`.

#### Failed approaches

- trusting the existence of the committed text file as proof of byte fidelity;
- loading the unverified single-line value directly as a data URL;
- relying only on manifest metadata without executing a reconstruction test.

#### Proven solution

The canonical Base64 was split into four ordered files of exactly 9,040 characters each. `tests/assetIntegrity.test.js` now concatenates the parts and verifies:

- 36,160 total Base64 characters;
- 27,118 decoded bytes;
- RIFF and WEBP signatures;
- the recorded SHA-256.

`src/atlas.js` performs corresponding runtime validation and creates a Blob URL only after reconstruction succeeds. The corrupted single-file transport was deleted.

Passing evidence: bounded browser smoke run `30683744112`, job `91325784930`.

#### Prevention rule

Never transport a large binary asset as one unverified connector-written line. Use bounded ordered parts or a binary-capable route, and require an executable byte-count and hash gate before browser testing.

#### Scope

Repository-wide for Base64 or other text-encoded binary assets.

### HAH-005 — Nonempty sprite crops can still contain neighboring artwork

Status: `proven`

First observed: 2026-07-31

Affected area: atlas mapping and visual acceptance

#### Symptoms

The first successful browser run proved that every Canvas contained visible pixels, yet screenshot inspection found thin fragments from neighboring atlas regions in the Spawner, Hoard Chamber, and Relic Blossom crops.

#### Cause

A nontransparent-pixel assertion proves that a crop is not blank; it does not prove that the crop contains only the intended object. The original rectangles were deliberately generous and crossed visual boundaries inside the compact atlas.

#### Failed approaches

- treating nonempty Canvas output as sufficient visual acceptance;
- accepting provisional extraction rectangles without screenshot inspection at actual layout scale.

#### Proven solution

The crop rectangles in `atlas-map.json` were tightened against the canonical atlas. Replacement Chromium and mobile WebKit screenshots confirmed:

- no upper-row fragments on the Spawner or Hoard Chamber;
- no adjacent Ogre slice on the Relic Blossom;
- clearer and larger Imp silhouettes at board scale;
- no horizontal overflow or layout regression.

Passing evidence: bounded browser smoke run `30683744112`, job `91325784930`.

#### Prevention rule

Every atlas crop must pass both automated pixel checks and direct visual inspection in its real interface context. Nonempty is necessary; isolated and compositionally clean is the acceptance criterion.

#### Scope

Repository-wide for sprite sheets, atlases, thumbnails, and generated composite assets.

### HAH-006 — Netlify MCP CLI deployment is unavailable in this execution environment

Status: `failed-do-not-repeat`

First observed: 2026-07-31

Affected area: temporary preview deployment

#### Symptoms

Netlify created the isolated zero-cost project `hollow-and-hoard-preview` and supplied an authenticated deployment command. Running that command from the exact tested runtime directory failed before contacting Netlify because the environment’s internal npm mirror returned 404 for `@netlify/mcp`. A materially different attempt against the public npm registry timed out.

#### Cause

The required Netlify MCP package is unavailable through the execution environment’s configured package mirror, and direct access to the public npm registry is blocked or nonresponsive.

#### Failed approaches

- invoking `npx @netlify/mcp` through the internal package mirror;
- overriding npm to use the public registry from this environment.

#### Current safe route

Do not repeat either package route here. Preserve the exact tested runtime artifact and deploy it only from an environment that can obtain the official Netlify MCP or CLI package, or through a future connector action that accepts a local directory or ZIP directly.

The blank isolated Netlify project exists, but no deploy was created and no game was published.

#### Prevention rule

A hosting project and a tested runtime artifact do not constitute a deployment. Do not report a preview URL as live until the hosting service returns a successful deploy record and the URL is smoke-tested.

#### Scope

Current execution environment and this preview deployment route.

## Incident entry template

### HAH-000 — Concise problem name

Status: `investigating`, `proven`, `failed-do-not-repeat`, or `superseded`

First observed: YYYY-MM-DD

Affected area:

#### Symptoms

Describe what the user, test, workflow, or hosted environment actually did.

#### Cause

State the established technical or procedural mechanism. Distinguish evidence from inference.

#### Failed approaches

Record approaches that were attempted and why they failed or should not be repeated.

#### Proven solution

Describe the exact solution that worked, including relevant files, commands, commits, pull requests, assets, or acceptance evidence.

#### Prevention rule

State the reusable rule that should govern future work.

#### Scope

State whether the rule is specific to one component, repository-wide, or a candidate for deliberate use elsewhere.
