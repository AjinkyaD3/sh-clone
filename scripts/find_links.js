const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('app/doors/content.html', 'utf8');
const $ = cheerio.load(html);

$('a').each((i, el) => {
  const href = $(el).attr('href');
  if (href) {
    console.log($(el).text().trim(), href);
  }
});
