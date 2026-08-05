from __future__ import annotations

import base64
import json
import pathlib
import re
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
OUT = ROOT / "test-output" / "clean-rebuild"
OUT.mkdir(parents=True, exist_ok=True)

IMPORT_FROM = re.compile(r'from\s+["\'](\./[^"\']+)["\']')
SIDE_EFFECT_IMPORT = re.compile(r'import\s+["\'](\./[^"\']+)["\']')


def module_url(path: pathlib.Path, cache: dict[pathlib.Path, str]) -> str:
    path = path.resolve()
    if path in cache:
        return cache[path]
    source = path.read_text()
    dependencies = set(IMPORT_FROM.findall(source)) | set(SIDE_EFFECT_IMPORT.findall(source))
    for dependency in dependencies:
        target = (path.parent / dependency).resolve()
        url = module_url(target, cache)
        source = source.replace(f'"{dependency}"', json.dumps(url))
        source = source.replace(f"'{dependency}'", json.dumps(url))
    encoded = base64.b64encode(source.encode()).decode()
    url = f"data:text/javascript;base64,{encoded}"
    cache[path] = url
    return url


def document_markup() -> str:
    css = "\n".join((SRC / name).read_text() for name in ("base.css", "game.css"))
    app_url = module_url(SRC / "app.js", {})
    return f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>{css}</style></head><body><div id="app"></div><script>
const __store = new Map();
Object.defineProperty(window, "localStorage", {{ configurable: true, value: {{
  getItem(key) {{ return __store.has(key) ? __store.get(key) : null; }},
  setItem(key, value) {{ __store.set(key, String(value)); }},
  removeItem(key) {{ __store.delete(key); }},
  clear() {{ __store.clear(); }}
}}}});
</script><script type="module" src="{app_url}"></script></body></html>"""


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(
        executable_path="/usr/bin/chromium",
        headless=True,
        args=["--no-sandbox", "--disable-dev-shm-usage"],
    )
    page = browser.new_page(viewport={"width": 430, "height": 932}, device_scale_factor=2)
    errors: list[str] = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.on("console", lambda message: errors.append(message.text) if message.type == "error" else None)
    page.set_content(document_markup(), wait_until="domcontentloaded")
    page.locator("#intro-title").wait_for(timeout=10000)
    assert page.locator("#intro-title").inner_text() == "Hollow & Hoard"
    assert page.locator("svg.vector-art").count() >= 1
    page.screenshot(path=str(OUT / "mobile-intro.png"), full_page=True)
    page.locator("#start-game").click()
    assert page.locator("#board .board-cell").count() == 25
    assert page.locator('[data-family="goblin"]').count() == 4
    assert page.locator('[data-family="gargoyle"]').count() == 4
    page.locator("#summon-goblin").click()
    assert page.locator('[data-family="goblin"]').count() == 6
    page.locator("#summon-gargoyle").click()
    assert page.locator('[data-family="gargoyle"]').count() == 6
    page.locator("#codex-open").click()
    assert page.locator("#codex-dialog").get_attribute("open") is not None
    page.locator('[data-close="codex-dialog"]').click()
    page.locator("#hoard-open").click()
    assert page.locator("#hoard-dialog").get_attribute("open") is not None
    page.locator('[data-close="hoard-dialog"]').click()
    page.screenshot(path=str(OUT / "mobile-game.png"), full_page=True)

    page.set_viewport_size({"width": 1280, "height": 900})
    page.screenshot(path=str(OUT / "desktop-game.png"), full_page=True)
    summary = {
        "mobile_viewport": "430x932",
        "desktop_viewport": "1280x900",
        "cells": 25,
        "goblins_after_spawn": 6,
        "gargoyles_after_spawn": 6,
        "vector_art": page.locator("svg.vector-art").count(),
        "errors": errors,
    }
    (OUT / "summary.json").write_text(json.dumps(summary, indent=2) + "\n")
    browser.close()
    assert errors == [], errors
