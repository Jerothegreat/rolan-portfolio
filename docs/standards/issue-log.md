# Issue Log

Record recurring bugs and setup issues once, newest first: symptom, root cause, fix, prevention.

## 2026-10-09

### `pnpm build` intermittently fails with "next/font/google queries have exactly one entry"

- Symptom: Turbopack sometimes reports 6–12 identical `next/font/google` import-map errors. It happened twice in a row (once from PowerShell, once from Git Bash), then the same build passed three times without any change.
- Root cause: not confirmed. It appeared after a fourth `next/font/google` family (Silkscreen) was added in `app/layout.tsx`, and it looks like a flaky Turbopack font lookup, not a code error.
- Fix: run `pnpm build` again. If it keeps failing, stop any running `next start` / `next dev` and delete `apps/web/.next`.
- Prevention: when this exact error appears, rebuild once before debugging. Record it here if it starts failing consistently.

### Headless Edge screenshots at 390 px wide are not phone layouts

- Symptom: `msedge --headless --window-size=390,...` screenshots showed windows cut off on the right, which looked like horizontal overflow.
- Root cause: on Windows the browser window has a minimum width larger than 390 px, so the page laid out wider and the screenshot was cropped.
- Fix: measure phone width with Playwright (`playwright-core`, `channel: "msedge"`, viewport 390), or screenshot an iframe that is 390 px wide.
- Prevention: check `document.documentElement.scrollWidth - innerWidth` instead of trusting a cropped screenshot.

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

### Velite posts need `slug` in front matter

- Symptom: `velite build` failed with `error Required slug` for a new post.
- Root cause: posts use `s.slug("posts")`, which reads a `slug` field; it is not derived from the file name.
- Fix: add `slug: <kebab-case>` to every post, project, and competition file.

### Rendering Velite MDX tripped `react-hooks/static-components`

- Symptom: lint error "component is created during render" in `components/mdx-content.tsx`.
- Fix: compiled MDX uses no hooks, so its default export is called as a function on the server (`render({})`) instead of being mounted as `<Content />`.

### Production deploy after the monorepo move

- `master` before Plan 02a was the root-level Next app. After promotion the app lives in `apps/web`, so the Vercel project's Root Directory must be `apps/web` (set once in Vercel settings) or the build fails. Vercel keeps serving the last good deploy until then.
