#!/usr/bin/env node
const { planAdapterAction, planBatch, readJson, renderSummary } = require('../src');
const file = process.argv[2];
if (!file || process.argv.includes('--help')) { console.log('Usage: crm-adapter-kit <request.json> [--adapter=name] [--format=json|markdown]'); process.exit(file ? 0 : 1); }
const adapterArg = process.argv.find((arg) => arg.startsWith('--adapter='));
const formatArg = process.argv.find((arg) => arg.startsWith('--format='));
const adapter = adapterArg ? adapterArg.split('=')[1] : undefined;
const format = formatArg ? formatArg.split('=')[1] : 'json';
const request = readJson(file);
const plan = Array.isArray(request.records) ? planBatch(request, { adapter }) : planAdapterAction(request, { adapter });
if (format === 'markdown') {
  console.log(renderSummary(plan));
} else {
  console.log(JSON.stringify(plan, null, 2));
}
process.exit(plan.ok ? 0 : 2);
