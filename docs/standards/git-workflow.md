# Git Workflow

## Default

- `test` is the solo development and verification branch.
- `master` is the promotion target and the branch the production deploy tracks.
- Feature branches are optional isolation, not a requirement.
- Do not use a heavy GitFlow process.

## Promotion

For a verified plan or phase:

1. Inspect branch, status, diff, remotes, and recent log.
2. Run `pnpm check:workspace` and any plan-specific checks (chat eval once it exists) and record results in the plan's `evidence.md`.
3. Request independent code review (see the model routing in `docs/agents/skill-policy.md`). Critical and High findings block promotion; fix and repeat.
4. Record the verified SHA in the plan's `gate.md`.
5. Ask for explicit current-chat authorization before commit, merge, push, or branch deletion.
6. Merge `test` into `master` and push only when authorized.
7. Never force-push. Never promote skipped evidence as complete.

## Safety Rules

- Inspect `git status`, `git diff`, and recent log before commit.
- Stage only intended files.
- Use Conventional Commits naming the plan where relevant (for example `feat(web): PG-01 home hero (plan-01)`).
- Do not push unless explicitly asked.
- Do not use destructive git commands unless explicitly approved.

## Branch Cleanup

- Delete merged local branches with `git branch -d`.
- Keep stacked branches shallow and only when the dependency is real.
