# Plan 02: Proof

**Status:** Planned (spec final; 9 tickets indexed in `tasks.md`; blocked by Plan 01 fix tickets 10 and 11)
**Owner:** apps/web, content
**Dependencies:** Plan 01 review fix tickets 10 and 11 done (they touch the same files)
**Requirements:** PG-01 (skills, AI toolbox, In the news), PG-02, PG-03, PG-04, PG-07 (list only), CM-02, CM-04, CM-05, NFR-05
**Decisions from:** `grill-with-docs` session 2026-10-08; terms in `CONTEXT.md` (Skill / Tool, AI toolbox, Case study, Result, Competition date, Highlight, Featured highlight)

## Problem Statement

The site shows who Rolan is but not the proof behind it. A hiring manager cannot browse all projects, see how one was built, or check skills against real work. Wins and internships exist only as data with nowhere to read them, and competitions are hidden because their exact months are unknown. Skills are free text on each project, so the same skill can appear under different spellings and "used in" cannot be trusted.

## Solution

Add the proof pages and the data behind them. One skills registry lists every skill and tool once, and projects refer to it. `/work` lists every listed project with tag filters and a playful timeline. Each project gets a case-study page as soon as its write-up exists. `/hackathons` shows competitions as cards, including year-only dates. Milestones become highlights: Home leads with an "In the news" card for the featured highlight, and `/1mil` lists every highlight newest first. Missing content never shows a placeholder: it stays hidden, and the build says what is missing.

## User Stories

1. As a recruiter, I want an "In the news" card on Home, so that I see Rolan's most notable recent achievement immediately.
2. As a recruiter, I want the featured card to show a photo, headline, date, short summary, and source link, so that the achievement is credible.
3. As a recruiter, I want the three most recent other highlights under the featured card, so that I see Rolan is active.
4. As a recruiter, I want a "See all" link from the highlights to `/1mil`, so that I can read the full history.
5. As a visitor, I want `/1mil` to list every highlight newest first with date, label, and link, so that I can scan Rolan's journey.
6. As a hiring manager, I want a Skills section on Home grouped by area, so that I can match skills to my role quickly.
7. As a hiring manager, I want each skill to show its usage level (daily, used in project, experimenting), so that I know how deep it goes.
8. As a hiring manager, I want each skill to link to the projects that use it, so that I can verify the claim.
9. As a visitor, I want an AI toolbox of flip cards on Home, so that I see which AI tools Rolan uses and what for.
10. As a keyboard or reduced-motion user, I want flip cards to work by keyboard and show both sides without animation when motion is reduced, so that nothing is hidden from me.
11. As a hiring manager, I want `/work` to list every listed project as a card, so that I can see all the work in one place.
12. As a hiring manager, I want to filter `/work` by AI, full-stack, or hackathon, so that I see only what is relevant.
13. As a recruiter, I want the filter kept in the URL, so that I can share a filtered list.
14. As a visitor, I want a timeline view on `/work` drawn as dots on a connected line, grouped by year, so that I can see when each project was built.
15. As a visitor, I want projects still being built to run to "now" on the timeline, so that current work is obvious.
16. As a visitor, I want the chosen view kept in the URL, so that a shared link opens the same view.
17. As a hiring manager, I want a case-study page per project with the problem, what Rolan built, and lessons, so that I understand the work beyond a one-liner.
18. As a hiring manager, I want architecture, tradeoffs, and evals sections when they exist, so that I can judge engineering depth.
19. As a hiring manager, I want the stack on each case study taken from the skills registry, so that it matches the Skills section exactly.
20. As a hiring manager, I want try-demo and view-code buttons on a case study when links exist, so that I can verify the work myself.
21. As a hiring manager, I want team projects to state Rolan's part, so that I know what he personally did.
22. As a visitor, I want Alunsina's page to show screenshots and an architecture diagram, so that I can see the system without a live AI.
23. As a hiring manager, I want Alunsina's Tagalog/Taglish question set shown as evals, so that I can see how the AI was tested.
24. As a visitor, I want a "Visit Alunsina" link and the showcase video to appear once they exist, so that I never see a placeholder.
25. As a visitor, I want a project card to link to its case study when one exists and to its demo or repository otherwise, so that every card leads somewhere real.
26. As a visitor, I want `/hackathons` to show every competition as a card, newest first, with a wins counter, so that I see Rolan's competitive record.
27. As a visitor, I want hackathon cards to flip to "what we built in X hours", so that I learn what was built.
28. As a visitor, I want contest cards to show only contest facts, so that a Java contest is not presented as a hackathon.
29. As a visitor, I want competitions with only a known year to show the year, so that real wins are not hidden for lack of a month.
30. As a visitor, I want prize amounts with a link to the public announcement, so that the prize is verifiable.
31. As a visitor, I want the nav to show Home, Work, Hackathons, and Contact, so that I can reach every page.
32. As Rolan, I want to add a skill once in the registry and reference it from projects, so that spelling is consistent.
33. As Rolan, I want the build to fail when a project references a skill that is not in the registry, so that typos never ship.
34. As Rolan, I want the build to fail when a project uses a tag outside ai, full-stack, and hackathon, so that filters stay clean.
35. As Rolan, I want "used in" computed from projects, so that I never maintain it by hand.
36. As Rolan, I want a project's case study to appear automatically once I write its three required sections, so that publishing is just writing.
37. As Rolan, I want the build to list projects still missing write-ups without failing, so that I know what to write next.
38. As Rolan, I want case-study images to live next to the project file and fail the build when missing, so that pages never show broken images.
39. As Rolan, I want to record a competition's result (won, placed, finalist, joined) separately from its display text, so that points and wins are computed correctly.
40. As Rolan, I want a finalist to count as placed for points, so that the rule is predictable.
41. As Rolan, I want to mark exactly one highlight as featured, with the build failing on zero or two, so that Home always has one clear headline.
42. As Rolan, I want talks and meetups recorded as zero-point event milestones, so that they appear as highlights without inflating the counter.

