# Repository Instructions

This file governs all agent work in `BlindAnatomist/hollow-and-hoard`.

## 1. Authoritative reconstruction is mandatory

Before changing this repository:

1. Confirm the exact repository, active branch, immutable starting commit, open pull request, and assignment boundary.
2. Read `.github/ZERO_DOLLAR_AUTOMATION_POLICY.md`.
3. Read `docs/PREFLIGHT.md`.
4. Read `docs/implementation-status.md`.
5. Read `docs/PROJECT_DEFINITION.md`.
6. Read every relevant entry in `docs/KNOWN_PROBLEMS_AND_PROVEN_SOLUTIONS.md`.
7. Inspect the current files and recent repository evidence instead of relying on conversation history, an earlier screenshot, a PR description, or remembered branch state.
8. Preserve behavior and assets already recorded as accepted unless the assignment explicitly changes them.

A problem that has already been solved in Val Music Vault or another owner repository must not be treated as novel merely because it appears in Hollow & Hoard. Search the local register first; when the local register identifies a cross-repository source, inspect that source before choosing a method.

## 2. Product authority is Cynthia-first

Hollow & Hoard is a game for Cynthia.

Primary acceptance authority belongs to:

- visual beauty and professional production quality;
- satisfying touch movement and dragging;
- sound comfort and audibility;
- understandable story and progression;
- pacing, delight, and desire to continue playing.

VoiceOver-specific operation is not a first-playable design authority for this project. Preserve ordinary semantic HTML, accurate control names, keyboard operability where practical, reduced-motion support, and basic accessibility hygiene, but do not redesign the game around the owner's nonvisual use unless a later assignment explicitly changes the audience.

Do not claim Cynthia-facing qualities are accepted until Cynthia has tested the exact build.

## 3. Public-repository and project-separation boundary

This is a public repository. Never commit secrets, credentials, tokens, private correspondence, personal identifying information, private media, or assets lacking authorization for public redistribution.

Hollow & Hoard is independent from Moticos for Cynthia, Val Music Vault, and every other repository. Transfer proven mechanisms and operating standards deliberately; do not copy project-specific code, artwork, audio, terminology, data, or history merely because another project is similar.

## 4. Zero-dollar authority

The zero-dollar policy is binding.

- Do not create or activate paid runners, services, APIs, storage, assets, subscriptions, trials that convert to payment, or infrastructure capable of incurring cost.
- Standard GitHub-hosted runners may be used only when confirmed zero-dollar for this public repository and materially necessary for a bounded checkpoint.
- Do not dispatch Actions merely to discover the implementation, move bytes, test trigger theories, or expose one failure at a time.
- Do not deploy or publish through any external service without explicit authorization, even when a free tier exists.
- When cost status is uncertain, stop before activation.

Free runner minutes do not make repeated runs free in the operational sense. Owner time, repository noise, repeated diagnosis, and lost project momentum are costs.

## 5. Bound the assignment before editing

State before consequential work:

- the requested outcome;
- the exact source and file boundary;
- the accepted state that must remain unchanged;
- what is outside scope;
- the minimum proof required;
- whether workflow dispatch, deployment, publication, merge, dependency changes, asset generation, or external-state mutation is authorized;
- the exact stop condition.

Do not broaden a repair into redesign, cleanup, a new phase, or infrastructure work. Authorization to finish a feature is not blanket authorization for unlimited Actions runs, branch rewrites, deployments, merges, or owner dashboard work.

## 6. Development and transport are different problems

Before moving a large file or artifact, classify the remaining work:

1. Is the file still being created, repaired, formatted, tested, or built?
2. Or is a complete trustworthy file already available and only the intact bytes must be transported?

Use a capable development environment for transformation and proof. Use the simplest safe intact route for transport.

When a connector truncates, clips, rejects, or cannot carry a complete artifact:

- permit no more than two attempts with that exact mechanism;
- stop fragment reconstruction after the second confirmed failure;
- do not create overlapping comment chunks, text relays, trigger commits, scheduled workflows, or Git trees merely to keep the same failed transport alive;
- prefer an existing verified artifact, direct complete-file download or upload, an authenticated checkout, or one explicitly bounded capable environment;
- do not use GitHub Actions merely to move an intact file;
- never manually reconstruct a large file from overlapping fragments when an intact route exists.

The governing rule is:

`Use the simplest safe route for transport; use a capable environment for transformation and proof.`

## 7. Intact owner-operated file handoff

A bounded owner-operated file handoff may be used when all of the following are true:

- the exact complete file already exists;
- the source repository, branch or immutable commit, path, file name, expected identity, and destination are known;
- assistant connectors cannot transport the intact bytes reliably;
- the operation is one deterministic download, attachment, upload, or replacement;
- the owner is not asked to edit, compare, diagnose, choose a branch, resolve conflicts, inspect hashes, or explore GitHub;
- no secret, private media, paid action, merge, deployment, publication, or production mutation is involved.

The assistant must provide the exact address, exact control, expected file name, expected identity when available, prohibited alternatives, commit message when applicable, and stop condition. Afterward, independently verify the resulting commit, branch, path, blob or hash, full contents or exact diff, and absence of unrelated changes.

A successful file handoff is transport evidence only. It does not prove formatting, lint, tests, accessibility, build, packaging, or runtime behavior.

## 8. Bounded owner-operated dashboard action

The assistant remains responsible for dashboard work whenever a connector, API, CLI, or authenticated environment can perform the exact action reliably.

