// Renames RowN.tsx -> a descriptive name inferred from the component's own
// content, and updates the corresponding import + JSX usage in the parent
// page.tsx. Conservative on purpose: a wrong guess (e.g. calling a
// testimonials block "IntroText") is worse than the honest-but-unhelpful
// RowN, so any file where no reliable signal is found keeps its RowN name
// rather than getting a bad one. Supports --dry to preview without writing,
// and an optional folder argument to run on just one page for a pilot check.
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const COMPONENTS_DIR = path.join(ROOT, "components");
const DRY = process.argv.includes("--dry");
const onlyFolder = process.argv.find((a) => !a.startsWith("--") && a !== process.argv[0] && a !== process.argv[1]);

const STOPWORDS = new Set([
  "a", "an", "the", "of", "for", "and", "or", "to", "in", "on", "with",
  "your", "our", "is", "are", "at",
]);

function toPascalCase(rawText) {
  // Some headings repeat a boilerplate prefix before the actually
  // distinguishing part, e.g. "Security sectional garage doors London: R40
  // Sectional" vs "...: TL Sectional" - without this, a 5-word cap would
  // truncate every variant on this page down to the identical shared
  // prefix. Prefer whatever comes after a colon, if there is one.
  const text = rawText.includes(":") && rawText.split(":")[1].trim().length >= 3
    ? rawText.split(":").slice(1).join(":").trim()
    : rawText;
  const words = text
    .replace(/[’'"“”]/g, "")
    .replace(/[^a-zA-Z0-9\s-]/g, " ")
    .split(/[\s-]+/)
    .filter(Boolean)
    .filter((w, i) => i === 0 || !STOPWORDS.has(w.toLowerCase()))
    .slice(0, 6);
  const name = words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join("");
  // A component/file name can't start with a digit (invalid JS identifier) -
  // this bit the first real run (e.g. "200+ designs" -> "200Designs").
  // Drop a purely-numeric leading word rather than silently producing
  // something that fails to compile.
  return /^[0-9]/.test(name) ? words.slice(1).map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join("") : name;
}

function extractHeadingName(src) {
  // Headings in this codebase render as `<h1 ...>{` text `}</h1>` (or similar
  // template-literal text nodes) - find the first h1-h6 and pull its
  // rendered text out, skipping ones with no real text (icon-only, etc).
  const headingRe = /<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/g;
  let m;
  while ((m = headingRe.exec(src))) {
    const inner = m[1];
    // Headings often split their text across multiple template-literal
    // chunks separated by <br />, e.g. `What are the key` / `aspects of
    // safe rooms?` - concatenate every chunk, not just the first, or a
    // heading like that truncates to something like "WhatKey".
    const chunks = [...inner.matchAll(/\{`([^`]*)`\}/g), ...inner.matchAll(/\{"([^"]*)"\}/g)]
      .map((c) => c[1].trim())
      .filter(Boolean);
    let text = chunks.join(" ").trim();
    if (!text) {
      const plain = inner.match(/>\s*([A-Za-z][^<{]{2,80})\s*</);
      if (plain) text = plain[1].trim();
    }
    if (text.length >= 3 && /[a-zA-Z]/.test(text)) {
      const name = toPascalCase(text);
      if (name.length >= 3) return name;
    }
  }
  return null;
}

function extractFallbackName(src) {
  const checks = [
    [/fusion-testimonials/, "Testimonials"],
    [/fusion-form-builder|fusion-form fusion-form/, "EnquiryForm"],
    [/awb-gallery|fusion-gallery/, "Gallery"],
    [/youtube\.com\/embed/, "VideoEmbed"],
    [/<video\b/, "Video"],
    [/fusion-image-carousel/, "ImageCarousel"],
    [/awb-swiper-full-sections|fusion-scroll-section/, "ScrollStackCards"],
    [/<table\b/, "SpecTable"],
    [/toggle-content|fusion-toggle/, "FAQAccordion"],
    [/fusion-column-liftup-border/, "CategoryCards"],
    [/fusion-map|google.*map/i, "MapEmbed"],
    [/SystemOverviewModal/, "SystemOverview"],
    [/GetAQuote/, "GetAQuoteSection"],
    [/TrustLogos|awb-image-carousel-wrapper/, "TrustLogos"],
  ];
  for (const [re, name] of checks) {
    if (re.test(src)) return name;
  }
  return null;
}

function processFolder(folder) {
  const files = fs
    .readdirSync(folder)
    .filter((f) => /^Row\d+\.tsx$/.test(f))
    .sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]));
  if (files.length === 0) return [];

  const pageFile = findPageFile(folder);
  if (!pageFile) return files.map((f) => ({ folder, file: f, skipped: "no page.tsx found importing this folder" }));

  const usedNames = new Set();
  const renames = [];

  for (const file of files) {
    const full = path.join(folder, file);
    const src = fs.readFileSync(full, "utf-8");
    let name = extractHeadingName(src) || extractFallbackName(src);
    const rowNum = file.match(/\d+/)[0];

    if (!name) {
      renames.push({ folder, file, skipped: "no reliable signal" });
      continue;
    }

    let finalName = name;
    let suffix = 2;
    while (usedNames.has(finalName) || finalName === "Row" + rowNum) {
      finalName = name + suffix;
      suffix++;
    }
    usedNames.add(finalName);
    renames.push({ folder, file, newName: finalName + ".tsx", oldComponent: "Row" + rowNum, newComponent: finalName });
  }

  return { pageFile, renames };
}

function findPageFile(folder) {
  const rel = path.relative(COMPONENTS_DIR, folder).split(path.sep).join("/");
  const candidate = path.join(ROOT, "app", rel, "page.tsx");
  return fs.existsSync(candidate) ? candidate : null;
}

function applyRenames(pageFile, renames) {
  const actionable = renames.filter((r) => r.newName);
  if (actionable.length === 0) return { pageFile, changed: 0 };

  let pageSrc = fs.readFileSync(pageFile, "utf-8");
  const folder = actionable[0].folder;

  for (const r of actionable) {
    const oldPath = path.join(folder, r.file);
    const newPath = path.join(folder, r.newName);
    if (!DRY) {
      execSync(`git mv "${oldPath}" "${newPath}"`, { cwd: ROOT });
    }
    // import Row3 from "@/components/x/Row3";  ->  import Foo from "@/components/x/Foo";
    const importRe = new RegExp(
      `import ${r.oldComponent} from "([^"]*?)${r.oldComponent}";`,
    );
    pageSrc = pageSrc.replace(importRe, `import ${r.newComponent} from "$1${r.newComponent}";`);
    // <Row3 />  ->  <Foo />
    const usageRe = new RegExp(`<${r.oldComponent}\\s*/>`, "g");
    pageSrc = pageSrc.replace(usageRe, `<${r.newComponent} />`);
  }

  if (!DRY) fs.writeFileSync(pageFile, pageSrc, "utf-8");
  return { pageFile, changed: actionable.length, preview: DRY ? pageSrc : undefined };
}

