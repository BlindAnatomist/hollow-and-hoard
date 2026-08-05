import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import test from "node:test";

const ROOT = resolve(import.meta.dirname, "..");

async function text(path) {
  return readFile(resolve(ROOT, path), "utf8");
}

test("HTML loads the clean modular entry point and both stylesheets", async () => {
  const html = await text("index.html");
  assert.match(html, /src="\.\/src\/app\.js"/);
  assert.match(html, /href="\.\/src\/base\.css"/);
  assert.match(html, /href="\.\/src\/game\.css"/);
  assert.doesNotMatch(html, /production-atlas|transport\/v2|temporary-v2/);
});

test("every relative JavaScript import resolves to a tracked source file", async () => {
  const files = [
    "src/app.js", "src/audio.js", "src/gameLogic.js", "src/interaction.js", "src/render.js",
    "src/runtime.js", "src/shell.js", "src/storage.js", "src/visuals.js",
  ];
  for (const file of files) {
    const source = await text(file);
    const imports = [...source.matchAll(/from\s+["'](\.\.?\/[^"']+)["']/g)].map((match) => match[1]);
    for (const imported of imports) {
      const destination = resolve(ROOT, dirname(file), imported);
      await assert.doesNotReject(access(destination), `${file} imports missing ${imported}`);
    }
  }
});

test("clean shell contains the story, two dwellings, board, Codex, and Hoard surfaces", async () => {
  const shell = await text("src/shell.js");
  for (const id of [
    "intro-screen", "start-game", "game-screen", "summon-goblin", "summon-gargoyle",
    "board", "codex-open", "hoard-open", "undo", "reset",
  ]) assert.match(shell, new RegExp(`id=\\"${id}\\"`));
  assert.match(shell, /The Hoard is not treasure taken away\. It is what the Hollow remembers\./);
});

test("clean rebuild contains no dependency on corrupted Version 2 transport", async () => {
  const files = ["src/app.js", "src/render.js", "src/interaction.js", "src/visuals.js"];
  const combined = (await Promise.all(files.map(text))).join("\n");
  assert.doesNotMatch(combined, /production-atlas|base64\.part|source\.zip|PR comment|transport\/v2/);
});
