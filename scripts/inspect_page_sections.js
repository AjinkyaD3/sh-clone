const fs = require('fs');
const path = require('path');

// Let's examine pages and their imported components
const pages = [
  'app/products/page.tsx',
  'app/doors/high-security-doors/page.tsx',
  'app/doors/communal-entrance-doors/page.tsx',
  'app/doors/industrial-style-doors/page.tsx',
  'app/doors/page.tsx',
  'app/garage-doors/sectional-garage-doors/page.tsx',
  'app/windows/high-security-steel-windows/page.tsx',
  'app/page.tsx'
];

function analyzePage(pagePath) {
  if (!fs.existsSync(pagePath)) return;
  const content = fs.readFileSync(pagePath, 'utf8');
  // Find component imports
  const importLines = content.split('\n').filter(l => l.startsWith('import ') && (l.includes('@/components/') || l.includes('../components/')));
  console.log(`\n================ PAGE: ${pagePath} ================`);
  importLines.forEach(line => {
    const m = line.match(/import\s+(\w+)\s+from\s+['"]([^'"]+)['"]/);
    if (!m) return;
    const compName = m[1];
    let compRel = m[2].replace('@/', '').replace('../', '');
    if (!compRel.endsWith('.tsx') && !compRel.endsWith('.ts')) {
      if (fs.existsSync(compRel + '.tsx')) compRel += '.tsx';
      else if (fs.existsSync(compRel + '/index.tsx')) compRel += '/index.tsx';
      else if (fs.existsSync(path.join('components', compRel.replace('components/', '') + '.tsx'))) {
        compRel = path.join('components', compRel.replace('components/', '') + '.tsx');
      }
    }
    // Read component
    if (fs.existsSync(compRel)) {
      const compContent = fs.readFileSync(compRel, 'utf8');
      // Extract outer row styles
      const outerRowMatch = compContent.match(/style=\{\{\s*([^}]+)\s*\}\s*as\s*unknown\s*as\s*React\.CSSProperties/);
      let spacingProps = [];
      if (outerRowMatch) {
        const styleStr = outerRowMatch[1];
        const spRegex = /['"]?--(awb-(?:margin|padding)-(?:top|bottom)(?:-small|-large|-medium)?)['"]?:\s*['"]?([0-9.]+px)?['"]?/g;
        let sMatch;
        while ((sMatch = spRegex.exec(styleStr)) !== null) {
          spacingProps.push(`${sMatch[1]}: ${sMatch[2]}`);
        }
      }
      // Also look for first column spacing
      const colRegex = /--awb-(?:margin|padding)-(?:top|bottom)(?:-small)?:\s*['"]?([0-9.]+px)['"]?/g;
      console.log(`  Component: ${compName} (${compRel})`);
      if (spacingProps.length > 0) {
        console.log(`    Row styles: ${spacingProps.join(', ')}`);
      }
      // Search for any values >= 60px in file
      const largeInFile = [];
      const lines = compContent.split('\n');
      lines.forEach((l, idx) => {
        const matches = l.match(/['"]?--(awb-(?:margin|padding)-(?:top|bottom)(?:-small|-large|-medium)?)['"]?:\s*['"]?([0-9.]+)(px)?['"]?/g);
        if (matches) {
          matches.forEach(m => {
            const num = parseFloat(m.match(/([0-9.]+)(?:px)?['"]?$/)[1]);
            if (num >= 60 && !m.includes('370') && !m.includes('400') && !m.includes('500') && !m.includes('433') && !m.includes('390')) {
              // Exclude card height trick padding (370px, 400px, etc. which are card image heights)
              largeInFile.push(`${m} (line ${idx+1})`);
            }
          });
        }
      });
      if (largeInFile.length > 0) {
        console.log(`    Spacing >= 60px: ${largeInFile.join('; ')}`);
      }
    }
  });
}

pages.forEach(analyzePage);
