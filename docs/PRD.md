# crm-adapter-kit-skill PRD

Status: in-progress

## Problem

Agents often need to draft CRM updates, but raw connector calls risk malformed payloads, hidden side effects, and missing approval evidence.

## Users

- Agents preparing follow-up records after meetings or job-search work.
- Builders creating CRM connector adapters.

## MVP

- Local-first CLI and library API for CRM payload plans.
- Required-field validation for contacts, notes, and tasks.
- Fixture-backed tests and smoke command.
- Skill instructions that define approval boundaries.

## Non-goals

- Live CRM writes.
- Credential handling.
- Vendor-specific sync engines.
