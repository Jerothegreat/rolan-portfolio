# Plan 00: Workflow And Monorepo Shell

**Status:** Complete
**Owner:** Repository workflow
**Dependencies:** Alunsina workflow at `C:\a` (reference only); "1mil.dev — PRD, TRD and design brief" (2026-10-07)

## Goal

Turn the portfolio folder into one pnpm monorepo and install the same spec-driven AI workflow used in the Alunsina workspace, seeded with the 1mil.dev requirements, so every later plan follows requirements → plan → tickets → implement → evidence → gate.

## Decisions

- One root git repository, created from the former `frontend/` repository so its history and `origin` remote (`Jerothegreat/rolan-portfolio`) are kept; the site moves to `apps/web` (pure renames).
- Next.js only; the uncommitted NestJS `backend/` scaffold is excluded (`docs/adr/0001-nextjs-only-no-separate-api.md`).
- `AGENTS.md` is canonical; `CLAUDE.md` imports it so Claude Code and Codex share one rule set. Model routing names both tool families.
- Superpowers, `ponytail`, and `caveman` stay inactive, matching Alunsina.
- The brief is split into canonical docs (requirements, stack, design brief, ADRs) instead of being copied whole.
- `skills-lock.json` carries Alunsina's curated skills minus the mobile-only `material-3`.
- `test` is the development branch; `master` stays the promotion target.

## Interfaces

- Root scripts: `pnpm dev`, `pnpm build`, `pnpm typecheck`, `pnpm lint`, `pnpm check:workspace`.
- Workspace packages: `apps/*` (only `web` today).
- Content contract: `content/{projects,competitions,posts,milestones}/` (schemas land in Plan 01).

## Completion Criteria

- Root `.git` with all former frontend files as 100% renames under `apps/web/`.
- Root workspace installs and `pnpm typecheck` / `pnpm build` pass.
- Agent entry docs, requirements, ADRs, standards, and workflow hierarchy exist and all relative links resolve.
- Skills restored from `skills-lock.json` into local `.agents/skills/` (mirrored to `.claude/skills/`), both git-ignored.
- No secrets or local agent state staged.

## Verification

See `evidence.md`.

## Known Constraints

- `pnpm lint` fails on 7 pre-existing errors in legacy components; ownership moved to Plan 01.
- The NestJS scaffold source is archived at `../portfolio-backend-archive/` (outside the repository, without `node_modules`/`dist`).
- A Vercel project deploying the old repository root must change its Root Directory to `apps/web` (human step).
