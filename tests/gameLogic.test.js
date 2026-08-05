import assert from "node:assert/strict";
import test from "node:test";
import {
  CELL_COUNT,
  FAMILIES,
  createInitialState,
  createStateFromPieces,
  hydrateState,
  resolveDrop,
  summonFamily,
  validateState,
} from "../src/gameLogic.js";

test("clean Version 2 starts with four creatures from each family", () => {
  const state = createInitialState();
  assert.equal(state.board.length, CELL_COUNT);
  assert.equal(state.board.filter((piece) => piece?.family === "goblin").length, 4);
  assert.equal(state.board.filter((piece) => piece?.family === "gargoyle").length, 4);
  assert.equal(validateState(state), true);
});

test("creature can relocate to an empty stone", () => {
  const state = createStateFromPieces([{ index: 0, family: "goblin", tier: 0 }]);
  const result = resolveDrop(state, 0, 1);
  assert.equal(result.accepted, true);
  assert.equal(result.kind, "relocate");
  assert.deepEqual(result.state.board[1], { family: "goblin", tier: 0 });
  assert.equal(result.state.board[0], null);
});

test("matching goblins merge", () => {
  const state = createStateFromPieces([
    { index: 0, family: "goblin", tier: 0 },
    { index: 1, family: "goblin", tier: 0 },
  ]);
  const result = resolveDrop(state, 0, 1);
  assert.equal(result.kind, "merge");
  assert.deepEqual(result.state.board[1], { family: "goblin", tier: 1 });
});

test("matching gargoyles merge", () => {
  const state = createStateFromPieces([
    { index: 0, family: "gargoyle", tier: 1 },
    { index: 1, family: "gargoyle", tier: 1 },
  ]);
  const result = resolveDrop(state, 0, 1);
  assert.equal(result.kind, "merge");
  assert.deepEqual(result.state.board[1], { family: "gargoyle", tier: 2 });
});

test("mixed families reject gently", () => {
  const state = createStateFromPieces([
    { index: 0, family: "goblin", tier: 0 },
    { index: 1, family: "gargoyle", tier: 0 },
  ]);
  const result = resolveDrop(state, 0, 1);
  assert.equal(result.accepted, false);
  assert.equal(result.reason, "mixed-family");
  assert.equal(result.state, state);
});

test("unequal tiers reject", () => {
  const state = createStateFromPieces([
    { index: 0, family: "goblin", tier: 0 },
    { index: 1, family: "goblin", tier: 1 },
  ]);
  const result = resolveDrop(state, 0, 1);
  assert.equal(result.accepted, false);
  assert.equal(result.reason, "unequal-tier");
});

test("two Ogres become a Relic Blossom and free both spaces", () => {
  const tier = FAMILIES.goblin.tiers.length - 1;
  const state = createStateFromPieces([
    { index: 0, family: "goblin", tier },
    { index: 1, family: "goblin", tier },
  ]);
  const result = resolveDrop(state, 0, 1);
  assert.equal(result.kind, "relic");
  assert.equal(result.state.relics.goblin, 1);
  assert.equal(result.state.board[0], null);
  assert.equal(result.state.board[1], null);
});

test("two Elder Gargoyles become a Moonlit Relic", () => {
  const tier = FAMILIES.gargoyle.tiers.length - 1;
  const state = createStateFromPieces([
    { index: 0, family: "gargoyle", tier },
    { index: 1, family: "gargoyle", tier },
  ]);
  const result = resolveDrop(state, 0, 1);
  assert.equal(result.kind, "relic");
  assert.equal(result.state.relics.gargoyle, 1);
});

test("Goblin Spawner creates only Imps", () => {
  const state = createStateFromPieces([]);
  const result = summonFamily(state, "goblin", () => 0, 2);
  assert.equal(result.summoned, 2);
  assert.equal(result.state.board.filter(Boolean).every((piece) => piece.family === "goblin" && piece.tier === 0), true);
});

test("Moonstone Nest creates only Mosscaps", () => {
  const state = createStateFromPieces([]);
  const result = summonFamily(state, "gargoyle", () => 0, 2);
  assert.equal(result.summoned, 2);
  assert.equal(result.state.board.filter(Boolean).every((piece) => piece.family === "gargoyle" && piece.tier === 0), true);
});

test("spawning respects available board space", () => {
  const pieces = Array.from({ length: 24 }, (_, index) => ({ index, family: "goblin", tier: 0 }));
  const state = createStateFromPieces(pieces);
  const result = summonFamily(state, "gargoyle", () => 0, 2);
  assert.equal(result.summoned, 1);
});

test("Version 1 save migrates goblins and adds four Gargoyle starters", () => {
  const legacy = {
    schemaVersion: 1,
    board: Array.from({ length: 25 }, (_, index) => (index === 0 ? { tier: 2 } : null)),
    discovered: [true, true, true, false, false, false],
    relics: 2,
    actions: 8,
  };
  const state = hydrateState(legacy);
  assert.deepEqual(state.board[0], { family: "goblin", tier: 2 });
  assert.equal(state.board.filter((piece) => piece?.family === "gargoyle").length, 4);
  assert.equal(state.relics.goblin, 2);
  assert.equal(state.introSeen, false);
});

test("invalid state hydrates to the clean opening", () => {
  const state = hydrateState({ schemaVersion: 2, board: [] });
  assert.equal(validateState(state), true);
  assert.equal(state.board.filter(Boolean).length, 8);
});
