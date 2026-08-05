export const SAVE_SCHEMA_VERSION = 2;
export const BOARD_SIZE = 5;
export const CELL_COUNT = BOARD_SIZE * BOARD_SIZE;

export const FAMILIES = Object.freeze({
  goblin: Object.freeze({
    id: "goblin",
    name: "Goblin Hollowkin",
    starterName: "Imp",
    dwelling: "Goblin Spawner",
    relicName: "Relic Blossom",
    tiers: Object.freeze([
      Object.freeze({ id: "imp", name: "Imp" }),
      Object.freeze({ id: "goblin", name: "Goblin" }),
      Object.freeze({ id: "hobgoblin", name: "Hobgoblin" }),
      Object.freeze({ id: "troll", name: "Troll" }),
      Object.freeze({ id: "ogre", name: "Ogre" }),
    ]),
  }),
  gargoyle: Object.freeze({
    id: "gargoyle",
    name: "Gargoyle Line",
    starterName: "Mosscap",
    dwelling: "Moonstone Nest",
    relicName: "Moonlit Relic",
    tiers: Object.freeze([
      Object.freeze({ id: "mosscap", name: "Mosscap" }),
      Object.freeze({ id: "hatchling", name: "Gargoyle Hatchling" }),
      Object.freeze({ id: "gargoyle", name: "Gargoyle" }),
      Object.freeze({ id: "elder", name: "Elder Gargoyle" }),
    ]),
  }),
});

const FAMILY_IDS = Object.freeze(Object.keys(FAMILIES));
const STARTING_PIECES = Object.freeze([
  [2, "goblin"], [6, "goblin"], [8, "goblin"], [11, "goblin"],
  [13, "gargoyle"], [16, "gargoyle"], [18, "gargoyle"], [22, "gargoyle"],
]);
const MIGRATION_GARGOYLE_SLOTS = Object.freeze([13, 16, 18, 22, 3, 21]);

export function emptyBoard() {
  return Array(CELL_COUNT).fill(null);
}

export function isFamilyId(value) {
  return FAMILY_IDS.includes(value);
}

export function createPiece(family, tier = 0) {
  if (!isFamilyId(family)) throw new RangeError(`Unknown family: ${family}`);
  if (!Number.isInteger(tier) || tier < 0 || tier >= FAMILIES[family].tiers.length) {
    throw new RangeError(`Invalid ${family} tier: ${tier}`);
  }
  return { family, tier };
}

function createDiscovery() {
  return Object.fromEntries(
    FAMILY_IDS.map((family) => [family, Array(FAMILIES[family].tiers.length + 1).fill(false)])
  );
}

export function createInitialState() {
  const board = emptyBoard();
  STARTING_PIECES.forEach(([index, family]) => {
    board[index] = createPiece(family, 0);
  });
  const discovered = createDiscovery();
  FAMILY_IDS.forEach((family) => {
    discovered[family][0] = true;
  });
  return {
    schemaVersion: SAVE_SCHEMA_VERSION,
    board,
    discovered,
    relics: { goblin: 0, gargoyle: 0 },
    actions: 0,
    introSeen: false,
  };
}

export function cloneState(state) {
  return {
    schemaVersion: SAVE_SCHEMA_VERSION,
    board: state.board.map((piece) => (piece ? { ...piece } : null)),
    discovered: Object.fromEntries(FAMILY_IDS.map((family) => [family, state.discovered[family].slice()])),
    relics: { ...state.relics },
    actions: state.actions,
    introSeen: Boolean(state.introSeen),
  };
}

export function createStateFromPieces(pieces, options = {}) {
  const state = createInitialState();
  state.board = emptyBoard();
  state.discovered = createDiscovery();
  for (const { index, family, tier } of pieces) {
    if (!Number.isInteger(index) || index < 0 || index >= CELL_COUNT) throw new RangeError("Invalid board index");
    state.board[index] = createPiece(family, tier);
    state.discovered[family][tier] = true;
  }
  state.relics = { goblin: options.goblinRelics ?? 0, gargoyle: options.gargoyleRelics ?? 0 };
  FAMILY_IDS.forEach((family) => {
    if (state.relics[family] > 0) state.discovered[family][FAMILIES[family].tiers.length] = true;
  });
  state.actions = options.actions ?? 0;
  state.introSeen = options.introSeen ?? true;
  return state;
}

export function emptyIndices(board) {
  return board.flatMap((piece, index) => (piece ? [] : [index]));
}

function accepted(kind, state, details = {}) {
  return { accepted: true, kind, state, reason: null, ...details };
}

function rejected(reason, state, details = {}) {
  return { accepted: false, kind: "rejected", state, reason, ...details };
}

