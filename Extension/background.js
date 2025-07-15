chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getEcoData") {
    chrome.storage.local.get(["ecoScore", "ecoDetails"], (data) => {
      sendResponse(data);
    });
    return true; // keep the message channel open for async sendResponse
  }
});
