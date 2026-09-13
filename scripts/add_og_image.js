// Follow-up to add_open_graph.js: that script added openGraph/twitter
// blocks to every page but omitted `images`, which meant every page's own
// openGraph silently overrode (not merged with) the layout's default image -
// see lib/seo.ts for why. This adds `images: [DEFAULT_OG_IMAGE]` /
// `images: [DEFAULT_OG_IMAGE.url]` to every already-inserted block, plus
// the shared import, on every real page.
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = path.join(__dirname, "..");

function relativeImportPath(file) {
  const depth = path.relative(ROOT, path.dirname(file)).split(path.sep).length;
  return "../".repeat(depth) + "lib/seo";
}

function process(file) {
  let src = fs.readFileSync(file, "utf-8");
  if (!/openGraph:\s*\{/.test(src)) return { file, skipped: "no openGraph block" };
  if (/DEFAULT_OG_IMAGE/.test(src)) return { file, skipped: "already wired" };

  // Add the import right after the last existing import line.
  const importLines = [...src.matchAll(/^import .+;$/gm)];
  const lastImport = importLines[importLines.length - 1];
  const importPath = relativeImportPath(file);
  src =
    src.slice(0, lastImport.index + lastImport[0].length) +
    `\nimport { DEFAULT_OG_IMAGE } from "${importPath}";` +
    src.slice(lastImport.index + lastImport[0].length);

  // openGraph: { ... url: "...", }  ->  add images: [DEFAULT_OG_IMAGE] before the closing brace.
  src = src.replace(
    /(openGraph:\s*\{[^}]*?)\n(\s*)\},/,
    (m, inner, indent) => `${inner}\n${indent}  images: [DEFAULT_OG_IMAGE],\n${indent}},`,
  );
  // twitter: { ... }  -> add images: [DEFAULT_OG_IMAGE.url] before its closing brace.
  src = src.replace(
    /(twitter:\s*\{[^}]*?)\n(\s*)\},/,
    (m, inner, indent) => `${inner}\n${indent}  images: [DEFAULT_OG_IMAGE.url],\n${indent}},`,
  );

  fs.writeFileSync(file, src, "utf-8");
  return { file, done: true };
}

const files = execSync('git ls-files "app/**/page.tsx"', { cwd: ROOT, encoding: "utf-8" })
  .split("\n")
  .filter(Boolean)
  .filter((f) => !f.startsWith("app/legacy/") && !f.includes("[slug]"));

const results = files.map((f) => process(path.join(ROOT, f)));
const done = results.filter((r) => r.done);
const skipped = results.filter((r) => r.skipped);

console.log(`Updated: ${done.length}`);
console.log(`Skipped: ${skipped.length}`);
skipped.forEach((r) => console.log("  " + path.relative(ROOT, r.file) + " - " + r.skipped));
