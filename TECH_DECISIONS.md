# Tech Decisions

Stack choices and the reasoning behind them. See [[ROADMAP.md]] for when each piece
gets introduced and [[PROJECT_INDEX.md]] for the summary table.

## Next.js
Full-stack React framework (App Router). Chosen so one codebase handles both the
UI and the server-side logic (API routes / server actions) needed for billing
calculations, invoice generation, and Supabase queries — no separate backend service
to stand up or deploy.

## TypeScript
Static typing across the app. With entities like leases, invoices, and meter readings
that all reference each other, type safety catches mismatches (e.g. passing a room ID
where a tenant ID is expected) at compile time instead of in production.

## Tailwind CSS
Utility-first styling. Fast to build and restyle mock screens during Phase 2 without
hand-writing CSS files per component, and pairs directly with shadcn/ui.

## shadcn/ui
Accessible, unstyled-but-themeable component primitives (built on Radix + Tailwind).
Gives production-quality forms, tables, dialogs, and navigation out of the box —
important since this app is dashboard/data-table heavy (room lists, invoice tables,
tenant ledgers).

## Supabase Auth
Handles user authentication (Owner/Staff/Tenant login) without building auth from
scratch. Integrates directly with Supabase Postgres Row Level Security, so the same
identity system that logs a user in also scopes what data they can see.

## Supabase PostgreSQL
Primary database. Relational structure fits the domain well (properties → units →
leases → tenants → invoices → payments are all foreign-key relationships). Row Level
Security (RLS) lets us enforce "a tenant can only see their own invoices" and "staff at
Property A can't see Property B's data" at the database layer, not just in app code —
so a bug in the UI can't leak another tenant's data.

## Supabase Storage
File storage for maintenance-request photos and (later) lease documents. Keeps
binary/media data out of Postgres rows and out of GitHub entirely.

## Vercel
Hosting and deployment for the Next.js app. Chosen for its native, zero-config
integration with Next.js (including preview deployments per pull request) so the
user can review changes visually before they go live.

## GitHub
Source control for application code only.

### Why GitHub stores code only, not real customer data
GitHub repos are effectively permanent — history persists even after a file is
deleted in a later commit, forks and clones can exist outside your control, and a
misconfigured repo (or a collaborator's misconfigured account) can expose it. None
of that is an acceptable place for tenant PII, lease documents, payment info, or
Supabase service-role keys. The rule for this project:
- **GitHub holds:** application source code, schema migration *files* (structure,
  not data), documentation, configuration templates (e.g. `.env.example` with
  placeholder values).
- **Supabase holds:** all real tenant/customer data, actual database contents,
  uploaded files (via Supabase Storage), protected by RLS.
- **Never in GitHub:** `.env` / `.env.local`, Supabase service-role keys, real
  tenant records, exported customer data dumps, payment details.
