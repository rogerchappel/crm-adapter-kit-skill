const { spawnSync } = require('node:child_process');

const result = spawnSync('npm', ['pack', '--dry-run'], { encoding: 'utf8' });
const output = `${result.stdout || ''}\n${result.stderr || ''}`;
if (result.status !== 0) {
  process.stdout.write(output);
  process.exit(result.status || 1);
}
const required = [
  'bin/crm-adapter-kit.js',
  'src/index.js',
  'docs/RELEASE_CANDIDATE.md',
  'fixtures/contact-request.json',
  'SKILL.md',
  'README.md',
  'LICENSE',
  'SECURITY.md',
  'CONTRIBUTING.md',
  'CHANGELOG.md'
];

for (const path of required) {
  if (!output.includes(path)) {
    throw new Error(`missing package entry: ${path}`);
  }
}

console.log(output.trim());
console.log('package smoke ok');
