# Orchestration

1. Collect a sanitized CRM request fixture, using `records` when planning multiple writes.
2. Run `crm-adapter-kit <fixture>` for JSON evidence.
3. Run `crm-adapter-kit <fixture> --format=markdown` when preparing an approval packet.
4. Review missing fields, normalized payloads, adapter label, and approval note.
5. Store the dry-run JSON or Markdown summary with run evidence.
6. Execute in a separate approved CRM workflow only after human approval.
