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

const GOBLIN = {
  skin: ["#9fb976", "#819d63", "#748b59", "#697d55", "#78875f"],
  dark: ["#476044", "#3f553d", "#354735", "#344234", "#404c3d"],
  cloth: ["#665566", "#5a4a5f", "#4e4156", "#51464f", "#584850"],
  amber: ["#edc86f", "#e0aa57", "#cf9851", "#dbad64", "#efc878"],
};

function eyePair(y = 47, spread = 9, light = "#f7edc8") {
  return `<g class="face-eyes"><circle cx="${50 - spread}" cy="${y}" r="4.2" fill="#17161a"/><circle cx="${50 + spread}" cy="${y}" r="4.2" fill="#17161a"/><circle cx="${49 - spread}" cy="${y - 1.4}" r="1.3" fill="${light}"/><circle cx="${49 + spread}" cy="${y - 1.4}" r="1.3" fill="${light}"/></g>`;
}

function lantern(x, y, amber, scale = 1) {
  return `<g class="lantern" transform="translate(${x} ${y}) scale(${scale})">
    <path d="M0 -13 V-3" stroke="#60472c" stroke-width="3.5" stroke-linecap="round"/>
    <rect x="-7" y="-4" width="14" height="18" rx="4" fill="#6a5031" stroke="#3d2e20" stroke-width="2.6"/>
    <rect x="-4.2" y="-.5" width="8.4" height="10.5" rx="3" fill="${amber}" class="lantern-flame"/>
    <circle cx="0" cy="5" r="12" fill="${amber}" opacity=".18" class="lantern-aura"/>
  </g>`;
}

