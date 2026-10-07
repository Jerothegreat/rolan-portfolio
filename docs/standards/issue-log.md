# Issue Log

Record recurring bugs and setup issues once, newest first: symptom, root cause, fix, prevention.

## 2026-10-08

### Layout utilities passed to `Button` through `className` are ignored

- Symptom: at 375 px the page scrolled sideways by about 110 px. Desktop-only nav buttons and the theme toggle showed on phones despite `hidden sm:inline-flex`.
- Root cause: `Button` always includes `inline-flex` and its own padding. Tailwind emits `.inline-flex` after `.hidden`, and `px-6` after `px-4`, so equal-specificity overrides in `className` lose silently.
- Fix (Plan 01 ticket 09): hide or show buttons with a wrapper element instead of `className` on `Button`; the theme toggle moved into the mobile sheet.
- Prevention: never pass display or padding overrides to `Button`; wrap it. The terminal close button's `px-3 py-1` is a known no-op. The browser pass (no horizontal scroll at 375 px) catches regressions.

## 2026-10-07

### Moving `frontend/` failed with "Device or resource busy"

- Symptom: `mv frontend apps/web` and `Move-Item` failed while VS Code / Codex had the folder open; `Move-Item` left a partial copy.
- Root cause: Windows file handles held by editor processes on `frontend/components/sections`.
- Fix (Plan 00): moved `.git` to the root and recreated `apps/web` from the git index (`git read-tree --prefix=apps/web/ HEAD` + `git checkout-index -a`); history is preserved through rename detection. Leftover `frontend/` copies differed only by line endings (`core.autocrlf=true`).
- Prevention: close editors on a folder before moving it on Windows, and verify with `cmp` after any partial move.
