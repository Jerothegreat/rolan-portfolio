# Plan 01: Foundation

**Status:** Planned (spec final; 9 tickets indexed in `tasks.md`; next: `implement` ticket 01)
**Owner:** apps/web
**Dependencies:** Plan 00 gate passed
**Requirements:** PG-01, SF-03, SF-04, CM-01, CM-02, CM-03, CM-04, NFR-02, NFR-04
**Decisions from:** `grill-with-docs` session 2026-10-07; terms in `CONTEXT.md`; `docs/adr/0003-site-chat-same-origin-agent-protocols-separate.md`

## Problem Statement

Rolan's current site is a dark terminal-themed portfolio whose content is hard-coded in TypeScript files, mixes contests with hackathons, still lists an internship as current, has no Alunsina entry, and fails lint. It cannot carry the 1mil.dev brand, and adding a project means editing components. Recruiters get no clear 30-second story.

## Solution

Fully rebuild the site in one go on the soft-neobrutal design system. All portfolio facts move into schema-checked MDX content files that drive every surface. The new Home gives the 30-second pitch: who Rolan is, one large Spotlight project (Alunsina), the two newest projects, and contact. A redesigned terminal easter egg is reachable by `~` or a visible button, running browser-only commands until the AI chat ships in a later plan. Incomplete content stays hidden as drafts so the site is always honest and the build always green.

## User Stories

1. As a recruiter, I want to see Rolan's name and role in the first screen, so that I know who he is within seconds.
2. As a recruiter, I want a large Spotlight project on Home, so that I see his strongest work without scrolling through a grid.
3. As a recruiter, I want the Spotlight to show a video or gif, so that I can see the project working without reading.
4. As a recruiter, I want to see the two newest projects below the Spotlight, so that I know he is still actively building.
5. As a recruiter, I want a "See all N projects" link, so that I know there is more work and how much.
6. As a recruiter, I want an "ex-intern @ Globe Telecom" badge in the hero, so that I see real industry experience at a glance.
7. As a recruiter, I want contact options (email, GitHub, LinkedIn) on Home, so that I can reach Rolan immediately.
8. As a recruiter, I want to copy Rolan's email with one click, so that I don't retype it.
9. As a recruiter, I want a resume download on Home, so that I can attach it to my pipeline.
10. As a hiring manager, I want each project card to show status (live, building, archived) as a plain flat badge, so that I know what I can try.
11. As a hiring manager, I want project cards to link to a live demo or repository, so that I can verify the work myself.
12. As any visitor, I want every link in the nav to lead to something that exists, so that I never hit a dead end.
13. As any visitor, I want the site to follow my system light/dark setting, so that it is comfortable to read.
14. As any visitor, I want a toggle to override light/dark, so that I can choose.
15. As any visitor, I want my theme choice remembered without a flash of the wrong theme, so that the site feels polished.
16. As a visitor on a phone, I want a single-column layout and a bottom-sheet menu, so that the site is easy to use one-handed.
17. As a keyboard user, I want every interactive element reachable with a visible focus ring, so that I can use the site without a mouse.
18. As a visitor who prefers reduced motion, I want all animation turned off, so that the site does not make me uncomfortable.
19. As a curious visitor, I want pressing `~` to open a terminal, so that I find a fun easter egg.
20. As an HR visitor who doesn't know the secret key, I want a visible `>_` button in the nav and mobile menu, so that I can still open the terminal.
21. As a desktop visitor, I want a small "psst: press ~" hint in the footer, so that I can discover the easter egg.
22. As a terminal user, I want `help` to list the commands, so that I know what I can do.
23. As a terminal user, I want `whoami` to print a short bio, so that I learn about Rolan in terminal style.
24. As a terminal user, I want `projects` to list listed projects, so that I can browse work from the terminal.
25. As a terminal user, I want `open <slug>` to open a project's demo or repo, so that I can jump to it.
26. As a terminal user, I want `theme` to switch light/dark, so that the terminal feels connected to the site.
27. As a terminal user, I want `contact` to print contact links, so that I can reach Rolan.
28. As a terminal user, I want `ask …` to tell me the AI chat is coming soon, so that I know it is planned rather than broken.
29. As a terminal user, I want unknown commands to suggest `help`, so that I'm never stuck.
30. As a terminal user, I want Escape and a close button to dismiss the terminal and return focus, so that I can get back to the page.
31. As a visitor, I want "Ask my AI" to open the terminal until the real chat exists, so that the button always does something.
32. As Rolan, I want to add a project by adding one MDX file, so that updating the site takes under 10 minutes.
33. As Rolan, I want the build to fail with a clear message when a content file has a missing or wrong field, so that I never publish broken content.
34. As Rolan, I want to pick the Spotlight by marking exactly one project, so that I control what recruiters see first.
35. As Rolan, I want the build to fail when zero or two projects are marked Spotlight, so that the rule can't silently break.
36. As Rolan, I want projects to carry a build span (start month, end month once done), so that a timeline can show when each was built.
37. As Rolan, I want the build to fail when a `building` project has an end month or a finished project lacks one, so that status and dates never contradict.
38. As Rolan, I want to mark a project unlisted, so that I can share its page by direct link while it is still being built.
39. As Rolan, I want unlisted projects excluded from Home, lists, timeline, chat, and search indexing, so that unfinished work stays quiet.
40. As Rolan, I want incomplete content marked draft and hidden everywhere, so that placeholders never reach visitors.
41. As Rolan, I want the build to print what each draft is missing, so that I know what facts to fill in.
42. As Rolan, I want competitions recorded as hackathons or contests, so that my Java contest wins aren't mislabelled as hackathons.
43. As Rolan, I want competitions to show a prize amount and a link to the public announcement, so that wins are credible.
44. As Rolan, I want milestones as separate files with points, so that the tracker never changes silently when a status flips.
45. As Rolan, I want certifications and events as zero-point milestones, so that they appear on the timeline without inflating the counter.
46. As Rolan, I want the old terminal site preserved under a git tag, so that I can recover anything from it.
47. As Rolan, I want `pnpm check:workspace` to pass, so that every phase ends live and clean.

