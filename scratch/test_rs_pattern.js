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

const rsPattern = /<span\s+class="entry-title\s+rich-snippet-hidden">[\s\S]*?<\/span>\s*<span\s+class="vcard\s+rich-snippet-hidden"><span\s+class="fn">[\s\S]*?<\/span><\/span>\s*<span\s+class="updated\s+rich-snippet-hidden">[\s\S]*?<\/span>/gi;

let matchCount = 0;
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const matches = content.match(rsPattern);
  if (matches) {
    matchCount += matches.length;
  } else {
    console.log("No match in:", f);
  }
}

console.log(`Matched rich-snippet block in ${matchCount} of ${files.length} files!`);
