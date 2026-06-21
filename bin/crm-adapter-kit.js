#!/usr/bin/env node
const { planAdapterAction, readJson } = require('../src');
const file = process.argv[2];
if (!file || process.argv.includes('--help')) { console.log('Usage: crm-adapter-kit <request.json>'); process.exit(file ? 0 : 1); }
const plan = planAdapterAction(readJson(file));
console.log(JSON.stringify(plan, null, 2));
process.exit(plan.ok ? 0 : 2);