## Implementation Decisions

- **One-go rebuild.** The legacy site (terminal UI, boot reveal, classic view, sidebar, section components, cursor, profile status, hard-coded data files, legacy hooks) is removed in this plan. Before removal, the last legacy commit is tagged `legacy-terminal-site`. This also clears the 7 pre-existing lint errors.
- **Content loader: Velite.** It runs as a separate step before the Next.js build and outputs typed collections into a git-ignored generated folder. Root and app scripts run Velite before dev, typecheck, and build so types always exist.
- **Content collections and fields** (glossary terms from `CONTEXT.md`):
  - Project: slug, title, oneLiner, tags[], skills[], role, team, status (`live` | `building` | `archived`), started (month), ended (month, optional), spotlight (bool), unlisted (bool), draft (bool), demoUrl, repoUrl, cover, video (optional), architectureImg (optional), evals (optional). Body is MDX.
  - Competition: slug, name, kind (`hackathon` | `contest`), date, placement, prize (optional, includes amount), prizeSourceUrl (optional), photo (optional), draft. Hackathon-only fields: hours, teamSize, role, built, demoUrl, recapPost. A contest must not carry hackathon-only fields.
  - Post: slug, title, tag (`til` | `thoughts`), date, summary, related[], draft (schema only; no posts yet).
  - Milestone: date, type, label, points (≥ 0), link (optional).
- **Content model module (deep module, the main seam).** One module takes the raw collections and exposes the site's view: `spotlight`, `recentProjects(2)` (newest by `started` among listed, non-spotlight), `listedProjects`, `projectCount`, `competitions` (newest first), `milestones`, and `missingFacts` (per draft). It enforces the cross-file rules the per-file schemas cannot: exactly one spotlight among non-draft projects; spotlight cannot be unlisted or draft; unique slugs; status/build-span consistency. A violation throws with a message naming the file, which fails the build.
- **Listing rules.** Listed = not draft and not unlisted. Drafts are excluded from every output except `missingFacts`. Unlisted projects are excluded from every list; their pages (from Plan 02) are reachable by direct URL and marked noindex.
- **Content migration (one file per item).**
  - Projects: Restaurant Web, Airplane Ticketing System, CCED-Admin-web, UMak Kalinga App, HANDA, Alunsina (spotlight, team project, video showcase), plus two unlisted `building` placeholders ("Agentic coding workflows", "Advanced RAG pipeline").
  - Hackathon products (Pulsify, Mayari, Haliya) get project files only if a demo or repo exists; otherwise they live on their competition.
  - Competitions: Infotechnolympics 2025 and 14th IT Skills Olympics 2025 (contests); eGovPH Hackathon 2026 (prize ₱100,000 with the UMak announcement link), Developer Camp Manila, Agora, Zero Vector Venture, Devkada (hackathons).
  - Milestones: Sofi AI internship (May–Jul 2026), Globe Telecom internship (Jul–Sep 2026), competition milestones per the point rules, notable certifications as zero-point milestones.
  - Anything with unknown facts is a draft. The "Chatbots" umbrella entry is dropped. Its Sofi work gets no public write-up.
