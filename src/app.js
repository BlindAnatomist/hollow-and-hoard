import {
  HOLLOWKIN,
  cloneState,
  createInitialState,
  resolveDrop,
  summonImps,
} from "./gameLogic.js";
import { clearGame, loadGame, saveGame } from "./storage.js";
import { createSpriteCanvas, loadAtlas, replaceWithSprite } from "./atlas.js";
import {
  deniedCue,
  isMuted,
  mergeCue,
  pickupCue,
  relicCue,
  relocationCue,
  setMuted,
} from "./audio.js";

const app = document.querySelector("#app");

let atlas = null;
let state = loadGame();
let previousState = null;
let drag = null;
let interactionLocked = false;
let renderedCells = [];

function spriteNameForTier(tier) {
  return `goblin.${HOLLOWKIN[tier].id}`;
}

function setStatus(message) {
  const status = document.querySelector("#game-status");
  if (status) status.textContent = message;
}

function buildShell() {
  app.innerHTML = `
    <main class="game-page">
      <section class="game-shell" aria-label="Hollow and Hoard">
        <header class="game-header">
          <button id="sound-toggle" class="round-control" type="button">Sound on</button>
          <div class="title-group">
            <p class="eyebrow">A moonlit merging hollow</p>
            <h1>Hollow &amp; Hoard</h1>
          </div>
          <button id="codex-open" class="round-control codex-control" type="button">
            <span id="codex-icon" class="control-art" aria-hidden="true"></span>
            <span>Codex</span>
          </button>
        </header>

        <section class="world-actions" aria-label="Hollow places">
          <button id="summon" class="place-card" type="button">
            <span id="spawner-art" class="place-art" aria-hidden="true"></span>
            <span class="place-copy">
              <strong>Goblin Spawner</strong>
              <small>Summon two Imps</small>
            </span>
          </button>

          <button id="hoard-open" class="place-card" type="button">
            <span id="hoard-art" class="place-art" aria-hidden="true"></span>
            <span class="place-copy">
              <strong>Hoard Chamber</strong>
              <small><span id="relic-count">0</span> Relic Blossoms</small>
            </span>
          </button>
        </section>

        <section class="board-frame">
          <div id="board" class="board" aria-label="Five by five creature board"></div>
        </section>

        <section class="game-controls" aria-label="Game controls">
          <button id="undo" class="text-control" type="button">Undo</button>
          <button id="reset" class="text-control" type="button">Reset hollow</button>
        </section>

        <p id="game-status" class="game-status" aria-live="polite"></p>
      </section>
    </main>

    <dialog id="codex-dialog" class="storybook-dialog">
      <header>
        <div>
          <p class="eyebrow">Field journal</p>
          <h2>Codex of the Hollow</h2>
        </div>
        <button type="button" class="dialog-close" data-close-dialog="codex-dialog">Close</button>
      </header>
      <div id="codex-list" class="codex-list"></div>
    </dialog>

    <dialog id="hoard-dialog" class="storybook-dialog">
      <header>
        <div>
          <p class="eyebrow">What the hollow remembers</p>
          <h2>Hoard Chamber</h2>
        </div>
        <button type="button" class="dialog-close" data-close-dialog="hoard-dialog">Close</button>
      </header>
      <div id="hoard-content" class="hoard-content"></div>
    </dialog>
  `;

  document.querySelector("#sound-toggle").addEventListener("click", toggleSound);
  document.querySelector("#summon").addEventListener("click", summon);
  document.querySelector("#undo").addEventListener("click", undo);
  document.querySelector("#reset").addEventListener("click", reset);
  document.querySelector("#codex-open").addEventListener("click", () => openDialog("codex-dialog"));
  document.querySelector("#hoard-open").addEventListener("click", () => openDialog("hoard-dialog"));
  document.querySelectorAll("[data-close-dialog]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector(`#${button.dataset.closeDialog}`).close();
    });
  });

  const board = document.querySelector("#board");
  board.addEventListener("pointerdown", pointerDown);
  board.addEventListener("pointermove", pointerMove);
  board.addEventListener("pointerup", pointerUp);
  board.addEventListener("pointercancel", pointerCancel);
}

