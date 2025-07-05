console.log("✅ content.js is running on this page");

(async () => {
  let title = '';
  let description = '';
  let image = '';
  let source = location.hostname.includes('flipkart') ? 'flipkart' : 'amazon'; // ✅ Detect source

  // ✅ AMAZON
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

  // ✅ FLIPKART
  else if (location.hostname.includes('flipkart')) {
    title = document.querySelector('span.B_NuCI')?.innerText?.trim() ||
            document.querySelector('h1')?.innerText?.trim() || '';

    // Try bullet description first
    const bullets = Array.from(document.querySelectorAll('._1mXcCf ._1rcHFq li'))
      .map(el => el.innerText.trim())
      .filter(Boolean);

    // Fallback to other visible description blocks (esp. for clothing)
    if (bullets.length > 0) {
      description = bullets.join(' ');
    } else {
      const fallback = document.querySelector('.X3BRps, ._3la3Fn, ._1mXcCf');
      description = fallback?.innerText?.trim() || 'No description found';
    }

    // Image fallback for Flipkart
    image =
      document.querySelector("._396cs4")?.src ||
      document.querySelector("img._2r_T1I")?.src ||
      document.querySelector("img._396cs4._3exPp9")?.src ||
      '';
  }

  // 🔎 Debug logs
  console.log("📦 Title:", title);
  console.log("📝 Description:", description);
  console.log("🖼️ Image URL:", image);
  console.log("🌐 Source:", source);

  if (title && description) {
    try {
      const res = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, image, source }) // ✅ include source
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
