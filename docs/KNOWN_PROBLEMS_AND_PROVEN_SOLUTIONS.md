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
