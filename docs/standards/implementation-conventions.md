# 1mil.dev Implementation Conventions

This document holds the durable conventions for implementation work in this repository.

## Working Assumptions

- Current code and tests are the first implementation truth.
- `docs/product/requirements-engineering.md` defines intended product behavior.
- `docs/workflow/traceability/requirements-map.md` reports the gap between intended behavior and current implementation.

## Implementation Style

- Prefer the smallest correct diff.
- Keep files and packages minimal.
- Do not add speculative abstractions, dependencies, or compatibility layers without a clear need.
- Update documentation in the same task when behavior, architecture, workflow, or setup changes.

## Content Conventions

- Every project, hackathon, post, and milestone is one MDX file under `content/<type>/<slug>.mdx`.
- Front matter follows the content model (CM-01..CM-05) and is schema-validated at build time.
- Derived data (`usedIn`, tracker totals, latest posts, featured list) is computed, never stored by hand.
- Components never hard-code portfolio content.

## Web Conventions (`apps/web`)

- Next.js App Router; prefer Server Components and static generation. Use client components only for interaction (chat, terminal, toggles, motion).
- Design values come only from the CSS variables in `docs/standards/design-brief.md`, exposed to Tailwind as theme tokens.
- Respect `prefers-reduced-motion`; every motion has an off state.
- Every interactive element is keyboard reachable with a visible focus ring.
- Keep home JS under 150 KB (NFR-01); check bundle impact before adding client dependencies.

## Chat Conventions

- Chat API routes are server-only. LLM, embedding, database, and rate-limit keys never use `NEXT_PUBLIC_*`.
- Every request passes the rate limit and spend cap before calling the LLM.
- Answers cite sources; off-topic and personal-data questions are refused.
- Logs contain no personal data.
- Changing the prompt, retrieval, or model requires the chat eval to pass.

## Verification Rules

Run these after non-trivial multi-file changes and before claiming completion:

```bash
pnpm typecheck
pnpm lint
pnpm build
```

Record the observed results in the owning plan's `evidence.md`.
