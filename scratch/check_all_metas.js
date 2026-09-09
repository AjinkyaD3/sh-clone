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
const metaTags = new Set();

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const headMatch = content.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  if (!headMatch) continue;
  
  const metas = headMatch[1].match(/<meta[^>]*>/gi) || [];
  for (const m of metas) {
    const clean = m.replace(/\s+/g, ' ').trim();
    // Normalize long content
    metaTags.add(clean.replace(/content="[^"]{40,}"/, 'content="..."'));
  }
}

console.log("=== ALL DISTINCT META TAGS ACROSS ALL 35 FILES ===");
for (const m of metaTags) {
  console.log(m);
}
