const fs = require('fs');
const path = require('path');

function findHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(findHtmlFiles(fullPath));
    } else if (file === 'content.html') {
      results.push(fullPath);
    }
  }
  return results;
}

const files = findHtmlFiles('app');
const linkCategories = {
  stylesheet: new Set(),
  icon: new Set(),
  canonical: new Set(),
  feed: new Set(),
  oembed: new Set(),
  rest_api: new Set(),
  rsd: new Set(),
  shortlink: new Set(),
  dns_prefetch: new Set(),
  other: new Set()
};

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const headMatch = content.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  if (!headMatch) continue;
  
  const links = headMatch[1].match(/<link[^>]*>/gi) || [];
  for (const l of links) {
    const cleanL = l.replace(/\s+/g, ' ').trim();
    if (/rel=["']stylesheet["']/i.test(cleanL)) {
      linkCategories.stylesheet.add(cleanL);
    } else if (/rel=["'](shortcut icon|icon|apple-touch-icon)["']/i.test(cleanL)) {
      linkCategories.icon.add(cleanL);
    } else if (/rel=["']canonical["']/i.test(cleanL)) {
      linkCategories.canonical.add(cleanL);
    } else if (/rel=["']alternate["'][^>]*type=["']application\/rss\+xml["']/i.test(cleanL)) {
      linkCategories.feed.add(cleanL);
    } else if (/oembed/i.test(cleanL)) {
      linkCategories.oembed.add(cleanL);
    } else if (/api\.w\.org|wp\/v2/i.test(cleanL)) {
      linkCategories.rest_api.add(cleanL);
    } else if (/rsd/i.test(cleanL)) {
      linkCategories.rsd.add(cleanL);
    } else if (/shortlink/i.test(cleanL)) {
      linkCategories.shortlink.add(cleanL);
    } else if (/dns-prefetch/i.test(cleanL)) {
      linkCategories.dns_prefetch.add(cleanL);
    } else {
      linkCategories.other.add(cleanL);
    }
  }
}

for (const [cat, set] of Object.entries(linkCategories)) {
  console.log(`=== CATEGORY: ${cat} (Count: ${set.size}) ===`);
  for (const item of Array.from(set).slice(0, 5)) {
    console.log(" ", item);
  }
  if (set.size > 5) console.log(`  ... and ${set.size - 5} more`);
}
