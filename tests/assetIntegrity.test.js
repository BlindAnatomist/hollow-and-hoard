import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

const PART_PATHS = [
  "assets/art-development/provisional/first-playable-atlas.webp.base64.part-01",
  "assets/art-development/provisional/first-playable-atlas.webp.base64.part-02",
  "assets/art-development/provisional/first-playable-atlas.webp.base64.part-03",
  "assets/art-development/provisional/first-playable-atlas.webp.base64.part-04",
];

const EXPECTED_BASE64_CHARACTERS = 36_160;
const EXPECTED_DECODED_BYTES = 27_118;
const EXPECTED_SHA256 = "f460c77a7caec6e8d6b92f1cf847a6758128e901797dfc6f81cf2d18dd2a04d8";

function normalizeBase64(value) {
  return value.replace(/\s+/g, "");
}

test("canonical first-playable atlas transport reconstructs the recorded WebP", async () => {
  const parts = await Promise.all(PART_PATHS.map((path) => readFile(path, "utf8")));
  parts.forEach((part, index) => {
    assert.equal(normalizeBase64(part).length, 9_040, `Atlas part ${index + 1} must contain 9,040 Base64 characters`);
    assert.match(normalizeBase64(part), /^[A-Za-z0-9+/=]+$/, `Atlas part ${index + 1} contains a non-Base64 character`);
  });

  const base64 = normalizeBase64(parts.join(""));
  assert.equal(base64.length, EXPECTED_BASE64_CHARACTERS);

  const decoded = Buffer.from(base64, "base64");
  assert.equal(decoded.length, EXPECTED_DECODED_BYTES);
  assert.equal(decoded.subarray(0, 4).toString("ascii"), "RIFF");
  assert.equal(decoded.subarray(8, 12).toString("ascii"), "WEBP");
  assert.equal(createHash("sha256").update(decoded).digest("hex"), EXPECTED_SHA256);
});
