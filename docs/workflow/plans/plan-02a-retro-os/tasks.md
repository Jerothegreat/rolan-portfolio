# Plan 02a Tasks

- [x] `RO-01` Reference board and decisions with Rolan (palette A, subtle tilt, curved road, highlights + maximize). PG-01, SF-02.
- [x] `RO-02` Road model: `lib/road.ts` (`buildRoad`), test-first in `lib/road.test.ts`; exposed as `site.road`. SF-02.
- [x] `RO-03` Milestone schema: `education` type, `highlight`, `summary`, `stamp`; new and updated milestone files; competition dates. CM-04.
- [x] `RO-04` Tokens and motion CSS (sky, pink, square radius, window shadows, desk dither, tilt, meter fill, road draw), Silkscreen font. Design brief.
- [x] `RO-05` Components: `Window`, `Stamp`, `TrackerWindow`, `RoadWindow`; menu bar, status bar, terminal chrome; `RoleTyper` removed; `Button` gains the `ai` variant. PG-01, SF-02, NFR-02.
- [x] `RO-06` Home rebuilt as the window pile, road, projects, skills, and contact. PG-01.
- [x] `RO-07` Docs: design brief, ADR 0004, requirements (SF-02, CM-04, point rules), roadmap, traceability.
- [x] `RO-08` Browser pass: 1280 light / 390 dark, maximize + Esc, reduced motion, draw-in.
- [x] `RO-09` Board parity: compact menu bar, tighter hero, skills beside "In the news" (featured milestone, at most one), section order. PG-01, CM-04.
- [x] `RO-10` Owner feedback pass: pixel sun/moon toggle; name kept inside `about.txt`; profile photo window replaces the `~` note (the hint stays in the status bar); duplicate terminal button removed from the menu bar; hovered windows rise above overlaps; road stops anchored to both edges so the road spans the window; no image placeholders.
- [x] `RO-11` Owner feedback pass 2: labelled pixel media placeholders (projects, spotlight, news); `C:\projects` carousel of all listed projects with tag filters (hackathon builds included); `blog.txt` with an empty state; `mail.app` merged with links; `github.exe` public activity (`lib/github.ts`, test-first, revalidated hourly). PG-01.
- [x] `RO-12` Owner feedback pass 3: GitHub contribution heatmap (`lib/contributions.ts`, test-first); ticker with last updated, contributions, total, and visitor number (`/api/visits` on Upstash Redis, hidden until configured); hackathon cards in the carousel (4 joined hackathons published as `Participant`); `experience.log`; "open to work!" starburst; pixel ▲ logo sticker. PG-01, NFR-05.
- [x] `RO-13` Owner feedback pass 4: visitor placeholder `#------`; pixel coin logo; menu bar above raised windows (z-50); Home order experience + tech stack, projects, road, news + blog, GitHub, contact; Experience and Blog nav links; retro scrollbars.
- [x] `RO-14` Owner feedback pass 5: shared `WindowDialog`; experience maximize with milestone `details`; project Details popup with item switching (list, prev/next, arrow keys); hackathon `project` link merges eGovPH into eHanda (test-first rule); Sofi role "AI & QA intern"; ticker words without the jokes; sticker and stamp kept inside phone width.
- [x] `RO-15` Owner feedback pass 6: `/blog` and `/blog/[slug]` (PG-05 partial, from Plan 03 VO-02); terminal "under construction" sign, `ask` reply updated test-first; workflow playbook; promotion to `master`.
