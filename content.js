(async () => {
  let title = '';
  let description = '';

  if (location.hostname.includes('amazon')) {
    title = document.querySelector('#productTitle')?.innerText?.trim() || '';
    description = Array.from(document.querySelectorAll('#feature-bullets li'))
      .map(li => li.innerText.trim())
      .join(' ');
  } else if (location.hostname.includes('flipkart')) {
    title = document.querySelector('span.B_NuCI')?.innerText?.trim() || '';
    description = Array.from(document.querySelectorAll('._1mXcCf li'))
      .map(li => li.innerText.trim())
      .join(' ');
  }

  if (title && description) {
    try {
      const res = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
      });
      const data = await res.json();
      chrome.storage.local.set({ ecoCartData: data });
    } catch (err) {
      console.error('❌ Error contacting backend:', err);
    }
  } else {
    console.warn('⚠️ Product title or description not found.');
    chrome.storage.local.set({
      ecoCartData: {
        product: 'Unknown',
        ecoScore: 0,
        suggestions: ['Could not extract product info.']
      }
    });
  }
})();
