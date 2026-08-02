# Repository Preflight

Use this checklist before every substantial implementation, repair, art pass, review, workflow, publication, or deployment assignment.

## 1. Establish authority

- Confirm the repository is `BlindAnatomist/hollow-and-hoard`.
- Record the active branch and exact starting commit.
- Identify any open pull request governing the work.
- Read `AGENTS.md`.
- Read `.github/ZERO_DOLLAR_AUTOMATION_POLICY.md`.
- Read `docs/implementation-status.md`.
- Read `docs/PROJECT_DEFINITION.md`.
- Read `docs/VISUAL_DIRECTION.md`.
- Read relevant entries in `docs/KNOWN_PROBLEMS_AND_PROVEN_SOLUTIONS.md`.
- Read any phase, acceptance, repair, design, asset, or testing record named by the assignment.

## 2. Bound the assignment

State before editing:

- the requested outcome;
- the files, assets, or behavior likely to change;
- what is explicitly outside scope;
- which accepted behavior and visual decisions must remain unchanged;
- whether merge, publication, deployment, workflow dispatch, dependency addition, asset generation, or external-state changes are authorized;
- the exact stop condition.

Do not infer permission for a consequential action from permission to implement, generate, or test.

## 3. Preserve project separation

Before transferring anything from Moticos for Cynthia or another repository, identify whether it is:

- a general lesson or standard that may be restated;
- a reusable technical mechanism that requires explicit review;
- project-specific code, artwork, audio, naming, content, or history that must remain separate.

Do not copy code or assets merely because both projects are merge games.

## 4. Inspect before changing

- Examine the current implementation rather than assuming its structure.
- Check recent commits and pull-request changes relevant to the assignment.
- Reproduce or verify the reported problem when practical.
- Search the proven-solutions register for the same mechanism, not merely the same visible symptom.
- Identify tests that already protect the behavior.
- Verify whether the Claude prototype is being used only as concept evidence or has been explicitly accepted as implementation input.

## 5. Preserve visual continuity

Before any image generation or editing:

- inspect the approved references in `docs/VISUAL_DIRECTION.md`;
- inspect `assets/art-development/ASSET_MANIFEST.json` when present;
- name the source image or asset being preserved;
- state the specific correction, extraction, extension, or new requirement;
- prefer an edit or extraction over a fresh generation;
- avoid changing unrelated approved features;
- verify that final game copy will not depend on text baked into generated imagery.

After the pass:

- inspect every result directly;
- describe it concretely to the blind owner;
- record what is approved, rejected, or still provisional;
- preserve successful results for the next pass instead of regenerating them unnecessarily.

## 6. Protect the public boundary

Before adding any content, verify that it contains no:

- secret, password, token, private key, or credential;
- private email, address, telephone number, account information, or personal record;
- copyrighted or private asset lacking authorization for public release;
- development fixture derived from private source material;
- configuration that exposes a protected service;
- material whose license or redistribution status is uncertain.

When uncertain, do not commit the material.

## 7. Confirm zero-dollar status

Before adding automation, a dependency, an external service, an asset source, or hosting:

- confirm that the mechanism is zero-dollar for the intended use;
- confirm that it will not convert into a paid plan or consume a paid allowance;
- confirm that no billing information or paid account is required;
- verify licensing and redistribution terms;
- verify that publication or deployment is separately authorized;
- record the result in the completion report.

When cost status is uncertain, stop before activation.

## 8. Choose the verification plan

Record the minimum evidence required for completion, as applicable:

- type checking;
- linting;
- unit or integration tests;
- production build;
- interaction and state-machine tests;
- touch and drag testing;
- visual inspection at actual game-piece size;
- silhouette and contrast review;
- transparent-background and crop verification;
- sound-level and sound-character review;
- hosted preview verification;
- Cynthia's play testing and subjective acceptance.

Automated checks do not substitute for Cynthia's judgment about beauty, movement, sound comfort, delight, or pacing.

## 9. Use automation deliberately

When a zero-dollar GitHub Actions workflow is useful:

- inspect and verify locally or through the active environment first when practical;
- avoid duplicate workflows and unnecessary reruns;
- inspect failed logs before rerunning;
- use least-privilege permissions, realistic timeouts, and concurrency cancellation;
- do not select paid runners or paid services;
- do not let a workflow merge, publish, deploy, release, or alter external state unless that behavior is separately authorized and documented.

No workflow should be created before the stack and exact check commands are established.

## 10. Change methods when the method is the failure

After two failures with the same mechanism for the same confirmed reason:

1. stop that mechanism;
2. state what is already complete;
3. identify the remaining gate;
4. explain why the method failed;
5. choose a materially different route;
6. define the new stop condition.

Do not reconstruct large files manually from overlapping fragments when a safer exact route exists.

## 11. Maintain owner visibility

During multi-step work, report:

- the current completed state;
- the active gate;
- any blocker;
- whether the present method remains viable;
- the next consequential action before taking it.

For visual work, silence after generation is not acceptable. The owner must receive an inspected verbal account of the result.

## 12. Close with evidence

Before declaring completion:

- confirm the final branch and commit;
- inspect the final changed files and assets;
- record every verification result;
- identify any Actions run or deployment performed;
- identify dependencies, services, or assets added;
- state whether any cost was introduced;
- state what remains unverified;
- identify the next bounded step;
- state whether the owner or Cynthia is needed for testing or authorization.
