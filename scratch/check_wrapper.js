const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('c:/Users/AJINKYA/OneDrive/Desktop/SH NEXT JS/secure-house-nextjs/app/content.html', 'utf-8');
const $ = cheerio.load(html, { decodeEntities: false });

console.log('--- INSIDE #wrapper ---');
$('#wrapper').children().each((i, el) => {
    if (el.type === 'tag') {
        console.log(`  <${el.name} id="${$(el).attr('id') || ''}" class="${$(el).attr('class') || ''}">`);
    }
});
