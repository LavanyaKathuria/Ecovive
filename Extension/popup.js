// popup.js
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

  const oldSection = document.getElementById("recommendation-section");
  if (oldSection) oldSection.remove();

  const shouldShowPurchaseOption =
  (data.recommendation && data.recommendation.url) || score > 60;

if (shouldShowPurchaseOption) {
  const product = data.recommendation || {
    title: data.product,
    url: data.url,
    score: score,
  };

  const div = document.createElement("div");
  div.id = "recommendation-section";
  div.style.marginTop = "20px";
  div.style.textAlign = "center";

  div.innerHTML = `
    <hr style="margin: 15px 0;">
    ${
      data.recommendation
        ? `<p><strong>🔁 Try a better product:</strong></p>
           <a href="${product.url}" target="_blank" style="color: green; font-weight: bold;">
             🌿 ${product.title}<br>(Score: ${product.score})
           </a>
           <br><br>`
        : ""
    }
    <label style="display: inline-flex; align-items: center; gap: 8px; cursor: pointer; user-select: none;">
      <input type="checkbox" id="purchase-checkbox" style="width: 16px; height: 16px; accent-color: green;" />
      <span style="font-weight: 600; font-size: 14px;">Mark as Purchased</span>
    </label>
    <p id="confirmation-msg" style="color: green; font-size: 12px; display: none; margin-top: 8px;">
      Thank you for buying eco-friendly!
    </p>
  `;

  document.body.appendChild(div);

  const checkbox = document.getElementById("purchase-checkbox");
  const confirmationMsg = document.getElementById("confirmation-msg");

  chrome.storage.local.get("purchasedProducts", (result) => {
    const purchased = result.purchasedProducts || {};
    if (purchased[product.url]) {
      checkbox.checked = true;
      confirmationMsg.style.display = "block";
    }
  });

  checkbox.addEventListener("change", (e) => {
    chrome.storage.local.get("purchasedProducts", (result) => {
      const purchased = result.purchasedProducts || {};
      if (e.target.checked) {
        purchased[product.url] = {
          title: product.title,
          score: product.score,
          url: product.url,
        };
        chrome.storage.local.set({ purchasedProducts: purchased });

        fetch("http://127.0.0.1:5050/api/mark-purchased", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(purchased[product.url]),
        }).then((res) => {
          if (res.ok) confirmationMsg.style.display = "block";
        }).catch(console.error);
      } else {
        delete purchased[product.url];
        chrome.storage.local.set({ purchasedProducts: purchased });
        confirmationMsg.style.display = "none";

        fetch("http://127.0.0.1:5050/api/mark-purchased", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: product.url }),
        }).catch(console.error);
      }
    });
  });
}

}

document.getElementById("score").innerText = "--";
document.getElementById("details").innerText = "Analyzing...";

chrome.storage.local.get("ecoCartData", ({ ecoCartData }) => {
  if (ecoCartData) renderUI(ecoCartData);
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes.ecoCartData) {
    console.log("🔄 New data received:", changes.ecoCartData.newValue);
    renderUI(changes.ecoCartData.newValue);
  }
});
