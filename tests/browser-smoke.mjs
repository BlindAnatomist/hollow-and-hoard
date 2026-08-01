import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium, devices, webkit } from "@playwright/test";

const BASE_URL = process.env.SMOKE_BASE_URL ?? "http://127.0.0.1:4173";
const OUTPUT_DIR = "test-output/browser-smoke";
const SAVE_KEY = "hollow-and-hoard-save-v1";
const STARTING_PIECES = 8;

await mkdir(OUTPUT_DIR, { recursive: true });

const { defaultBrowserType: _ignoredBrowserType, ...iphone13 } = devices["iPhone 13"];
const configurations = [
  {
    name: "chromium-desktop",
    browserType: chromium,
    contextOptions: { viewport: { width: 1280, height: 900 } },
  },
  {
    name: "webkit-iphone-large",
    browserType: webkit,
    contextOptions: {
      ...iphone13,
      viewport: { width: 430, height: 932 },
      screen: { width: 430, height: 932 },
      deviceScaleFactor: 3,
    },
  },
];

function pieceCount(page) {
  return page.locator('.board-cell:not([data-tier="empty"])').count();
}

async function waitForHollow(page) {
  await page.waitForFunction(() => {
    const status = document.querySelector("#game-status")?.textContent ?? "";
    return status.includes("Drag matching creatures together");
  });
}

async function dragCell(page, fromIndex, toIndex) {
  const source = page.locator(`[data-cell-index="${fromIndex}"]`);
  const target = page.locator(`[data-cell-index="${toIndex}"]`);
  const sourceBox = await source.boundingBox();
  const targetBox = await target.boundingBox();
  assert(sourceBox, `Source cell ${fromIndex} has no bounding box`);
  assert(targetBox, `Target cell ${toIndex} has no bounding box`);

  const from = {
    x: sourceBox.x + sourceBox.width / 2,
    y: sourceBox.y + sourceBox.height / 2,
  };
  const to = {
    x: targetBox.x + targetBox.width / 2,
    y: targetBox.y + targetBox.height / 2,
  };

  await page.mouse.move(from.x, from.y);
  await page.mouse.down();
  await page.mouse.move((from.x + to.x) / 2, (from.y + to.y) / 2, { steps: 6 });
  await page.mouse.move(to.x, to.y, { steps: 8 });
  await page.mouse.up();
  await page.waitForTimeout(420);
}

async function assertAtlasAndLayout(page) {
  assert.equal(await page.locator(".board-cell").count(), 25, "Board must contain 25 cells");
  assert.equal(await pieceCount(page), STARTING_PIECES, "Initial board must contain eight Imps");

  const canvasReport = await page.evaluate(() => {
    const canvases = [...document.querySelectorAll("canvas.sprite-canvas")];
    const nonTransparent = canvases.map((canvas) => {
      const context = canvas.getContext("2d");
      if (!context || canvas.width === 0 || canvas.height === 0) return false;
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
      for (let index = 3; index < pixels.length; index += 4) {
        if (pixels[index] > 0) return true;
      }
      return false;
    });
    return {
      count: canvases.length,
      allNonTransparent: nonTransparent.every(Boolean),
      dimensions: canvases.map((canvas) => [canvas.width, canvas.height]),
    };
  });
  assert(canvasReport.count >= 11, `Expected board and world sprites, found ${canvasReport.count}`);
  assert(canvasReport.allNonTransparent, "Every rendered atlas crop must contain visible pixels");

  const layout = await page.evaluate(() => {
    const board = document.querySelector("#board").getBoundingClientRect();
    const cells = [...document.querySelectorAll(".board-cell")].map((cell) => cell.getBoundingClientRect());
    return {
      viewportWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      boardLeft: board.left,
      boardRight: board.right,
      boardWidth: board.width,
      minimumCell: Math.min(...cells.map((cell) => Math.min(cell.width, cell.height))),
    };
  });
  assert(layout.scrollWidth <= layout.viewportWidth + 1, `Horizontal overflow: ${layout.scrollWidth} > ${layout.viewportWidth}`);
  assert(layout.boardLeft >= -1 && layout.boardRight <= layout.viewportWidth + 1, "Board must remain inside the viewport");
  assert(layout.minimumCell >= 44, `Board cells are too small for touch: ${layout.minimumCell}px`);
  return { canvasReport, layout };
}