function goblin(piece) {
  const tier = piece.tier;
  const skin = GOBLIN.skin[tier];
  const dark = GOBLIN.dark[tier];
  const cloth = GOBLIN.cloth[tier];
  const amber = GOBLIN.amber[tier];
  const shadow = `<ellipse cx="50" cy="89" rx="31" ry="6" fill="#0a0d0c" opacity=".35"/>`;

  const bodies = [
    `${shadow}
      <g class="imp-body">
        <path class="imp-sprout" d="M49 28 Q42 16 35 19 Q36 29 48 33 M51 28 Q60 16 66 22 Q63 31 52 34" fill="#789864" stroke="#3c533d" stroke-width="2.8" stroke-linejoin="round"/>
        <path d="M30 44 L10 35 Q15 54 31 58 M70 44 L90 35 Q85 54 69 58" fill="${skin}" stroke="${dark}" stroke-width="3.2" stroke-linejoin="round"/>
        <ellipse cx="50" cy="52" rx="23" ry="21" fill="${skin}" stroke="${dark}" stroke-width="3.2"/>
        <path d="M34 71 Q50 63 66 71 L70 87 Q50 92 30 87Z" fill="${dark}" stroke="#2b3c2d" stroke-width="3"/>
        <path d="M37 41 Q50 34 63 41" fill="none" stroke="#b8ca8d" stroke-width="2.2" opacity=".55" stroke-linecap="round"/>
        ${eyePair(50, 8.5)}
        <path d="M45 62 Q50 66 55 62" fill="none" stroke="${dark}" stroke-width="2.7" stroke-linecap="round"/>
      </g>`,
    `${shadow}
      <g class="goblin-bearer">
        <path d="M31 40 L13 33 Q19 51 32 55 M69 40 L87 33 Q81 51 68 55" fill="${skin}" stroke="${dark}" stroke-width="3"/>
        <ellipse cx="49" cy="48" rx="23" ry="22" fill="${skin}" stroke="${dark}" stroke-width="3.1"/>
        <path d="M28 70 Q49 60 70 70 L73 90 H25Z" fill="${cloth}" stroke="#302936" stroke-width="3"/>
        <path d="M29 72 Q49 66 69 72" fill="none" stroke="#a88962" stroke-width="3"/>
        <path d="M33 34 Q49 25 65 34" fill="none" stroke="#748e5a" stroke-width="6" stroke-linecap="round"/>
        ${eyePair(47, 8.5)}
        <path d="M43 59 Q49 63 56 59" fill="none" stroke="${dark}" stroke-width="2.8" stroke-linecap="round"/>
        ${lantern(76, 71, amber, .92)}
      </g>`,
    `${shadow}
      <g class="hobgoblin-planner">
        <path d="M20 50 Q28 20 50 13 Q74 22 81 50 L71 72 Q50 81 29 71Z" fill="${cloth}" stroke="#2e2734" stroke-width="3.4"/>
        <path d="M31 43 L13 39 Q21 53 32 56 M68 43 L86 39 Q79 53 67 56" fill="${skin}" stroke="${dark}" stroke-width="2.8"/>
        <ellipse cx="49" cy="48" rx="21" ry="20" fill="${skin}" stroke="${dark}" stroke-width="3"/>
        <path d="M28 70 Q49 63 70 70 L78 90 H20Z" fill="#4a3d50" stroke="#2b2530" stroke-width="3"/>
        <path d="M24 74 L38 69" stroke="#b69259" stroke-width="4" stroke-linecap="round"/>
        <rect x="18" y="70" width="15" height="17" rx="5" fill="#7f6241" stroke="#493820" stroke-width="2.5"/>
        ${eyePair(48, 8)}
        <path d="M43 59 Q50 61 56 58" fill="none" stroke="${dark}" stroke-width="2.6" stroke-linecap="round"/>
        <path d="M42 22 Q50 17 58 22" fill="none" stroke="#8d7a91" stroke-width="2.4" opacity=".7"/>
      </g>`,
    `${shadow}
      <g class="troll-builder">
        <path d="M17 62 Q19 39 33 31 Q50 21 67 31 Q81 39 83 62 L78 88 H22Z" fill="${skin}" stroke="${dark}" stroke-width="3.5"/>
        <path d="M20 48 L7 42 Q11 58 24 61 M80 48 L93 42 Q89 58 76 61" fill="${skin}" stroke="${dark}" stroke-width="3"/>
        <ellipse cx="50" cy="48" rx="21" ry="18" fill="#789064" stroke="${dark}" stroke-width="3"/>
        <path d="M18 66 H82" stroke="#8a6d45" stroke-width="7" stroke-linecap="round"/>
        <path d="M29 66 V88 M71 66 V88" stroke="#514332" stroke-width="5"/>
        ${eyePair(47, 8.5)}
        <path d="M41 59 Q50 64 59 59" fill="none" stroke="${dark}" stroke-width="3" stroke-linecap="round"/>
        ${lantern(77, 67, amber, .86)}
      </g>`,
    `${shadow}
      <g class="ogre-guardian">
        <path d="M31 35 Q15 20 19 9 Q34 16 40 31 M69 35 Q85 20 81 9 Q66 16 60 31" fill="${dark}" stroke="#273127" stroke-width="3.2"/>
        <path d="M20 87 Q22 43 34 31 Q50 17 66 31 Q78 43 80 87Z" fill="${skin}" stroke="${dark}" stroke-width="3.7"/>
        <path d="M22 54 Q9 49 8 66 Q16 70 26 65 M78 54 Q91 49 92 66 Q84 70 74 65" fill="${skin}" stroke="${dark}" stroke-width="3"/>
        <ellipse cx="50" cy="43" rx="20" ry="18" fill="#83916d" stroke="${dark}" stroke-width="3.1"/>
        <path d="M26 65 Q50 56 74 65 L78 88 H22Z" fill="${cloth}" stroke="#302937" stroke-width="3"/>
        <path d="M33 68 Q50 77 67 68" fill="none" stroke="#b09a72" stroke-width="4" stroke-linecap="round"/>
        ${eyePair(42, 7.5)}
        <path d="M42 53 Q50 57 58 53" fill="none" stroke="${dark}" stroke-width="3" stroke-linecap="round"/>
        ${lantern(50, 76, amber, .82)}
      </g>`,
  ];

  return svg(`creature goblin tier-${tier}`, `Goblin lineage tier ${tier + 1}`, bodies[tier]);
}

