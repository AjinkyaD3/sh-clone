const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('app/content.html', 'utf-8');
const $ = cheerio.load(html);

console.log('--- MAIN DIRECT CHILDREN ---');
const main = $('#main');
main.children().each((i, el) => {
    console.log(`${el.name} | class: ${$(el).attr('class')} | id: ${$(el).attr('id')}`);
});

console.log('\n--- FIRST FEW SECTIONS ---');
main.find('.fusion-fullwidth').each((i, el) => {
    if (i < 3) {
        console.log(`\nSection ${i+1}:`);
        console.log(`class: ${$(el).attr('class')}`);
        // look at immediate children classes
        $(el).children().each((j, child) => {
           console.log(`  -> ${child.name} | class: ${$(child).attr('class')}`);
        });
    }
});
