# 1mil.dev Requirements Engineering

**Source:** "1mil.dev — PRD, TRD and design brief" (2026-10-07, @jero). This file is the canonical, atomic form of its PRD section. Stack lives in `docs/dev/technology-stack-and-development.md`; visual rules live in `docs/standards/design-brief.md`.

## Product Overview

1mil.dev is a playful, simple portfolio + diary that proves Rolan can ship AI and software products, framed as a journey toward the dream number 1,000,000 (see `CONTEXT.md`).

### Goals

- G-1 Get Rolan an AI engineer / software engineer internship or job.
- G-2 Show proof of skill through live demos, not claims.
- G-3 Show personality: playful, curious, always building.
- G-4 Keep a public diary of learning and thoughts.
- G-5 Stay easy to maintain: adding a project, win, or post takes under 10 minutes.

### Audiences

| Visitor | Time spent | What they need |
| --- | --- | --- |
| Recruiter / HR | under 3 min | who, role, proof, resume, contact |
| Hiring manager / engineer | 5 to 10 min | how projects work, tradeoffs, code, evals |
| Hackathon peers, friends | any | wins, recaps, blog, fun stuff |

### Success Metrics

- SM-1 A recruiter finds name, role, the Spotlight project, and resume within 30 seconds.
- SM-2 3 to 5 polished demos are live, each with a project page.
- SM-3 At least 1 blog post per 2 weeks.
- SM-4 Lighthouse 90+ on performance and accessibility, mobile included.
- SM-5 The chat answers about Rolan with sources and stays on topic.

## Functional Requirements

### Pages

| ID | Page | Requirements |
| --- | --- | --- |
| PG-01 | Home `/` | The system shall show a hero with name, role, the most recent internship badge, and the 1mil tracker. The system shall show the Spotlight project as a large, distinct card with its video or gif, followed by the 2 newest listed projects as compact cards and a "See all N projects" link. The system shall show an "In the news" card for the featured highlight (photo when present, headline, date, summary, source link), the 3 most recent other highlights with a link to `/1mil`, skills grouped by area with usage level and links to the projects that use them, the AI toolbox as flip cards, a chat teaser, the latest 3 posts, and contact. The featured highlight replaces a separate win badge; there is no competition strip. |
| PG-02 | Work `/work` | The system shall list every listed project as a card. The system shall filter cards by tag (AI, full-stack, hackathon). The system shall keep the active tag filter in the URL. The system shall offer a timeline view (kept in the URL) drawn as dots on a connected line grouped by year from each project's build span, with `building` projects extending to now. Unlisted and draft projects shall not appear. |
| PG-03 | Project `/work/[slug]` | The system shall generate a case study only for a listed project whose write-up has Problem, What I built, and Lessons sections; otherwise the project card links to its demo or repository and the build lists the missing write-up. A case study shall show problem, demo gif/video, try-demo and repo buttons, Rolan's role, stack, architecture diagram, tradeoffs, evals (when present), and lessons. Stack shall come from the skills registry. Screenshots, video, and a product-site link appear only when present. For a team project the system shall state Rolan's part. The system shall link related posts. |
| PG-04 | Hackathons & contests `/hackathons` | The system shall show a wins counter and one card per competition, newest first (year-only dates sort within their year): name, date, kind, placement, result, prize (with amount and source link when present), and photo. Hackathon cards shall also show hours, team role, what was built, and demo and recap links, and shall flip to "what we built in X hours". |
| PG-05 | Blog `/blog`, `/blog/[slug]` | The system shall list posts with tag filter (all, til, thoughts), date, title, one-line summary, and reading time. A post page shall use a 68ch text column, show date and tag, end with a related project card, and link next/previous posts. The system shall publish an RSS feed. |
| PG-06 | About `/about` | The system shall show a short story, photo, now-learning box, skills, AI toolbox, timeline (school, Globe, wins), and a resume download. |
| PG-07 | 1mil `/1mil` | The system shall list every highlight (milestone) newest first with date, label, summary, and link (Plan 02), and shall show the big counter and "why 1mil" in 3 sentences. |

