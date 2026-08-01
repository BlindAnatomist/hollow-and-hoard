const BASE64_PATH = "../assets/art-development/provisional/first-playable-atlas.webp.base64";
const MAP_PATH = "../assets/art-development/provisional/atlas-map.json";

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

export function loadAtlas() {
  if (atlasPromise) return atlasPromise;

  atlasPromise = Promise.all([
    fetch(new URL(BASE64_PATH, import.meta.url)).then((response) => {
      if (!response.ok) throw new Error("The preserved atlas transport file is missing.");
      return response.text();
    }),
    fetch(new URL(MAP_PATH, import.meta.url)).then((response) => {
      if (!response.ok) throw new Error("The atlas coordinate map is missing.");
      return response.json();
    }),
  ]).then(async ([base64, map]) => {
    const source = `data:image/webp;base64,${base64.trim()}`;
    const image = await loadImage(source);
    const [expectedWidth, expectedHeight] = map.dimensions;
    if (image.naturalWidth !== expectedWidth || image.naturalHeight !== expectedHeight) {
      throw new Error(
        `Atlas dimensions do not match the manifest: ${image.naturalWidth}x${image.naturalHeight}.`
      );
    }
    return Object.freeze({ image, map });
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
