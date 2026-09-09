const fs = require('fs');
const path = require('path');

function findHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) results = results.concat(findHtmlFiles(fullPath));
    else if (file === 'content.html') results.push(fullPath);
  }
  return results;
}

const files = findHtmlFiles('app');
const pllPattern = /<a\b[^>]*class="[^"]*fusion-page-load-link[^"]*"[^>]*>[\s\S]*?<\/a\s*>/gi;

let matchCount = 0;
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const matches = content.match(pllPattern);
  if (matches) {
    matchCount += matches.length;
  } else {
    console.log("No pll match in:", f);
  }
}
console.log(`Matched page load link in ${matchCount} files!`);
