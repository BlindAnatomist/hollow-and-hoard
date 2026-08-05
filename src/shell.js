export function shellMarkup(memoryClasses) {
  return `
    <main class="world ${memoryClasses}" id="world">
      <div class="moon-haze" aria-hidden="true"></div>
      <div class="fireflies" aria-hidden="true">${Array.from({ length: 16 }, (_, index) => `<i style="--i:${index}"></i>`).join("")}</div>
      <section id="intro-screen" class="intro-screen" aria-labelledby="intro-title">
        <div class="intro-art" id="intro-art" aria-hidden="true"></div>
        <div class="intro-card">
          <p class="eyebrow">A moonlit merging hollow</p>
          <h1 id="intro-title" tabindex="-1">Hollow &amp; Hoard</h1>
          <p class="story-lead">In an old sanctuary, forgotten creatures remember what they can become.</p>
          <p>Drag a creature to an empty stone to move it. Bring two of the same family and form together to awaken the next stage.</p>
          <p>When a lineage is complete, it leaves a relic. The Hoard is not treasure taken away. It is what the Hollow remembers.</p>
          <button id="start-game" class="primary-action" type="button">Start Game</button>
        </div>
      </section>
      <section id="game-screen" class="game-screen" aria-label="Hollow and Hoard game">
        <header class="game-header">
          <button id="story-open" class="round-control" type="button">Story</button>
          <div class="title-group"><p class="eyebrow">What the Hollow remembers</p><h1 tabindex="-1">Hollow &amp; Hoard</h1></div>
          <button id="sound-toggle" class="round-control" type="button">Sound on</button>
        </header>
        <section class="places" aria-label="Hollow places">
          <button id="summon-goblin" class="place-card goblin-place" type="button"><span id="goblin-spawner-art" class="place-art" aria-hidden="true"></span><span><strong>Goblin Spawner</strong><small>Summon two Imps</small></span></button>
          <button id="summon-gargoyle" class="place-card gargoyle-place" type="button"><span id="gargoyle-nest-art" class="place-art" aria-hidden="true"></span><span><strong>Moonstone Nest</strong><small>Awaken two Mosscaps</small></span></button>
        </section>
        <section class="board-surround"><div class="memory-mark warm-memory" aria-hidden="true"></div><div class="memory-mark moon-memory" aria-hidden="true"></div><div id="board" class="board" aria-label="Five by five creature board"></div></section>
        <section class="lower-actions" aria-label="Game records and controls">
          <button id="codex-open" class="record-card" type="button"><span id="codex-art" class="record-art" aria-hidden="true"></span><span><strong>Codex</strong><small>Creature lineages</small></span></button>
          <button id="hoard-open" class="record-card hoard-card" type="button"><span id="hoard-art" class="record-art" aria-hidden="true"></span><span><strong>Hoard Chamber</strong><small id="relic-summary">Nothing remembered yet</small></span></button>
        </section>
        <section class="utility-controls" aria-label="Game controls"><button id="undo" class="text-control" type="button">Undo</button><button id="reset" class="text-control" type="button">Reset hollow</button></section>
        <p id="game-status" class="game-status" aria-live="polite"></p>
      </section>
    </main>
    <dialog id="codex-dialog" class="storybook-dialog"><header><div><p class="eyebrow">Field journal</p><h2>Codex of the Hollow</h2></div><button class="dialog-close" data-close="codex-dialog" type="button">Close</button></header><div id="codex-list" class="codex-families"></div></dialog>
    <dialog id="hoard-dialog" class="storybook-dialog"><header><div><p class="eyebrow">What the Hollow remembers</p><h2>Hoard Chamber</h2></div><button class="dialog-close" data-close="hoard-dialog" type="button">Close</button></header><p class="hoard-intro">Every relic is the lasting form of what a lineage learned.</p><div id="hoard-content" class="hoard-content"></div></dialog>
  `;
}