Do not transfer a limitation to the owner before checking those routes. Conversely, do not spend extended time performing autonomy theater when one exact, already-authorized, VoiceOver-manageable control can close the remaining gate safely.

A bounded handoff is allowed only when:

- the exact target object and action are known;
- identity, source, state, acceptance evidence, and safety boundaries have already been verified;
- assistant tools cannot perform the same operation or would create a materially different result;
- the owner need not search, compare, diagnose, or interpret unfamiliar choices.

Provide the exact page address, exact control name, expected confirmation, controls not to activate, and precise stop condition. Immediately verify the result independently afterward.

## 9. GitHub Actions circuit breaker

GitHub Actions is an acceptance checkpoint, not a development environment, byte-transfer service, branch-control mechanism, or trigger laboratory.

Before creating, editing, triggering, rerunning, or relying on any workflow, re-read:

- this file;
- `.github/ZERO_DOLLAR_AUTOMATION_POLICY.md`;
- `docs/PREFLIGHT.md`;
- the relevant HAH incident records;
- the governing phase or repair record.

Before the first run:

1. Run every available check in the active working environment.
2. Batch all known source, formatting, test, packaging, and workflow repairs.
3. Record the exact source commit, commands, expected evidence, and stop condition.
4. Confirm the workflow cannot merge, deploy, publish, mutate backend state, expose private material, or retrigger itself unless separately authorized.

After the first failed run:

1. Stop all workflow activity.
2. Inspect the complete failed job and logs.
3. Preserve every successful step as evidence.
4. Search the known-problems register for the matching mechanism.
5. Diagnose and batch all known repairs outside Actions.
6. Record the diagnosis, replacement method, and exact stop condition.
7. Permit at most one corrective acceptance run.

If the corrective run fails because of another application, test, packaging, formatting, transport, or workflow defect, the circuit is open:

- do not trigger, rerun, replace, or create another workflow on that branch;
- move the work to a capable local or authenticated environment, use an intact-file route when the problem is only transport, or defer the checkpoint;
- an additional run requires the owner to be told that the circuit is open and to authorize that one identified run explicitly.

Rerun only the failed job when possible. Never repeat successful installation, tests, browser engines, packaging, or deployment merely to rediscover a classified failure.

## 10. Formatting preflight

When the repository has a pinned formatter, formatting is preparation, not acceptance.

Use this sequence before a quality run:

1. Install from the exact lockfile when dependencies are needed.
2. Run the repository-pinned formatter.
3. Inspect or hash the working-tree diff.
4. Repeat until two successive diff hashes are identical, with a hard maximum of four passes.
5. Stop and isolate the responsible file or construct if the formatter does not converge within four passes.
6. Run the formatter's check command on the stable tree.
7. Inspect the diff for semantic changes.
8. Run the complete check suite.
9. Commit source and canonical formatting together.

The required phrase is:

`format to a fixed point, inspect, then check`

Do not spend an Actions run discovering that formatting was never performed. A successful deployment build does not prove repository formatting.

If this repository has no pinned formatter, do not invent one merely to satisfy this section.

## 11. Trigger, queue, and metadata discipline

Preserve the distinction between:

- a commit being created;
- a branch ref moving;
- a pull request snapshot refreshing;
- a workflow event being eligible;
- a job entering the queue;
- a job starting;
- an artifact being produced;
- a deploy being ingested, built, and published.

Do not classify unchanged or stale PR metadata, a briefly unchanged deploy record, or the absence of an immediately visible workflow run as proof of failure. Require positive failure evidence or an exceeded bounded wait window before creating a new trigger.

Do not toggle PR state, change PR bases, create marker commits, install workflows on unrelated branches, schedule recurring jobs, or force-push branches merely to probe trigger behavior unless that exact diagnostic is the bounded authorized assignment.

## 12. Interface speech and explanatory-content separation

Even though VoiceOver is not the primary design authority, controls must remain clean and comprehensible.

- Control names identify actions.
- Status regions report transitions.
- Story, instructions, and technical explanation remain separate content.
- Do not attach paragraphs of explanation to action buttons through `aria-describedby`.
- Do not crowd the game board with narrative text that belongs on an introductory, Codex, or Hoard screen.
- Omit absent optional information rather than creating repeated placeholder stops.
- Collapse technical or diagnostic detail outside the ordinary play path.

For Hollow & Hoard specifically, the introductory story and how-to-play material belongs on its own screen so the board remains visually calm.

## 13. Owner visibility

During multi-step work, report the completed state, active gate, blocker, whether the present method remains viable, and the next consequential action.

After two tool calls without progress, or immediately when a mechanism proves invalid, say so plainly. Silence must not conceal repetition, speculative trigger experiments, or a stalled method.

The app message `streaming interrupted` does not mean work continued in the background. Never imply hidden continuation.

## 14. Completion record

At the end of every repository assignment, report:

- exact branch and final commit;
- files changed;
- checks and evidence;
- Actions runs or deployments, if any;
- dependencies, assets, services, or costs introduced;
- accepted behavior intentionally preserved;
- anything unverified;
- the next bounded step;
- whether owner or Cynthia action is required.

Never claim completion from a PR description, planned workflow, local package, or generated image alone. Verify the repository state and the exact accepted artifact.

## Provenance

This governance rewrite deliberately imports and adapts proven operational lessons from Val Music Vault records VMV-009, VMV-011, VMV-012, VMV-013, VMV-014, VMV-015, and VMV-016. Hollow & Hoard's local incident details and receiving-repository boundaries are recorded in `docs/KNOWN_PROBLEMS_AND_PROVEN_SOLUTIONS.md`.