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
const scriptSamples = {};

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const headMatch = content.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  if (!headMatch) continue;
  
  const scripts = headMatch[1].match(/<script[\s\S]*?<\/script>/gi) || [];
  for (const s of scripts) {
    const tagOpen = s.match(/<script[^>]*>/i)[0];
    const textSnippet = s.replace(/<[^>]+>/g, '').trim().slice(0, 100);
    const key = tagOpen;
    if (!scriptSamples[key]) {
      scriptSamples[key] = {
        sampleFile: f,
        snippet: textSnippet,
        fullLength: s.length
      };
    }
  }
}

console.log("=== ALL DISTINCT SCRIPT TAG OPENS IN <HEAD> ===");
for (const [tag, data] of Object.entries(scriptSamples)) {
  console.log("TAG:", tag);
  console.log("  In file:", data.sampleFile);
  console.log("  Snippet:", data.snippet);
  console.log("  Length:", data.fullLength);
  console.log("---");
}
