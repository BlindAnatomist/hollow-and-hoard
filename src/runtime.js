import { FAMILIES, cloneState } from "./gameLogic.js";
import { loadGame } from "./storage.js";

export const rt = {
  atlas: null,
  state: loadGame(),
  previousState: null,
  interactionLocked: false,
  drag: null,
  renderedCells: [],
  screen: null,
};
rt.screen = rt.state.introSeen ? "game" : "intro";

export function familyData(family) {
  return FAMILIES[family];
}

export function pieceName(piece) {
  return familyData(piece.family).tiers[piece.tier].name;
}

export function spriteName(piece) {
  return `${piece.family}.${familyData(piece.family).tiers[piece.tier].id}`;
}

export function memoryClasses() {
  return [rt.state.relics.goblin ? "memory-goblin" : "", rt.state.relics.gargoyle ? "memory-gargoyle" : ""].filter(Boolean).join(" ");
}

export function setStatus(message) {
  const status = document.querySelector("#game-status");
  if (status) status.textContent = message;
}

export function snapshot() {
  return cloneState(rt.state);
}
