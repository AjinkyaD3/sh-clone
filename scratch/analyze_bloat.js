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

// Let's analyze app/content.html first
const homeHtml = fs.readFileSync('app/content.html', 'utf8');

console.log("=== APP/CONTENT.HTML BREAKDOWN ===");
console.log("Total bytes:", homeHtml.length);

const headMatch = homeHtml.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
if (headMatch) {
  console.log("<head> total bytes:", headMatch[0].length, `(${(headMatch[0].length / homeHtml.length * 100).toFixed(1)}%)`);
  
  // Breakdown of <head> styles
  const styles = headMatch[1].match(/<style[^>]*>[\s\S]*?<\/style>/gi) || [];
  for (const s of styles) {
    const idMatch = s.match(/id="([^"]+)"/i);
    const id = idMatch ? idMatch[1] : 'unnamed';
    console.log(`  - <style id="${id}">: ${s.length} bytes`);
  }
}

const bodyMatch = homeHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
if (bodyMatch) {
  console.log("<body> total bytes:", bodyMatch[0].length, `(${(bodyMatch[0].length / homeHtml.length * 100).toFixed(1)}%)`);
  
  // Breakdown of inline styles in body
  const inlineStyles = bodyMatch[1].match(/style="[^"]*"/gi) || [];
  let inlineStylesBytes = 0;
  for (const is of inlineStyles) inlineStylesBytes += is.length;
  console.log(`  - Inline style="..." attributes: ${inlineStylesBytes} bytes (${inlineStyles.length} attributes, ${(inlineStylesBytes / bodyMatch[0].length * 100).toFixed(1)}% of body)`);
  
  // Breakdown of class="..." attributes in body
  const classAttrs = bodyMatch[1].match(/class="[^"]*"/gi) || [];
  let classBytes = 0;
  for (const c of classAttrs) classBytes += c.length;
  console.log(`  - class="..." attributes: ${classBytes} bytes (${classAttrs.length} attributes, ${(classBytes / bodyMatch[0].length * 100).toFixed(1)}% of body)`);
  
  // SVG placeholders
  const svgs = bodyMatch[1].match(/data:image\/svg\+xml,[^"']*/gi) || [];
  let svgBytes = 0;
  for (const s of svgs) svgBytes += s.length;
  console.log(`  - SVG data URIs: ${svgBytes} bytes (${svgs.length} SVGs)`);
}

// Now let's analyze how many styles in <head> are IDENTICAL across ALL 35 files!
console.log("\n=== REPEATED HEAD STYLES ACROSS ALL 35 FILES ===");
const globalStyleSizes = {};

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const styles = content.match(/<style[^>]*>[\s\S]*?<\/style>/gi) || [];
  for (const s of styles) {
    const idMatch = s.match(/id="([^"]+)"/i);
    if (idMatch) {
      const id = idMatch[1];
      if (!globalStyleSizes[id]) {
        globalStyleSizes[id] = { count: 0, sampleLength: s.length };
      }
      globalStyleSizes[id].count++;
    }
  }
}

let totalRepeatedBytes = 0;
for (const [id, data] of Object.entries(globalStyleSizes)) {
  const total = data.sampleLength * data.count;
  console.log(`style id="${id}": appears in ${data.count}/35 files, ~${data.sampleLength} bytes each -> Total across repo: ~${(total / 1024).toFixed(1)} KB`);
  if (data.count === 35) {
    totalRepeatedBytes += (data.sampleLength * 34); // 34 copies are pure duplicates!
  }
}

console.log(`\nPotential savings if identical styles are moved to ROOT (globals.css): ~${(totalRepeatedBytes / 1024).toFixed(1)} KB (~${(totalRepeatedBytes / (1024 * 1024)).toFixed(2)} MB)!`);
