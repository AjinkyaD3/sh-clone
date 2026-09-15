// Converts every .jpg/.jpeg/.png under public/ to a sibling .webp file.
// Originals are left in place (not deleted) - reference-rewrite and deletion are separate steps.
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..", "public");
const exts = new Set([".jpg", ".jpeg", ".png"]);

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (exts.has(path.extname(entry.name).toLowerCase())) out.push(full);
  }
}

async function main() {
  const files = [];
  walk(ROOT, files);

  let converted = 0;
  let skipped = 0;
  let failed = 0;
  let origBytes = 0;
  let webpBytes = 0;

  for (const file of files) {
    const webpPath = file.replace(/\.(jpe?g|png)$/i, ".webp");
    if (fs.existsSync(webpPath)) {
      skipped++;
      continue;
    }
    try {
      await sharp(file).webp({ quality: 82 }).toFile(webpPath);
      origBytes += fs.statSync(file).size;
      webpBytes += fs.statSync(webpPath).size;
      converted++;
    } catch (err) {
      failed++;
      console.error("FAILED:", file, err.message);
    }
  }

  console.log(`Converted: ${converted}, skipped (already exist): ${skipped}, failed: ${failed}`);
  console.log(`Original bytes: ${origBytes}, webp bytes: ${webpBytes}, saved: ${((1 - webpBytes / origBytes) * 100).toFixed(1)}%`);
}

main();
