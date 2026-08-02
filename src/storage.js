import { createInitialState, hydrateState, validateState } from "./gameLogic.js";

export const SAVE_KEY = "hollow-and-hoard-save-v2";
export const LEGACY_SAVE_KEY = "hollow-and-hoard-save-v1";

function parseStored(storage, key) {
  const raw = storage.getItem(key);
  return raw ? JSON.parse(raw) : null;
}

export function loadGame(storage = window.localStorage) {
  try {
    const current = parseStored(storage, SAVE_KEY);
    if (current) return hydrateState(current);

    const legacy = parseStored(storage, LEGACY_SAVE_KEY);
    if (legacy) {
      const migrated = hydrateState(legacy);
      saveGame(migrated, storage);
      return migrated;
    }
  } catch {
    return createInitialState();
  }
  return createInitialState();
}

export function saveGame(state, storage = window.localStorage) {
  if (!validateState(state)) return false;
  try {
    storage.setItem(SAVE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function clearGame(storage = window.localStorage) {
  try {
    storage.removeItem(SAVE_KEY);
    storage.removeItem(LEGACY_SAVE_KEY);
    return true;
  } catch {
    return false;
  }
}
