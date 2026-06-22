const fs = require('node:fs');
const REQUIRED = { contact: ['name', 'email'], note: ['contactId', 'body'], task: ['contactId', 'title'] };
const SUPPORTED_TYPES = Object.keys(REQUIRED);
function readJson(file) { return JSON.parse(fs.readFileSync(file, 'utf8')); }
function missingFields(type, fields = {}) { return (REQUIRED[type] || []).filter((field) => !fields[field]); }
function isIsoDate(value) { return /^\d{4}-\d{2}-\d{2}$/.test(String(value || '')); }
function normalizeRecord(input) {
  const type = input.type || 'contact';
  const fields = { ...(input.fields || {}) };
  if (type === 'contact' && fields.email) fields.email = String(fields.email).trim().toLowerCase();
  if (type === 'contact' && fields.name) fields.name = String(fields.name).trim();
  if (type === 'note' && fields.body) fields.body = String(fields.body).trim();
  if (type === 'task' && fields.title) fields.title = String(fields.title).trim();
  if (type === 'task' && fields.priority) fields.priority = String(fields.priority).toLowerCase();
  return { type, fields };
}
function validateRecord(record) {
  const errors = [];
  if (!SUPPORTED_TYPES.includes(record.type)) errors.push('unsupported type: ' + record.type);
  errors.push(...missingFields(record.type, record.fields).map((field) => 'missing field: ' + field));
  if (record.type === 'contact' && record.fields.email && !String(record.fields.email).includes('@')) errors.push('invalid email');
  if (record.type === 'task' && record.fields.dueDate && !isIsoDate(record.fields.dueDate)) errors.push('dueDate must be YYYY-MM-DD');
  return errors;
}
function planAdapterAction(input, options = {}) {
  const record = normalizeRecord(input);
  const errors = validateRecord(record);
  const action = { adapter: options.adapter || input.adapter || 'generic-crm', operation: 'upsert_' + record.type, dryRun: true, fields: record.fields };
  return {
    ok: errors.length === 0,
    requestId: input.id || 'crm-request',
    action,
    errors,
    approval: { required: true, reason: 'CRM writes are external side effects and must be approved before execution.' },
    sideEffects: 'No CRM calls are made by this package.',
    evidence: ['validated required fields', 'normalized adapter payload', 'kept execution in dry-run mode']
  };
}
function planBatch(input, options = {}) {
  const records = Array.isArray(input.records) ? input.records : [input];
  const plans = records.map((record, index) => planAdapterAction({ id: record.id || 'crm-request-' + (index + 1), ...record }, options));
  return {
    ok: plans.every((plan) => plan.ok),
    count: plans.length,
    validCount: plans.filter((plan) => plan.ok).length,
    plans,
    approval: { required: true, reason: 'Batch CRM writes require review of every planned operation before execution.' },
    sideEffects: 'No CRM calls are made by this package.'
  };
}
function renderSummary(plan) {
  const plans = plan.plans || [plan];
  const rows = plans.map((item) => '- ' + item.requestId + ': ' + item.action.operation + ' via ' + item.action.adapter + ' - ' + (item.ok ? 'ready for approval' : item.errors.join('; ')));
  return '# CRM adapter dry-run plan\n\nStatus: ' + (plan.ok ? 'ready for approval' : 'blocked') + '\n\n' + rows.join('\n') + '\n\nApproval required before any CRM write.\n';
}
module.exports = { REQUIRED, SUPPORTED_TYPES, isIsoDate, missingFields, normalizeRecord, planAdapterAction, planBatch, readJson, renderSummary, validateRecord };
