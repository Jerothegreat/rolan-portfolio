# Plan 00 Evidence

| Task | Evidence | Status |
| --- | --- | --- |
| `WM-01` | `frontend/.git` moved to root; branch `test` created from `master` (`9e3b59a`). A direct folder move failed (editor file locks, see issue log), so `apps/web` was recreated with `git read-tree --prefix=apps/web/ HEAD` + `git checkout-index -a`. `git diff --cached -M --name-status`: 49 entries, all `R100` (e.g. `app/page.tsx → apps/web/app/page.tsx`). Per-app `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `pnpm.yaml`, `.npmrc`, and tracked `bash.exe.stackdump` removed. Leftover `frontend/` files compared with `cmp` after stripping CR: line-ending-only differences. | Verified |
| `WM-02` | Root `package.json` (`1mil-dev`, pnpm 11.5.0), `pnpm-workspace.yaml` (`apps/*`, carried `allowBuilds`), `.gitignore`; `apps/web` package renamed to `web`; `content/{projects,hackathons,posts,milestones}`, `evals/`, `ingestion/` with `.gitkeep`. `pnpm install`: "Done in 21.8s using pnpm v11.5.0". | Verified |
| `WM-03` | `AGENTS.md`, `CLAUDE.md` (`@AGENTS.md`), `CONTEXT.md`, `docs/agents/{bootstrap,skill-policy,domain,issue-tracker}.md` written. | Verified |
| `WM-04` | `docs/product/requirements-engineering.md` (PG-01..07, SF-01..06, CM-01..05, AI-01..05, NFR-01..06), `docs/dev/technology-stack-and-development.md`, `docs/standards/design-brief.md`, `docs/adr/0001-nextjs-only-no-separate-api.md`, `docs/adr/0002-embeddings-openai-3-small.md`. Old chatbot design archived to `docs/workflow/archive/`. | Verified |
| `WM-05` | Standards (documentation policy, git workflow, implementation conventions, security, issue log); `docs/workflow/{README,roadmap}.md`, `traceability/requirements-map.md`, `archive/README.md`, Plan 01 packet. | Verified |
| `WM-06` | `npx skills experimental_install -y`: 21 skills in `.agents/skills/`; copied to `.claude/skills/` for Claude Code. `npx skills list` shows all 21 for Claude Code and Codex. The installer fetched current upstream versions and rewrote 13 `computedHash` values in `skills-lock.json`; skill set and sources are unchanged from Alunsina minus `material-3`. | Verified |
| `WM-07` | `pnpm typecheck`: pass (exit 0). `pnpm build`: pass (Next.js 16.2.9, `/` static). `pnpm lint`: **fail**, 7 errors + 4 warnings, all in unchanged legacy files; lint rule packages match the old lockfile (`eslint-plugin-react-hooks` 7.1.1, `eslint-config-next` 16.2.9), so the failure predates this plan; owned by Plan 01. Link check over `AGENTS.md`, `CONTEXT.md`, and `docs/**/*.md`: all relative links and backticked repo paths resolve (one broken link to this packet fixed by writing it). Stale-reference search: remaining `frontend/`, NestJS, Android hits are intentional history (issue log, ADR, archive) or the brief's "Android Chrome" test. Staged set contains no `.env`, `.agents/`, `.claude/`, `.scratch/`, `node_modules`, or `.next`. | Verified |
| `WM-08` | User-approved. `frontend/` leftovers deleted. `backend/` could not be moved (permission denied, likely a file lock), so its source minus `node_modules`/`dist` was copied to `../portfolio-backend-archive/` with `tar`, `diff -rq` reported no differences, then `backend/` was deleted. | Verified |

## Verification Notes

- No product code changed; only paths, package name, and workspace config.
- `git log --follow` on `apps/web/*` can only be observed after the commit; `R100` rename detection is the pre-commit proof.
