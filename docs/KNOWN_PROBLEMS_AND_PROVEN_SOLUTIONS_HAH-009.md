# HAH-009 — Authority collapse was treated as an invitation to continue recovery

State: `failed-do-not-repeat`

First observed: 2026-08-05

Affected area: Version 2 continuation, source recovery, branch authority, and owner time

Cross-repository foundations:

- Val Music Vault VMV-009, VMV-011, VMV-014, VMV-015, VMV-016, and VMV-017;
- Guitar Eyes GE-011 and GE-015 through GE-022;
- `XR-SOURCE-LINEAGE-001`;
- `XR-HOSTED-CIRCUIT-BREAKER-001`;
- `XR-PERSISTENT-ACCEPTANCE-001`;
- `XR-INTACT-FILE-TRANSPORT-001`.

## Symptoms

The owner asked to continue Hollow & Hoard from the repository. Repository descriptions and status records claimed that Version 2 had been implemented, browser-tested, hosted, and left for Cynthia's device acceptance. Direct inspection then showed that the branch runtime entry point still loaded the older controller.

The owner supplied the requested branch ZIP through the proved iPhone file-transfer route. The first integrity check showed that the six repository transport fragments did not reconstruct the recorded authoritative archive: the result was short, the SHA-256 did not match, and the ZIP structure overlapped.

That result established that the checked-in fragments were not source authority. Instead of stopping recovery and preserving the remaining evening, the assistant continued through:

- workflow history;
- PR-comment chunks;
- Google Drive remnants;
- force-push speculation;
- ZIP byte-range analysis;
- attempted controller-prefix reconstruction;
- comment-endpoint extraction;
- proposed fragment splicing.

No game behavior advanced. The session became increasingly elaborate archaeology of material already proved unreliable.

## Cause

- The first decisive integrity failure was treated as another clue rather than a stop condition.
- Repository status prose, PR descriptions, workflow records, branch snapshots, and runtime source were not ranked by authority before work began.
- Recovery was not given a bounded retry budget, an authority-collapse threshold, or a rebuild comparison.
- The assistant optimized for theoretical recoverability after operational value had disappeared.
- Sunk effort was allowed to justify further effort.
- The already imported HAH-002, VMV-009, and VMV-016 rules were not allowed to terminate the method.
- Guitar Eyes' lineage rule was missing: a branch name, recent record, or passing replacement test is not proof that the branch contains the accepted application source.
- A documentation-only governance commit was made before the application authority question had been resolved.

## Failed-do-not-repeat approaches

- Continue recovering from fragments after the supplied archive fails its recorded identity check.
- Treat several contradictory records as a larger research problem instead of proof that authority has collapsed.
- Search PR comments, workflow logs, deleted-drive remnants, or rendered chat text for byte fragments when the application can be rebuilt more safely.
- Splice a binary archive from independently rendered fragments unless the artifact is unique, irreplaceable, and the owner explicitly authorizes that exceptional recovery.
- Let curiosity about what happened replace the requested product work.
- Move a development branch while the actual application source on that branch remains uncertain.
- Treat a status document, PR description, browser-gate record, or recently modified branch as application authority without verifying runtime entry points, ancestry, and inherited tests.
- Continue a recovery line after the owner states that rebuilding would be faster.

## Mandatory solution

### 1. Define authority before recovery

Before attempting recovery, record:

1. the exact object believed to be authoritative;
2. its repository, branch or immutable commit, path, size, hash, and expected structure;
3. the runtime entry points that must prove the intended implementation is actually served;
4. the accepted base and required ancestry;
5. the inherited tests and behavior contracts that must still exist;
6. the maximum number of attempts;
7. the condition that ends recovery and selects reconstruction instead.

Documentation describes authority. It does not create it.

### 2. Use the recovery circuit breaker

- The first integrity failure stops transfer and triggers diagnosis.
- One materially different intact-source route may be attempted when there is positive evidence that it contains the complete authoritative object.
- A second independent contradiction, another identity failure, or proof that the remaining sources are known-corrupt closes the recovery circuit.
- Once closed, do not continue fragment extraction, comment archaeology, workflow archaeology, byte splicing, or trigger experiments.

Changing endpoints, storage locations, comment IDs, wrappers, or extraction scripts around the same damaged source is not a materially different authority route.

### 3. Compare recovery with reconstruction

Before any exceptional recovery, compare:

- uniqueness and replaceability of the missing work;
- expected recovery effort;
- expected clean-rebuild effort;
- integrity risk;
- testability;
- owner time;
- repository contamination risk.