- **Design system.** Tokens from `docs/standards/design-brief.md` become CSS variables (light + dark), exposed to Tailwind 4 as theme values. Fonts load through `next/font`: Bricolage Grotesque, Inter, JetBrains Mono. No glows, gradients, or pulsing elements. Status badges are flat pills.
- **Components.** Button (primary / secondary / ghost, press-into-shadow), Card, Pill/Badge (tag, placement, status), Nav (sticky; mobile bottom sheet; `>_` terminal button; gold "Ask my AI" opening the terminal), Footer (contact, "psst: press ~" hint on desktop), Spotlight card, compact project card, email copy pill.
- **Home (PG-01, this plan's slice).** Hero (name, typing role line, "ex-intern @ Globe Telecom" badge), Spotlight card, two recent project cards, "See all N projects →" (an anchor in this plan; it targets `/work` once Plan 02 ships), contact with resume download. No 1mil tracker yet (SF-02 is Plan 03). Cards link to demo or repo until Plan 02 adds case-study pages.
- **Navigation without dead ends.** The nav shows only existing destinations: Home, `#projects`, `#contact`, the terminal button, and Ask my AI.
- **Theme (SF-04).** Follows the system by default. A toggle overrides and is remembered. A pre-paint script prevents a flash, keeping the existing approach.
- **Terminal (SF-03).** A soft-neobrutal panel (cream surface, ink border, mono font). It opens with `~` (ignored while typing in inputs), the nav button, or Ask my AI, and closes with Escape or the close button, restoring focus. A pure command interpreter (second seam) maps input plus the content model to output lines or an action (open URL, toggle theme, close). Commands: `help`, `whoami`, `projects`, `open <slug>`, `theme`, `contact`, `ask …` ("chat lands soon"), `clear`, and an unknown-command hint. Everything runs in the browser. There is no server route, so there is no attack surface until the chat security plan.
- **Accessibility and motion.** The terminal is a labelled dialog with a focus trap. Every motion has a reduced-motion off state.

## Testing Decisions

- Tests check external behaviour only: what the content model returns or rejects for given content, and what the interpreter outputs for given input. They never assert internal structure or component markup.
- **Seam 1, content model:** Vitest with small fixture collections. It covers the one-spotlight rule (0, 1, 2 cases), spotlight-not-unlisted/draft, slug uniqueness, status/build-span consistency, drafts excluded and reported, unlisted excluded from lists, recent-project ordering, and competition ordering. Velite schemas are exercised against broken fixtures (contest with hackathon fields, missing required field, negative points) to prove rejection.
- **Seam 2, terminal interpreter:** Vitest covering each command, `open` with a known/unknown/unlisted slug, `ask` reply, and the unknown-command hint.
- **No component or browser tests.** UI is verified by `pnpm build`, a keyboard-only pass, a reduced-motion pass, light/dark checks at 375 / 1024 / 1280 px, and recorded in `evidence.md`.
- Prior art: none. This plan introduces Vitest as the repository's first test runner (a root `pnpm test` script). Follow the `tdd` skill: red, then green, per behaviour.

## Out Of Scope

- `/work`, project case-study pages, timeline view, hackathons page, skills and AI toolbox (Plan 02).
- Blog, About, 1mil tracker, `/1mil`, SEO/OG/RSS (Plan 03).
- Any AI: chat, `/ask` page, ingestion, evals (Plan 04 chat security, then Plan 05).
- MCP server and A2A agent (Plan 06, ADR 0003).
- Alunsina's product site and domain (Alunsina repository, team-owned).
- Writing the missing facts in drafts (Rolan fills them over time).

## Further Notes

- Resume: keep the existing `resume.pdf` asset; the empty legacy `content/resume.md` is left for Plan 05's ingestion decision.
- Legacy prose files (`content/aboutme.md`, `skills.md`, `learning-roadmap.md`, `experience.md`) stay untouched for Plans 02–04; `projects.md` and `competitions.md` are superseded by the new content files and removed once migrated.
- Prize amounts are allowed (`CONTEXT.md` → Prize); personal earnings are not.
