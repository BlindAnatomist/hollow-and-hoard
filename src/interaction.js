import { createInitialState, resolveDrop, summonFamily } from "./gameLogic.js";
import { clearGame, saveGame } from "./storage.js";
import { createPieceVisual } from "./visuals.js";
import {
  deniedCue,
  isMuted,
  mergeCue,
  openCue,
  pickupCue,
  relicCue,
  relocationCue,
  setMuted,
  spawnCue,
  startAmbient,
} from "./audio.js";
import { familyData, pieceName, rt, setStatus, snapshot } from "./runtime.js";

function cellCenter(index) {
  const cell = rt.renderedCells[index];
  if (!cell) return null;
  const rect = cell.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, size: Math.min(rect.width, rect.height) };
}

function cellAtPoint(x, y) {
  const cell = document.elementFromPoint(x, y)?.closest?.("[data-cell-index]");
  return cell && document.querySelector("#board").contains(cell) ? Number(cell.dataset.cellIndex) : -1;
}

function matchingTarget(x, y, fromIndex) {
  const source = rt.state.board[fromIndex];
  if (!source) return null;
  let best = null;
  rt.state.board.forEach((piece, index) => {
    if (!piece || index === fromIndex || piece.family !== source.family || piece.tier !== source.tier) return;
    const center = cellCenter(index);
    if (!center) return;
    const distance = Math.hypot(x - center.x, y - center.y);
    const radius = Math.max(48, center.size * 0.95);
    if (distance <= radius && (!best || distance < best.distance)) best = { index, center, distance, radius };
  });
  return best;
}

function clearHighlights() {
  rt.renderedCells.forEach((cell) => cell.classList.remove("drop-relocate", "drop-merge", "drop-invalid"));
}

function highlight(index, fromIndex) {
  clearHighlights();
  if (index < 0 || index === fromIndex) return;
  const source = rt.state.board[fromIndex];
  const target = rt.state.board[index];
  if (!target) rt.renderedCells[index].classList.add("drop-relocate");
  else if (target.family === source?.family && target.tier === source?.tier) rt.renderedCells[index].classList.add("drop-merge");
  else rt.renderedCells[index].classList.add("drop-invalid");
}

function makeGhost(piece, size, x, y) {
  const ghost = document.createElement("div");
  ghost.className = `drag-ghost ${piece.family}`;
  ghost.style.width = `${size}px`;
  ghost.style.height = `${size}px`;
  ghost.append(createPieceVisual(piece, "piece-art"));
  document.body.append(ghost);
  moveGhost(ghost, x, y);
  return ghost;
}

function moveGhost(ghost, x, y) {
  ghost.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
}

function clearDrag() {
  rt.drag?.ghost?.remove();
  if (rt.drag?.fromIndex !== undefined) rt.renderedCells[rt.drag.fromIndex]?.classList.remove("drag-source");
  clearHighlights();
  rt.drag = null;
}

function animateGhost(x, y, duration, callback) {
  if (!rt.drag?.ghost) return callback();
  rt.drag.ghost.style.transition = `transform ${duration}ms cubic-bezier(.2,.8,.2,1), opacity ${duration}ms ease`;
  moveGhost(rt.drag.ghost, x, y);
  window.setTimeout(callback, duration);
}

function rejectDrop(withCue = true) {
  const origin = cellCenter(rt.drag.fromIndex);
  if (withCue) deniedCue();
  if (!origin) return clearDrag();
  animateGhost(origin.x, origin.y, 170, clearDrag);
}

function pointerDown(event) {
  if (rt.interactionLocked || rt.drag) return;
  const cell = event.target.closest?.("[data-cell-index]");
  const fromIndex = Number(cell?.dataset.cellIndex);
  const piece = rt.state.board[fromIndex];
  if (!piece) return;
  const center = cellCenter(fromIndex);
  if (!center) return;
  try { event.currentTarget.setPointerCapture(event.pointerId); } catch { return; }
  rt.drag = { pointerId: event.pointerId, fromIndex, startX: event.clientX, startY: event.clientY, size: center.size * 0.9, dragging: false, magneticIndex: null, ghost: null };
  pickupCue();
}

