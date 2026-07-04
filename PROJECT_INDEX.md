# Project Index

## Project Goal
Build an all-in-one rental room, dormitory, and small-hotel management system for the
Thai market — inspired by DoorLoop's "all-in-one" property management model, but
simplified and priced for small property owners (roughly 1–20 units) who are currently
running things on spreadsheets, LINE chats, and paper ledgers.

The product acts as a single control hub covering: tenant/guest management, leasing,
Thai-style utility billing (water/electric meters, furniture fees), rent/invoice
collection, maintenance tracking, and financial reporting — accessible from desktop,
tablet, and mobile.

## NotebookLM Knowledge Base
- URL: https://notebooklm.google.com/notebook/7842f24b-eb57-4725-bcf6-b0d1108eabda
- ~50 sources covering DoorLoop feature research and Thai rental/dorm market requirements.
- Treat this notebook as the primary source of truth for product intent. When scope is
  ambiguous, query it before guessing.

## Target Users
- **Small–mid property owners** managing 1–20 units who need an affordable entry point.
- **Thai landlords & dormitory managers** who need Thai-language UI and meter-based
  water/electricity billing.
- **Part-time/full-time landlords** growing a portfolio without hiring a management company.
- **Admin staff / bookkeepers** who need shared, real-time access for reconciliation and
  maintenance updates.
- **Tenants/guests** who need a simple portal to view bills and pay rent.

## Main MVP Modules (see [[MVP_SCOPE_LOCK.md]] for detail)
1. Property / Unit (room) management
2. Tenant / lease (contract) management
3. Thai utility billing (water & electric meter readings, furniture fees, invoices)
4. Rent & invoice collection (payment recording, receipts)
5. Maintenance / work order tracking
6. Basic financial reporting (rent roll, income summary)
7. Owner & tenant portals (role-based views)

## Tech Stack (see [[TECH_DECISIONS.md]] for rationale)
- Next.js (App Router, full-stack React framework)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase Auth (authentication)
- Supabase PostgreSQL (database, with Row Level Security)
- Supabase Storage (file/image uploads — maintenance photos, lease documents)
- Vercel (hosting/deployment)
- GitHub (source control — code only, never customer data)

## Important Documentation Files
| File | Purpose |
|---|---|
| `PROJECT_INDEX.md` | This file — start here every session |
| `MVP_SCOPE_LOCK.md` | What's in/out of V1, what we borrow from DoorLoop vs. skip |
| `ROADMAP.md` | Phase-by-phase build plan |
| `TECH_DECISIONS.md` | Stack choices and why |
| `SESSION_WORKFLOW.md` | How each Claude Code session should operate |

## Current Project Status
**Phase: Mock UI (Phase 2), in progress.** App shell scaffolded: Next.js + TypeScript +
Tailwind + shadcn/ui, sidebar/top bar layout, and placeholder pages for all V1
must-have modules. No real backend, no database, no Supabase project, no auth yet —
all page content is mock/placeholder.

## Rules for Future Claude Code Sessions
- Read this file (`PROJECT_INDEX.md`) first, every session.
- Then read only the doc(s) relevant to the current task — don't re-read everything.
- Do not scan the whole repo unless the task genuinely requires it.
- One small goal per session (see [[SESSION_WORKFLOW.md]]).
- Do not implement multiple modules in the same session.
- Never invent scope — if a feature isn't in `MVP_SCOPE_LOCK.md`, check the NotebookLM
  notebook or ask the user before building it.
- Treat Thai-market specifics (bilingual UI, meter billing, low-cost pricing) as
  first-class requirements, not nice-to-haves — they're the product's differentiation
  from a generic DoorLoop clone.

## Commands to Run When Available
- Lint: `npm run lint`
- Typecheck: `npx tsc --noEmit`
- Build: `npm run build`
- Dev server: `npm run dev` (http://localhost:3000)

## Security Warnings
- **Never commit real tenant/customer data, PII, or payment details to GitHub.**
  GitHub stores source code only — see [[TECH_DECISIONS.md]] for why.
- **Never commit `.env`, Supabase service-role keys, or any secrets.** Use
  `.env.local` (gitignored) once the app is scaffolded.
- All customer/tenant data lives in Supabase Postgres, protected by Row Level
  Security (RLS) policies — not in flat files or the repo.
- Payment handling must go through a PCI-compliant provider; do not store raw card
  data anywhere in this system.
- Before connecting real Supabase credentials or handling real tenant data, run a
  security review (see `ROADMAP.md` phase 8).
