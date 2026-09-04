const fs = require('fs');
const cheerio = require('cheerio');

const footerPath = 'c:/Users/AJINKYA/OneDrive/Desktop/SH NEXT JS/secure-house-nextjs/components/Footer.tsx';
let footerCode = fs.readFileSync(footerPath, 'utf-8');

// I will read the original dangerouslySetInnerHTML string from a clean state.
// Wait, the file is already modified. Let's read from the git history or just strip the html/body tags.
// Since the file is already modified, let me get the original html string by reading from an original content.html file if possible, or just strip the html/head/body from the current Footer.tsx.

// Let's just fix the JSX string that was generated.
let newFooterCode = footerCode
    .replace('<html>', '')
    .replace('</html>', '')
    .replace('<head></head>', '')
    .replace('<body>', '')
    .replace('</body>', '');

// Wait, the indenting will be weird.
// Let's just parse the HTML string from the current Footer.tsx ? No, it's already JSX.
// Let me just regex replace the html, head, body tags in the file.
newFooterCode = newFooterCode.replace(/^\s*<html>\n/gm, '');
newFooterCode = newFooterCode.replace(/^\s*<head><\/head>\n/gm, '');
newFooterCode = newFooterCode.replace(/^\s*<body>\n/gm, '');
newFooterCode = newFooterCode.replace(/^\s*<\/body>\n/gm, '');
newFooterCode = newFooterCode.replace(/^\s*<\/html>\n/gm, '');

// Also let's fix any React camelCase warnings we might get for attributes.
// The user asked to keep it EXACT, but React WILL throw errors if we don't camelCase attributes like `fill-rule` to `fillRule`. I already did that in the script.

fs.writeFileSync(footerPath, newFooterCode);
console.log("Cleaned up html/body tags from Footer.tsx.");
