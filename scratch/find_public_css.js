const fs = require('fs');
const path = require('path');

function walk(dir) {
  let res = [];
  if (!fs.existsSync(dir)) return res;
  const list = fs.readdirSync(dir);
  for (const f of list) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) res = res.concat(walk(full));
    else if (f.endsWith('.css')) res.push({ file: full, size: (fs.statSync(full).size / 1024).toFixed(1) + ' KB' });
  }
  return res;
}

console.log(walk('public'));
