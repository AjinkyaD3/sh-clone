const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('app/content.html', 'utf-8');
const $ = cheerio.load(html);

console.log('--- BODY DIRECT CHILDREN ---');
$('body').children().each((i, el) => {
    console.log(`${el.name} | class: ${$(el).attr('class')} | id: ${$(el).attr('id')}`);
});

console.log('\n--- LOOKING FOR WRAPPER/MAIN ---');
const wrapper = $('#wrapper');
if (wrapper.length) {
    console.log('#wrapper found. Children:');
    wrapper.children().each((i, el) => {
        console.log(`  ${el.name} | class: ${$(el).attr('class')} | id: ${$(el).attr('id')}`);
    });
} else {
    console.log('No #wrapper found.');
}

const main = $('#main');
if (main.length) {
    console.log('#main found. Children:');
    main.children().each((i, el) => {
        console.log(`  ${el.name} | class: ${$(el).attr('class')} | id: ${$(el).attr('id')}`);
    });
} else {
    console.log('No #main found.');
}
