// Generalizes scripts/split_homepage.js to run across every page.tsx that
// follows the same Avada "fusion-builder-row-N" sibling pattern. For each
// target file:
//   1. Finds every "fusion-builder-row-N fusion-flex-container" marker and,
//      via a <div>/</div> depth counter from that row's opening tag, its
//      balanced closing line (same technique used for the homepage split
//      and the earlier logo-strip reorder this session).
//   2. Slices the file into: head (before the first row), one chunk per
//      row (extended back to swallow any content between the previous
//      row's end and this row's start, so nothing in between is silently
//      dropped), and tail (after the last row).
//   3. Writes each row chunk to components/<page-slug>/RowN.tsx as a
//      plain no-props function component, auto-adding a `Link`/`CTABlock`
//      import only if that chunk actually uses it.
//   4. Rewrites the page.tsx to import and render them in order, and drops
//      the page-level `Link`/`CTABlock` import if nothing outside the
//      extracted sections still uses it.
//   5. Verifies losslessness per file: sorts every line from the original
//      middle region against every line from the new files' bodies and
//      requires an exact match before writing anything for that file.
//
// Run: node scripts/split_page_sections.js [--dry] [file1 file2 ...]
// With no file args, processes every app/**/page.tsx with >=1 detected row,
// skipping app/page.tsx (already split) and anything under app/legacy/.

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const DRY = process.argv.includes('--dry');
const explicitFiles = process.argv.slice(2).filter((a) => !a.startsWith('--'));

function findAllPageFiles() {
  const out = execSync('git ls-files "app/**/page.tsx"', { cwd: ROOT, encoding: 'utf-8' })
    .split(/\r?\n/)
    .filter(Boolean)
    .filter((f) => !f.startsWith('app/legacy/'))
    .filter((f) => f !== 'app/page.tsx');
  return out;
}

