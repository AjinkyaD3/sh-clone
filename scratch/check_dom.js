const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('c:/Users/AJINKYA/OneDrive/Desktop/SH NEXT JS/secure-house-nextjs/app/content.html', 'utf-8');
const $ = cheerio.load(html, { decodeEntities: false });

console.log('--- BEFORE FIX DUPLICATES ---');
console.log('Checking headers and footers');

const topLevelNodes = $('body').children();
topLevelNodes.each((i, el) => {
    if (el.type === 'tag') {
        const id = $(el).attr('id') || '';
        const cls = $(el).attr('class') || '';
        if (id.includes('header') || id.includes('footer') || cls.includes('header') || cls.includes('footer') || id.includes('wrapper') || cls.includes('wrapper')) {
            console.log(`<${el.name} id="${id}" class="${cls}">`);
        }
    }
});

// Since we know `.fusion-tb-footer` was removed, let's see what is inside `#boxed-wrapper`!
console.log('\n--- INSIDE #boxed-wrapper ---');
$('#boxed-wrapper').children().each((i, el) => {
    if (el.type === 'tag') {
        console.log(`  <${el.name} id="${$(el).attr('id') || ''}" class="${$(el).attr('class') || ''}">`);
    }
});
