# Plan 03: Voice

**Status:** Planned (tickets ready; starts after Plan 02 merges)
**Owner:** apps/web, content
**Dependencies:** Plan 02 merged to `test` (nav, highlights, skills registry, toolbox)
**Requirements:** PG-05, PG-06, PG-07 (counter, why 1mil), SF-02, NFR-03, PG-01 (latest 3 posts)

## Problem Statement

The site proves the work but has no voice: no blog, no About page, and the 1mil tracker that frames the whole site does not exist yet. Search engines and link previews get no titles, images, sitemap, or feed.

## Solution

Add the blog (list, post, RSS), the About page, and the 1mil counter (small in the hero, full on `/1mil`). Add per-page metadata, generated Open Graph images, a sitemap, robots, and Person schema. Every surface reads from `content/`; missing owner content stays hidden.

## Implementation Decisions

- **Points ledger (SF-02).** Plan 02a already ships the milestone total, the hero `1mil.exe`, and the road (`site.road` in `lib/road.ts`); this plan adds post points to that total and builds `/1mil` on the road component. Total = sum of points of non-draft milestones + 1,000 per published (non-draft) post. Posts need no milestone file. Competitions do not add points directly; a competition earns points through its own milestone file (avoids double counting eGovPH). The content model exposes `totalPoints` and `trackerMarks` (fixed marks 100,000 / 250,000 / 500,000 / 1,000,000 with `reached` booleans).
- **Tracker UI.** Hero: small mono counter + thin rounded bar, links to `/1mil`. `/1mil`: big counter, bar with marks, "why 1mil" (3 sentences from `content/1mil.mdx`, hidden if the file is missing), then the highlight list from Plan 02. Count-up animation only under `motion-safe`.
- **Posts (CM-03, PG-05).** `date` becomes `YYYY-MM-DD`. Reading time = ceil(words / 200) min. `/blog` lists non-draft posts newest first with `?tag=til|thoughts` plain-link filters. `/blog/[slug]`: 68ch column, date + tag, MDX body, related project card (first `related` slug; unknown slug fails the build), previous/next links. Home shows the latest 3 posts, hidden when there are none.
- **SEO (NFR-03).** Titles and descriptions from `site-config.ts` and content. `app/sitemap.ts`, `app/robots.ts` (unlisted and draft excluded; unlisted pages `noindex`), RSS at `/rss.xml` from a pure, tested builder, Person JSON-LD in the root layout. OG images via `next/og` `opengraph-image.tsx` for posts, case studies, and a default.
- **About (PG-06).** `content/about.mdx` holds story and `nowLearning[]`. The story may only restate `content/aboutme.md`. Page: story, photo (`public/profileimg.jpg`), now-learning box, skills + toolbox (reused components), timeline (school, internships, wins from milestones), resume download (`/resume.pdf`).
- **Nav.** Home, Work, Hackathons, Blog, About, Contact.

## Testing Decisions

- Content model (literal values): `totalPoints` with drafts excluded and posts counted; `trackerMarks`; posts newest first, tag filter, reading time, prev/next at both ends, unknown `related` slug throws.
- RSS builder: escapes `&`/`<`, includes only non-draft posts, newest first.
- Browser pass covers `/blog`, a post, `/about`, `/1mil`, hero counter, and OG image routes.

## Out Of Scope

Writing posts, the why-1mil text, or the About story beyond `aboutme.md` (owner content); comments, newsletter.
