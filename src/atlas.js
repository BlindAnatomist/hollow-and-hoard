const BASE64_PART_PATHS = [
  "../assets/art-development/provisional/first-playable-atlas.webp.base64.part-01",
  "../assets/art-development/provisional/first-playable-atlas.webp.base64.part-02",
  "../assets/art-development/provisional/first-playable-atlas.webp.base64.part-03",
  "../assets/art-development/provisional/first-playable-atlas.webp.base64.part-04",
];
const MAP_PATH = "../assets/art-development/provisional/atlas-map.json";
const EXPECTED_BASE64_CHARACTERS = 36_160;
const EXPECTED_DECODED_BYTES = 27_118;
const EXPECTED_SHA256 = "f460c77a7caec6e8d6b92f1cf847a6758128e901797dfc6f81cf2d18dd2a04d8";

let atlasPromise = null;

function loadImage(source) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("The preserved art atlas could not be decoded."));
    image.src = source;
  });
}

async function fetchText(path, missingMessage) {
  const response = await fetch(new URL(path, import.meta.url));
  if (!response.ok) throw new Error(missingMessage);
  return response.text();
}

function normalizeBase64(value) {
  return value.replace(/\s+/g, "");
}

function decodeBase64(base64) {
  let binary;
  try {
    binary = atob(base64);
  } catch {
    throw new Error("The preserved atlas transport is not valid Base64.");
  }

  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

function bytesToHex(bytes) {
  return [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function verifyAtlasBytes(bytes) {
  if (bytes.length !== EXPECTED_DECODED_BYTES) {
    throw new Error(`Atlas byte count does not match the manifest: ${bytes.length}.`);
  }

  const riff = String.fromCharCode(...bytes.subarray(0, 4));
  const webp = String.fromCharCode(...bytes.subarray(8, 12));
  if (riff !== "RIFF" || webp !== "WEBP") {
    throw new Error("The preserved atlas transport does not contain a WebP file.");
  }

  if (globalThis.crypto?.subtle) {
    const digest = await globalThis.crypto.subtle.digest("SHA-256", bytes);
    const actualHash = bytesToHex(new Uint8Array(digest));
    if (actualHash !== EXPECTED_SHA256) {
      throw new Error("The preserved atlas SHA-256 does not match the manifest.");
    }
  }
}

export function loadAtlas() {
  if (atlasPromise) return atlasPromise;

  atlasPromise = Promise.all([
    Promise.all(
      BASE64_PART_PATHS.map((path, index) =>
        fetchText(path, `The preserved atlas transport part ${index + 1} is missing.`)
      )
    ),
    fetch(new URL(MAP_PATH, import.meta.url)).then((response) => {
      if (!response.ok) throw new Error("The atlas coordinate map is missing.");
      return response.json();
    }),
  ]).then(async ([parts, map]) => {
    const base64 = normalizeBase64(parts.join(""));
    if (base64.length !== EXPECTED_BASE64_CHARACTERS) {
      throw new Error(`Atlas Base64 length does not match the manifest: ${base64.length}.`);
    }

    const bytes = decodeBase64(base64);
    await verifyAtlasBytes(bytes);

    const objectUrl = URL.createObjectURL(new Blob([bytes], { type: "image/webp" }));
    const image = await loadImage(objectUrl);
    const [expectedWidth, expectedHeight] = map.dimensions;
    if (image.naturalWidth !== expectedWidth || image.naturalHeight !== expectedHeight) {
      URL.revokeObjectURL(objectUrl);
      throw new Error(
        `Atlas dimensions do not match the manifest: ${image.naturalWidth}x${image.naturalHeight}.`
      );
    }

    return Object.freeze({ image, map, objectUrl });
  });

  return atlasPromise;
}

export function createSpriteCanvas(atlas, spriteName, className = "") {
  const sprite = atlas.map.sprites[spriteName];
  if (!sprite) throw new Error(`Unknown atlas sprite: ${spriteName}`);

  const canvas = document.createElement("canvas");
  canvas.width = sprite.width;
  canvas.height = sprite.height;
  canvas.className = `sprite-canvas ${className}`.trim();
  canvas.setAttribute("aria-hidden", "true");

  const context = canvas.getContext("2d", { alpha: true });
  if (!context) throw new Error("Canvas rendering is unavailable.");
  context.clearRect(0, 0, sprite.width, sprite.height);
  context.drawImage(
    atlas.image,
    sprite.x,
    sprite.y,
    sprite.width,
    sprite.height,
    0,
    0,
    sprite.width,
    sprite.height
  );

  return canvas;
}

export function replaceWithSprite(container, atlas, spriteName, className = "") {
  container.replaceChildren(createSpriteCanvas(atlas, spriteName, className));
}
