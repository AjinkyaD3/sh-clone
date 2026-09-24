const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) {
        if (!file.startsWith('.') && file !== 'node_modules' && file !== '.next') {
          results = results.concat(walk(fullPath));
        }
      } else if (file.endsWith('page.tsx')) {
        results.push(fullPath);
      }
    });
  } catch (e) {}
  return results;
}

const pageFiles = walk('./app');

// For each page, parse its components and find the vertical margins/paddings
const pageReports = [];

pageFiles.forEach(pagePath => {
  const content = fs.readFileSync(pagePath, 'utf8');
  const importLines = content.split('\n').filter(l => l.startsWith('import ') && (l.includes('@/components/') || l.includes('../components/')));
  
  const components = [];
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
    if (fs.existsSync(compRel)) {
      const compContent = fs.readFileSync(compRel, 'utf8');
      // Extract spacing props
      const spRegex = /['"]?--(awb-(?:margin|padding)-(?:top|bottom)(?:-small)?)['"]?:\s*['"]?([0-9.]+)px?['"]?/g;
      let sMatch;
      const styles = {};
      while ((sMatch = spRegex.exec(compContent)) !== null) {
        const prop = sMatch[1];
        const val = parseFloat(sMatch[2]);
        // keep max value for that prop in this component
        styles[prop] = Math.max(styles[prop] || 0, val);
      }
      components.push({
        name: compName,
        file: compRel,
        styles
      });
    }
  });

  pageReports.push({
    page: pagePath.replace(/\\/g, '/'),
    components
  });
});

console.log(`Audited ${pageReports.length} pages.`);

// Find consecutive components where bottom spacing of A + top spacing of B >= 140px
const bigGaps = [];

pageReports.forEach(p => {
  for (let i = 0; i < p.components.length - 1; i++) {
    const a = p.components[i];
    const b = p.components[i+1];
    
    // Bottom space of A: margin-bottom + padding-bottom
    const aBottom = (a.styles['awb-margin-bottom'] || 0) + (a.styles['awb-padding-bottom'] || 0);
    // Top space of B: margin-top + padding-top
    const bTop = (b.styles['awb-margin-top'] || 0) + (b.styles['awb-padding-top'] || 0);

    const totalGap = aBottom + bTop;
    if (totalGap >= 130) {
      bigGaps.push({
        page: p.page,
        compA: a.name,
        compB: b.name,
        aBottom,
        bTop,
        totalGap,
        aMarginB: a.styles['awb-margin-bottom'] || 0,
        aPaddingB: a.styles['awb-padding-bottom'] || 0,
        bMarginT: b.styles['awb-margin-top'] || 0,
        bPaddingT: b.styles['awb-padding-top'] || 0,
      });
    }
  }
});

bigGaps.sort((a, b) => b.totalGap - a.totalGap);

console.log(`\nFound ${bigGaps.length} inter-section gaps >= 130px across the site!\n`);
console.log('Top 40 largest inter-section gaps:');
bigGaps.slice(0, 40).forEach(g => {
  console.log(`[${g.totalGap}px] in ${g.page}: ${g.compA} (b=${g.aBottom}px) -> ${g.compB} (t=${g.bTop}px)`);
});

// Group big gaps by page category:
const gapsByCategory = {
  products: bigGaps.filter(g => g.page.includes('/products/')),
  doors: bigGaps.filter(g => g.page.includes('/doors/')),
  doorStyles: bigGaps.filter(g => g.page.includes('/door-styles/')),
  garageDoors: bigGaps.filter(g => g.page.includes('/garage-doors/')),
  grillesShutters: bigGaps.filter(g => g.page.includes('/grilles-shutters/')),
  windows: bigGaps.filter(g => g.page.includes('/windows/')),
  homeAndOthers: bigGaps.filter(g => !g.page.includes('/doors/') && !g.page.includes('/door-styles/') && !g.page.includes('/garage-doors/') && !g.page.includes('/grilles-shutters/') && !g.page.includes('/windows/') && !g.page.includes('/products/'))
};

console.log('\n--- Big gaps (>=130px) count by section: ---');
Object.keys(gapsByCategory).forEach(cat => {
  console.log(`${cat}: ${gapsByCategory[cat].length} gaps`);
});
