let context = null;
let muted = false;

function audioContext() {
  if (muted) return null;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;
  if (!context) context = new AudioContext();
  if (context.state === "suspended") context.resume().catch(() => {});
  return context;
}

function tone({ frequency, duration = 0.12, gain = 0.025, delay = 0, type = "triangle" }) {
  const ctx = audioContext();
  if (!ctx) return;

  const start = ctx.currentTime + delay;
  const stop = start + duration;
  const oscillator = ctx.createOscillator();
  const filter = ctx.createBiquadFilter();
  const envelope = ctx.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(650, start);
  filter.Q.setValueAtTime(0.45, start);

  envelope.gain.setValueAtTime(0.0001, start);
  envelope.gain.exponentialRampToValueAtTime(gain, start + Math.min(0.025, duration / 3));
  envelope.gain.exponentialRampToValueAtTime(0.0001, stop);

  oscillator.connect(filter);
  filter.connect(envelope);
  envelope.connect(ctx.destination);
  oscillator.start(start);
  oscillator.stop(stop + 0.02);
}

export function setMuted(value) {
  muted = Boolean(value);
  return muted;
}

export function isMuted() {
  return muted;
}

export function pickupCue() {
  tone({ frequency: 110, duration: 0.07, gain: 0.014 });
}

export function relocationCue() {
  tone({ frequency: 98, duration: 0.09, gain: 0.016 });
}

export function deniedCue() {
  tone({ frequency: 82.4, duration: 0.11, gain: 0.012, type: "sine" });
}

export function mergeCue(tier = 0) {
  const root = Math.min(130.8 + tier * 8, 164.8);
  tone({ frequency: root, duration: 0.16, gain: 0.022 });
  tone({ frequency: root * 1.25, duration: 0.18, gain: 0.014, delay: 0.035 });
}

export function relicCue() {
  [98, 123.5, 146.8].forEach((frequency, index) => {
    tone({
      frequency,
      duration: 0.72,
      gain: index === 0 ? 0.024 : 0.014,
      delay: index * 0.055,
      type: "sine",
    });
  });
}
