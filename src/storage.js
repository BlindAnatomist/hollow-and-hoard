import { createInitialState, hydrateState, validateState } from "./gameLogic.js";

export const SAVE_KEY = "hollow-and-hoard-save-v1";

export function loadGame(storage = window.localStorage) {
  try {
    const raw = storage.getItem(SAVE_KEY);
    if (!raw) return createInitialState();
    const parsed = JSON.parse(raw);
    return hydrateState(parsed);
  } catch {
    return createInitialState();
  }
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
    return true;
  } catch {
    return false;
  }
}