const STONE = ["#747b73", "#817f87", "#6f6c79", "#5c5965"];

function stoneEyes(y, spread = 8) {
  return `<g class="stone-eyes"><circle class="gargoyle-eye" cx="${50 - spread}" cy="${y}" r="3.6" fill="#c7b4ee"/><circle class="gargoyle-eye" cx="${50 + spread}" cy="${y}" r="3.6" fill="#c7b4ee"/></g>`;
}

function gargoyle(piece) {
  const tier = piece.tier;
  const stone = STONE[tier];
  const edge = "#403d47";
  const shadow = `<ellipse cx="50" cy="90" rx="31" ry="6" fill="#0d0f14" opacity=".34"/>`;
  const bodies = [
    `${shadow}
      <g class="mosscap-stone">
        <path d="M23 81 Q25 58 36 48 Q50 38 64 48 Q76 58 78 81Z" fill="${stone}" stroke="${edge}" stroke-width="3.4"/>
        <path class="moss-tuft" d="M24 61 Q29 43 42 48 Q50 33 60 47 Q74 39 78 58" fill="none" stroke="#68805f" stroke-width="9" stroke-linecap="round"/>
        <path d="M31 76 Q50 69 69 76" fill="none" stroke="#5a605b" stroke-width="2.4" opacity=".7"/>
        ${stoneEyes(63, 7)}
      </g>`,
    `${shadow}
      <g class="gargoyle-hatchling">
        <path class="wing left-wing" d="M35 53 Q18 42 12 61 Q23 59 33 72" fill="${stone}" stroke="${edge}" stroke-width="3"/>
        <path class="wing right-wing" d="M65 53 Q82 42 88 61 Q77 59 67 72" fill="${stone}" stroke="${edge}" stroke-width="3"/>
        <path d="M31 48 Q50 30 69 48 L67 72 Q61 85 50 87 Q39 85 33 72Z" fill="${stone}" stroke="${edge}" stroke-width="3.3"/>
        <path d="M35 48 L29 37 L42 43 M65 48 L71 37 L58 43" fill="${stone}" stroke="${edge}" stroke-width="2.7"/>
        <path class="moss-tuft" d="M36 40 Q44 33 51 39 Q59 31 66 41" fill="none" stroke="#6e8065" stroke-width="5" stroke-linecap="round"/>
        ${stoneEyes(57)}
        <path d="M43 68 Q50 64 57 68" fill="none" stroke="${edge}" stroke-width="2.7"/>
      </g>`,
    `${shadow}
      <g class="gargoyle-watcher">
        <path class="wing left-wing" d="M36 49 Q16 29 7 51 L21 49 L13 66 L34 70Z" fill="${stone}" stroke="${edge}" stroke-width="3.2" stroke-linejoin="round"/>
        <path class="wing right-wing" d="M64 49 Q84 29 93 51 L79 49 L87 66 L66 70Z" fill="${stone}" stroke="${edge}" stroke-width="3.2" stroke-linejoin="round"/>
        <path d="M34 41 L30 23 L43 35 L50 17 L58 35 L71 23 L66 43" fill="${stone}" stroke="${edge}" stroke-width="3.2" stroke-linejoin="round"/>
        <path d="M29 48 Q50 28 71 48 L68 75 Q61 87 50 88 Q39 87 32 75Z" fill="${stone}" stroke="${edge}" stroke-width="3.5"/>
        <path class="stone-highlight" d="M38 45 Q50 37 61 45" fill="none" stroke="#9b98a4" stroke-width="2.5" opacity=".55"/>
        ${stoneEyes(57, 8.5)}
        <path d="M42 70 Q50 65 58 70" fill="none" stroke="${edge}" stroke-width="3"/>
      </g>`,
    `${shadow}
      <g class="elder-keeper">
        <path d="M17 88 V58 L28 42 L31 19 L43 35 L50 10 L57 35 L69 19 L72 42 L83 58 V88Z" fill="#4f4d58" stroke="#35333b" stroke-width="3.6" stroke-linejoin="round"/>
        <path class="wing left-wing" d="M34 49 L12 34 L16 54 L6 66 L31 73Z" fill="${stone}" stroke="${edge}" stroke-width="3.2" stroke-linejoin="round"/>
        <path class="wing right-wing" d="M66 49 L88 34 L84 54 L94 66 L69 73Z" fill="${stone}" stroke="${edge}" stroke-width="3.2" stroke-linejoin="round"/>
        <path d="M30 46 Q50 27 70 46 L67 73 Q61 84 50 86 Q39 84 33 73Z" fill="${stone}" stroke="${edge}" stroke-width="3.5"/>
        <path class="moss-tuft" d="M26 44 Q35 35 43 41 Q52 31 61 40 Q70 34 77 44" fill="none" stroke="#60725a" stroke-width="5.5" stroke-linecap="round"/>
        <path class="stone-highlight" d="M39 45 Q50 38 61 45" fill="none" stroke="#8e8a97" stroke-width="2.2" opacity=".55"/>
        ${stoneEyes(56, 8)}
        <path d="M41 69 H59" stroke="${edge}" stroke-width="3" stroke-linecap="round"/>
        <path d="M23 88 H77" stroke="#887da0" stroke-width="3" opacity=".45"/>
      </g>`,
  ];
  return svg(`creature gargoyle tier-${tier}`, `Gargoyle lineage tier ${tier + 1}`, bodies[tier]);
}

