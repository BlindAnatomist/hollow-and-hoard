const NS = "http://www.w3.org/2000/svg";

function svg(className, label, body, viewBox = "0 0 100 100") {
  const node = document.createElementNS(NS, "svg");
  node.setAttribute("viewBox", viewBox);
  node.setAttribute("class", `vector-art ${className}`.trim());
  node.setAttribute("aria-hidden", "true");
  node.setAttribute("focusable", "false");
  node.innerHTML = `<title>${label}</title>${body}`;
  return node;
}

const goblinColors = [
  ["#8fa969", "#486442", "#e8bd65"],
  ["#78945c", "#3f573c", "#d29a4d"],
  ["#687f50", "#374837", "#b78648"],
  ["#60744d", "#344334", "#d0a863"],
  ["#75845e", "#46523f", "#e0bd72"],
];

function goblin(piece) {
  const [skin, dark, amber] = goblinColors[piece.tier];
  const scale = 0.78 + piece.tier * 0.055;
  const hood = piece.tier >= 2
    ? `<path d="M28 45 Q50 12 72 45 L66 67 Q50 78 34 67Z" fill="#4b4055" stroke="#251f2b" stroke-width="3"/>`
    : "";
  const lantern = piece.tier === 1 || piece.tier >= 3
    ? `<path d="M73 58 v19" stroke="#5b432b" stroke-width="4"/><rect x="67" y="71" width="13" height="17" rx="4" fill="${amber}" stroke="#5b432b" stroke-width="3"/><circle cx="73.5" cy="78" r="8" fill="${amber}" opacity=".28"/>`
    : "";
  const horns = piece.tier >= 4
    ? `<path d="M31 35 Q18 24 23 14 Q36 21 39 34M69 35 Q82 24 77 14 Q64 21 61 34" fill="${dark}" stroke="#263127" stroke-width="3"/>`
    : "";
  return svg(`creature goblin tier-${piece.tier}`, `Goblin lineage tier ${piece.tier + 1}`, `
    <g transform="translate(${50 - 50 * scale} ${92 - 92 * scale}) scale(${scale})">
      <ellipse cx="50" cy="84" rx="31" ry="9" fill="#10151a" opacity=".35"/>
      ${horns}${hood}
      <path d="M29 41 L12 32 Q18 51 31 56 M71 41 L88 32 Q82 51 69 56" fill="${skin}" stroke="${dark}" stroke-width="3"/>
      <ellipse cx="50" cy="51" rx="25" ry="23" fill="${skin}" stroke="${dark}" stroke-width="3"/>
      <circle cx="41" cy="49" r="4.5" fill="#17151b"/><circle cx="59" cy="49" r="4.5" fill="#17151b"/>
      <circle cx="42" cy="47.5" r="1.3" fill="#f4e8c4"/><circle cx="60" cy="47.5" r="1.3" fill="#f4e8c4"/>
      <path d="M43 61 Q50 66 57 61" fill="none" stroke="${dark}" stroke-width="3" stroke-linecap="round"/>
      <path d="M31 69 Q50 59 69 69 L75 90 H25Z" fill="${dark}" stroke="#263127" stroke-width="3"/>
      ${lantern}
    </g>`);
}

const stoneColors = ["#777a79", "#85818d", "#716b7c", "#5d5969"];

function gargoyle(piece) {
  const stone = stoneColors[piece.tier];
  const wing = piece.tier >= 1
    ? `<path d="M34 49 Q15 36 10 58 Q22 55 31 70 M66 49 Q85 36 90 58 Q78 55 69 70" fill="${stone}" stroke="#403c48" stroke-width="3"/>`
    : `<path d="M32 59 Q16 52 17 68 Q25 65 34 73 M68 59 Q84 52 83 68 Q75 65 66 73" fill="#5f745d" stroke="#3d4e3c" stroke-width="3"/>`;
  const crest = piece.tier >= 2
    ? `<path d="M35 35 L31 18 L44 31 L50 13 L57 31 L70 18 L65 37" fill="${stone}" stroke="#403c48" stroke-width="3"/>`
    : "";
  const moss = piece.tier === 0 || piece.tier === 3
    ? `<path d="M27 43 Q37 30 48 40 Q57 27 71 43" fill="none" stroke="#708665" stroke-width="7" stroke-linecap="round"/>`
    : "";
  return svg(`creature gargoyle tier-${piece.tier}`, `Gargoyle lineage tier ${piece.tier + 1}`, `
    <ellipse cx="50" cy="87" rx="31" ry="8" fill="#11131a" opacity=".34"/>
    ${wing}${crest}${moss}
    <path d="M29 46 Q50 25 71 46 L68 70 Q62 84 50 86 Q38 84 32 70Z" fill="${stone}" stroke="#403c48" stroke-width="3"/>
    <path d="M37 49 L29 40 L41 43 M63 49 L71 40 L59 43" fill="${stone}" stroke="#403c48" stroke-width="3"/>
    <circle cx="42" cy="55" r="4" fill="#b9a5e1"/><circle cx="58" cy="55" r="4" fill="#b9a5e1"/>
    <path d="M43 67 Q50 62 57 67" fill="none" stroke="#403c48" stroke-width="3"/>
    <path d="M38 83 L31 92 M62 83 L69 92" stroke="#403c48" stroke-width="5" stroke-linecap="round"/>
  `);
}

