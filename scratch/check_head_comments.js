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
const commentsSet = new Set();

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const headMatch = content.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  if (!headMatch) continue;
  
  const comments = headMatch[1].match(/<!--[\s\S]*?-->/g) || [];
  for (const c of comments) {
    commentsSet.add(c.trim().slice(0, 100));
  }
}

console.log("=== DISTINCT COMMENTS IN <HEAD> ===");
for (const c of commentsSet) {
  console.log(c);
}
console.log("Total distinct comments:", commentsSet.size);
