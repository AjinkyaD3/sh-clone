const fs = require('fs');
const path = require('path');

function findHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(findHtmlFiles(fullPath));
    } else if (file === 'content.html') {
      results.push(fullPath);
    }
  }
  return results;
}

const files = findHtmlFiles('app');
console.log('Total content.html files found:', files.length);

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const hasDoc = content.includes('<!DOCTYPE');
  const hasHead = content.includes('<head');
  const hasCloseHead = content.includes('</head');
  const hasBody = content.includes('<body');
  const hasCloseBody = content.includes('</body');
  
  if (hasHead || hasDoc) {
    console.log(f, { hasDoc, hasHead, hasCloseHead, hasBody, hasCloseBody, length: content.length });
  }
}
