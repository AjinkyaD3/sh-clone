// Moves original .jpg/.jpeg/.png files that now have a converted .webp sibling
// out of public/ into ../archive/pre-webp-originals/ (mirrors public/'s structure),
// preserving them per project convention instead of deleting.
const fs = require("fs");
const path = require("path");

const PUBLIC = path.join(__dirname, "..", "public");
const ARCHIVE = path.join(__dirname, "..", "..", "archive", "pre-webp-originals");
const exts = new Set([".jpg", ".jpeg", ".png"]);

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (exts.has(path.extname(entry.name).toLowerCase())) out.push(full);
  }
}

function main() {
  const files = [];
  walk(PUBLIC, files);

  let moved = 0;
  let leftInPlace = 0;

  for (const file of files) {
    const webpPath = file.replace(/\.(jpe?g|png)$/i, ".webp");
    if (!fs.existsSync(webpPath)) {
      leftInPlace++; // no webp was ever made for this one (conversion failure) - leave it
      continue;
    }
    const rel = path.relative(PUBLIC, file);
    const dest = path.join(ARCHIVE, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.renameSync(file, dest);
    moved++;
  }

  console.log(`Moved to archive: ${moved}, left in place (no webp made): ${leftInPlace}`);
}

main();