Every page shall offer a next step (no dead ends). Navigation: Home, Work, Hackathons, Blog, About, plus the gold Ask my AI button (pages join the nav as they ship).

### Site-Wide Features

| ID | Feature | Requirements |
| --- | --- | --- |
| SF-01 | Ask my AI | The system shall provide a floating chat button on every page and a teaser on Home. The system shall answer from site content only (see AI-01..AI-05) and show source chips linking to the cited pages. The panel shall offer suggested-question chips. |
| SF-02 | 1mil tracker | The system shall sum milestone points (rules below) into a counter shown in the hero (`1mil.exe`) and the menu bar. The system shall draw the road to 1,000,000: milestones oldest first on a winding path with each stop's points and running total. Home shall show the `highlight` stops, and a maximize control shall open every stop. |
| SF-03 | Terminal easter egg | Pressing `~`, a visible `>_` nav button, or Ask my AI (until SF-01 ships) shall open a soft-neobrutal terminal panel (cream panel, ink border, mono font). The footer shall hint "press ~" on desktop. Browser-only commands (`help`, `whoami`, `projects`, `open`, `theme`, `contact`, `clear`) shall work before the chat exists; `ask` shall reply that chat is coming. Once SF-01 ships, the chat runs inside it. The old terminal UI is retired. |
| SF-04 | Dark mode | The system shall follow the system color scheme and provide a toggle. |
| SF-05 | Command palette | *Deferred (later):* `Ctrl/Cmd + K` jumps anywhere. |
| SF-06 | Demo subdomains | *Deferred until a demo Rolan controls exists.* Each demo shall live at `<name>.1mil.dev`, show the `by 1mil.dev ↗` badge linking to `1mil.dev/work/<slug>`, share favicon, accent, and font, and show a notice when it runs on a free tier or sample data. Exception: Alunsina has its own team-owned product site; its case-study page links there and the product site carries a footer credit instead of the badge. Exception: eHanda stays on its government host with no badge; its case study links out. |
| SF-07 | Ask page `/ask` | The system shall provide a shareable full-screen chat page at `/ask` for recruiters. A sticky header shall show Rolan's name and role, a one-line explanation, and a gold "View full site →" button visible on all screen sizes. Typing `home` shall return to `/`. Answers shall show source chips. The page ships only with the working AI chat (SF-01). |

### Content Model

One content file feeds every surface: adding one file updates pages, cards, tracker, skills links, and chat.

| ID | Type | Fields |
| --- | --- | --- |
| CM-01 | Project | slug, title, oneLiner, tags[] (`ai` / `full-stack` / `hackathon`), skills[] (skills registry ids), role, team (bool), status (`live` / `building` / `archived`), started (month), ended (month; required unless `building`, forbidden when `building`), spotlight (bool; exactly one project), unlisted (bool), draft (bool), demoUrl, repoUrl, cover (gif/png), screenshots[] (co-located images), video (optional), siteUrl (optional product site), architectureImg, evals (optional); case-study sections live in the MDX body |
| CM-02 | Competition | slug, name, kind (`hackathon` / `contest`), date (`YYYY-MM` or `YYYY`), placement (display text), result (`won` / `placed` / `finalist` / `joined`), prize (optional, with amount), prizeSourceUrl (optional), photo, draft; hackathon only: hours, teamSize, role, built, demoUrl, recapPost, project (slug of the listed project built there; the build fails on an unknown or unlisted slug, and the project card carries the result) |
| CM-03 | Post | slug, title, tag (til / thoughts), date, summary, related[], draft |
| CM-04 | Milestone (Highlight) | date, ended (optional), type (education / internship / competition / certification / event / project / post / graduation), label, company (optional), points (0 or more; 0 for certifications and events), link, photo (optional, co-located), summary (optional), featured (bool; exactly one), highlight (bool; shown on the Home road), stamp (optional short word, e.g. "TOP 10"), details[] (optional lines on what the role involved, shown when the experience window is maximized) |
| CM-05 | Skill / Tool | One registry entry each: id, name, kind (`skill` / `tool`), group (ai / frontend / backend / mobile / tools), level (daily / used in project / experimenting), usedFor (tools), usedIn[] (computed from listed projects). An unknown skill id on a project fails the build. |

