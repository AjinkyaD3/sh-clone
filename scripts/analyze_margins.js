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
    // Regex for awb margins and paddings with optional quotes around keys and values
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
        prop: fullProp,
        type: isMargin ? 'margin' : 'padding',
        dir: isTop ? 'top' : 'bottom',
        isSmall,
        val
      });
    }
  });
});

console.log('Total awb margin/padding rules found:', occurrences.length);

// Group by value ranges
const largeMargins = occurrences.filter(o => o.type === 'margin' && o.val >= 60 && !o.isSmall);
const largePaddings = occurrences.filter(o => o.type === 'padding' && o.val >= 70 && !o.isSmall);

console.log('\n--- LARGE MARGINS (>= 60px desktop) Count:', largeMargins.length, '---');
largeMargins.sort((a, b) => b.val - a.val);
largeMargins.slice(0, 30).forEach(o => {
  console.log(`${o.val}px: ${o.prop} at ${o.file}:${o.line}`);
});

console.log('\n--- LARGE PADDINGS (>= 70px desktop) Count:', largePaddings.length, '---');
largePaddings.sort((a, b) => b.val - a.val);
largePaddings.slice(0, 30).forEach(o => {
  console.log(`${o.val}px: ${o.prop} at ${o.file}:${o.line}`);
});

// Distribution of margin values:
const marginValCounts = {};
occurrences.filter(o => o.type === 'margin' && !o.isSmall).forEach(o => {
  marginValCounts[o.val] = (marginValCounts[o.val] || 0) + 1;
});
console.log('\n--- MARGIN VALUE DISTRIBUTION (Desktop) ---');
Object.keys(marginValCounts).sort((a, b) => parseFloat(b) - parseFloat(a)).forEach(val => {
  if (marginValCounts[val] > 1) {
    console.log(`${val}px: ${marginValCounts[val]} occurrences`);
  }
});

// Specifically check components/products and app/products
console.log('\n--- /products PAGE ALL SPACING (app/products & components/products) ---');
occurrences
  .filter(o => o.file.includes('products') && (o.val >= 40))
  .sort((a, b) => b.val - a.val)
  .forEach(o => {
    console.log(`${o.val}px: ${o.prop} in ${o.file}:${o.line}`);
  });
