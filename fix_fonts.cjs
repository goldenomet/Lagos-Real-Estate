const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content
    .replace(/font-sans font-black uppercase tracking-tighter font-bold/g, 'font-sans font-black uppercase tracking-tighter')
    .replace(/font-sans font-black uppercase tracking-tighter font-semibold/g, 'font-sans font-black uppercase tracking-tighter')
    .replace(/font-sans font-black uppercase tracking-tighter tracking-wider/g, 'font-sans font-black uppercase tracking-tighter')
    .replace(/tracking-tighter tracking-wider/g, 'tracking-tighter')
    .replace(/uppercase uppercase/g, 'uppercase');

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walkDir(filePath);
    } else if (filePath.endsWith('.tsx')) {
      replaceInFile(filePath);
    }
  }
}

walkDir('./src');
console.log('Done fixing fonts.');
