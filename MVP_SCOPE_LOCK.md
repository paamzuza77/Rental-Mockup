# MVP Scope Lock

This file is the scope contract for the project. If a feature isn't listed here as
"V1 must-have" or "V1 should-have," it does not get built without an explicit
decision to amend this file. See [[PROJECT_INDEX.md]] for overall context.

## V1 Must-Have (launch blockers)
- Property and unit/room setup (add/edit rooms, room status: vacant/occupied/maintenance)
- Tenant profile management (contact info, ID, move-in/move-out) — managed by Owner/Staff
- Lease/contract record (term, rent price, deposit) — digital record, not e-signature
- Thai utility billing: water meter reading, electric meter reading → auto-calculated bill
- Furniture / fixed monthly fee line items on invoices
- Invoice generation (rent + utilities + fees combined into one bill, matching how
  Thai apartments typically bill)
- Payment recording (manual entry: cash, bank transfer, PromptPay reference) with receipt
- Maintenance request log, staff-entered: Owner/Staff logs an issue reported by phone,
  LINE, or in person, and tracks it to resolution. Tenant self-service submission is
  deferred — see V1.5.
- Owner dashboard: occupancy overview, outstanding balances, simple income summary
- Role-based access: **Owner and Staff** roles, fully implemented with real permission
  boundaries. **Tenant role must be modeled in the database schema** (and accounted for
  in RLS design) so it's ready to activate later, but no tenant-facing UI is required
  for the first mock UI or V1 launch.
- Thai-first UI: every V1 screen must be fully usable in Thai. English text/toggle is
  not required for launch — see should-have.

## V1 Should-Have (valuable, not launch-blocking)
- Full bilingual UI: English added alongside the Thai-first V1 baseline (language
  toggle, English strings for all V1 screens)
- Automated late-fee application
- Email/LINE notification for new invoice or due-date reminder
- Multi-property support (single owner, multiple buildings) in one dashboard
- Export reports to PDF/Excel
- Photo upload on maintenance requests (Supabase Storage)
- Basic vendor/maintenance-team assignment on work orders

## V1.5 (fast-follow — right after V1 launch, not a launch blocker)
- Tenant portal: tenant login to view their bill and payment history
- Tenant self-service maintenance request submission (extends the portal above)

Both depend on the Tenant role already being modeled in the database during V1 (see
Must-Have above), so building them later should be additive UI/auth work, not a
schema rework.

## V2 / Future
- Online payment gateway integration (real PromptPay QR / card processing, not just
  recorded manual payments)
- AI assistant for tenant inquiries
- AI-powered property inspections
- Tenant screening / background checks
- E-signature for leases
- Bank sync / reconciliation (Plaid-equivalent for Thai banks)
- Open API for third-party integrations
- Central Reservation System (CRS) style multi-branch hotel inventory/rate management
- Revenue management / dynamic pricing
- Advanced performance analytics across portfolio

## Not Doing Now (explicitly out of scope until reconsidered)
- Full accounting suite / general ledger / chart of accounts
- Credit/debit card or ACH processing (US-style payment rails)
- Fair-housing / US landlord-tenant law compliance tooling
- Native mobile apps (web-responsive only for V1)
- Multi-currency support
- Marketing/listing syndication (posting vacancies to external listing sites)

## DoorLoop Features We Will Use as Reference
- "All-in-one" login concept: one dashboard instead of scattered spreadsheets/apps
- Owner/Manager/Staff/Tenant role separation and permission granularity
- Rent roll and income-summary style reporting
- Maintenance work-order flow (tenant reports → staff assigns → tracked to close)
- Tenant portal concept (pay bill, view ledger, submit request)
- Fast onboarding philosophy (import existing data instead of manual re-entry) — as
  a design principle, not necessarily the exact migration tooling

## DoorLoop Features We Will Not Copy Yet
- US-centric payment rails (ACH, credit card processors, digital wallets tied to
  US/global card networks)
- Tenant screening/background checks (TransUnion-style credit/criminal checks —
  not relevant or legally applicable to Thai market yet)
- AI Assistant / AI Inspections
- Full accounting suite with bank sync
- Central Reservation System for multi-branch hotel groups
- Open API / marketplace integrations
