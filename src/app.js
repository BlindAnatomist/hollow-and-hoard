import { shellMarkup } from "./shell.js";
import { memoryClasses, rt } from "./runtime.js";
import { bindInteractions } from "./interaction.js";
import { renderAll } from "./render.js";
import { startAmbient } from "./audio.js";

const app = document.querySelector("#app");
app.innerHTML = shellMarkup(memoryClasses());
bindInteractions(renderAll);
renderAll();
if (rt.screen === "game") startAmbient();
