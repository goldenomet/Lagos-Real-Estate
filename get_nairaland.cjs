const https = require('https');

function search(query) {
  const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
  const options = { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } };
  
  https.get(url, options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const regex = /<a class="result__url" href="([^"]+)"/g;
      let match;
      console.log(`\nResults for ${query}:`);
      let count = 0;
      while ((match = regex.exec(data)) !== null && count < 5) {
        console.log(match[1]);
        count++;
      }
    });
  });
}

search("site:nairaland.com banana island mansion for sale");
