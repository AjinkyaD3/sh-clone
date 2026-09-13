// One-off codemod: every real page already has a static `export const
// metadata` object with title/description/canonical - this adds a matching
// openGraph + twitter block reusing those exact same strings, rather than
// leaving every page to fall back to the generic site-wide default in
// app/layout.tsx. Skips app/legacy (dead, excluded from the index anyway)
// and any file using generateMetadata (dynamic routes - out of scope here).
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = path.join(__dirname, "..");

function extractQuoted(source, key) {
  // Matches: key: "..."  or  key:\n  "..."  (single/double/backtick quotes)
  const re = new RegExp(`${key}:\\s*\\n?\\s*(["'\`])((?:\\\\.|(?!\\1)[\\s\\S])*)\\1`);
  const m = source.match(re);
  return m ? m[2] : null;
}

function process(file) {
  const src = fs.readFileSync(file, "utf-8");
  if (!/export const metadata: Metadata = \{/.test(src)) return { file, skipped: "no static metadata export" };
  if (/openGraph:/.test(src)) return { file, skipped: "already has openGraph" };

  const blockMatch = src.match(/export const metadata: Metadata = \{([\s\S]*?)\n\};/);
  if (!blockMatch) return { file, skipped: "couldn't isolate metadata block" };
  const block = blockMatch[1];

  const title = extractQuoted(block, "title");
  const description = extractQuoted(block, "description");
  const canonical = extractQuoted(block, "canonical");
  if (!title || !description) return { file, skipped: "missing title/description" };

  const esc = (s) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

  const ogBlock = `  openGraph: {
    title: "${esc(title)}",
    description: "${esc(description)}",${canonical ? `\n    url: "${esc(canonical)}",` : ""}
  },
  twitter: {
    card: "summary_large_image",
    title: "${esc(title)}",
    description: "${esc(description)}",
  },
`;

  const newSrc = src.replace(
    /export const metadata: Metadata = \{([\s\S]*?)\n\};/,
    (full, inner) => `export const metadata: Metadata = {${inner}\n${ogBlock}};`,
  );

  fs.writeFileSync(file, newSrc, "utf-8");
  return { file, done: true };
}

const files = execSync('git ls-files "app/**/page.tsx"', { cwd: ROOT, encoding: "utf-8" })
  .split("\n")
  .filter(Boolean)
  .filter((f) => !f.startsWith("app/legacy/"));

const results = files.map((f) => process(path.join(ROOT, f)));
const done = results.filter((r) => r.done);
const skipped = results.filter((r) => r.skipped);

console.log(`Updated: ${done.length}`);
done.forEach((r) => console.log("  " + path.relative(ROOT, r.file)));
console.log(`Skipped: ${skipped.length}`);
skipped.forEach((r) => console.log("  " + path.relative(ROOT, r.file) + " - " + r.skipped));
