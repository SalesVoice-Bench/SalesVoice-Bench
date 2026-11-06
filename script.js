const taskTabs = [...document.querySelectorAll(".task-tab")];
const taskPanels = [...document.querySelectorAll(".task-panel")];

function selectTaskLevel(tab, moveFocus = false) {
  taskTabs.forEach((item) => {
    const selected = item === tab;
    item.classList.toggle("is-active", selected);
    item.setAttribute("aria-selected", String(selected));
    item.tabIndex = selected ? 0 : -1;
  });
  taskPanels.forEach((panel) => {
    panel.hidden = panel.id !== tab.getAttribute("aria-controls");
  });
  if (moveFocus) tab.focus();
}

taskTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectTaskLevel(tab));
  tab.addEventListener("keydown", (event) => {
    let nextIndex = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % taskTabs.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + taskTabs.length) % taskTabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = taskTabs.length - 1;
    else return;
    event.preventDefault();
    selectTaskLevel(taskTabs[nextIndex], true);
  });
});

const addressConcern = document.getElementById("address-concern");
const resetConcern = document.getElementById("reset-concern");
const softState = document.getElementById("soft-state");
const preferenceStatus = document.getElementById("preference-status");
const preferenceBadge = document.getElementById("preference-badge");
const demoMessage = document.getElementById("state-demo-message");

addressConcern.addEventListener("click", () => {
  softState.classList.add("is-resolved");
  preferenceStatus.textContent = "Total cost is now clear";
  preferenceBadge.textContent = "CLARIFIED";
  demoMessage.textContent = "The preference is updated from the response; the budget constraint stays fixed.";
  addressConcern.setAttribute("aria-pressed", "true");
});

resetConcern.addEventListener("click", () => {
  softState.classList.remove("is-resolved");
  preferenceStatus.textContent = "Price detail is still unclear";
  preferenceBadge.textContent = "OPEN";
  demoMessage.textContent = "No response has been applied yet.";
  addressConcern.setAttribute("aria-pressed", "false");
});

const evidenceDescriptions = {
  transcript: "Words in the trace support claims about what was said.",
  audio: "Speech signals can support judgments about what the agent heard or delivered.",
  events: "Timing and speaker turns can support interruption and floor-control judgments."
};

document.querySelectorAll(".evidence-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".evidence-chip").forEach((item) => {
      const selected = item === chip;
      item.classList.toggle("is-selected", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    document.getElementById("evidence-explainer").textContent = evidenceDescriptions[chip.dataset.evidence];
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.getElementById("site-nav");

function setMenuOpen(open) {
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  siteNav.classList.toggle("is-open", open);
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

const progressBar = document.getElementById("reading-progress-bar");
let scrollFrame = 0;

function updateReadingProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
  progressBar.style.width = `${progress * 100}%`;
  scrollFrame = 0;
}

window.addEventListener("scroll", () => {
  if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateReadingProgress);
}, { passive: true });
updateReadingProgress();

const navLinks = [...siteNav.querySelectorAll("a")];
const observedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const active = link.hash === `#${entry.target.id}`;
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-25% 0px -65% 0px" });
  observedSections.forEach((section) => sectionObserver.observe(section));
}

const caseLibrary = window.SALESVOICE_CASES;
const caseTabs = [...document.querySelectorAll(".case-tab")];
const casePanels = [...document.querySelectorAll(".case-panel")];

function selectCaseLevel(tab, moveFocus = false) {
  caseTabs.forEach((item) => {
    const selected = item === tab;
    item.classList.toggle("is-active", selected);
    item.setAttribute("aria-selected", String(selected));
    item.tabIndex = selected ? 0 : -1;
  });
  casePanels.forEach((panel) => {
    const hidden = panel.id !== tab.getAttribute("aria-controls");
    panel.hidden = hidden;
    if (hidden) panel.querySelectorAll("audio").forEach((audio) => audio.pause());
  });
  if (moveFocus) tab.focus();
}

caseTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectCaseLevel(tab));
  tab.addEventListener("keydown", (event) => {
    let nextIndex = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % caseTabs.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + caseTabs.length) % caseTabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = caseTabs.length - 1;
    else return;
    event.preventDefault();
    selectCaseLevel(caseTabs[nextIndex], true);
  });
});

function makeNode(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function formatDuration(seconds) {
  if (typeof seconds !== "number" || !Number.isFinite(seconds)) return "WAV audio";
  const total = Math.round(seconds);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

function addDataLinks(card, links) {
  const available = links.filter((link) => link && link.href);
  if (!available.length) return;
  const row = makeNode("div", "case-data-links");
  available.forEach((link) => {
    const anchor = makeNode("a", "", link.label);
    anchor.href = link.href;
    anchor.setAttribute("download", "");
    row.append(anchor);
  });
  card.append(row);
}

function addTranscript(card, turns, label = "Read transcript") {
  if (!Array.isArray(turns) || turns.length === 0) return;
  const details = makeNode("details", "transcript-disclosure");
  const summary = makeNode("summary", "", label);
  const list = makeNode("ol");
  turns.forEach((turn) => {
    const item = makeNode("li");
    const speaker = makeNode("b", "", turn.speaker || "Speaker");
    const words = makeNode("span", "", turn.text || "");
    item.append(speaker, words);
    list.append(item);
  });
  details.append(summary, list);
  card.append(details);
}

function addTrack(track, fallbackDuration) {
  const wrapper = makeNode("div", "audio-track");
  const label = makeNode("div", "audio-track-label");
  label.append(makeNode("span", "", track.label || "Audio sample"));
  label.append(makeNode("span", "", formatDuration(track.duration_s ?? fallbackDuration)));
  const player = document.createElement("audio");
  player.controls = true;
  player.preload = "none";
  player.src = track.audio;
  player.setAttribute("aria-label", track.label || "Audio sample");
  const actions = makeNode("div", "audio-track-actions");
  actions.append(makeNode("span", "", "WAV · bundled offline"));
  const download = makeNode("a", "case-download", "Download");
  download.href = track.audio;
  download.setAttribute("download", "");
  actions.append(download);
  wrapper.append(label, player, actions);
  return wrapper;
}

function makeCaseCard(item) {
  const card = makeNode("article", "audio-case-card");
  const header = makeNode("div", "audio-case-head");
  header.append(makeNode("span", "audio-language-chip", `${item.language_name} · ${item.language}`));
  header.append(makeNode("span", "audio-kind-chip", "AUDIO CASE"));
  card.append(header);
  card.append(makeNode("h4", "", item.title));
  card.append(makeNode("span", "audio-case-id", item.id));
  card.append(makeNode("p", "audio-case-summary", item.summary || ""));
  if (item.scenario) card.append(makeNode("p", "audio-case-scenario", item.scenario));

  if (Array.isArray(item.event_types) && item.event_types.length) {
    const tags = makeNode("div", "case-event-tags");
    [...new Set(item.event_types)].forEach((eventType) => {
      tags.append(makeNode("span", "", eventType.replaceAll("_", " ")));
    });
    card.append(tags);
  }

  const trackList = makeNode("div", "audio-tracks");
  item.tracks.forEach((track) => trackList.append(addTrack(track, item.duration_s)));
  card.append(trackList);
  addTranscript(card, item.transcript);
  addDataLinks(card, [{ label: "Transcript", href: item.script }, { label: "Event timing", href: item.metadata }]);
  return card;
}

if (caseLibrary) {
  caseLibrary.cases.forEach((item) => {
    const grid = document.getElementById(`case-grid-${item.level}`);
    if (grid) grid.append(makeCaseCard(item));
  });
}