function relic(family) {
  if (family === "goblin") {
    return svg("relic goblin-relic", "Relic Blossom", `
      <ellipse cx="50" cy="87" rx="30" ry="7" fill="#11131a" opacity=".3"/>
      <path d="M50 78 V45" stroke="#688052" stroke-width="7" stroke-linecap="round"/>
      <path d="M48 63 Q28 51 25 68 Q36 72 49 68 M52 58 Q73 45 76 63 Q65 69 52 65" fill="#7e9b64"/>
      <g fill="#e4b85f" stroke="#8c6638" stroke-width="3"><circle cx="50" cy="35" r="11"/><circle cx="35" cy="40" r="11"/><circle cx="65" cy="40" r="11"/><circle cx="40" cy="25" r="11"/><circle cx="60" cy="25" r="11"/><circle cx="50" cy="34" r="8" fill="#fff0a8"/></g>`);
  }
  return svg("relic gargoyle-relic", "Moonlit Relic", `
    <ellipse cx="50" cy="88" rx="31" ry="7" fill="#11131a" opacity=".3"/>
    <path d="M29 82 Q50 69 71 82 L66 91 H34Z" fill="#5f5a69" stroke="#383440" stroke-width="3"/>
    <path d="M50 21 L62 45 L50 73 L38 45Z" fill="#aa94d5" stroke="#514867" stroke-width="4"/>
    <circle cx="50" cy="46" r="18" fill="none" stroke="#d8c8f1" stroke-width="4" opacity=".72"/>
    <path d="M50 17 V9 M30 27 L23 20 M70 27 L77 20" stroke="#d8c8f1" stroke-width="3" stroke-linecap="round"/>`);
}

function world(name) {
  const commonShadow = `<ellipse cx="50" cy="87" rx="34" ry="7" fill="#101119" opacity=".34"/>`;
  const bodies = {
    "world.goblinSpawner": `${commonShadow}<path d="M23 78 L27 38 Q50 17 73 38 L77 78Z" fill="#675547" stroke="#33291f" stroke-width="4"/><path d="M39 78 V55 Q50 43 61 55 V78" fill="#211d21"/><circle cx="50" cy="37" r="9" fill="#d8a455"/><path d="M28 46 Q18 40 16 55 M72 46 Q82 40 84 55" stroke="#70845c" stroke-width="6"/>`,
    "world.moonstoneNest": `${commonShadow}<path d="M22 78 Q28 37 50 22 Q72 37 78 78Z" fill="#696776" stroke="#383541" stroke-width="4"/><path d="M35 78 Q38 57 50 50 Q62 57 65 78" fill="#211f29"/><circle cx="50" cy="31" r="8" fill="#ad98d6"/><path d="M26 55 Q18 45 21 35 M74 55 Q82 45 79 35" stroke="#718164" stroke-width="6"/>`,
    "world.hoard": `${commonShadow}<path d="M20 80 V38 Q50 18 80 38 V80Z" fill="#65594e" stroke="#332c28" stroke-width="4"/><path d="M33 80 V52 Q50 38 67 52 V80" fill="#282129"/><circle cx="50" cy="58" r="8" fill="#d4a85e"/><path d="M27 38 H73" stroke="#9c8766" stroke-width="6"/>`,
    "ui.codex": `<path d="M18 24 Q37 16 50 29 V82 Q36 68 18 75Z" fill="#b99968" stroke="#4d3c2a" stroke-width="4"/><path d="M82 24 Q63 16 50 29 V82 Q64 68 82 75Z" fill="#cfb583" stroke="#4d3c2a" stroke-width="4"/><path d="M50 29 V82" stroke="#4d3c2a" stroke-width="3"/><path d="M28 38 H42 M28 48 H42 M58 38 H72 M58 48 H72" stroke="#735c3d" stroke-width="3"/>`,
    "story.hollow": `<circle cx="72" cy="23" r="17" fill="#d9cff0" opacity=".9"/><path d="M0 78 Q22 48 45 67 Q68 39 100 73 V100 H0Z" fill="#29312b"/><path d="M13 84 Q29 52 44 84 M58 86 Q73 46 89 84" fill="#1a211c" stroke="#627258" stroke-width="4"/><circle cx="30" cy="59" r="4" fill="#e2bd69"/><circle cx="60" cy="70" r="3" fill="#e2bd69"/><circle cx="80" cy="52" r="3" fill="#e2bd69"/>`,
  };
  return svg(`world-art ${name.replaceAll(".", "-")}`, name, bodies[name]);
}

export function createPieceVisual(piece, className = "") {
  const node = piece.family === "goblin" ? goblin(piece) : gargoyle(piece);
  if (className) node.classList.add(...className.split(/\s+/).filter(Boolean));
  return node;
}

export function createRelicVisual(family, className = "") {
  const node = relic(family);
  if (className) node.classList.add(...className.split(/\s+/).filter(Boolean));
  return node;
}

export function createWorldVisual(name, className = "") {
  const node = world(name);
  if (className) node.classList.add(...className.split(/\s+/).filter(Boolean));
  return node;
}
