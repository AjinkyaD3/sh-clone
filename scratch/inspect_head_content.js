const fs = require('fs');

const content = fs.readFileSync('app/content.html', 'utf8');
const headMatch = content.match(/<head[^>]*>([\s\S]*?)<\/head>/i);

if (headMatch) {
  console.log("Found <head>! Length:", headMatch[1].length);
  // List all tags inside <head>
  const tags = headMatch[1].match(/<([a-zA-Z0-9\-]+)[^>]*>/g) || [];
  console.log("Total tags inside <head>:", tags.length);
  
  // Group by tag type
  const counts = {};
  for (const t of tags) {
    const tagName = t.match(/<([a-zA-Z0-9\-]+)/)[1];
    counts[tagName] = (counts[tagName] || 0) + 1;
  }
  console.log("Tag counts inside <head>:", counts);
  
  // Print all meta, link, script tags (not style)
  console.log("\n--- Non-style tags in <head> ---");
  const nonStyle = headMatch[1].replace(/<style[\s\S]*?<\/style>/gi, '');
  console.log(nonStyle.slice(0, 3000));
} else {
  console.log("No <head> match found!");
}
