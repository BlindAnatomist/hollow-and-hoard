export function formatRelicSummary(value) {
  const count = Number.isFinite(Number(value)) ? Math.max(0, Math.trunc(Number(value))) : 0;
  return `${count} ${count === 1 ? "Relic Blossom" : "Relic Blossoms"}`;
}

export function installRelicSummary() {
  if (typeof document === "undefined") return;

  const count = document.querySelector("#relic-count");
  const summary = count?.closest("small");
  if (!count || !summary) return;

  const update = () => {
    const label = formatRelicSummary(count.textContent);
    if (summary.textContent === label) return;
    summary.replaceChildren(count, document.createTextNode(label.slice(count.textContent.length)));
  };

  new MutationObserver(update).observe(count, {
    childList: true,
    characterData: true,
    subtree: true,
  });
  update();
}

installRelicSummary();
