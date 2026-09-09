const fs = require('fs');

function cleanHead(headHtml) {
  // Extract all <style> tags and preserve them completely
  const styles = [];
  let processed = headHtml.replace(/<style[\s\S]*?<\/style>/gi, (match) => {
    styles.push(match);
    return `___STYLE_PLACEHOLDER_${styles.length - 1}___`;
  });
  
  // Extract all tags
  // We want to keep:
  // 1. Viewport meta: <meta name="viewport" ...> or <meta content="..." name="viewport">
  // 2. Charset meta: <meta charset="..."> or <meta http-equiv="Content-Type" ...>
  // 3. X-UA-Compatible: <meta http-equiv="X-UA-Compatible" ...>
  // 4. Stylesheet links: <link rel="stylesheet" ...>
  // 5. Icon links: <link rel="shortcut icon" ...>, <link rel="icon" ...>, <link rel="apple-touch-icon" ...>
  // 6. Style placeholders
  
  const lines = processed.split('\n');
  const keptLines = [];
  
  for (let line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    
    // Check if it's a style placeholder
    if (trimmed.includes('___STYLE_PLACEHOLDER_')) {
      keptLines.push(line);
      continue;
    }
    
    // Check meta tags
    if (/<meta\b/i.test(trimmed)) {
      const isViewport = /name=["']viewport["']/i.test(trimmed);
      const isCharset = /charset=/i.test(trimmed) || /http-equiv=["']Content-Type["']/i.test(trimmed);
      const isXUa = /http-equiv=["']X-UA-Compatible["']/i.test(trimmed);
      if (isViewport || isCharset || isXUa) {
        keptLines.push(line);
      }
      continue;
    }
    
    // Check link tags
    if (/<link\b/i.test(trimmed)) {
      const isStylesheet = /rel=["']stylesheet["']/i.test(trimmed);
      const isIcon = /rel=["'](shortcut icon|icon|apple-touch-icon)["']/i.test(trimmed);
      if (isStylesheet || isIcon) {
        keptLines.push(line);
      }
      continue;
    }
    
    // Everything else (scripts, templates, titles, feeds, oembed, rsd, etc.) is discarded
  }
  
  let result = keptLines.join('\n');
  // Restore styles
  styles.forEach((s, idx) => {
    result = result.replace(`___STYLE_PLACEHOLDER_${idx}___`, s);
  });
  
  return result;
}

const original = fs.readFileSync('app/content.html', 'utf8');
const headMatch = original.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
if (headMatch) {
  const cleaned = cleanHead(headMatch[1]);
  console.log("Original head length:", headMatch[1].length);
  console.log("Cleaned head length:", cleaned.length);
  console.log("Bytes saved in head:", headMatch[1].length - cleaned.length);
  
  console.log("\n=== NON-STYLE ELEMENTS IN CLEANED HEAD ===");
  console.log(cleaned.replace(/<style[\s\S]*?<\/style>/gi, '[STYLE TAG]').trim());
}
