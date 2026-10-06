# 1mil.dev Workflow Documentation

This is the canonical entrypoint for implementation work.

## Routing

```text
docs/workflow/README.md
  -> roadmap.md
  -> plans/plan-XX-*/plan.md
  -> tasks.md
  -> evidence.md
  -> gate.md
  -> verified SHA and promotion
```

Read the owning plan's `plan.md`, `tasks.md`, `evidence.md`, and `gate.md` before changing code or documentation. Supporting design or runbook files are optional and must be linked from `plan.md`. A plan is not complete because source code exists; its evidence and gate files must agree with `traceability/requirements-map.md`.

## Spec-Driven Flow

1. Requirements live in `docs/product/requirements-engineering.md` with stable IDs (`PG-`, `SF-`, `CM-`, `AI-`, `NFR-`).
2. `grill-with-docs` resolves open product or design questions for the next plan.
3. `to-spec` writes the agreed scope into that plan's `plan.md`, naming requirement IDs.
4. `to-tickets` slices the plan into `.scratch/<feature>/issues/`; `tasks.md` indexes them.
5. `implement` builds one ticket at a time (with `tdd` where a seam exists).
6. Observed results go to `evidence.md`; `code-review` and the independent audit go to `gate.md`.
7. `traceability/requirements-map.md` is updated only after evidence passes.

## Active Categories

- `plans/` owns executable plan packets.
- `traceability/` owns the current requirement-to-implementation map.
- `runbooks/` (created when first needed) owns reusable operational procedures.
- `archive/` owns historical snapshots and is not implementation input.

## Status Vocabulary

- `Planned`: artifact or execution has not started.
- `In progress`: work is actively being executed.
- `Partial`: implementation or evidence is incomplete.
- `Complete but evidence pending`: implementation is present but required evidence or review is incomplete.
- `Ready for independent review`: implementation and evidence are ready for audit by a separate session/model.
- `Complete`: required evidence, review, independent result, verified SHA, and promotion record exist.
- `Deferred`: intentionally owned by a later plan.

## Safety

- Preserve unrelated dirty files.
- Do not treat archived documents as current sources of truth.
- Do not commit, merge, push, or delete branches without explicit current-chat authorization.
