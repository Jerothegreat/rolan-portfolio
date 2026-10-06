# ADR 0001: Next.js Only, No Separate API Service

**Status:** Accepted (2026-10-07)

## Context

The earlier portfolio chatbot design (`docs/workflow/archive/portfolio_ai_assistant_architecture.md`) planned a separate NestJS backend, and an uncommitted NestJS scaffold existed in `backend/`. The 1mil.dev TRD puts the chat in Next.js API routes using the Vercel AI SDK, with Postgres + pgvector and Upstash rate limiting, all on Vercel's free tier.

## Decision

The site and the chat ship from one Next.js app in `apps/web`. There is no separate API service. The NestJS scaffold (no commits) is not part of the monorepo.

## Consequences

- One deploy target, one runtime, one set of environment variables.
- Chat routes must stay small and server-only; heavy work (chunking, embedding) runs in the build-step `ingestion/` pipeline, not per request.
- If the chat outgrows serverless limits, a new ADR must justify a separate service.
