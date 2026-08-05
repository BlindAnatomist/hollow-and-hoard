let context;
let muted = localStorage.getItem("hollow-and-hoard-muted") === "true";
let ambientTimer;

function ensureContext() {
  if (!context) context = new (window.AudioContext || window.webkitAudioContext)();
  if (context.state === "suspended") context.resume();
  return context;
}

function tone({ frequency = 160, duration = 0.16, gain = 0.06, type = "sine", slide = 0 }) {
  if (muted) return;
  const ctx = ensureContext();
  const oscillator = ctx.createOscillator();
  const volume = ctx.createGain();
  const now = ctx.currentTime;
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, now);
  oscillator.frequency.exponentialRampToValueAtTime(Math.max(40, frequency + slide), now + duration);
  volume.gain.setValueAtTime(0.0001, now);
  volume.gain.exponentialRampToValueAtTime(gain, now + 0.025);
  volume.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  oscillator.connect(volume).connect(ctx.destination);
  oscillator.start(now);
  oscillator.stop(now + duration + 0.02);
}

function chord(notes, options = {}) {
  notes.forEach((frequency, index) => window.setTimeout(() => tone({ frequency, ...options }), index * 35));
}

export function isMuted() { return muted; }
export function setMuted(value) {
  muted = Boolean(value);
  localStorage.setItem("hollow-and-hoard-muted", String(muted));
  if (muted) stopAmbient();
  else startAmbient();
}
export const pickupCue = () => tone({ frequency: 130, duration: 0.09, gain: 0.045, slide: 18, type: "triangle" });
export const relocationCue = () => tone({ frequency: 105, duration: 0.13, gain: 0.05, slide: -12, type: "sine" });
export const deniedCue = () => tone({ frequency: 72, duration: 0.18, gain: 0.055, slide: -8, type: "triangle" });
export const spawnCue = (family) => family === "goblin"
  ? chord([110, 146], { duration: 0.18, gain: 0.05, type: "triangle", slide: 10 })
  : chord([82, 123], { duration: 0.22, gain: 0.05, type: "sine", slide: -4 });
export const mergeCue = (family, tier) => family === "goblin"
  ? chord([135 + tier * 16, 180 + tier * 18], { duration: 0.23, gain: 0.06, type: "triangle", slide: 14 })
  : chord([78 + tier * 10, 117 + tier * 12], { duration: 0.28, gain: 0.06, type: "sine", slide: 5 });
export const relicCue = (family) => family === "goblin"
  ? chord([98, 147, 196], { duration: 0.48, gain: 0.065, type: "triangle", slide: 9 })
  : chord([65, 98, 147], { duration: 0.55, gain: 0.065, type: "sine", slide: 4 });
export const openCue = (kind) => tone({ frequency: kind === "codex" ? 145 : 92, duration: 0.16, gain: 0.04, slide: 8, type: "sine" });

export function startAmbient() {
  if (muted || ambientTimer) return;
  ambientTimer = window.setInterval(() => {
    if (document.visibilityState === "visible") tone({ frequency: 54 + Math.random() * 12, duration: 1.2, gain: 0.009, type: "sine", slide: -3 });
  }, 6500);
}
export function stopAmbient() {
  if (ambientTimer) window.clearInterval(ambientTimer);
  ambientTimer = undefined;
}
