const fs = require('fs');
const content = fs.readFileSync('dist/assets/index-B7Du6cSf.js', 'utf8');
const regex = /.{0,50}fetch.{0,50}/gi;
let match;
while ((match = regex.exec(content)) !== null) {
  console.log(match[0]);
}
