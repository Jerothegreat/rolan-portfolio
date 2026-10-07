# Plan 01 Gate

**Gate status:** Partial (independent review done: pass with fixes; fix tickets 10 and 11 open)

## Required Results

- [ ] Plan 00 gate passed (its independent review passed with doc fixes, now applied).
- [x] Scope finalized through `to-spec`.
- [x] Requirements PG-01 (Plan 01 slice), SF-03 (browser-only slice), SF-04, CM-01..CM-04, NFR-02 (Plan 01 slice), NFR-04 have evidence (`evidence.md`, FD-02..FD-10), subject to the review fixes below.
- [x] Vitest seams (content model, terminal interpreter) pass via `pnpm test`: 55/55.
- [x] Legacy site tagged `legacy-terminal-site` before removal.
- [x] `pnpm check:workspace` passes.
- [x] Browser pass: 47/47 checks (FD-10). It did not cover focus inside the terminal input; the review found that gap.
- [x] Independent review recorded (below).
- [ ] Review fix tickets 10 and 11 done and verified.

## Known Limitations (not blockers)

- Six projects are listed (cf1f6d0). Competitions and competition/certification milestones stay drafts until the owner supplies months and placements.
- No Spotlight video or gif yet: Alunsina media (screenshots, architecture diagram, later the showcase video) is scheduled in Plan 02; the media slot stays hidden until a file exists (owner decision 2026-10-08).
- Ticket 05's last two behaviours were driven by one red step, not two.
- `pnpm peers check` warns `@types/node` 20 vs Vitest's wanted ^22 (types only).

## Review

Independent review on 2026-10-08 by two read-only Opus subagents, fixed point `9e3b59a` (Standards and Spec axes kept separate).

- **Standards:** 8 hard, 6 judgement. Worst: the terminal input has no visible focus ring (`outline-none`). Others: Button movement not gated by reduced motion; no-op `className` overrides on Button; confetti uses three accents; Spotlight label uses the gold win pill; bio and meta description hard-coded in the layout; off-scale sizes; duplicated reduced-motion logic; missing Close control in the mobile sheet.
- **Spec:** Plan 00 PASS WITH FIXES (docs only, applied). Plan 01 PASS WITH FIXES. Worst: no Spotlight video or gif (now a known limitation owned by Plan 02). Also: schemas not tested against broken fixtures; `recentProjects` ties depend on file order; the "ex-intern" badge does not check `ended`; gate and plan status text was stale (fixed here).
- Fixes are tracked as `.scratch/plan-01-foundation/issues/10-review-fixes-ui.md` and `11-review-fixes-content-rules.md`.
