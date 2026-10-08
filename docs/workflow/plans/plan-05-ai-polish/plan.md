# Plan 05: AI And Polish

**Status:** Outline (detailed tickets are written when Plan 04's gate passes and the owner decisions below are made)
**Owner:** apps/web, ingestion, evals
**Dependencies:** Plan 04 gate passed
**Requirements:** SF-01, SF-07, AI-01..AI-05, NFR-01, NFR-02, NFR-06

## Owner Decisions Needed First

1. Chat LLM (requirements "Open Questions"): a small/flash-tier model within the free credits.
2. Vector store: Supabase or Neon Postgres + pgvector (free tier); the owner creates it.
3. OpenAI API key for `text-embedding-3-small` (ADR 0002).

## Ticket Outline

| # | Ticket | Blocked by |
| --- | --- | --- |
| 01 | Ingestion: pure chunker (~500 tokens, url + title per chunk, tested), embed + upsert script, `pnpm ingest` on deploy; skipped locally without env | owner decisions |
| 02 | Retrieval + streaming: replace Plan 04's stub with embed, top-k, `fenceContext`, Vercel AI SDK stream, source list; spend recorded per call | 01 |
| 03 | Chat UI: floating button on every page, panel with suggested-question chips and source chips, Home teaser, terminal `ask` uses the same route | 02 |
| 04 | `/ask` page (SF-07): sticky header, gold "View full site" button, `home` command | 03 |
| 05 | Evals + CI: 20 fixed questions with expected sources in `evals/` (Claude drafts from content, owner approves), runner, GitHub Actions (typecheck, lint, test, build, eval, link check) | 02 |
| 06 | Performance + accessibility pass: Lighthouse 90+ mobile, AVIF/WebP, gif to MP4/WebM, home JS under 150 KB, motion and dark-mode check | Plan 03 |
| 07 | Device pass + 30-second test (iOS Safari, Android Chrome; 2 friends + 1 recruiter); review tier and owner | 03..06 |