## Implementation Decisions

- **Skills registry (CM-05).** One registry content file lists entries with: id, name, kind (`skill` | `tool`), group (`ai`, `frontend`, `backend`, `mobile`, `tools`), level (`daily` | `used in project` | `experimenting`), and for tools a one-line `usedFor`. Projects' `skills[]` hold registry ids. The content model resolves them, computes `usedIn` per entry (listed projects only), and throws a `ContentRuleError` naming the file and the unknown id. Seed the registry from `content/skills.md` and the existing project skill lists. Default levels: `used in project` when any listed project uses it, otherwise `experimenting`; the owner marks `daily` later. The AI toolbox is the registry's tools in the `ai` group.
- **Tags.** Project `tags` become the enum `ai` | `full-stack` | `hackathon`; existing `fullstack` values migrate. Alunsina gets `ai`, `full-stack`.
- **Case study readiness (PG-03).** The content model parses each project's MDX headings. A listed project is "case study ready" when its body contains `## Problem`, `## What I built`, and `## Lessons`. Optional sections: `## Architecture`, `## Tradeoffs`, `## Evals`. `/work/[slug]` is generated only for ready projects. Cards link to the case study when ready, else to the demo or repository. The build prints the projects missing write-ups without failing. Stack comes from resolved registry entries. Team projects show the role line.
- **Project media.** Images (cover, screenshots, architecture) live next to the project file (e.g. a project folder holding the `.mdx` and its images) and use Velite image validation, so a missing file fails the build. `video` and a product-site link (`siteUrl`) are optional fields, shown only when present. No placeholders.
- **Alunsina specifics.** Its evals section shows the Tagalog/Taglish question set (owner confirmed it contains no VIN content). It links to the product site once `siteUrl` exists. It has no `1mil.dev` subdomain.
- **`/work` (PG-02).** Server-rendered list of listed projects; tag filter and view are URL search params (`?tag=ai`, `?view=timeline`). The grid is 3 / 2 / 1 columns. The timeline groups by year and draws each project as a dot (start) on a connected line with its build span; `building` projects extend to "now". Playful but within the brief: ink line, flat dots, no glows; static under reduced motion.
- **Competitions (CM-02, PG-04).** Competition `date` accepts `YYYY-MM` or `YYYY`; sorting places year-only dates within their year. A new `result` enum (`won` | `placed` | `finalist` | `joined`) is required for non-drafts. Points derive from result: won 100,000, placed or finalist 50,000, joined 10,000. `/hackathons` ("Hackathons & contests") shows a wins counter (count of `won`) and cards newest first; hackathon cards flip (keyboard operable; reduced motion shows both sides without the flip) to built / hours / team role / demo; contest cards omit hackathon fields. Prize amount and source link shown when present.
- **Highlights (CM-04, PG-01, PG-07).** Milestones gain optional `photo` (co-located, validated), `summary` (≤ 2 lines), and `featured` (boolean). The content model returns `highlights` newest first and the single `featuredHighlight`, throwing on zero or two featured. Mark the eGovPH 2026 milestone featured. Home "In the news": featured card (photo when present, label as headline, date, summary, source link) plus the three most recent other highlights and "See all →" to `/1mil`. `/1mil` lists all highlights newest first (Plan 03 adds the counter above it). Home no longer shows a separate win badge or a competition strip.
- **Navigation.** Home, Work, Hackathons, Contact (`/#contact`), `>_`, Ask my AI. `/1mil` is reached from Home's highlights. The terminal's project data is unchanged.
- **Deferred.** SF-06 demo badge (until a demo Rolan controls exists); terminal timeline command; Plan 03 counter, blog, About.

## Testing Decisions

- Tests check behaviour through public outputs only, with literal expected values.
- **Seam 1, content model** (`createContentModel`): unknown skill id fails naming file and id; `usedIn` counts listed projects only; registry tools in the ai group form the toolbox; case-study readiness from headings (ready, missing one section, optional sections ignored); missing write-ups listed; year-only and month competition dates sort correctly; points from result (finalist = placed); wins counter; exactly-one featured highlight (0, 1, 2); highlights newest first.
- **Seam 2, schemas** (exported by Plan 01 ticket 11): invalid tag rejected; competition date accepts `2025` and `2025-08`, rejects `25-8`; non-draft competition without `result` rejected by the model.
- **Seam 3, terminal interpreter:** unchanged; existing tests keep passing.
- **No component tests.** UI is verified by a browser pass extending Plan 01's (all pages at 375 / 1024 / 1280 px, light and dark, no horizontal scroll, keyboard tab order including inside dialogs and flip cards, reduced motion, no-JS readability of `/work`, `/hackathons`, `/1mil`, case studies), recorded in `evidence.md`.

## Out Of Scope

- SF-06 demo badge and moving demos to subdomains (eHanda stays on its government host; Alunsina gets its own product site).
- Writing case-study prose, screenshots, photos, skill levels, and competition facts: the owner supplies these; missing content stays hidden.
- Blog, About, the 1mil counter (Plan 03); any AI (Plans 04–05); MCP/A2A (Plan 06).

## Further Notes

- Flash-tier models may implement these tickets one at a time per `docs/agents/skill-policy.md`; review by the high-reasoning tier precedes each commit.
- Content still owed by the owner is listed in the roadmap's "Content owed" note.
