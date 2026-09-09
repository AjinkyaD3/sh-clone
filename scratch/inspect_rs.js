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

for (const f of files.slice(0, 5)) {
  const content = fs.readFileSync(f, 'utf8');
  
  // Inspect rich-snippet spans
  const rsMatches = content.match(/<span\s+class="[^"]*rich-snippet-hidden[^"]*"[\s\S]*?<\/span>/gi) || [];
  console.log(`File: ${f} -> Rich snippet matches found:`, rsMatches.length);
  if (rsMatches.length > 0) {
    console.log("Sample:", rsMatches);
  }
}
