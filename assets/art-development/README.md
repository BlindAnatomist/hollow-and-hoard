# Art Development Assets

This directory separates visual continuity references from provisional implementation assets.

## `concepts/`

Approved visual references.

The compact art-direction bible establishes world mood, creature lineage, materials, board layout, interface direction, lighting, and color hierarchy.

It is not a direct production sprite. Text rendered inside it is not authoritative game copy.

## `provisional/`

Transparent atlases composited from the approved extracted designs.

They may be used in the first application scaffold for layout, scale testing, drag testing, silhouette comparison, and early animation experiments.

They are not accepted final production art until inspected in the running game and tested by Cynthia.

## Base64 transport

The current GitHub connector does not reliably preserve direct binary blob uploads. The WebP bytes are therefore stored exactly as `.webp.base64` transport files.

A file-capable implementation environment should decode each file into the same path without the `.base64` suffix. Decoding is transport work, not a new art-generation pass.

## Continuity rule

Do not replace these assets with unrelated fresh generations.

When a correction is required, begin with the relevant approved image or atlas region and use editing, masking, cropping, cleanup, compositing, controlled variation, or style-preserving regeneration.

A fresh generation requires a concrete missing need or an explicit rejection of the existing design.

## Provenance

The images were generated specifically for Hollow & Hoard during the project's art-direction sessions and then inspected, selected, refined, extracted, and composited for this repository.

No third-party stock image or copied game asset was introduced.

`ASSET_MANIFEST.json` records byte sizes, SHA-256 hashes, dimensions, and current classification. This is a technical provenance record, not a legal opinion.
