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

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) continue;
  
  const scripts = bodyMatch[1].match(/<script[\s\S]*?<\/script>/gi) || [];
  for (const s of scripts) {
    if (!s.includes('edd-js-none')) {
      console.log("NON-EDD SCRIPT in", f, ":\n", s);
    }
  }
}
