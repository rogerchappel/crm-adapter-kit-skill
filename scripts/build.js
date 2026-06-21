const fs = require('node:fs');
fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/package-check.txt', 'crm-adapter-kit-skill build ok\n');
console.log('built crm-adapter-kit-skill');
