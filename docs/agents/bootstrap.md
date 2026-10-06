# Fresh Checkout Bootstrap

Use this sequence when a developer or coding agent first opens the repository. The repository is the setup contract; local tool installations and credentials stay outside Git.

## Read First

1. Read the root `AGENTS.md` (Claude Code loads it through `CLAUDE.md`).
2. Read `docs/agents/skill-policy.md`, `docs/agents/domain.md`, and `docs/agents/issue-tracker.md`.
3. Read `docs/workflow/README.md`, then the active roadmap/plan files before changing code.
4. Check `package.json`, `pnpm-workspace.yaml`, `pnpm-lock.yaml`, `skills-lock.json`, and every relevant `apps/*/.env.example`.

Completion criterion: the agent can identify the package manager, app environment inputs, source-of-truth documents, and required verification commands without relying on a personal machine path.

## Install And Configure

1. Verify Node.js and pnpm are available with `node --version` and `pnpm --version`. The pinned pnpm version is the `packageManager` field in the root `package.json`.
2. Run one sequential `pnpm install` at the repository root. Do not use watch mode during bootstrap.
3. Copy each required `.env.example` to a local `.env.local` and fill only local values. Keep env files untracked. Until the chat lands (Plan 04) the site needs no environment variables.
4. Install the skills named by `skills-lock.json` with `npx skills experimental_install` (or the developer's supported agent tooling). The repository records the manifest, not vendored copies of installed skills.

Completion criterion: dependencies resolve, local environment files exist where needed, and no credential or machine-specific installation directory is staged.

## Verify The Workspace

Run the checks that do not require a running service:

```text
pnpm typecheck
pnpm lint
pnpm build
```

`pnpm check:workspace` runs all three in order. Start the dev server (`pnpm dev`) only after explicit approval for that session.

Completion criterion: each command has an observed pass, skip, or failure recorded; skipped checks are blockers or limitations, not passing evidence.

## Local Agent State

- `.agents/` and `.claude/` contain local skill installations and may differ by developer.
- `.scratch/` contains local feature notes and issue records.
- `.npmrc` may contain a developer-specific pnpm store override.
- `CONTEXT.md`, `AGENTS.md`, `CLAUDE.md`, `docs/agents/**`, and `skills-lock.json` are repository-shared guidance and should be reviewed from the checkout.
