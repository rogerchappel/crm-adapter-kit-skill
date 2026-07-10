const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const test = require('node:test');

test('CLI help entrypoint prints usage', () => {
  const result = spawnSync(process.execPath, ['bin/crm-adapter-kit.js', '--help'], { encoding: 'utf8' });
  assert.ok([0, 1, 2].includes(result.status), `unexpected exit status: ${result.status}`);
  assert.match(result.stdout + result.stderr, /Usage:/);
});
