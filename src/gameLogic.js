export const SAVE_SCHEMA_VERSION = 1;
export const BOARD_SIZE = 5;
export const CELL_COUNT = BOARD_SIZE * BOARD_SIZE;
export const MAX_CREATURE_TIER = 4;
export const RELIC_TIER = 5;

export const HOLLOWKIN = Object.freeze([
  Object.freeze({ id: "imp", name: "Imp" }),
  Object.freeze({ id: "goblin", name: "Goblin" }),
  Object.freeze({ id: "hobgoblin", name: "Hobgoblin" }),
  Object.freeze({ id: "troll", name: "Troll" }),
  Object.freeze({ id: "ogre", name: "Ogre" }),
  Object.freeze({ id: "relicBlossom", name: "Relic Blossom" }),
]);

const STARTING_IMP_INDICES = Object.freeze([2, 6, 8, 11, 13, 16, 18, 22]);

export function emptyBoard() {
  return Array(CELL_COUNT).fill(null);
}

export function createPiece(tier) {
  if (!Number.isInteger(tier) || tier < 0 || tier > MAX_CREATURE_TIER) {
    throw new RangeError(`Invalid creature tier: ${tier}`);
  }
  return Object.freeze({ tier });
}

export function cloneState(state) {
  return {
    schemaVersion: SAVE_SCHEMA_VERSION,
    board: state.board.map((piece) => (piece ? { tier: piece.tier } : null)),
    discovered: state.discovered.slice(),
    relics: state.relics,
    actions: state.actions,
  };
}

export function createInitialState() {
  const board = emptyBoard();
  STARTING_IMP_INDICES.forEach((index) => {
    board[index] = { tier: 0 };
  });

  return {
    schemaVersion: SAVE_SCHEMA_VERSION,
    board,
    discovered: [true, false, false, false, false, false],
    relics: 0,
    actions: 0,
  };
}

export function createStateFromTiers(tiers, options = {}) {
  if (!Array.isArray(tiers) || tiers.length > CELL_COUNT) {
    throw new TypeError("tiers must be an array no longer than the board");
  }

  const board = emptyBoard();
  tiers.forEach((tier, index) => {
    if (tier === null || tier === undefined) return;
    board[index] = { tier };
  });

  const discovered = Array(HOLLOWKIN.length).fill(false);
  board.forEach((piece) => {
    if (piece) discovered[piece.tier] = true;
  });
  if ((options.relics ?? 0) > 0) discovered[RELIC_TIER] = true;

  return {
    schemaVersion: SAVE_SCHEMA_VERSION,
    board,
    discovered,
    relics: options.relics ?? 0,
    actions: options.actions ?? 0,
  };
}

export function isBoardIndex(index) {
  return Number.isInteger(index) && index >= 0 && index < CELL_COUNT;
}

export function emptyIndices(board) {
  const result = [];
  board.forEach((piece, index) => {
    if (piece === null) result.push(index);
  });
  return result;
}

export function countPieces(board, tier = null) {
  return board.reduce((count, piece) => {
    if (!piece) return count;
    if (tier !== null && piece.tier !== tier) return count;
    return count + 1;
  }, 0);
}

function acceptedResult(kind, state, details = {}) {
  return {
    accepted: true,
    kind,
    state,
    reason: null,
    ...details,
  };
}

function rejectedResult(reason, state, details = {}) {
  return {
    accepted: false,
    kind: "rejected",
    state,
    reason,
    ...details,
  };
}

export function resolveDrop(state, fromIndex, toIndex) {
  if (!isBoardIndex(fromIndex) || !isBoardIndex(toIndex)) {
    return rejectedResult("outside-board", state, { fromIndex, toIndex });
  }
  if (fromIndex === toIndex) {
    return rejectedResult("same-tile", state, { fromIndex, toIndex });
  }

  const source = state.board[fromIndex];
  const target = state.board[toIndex];
  if (!source) {
    return rejectedResult("empty-source", state, { fromIndex, toIndex });
  }

  const next = cloneState(state);

  if (!target) {
    next.board[toIndex] = { tier: source.tier };
    next.board[fromIndex] = null;
    next.actions += 1;
    return acceptedResult("relocate", next, {
      fromIndex,
      toIndex,
      tier: source.tier,
      relicCreated: false,
    });
  }

  if (target.tier !== source.tier) {
    return rejectedResult("unequal-tier", state, {
      fromIndex,
      toIndex,
      sourceTier: source.tier,
      targetTier: target.tier,
    });
  }

  next.board[fromIndex] = null;
  next.actions += 1;

  if (source.tier === MAX_CREATURE_TIER) {
    next.board[toIndex] = null;
    next.relics += 1;
    next.discovered[RELIC_TIER] = true;
    return acceptedResult("relic", next, {
      fromIndex,
      toIndex,
      tier: source.tier,
      newTier: RELIC_TIER,
      relicCreated: true,
    });
  }

  const newTier = source.tier + 1;
  next.board[toIndex] = { tier: newTier };
  next.discovered[newTier] = true;

  return acceptedResult("merge", next, {
    fromIndex,
    toIndex,
    tier: source.tier,
    newTier,
    relicCreated: false,
  });
}

function chooseRandomEmpty(empty, rng) {
  const choice = Math.floor(rng() * empty.length);
  return empty.splice(Math.max(0, Math.min(choice, empty.length - 1)), 1)[0];
}

export function summonImps(state, rng = Math.random, requested = 2) {
  const available = emptyIndices(state.board);
  const count = Math.min(Math.max(0, requested), available.length);
  if (count === 0) {
    return rejectedResult("board-full", state, { spawnedIndices: [] });
  }

  const next = cloneState(state);
  const spawnedIndices = [];
  for (let index = 0; index < count; index += 1) {
    const destination = chooseRandomEmpty(available, rng);
    next.board[destination] = { tier: 0 };
    spawnedIndices.push(destination);
  }
  next.discovered[0] = true;
  next.actions += 1;

  return acceptedResult("summon", next, {
    spawnedIndices,
    requested,
    summoned: spawnedIndices.length,
    relicCreated: false,
  });
}

export function validateState(candidate) {
  if (!candidate || typeof candidate !== "object") return false;
  if (candidate.schemaVersion !== SAVE_SCHEMA_VERSION) return false;
  if (!Array.isArray(candidate.board) || candidate.board.length !== CELL_COUNT) return false;
  if (!Array.isArray(candidate.discovered) || candidate.discovered.length !== HOLLOWKIN.length) {
    return false;
  }
  if (!Number.isInteger(candidate.relics) || candidate.relics < 0) return false;
  if (!Number.isInteger(candidate.actions) || candidate.actions < 0) return false;

  const validBoard = candidate.board.every((piece) => {
    if (piece === null) return true;
    return (
      piece &&
      typeof piece === "object" &&
      Number.isInteger(piece.tier) &&
      piece.tier >= 0 &&
      piece.tier <= MAX_CREATURE_TIER
    );
  });
  if (!validBoard) return false;

  return candidate.discovered.every((value) => typeof value === "boolean");
}

export function hydrateState(candidate) {
  return validateState(candidate) ? cloneState(candidate) : createInitialState();
}