function pageSlug(relPath) {
  // app/doors/bullet-proof-doors/page.tsx -> doors/bullet-proof-doors
  // app/about-us/page.tsx -> about-us
  let slug = relPath.replace(/^app\//, '').replace(/\/page\.tsx$/, '');
  if (slug === '') slug = 'root';
  return slug;
}

function processFile(relPath) {
  const absPath = path.join(ROOT, relPath);
  const raw = fs.readFileSync(absPath, 'utf-8');
  const hadCRLF = raw.includes('\r\n');
  const lines = raw.split(/\r?\n/);

  // Find row marker line indices (0-indexed, the className line).
  const markers = [];
  lines.forEach((l, i) => {
    const m = l.match(/fusion-builder-row-(\d+) fusion-flex-container/);
    if (m) markers.push({ row: m[1], classNameIdx: i, openIdx: i - 1 });
  });
  if (markers.length === 0) return { relPath, skipped: true, reason: 'no rows detected' };

  function findEnd(startIdx) {
    let depth = 0;
    for (let i = startIdx; i < lines.length; i++) {
      const opens = (lines[i].match(/<div\b/g) || []).length;
      const closes = (lines[i].match(/<\/div>/g) || []).length;
      depth += opens - closes;
      if (depth === 0 && i > startIdx) return i;
    }
    return -1;
  }

  const sections = [];
  let cursor = markers[0].openIdx; // 0-indexed start of first section
  for (let k = 0; k < markers.length; k++) {
    const end = findEnd(markers[k].openIdx);
    if (end === -1) return { relPath, skipped: true, reason: `unbalanced div for row ${markers[k].row}` };
    sections.push({ row: markers[k].row, start: cursor, end }); // 0-indexed inclusive
    cursor = end + 1;
  }
  const headEnd = markers[0].openIdx; // exclusive
  const tailStart = sections[sections.length - 1].end + 1; // inclusive

  const head = lines.slice(0, headEnd);
  const tail = lines.slice(tailStart);
  const middleOriginal = lines.slice(headEnd, tailStart);

  const slug = pageSlug(relPath);
  const componentDir = path.join(ROOT, 'components', slug);

  function eol(s) {
    return hadCRLF ? s.replace(/\r?\n/g, '\r\n') : s;
  }

  // Build each component's content + verify losslessness before writing anything.
  const written = [];
  let extractedAll = [];
  for (const { row, start, end } of sections) {
    const chunk = lines.slice(start, end + 1);
    extractedAll.push(...chunk);
    const chunkText = chunk.join('\n');
    const usesLink = /<Link\b/.test(chunkText);
    const usesCTA = /<CTABlock\b/.test(chunkText);
    const importLines = [];
    if (usesLink) importLines.push('import Link from "next/link";');
    if (usesCTA) importLines.push('import CTABlock from "@/components/CTABlock";');
    const header = importLines.length ? importLines.join('\n') + '\n\n' : '';
    const name = `Row${row}`;
    const body = `${header}export default function ${name}() {\n  return (\n${chunkText}\n  );\n}\n`;
    written.push({ name, body });
  }

  // Losslessness check: sorted original middle lines === sorted concat of all chunk lines.
  const sortedOriginal = [...middleOriginal].sort();
  const sortedExtracted = [...extractedAll].sort();
  const lossless =
    sortedOriginal.length === sortedExtracted.length &&
    sortedOriginal.every((v, i) => v === sortedExtracted[i]);
  if (!lossless) {
    return { relPath, skipped: true, reason: 'losslessness check FAILED - not writing', sections: sections.length };
  }

  if (DRY) {
    return { relPath, skipped: false, dryRun: true, sections: sections.length, slug };
  }

  if (!fs.existsSync(componentDir)) fs.mkdirSync(componentDir, { recursive: true });
  for (const { name, body } of written) {
    fs.writeFileSync(path.join(componentDir, `${name}.tsx`), eol(body));
  }

  // Rewrite page.tsx: head + import lines + ...(unchanged head content)... then
  // component tags where the sections were, then tail.
  const importStmts = sections.map(
    ({ row }) => `import Row${row} from "@/components/${slug}/Row${row}";`,
  );
  // Insert new imports after the last existing top-of-file `import` line.
  let lastImportIdx = -1;
  head.forEach((l, i) => {
    if (/^import /.test(l)) lastImportIdx = i;
  });
  const newHead = [...head];
  newHead.splice(lastImportIdx + 1, 0, ...importStmts);

  const componentTags = sections.map(({ row }) => `      <Row${row} />`);
  let newLines = [...newHead, ...componentTags, ...tail];

  // Drop now-unused Link/CTABlock imports from the scaffold (head+tail, i.e.
  // everything except the extracted sections).
  const remainingText = [...newHead, ...tail].join('\n');
  const stillUsesLink = /<Link\b/.test(remainingText);
  const stillUsesCTA = /<CTABlock\b/.test(remainingText);
  newLines = newLines.filter((l) => {
    if (!stillUsesLink && /^import Link from "next\/link";$/.test(l.trim())) return false;
    if (!stillUsesCTA && /^import CTABlock from "@\/components\/CTABlock";$/.test(l.trim())) return false;
    return true;
  });

  fs.writeFileSync(absPath, eol(newLines.join('\n')));

  return {
    relPath,
    skipped: false,
    sections: sections.length,
    slug,
    linesBefore: lines.length,
    linesAfter: newLines.length,
  };
}

const targets = explicitFiles.length ? explicitFiles : findAllPageFiles();
const results = targets.map(processFile);

for (const r of results) {
  if (r.skipped) {
    console.log(`SKIP  ${r.relPath} - ${r.reason}`);
  } else if (r.dryRun) {
    console.log(`DRY   ${r.relPath} -> components/${r.slug}/ (${r.sections} sections)`);
  } else {
    console.log(`OK    ${r.relPath} -> components/${r.slug}/ (${r.sections} sections, ${r.linesBefore} -> ${r.linesAfter} lines)`);
  }
}
const ok = results.filter((r) => !r.skipped).length;
console.log(`\n${ok}/${results.length} processed successfully.`);
