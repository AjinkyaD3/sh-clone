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
const spacingEntries = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    const regex = /['"]?--(awb-(margin|padding)-(top|bottom)(?:-(small|large|medium))?)['"]?:\s*['"]?([0-9.]+)(?:px)?['"]?/g;
    let match;
    while ((match = regex.exec(line)) !== null) {
      const fullProp = match[1];
      const type = match[2]; // margin or padding
      const dir = match[3];  // top or bottom
      const breakpoint = match[4] || 'desktop'; // small, large, medium, or desktop
      const val = parseFloat(match[5]);

      spacingEntries.push({
        file: f.replace(/\\/g, '/'),
        line: idx + 1,
        fullProp,
        type,
        dir,
        breakpoint,
        val,
        rawLine: line.trim()
      });
    }
  });
});

console.log(`Audited ${files.length} components/pages. Total awb spacing tokens: ${spacingEntries.length}`);

// 1. Desktop High Values:
// Margin >= 70px on desktop
const highDesktopMargins = spacingEntries.filter(e => e.type === 'margin' && e.breakpoint === 'desktop' && e.val >= 70);
// Padding >= 100px on desktop (exclude card height trick ~370-400px, but include hero/section paddings)
const highDesktopPaddings = spacingEntries.filter(e => e.type === 'padding' && e.breakpoint === 'desktop' && e.val >= 100 && e.val < 350);

console.log(`\n================ DESKTOP AUDIT ================`);
console.log(`High Desktop Margins (>= 70px): ${highDesktopMargins.length} instances`);
highDesktopMargins.sort((a, b) => b.val - a.val).slice(0, 25).forEach(e => {
  console.log(`  ${e.val}px: ${e.fullProp} at ${e.file}:${e.line}`);
});

console.log(`\nHigh Desktop Section Paddings (>= 100px and < 350px): ${highDesktopPaddings.length} instances`);
highDesktopPaddings.sort((a, b) => b.val - a.val).slice(0, 25).forEach(e => {
  console.log(`  ${e.val}px: ${e.fullProp} at ${e.file}:${e.line}`);
});

// 2. Mobile High Values:
// On mobile, even 50px-60px can take up a huge portion of the screen!
// Margin >= 50px on mobile
const highMobileMargins = spacingEntries.filter(e => e.type === 'margin' && e.breakpoint === 'small' && e.val >= 50);
// Padding >= 60px on mobile (excluding >= 350px card heights)
const highMobilePaddings = spacingEntries.filter(e => e.type === 'padding' && e.breakpoint === 'small' && e.val >= 60 && e.val < 350);

console.log(`\n================ MOBILE AUDIT ================`);
console.log(`High Mobile Margins (>= 50px): ${highMobileMargins.length} instances`);
highMobileMargins.sort((a, b) => b.val - a.val).slice(0, 25).forEach(e => {
  console.log(`  ${e.val}px: ${e.fullProp} at ${e.file}:${e.line}`);
});

console.log(`\nHigh Mobile Section Paddings (>= 60px and < 350px): ${highMobilePaddings.length} instances`);
highMobilePaddings.sort((a, b) => b.val - a.val).slice(0, 25).forEach(e => {
  console.log(`  ${e.val}px: ${e.fullProp} at ${e.file}:${e.line}`);
});

// 3. Mobile Missing Overrides (Where Desktop is >= 60px and there is NO -small override in the file!)
console.log(`\n================ DESKTOP LEAKING TO MOBILE ================`);
// Check rows with desktop margin-top or margin-bottom >= 60px that don't have matching -small
const fileGroups = {};
spacingEntries.forEach(e => {
  if (!fileGroups[e.file]) fileGroups[e.file] = [];
  fileGroups[e.file].push(e);
});

const leakingMargins = [];
Object.keys(fileGroups).forEach(file => {
  const entries = fileGroups[file];
  entries.forEach(e => {
    if (e.type === 'margin' && e.breakpoint === 'desktop' && e.val >= 60) {
      // Check if there is a matching small property in the file
      const smallProp = `${e.fullProp}-small`;
      const hasSmall = entries.some(o => o.fullProp === smallProp);
      if (!hasSmall) {
        leakingMargins.push({ file, line: e.line, prop: e.fullProp, val: e.val });
      }
    }
  });
});

console.log(`Desktop margins (>= 60px) with NO mobile (-small) override: ${leakingMargins.length} instances`);
leakingMargins.slice(0, 25).forEach(e => {
  console.log(`  ${e.val}px: ${e.prop} (no -small) in ${e.file}:${e.line}`);
});

// 4. Specifically check /products page on both desktop and mobile
console.log(`\n================ /products PAGE CURRENT STATUS ================`);
const productsEntries = spacingEntries.filter(e => e.file.includes('components/products/'));
console.log('Total spacing tokens in components/products:', productsEntries.length);
productsEntries
  .filter(e => e.val >= 30)
  .sort((a, b) => b.val - a.val)
  .forEach(e => {
    console.log(`  [${e.breakpoint}] ${e.val}px: ${e.fullProp} in ${e.file.replace('components/products/', '')}:${e.line}`);
  });
