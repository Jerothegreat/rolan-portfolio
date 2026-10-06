# Issue Tracker: Local Markdown

Detailed tickets and implementation notes for this repository live as Markdown files under `.scratch/`. Durable scope and status stay in the owning `docs/workflow` plan packet.

## Conventions

- Use one directory per feature: `.scratch/<feature-slug>/`.
- Put actionable tickets at `.scratch/<feature-slug>/issues/<NN>-<slug>.md`, starting at `01`.
- Keep a `Status:` line near the top of each issue file.
- Append discussion under a `## Comments` heading.
- Keep `tasks.md` in the owning workflow plan as a short ordered index linking these tickets; do not copy full ticket bodies into it.
- `to-spec` targets the owning canonical `plan.md`; it must not create a second durable specification under `.scratch`.

Use this local tracker for temporary agent-produced issue and solution records. Keep recurring repository issue history in `docs/standards/issue-log.md`, and record verified execution in the owning plan's `evidence.md`.
