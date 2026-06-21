# crm-adapter-kit-skill

## When to use

Use when an agent needs to prepare a CRM contact, note, or task payload and capture approval requirements before any external write.

## Required inputs

- A sanitized JSON request with `type` and `fields`.
- Local shell access for the CLI and tests.

## Side-effect boundaries

The skill is dry-run only. It must not call CRM APIs, store credentials, or mutate external accounts.

## Approval requirements

CRM writes require explicit human approval in a separate workflow. Save the generated JSON plan as evidence before execution elsewhere.

## Examples

```bash
npm run smoke
node bin/crm-adapter-kit.js fixtures/contact-request.json
```

## Validation workflow

Run `npm test`, `npm run check`, `npm run build`, `npm run smoke`, and `bash scripts/validate.sh`.
