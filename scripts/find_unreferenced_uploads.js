// One-off audit script: find files under public/legacy-assets/uploads that are
// never referenced (by basename) anywhere in the app's source or its own
// compiled CSS bundles. Used to move dead migration leftovers out of the
// Next.js project folder without guessing.
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const UPLOADS_DIR = path.join(ROOT, "public", "legacy-assets", "uploads");

function walk(dir, out = [], skipDirNames = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory() && skipDirNames.includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out, skipDirNames);
    else out.push(full);
  }
  return out;
}

// Build the haystack: every .tsx/.ts source file, plus every .css file
// anywhere under public (compiled fusion-styles bundles reference images via
// url(...) and are themselves what pages <link> to, so a file only used from
// inside one of these is still genuinely "used").
function collectHaystackFiles() {
  const files = [];
  for (const base of ["app", "components"]) {
    const dir = path.join(ROOT, base);
    if (fs.existsSync(dir)) {
      // app/legacy is being moved out of the project in this same pass, so
      // a file only referenced from inside it is going with it - don't let
      // it count as "still referenced" here.
      for (const f of walk(dir, [], ["legacy"])) {
        if (/\.(tsx?|jsx?|css|html)$/.test(f)) files.push(f);
      }
    }
  }
  const publicDir = path.join(ROOT, "public");
  for (const f of walk(publicDir)) {
    if (/\.css$/.test(f)) files.push(f);
  }
  return files;
}

const uploadFiles = walk(UPLOADS_DIR).filter((f) => !f.endsWith(".css"));
const haystackFiles = collectHaystackFiles();

let haystack = "";
for (const f of haystackFiles) {
  haystack += fs.readFileSync(f, "utf-8");
}

const unreferenced = [];
for (const f of uploadFiles) {
  const basename = path.basename(f);
  if (!haystack.includes(basename)) {
    unreferenced.push(path.relative(ROOT, f));
  }
}

console.log(`Total upload files (non-css): ${uploadFiles.length}`);
console.log(`Unreferenced: ${unreferenced.length}`);
fs.writeFileSync(
  path.join(__dirname, "unreferenced_uploads.txt"),
  unreferenced.join("\n") + "\n",
);
console.log("Full list written to scripts/unreferenced_uploads.txt");
