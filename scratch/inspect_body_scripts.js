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
const scriptTypes = {};

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) continue;
  
  const scripts = bodyMatch[1].match(/<script[\s\S]*?<\/script>/gi) || [];
  for (const s of scripts) {
    const textSnippet = s.replace(/<[^>]+>/g, '').trim().slice(0, 80);
    const tagOpen = s.match(/<script[^>]*>/i)[0];
    const key = `${tagOpen} :: ${textSnippet}`;
    if (!scriptTypes[key]) {
      scriptTypes[key] = { count: 0, sampleFile: f, full: s };
    }
    scriptTypes[key].count++;
  }
}

console.log("=== BODY SCRIPTS FOUND ===");
for (const [key, data] of Object.entries(scriptTypes)) {
  console.log(`Count: ${data.count} | ${key}`);
  console.log(`Sample file: ${data.sampleFile}`);
  console.log(`Snippet:\n${data.full.slice(0, 300)}...\n`);
}
