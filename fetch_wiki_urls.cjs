const https = require('https');

function getUrl(filename) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&format=json`;
  const options = { headers: { 'User-Agent': 'Mozilla/5.0' } };
  https.get(url, options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const json = JSON.parse(data);
      const pages = json.query.pages;
      for (const pageId in pages) {
        if (pages[pageId].imageinfo && pages[pageId].imageinfo.length > 0) {
          console.log(`${filename}: ${pages[pageId].imageinfo[0].url}`);
        }
      }
    });
  });
}

getUrl("File:Eko Atlantic (Lagos) Skyline.jpg");
getUrl("File:Ekoatlanticcity.jpg");
getUrl("File:Civic Center, Victoria island. Lagos.jpg");
getUrl("File:Diamond bank tower, Victoria Island.jpg");
getUrl("File:Ikoyi and Beyond.jpg");
getUrl("File:Lekki link bridge at night.jpg");
