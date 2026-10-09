# Plan 02a: Retro-OS Redesign

**Status:** Promoted to `master` by owner (2026-10-09); independent review owed
**Owner:** apps/web, content, docs
**Dependencies:** Plan 02 ticket 01 (skills registry), committed first. Runs before the rest of Plan 02, so those pages are built on the new look.
**Requirements:** PG-01 (hero tracker, look), SF-02, CM-04 (highlight, summary, stamp, education), NFR-02 (reduced motion)
**Decisions:** `docs/adr/0004-retro-os-neobrutal-design.md`; reference board (palette A, subtle tilt, curved road) reviewed with Rolan on 2026-10-09.

## Problem

The Plan 01 look read as basic: one centered column, rounded cards, mostly gold, a typing hero, and no visible journey toward 1,000,000.

## Solution

- Re-skin the site as a retro desktop of neobrutal windows: square, tilted ±2°, overlapping on ≥1024 px, pixel-font title bars, pixelarticons icons, and six flat accents (`docs/standards/design-brief.md`).
- Replace the typing hero with a pile of windows: `about.txt`, a sticky note, `1mil.exe` (tracker), and `spotlight.exe`, plus desktop icons.
- Add `road_to_1M.map`: highlighted milestones on a winding S-curve road. The □ control maximizes it into a dialog showing every milestone, oldest first, with summaries.
- Reshape the existing sections as windows: projects (`C:\projects`), skills (`skills.cpl`), contact (`mail.app` + `links.lnk`), the menu bar, the status bar, and the terminal (`terminal.exe`).
- Content: add milestones for UMak (Aug 2023), Infotechnolympics (Oct 2025), IT Skills Olympics (Nov 2025), and four hackathons joined (Mar–May 2026). Move eGovPH to Jul 2026. Rebalance points to the level × result table, for a total of 195,000.

## Board Parity Pass (2026-10-09)

Rolan compared the build with the reference board and asked for the same layout. The changes:
- Compact pixel menu bar (`chip` / `chip-ai` button variants).
- Tighter hero overlap, with desktop icons in a column.
- Home order: road, then skills beside "In the news", then projects and contact.
- The Home half of Plan 02 ticket 08 is pulled in: a `featured` milestone (at most one; tested) shown as `in_the_news.html` with the three most recent other milestones. The eGovPH milestone is featured.

## Feedback Pass 2 (2026-10-09)

Rolan asked for media placeholders, a blog section, the contact windows merged, visible GitHub activity, and a projects carousel with a hackathon filter. Home now fetches public GitHub events at build time and revalidates hourly (no token; the window hides on failure). The carousel covers the browse-and-filter part of Plan 02 ticket 03 on Home; `/work` and its timeline are still that ticket's.

## Feedback Pass 3 (2026-10-09)

- The visit counter needs a store. It uses the planned Upstash Redis (tech stack: rate limit) through its REST API, with no new dependency. Env: `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` (see `apps/web/.env.example`). Only a single counter is stored: no IPs, no cookies. A session flag keeps reloads from counting.
- "Last updated" is the latest commit date, captured in `next.config.ts` at build.
- The contribution calendar is read from the public `github.com/users/<user>/contributions` page; there is no API token.
- Agora, Developer Camp Manila, Devkada, and Zero Vector Venture are published with `placement: Participant`.

## Feedback Passes 4–6 (2026-10-09)

- Pass 4: coin logo, visitor placeholder, menu bar above windows, Home order (experience + tech stack, then projects), Experience and Blog nav links, retro scrollbars.
- Pass 5: shared `WindowDialog` maximize for road, experience (milestone `details`), and projects (Details popup with switching). A hackathon's `project` link merges it into the project card (eGovPH → eHanda).
- Pass 6: blog pages pulled in from Plan 03 ticket 02: `/blog` (C:\blog list, client tag filter) and `/blog/[slug]` (notepad window, MDX body). The AI chat is not built, so the terminal shows an "under construction" sign and `ask` says so. Promoted to `master` with content owed (roadmap).

## Out Of Scope

`/work`, `/hackathons`, `/1mil`, and the rest of ticket 08 (photo field and the `/1mil` list) stay in Plan 02 / Plan 03 and reuse these components. The mascot sprite waits for an owner-generated asset.
