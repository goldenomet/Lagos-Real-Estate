const https = require('https');

function searchUnsplash(query) {
  const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=10`;
  const options = { headers: { 'User-Agent': 'Mozilla/5.0' } };
  
  https.get(url, options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        console.log(`\nResults for ${query}:`);
        json.results.forEach((item, idx) => {
          console.log(`[${idx}] ${item.description || item.alt_description || 'No desc'}: ${item.urls.regular}`);
        });
      } catch (e) {
        console.log(`Failed to parse for ${query}`);
      }
    });
  });
}

searchUnsplash("Lagos house");
searchUnsplash("Lagos building");
searchUnsplash("Lagos real estate");
searchUnsplash("Banana Island Lagos");
searchUnsplash("Ikoyi");