function installWorldArt() {
  if (!atlas) return;
  replaceWithSprite(document.querySelector("#spawner-art"), atlas, "world.goblinSpawner");
  replaceWithSprite(document.querySelector("#hoard-art"), atlas, "world.hoardChamber");
  replaceWithSprite(document.querySelector("#codex-icon"), atlas, "ui.codex");
}

function pieceVisual(tier, className = "") {
  if (atlas) return createSpriteCanvas(atlas, spriteNameForTier(tier), `piece-art ${className}`);
  const fallback = document.createElement("span");
  fallback.className = `piece-fallback ${className}`.trim();
  fallback.textContent = HOLLOWKIN[tier].name.slice(0, 1);
  return fallback;
}

function renderBoard(spawnedIndices = []) {
  const board = document.querySelector("#board");
  board.replaceChildren();
  renderedCells = [];

  state.board.forEach((piece, index) => {
    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = "board-cell";
    cell.dataset.cellIndex = String(index);
    cell.dataset.tier = piece ? String(piece.tier) : "empty";
    cell.setAttribute(
      "aria-label",
      piece ? `${HOLLOWKIN[piece.tier].name}, board space ${index + 1}` : `Empty board space ${index + 1}`
    );
    if (piece) cell.append(pieceVisual(piece.tier));
    if (spawnedIndices.includes(index)) cell.classList.add("spawn-arrival");
    board.append(cell);
    renderedCells[index] = cell;
  });
}

function renderCodex() {
  const descriptions = [
    "Tiny, lively, sproutlike, and chaotic.",
    "Compact, curious, and drawn to lantern light.",
    "Hooded, capable, and always planning a route.",
    "Broad, steady, and built for gathering.",
    "Tall, gentle, and protective of the hoard.",
    "A glowing legacy carried out of the active hollow.",
  ];
  const list = document.querySelector("#codex-list");
  list.replaceChildren();

  HOLLOWKIN.forEach((entry, tier) => {
    const discovered = state.discovered[tier];
    const card = document.createElement("article");
    card.className = `codex-entry ${discovered ? "discovered" : "undiscovered"}`;

    const art = document.createElement("div");
    art.className = "codex-art";
    if (discovered) art.append(pieceVisual(tier));
    else art.textContent = "?";

    const copy = document.createElement("div");
    copy.innerHTML = discovered
      ? `<h3>${entry.name}</h3><p>${descriptions[tier]}</p>`
      : "<h3>Undiscovered</h3><p>Merge the hollowkin to reveal this form.</p>";

    card.append(art, copy);
    list.append(card);
  });
}

function renderHoard() {
  const content = document.querySelector("#hoard-content");
  content.replaceChildren();

  const art = document.createElement("div");
  art.className = `hoard-relic${state.relics ? " awakened" : ""}`;
  if (state.relics) art.append(pieceVisual(5, "relic-art"));
  else art.innerHTML = '<span class="empty-relic">The first shrine is waiting.</span>';

  const copy = document.createElement("div");
  copy.innerHTML = `
    <h3>${state.relics} ${state.relics === 1 ? "Relic Blossom" : "Relic Blossoms"}</h3>
    <p>Two Ogres complete a lineage. The relic leaves the board and becomes part of the permanent hoard.</p>
  `;
  content.append(art, copy);
}

function render({ spawnedIndices = [] } = {}) {
  document.querySelector("#relic-count").textContent = String(state.relics);
  document.querySelector("#undo").disabled = !previousState || interactionLocked;
  document.querySelector("#summon").disabled = interactionLocked;
  document.querySelector("#sound-toggle").textContent = isMuted() ? "Sound off" : "Sound on";
  renderBoard(spawnedIndices);
  renderCodex();
  renderHoard();
}

function openDialog(id) {
  const dialog = document.querySelector(`#${id}`);
  if (!dialog.open) dialog.showModal();
}

