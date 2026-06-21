const fs = require('node:fs');
const REQUIRED = { contact: ['name', 'email'], note: ['contactId', 'body'], task: ['contactId', 'title'] };
function readJson(file) { return JSON.parse(fs.readFileSync(file, 'utf8')); }
function missingFields(type, fields = {}) { return (REQUIRED[type] || []).filter((field) => !fields[field]); }
function normalizeRecord(input) {
  const type = input.type || 'contact';
  const fields = { ...(input.fields || {}) };
  if (type === 'contact' && fields.email) fields.email = String(fields.email).trim().toLowerCase();
  return { type, fields };
}
function planAdapterAction(input, options = {}) {
  const record = normalizeRecord(input);
  const missing = missingFields(record.type, record.fields);
  const action = { adapter: options.adapter || input.adapter || 'generic-crm', operation: 'upsert_' + record.type, dryRun: true, fields: record.fields };
  return {
    ok: missing.length === 0,
    requestId: input.id || 'crm-request',
    action,
    errors: missing.map((field) => 'missing field: ' + field),
    approval: { required: true, reason: 'CRM writes are external side effects and must be approved before execution.' },
    sideEffects: 'No CRM calls are made by this package.',
    evidence: ['validated required fields', 'normalized adapter payload', 'kept execution in dry-run mode']
  };
}
module.exports = { REQUIRED, missingFields, normalizeRecord, planAdapterAction, readJson };
