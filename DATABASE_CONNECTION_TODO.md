# Database Connection TODO

**Not implemented yet.** This file is a planning checklist only.

## Purpose
Track which parts of the current mock UI (Phase 2) will need a real database,
file storage, authentication, or backend connection in later phases. It exists
so future sessions (Phase 3 onward) know exactly what to wire up without
re-deriving it from scratch by reading every component.

## Current Phase Note
- We are still in **Phase 2 — Mock UI** (see [[ROADMAP.md]]).
- Everything listed below is a forward-looking checklist, not a spec to build now.
- **Do not implement database/storage from this file yet.** Wiring starts in
  Phase 3 (Database Schema) and Phase 4 (Authentication) per `ROADMAP.md`, and
  only after the user explicitly approves moving into that phase.

## Database Entities Likely Needed Later
- `properties`
- `rooms`
- `tenants`
- `leases`
- `meter_readings`
- `invoices`
- `invoice_items`
- `payments`
- `maintenance_requests`
- `contact_logs`
- `tenant_documents`
- `document_attachments`
- `users` / `staff_profiles`
- `roles` / `permissions`

## Storage Items Likely Needed Later (Supabase Storage)
- Tenant identity documents (ID card, house registration)
- Lease contract files
- Payment proof images (transfer slips, deposit proof)
- Contact log images (LINE chat screenshots, payment slips, room condition photos)
- Maintenance photos
- Room move-in photos
- Room move-out photos

## Per-Module Future Database Connection Notes

### Dashboard
- Replace static summary numbers with live aggregates: occupancy, outstanding
  balances, income summary — computed from `rooms`, `leases`, `invoices`, `payments`.

### Rooms
- Replace mock room list/cards with `rooms` table rows (status, floor, rent).
- Room status transitions (vacant/occupied/maintenance) need to write back to `rooms`.

### Tenants
- Replace mock tenant list (`src/lib/mock-tenants.ts`) with `tenants` + `leases` rows.
- Tenant edit/add dialogs need real create/update against `tenants`.
- "บันทึกการติดต่อ" (contact log dialog) needs a real `contact_logs` table, with
  attached photos saved to Supabase Storage and tracked in `document_attachments`.
- "เอกสารและรูปภาพผู้เช่า" (tenant documents dialog) needs a real `tenant_documents`
  table (category, file type, status) plus `document_attachments` pointing at
  Supabase Storage objects, replacing `src/lib/mock-tenant-documents.ts`.
- Move-out flow needs to write tenant/lease status changes and free up the room.

### Leases
- Digital lease record needs a `leases` table (term, rent, deposit) linked to
  `tenants` and `rooms`.
- Lease document file (PDF) needs Supabase Storage + `document_attachments`.

### Meter Readings
- Water/electric meter entries need a `meter_readings` table linked to `rooms`,
  feeding the invoice generation calculation.

### Invoices
- Auto-generated invoices (rent + utilities + fees) need `invoices` and
  `invoice_items` tables, computed from `leases`, `meter_readings`, and fee config.

### Payments
- Manual payment recording (cash/bank transfer/PromptPay reference) needs a
  `payments` table linked to `invoices`, plus receipt generation.

### Maintenance
- Maintenance request log needs a `maintenance_requests` table (status, assignee,
  resolution) with photos in Supabase Storage.

### Reports
- Rent roll / income summary / outstanding balances need real read queries across
  `leases`, `invoices`, and `payments` instead of mock aggregates.

### Settings
- Property-level configuration (fee schedules, meter rates) needs persisted
  config tied to `properties`, plus `users`/`staff_profiles` and `roles`/`permissions`
  for who can change them.

## Privacy / Security Notes
- **Never commit real tenant/customer data or PII to GitHub** — GitHub holds
  source code only (see [[TECH_DECISIONS.md]]).
- Tenant documents (identity docs, guarantor docs, payment proof) may contain
  sensitive personal data — these must live in Supabase Storage, never in the repo.
- Future implementation must use Supabase Storage policies and Row Level Security
  (RLS) so staff only ever see documents/data for tenants in their own property.
- Staff access must be permission-based (Owner vs. Staff roles per `MVP_SCOPE_LOCK.md`
  role rules), not open to every authenticated user.
- File access (who viewed/downloaded/deleted a tenant document) should be
  auditable later — plan for an access/audit log once real storage is connected.