function relic(family) {
  if (family === "goblin") {
    return svg("relic goblin-relic", "Relic Blossom", `
      <ellipse cx="50" cy="90" rx="31" ry="6" fill="#11131a" opacity=".3"/>
      <path d="M29 86 Q31 70 50 67 Q69 70 71 86Z" fill="#665640" stroke="#382e22" stroke-width="3"/>
      <path d="M50 72 V43" stroke="#61794f" stroke-width="7" stroke-linecap="round"/>
      <path d="M48 61 Q28 51 25 66 Q35 72 49 66 M52 58 Q73 46 77 62 Q67 69 52 65" fill="#7e9b64" stroke="#526746" stroke-width="2"/>
      <g class="relic-glow" fill="#e9bd63" stroke="#8b6333" stroke-width="2.6"><circle cx="50" cy="33" r="11"/><circle cx="35" cy="39" r="10"/><circle cx="65" cy="39" r="10"/><circle cx="41" cy="24" r="10"/><circle cx="59" cy="24" r="10"/><circle cx="50" cy="34" r="7" fill="#fff0a8"/></g>
      <circle class="relic-aura" cx="50" cy="34" r="24" fill="#e7bb64" opacity=".12"/>`);
  }
  return svg("relic gargoyle-relic", "Moonlit Relic", `
    <ellipse cx="50" cy="90" rx="31" ry="6" fill="#11131a" opacity=".3"/>
    <path d="M24 86 Q27 68 35 57 Q42 48 50 48 Q58 48 65 57 Q73 68 76 86Z" fill="#5a5763" stroke="#37343d" stroke-width="3"/>
    <path d="M33 57 Q50 40 67 57" fill="none" stroke="#8a8297" stroke-width="4"/>
    <path class="relic-crystal" d="M50 17 L62 41 L50 70 L38 41Z" fill="#aa94d5" stroke="#514867" stroke-width="3.5"/>
    <circle class="relic-aura" cx="50" cy="42" r="23" fill="none" stroke="#d8c8f1" stroke-width="3" opacity=".72"/>
    <path d="M50 14 V7 M30 25 L23 18 M70 25 L77 18" stroke="#d8c8f1" stroke-width="2.6" stroke-linecap="round"/>`);
}

