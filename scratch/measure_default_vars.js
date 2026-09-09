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

// Common default 0px / 100% variables that Avada injects everywhere
const defaultVars = [
  /--awb-border-radius-(top|bottom)-(left|right):\s*0px;?/gi,
  /--awb-margin-(top|bottom)-large:\s*0px;?/gi,
  /--awb-order-(medium|small):\s*0;?/gi,
  /--awb-width-(medium|small):\s*100%;?/gi,
  /--awb-spacing-(left|right)-(medium|small):\s*1\.92%;?/gi
];

let totalInlineBytes = 0;
let totalDefaultVarBytes = 0;

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const styles = content.match(/style="[^"]*"/gi) || [];
  for (const s of styles) {
    totalInlineBytes += s.length;
    for (const d of defaultVars) {
      const matches = s.match(d) || [];
      for (const m of matches) totalDefaultVarBytes += m.length;
    }
  }
}

console.log("Total inline style bytes across 35 files:", (totalInlineBytes / 1024).toFixed(1), "KB");
console.log("Bytes of just redundant 0px/default variables:", (totalDefaultVarBytes / 1024).toFixed(1), "KB");
