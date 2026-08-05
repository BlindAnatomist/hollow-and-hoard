import { FAMILIES } from "./gameLogic.js";
import { createPieceVisual, createRelicVisual, createWorldVisual } from "./visuals.js";
import { familyData, memoryClasses, pieceName, rt } from "./runtime.js";
import { isMuted } from "./audio.js";

function fallbackVisual(label, family, className = "") {
  const fallback = document.createElement("span");
  fallback.className = `piece-fallback ${family} ${className}`.trim();
  fallback.textContent = label.slice(0, 1);
  fallback.setAttribute("aria-hidden", "true");
  return fallback;
}

export function pieceVisual(piece, className = "") {
  return createPieceVisual(piece, `piece-art ${className}`.trim());
}

function replaceArt(selector, sprite, fallback) {
  const container = document.querySelector(selector);
  if (!container) return;
  container.replaceChildren(createWorldVisual(sprite));
}

export function installWorldArt() {
  replaceArt("#intro-art", "story.hollow", "H");
  replaceArt("#goblin-spawner-art", "world.goblinSpawner", "G");
  replaceArt("#gargoyle-nest-art", "world.moonstoneNest", "M");
  replaceArt("#hoard-art", "world.hoard", "H");
  replaceArt("#codex-art", "ui.codex", "C");
}

export function renderScreen() {
  const intro = document.querySelector("#intro-screen");
  const game = document.querySelector("#game-screen");
  if (!intro || !game) return;
  intro.hidden = rt.screen !== "intro";
  game.hidden = rt.screen !== "game";
  document.querySelector("#world").className = `world ${memoryClasses()}`.trim();
}

export function renderBoard(spawnedIndices = []) {
  const board = document.querySelector("#board");
  board.replaceChildren();
  rt.renderedCells = [];
  rt.state.board.forEach((piece, index) => {
    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = "board-cell";
    cell.dataset.cellIndex = String(index);
    cell.dataset.family = piece?.family ?? "empty";
    cell.dataset.tier = piece ? String(piece.tier) : "empty";
    cell.setAttribute("aria-label", piece ? `${pieceName(piece)}, board space ${index + 1}` : `Empty board space ${index + 1}`);
    if (piece) cell.append(pieceVisual(piece));
    if (spawnedIndices.includes(index)) cell.classList.add("spawn-arrival");
    board.append(cell);
    rt.renderedCells[index] = cell;
  });
}

function lineageCard(familyId) {
  const family = FAMILIES[familyId];
  const section = document.createElement("section");
  section.className = `lineage-card ${familyId}`;
  const heading = document.createElement("h3");
  heading.textContent = family.name;
  section.append(heading);
  const list = document.createElement("div");
  list.className = "lineage-list";
  family.tiers.forEach((entry, tier) => {
    const discovered = rt.state.discovered[familyId][tier];
    const card = document.createElement("article");
    card.className = `codex-entry ${discovered ? "discovered" : "undiscovered"}`;
    const art = document.createElement("div");
    art.className = "codex-art";
    art.append(discovered ? pieceVisual({ family: familyId, tier }, "codex-piece") : fallbackVisual("?", familyId));
    const copy = document.createElement("div");
    copy.innerHTML = discovered
      ? `<h4>${entry.name}</h4><p>${tier === 0 ? "The first remembered form." : "A deeper form awakened by matching kin."}</p>`
      : "<h4>Undiscovered</h4><p>Merge matching creatures to reveal this form.</p>";
    card.append(art, copy);
    list.append(card);
  });
  section.append(list);
  return section;
}

export function renderCodex() {
  const list = document.querySelector("#codex-list");
  list.replaceChildren(lineageCard("goblin"), lineageCard("gargoyle"));
}

function relicCard(familyId) {
  const family = familyData(familyId);
  const count = rt.state.relics[familyId];
  const card = document.createElement("article");
  card.className = `relic-card ${familyId} ${count ? "awakened" : "waiting"}`;
  const art = document.createElement("div");
  art.className = "relic-art";
  art.append(count ? createRelicVisual(familyId, "relic-piece") : fallbackVisual("?", familyId));
  const copy = document.createElement("div");
  copy.innerHTML = count
    ? `<h3>${family.relicName}</h3><p>${count} remembered. The completed lineage now lives in the Hollow's memory.</p>`
    : `<h3>${family.relicName}</h3><p>The shrine is waiting for a completed ${family.name} lineage.</p>`;
  card.append(art, copy);
  return card;
}

export function renderHoard() {
  const content = document.querySelector("#hoard-content");
  content.replaceChildren(relicCard("goblin"), relicCard("gargoyle"));
  const goblin = rt.state.relics.goblin;
  const gargoyle = rt.state.relics.gargoyle;
  document.querySelector("#relic-summary").textContent = goblin || gargoyle
    ? `${goblin} blossom${goblin === 1 ? "" : "s"}, ${gargoyle} moon relic${gargoyle === 1 ? "" : "s"}`
    : "Nothing remembered yet";
}

export function renderAll({ spawnedIndices = [] } = {}) {
  renderScreen();
  document.querySelector("#undo").disabled = !rt.previousState || rt.interactionLocked;
  document.querySelector("#summon-goblin").disabled = rt.interactionLocked;
  document.querySelector("#summon-gargoyle").disabled = rt.interactionLocked;
  document.querySelector("#sound-toggle").textContent = isMuted() ? "Sound off" : "Sound on";
  renderBoard(spawnedIndices);
  renderCodex();
  renderHoard();
  installWorldArt();
}
