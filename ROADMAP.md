# Roadmap

Phased build plan. See [[MVP_SCOPE_LOCK.md]] for what's in scope at each phase and
[[SESSION_WORKFLOW.md]] for how sessions should tackle a phase (one small goal at a time).
No phase after "Planning" starts until the user explicitly approves moving forward.

## Phase 1 — Planning (current phase)
- Query NotebookLM knowledge base and lock down product understanding.
- Create `PROJECT_INDEX.md`, `MVP_SCOPE_LOCK.md`, `ROADMAP.md`, `TECH_DECISIONS.md`,
  `SESSION_WORKFLOW.md`.
- Get user sign-off on scope before any code.

## Phase 2 — Mock UI
- Scaffold Next.js + TypeScript + Tailwind + shadcn/ui app shell.
- Build static/mock-data screens for V1 must-have modules (no real backend):
  room list, tenant list, invoice view, maintenance log, owner dashboard, tenant portal.
- Validate layout, navigation, and bilingual (Thai/English) text handling with the user
  before wiring up real data.

## Phase 3 — Database Schema
- Design Postgres schema for: properties, units/rooms, tenants, leases, meter readings,
  invoices, invoice line items, payments, maintenance requests, users/roles.
- Define Row Level Security (RLS) policies per role (Owner/Staff/Tenant) at the schema
  design stage, even before Supabase is connected.
- Review schema with user before creating any migration.

## Phase 4 — Authentication
- Connect Supabase Auth.
- Implement Owner/Staff/Tenant roles and route protection.
- Wire RLS policies to real auth sessions.

## Phase 5 — Real Data Connection
- Replace mock UI data with live Supabase queries.
- CRUD flows for rooms, tenants, leases, meter readings, invoices, maintenance requests.
- Owner dashboard driven by real aggregates.

## Phase 6 — Billing and Payments
- Automated invoice generation from meter readings + rent + fees.
- Manual payment recording (cash/bank transfer/PromptPay reference) with receipts.
- Late-fee rules (should-have).
- (V2, not yet) real payment gateway integration.

## Phase 7 — Reports and Export
- Rent roll, income summary, outstanding balances.
- PDF/Excel export.

## Phase 8 — Security Review
- Run `/security-review` before handling any real tenant data or going live.
- Verify RLS policies, auth flows, secret handling, and PCI-relevant boundaries
  (even though V1 has no live payment processing, verify no card data is ever stored).

## Phase 9 — Deployment
- Deploy to Vercel.
- Connect production Supabase project (separate from any dev/staging project).
- Confirm environment variables and secrets are configured in Vercel, not committed
  to GitHub.
