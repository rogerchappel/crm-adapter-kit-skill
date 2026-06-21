const test = require('node:test');
const assert = require('node:assert/strict');
const { execFileSync, spawnSync } = require('node:child_process');
const { missingFields, normalizeRecord, planAdapterAction } = require('../src');
test('normalizes contact email', () => { const r = normalizeRecord({ type: 'contact', fields: { name: 'Ada', email: ' ADA@EXAMPLE.COM ' } }); assert.equal(r.fields.email, 'ada@example.com'); });
test('reports missing required fields', () => { assert.deepEqual(missingFields('task', { title: 'Follow up' }), ['contactId']); });
test('plans approved dry-run CRM action', () => { const plan = planAdapterAction({ type: 'contact', fields: { name: 'Ada', email: 'ada@example.com' } }); assert.equal(plan.ok, true); assert.equal(plan.action.dryRun, true); assert.equal(plan.approval.required, true); });
test('cli emits JSON for valid fixture', () => { const out = execFileSync(process.execPath, ['bin/crm-adapter-kit.js', 'fixtures/contact-request.json'], { encoding: 'utf8' }); assert.equal(JSON.parse(out).ok, true); });
test('cli exits nonzero for invalid fixture', () => { const r = spawnSync(process.execPath, ['bin/crm-adapter-kit.js', 'fixtures/bad-task-request.json'], { encoding: 'utf8' }); assert.equal(r.status, 2); assert.match(r.stdout, /missing field/); });
