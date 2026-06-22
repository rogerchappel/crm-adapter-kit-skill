# Release Candidate

## Verification

- `npm test` - covers normalization, unsupported due-date shape, batch planning, Markdown summaries, and CLI exits.
- `npm run check` - syntax checks CommonJS entrypoints.
- `npm run build` - confirms package files are present.
- `npm run smoke` - emits a dry-run CRM action for the valid contact fixture.
- `node bin/crm-adapter-kit.js fixtures/batch-request.json --adapter=hubspot --format=markdown` - emits approval-packet summary.
- `bash scripts/validate.sh` - runs combined release validation.

## Classification

ship: practical dry-run adapter planner with fixture evidence and no external side effects.
