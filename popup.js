function renderUI(data) {
  const scoreEl = document.getElementById("score");
  const detailsEl = document.getElementById("details");
  const circle = document.getElementById("circle");

  if (!data || data.ecoScore === undefined || !Array.isArray(data.suggestions)) {
    scoreEl.innerText = "--";
    detailsEl.innerText = "❌ Could not extract product info.";
    return;
  }

  const score = data.ecoScore;
  const suggestions = data.suggestions;

  scoreEl.innerText = score;
  detailsEl.innerText = suggestions.join("\n");

  const deg = Math.round((score / 100) * 360);
  circle.style.background = `conic-gradient(#4caf50 ${deg}deg, #c8e6c9 ${deg}deg)`;

  const mat = suggestions.some(s => s.includes("recyclable") || s.includes("organic")) ? 70 : 30;
  const cert = suggestions.some(s => s.includes("certified")) ? 60 : 20;
  const manu = suggestions.some(s => s.includes("eco")) ? 60 : 30;
  const pack = suggestions.some(s => s.includes("plastic")) ? 20 : 60;

  document.getElementById("mat").style.width = `${mat}%`;
  document.getElementById("cert").style.width = `${cert}%`;
  document.getElementById("manu").style.width = `${manu}%`;
  document.getElementById("pack").style.width = `${pack}%`;
}

chrome.storage.local.get("ecoCartData", ({ ecoCartData }) => {
  renderUI(ecoCartData);
});