When reconstruction is cheaper, safer, or more verifiable, reconstruction wins immediately. When the owner directs reconstruction, the recovery line stops immediately.

### 4. Preserve evidence without preserving the failed method

Keep damaged branches, failed hashes, and contradictory records as evidence. Do not delete them, but do not resume product work from them.

Future work must begin on a new branch from a proven accepted base. It must preserve lawful assets and accepted behavior deliberately, not inherit uncertain application source merely because it is newer.

### 5. Do not write before authority is established

No application, governance, workflow, branch, PR, deployment, or publication write is permitted during an authority investigation unless that exact write is the bounded diagnostic assignment. Inspection comes first. The branch moves only after the source boundary and resulting diff are known.

## Evidence

- Branch inspected: `version-2-cynthia-feedback`.
- Pre-investigation head: `ef427ca8093766cabbafe555fa022596e5618641`.
- Governance-only head created during the session: `9f7d1f3576095f0a48e410f67b71744a5418afe6`.
- The supplied branch ZIP contained all six checked-in transport fragments.
- Reconstructed fragment archive was 3,000 bytes short of the recorded package and did not match recorded SHA-256 `39d5543a14802c8d7adb20f9870cded5ce4c84071acd405f32507d21c51f69dc`.
- The reconstructed archive's SHA-256 was `2dcec8…`; it was rejected and never imported.
- Repository and workflow evidence already recorded those transport fragments as failed or superseded.
- No Version 2 game implementation was recovered or advanced during the session.
- One obsolete workflow reacted automatically to the governance branch update and failed without changing repository contents; it was not rerun.

## Acceptance boundary

This record governs method selection immediately. It does not establish a recovered Version 2 implementation, authorize a rebuild, authorize another workflow, or authorize publication, deployment, merge, PR closure, asset generation, or Cynthia testing.

## Prevention rule

When source authority collapses, stop recovery before technical curiosity becomes the project. Preserve the evidence, choose the cheaper verifiable path, and do not spend the owner's time proving that broken material remains broken.

---

# Cross-repository execution governance reconciliation

Date: 2026-08-05

Status: mandatory governance import; game execution remains stopped

## Sources reviewed

The current governing records were inspected directly from:

- `BlindAnatomist/val-music-vault` `AGENTS.md`;
- VMV-009;
- VMV-013;
- VMV-014;
- VMV-015;
- VMV-016;
- VMV-017;
- `BlindAnatomist/guitar-eyes` `AGENTS.md` on `work/powertab-pt2-v11-clean-convergence`;
- Guitar Eyes `BRANCH_AUTHORITY.md`;
- Guitar Eyes canonical known-problems register;
- Guitar Eyes execution-gate addendum;
- Guitar Eyes cross-repository execution-governance reconciliation dated 2026-08-05.

## Deliberately transferred rules

1. Confirmed connector truncation is a method constraint. Permit no more than two attempts with one mechanism.
2. Move intact objects intact. Fragment reconstruction is exceptional, not normal transport.
3. Use the simplest safe route for transport and a capable environment for transformation and proof.
4. A precise owner-operated dashboard or file action is valid when it is already authorized, exactly targeted, VoiceOver-manageable, and independently verified.
5. GitHub Actions is an acceptance checkpoint, not a development laboratory, trigger laboratory, byte mover, or serial environment-discovery service.
6. After one failed hosted run, diagnose and batch outside Actions. At most one corrective run is permitted. A second defect opens the circuit.
7. Acceptance must fail forward. Preserve valid lasting source and evidence, remove only temporary machinery, and repair later failures directly.
8. Format to a fixed point, inspect the stable diff, then check when a pinned formatter exists. Do not invent a formatter when none exists.
9. Authority is relational. Compare a candidate to the exact accepted base; do not enforce an imagined clean repository shape.
10. Branch names, recency, status prose, PR descriptions, and green replacement tests do not prove source lineage.
11. Preserve inherited tests and accepted contracts. A thinner green suite is not regression evidence.
12. Verification gates must fail diagnostically and report expected-versus-actual values. Classify only the step that actually ran.
13. The owner is not an execution environment. Bring him in only for one exact physical dashboard or file action and for the judgment that only he or Cynthia can provide.
14. A repository learns only when recorded failures change what the next worker is allowed to do.

## Current stop state

This governance reconciliation authorizes only documentation changes. It does not authorize:

- Version 2 recovery;
- a clean rebuild;
- another Actions run;
- workflow creation or repair;
- application-source changes;
- asset changes;
- branch force-push;
- PR state or base changes;
- merge;
- deployment or publication;
- Cynthia testing.

The next game assignment must begin from these updated rules and choose a new bounded product path before any implementation action.