async function runInteractionSequence(page, name) {
  await page.locator("#codex-open").click();
  await page.locator("#codex-dialog").waitFor({ state: "visible" });
  assert(await page.locator("#codex-dialog").evaluate((dialog) => dialog.open), "Codex dialog must be modal and open");
  assert.match(await page.locator("#codex-dialog").innerText(), /Imp/);
  await page.screenshot({ path: `${OUTPUT_DIR}/${name}-codex.png`, fullPage: true });
  await page.locator('[data-close-dialog="codex-dialog"]').click();

  await page.locator("#hoard-open").click();
  assert.match(await page.locator("#hoard-dialog").innerText(), /0 Relic Blossoms/);
  await page.locator('[data-close-dialog="hoard-dialog"]').click();

  await page.locator("#sound-toggle").click();
  assert.equal(await page.locator("#sound-toggle").innerText(), "Sound off");
  await page.locator("#sound-toggle").click();
  assert.equal(await page.locator("#sound-toggle").innerText(), "Sound on");

  await page.locator("#summon").click();
  assert.equal(await pieceCount(page), 10, "Spawner must summon two Imps when space is available");
  assert.match(await page.locator("#game-status").innerText(), /Two Imps arrived/);
  await page.locator("#undo").click();
  assert.equal(await pieceCount(page), STARTING_PIECES, "Undo must restore the previous board");

  await page.locator("#summon").click();
  assert.equal(await pieceCount(page), 10);
  await page.reload();
  await waitForHollow(page);
  assert.equal(await pieceCount(page), 10, "Saved board must survive reload");

  page.once("dialog", (dialog) => dialog.accept());
  await page.locator("#reset").click();
  assert.equal(await pieceCount(page), STARTING_PIECES, "Reset must restore the starting board");

  await dragCell(page, 2, 0);
  assert.equal(await page.locator('[data-cell-index="2"]').getAttribute("data-tier"), "empty");
  assert.equal(await page.locator('[data-cell-index="0"]').getAttribute("data-tier"), "0");
  assert.match(await page.locator("#game-status").innerText(), /Imp moved/);
  await page.locator("#undo").click();

  await dragCell(page, 2, 6);
  assert.equal(await page.locator('[data-cell-index="2"]').getAttribute("data-tier"), "empty");
  assert.equal(await page.locator('[data-cell-index="6"]').getAttribute("data-tier"), "1");
  assert.match(await page.locator("#game-status").innerText(), /became a Goblin/);

  await dragCell(page, 6, 8);
  assert.equal(await page.locator('[data-cell-index="6"]').getAttribute("data-tier"), "1", "Unequal drop must preserve the Goblin");
  assert.equal(await page.locator('[data-cell-index="8"]').getAttribute("data-tier"), "0", "Unequal drop must preserve the Imp");
  assert.equal(await page.locator(".drag-ghost").count(), 0, "Rejected drag ghost must be cleaned up");

  const relicState = {
    schemaVersion: 1,
    board: Array.from({ length: 25 }, (_, index) => (index === 0 || index === 1 ? { tier: 4 } : null)),
    discovered: [true, true, true, true, true, false],
    relics: 0,
    actions: 0,
  };
  await page.evaluate(({ key, value }) => localStorage.setItem(key, JSON.stringify(value)), {
    key: SAVE_KEY,
    value: relicState,
  });
  await page.reload();
  await waitForHollow(page);
  await dragCell(page, 0, 1);
  assert.equal(await pieceCount(page), 0, "Completed Ogres must leave the active board");
  assert.equal(await page.locator("#relic-count").innerText(), "1");
  assert.match(await page.locator("#game-status").innerText(), /entered the Hoard Chamber/);
  await page.locator("#hoard-open").click();
  assert.match(await page.locator("#hoard-dialog").innerText(), /1 Relic Blossom/);
  assert.equal(await page.locator("#hoard-dialog canvas.sprite-canvas").count(), 1, "Hoard must render the relic art");
  await page.screenshot({ path: `${OUTPUT_DIR}/${name}-relic.png`, fullPage: true });
  await page.locator('[data-close-dialog="hoard-dialog"]').click();

  page.once("dialog", (dialog) => dialog.accept());
  await page.locator("#reset").click();
  assert.equal(await pieceCount(page), STARTING_PIECES);
}

const results = [];

for (const configuration of configurations) {
  let browser;
  let page;
  const consoleErrors = [];
  const pageErrors = [];
  try {
    browser = await configuration.browserType.launch({ headless: true });
    const context = await browser.newContext(configuration.contextOptions);
    page = await context.newPage();
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));

    await page.goto(BASE_URL, { waitUntil: "networkidle" });
    await page.evaluate(() => localStorage.clear());
    await page.reload({ waitUntil: "networkidle" });
    await waitForHollow(page);

    const inspection = await assertAtlasAndLayout(page);
    await page.screenshot({ path: `${OUTPUT_DIR}/${configuration.name}-initial.png`, fullPage: true });
    await runInteractionSequence(page, configuration.name);

    assert.deepEqual(pageErrors, [], `Page errors: ${pageErrors.join(" | ")}`);
    assert.deepEqual(consoleErrors, [], `Console errors: ${consoleErrors.join(" | ")}`);
    results.push({
      name: configuration.name,
      passed: true,
      ...inspection,
      consoleErrors,
      pageErrors,
    });
    await context.close();
  } catch (error) {
    if (page) {
      await page.screenshot({ path: `${OUTPUT_DIR}/${configuration.name}-failure.png`, fullPage: true }).catch(() => {});
    }
    results.push({
      name: configuration.name,
      passed: false,
      error: error instanceof Error ? error.stack : String(error),
      consoleErrors,
      pageErrors,
    });
  } finally {
    await browser?.close().catch(() => {});
  }
}

await writeFile(`${OUTPUT_DIR}/summary.json`, `${JSON.stringify(results, null, 2)}\n`);
const failures = results.filter((result) => !result.passed);
if (failures.length > 0) {
  console.error(JSON.stringify(results, null, 2));
  process.exitCode = 1;
} else {
  console.log(JSON.stringify(results, null, 2));
}
