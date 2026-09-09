// Assembles a converted content.html body (from html_to_jsx.js) into a full
// page.tsx for the -v2 pilot route. Pulls metadata, the body className, and
// any trailing <CTABlock/> straight out of the EXISTING page.tsx via regex
// rather than having them retyped by hand each time - avoids transcription
// errors across a batch of pages.

const fs = require('fs');
const path = require('path');

const origPageDir = process.argv[2]; // e.g. app/doors/high-security-doors
const v2PageDir = process.argv[3]; // e.g. app/doors/high-security-doors-v2

if (!origPageDir || !v2PageDir) {
  console.error('Usage: node assemble_jsx_page.js <origPageDir> <v2PageDir>');
  console.error('(run html_to_jsx.js on the same page first - reads its scratch/ output)');
  process.exit(1);
}

const origSrc = fs.readFileSync(path.join(origPageDir, 'page.tsx'), 'utf8');
const body = fs.readFileSync(path.join(process.cwd(), 'scratch', 'converted_body.jsx.txt'), 'utf8');
const headLinks = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'scratch', 'converted_head_links.json'), 'utf8')
);

// Extract the metadata object block
const metaMatch = origSrc.match(/export const metadata: Metadata = \{[\s\S]*?\n\};/);
if (!metaMatch) throw new Error('Could not find metadata block in ' + origPageDir);
const metadataBlock = metaMatch[0];

// Extract body className
const classMatch = origSrc.match(/className="([^"]+)"/);
if (!classMatch) throw new Error('Could not find body className in ' + origPageDir);
const bodyClass = classMatch[1];

// Extract trailing CTABlock (if any) - everything from <CTABlock to the matching />
const ctaMatch = origSrc.match(/<CTABlock[\s\S]*?\/>/);
const ctaBlock = ctaMatch ? ctaMatch[0] : '';
const needsCtaImport = !!ctaMatch;

const linkTags = headLinks
  .map((h, i) => `      <link key="pl${i}" rel="stylesheet" href="${h}" />`)
  .join('\n');

const out = `import type { Metadata } from "next";
import Link from "next/link";
${needsCtaImport ? 'import CTABlock from "@/components/CTABlock";\n' : ''}
${metadataBlock}

export default function Page() {
  return (
    <div
      className="${bodyClass}"
      suppressHydrationWarning
    >
${linkTags}
${body}${ctaBlock ? '      ' + ctaBlock + '\n' : ''}    </div>
  );
}
`;

fs.mkdirSync(v2PageDir, { recursive: true });
fs.writeFileSync(path.join(v2PageDir, 'page.tsx'), out);
console.log('Wrote', path.join(v2PageDir, 'page.tsx'), '-', out.split('\n').length, 'lines');
console.log('CTABlock found:', !!ctaMatch);