Content files shall be validated against these schemas at build time; an invalid file fails the build. Draft files shall be hidden from every page and the chat, and the build shall report their missing facts. Unlisted projects shall be reachable only by direct link and marked noindex.

### 1mil Tracker Point Rules (tunable)

Competitions score by level and result:

| Level | Competed | Top 10 / finalist | Won |
| --- | --- | --- | --- |
| School / regional | 5,000 | 10,000 | 20,000 |
| National | 15,000 | 70,000 | 120,000 |
| International | 30,000 | 120,000 | 200,000 |

| Other milestone | Points |
| --- | --- |
| Blog post | 1,000 |
| University enrollment | 10,000 |
| Project shipped with live demo | 20,000 |
| Internship | 30,000 |
| Graduation | 50,000 |
| Full-time job | 100,000 |

Hackathons joined with no known level count as school / regional, competed.

### AI Chat (RAG Over The Site)

| ID | Requirement |
| --- | --- |
| AI-01 | Build step: the system shall chunk all MDX content plus the resume into ~500-token pieces, embed them, and upsert to the vector store with url and title, on every deploy. |
| AI-02 | Request: the system shall check the rate limit, embed the question, retrieve top-k chunks, and prompt with sources. |
| AI-03 | Response: the system shall stream the answer with source chips and refuse off-topic and personal-data questions. |
| AI-04 | Guardrails: the system prompt shall be scoped to Rolan's public info, with max tokens, a daily spend cap, and logs without personal data. The chat shall be reachable only from 1mil.dev pages through same-origin routes: no agent card, no API key in client code, no tools tied to personal accounts, per-visitor rate limits, message size limits, and no stored IPs or raw transcripts (`docs/adr/0003-site-chat-same-origin-agent-protocols-separate.md`). |
| AI-05 | Eval: a fixed 20-question test set shall run before each deploy. |

## Non-Functional Requirements

| ID | Area | Requirement |
| --- | --- | --- |
| NFR-01 | Performance | LCP under 2.5 s on mobile; home JS under 150 KB; images as AVIF/WebP; gifs as short MP4/WebM. |
| NFR-02 | Accessibility | WCAG 2.1 AA, keyboard navigation, visible focus rings, alt text; `prefers-reduced-motion` turns animation off. |
| NFR-03 | SEO | Per-page title and description, auto-generated Open Graph images per post/project, sitemap.xml, RSS, Person schema. |
| NFR-04 | Responsive | Mobile first; breakpoints 640 / 1024 / 1280 px; mobile nav becomes a bottom sheet. |
| NFR-05 | Privacy | No personal earnings (salary, client income), no private project data, chat logs anonymized. Publicly announced competition prizes, including amounts, may be shown. Alunsina (which includes the AI pet health advisory, formerly called the pet chatbot) is shown publicly as UI/UX, pages, architecture, and a showcase video only, and never uses the VIN source documents in public. No public write-up of Sofi AI internal work. |
| NFR-06 | Maintenance | Add a project/post/milestone by adding one MDX file; CI runs typecheck, lint, chat eval, and link check. |

## Out Of Scope For v1

Comments, newsletter, CMS dashboard, i18n, 3D or heavy animation.

## Product Decisions

- The terminal stays as the `~` easter egg only, redesigned in the soft-neobrutal style; the old UI is retired.
- Alunsina: the team agreed to a public demo of UI/UX and pages only (web + app). No live AI; the AI side is shown through a showcase video, the architecture diagram, and the write-up. The brief's separate "pet chatbot" is the same project.
- Home shows one hand-picked Spotlight project (Alunsina at launch) instead of three featured projects (2026-10-07 grilling session).
- Agent protocols (MCP, A2A) are a separate authenticated showcase, never the site chat (`docs/adr/0003-site-chat-same-origin-agent-protocols-separate.md`).
- Embeddings and backend shape are recorded in `docs/adr/`.

## Open Questions

- Which chat LLM fits the free credits? (Owned by Plan 05.)
- Does the Alunsina team agree to a public repo? (Owned by Plan 02.)
