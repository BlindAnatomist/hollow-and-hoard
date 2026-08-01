import test from "node:test";
import assert from "node:assert/strict";
import {
  CELL_COUNT,
  HOLLOWKIN,
  SAVE_SCHEMA_VERSION,
  countPieces,
  createInitialState,
  createStateFromTiers,
  hydrateState,
  resolveDrop,
  summonImps,
  validateState,
} from "../src/gameLogic.js";

function sequenceRng(values) {
  let index = 0;
  return () => values[index++ % values.length];
}

test("starts with a calm five-by-five board containing eight Imps", () => {
  const state = createInitialState();
  assert.equal(state.schemaVersion, SAVE_SCHEMA_VERSION);
  assert.equal(state.board.length, CELL_COUNT);
  assert.equal(countPieces(state.board), 8);
  assert.equal(countPieces(state.board, 0), 8);
  assert.deepEqual(state.discovered, [true, false, false, false, false, false]);
  assert.equal(state.relics, 0);
});

test("relocates a creature to any empty tile without mutating the source state", () => {
  const state = createStateFromTiers([0, null, null]);
  const result = resolveDrop(state, 0, 2);
  assert.equal(result.accepted, true);
  assert.equal(result.kind, "relocate");
  assert.equal(result.state.board[0], null);
  assert.equal(result.state.board[2].tier, 0);
  assert.equal(state.board[0].tier, 0);
  assert.equal(state.board[2], null);
});

test("merges equal creatures anywhere on the board and discovers the next tier", () => {
  const tiers = Array(CELL_COUNT).fill(null);
  tiers[0] = 0;
  tiers[24] = 0;
  const state = createStateFromTiers(tiers);
  const result = resolveDrop(state, 0, 24);
  assert.equal(result.accepted, true);
  assert.equal(result.kind, "merge");
  assert.equal(result.newTier, 1);
  assert.equal(result.state.board[0], null);
  assert.equal(result.state.board[24].tier, 1);
  assert.equal(result.state.discovered[1], true);
});

test("rejects self drops, unequal tiers, empty sources, and outside drops", () => {
  const state = createStateFromTiers([0, 1, null]);
  assert.equal(resolveDrop(state, 0, 0).reason, "same-tile");
  assert.equal(resolveDrop(state, 0, 1).reason, "unequal-tier");
  assert.equal(resolveDrop(state, 2, 1).reason, "empty-source");
  assert.equal(resolveDrop(state, 0, -1).reason, "outside-board");
});

test("two Ogres leave the board and create a permanent Relic Blossom", () => {
  const state = createStateFromTiers([4, 4]);
  const result = resolveDrop(state, 0, 1);
  assert.equal(result.accepted, true);
  assert.equal(result.kind, "relic");
  assert.equal(result.relicCreated, true);
  assert.equal(countPieces(result.state.board), 0);
  assert.equal(result.state.relics, 1);
  assert.equal(result.state.discovered[5], true);
  assert.equal(HOLLOWKIN[5].name, "Relic Blossom");
});

test("the Spawner summons two Imps into empty spaces", () => {
  const state = createStateFromTiers([1]);
  const result = summonImps(state, sequenceRng([0, 0.999]));
  assert.equal(result.accepted, true);
  assert.equal(result.kind, "summon");
  assert.equal(result.summoned, 2);
  assert.equal(result.spawnedIndices.length, 2);
  assert.equal(countPieces(result.state.board, 0), 2);
  assert.equal(countPieces(result.state.board), 3);
});

test("the Spawner uses the last open space and then refuses a full board", () => {
  const almostFull = createStateFromTiers([
    ...Array(CELL_COUNT - 1).fill(0),
    null,
  ]);
  const one = summonImps(almostFull, () => 0);
  assert.equal(one.accepted, true);
  assert.equal(one.summoned, 1);
  assert.equal(countPieces(one.state.board), CELL_COUNT);

  const full = summonImps(one.state, () => 0);
  assert.equal(full.accepted, false);
  assert.equal(full.reason, "board-full");
});

test("save validation rejects malformed or incompatible state", () => {
  const valid = createInitialState();
  assert.equal(validateState(valid), true);
  assert.equal(validateState({ ...valid, schemaVersion: 99 }), false);
  assert.equal(validateState({ ...valid, board: [] }), false);
  assert.equal(validateState({ ...valid, relics: -1 }), false);
  assert.deepEqual(hydrateState({ broken: true }), createInitialState());
});

test("a complete lineage advances through every named creature and creates a relic", () => {
  let state = createStateFromTiers([0, 0]);
  for (let tier = 0; tier < 4; tier += 1) {
    const result = resolveDrop(state, 0, 1);
    assert.equal(result.accepted, true);
    assert.equal(result.newTier, tier + 1);
    state = createStateFromTiers([tier + 1, tier + 1], {
      relics: state.relics,
      actions: state.actions + 1,
    });
  }
  const relic = resolveDrop(state, 0, 1);
  assert.equal(relic.kind, "relic");
  assert.equal(relic.state.relics, 1);
});
