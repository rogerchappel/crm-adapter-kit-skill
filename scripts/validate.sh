#!/usr/bin/env bash
set -euo pipefail
npm test
npm run check
npm run build
node bin/crm-adapter-kit.js fixtures/contact-request.json >/tmp/crm-adapter-kit-skill-smoke.json
node -e "JSON.parse(require('fs').readFileSync('/tmp/crm-adapter-kit-skill-smoke.json','utf8')); console.log('smoke json ok')"
