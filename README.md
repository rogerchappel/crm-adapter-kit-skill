# crm-adapter-kit-skill

Local-first CRM adapter planning kit for agent skills with schema checks and approval notes.

## Quickstart

```bash
npm test
npm run smoke
```

## CLI

```bash
crm-adapter-kit fixtures/contact-request.json
```

The CLI validates a sanitized CRM request, normalizes fields, and prints a dry-run action envelope.

## Safety notes

- No CRM calls are made.
- Every planned CRM write is marked approval-required.
- Fixtures must not contain private customer data or credentials.

## Limitations

The MVP targets payload planning and validation. Real CRM adapters, OAuth, retries, and sync state are out of scope.
