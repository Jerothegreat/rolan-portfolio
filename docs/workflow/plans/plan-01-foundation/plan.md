# Plan 01: Foundation

**Status:** Planned (draft scope; run `grill-with-docs` then `to-spec` before building)
**Owner:** apps/web
**Dependencies:** Plan 00 gate passed
**Requirements:** PG-01 (hero, featured projects, contact), SF-03, SF-04, CM-01..CM-04, NFR-02, NFR-04

## Goal

Replace the current terminal-themed site with the soft-neobrutal foundation: design tokens, core components, schema-validated MDX content, and a Home page with hero, featured projects, and contact, plus the redesigned `~` terminal.

## Starting Point

- `apps/web` is the previous portfolio: a terminal-style UI (`components/TerminalChat.tsx`, `BootReveal.tsx`, `ClassicView.tsx`, `Sidebar.tsx`, `components/sections/*`) with content hard-coded in `lib/data/*.ts`.
- `content/*.md` holds prose sources (about, competitions, experience, projects, resume, skills, learning roadmap) and `apps/web/content.md` records where the current data came from.
- `content/{projects,hackathons,posts,milestones}/` exist but are empty.
- `pnpm lint` fails on HEAD with 7 pre-existing errors in legacy files (`BootReveal.tsx`, `PortfolioContainer.tsx`, `ThemeToggle.tsx`, `sections/Competitions.tsx`, `sections/Experience.tsx`, `lib/hooks/useReducedMotion.ts`, `lib/hooks/useTypeOnView.ts`): `react-hooks/set-state-in-effect` and `react/jsx-no-comment-textnodes`. Plan 01 replaces or fixes these so `pnpm check:workspace` passes.

## Draft Scope

1. Design tokens from `docs/standards/design-brief.md` as CSS variables (light + dark) wired into Tailwind 4 theme; fonts via `next/font` (Bricolage Grotesque, Inter, JetBrains Mono).
2. Core components: button (primary/secondary/ghost with press shadow), card, pill/badge, nav (sticky; mobile bottom sheet), footer.
3. Content pipeline: pick Velite or next-mdx-remote; schemas for CM-01..CM-04 that fail the build on invalid files; convert existing `lib/data/*.ts` + `content/*.md` into MDX files.
4. Home: hero (name, role typing line, small tracker placeholder only if SF-02 data is ready, else omitted), 3 featured projects, contact.
5. Dark mode toggle following system preference (SF-04).
6. Redesigned `~` terminal with the old terminal UI retired (SF-03); chat inside it stays a stub until Plan 04.
7. Remove components and data files made unused by the above.

## Open Decisions (for `grill-with-docs`)

- Velite vs next-mdx-remote.
- Where legacy prose `content/*.md` goes once converted (delete vs keep as source notes).
- Terminal behaviour before the chat exists (static help commands vs "coming soon").
- Which 3 projects are featured at launch.

## Completion Criteria

- Requirements above are met with content read from MDX, not hard-coded.
- `pnpm check:workspace` passes; keyboard and reduced-motion checks recorded.
- Requirements map rows updated from evidence.
