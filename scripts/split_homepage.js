// One-off script: splits app/page.tsx's inlined section markup into
// components/home/*.tsx, each a self-contained function component with no
// props (all content was already static JSX), then rewrites page.tsx to
// import and render them in order. Ranges below were derived by matching
// each "fusion-builder-row-N" block's opening <div> to its balanced closing
// </div> via a depth counter (see the ad-hoc counting run that produced
// these numbers - not repeated here since page.tsx has since changed).
//
// Run once: node scripts/split_homepage.js

const fs = require('fs');
const path = require('path');

const PAGE_PATH = path.join(__dirname, '..', 'app', 'page.tsx');
const HOME_DIR = path.join(__dirname, '..', 'components', 'home');

const raw = fs.readFileSync(PAGE_PATH, 'utf-8');
const hadCRLF = raw.includes('\r\n');
const lines = raw.split(/\r?\n/);

// [startLine, endLine] 1-indexed, inclusive, exactly one fusion-builder-row block each.
const sections = [
  { name: 'IntroHeading', range: [54, 127] },
  { name: 'CategoryCards', range: [128, 337] },
  { name: 'LuxuryDoorsDetails', range: [338, 432] },
  { name: 'DoorsDesignVideo', range: [433, 585] },
  { name: 'BespokeManufacturer', range: [586, 686] },
  { name: 'TrustedManufacturer', range: [687, 773] },
  { name: 'OurProjects', range: [774, 996] },
  { name: 'SecureCta', range: [997, 1079] },
  { name: 'TrustLogos', range: [1080, 1299] },
];

function eol(s) {
  return hadCRLF ? s.replace(/\r?\n/g, '\r\n') : s;
}

if (!fs.existsSync(HOME_DIR)) fs.mkdirSync(HOME_DIR, { recursive: true });

for (const { name, range: [s, e] } of sections) {
  const chunk = lines.slice(s - 1, e).join('\n');
  const usesLink = /<Link\b/.test(chunk);
  const header = usesLink ? 'import Link from "next/link";\n\n' : '';
  const body = `${header}export default function ${name}() {\n  return (\n${chunk}\n  );\n}\n`;
  fs.writeFileSync(path.join(HOME_DIR, `${name}.tsx`), eol(body));
  console.log(`wrote components/home/${name}.tsx (${e - s + 1} lines)`);
}

// Rebuild page.tsx: keep 1-53 as-is (add imports), replace 54-1299 with
// component tags in order, keep 1300-end as-is.
const head = lines.slice(0, 53); // lines 1-53
const tail = lines.slice(1299); // lines 1300-end

const importLines = sections.map(
  ({ name }) => `import ${name} from "@/components/home/${name}";`,
);
// Insert new imports right after the existing HeroSlider import (line 3).
const newHead = [...head];
const heroImportIdx = newHead.findIndex((l) => l.includes('components/HeroSlider'));
newHead.splice(heroImportIdx + 1, 0, ...importLines);

const componentTags = sections.map(({ name }) => `                      <${name} />`);

const newLines = [...newHead, ...componentTags, ...tail];
fs.writeFileSync(PAGE_PATH, eol(newLines.join('\n')));
console.log(`rewrote app/page.tsx (${newLines.length} lines)`);
