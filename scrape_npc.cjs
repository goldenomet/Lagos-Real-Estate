const https = require('https');

function scrape(location) {
  const url = `https://nigeriapropertycentre.com/for-sale/houses/lagos/${location}/showtype`;
  const options = { 
    headers: { 
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' 
    } 
  };
  https.get(url, options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log(`\nResults for ${location}:`);
      // Find img tags with itemprop="image" or just images inside listing cards
      const imgRegex = /<img[^>]+src="([^">]+)"[^>]*alt="([^">]+)"/g;
      let match;
      let count = 0;
      while ((match = imgRegex.exec(data)) !== null && count < 5) {
        if (match[1].includes('thumbnails') || match[1].includes('listings')) {
          console.log(`Image: ${match[1]}\nAlt: ${match[2]}`);
          count++;
        }
      }
    });
  });
}

scrape('banana-island');
scrape('ikoyi');
scrape('eko-atlantic-city');
scrape('lekki');