function cellCenter(index) {
  const cell = renderedCells[index];
  if (!cell) return null;
  const rect = cell.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, size: Math.min(rect.width, rect.height) };
}

function cellAtPoint(x, y) {
  const target = document.elementFromPoint(x, y);
  const cell = target?.closest?.("[data-cell-index]");
  const board = document.querySelector("#board");
  if (!cell || !board.contains(cell)) return -1;
  return Number(cell.dataset.cellIndex);
}

function matchingTarget(x, y, fromIndex) {
  const tier = state.board[fromIndex]?.tier;
  if (tier === undefined) return null;
  let best = null;

  state.board.forEach((piece, index) => {
    if (!piece || index === fromIndex || piece.tier !== tier) return;
    const center = cellCenter(index);
    if (!center) return;
    const distance = Math.hypot(x - center.x, y - center.y);
    const radius = Math.max(48, center.size * 0.95);
    if (distance <= radius && (!best || distance < best.distance)) {
      best = { index, center, distance, radius };
    }
  });
  return best;
}

function clearHighlights() {
  renderedCells.forEach((cell) => cell.classList.remove("drop-relocate", "drop-merge", "drop-invalid"));
}

function highlight(index, fromIndex) {
  clearHighlights();
  if (index < 0 || index === fromIndex) return;
  const source = state.board[fromIndex];
  const target = state.board[index];
  if (!target) renderedCells[index].classList.add("drop-relocate");
  else if (target.tier === source?.tier) renderedCells[index].classList.add("drop-merge");
  else renderedCells[index].classList.add("drop-invalid");
}

function makeGhost(tier, size, x, y) {
  const ghost = document.createElement("div");
  ghost.className = "drag-ghost";
  ghost.style.width = `${size}px`;
  ghost.style.height = `${size}px`;
  ghost.append(pieceVisual(tier));
  document.body.append(ghost);
  moveGhost(ghost, x, y);
  return ghost;
}

function moveGhost(ghost, x, y) {
  ghost.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
}

function clearDrag() {
  if (drag?.ghost) drag.ghost.remove();
  if (drag?.fromIndex !== undefined) renderedCells[drag.fromIndex]?.classList.remove("drag-source");
  clearHighlights();
  drag = null;
}

function pointerDown(event) {
  if (interactionLocked || drag) return;
  const cell = event.target.closest?.("[data-cell-index]");
  if (!cell) return;
  const fromIndex = Number(cell.dataset.cellIndex);
  const piece = state.board[fromIndex];
  if (!piece) return;

  const center = cellCenter(fromIndex);
  if (!center) return;
  try {
    event.currentTarget.setPointerCapture(event.pointerId);
  } catch {
    return;
  }

  drag = {
    pointerId: event.pointerId,
    fromIndex,
    startX: event.clientX,
    startY: event.clientY,
    x: event.clientX,
    y: event.clientY,
    size: center.size * 0.88,
    dragging: false,
    magneticIndex: null,
    ghost: null,
  };
  pickupCue();
}

function pointerMove(event) {
  if (!drag || drag.pointerId !== event.pointerId) return;
  const dx = event.clientX - drag.startX;
  const dy = event.clientY - drag.startY;
  if (!drag.dragging && Math.hypot(dx, dy) <= 6) return;

  if (!drag.dragging) {
    drag.dragging = true;
    drag.ghost = makeGhost(state.board[drag.fromIndex].tier, drag.size, event.clientX, event.clientY);
    renderedCells[drag.fromIndex].classList.add("drag-source");
  }

  const magnetic = matchingTarget(event.clientX, event.clientY, drag.fromIndex);
  if (magnetic) {
    const closeness = 1 - magnetic.distance / magnetic.radius;
    const pull = 0.28 + closeness * 0.34;
    drag.x = event.clientX + (magnetic.center.x - event.clientX) * pull;
    drag.y = event.clientY + (magnetic.center.y - event.clientY) * pull;
    drag.magneticIndex = magnetic.index;
  } else {
    drag.x = event.clientX;
    drag.y = event.clientY;
    drag.magneticIndex = null;
  }
  moveGhost(drag.ghost, drag.x, drag.y);
  highlight(drag.magneticIndex ?? cellAtPoint(event.clientX, event.clientY), drag.fromIndex);
}

