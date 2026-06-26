# crm-adapter-kit-skill

Local-first CRM adapter planning kit for agent skills with schema checks and approval notes.

## Quickstart

```bash
npm test
npm run smoke
npm run release:check
```

## Release Verification

`npm run release:check` runs syntax checks, the placeholder build step, the
node test suite, a CLI fixture smoke, and package content verification.
`npm run package:smoke` asserts that the published tarball includes the CLI,
source, docs, fixtures, skill file, README, license, security policy,
contributing guide, and changelog.

## CLI

```bash
crm-adapter-kit fixtures/contact-request.json
crm-adapter-kit fixtures/batch-request.json --adapter=hubspot --format=markdown
```

The CLI validates sanitized CRM requests, normalizes fields, and prints dry-run action envelopes. A fixture can contain one record or a `records` array for a batch plan.

## Validation

- Contacts require `name` and `email`; emails are trimmed and lowercased.
- Notes require `contactId` and `body`.
- Tasks require `contactId` and `title`; optional `dueDate` must be `YYYY-MM-DD`.
- `--adapter=name` changes the planned adapter label without calling that system.
- `--format=markdown` renders a review summary for approval packets.

## Safety notes

- No CRM calls are made.
- Every planned CRM write is marked approval-required.
- Fixtures must not contain private customer data or credentials.

## Limitations

The MVP targets payload planning and validation. Real CRM adapters, OAuth, retries, and sync state are out of scope.

## Support Docs

- [Security policy](SECURITY.md)
- [Contributing guide](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)
