const https = require('https');

function fetchImages(title) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=images&format=json`;
  const options = {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  };
  https.get(url, options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log(`\nImages for ${title}:`);
      const json = JSON.parse(data);
      const pages = json.query.pages;
      for (const pageId in pages) {
        const page = pages[pageId];
        if (page.images) {
          page.images.forEach(img => {
            console.log(img.title);
          });
        }
      }
    });
  });
}

fetchImages("Eko Atlantic");
fetchImages("Victoria Island, Lagos");
