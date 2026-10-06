# Issue Log

Record recurring bugs and setup issues once, newest first: symptom, root cause, fix, prevention.

## 2026-10-07

### Moving `frontend/` failed with "Device or resource busy"

- Symptom: `mv frontend apps/web` and `Move-Item` failed while VS Code / Codex had the folder open; `Move-Item` left a partial copy.
- Root cause: Windows file handles held by editor processes on `frontend/components/sections`.
- Fix (Plan 00): moved `.git` to the root and recreated `apps/web` from the git index (`git read-tree --prefix=apps/web/ HEAD` + `git checkout-index -a`); history is preserved through rename detection. Leftover `frontend/` copies differed only by line endings (`core.autocrlf=true`).
- Prevention: close editors on a folder before moving it on Windows, and verify with `cmp` after any partial move.
