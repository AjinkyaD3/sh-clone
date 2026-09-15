// Rewrites .jpg/.jpeg/.png references to .webp in source files, but only when
// the corresponding .webp file actually exists under public/ (produced by
// convert_to_webp.js). Safe to re-run; a path with no .webp sibling is left alone.
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");

// Directories to scan for source files referencing images.
const SCAN_DIRS = ["app", "components", "data", "lib", "public/legacy-assets/css", "public/legacy-assets/uploads/fusion-styles"];
const SCAN_EXTS = new Set([".tsx", ".ts", ".json", ".css"]);

function walk(dir, out) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next") continue;
      walk(full, out);
    } else if (SCAN_EXTS.has(path.extname(entry.name).toLowerCase())) {
      out.push(full);
    }
  }
}

function hasWebpSibling(publicRelativePath) {
  const webpRel = publicRelativePath.replace(/\.(jpe?g|png)$/i, ".webp");
  return fs.existsSync(path.join(PUBLIC, webpRel));
}

function main() {
  const explicit = process.argv.slice(2);
  const files = [];
  if (explicit.length) {
    for (const f of explicit) {
      const full = path.resolve(ROOT, f);
      if (fs.statSync(full).isDirectory()) walk(full, files);
      else files.push(full);
    }
  } else {
    for (const d of SCAN_DIRS) walk(path.join(ROOT, d), files);
  }

  const imgRefRegex = /(\/legacy-assets\/[^\s"'()]+?\.(?:jpe?g|png))/gi;

  let filesChanged = 0;
  let refsChanged = 0;
  const skippedNoWebp = new Set();

  for (const file of files) {
    let content = fs.readFileSync(file, "utf8");
    let changed = false;

    content = content.replace(imgRefRegex, (match) => {
      const publicRelative = match; // already starts with /legacy-assets/...
      if (hasWebpSibling(publicRelative)) {
        refsChanged++;
        changed = true;
        return publicRelative.replace(/\.(jpe?g|png)$/i, ".webp");
      }
      skippedNoWebp.add(publicRelative);
      return match;
    });

    if (changed) {
      fs.writeFileSync(file, content, "utf8");
      filesChanged++;
    }
  }

  console.log(`Files changed: ${filesChanged}, references rewritten: ${refsChanged}`);
  if (skippedNoWebp.size) {
    console.log(`Skipped (no .webp sibling found), ${skippedNoWebp.size} unique paths:`);
    for (const p of skippedNoWebp) console.log("  " + p);
  }
}

main();
