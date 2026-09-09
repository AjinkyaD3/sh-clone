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
console.log("=== REMAINING <STYLE> TAGS IN CONTENT.HTML FILES ===");
let totalStyles = 0;
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const styles = content.match(/<style[^>]*>[\s\S]*?<\/style\s*>/gi) || [];
  if (styles.length > 0) {
    totalStyles += styles.length;
    console.log(`${f}: ${styles.length} style tag(s)`);
    for (const s of styles) {
      const id = s.match(/id="([^"]+)"/i) || s.match(/class="([^"]+)"/i);
      console.log(`   - ${id ? id[0] : 'no id'}, length: ${s.length} bytes`);
    }
  }
}
console.log("Total remaining <style> tags across all 35 files:", totalStyles);
