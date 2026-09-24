const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) {
        if (!file.startsWith('.') && file !== 'node_modules' && file !== '.next') {
          results = results.concat(walk(fullPath));
        }
      } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
        results.push(fullPath);
      }
    });
  } catch (e) {}
  return results;
}

const files = walk('./app').concat(walk('./components'));
const occurrences = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    const regex = /['"]?--(awb-(?:margin|padding)-(?:top|bottom)(?:-small|-large|-medium)?)['"]?:\s*['"]?([0-9.]+)(?:px)?['"]?/g;
    let match;
    while ((match = regex.exec(line)) !== null) {
      const fullProp = match[1];
      const val = parseFloat(match[2]);
      const isMargin = fullProp.includes('margin');
      const isPadding = fullProp.includes('padding');
      const isTop = fullProp.includes('top');
      const isBottom = fullProp.includes('bottom');
      const isSmall = fullProp.includes('small');
      occurrences.push({
        file: f.replace(/\\/g, '/'),
        line: idx + 1,
        lineContent: line.trim().substring(0, 140),
        prop: fullProp,
        type: isMargin ? 'margin' : 'padding',
        dir: isTop ? 'top' : 'bottom',
        isSmall,
        val
      });
    }
  });
});

console.log('--- ALL MARGINS >= 100px (Desktop) ---');
const m100 = occurrences.filter(o => o.type === 'margin' && o.val >= 100 && !o.isSmall);
console.log('Count:', m100.length);
m100.sort((a, b) => b.val - a.val).forEach(o => {
  console.log(`${o.val}px: ${o.prop} at ${o.file}:${o.line}`);
});
