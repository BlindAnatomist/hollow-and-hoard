import { createInitialState, hydrateState, validateState } from "./gameLogic.js";

export const SAVE_KEY = "hollow-and-hoard-save-v2";
export const LEGACY_SAVE_KEY = "hollow-and-hoard-save-v1";

export function loadGame(storage = window.localStorage) {
  try {
    const current = storage.getItem(SAVE_KEY);
    if (current) return hydrateState(JSON.parse(current));
    const legacy = storage.getItem(LEGACY_SAVE_KEY);
    if (legacy) {
      const migrated = hydrateState(JSON.parse(legacy));
      storage.setItem(SAVE_KEY, JSON.stringify(migrated));
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
