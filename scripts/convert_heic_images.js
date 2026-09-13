// One-off script: convert the 3 real .heic photos (iPhone format, unreadable
// by any browser) referenced on /garage-doors/side-hinged-garage-doors into
// .jpg using their own actual image data - not a placeholder swap. Confirmed
// this exact same bug exists on the live WordPress site too (naturalWidth/
// naturalHeight both 1x1 there), so there's no "correct" version to copy
// from elsewhere; converting the real source photos is the only real fix.
const fs = require("fs");
const path = require("path");
const convert = require("heic-convert");

const UPLOADS_DIR = path.join(__dirname, "..", "public", "legacy-assets", "uploads", "2025", "04");
const FILES = ["IMG_2238", "IMG_6231", "IMG_6232"];

async function main() {
  for (const name of FILES) {
    const src = path.join(UPLOADS_DIR, `${name}.heic`);
    const dest = path.join(UPLOADS_DIR, `${name}.jpg`);
    const inputBuffer = fs.readFileSync(src);
    const outputBuffer = await convert({
      buffer: inputBuffer,
      format: "JPEG",
      quality: 0.92,
    });
    fs.writeFileSync(dest, outputBuffer);
    console.log(`${name}.heic -> ${name}.jpg (${(outputBuffer.length / 1024).toFixed(0)}KB)`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
