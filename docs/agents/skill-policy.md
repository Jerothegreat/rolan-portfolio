# Skill And Model Policy

This policy routes work through the smallest reliable process while keeping one durable documentation hierarchy. The flow is spec-driven: requirements (`docs/product/requirements-engineering.md`) → plan packet (`docs/workflow/plans/`) → tickets (`.scratch/`) → implementation → evidence → gate.

## Defaults

- Information-only requests and clear one-line edits need no workflow skill.
- Routine, single-slice work stays inline: inspect, change, run focused verification, and report.
- Substantial features use the canonical workflow packet under `docs/workflow/plans/`.
- A skill is selected for a concrete trigger, not loaded as ceremony.

## Model Routing

| Work | Claude Code | Codex | Reasoning |
| --- | --- | --- | --- |
| Normal implementation, tests, and documentation | `claude-sonnet-5-5` | `gpt-5.6-terra` | `medium` |
| Small mechanical changes | `claude-haiku-4-5` | `gpt-5.6-terra` | `low` |
| Wayfinder, security, chat guardrails, or cross-cutting architecture | `claude-opus-5-5` | `gpt-5.6-sol` | `high` |
| Independent code review and gate audit | `claude-opus-5-5` | `gpt-5.6-sol` | `high` |
| Exceptional work that remains unresolved | `claude-fable-5-1` | `gpt-6-astra` | `high` |

The medium-reasoning default is normal. Stronger models are explicit task-level overrides, not permanent defaults. Independent review should use a different session (and ideally a different model family) from the one that implemented the work.

## Trigger Matrix

| Situation | Required skill or action |
| --- | --- |
| The appropriate workflow is unclear | Use `ask-matt` to route it. |
| A substantial repo-based feature still has product or design questions | Use `grill-with-docs`; use `grill-me` only outside a working repository. |
| The effort is too large or foggy for one planning session | Use `wayfinder` with the high-reasoning model to resolve decisions, then collapse them into the canonical plan before building. |
| Agreed discussion must become an execution contract | Use `to-spec`, targeting the active plan's `plan.md`. |
| A plan needs independently executable slices | Use `to-tickets`; detailed tickets live under `.scratch/<feature>/issues/` and `tasks.md` is their ordered index. |
| A ticket is ready to build | Use `implement` inline; it drives `tdd` where an executable seam exists and ends with review. |
| A behavior change or bug fix has an executable test seam | Use `tdd` before implementation. |
| A bug is non-trivial, intermittent, unclear, or hard to reproduce | Use `diagnosing-bugs` before `tdd`. |
| A runnable state, logic, or UI question blocks a decision | Use `prototype` before production implementation. |
| Web UI/UX design or visual polish in `apps/web` | Use `frontend-design` (or `design-taste-frontend`) constrained by `docs/standards/design-brief.md`. The brief's tokens and rules win over any skill default. |
| Primary-source research is required | Use `research`; delegation is read-only and only when the user explicitly requests a subagent. |
| A human-only dashboard, credential, DNS, or provisioning step blocks work | Use `wizard`. |
| A focused module/interface/seam design is needed | Use `codebase-design`. |
| Terms, ownership, requirements, or durable architecture decisions change | Use `domain-modeling`; record hard-to-reverse decisions in `docs/adr/`. |
| A non-trivial code diff is ready for completion | Use `code-review` against the originating plan or ticket. |
| Agent-facing instructions or workflow documents change | Use `writing-for-agents`. |
| Work crosses a real session, model, or checkout boundary | Use `handoff`, referencing existing artifacts instead of restating them. |
| A repository-wide architecture survey is explicitly requested | Use `improve-codebase-architecture`; it remains opt-in. |

## Durable Artifact Contract

- `docs/workflow/README.md` is the only implementation entrypoint.
- `docs/workflow/roadmap.md` identifies the owning plan.
- Every active plan has `plan.md`, `tasks.md`, `evidence.md`, and `gate.md`.
- `plan.md` owns scope, decisions, interfaces, dependencies, and completion criteria.
- `tasks.md` is a short execution index; detailed temporary tickets live in `.scratch`.
- `evidence.md` records observed commands and results. Expected results are not evidence.
- `gate.md` owns readiness, blockers, independent review, and completion status.
- `docs/workflow/plans/` is the only plan directory. Git history preserves retired paths.
- A conversational plan is not saved until its canonical files exist and have been read back.

## Completion Gates

- Pure documentation or configuration changes do not require `tdd`, but their links and configuration must be verified.
- If no executable seam exists, record that fact rather than inventing a test.
- Non-trivial code changes end with focused verification (`pnpm typecheck`, `pnpm lint`, `pnpm build`) and `code-review`.
- Chat changes additionally require the fixed chat eval set to pass once it exists (Plan 04).
- Do not duplicate a plan, specification, ticket, decision, or status across durable files.

## Inactive Skills

The Superpowers family, `ponytail`, and `caveman` may remain installed as local history but are inactive. Do not invoke or route work through them unless the user explicitly re-enables them.