function main() {
  const folders = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        const full = path.join(dir, entry.name);
        if (fs.readdirSync(full).some((f) => /^Row\d+\.tsx$/.test(f))) folders.push(full);
        walk(full);
      }
    }
  }
  walk(COMPONENTS_DIR);

  const targetFolders = onlyFolder
    ? folders.filter((f) => f.includes(onlyFolder))
    : folders;

  let totalRenamed = 0;
  let totalSkipped = 0;

  for (const folder of targetFolders) {
    const result = processFolder(folder);
    if (Array.isArray(result)) {
      totalSkipped += result.length;
      console.log(`SKIP FOLDER ${path.relative(ROOT, folder)}: ${result[0]?.skipped}`);
      continue;
    }
    const { pageFile, renames } = result;
    console.log(`\n${path.relative(ROOT, folder)}:`);
    for (const r of renames) {
      if (r.newName) {
        console.log(`  ${r.file} -> ${r.newName}`);
        totalRenamed++;
      } else {
        console.log(`  ${r.file} -> (kept, ${r.skipped})`);
        totalSkipped++;
      }
    }
    if (pageFile) applyRenames(pageFile, renames);
  }

  console.log(`\n\nTotal renamed: ${totalRenamed}, kept as-is: ${totalSkipped}`);
}

main();