function pointerMove(event) {
  const drag = rt.drag;
  if (!drag || drag.pointerId !== event.pointerId) return;
  const distance = Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY);
  if (!drag.dragging && distance <= 6) return;
  if (!drag.dragging) {
    drag.dragging = true;
    drag.ghost = makeGhost(rt.state.board[drag.fromIndex], drag.size, event.clientX, event.clientY);
    rt.renderedCells[drag.fromIndex].classList.add("drag-source");
  }
  const magnetic = matchingTarget(event.clientX, event.clientY, drag.fromIndex);
  if (magnetic) {
    const pull = 0.28 + (1 - magnetic.distance / magnetic.radius) * 0.34;
    moveGhost(drag.ghost, event.clientX + (magnetic.center.x - event.clientX) * pull, event.clientY + (magnetic.center.y - event.clientY) * pull);
    drag.magneticIndex = magnetic.index;
  } else {
    moveGhost(drag.ghost, event.clientX, event.clientY);
    drag.magneticIndex = null;
  }
  highlight(drag.magneticIndex ?? cellAtPoint(event.clientX, event.clientY), drag.fromIndex);
}

export function bindInteractions(renderAll) {
  const saveAndRender = (options) => { saveGame(rt.state); renderAll(options); };

  document.querySelector("#start-game").addEventListener("click", () => {
    rt.screen = "game";
    rt.state.introSeen = true;
    saveAndRender();
    startAmbient();
    document.querySelector("#game-screen h1").focus();
  });
  document.querySelector("#story-open").addEventListener("click", () => {
    rt.screen = "intro";
    renderAll();
    document.querySelector("#intro-title").focus();
  });
  document.querySelector("#sound-toggle").addEventListener("click", () => {
    setMuted(!isMuted());
    renderAll();
    setStatus(isMuted() ? "Sound muted." : "Sound restored.");
  });
  for (const family of ["goblin", "gargoyle"]) {
    document.querySelector(`#summon-${family}`).addEventListener("click", () => {
      const result = summonFamily(rt.state, family);
      if (!result.accepted) return setStatus("The board needs more room before another dwelling can answer.");
      rt.previousState = snapshot();
      rt.state = result.state;
      spawnCue(family);
      saveAndRender({ spawnedIndices: result.spawnedIndices });
      setStatus(`${familyData(family).dwelling} welcomed ${result.summoned} ${familyData(family).starterName}${result.summoned === 1 ? "" : "s"}.`);
    });
  }
  document.querySelector("#undo").addEventListener("click", () => {
    if (!rt.previousState) return;
    rt.state = rt.previousState;
    rt.previousState = null;
    saveAndRender();
    setStatus("The Hollow returned one step.");
  });
  document.querySelector("#reset").addEventListener("click", () => {
    if (!window.confirm("Reset the Hollow and erase its remembered progress?")) return;
    clearGame();
    rt.state = createInitialState();
    rt.state.introSeen = true;
    rt.previousState = null;
    rt.screen = "game";
    saveAndRender();
    setStatus("The Hollow begins again.");
  });
  document.querySelector("#codex-open").addEventListener("click", () => { openCue("codex"); document.querySelector("#codex-dialog").showModal(); });
  document.querySelector("#hoard-open").addEventListener("click", () => { openCue("hoard"); document.querySelector("#hoard-dialog").showModal(); });
  document.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", () => document.querySelector(`#${button.dataset.close}`).close()));

  const board = document.querySelector("#board");
  board.addEventListener("pointerdown", pointerDown);
  board.addEventListener("pointermove", pointerMove);
  board.addEventListener("pointercancel", clearDrag);
  board.addEventListener("pointerup", (event) => {
    const drag = rt.drag;
    if (!drag || drag.pointerId !== event.pointerId) return;
    if (!drag.dragging) return clearDrag();
    const targetIndex = drag.magneticIndex ?? cellAtPoint(event.clientX, event.clientY);
    const result = resolveDrop(rt.state, drag.fromIndex, targetIndex);
    if (!result.accepted) return rejectDrop(result.reason !== "same-tile");
    const target = cellCenter(targetIndex);
    if (!target) return rejectDrop(false);
    rt.interactionLocked = true;
    rt.previousState = snapshot();
    animateGhost(target.x, target.y, 145, () => {
      clearDrag();
      rt.state = result.state;
      rt.interactionLocked = false;
      saveAndRender();
      if (result.kind === "relocate") {
        relocationCue();
        setStatus(`${pieceName({ family: result.family, tier: result.tier })} moved.`);
      } else if (result.kind === "merge") {
        mergeCue(result.family, result.newTier);
        setStatus(`Matching kin awakened as ${pieceName({ family: result.family, tier: result.newTier })}.`);
        rt.renderedCells[targetIndex]?.classList.add("merge-bloom");
      } else {
        relicCue(result.family);
        document.querySelector("#world").classList.add("relic-ceremony");
        window.setTimeout(() => document.querySelector("#world")?.classList.remove("relic-ceremony"), 900);
        setStatus(`${result.relicName} entered the Hoard. The Hollow remembers.`);
      }
    });
  });
}