export function resolveDrop(state, fromIndex, toIndex) {
  if (![fromIndex, toIndex].every((value) => Number.isInteger(value) && value >= 0 && value < CELL_COUNT)) {
    return rejected("outside-board", state, { fromIndex, toIndex });
  }
  if (fromIndex === toIndex) return rejected("same-tile", state, { fromIndex, toIndex });
  const source = state.board[fromIndex];
  const target = state.board[toIndex];
  if (!source) return rejected("empty-source", state, { fromIndex, toIndex });

  const next = cloneState(state);
  if (!target) {
    next.board[toIndex] = { ...source };
    next.board[fromIndex] = null;
    next.actions += 1;
    return accepted("relocate", next, { fromIndex, toIndex, family: source.family, tier: source.tier });
  }
  if (target.family !== source.family) {
    return rejected("mixed-family", state, { fromIndex, toIndex, sourceFamily: source.family, targetFamily: target.family });
  }
  if (target.tier !== source.tier) {
    return rejected("unequal-tier", state, { fromIndex, toIndex, family: source.family, sourceTier: source.tier, targetTier: target.tier });
  }

  next.board[fromIndex] = null;
  next.actions += 1;
  const family = FAMILIES[source.family];
  const finalCreatureTier = family.tiers.length - 1;
  if (source.tier === finalCreatureTier) {
    next.board[toIndex] = null;
    next.relics[source.family] += 1;
    next.discovered[source.family][family.tiers.length] = true;
    return accepted("relic", next, {
      fromIndex,
      toIndex,
      family: source.family,
      tier: source.tier,
      relicName: family.relicName,
    });
  }

  const newTier = source.tier + 1;
  next.board[toIndex] = createPiece(source.family, newTier);
  next.discovered[source.family][newTier] = true;
  return accepted("merge", next, { fromIndex, toIndex, family: source.family, tier: source.tier, newTier });
}

function chooseEmpty(available, rng) {
  const raw = Math.floor(rng() * available.length);
  const index = Math.max(0, Math.min(raw, available.length - 1));
  return available.splice(index, 1)[0];
}

export function summonFamily(state, family, rng = Math.random, requested = 2) {
  if (!isFamilyId(family)) return rejected("unknown-family", state, { family, spawnedIndices: [] });
  const available = emptyIndices(state.board);
  const count = Math.min(Math.max(0, requested), available.length);
  if (!count) return rejected("board-full", state, { family, spawnedIndices: [] });
  const next = cloneState(state);
  const spawnedIndices = [];
  for (let i = 0; i < count; i += 1) {
    const index = chooseEmpty(available, rng);
    next.board[index] = createPiece(family, 0);
    spawnedIndices.push(index);
  }
  next.discovered[family][0] = true;
  next.actions += 1;
  return accepted("summon", next, { family, spawnedIndices, summoned: count, requested });
}

export function validateState(candidate) {
  if (!candidate || candidate.schemaVersion !== SAVE_SCHEMA_VERSION) return false;
  if (!Array.isArray(candidate.board) || candidate.board.length !== CELL_COUNT) return false;
  if (!candidate.discovered || !candidate.relics) return false;
  if (!Number.isInteger(candidate.actions) || candidate.actions < 0) return false;
  if (typeof candidate.introSeen !== "boolean") return false;
  for (const family of FAMILY_IDS) {
    if (!Number.isInteger(candidate.relics[family]) || candidate.relics[family] < 0) return false;
    if (!Array.isArray(candidate.discovered[family]) || candidate.discovered[family].length !== FAMILIES[family].tiers.length + 1) return false;
    if (!candidate.discovered[family].every((value) => typeof value === "boolean")) return false;
  }
  return candidate.board.every((piece) => {
    if (piece === null) return true;
    return Boolean(piece && isFamilyId(piece.family) && Number.isInteger(piece.tier) && piece.tier >= 0 && piece.tier < FAMILIES[piece.family].tiers.length);
  });
}

export function migrateV1State(candidate) {
  if (!candidate || candidate.schemaVersion !== 1 || !Array.isArray(candidate.board)) return createInitialState();
  const state = createInitialState();
  state.board = emptyBoard();
  candidate.board.slice(0, CELL_COUNT).forEach((piece, index) => {
    if (piece && Number.isInteger(piece.tier) && piece.tier >= 0 && piece.tier < FAMILIES.goblin.tiers.length) {
      state.board[index] = createPiece("goblin", piece.tier);
      state.discovered.goblin[piece.tier] = true;
    }
  });
  state.relics.goblin = Number.isInteger(candidate.relics) && candidate.relics > 0 ? candidate.relics : 0;
  if (state.relics.goblin) state.discovered.goblin[FAMILIES.goblin.tiers.length] = true;
  let added = 0;
  for (const index of MIGRATION_GARGOYLE_SLOTS) {
    if (!state.board[index] && added < 4) {
      state.board[index] = createPiece("gargoyle", 0);
      added += 1;
    }
  }
  state.discovered.gargoyle[0] = true;
  state.actions = Number.isInteger(candidate.actions) && candidate.actions >= 0 ? candidate.actions : 0;
  state.introSeen = false;
  return state;
}

export function hydrateState(candidate) {
  if (validateState(candidate)) return cloneState(candidate);
  if (candidate?.schemaVersion === 1) return migrateV1State(candidate);
  return createInitialState();
}
