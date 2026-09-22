// Sitewide vertical-margin trim. Halves every --awb-margin-top/bottom value
// above 30px (floor 24px); leaves anything <=30px and all padding untouched.
// Run with --apply to write; default is a dry run.
const fs = require('fs');
const path = require('path');

const APPLY = process.argv.includes('--apply');
const MARGIN_RE = /(--awb-margin-(?:top|bottom)(?:-small|-medium|-large)?'\s*:\s*')([0-9.]+)px'/g;

function walk(dir) {
  let out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
      out = out.concat(walk(full));
    } else if (entry.name.endsWith('.tsx')) {
      out.push(full);
    }
  }
  return out;
}

function reduce(v) {
  if (v <= 30) return v;
  return Math.max(24, Math.round(v * 0.5));
}

const files = walk('app').concat(walk('components'));
let changedFiles = 0;
let changedValues = 0;
const byValue = {};

for (const file of files) {
  const src = fs.readFileSync(file, 'utf8');
  let hits = 0;
  const out = src.replace(MARGIN_RE, (full, prefix, num) => {
    const v = parseFloat(num);
    const nv = reduce(v);
    if (nv === v) return full;
    hits++;
    byValue[`${v} -> ${nv}`] = (byValue[`${v} -> ${nv}`] || 0) + 1;
    return `${prefix}${nv}px'`;
  });
  if (hits > 0) {
    changedFiles++;
    changedValues += hits;
    if (APPLY) fs.writeFileSync(file, out);
  }
}

console.log(APPLY ? 'APPLIED' : 'DRY RUN');
console.log('files touched:', changedFiles, '| values changed:', changedValues);
Object.entries(byValue)
  .sort((a, b) => b[1] - a[1])
  .forEach(([k, n]) => console.log(`  ${n.toString().padStart(4)}x  ${k}`));
