# Repository Preflight

Use this checklist before every substantial implementation, repair, asset transfer, workflow, review, publication, deployment, or owner handoff.

## 1. Establish source authority

Record before editing:

- repository: `BlindAnatomist/hollow-and-hoard`;
- active branch;
- immutable starting commit;
- open pull request and its actual base and head;
- requested outcome;
- exact files or behavior in scope;
- accepted behavior that must remain unchanged;
- actions explicitly outside scope;
- exact stop condition.

Read:

1. `AGENTS.md`;
2. `.github/ZERO_DOLLAR_AUTOMATION_POLICY.md`;
3. `docs/implementation-status.md`;
4. `docs/PROJECT_DEFINITION.md`;
5. all relevant entries in `docs/KNOWN_PROBLEMS_AND_PROVEN_SOLUTIONS.md`;
6. every phase, acceptance, art, test, or repair record named by the assignment.

Do not treat a PR description, previous conversation, generated package, local screenshot, or remembered branch state as repository authority.

## 2. Search for the solved mechanism first

Before diagnosing or designing a method:

- search the local register by symptom, mechanism, failed approach, and external service;
- identify whether Val Music Vault or another owner repository already proved the same mechanism;
- begin with the proven route when it applies;
- state why a new route is necessary when departing from it.

A familiar problem must not become a new research project merely because it appears in a different repository.

## 3. Bound the execution envelope

Distinguish:

- source creation or repair;
- asset preparation;
- formatting;
- tests and browser verification;
- transport;
- deployment or publication;
- owner or Cynthia acceptance.

State which environment is required for each part. The size of the source diff does not determine the size of the execution assignment.

Do not assign GitHub Actions, Work, connectors, or the owner tasks that a cheaper capable route can complete reliably.

## 4. Classify transport before moving bytes

Ask:

1. Does the complete trustworthy file already exist?
2. Is the remaining task only to move intact bytes?
3. Or does the file still require transformation, formatting, testing, conflict resolution, or a multi-file atomic commit?

If only transport remains:

- prefer an intact artifact, direct complete-file route, authenticated checkout, or bounded owner-operated file handoff;
- allow no more than two attempts with a connector that truncates, clips, or rejects the file;
- do not reconstruct large files from overlapping fragments;
- do not use PR comments, trigger commits, scheduled workflows, or Actions merely to carry the bytes;
- verify file identity and resulting repository state independently.

If development remains, use a capable environment. Do not disguise development as transport.

## 5. Evaluate a bounded owner handoff

Before spending extended time around a missing connector action, ask whether one exact owner-operated action can close the gate.

A handoff is allowed only when:

- the exact target and action are known;
- safety and acceptance evidence are already established;
- the owner need not search, compare, diagnose, edit, choose a branch, or interpret unfamiliar options;
- the action is VoiceOver-manageable and already authorized;
- no cost, secret, private media, merge, publication, or broader mutation is involved.

Prepare:

- exact address;
- exact control;
- expected confirmation;
- nearby controls not to activate;
- stop condition;
- independent post-action verification.

## 6. Protect the public and zero-dollar boundaries

Before adding a file, service, asset, workflow, or deployment, verify:

- no secret, credential, personal record, private correspondence, or unauthorized media is exposed;
- licensing permits public repository use;
- no paid runner, API, storage, subscription, trial conversion, or service is introduced;
- publication or deployment has separate explicit authorization;
- the operation cannot retrigger itself or alter unrelated external state.

When cost or licensing status is uncertain, stop.

## 7. Preserve Cynthia-first product authority

For game changes, define how the checkpoint will evaluate:

- professional visual sharpness;
- movement and drag satisfaction;
- sound comfort and audibility;
- story comprehension;
- board calmness and environmental life;
- pacing, delight, and desire to continue.

Keep story and how-to-play content separate from the active board when that preserves visual space. Use clean controls, but do not impose a VoiceOver-first interaction model on a game built for Cynthia.

## 8. Format to a fixed point when a formatter exists

When the repository has a pinned formatter:

1. install from the exact lockfile when needed;
2. run the formatter;
3. inspect or hash the diff;
4. repeat until two successive diff hashes match, with a maximum of four passes;
5. stop and isolate the file if convergence does not occur;
6. run the formatter check;
7. inspect for semantic changes;
8. run the complete check suite;
9. commit canonical formatting with the source.

Required sequence:

`format to a fixed point, inspect, then check`

Do not use an acceptance run to discover unformatted files. Do not add a formatter when none is pinned merely to satisfy this checklist.

## 9. Define the verification plan before Actions

Record the minimum evidence required, such as:

- syntax or type checks;
- unit and state-machine tests;
- asset dimension, byte, and hash integrity;
- browser interaction smoke tests;
- desktop and mobile layout screenshots;
- console and page-error checks;
- hosted exact-file verification;
- Cynthia device testing.

Automated checks prove contracts. Cynthia establishes the intended player experience.

## 10. Apply the Actions circuit breaker

Before a workflow run:

- run every available check outside Actions;
- batch all known repairs;
- record exact source commit, commands, expected evidence, and stop condition;
- confirm least-privilege permissions, timeout, concurrency, and no unauthorized external mutation.

After the first failed run:

1. stop workflow activity;
2. inspect the complete failed job and logs;
3. preserve successful evidence;
4. search the HAH register;
5. repair and batch outside Actions;
6. record the diagnosis and replacement method;
7. allow at most one corrective acceptance run.

If the corrective run finds another defect, the circuit is open. Do not create, edit, trigger, schedule, replace, or rerun another workflow on that branch without telling the owner the circuit is open and receiving explicit authorization for one identified additional run.

Rerun only the failed job when possible. Do not repeat successful setup or browser installation.

## 11. Preserve trigger and state distinctions

Do not confuse:

- commit creation;
- branch-ref movement;
- PR metadata refresh;
- workflow eligibility;
- queue entry;
- job start;
- artifact creation;
- deploy ingestion;
- build completion;
- publication.

Require positive failure evidence or an exceeded bounded wait before issuing another trigger. Do not toggle PR state, retarget PR bases, create marker commits, install workflows on unrelated branches, schedule recurring jobs, or force-push branches as exploratory trigger probes.

## 12. Change methods decisively

After two failures with the same mechanism:

1. stop it;
2. preserve completed state;
3. identify the single remaining gate;
4. state why the method is invalid;
5. select a materially different proven route;
6. define its stop condition;
7. tell the owner before the next consequential action.

Changing names, branches, event types, or wrappers around the same failed mechanism is not a materially different route.

## 13. Maintain owner visibility

During multi-step work, report:

- what is complete;
- the active gate;
- the blocker;
- whether the method remains viable;
- the next consequential action.

After two or three tool calls without forward progress, report the lack of progress. A stream interruption does not mean work continued invisibly.

## 14. Close with evidence

Before declaring completion:

- confirm exact final branch and commit;
- inspect every changed file;
- record checks and results;
- identify Actions runs and deployments;
- identify dependencies, services, assets, or costs introduced;
- verify no unrelated branch, PR, workflow, merge, publication, or external state changed;
- state what remains unverified;
- identify the next bounded step and whether owner or Cynthia action is required.
