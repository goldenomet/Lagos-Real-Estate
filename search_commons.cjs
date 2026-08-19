const https = require('https');

function searchCommons(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json&srlimit=5`;
  const options = { headers: { 'User-Agent': 'Mozilla/5.0' } };
  
  https.get(url, options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        console.log(`\nCommons results for ${query}:`);
        json.query.search.forEach(item => {
          console.log(`Title: ${item.title}`);
        });
      } catch (e) {
        console.log(`Failed to parse commons for ${query}`);
      }
    });
  });
}

searchCommons("Ikoyi house");
searchCommons("Banana island lagos");
searchCommons("Lekki house");
searchCommons("Eko Atlantic");
