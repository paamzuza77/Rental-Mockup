# Session Workflow

How each Claude Code session on this project should operate. This exists so the
project stays coherent across many small sessions instead of drifting or duplicating
work. See [[PROJECT_INDEX.md]] for the rules summary and [[ROADMAP.md]] for phase order.

## One Small Goal Per Session
Each session should target a single, clearly-scoped outcome (e.g. "build the room
list mock screen," not "build the mock UI"). If a request spans multiple modules or
phases, break it down and confirm the first slice before continuing.

## Always Read PROJECT_INDEX.md First
Before doing anything else, read `PROJECT_INDEX.md`. It has current status, the rules
below, and pointers to which other doc is relevant.

## Read Only What's Relevant
After `PROJECT_INDEX.md`, read only the doc(s) that bear on the current task:
- Scope question? → `MVP_SCOPE_LOCK.md`
- "What phase are we in / what's next?" → `ROADMAP.md`
- "Why this library/service?" → `TECH_DECISIONS.md`
- Uncertain about product intent not covered in these docs? → query the NotebookLM
  notebook (URL in `PROJECT_INDEX.md`) rather than guessing.

## Do Not Scan the Whole Repo Unless Necessary
Once code exists, avoid broad repo-wide scans/greps as a default first step. Go
directly to the files the task implies. Only widen the search if targeted lookups
fail.

## Do Not Implement Multiple Modules at Once
Build one module (e.g. tenant management) to a working, reviewable state before
starting another (e.g. maintenance tracking), even if both are V1 must-haves. This
keeps diffs reviewable and keeps scope creep visible.

## Verification Before Calling Work Done
Once tooling exists, run whatever is available for the change:
- Lint
- Typecheck
- Build
(Exact commands will be filled into `PROJECT_INDEX.md` once `package.json` exists —
check there rather than assuming.)

For UI changes, actually run the dev server and look at the feature, per standard
practice — don't rely on typecheck alone to claim a UI feature works.

## Commit and Push After Successful Verification
Once a change is verified (lint/typecheck/build pass, and UI changes have been
visually checked), commit with a clear message describing why the change was made.
Push only after the user has reviewed and approved, unless they've already given
standing approval for a given session's autonomy level.

## Scope Discipline
If a task would require building something not listed in `MVP_SCOPE_LOCK.md`, stop
and flag it rather than quietly expanding scope. Either the scope lock needs updating
(user decision) or the request is premature (belongs in a later phase per `ROADMAP.md`).
