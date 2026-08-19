const https = require('https');

function fetchImages(title) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages|images&pithumbsize=1000&format=json`;
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
        if (page.thumbnail) {
          console.log(`Thumbnail: ${page.thumbnail.source}`);
        }
      }
    });
  });
}

fetchImages("Eko Atlantic");
fetchImages("Victoria Island, Lagos");
fetchImages("Ikoyi");
fetchImages("Lekki");
fetchImages("Banana Island, Lagos");
fetchImages("Lagos");
