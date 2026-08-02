import assert from "node:assert/strict";
import test from "node:test";
import { formatRelicSummary } from "../src/relicSummary.js";

test("Hoard summary uses correct singular and plural forms", () => {
  assert.equal(formatRelicSummary(0), "0 Relic Blossoms");
  assert.equal(formatRelicSummary(1), "1 Relic Blossom");
  assert.equal(formatRelicSummary(2), "2 Relic Blossoms");
});

test("Hoard summary normalizes invalid and fractional values", () => {
  assert.equal(formatRelicSummary(-4), "0 Relic Blossoms");
  assert.equal(formatRelicSummary(2.9), "2 Relic Blossoms");
  assert.equal(formatRelicSummary("not-a-number"), "0 Relic Blossoms");
});
