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

const allLinks = new Set();
const allMetaNames = new Set();
const allMetaProps = new Set();
const allScripts = new Set();
const otherTags = new Set();

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const headMatch = content.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  if (!headMatch) continue;
  
  const head = headMatch[1];
  
  // Find all <link ...>
  const links = head.match(/<link[^>]*>/gi) || [];
  for (const l of links) allLinks.add(l.trim());
  
  // Find all <meta ...>
  const metas = head.match(/<meta[^>]*>/gi) || [];
  for (const m of metas) {
    const nameMatch = m.match(/name="([^"]+)"/i);
    const propMatch = m.match(/property="([^"]+)"/i);
    const httpMatch = m.match(/http-equiv="([^"]+)"/i);
    if (nameMatch) allMetaNames.add(nameMatch[1]);
    if (propMatch) allMetaProps.add(propMatch[1]);
    if (httpMatch) allMetaNames.add('http-equiv:' + httpMatch[1]);
  }
  
  // Find all <script ...>
  const scripts = head.match(/<script[\s\S]*?<\/script>/gi) || [];
  for (const s of scripts) {
    const idMatch = s.match(/id="([^"]+)"/i);
    const classMatch = s.match(/class="([^"]+)"/i);
    allScripts.add(`id=${idMatch ? idMatch[1] : 'none'} class=${classMatch ? classMatch[1] : 'none'}`);
  }
}

console.log("=== DISTINCT META NAMES/EQUIVS ===");
console.log(Array.from(allMetaNames));

console.log("\n=== DISTINCT META PROPERTIES ===");
console.log(Array.from(allMetaProps));

console.log("\n=== DISTINCT SCRIPT TYPES IN HEAD ===");
console.log(Array.from(allScripts));

console.log("\n=== SAMPLE DISTINCT LINKS ===");
const linkArray = Array.from(allLinks);
console.log("Total unique link tags:", linkArray.length);
console.log(linkArray.slice(0, 30).join('\n'));
