const fs = require('fs');

const content = fs.readFileSync('app/content.html', 'utf8');
const headMatch = content.match(/<head[^>]*>([\s\S]*?)<\/head>/i);

if (headMatch) {
  const head = headMatch[1];
  // Extract all tags except style
  const lines = head.split('\n');
  let inStyle = false;
  let inScript = false;
  let nonStyleLines = [];
  
  for (const line of lines) {
    if (line.includes('<style')) inStyle = true;
    if (line.includes('<script')) inScript = true;
    
    if (!inStyle && !inScript) {
      if (line.trim()) nonStyleLines.push(line);
    }
    
    if (line.includes('</style>')) inStyle = false;
    if (line.includes('</script>')) inScript = false;
  }
  
  console.log("=== Non-style, non-script lines in <head> ===");
  console.log(nonStyleLines.join('\n'));
  
  // Also check what scripts are in <head>
  console.log("\n=== Scripts in <head> ===");
  const scripts = head.match(/<script[\s\S]*?<\/script>/gi) || [];
  for (const s of scripts) {
    console.log(s.slice(0, 200) + (s.length > 200 ? '... [len: ' + s.length + ']' : ''));
  }
}