function world(name) {
  const shadow = `<ellipse cx="50" cy="89" rx="34" ry="6" fill="#101119" opacity=".34"/>`;
  const bodies = {
    "world.goblinSpawner": `${shadow}
      <path d="M20 82 L25 42 Q32 25 50 22 Q68 25 75 42 L80 82Z" fill="#665442" stroke="#30271f" stroke-width="3.7"/>
      <path d="M35 82 V57 Q50 43 65 57 V82" fill="#201d20" stroke="#382f2b" stroke-width="2.8"/>
      <path d="M25 45 Q17 42 15 57 M75 45 Q83 42 85 57" stroke="#6c835d" stroke-width="6" stroke-linecap="round"/>
      <circle class="dwelling-glow lantern-aura" cx="50" cy="39" r="15" fill="#dca653" opacity=".17"/>
      <circle class="lantern-flame" cx="50" cy="39" r="7" fill="#e4ae58" stroke="#77572f" stroke-width="2.5"/>
      <path d="M31 33 Q50 23 69 33" fill="none" stroke="#8e7656" stroke-width="3"/>`,
    "world.moonstoneNest": `${shadow}
      <path d="M19 82 Q23 47 34 33 Q43 22 50 18 Q57 22 66 33 Q77 47 81 82Z" fill="#666574" stroke="#373540" stroke-width="3.7"/>
      <path d="M34 82 Q36 58 50 51 Q64 58 66 82" fill="#211f29" stroke="#3a3743" stroke-width="2.6"/>
      <path d="M25 56 Q16 47 20 35 M75 56 Q84 47 80 35" stroke="#6f8063" stroke-width="6" stroke-linecap="round"/>
      <circle class="dwelling-glow moonstone-glow" cx="50" cy="32" r="15" fill="#ab96d5" opacity=".14"/>
      <path class="moonstone-core" d="M50 22 L58 33 L50 44 L42 33Z" fill="#b4a0dd" stroke="#635a77" stroke-width="2.5"/>`,
    "world.hoard": `${shadow}
      <path d="M18 83 V43 Q23 27 50 20 Q77 27 82 43 V83Z" fill="#64584c" stroke="#332c28" stroke-width="3.7"/>
      <path d="M31 83 V54 Q50 38 69 54 V83" fill="#272128" stroke="#40343a" stroke-width="2.8"/>
      <path d="M26 40 H74" stroke="#9a8564" stroke-width="5" stroke-linecap="round"/>
      <circle class="lantern-aura" cx="50" cy="60" r="14" fill="#d5aa62" opacity=".14"/>
      <circle class="lantern-flame" cx="50" cy="60" r="6" fill="#d9ae61" stroke="#74572f" stroke-width="2.4"/>`,
    "ui.codex": `<path d="M16 25 Q35 15 50 28 V83 Q34 68 16 76Z" fill="#b99a69" stroke="#4d3c2a" stroke-width="3.5"/><path d="M84 25 Q65 15 50 28 V83 Q66 68 84 76Z" fill="#cfb583" stroke="#4d3c2a" stroke-width="3.5"/><path d="M50 28 V83" stroke="#4d3c2a" stroke-width="2.8"/><path d="M27 38 H41 M27 47 H41 M27 56 H39 M59 38 H73 M59 47 H73 M61 56 H73" stroke="#755f41" stroke-width="2.5" stroke-linecap="round"/><path d="M22 29 Q34 23 45 31" fill="none" stroke="#e0c99c" stroke-width="2" opacity=".65"/>`,
    "story.hollow": `<circle class="story-moon" cx="72" cy="23" r="17" fill="#d9cff0" opacity=".9"/><circle cx="72" cy="23" r="25" fill="#d9cff0" opacity=".07"/><path d="M0 79 Q20 50 43 67 Q65 40 100 72 V100 H0Z" fill="#273029"/><path d="M0 88 Q24 70 45 82 Q68 62 100 84 V100 H0Z" fill="#1b231e"/><path d="M12 87 Q27 53 43 87 M56 88 Q72 45 90 87" fill="#161d19" stroke="#607158" stroke-width="4"/><circle class="story-lantern" cx="29" cy="61" r="4" fill="#e2bd69"/><circle class="story-lantern" cx="60" cy="72" r="3" fill="#e2bd69"/><circle class="story-lantern" cx="81" cy="53" r="3" fill="#e2bd69"/><path d="M16 88 Q28 80 40 88 M60 88 Q73 78 87 88" fill="none" stroke="#6d7f61" stroke-width="3" opacity=".7"/>`,
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
