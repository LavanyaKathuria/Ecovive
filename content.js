console.log("✅ content.js is running on this page");

(async () => {
  let title = '';
  let description = '';
  let image = '';

  if (location.hostname.includes('amazon')) {
  title = document.querySelector('#productTitle')?.innerText?.trim() || '';
  description =
    Array.from(document.querySelectorAll('.a-unordered-list .a-list-item'))
      .map(el => el.innerText.trim())
      .join(' ') ||
    document.querySelector('#productDescription')?.innerText?.trim() ||
    Array.from(document.querySelectorAll('#productDetails_techSpec_section_1 tr, #productDetails_detailBullets_sections1 tr'))
      .map(row => {
        const key = row.querySelector('th, td')?.innerText?.trim();
        const value = row.querySelector('td:last-child')?.innerText?.trim();
        return `${key}: ${value}`;
      })
      .join(' | ') ||
    'No description found';

  image = document.querySelector('#imgTagWrapperId img')?.src || '';
}



  // Debug logs for devtools
  console.log("📦 Title:", title);
  console.log("📝 Description:", description);
  console.log("🖼️ Image URL:", image);

  if (title && description) {
    try {
      const res = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, image })
      });

      const data = await res.json();
      console.log("✅ Response from backend:", data);
      chrome.storage.local.set({ ecoCartData: data });
    } catch (err) {
      console.error('❌ Error contacting backend:', err);
      chrome.storage.local.set({
        ecoCartData: {
          product: title || 'Unknown',
          ecoScore: 0,
          suggestions: ['⚠️ Backend error']
        }
      });
    }
  } else {
    console.warn('⚠️ Product title or description not found.');
    chrome.storage.local.set({
      ecoCartData: {
        product: title || 'Unknown',
        ecoScore: 0,
        suggestions: ['⚠️ Could not extract product info.']
      }
    });
  }
})();
