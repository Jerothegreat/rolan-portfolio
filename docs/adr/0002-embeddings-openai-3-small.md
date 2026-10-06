# ADR 0002: Embeddings With OpenAI text-embedding-3-small

**Status:** Accepted (2026-10-07); revisit after the Taglish retrieval benchmark.

## Context

The site chat embeds all site content plus the resume. Prices as of July 2026: OpenAI `text-embedding-3-small` $0.02 per 1M tokens; Gemini Embedding 001 $0.15; Gemini Embedding 2 $0.20. The whole site is far under 1M tokens, so indexing costs about 2 cents. Open-source models (bge-m3, multilingual-e5) cost $0 per token but add hosting and cold starts.

## Decision

Use OpenAI `text-embedding-3-small`. Switch to an open-source model only if it retrieves Taglish better on the project's own 20-question test.

## Consequences

- Embedding cost is negligible; the chat LLM is the real cost driver and is controlled by a small/flash-tier model plus a daily spend cap.
- Vector dimension follows the chosen model; changing models requires a full re-index.
