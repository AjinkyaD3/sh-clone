const fs = require('fs');

const content = fs.readFileSync('app/doors/content.html', 'utf8');
const headEnd = content.indexOf('</head>');
console.log(content.slice(headEnd, headEnd + 3000));
