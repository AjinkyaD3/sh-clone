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
      
      // Find the outermost fullwidth-box or first div style
      const outerMatch = compContent.match(/className="[^"]*fullwidth-box[^"]*"[^>]*style=\{\{\s*([^}]+)\s*\}\s*as/s);
      const styles = {};
      if (outerMatch) {
        const styleText = outerMatch[1];
        const spRegex = /['"]?--(awb-(?:margin|padding)-(?:top|bottom)(?:-small)?)['"]?:\s*['"]?([0-9.]+)px?['"]?/g;
        let sMatch;
        while ((sMatch = spRegex.exec(styleText)) !== null) {
          styles[sMatch[1]] = parseFloat(sMatch[2]);
        }
      }

      // Also find the first column wrapper (often has section padding inside the fullwidth container)
      const firstColMatch = compContent.match(/className="[^"]*fusion-layout-column[^"]*"[^>]*style=\{\{\s*([^}]+)\s*\}\s*as/s);
      const colStyles = {};
      if (firstColMatch) {
        const colStyleText = firstColMatch[1];
        const spRegex = /['"]?--(awb-(?:margin|padding)-(?:top|bottom)(?:-small)?)['"]?:\s*['"]?([0-9.]+)px?['"]?/g;
        let sMatch;
        while ((sMatch = spRegex.exec(colStyleText)) !== null) {
          colStyles[sMatch[1]] = parseFloat(sMatch[2]);
        }
      }

      components.push({
        name: compName,
        file: compRel,
        rowStyles: styles,
        colStyles: colStyles
      });
    }
  });

  pageReports.push({
    page: pagePath.replace(/\\/g, '/'),
    components
  });
});

console.log(`Audited ${pageReports.length} pages (row-level & section-column level).`);

const sectionGaps = [];

pageReports.forEach(p => {
  for (let i = 0; i < p.components.length - 1; i++) {
    const a = p.components[i];
    const b = p.components[i+1];
    
    // Effective bottom of A:
    // row margin-bottom + row padding-bottom + column padding-bottom (if row has no padding)
    const aRowMB = a.rowStyles['awb-margin-bottom'] || 0;
    const aRowPB = a.rowStyles['awb-padding-bottom'] || 0;
    const aColPB = a.colStyles['awb-padding-bottom'] || 0;
    const aTotalB = aRowMB + (aRowPB > 0 ? aRowPB : aColPB);

    // Effective top of B:
    const bRowMT = b.rowStyles['awb-margin-top'] || 0;
    const bRowPT = b.rowStyles['awb-padding-top'] || 0;
    const bColPT = b.colStyles['awb-padding-top'] || 0;
    const bTotalT = bRowMT + (bRowPT > 0 ? bRowPT : bColPT);

    const total = aTotalB + bTotalT;
    if (total >= 100) {
      sectionGaps.push({
        page: p.page,
        compA: a.name,
        compB: b.name,
        aTotalB,
        bTotalT,
        total,
        details: `A(mb=${aRowMB}, pb=${aRowPB||aColPB}) + B(mt=${bRowMT}, pt=${bRowPT||bColPT})`
      });
    }
  }
});

sectionGaps.sort((a, b) => b.total - a.total);
console.log(`\nFound ${sectionGaps.length} section-to-section gaps >= 100px!`);
console.log('\nTop 40 largest gaps:');
sectionGaps.slice(0, 40).forEach(g => {
  console.log(`[${g.total.toFixed(0)}px] in ${g.page}: ${g.compA} -> ${g.compB} | ${g.details}`);
});

console.log('\n--- /products PAGE GAPS ---');
sectionGaps.filter(g => g.page.includes('products')).forEach(g => {
  console.log(`[${g.total.toFixed(0)}px] ${g.compA} -> ${g.compB} | ${g.details}`);
});