function animateGhost(x, y, duration, callback) {
  if (!drag?.ghost) {
    callback();
    return;
  }
  drag.ghost.style.transition = `transform ${duration}ms cubic-bezier(.2,.8,.2,1), opacity ${duration}ms ease`;
  moveGhost(drag.ghost, x, y);
  window.setTimeout(callback, duration);
}

function rejectDrop(withCue = false) {
  const origin = cellCenter(drag.fromIndex);
  if (withCue) deniedCue();
  if (!origin) return clearDrag();
  animateGhost(origin.x, origin.y, 170, clearDrag);
}

function pointerUp(event) {
  if (!drag || drag.pointerId !== event.pointerId) return;
  if (!drag.dragging) return clearDrag();

  const targetIndex = drag.magneticIndex ?? cellAtPoint(event.clientX, event.clientY);
  const result = resolveDrop(state, drag.fromIndex, targetIndex);
  if (!result.accepted) return rejectDrop(result.reason === "unequal-tier");

  const target = cellCenter(targetIndex);
  if (!target) return rejectDrop(false);

  interactionLocked = true;
  previousState = cloneState(state);
  animateGhost(target.x, target.y, 145, () => {
    clearDrag();
    state = result.state;
    saveGame(state);
    interactionLocked = false;
    render();

    if (result.kind === "relocate") {
      relocationCue();
      setStatus(`${HOLLOWKIN[result.tier].name} moved.`);
      return;
    }
    if (result.kind === "merge") {
      mergeCue(result.newTier);
      setStatus(`Two ${HOLLOWKIN[result.tier].name}s became a ${HOLLOWKIN[result.newTier].name}.`);
      renderedCells[targetIndex]?.classList.add("merge-arrival");
      return;
    }

    relicCue();
    setStatus("Two Ogres completed a Relic Blossom. It entered the Hoard Chamber.");
    const hoard = document.querySelector("#hoard-open");
    hoard.classList.add("hoard-awakened");
    window.setTimeout(() => hoard.classList.remove("hoard-awakened"), 900);
  });
}

function pointerCancel(event) {
  if (!drag || drag.pointerId !== event.pointerId) return;
  if (drag.dragging) rejectDrop(false);
  else clearDrag();
}

function summon() {
  if (interactionLocked) return;
  const result = summonImps(state);
  if (!result.accepted) {
    deniedCue();
    setStatus("The hollow is full. Merge creatures to make room.");
    return;
  }
  previousState = cloneState(state);
  state = result.state;
  saveGame(state);
  mergeCue(0);
  render({ spawnedIndices: result.spawnedIndices });
  setStatus(result.summoned === 2 ? "Two Imps arrived from the Spawner." : "One Imp arrived in the last open space.");
}

function undo() {
  if (!previousState || interactionLocked) return;
  state = previousState;
  previousState = null;
  saveGame(state);
  relocationCue();
  render();
  setStatus("The last action was undone.");
}

function reset() {
  if (interactionLocked) return;
  if (!window.confirm("Reset the hollow and erase this local game?")) return;
  clearGame();
  state = createInitialState();
  previousState = null;
  render();
  setStatus("The hollow has been restored to its starting state.");
}

function toggleSound() {
  setMuted(!isMuted());
  render();
  setStatus(isMuted() ? "Sound effects are off." : "Sound effects are on.");
  if (!isMuted()) relocationCue();
}

async function start() {
  buildShell();
  setStatus("Opening the hollow…");
  try {
    atlas = await loadAtlas();
    installWorldArt();
    render();
    setStatus("Drag matching creatures together. The Spawner summons two Imps.");
  } catch (error) {
    console.error(error);
    render();
    setStatus("The preserved art could not be loaded, but the board remains playable with text markers.");
  }
}

start();
