// Second spacing pass: trims the SECTION PADDING that measurement showed is real
// dead space, while protecting the padding that is doing a job.
//
// Rules, derived from in-browser measurement at 1440px:
//   * outer .fusion-fullwidth section  -> trim padding-top AND padding-bottom
//     (this is pure band padding; e.g. the 153/152px on each /security-levels tier)
//   * .fusion-layout-column            -> trim padding-BOTTOM only
//     (a column's padding-TOP is what aligns its text against the photo beside it;
//      cutting it would shove the text out of alignment)
//   * skip anything sizing a background image (hero heights, the CTA photo panels)
//   * <=40px is already snug and is left alone
//
// Run with --apply to write; default is a dry run.
const fs = require('fs');
const path = require('path');

const APPLY = process.argv.includes('--apply');
const PROP = /'--awb-padding-(top|bottom)(-small|-medium|-large)?'\s*:\s*'([0-9.]+)px'/g;

function walk(dir) {
  let out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name.startsWith('.') || e.name === 'node_modules') continue;
      out = out.concat(walk(full));
    } else if (e.name.endsWith('.tsx')) out.push(full);
  }
  return out;
}

const clamp = v => Math.min(56, Math.max(28, Math.round(v * 0.35)));

// Which element does the char offset belong to, and does that element size a photo?
function context(src, idx) {
  const before = src.lastIndexOf('className="', idx);
  if (before === -1) return { kind: 'unknown', photo: false, fullWidth: false };
  const clsEnd = src.indexOf('"', before + 11);
  const cls = src.slice(before + 11, clsEnd);
  const kind = cls.includes('fusion-fullwidth') ? 'section'
    : cls.includes('fusion-layout-column') ? 'column'
    : 'other';
  const fullWidth = /fusion_builder_column(_inner)?_1_1\b/.test(cls);
  // look ahead inside THIS element only (stop at the next element that opens a
  // new column/section) for markers that a real image is painted on this box
  const windowEnd = (() => {
    const nexts = [
      src.indexOf('className="fusion-layout-column', idx),
      src.indexOf('className="fusion-fullwidth', idx)
    ].filter(n => n !== -1);
    return nexts.length ? Math.min(...nexts) : Math.min(src.length, idx + 1200);
  })();
  const look = src.slice(idx, Math.min(windowEnd, idx + 1200));
  const photo = look.includes('data-bg-url') ||
    look.includes('fusion-column-has-bg-image') ||
    /backgroundImage:\s*'url\(/.test(look);
  return { kind, photo, fullWidth };
}

const files = walk('app').concat(walk('components'));
let changedFiles = 0, changed = 0, skippedPhoto = 0, skippedColTop = 0;
const byValue = {};

for (const file of files) {
  const src = fs.readFileSync(file, 'utf8');
  let hits = 0;
  const out = src.replace(PROP, (full, side, bp, num, offset) => {
    const v = parseFloat(num);
    if (v <= 40) return full;
    const { kind, photo, fullWidth } = context(src, offset);
    if (photo) { skippedPhoto++; return full; }
    if (kind === 'column' && side === 'top') {
      // A half-width column's padding-top aligns its text against the photo beside
      // it, and a big value on a full-width one is hero clearance for the overlay
      // header. Only the modest full-width ones are genuinely dead space.
      if (!(fullWidth && v <= 100)) { skippedColTop++; return full; }
    }
    if (kind !== 'section' && kind !== 'column') return full;
    const nv = clamp(v);
    if (nv === v) return full;
    hits++;
    byValue[`${v} -> ${nv}`] = (byValue[`${v} -> ${nv}`] || 0) + 1;
    return full.replace(`'${num}px'`, `'${nv}px'`);
  });
  if (hits) {
    changedFiles++; changed += hits;
    if (APPLY) fs.writeFileSync(file, out);
  }
}

console.log(APPLY ? 'APPLIED' : 'DRY RUN');
console.log(`files ${changedFiles} | values ${changed} | skipped: ${skippedPhoto} photo-sizing, ${skippedColTop} column padding-top`);
Object.entries(byValue).sort((a, b) => b[1] - a[1]).slice(0, 25)
  .forEach(([k, n]) => console.log(`  ${String(n).padStart(4)}x  ${k}`));
