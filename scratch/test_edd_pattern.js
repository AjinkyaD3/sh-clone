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
const scriptPattern = /<script\b[^>]*>[\s\S]*?edd-js-none[\s\S]*?<\/script\s*>/gi;
const stylePattern = /<style\b[^>]*>\s*\.edd-js-none[\s\S]*?<\/style\s*>/gi;

let scriptMatches = 0;
let styleMatches = 0;

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const s = content.match(scriptPattern);
  const st = content.match(stylePattern);
  if (s) scriptMatches += s.length;
  if (st) styleMatches += st.length;
}

console.log(`Matched EDD script in ${scriptMatches} files, EDD style in ${styleMatches} files!`);
