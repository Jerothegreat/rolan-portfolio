# Technology Stack And Development

**Source:** TRD section of "1mil.dev — PRD, TRD and design brief" (2026-10-07). Requirement IDs refer to `docs/product/requirements-engineering.md`.

## Stack

Everything runs on free tiers. Swap a piece only through an ADR.

| Layer | Pick | Why | Alternative |
| --- | --- | --- | --- |
| Framework | Next.js (App Router) + TypeScript in `apps/web` | static pages + API routes in one repo; recruiters recognize it | Astro |
| Styling | Tailwind CSS + CSS variables for tokens | fast; theme tokens for light/dark | CSS modules |
| UI kit | hand-built components, borrowing from RetroUI / neobrutalism.dev; pixelarticons icons | retro-OS neobrutal look (ADR 0004) | shadcn/ui restyled |
| Content | MDX in `content/{projects,competitions,posts,milestones}` + Velite (schema-checked, typed collections; chosen over next-mdx-remote in Plan 01 because it validates and types content out of the box) | no CMS; git = history | Notion or Sanity later |
| Tests | Vitest for content rules and the terminal interpreter | fast, TypeScript-native, no browser needed | Playwright later if UI flows need it |
| Motion | CSS transitions + Motion (Framer Motion) for a few pieces | small; respects reduced motion | CSS only |
| AI chat | Vercel AI SDK, streaming; LLM API of choice | streaming UI + tool calls built in | LangChain JS |
| Vector store | Postgres + pgvector (Supabase or Neon free tier) | same skill as Alunsina | Upstash Vector |
| Rate limit | Upstash Redis | stop chat abuse and cost spikes | in-memory per IP |
| Hosting | Vercel (site + demos) | free; preview deploys; domains | Cloudflare Pages |
| DNS | Cloudflare or registrar; subdomain per demo | `alunsina.1mil.dev`, `petbot.1mil.dev` | path-based `/demo/…` |
| Analytics | Umami, Plausible, or Vercel Analytics | privacy-friendly; no cookie banner | none |

There is no separate backend service (`docs/adr/0001-nextjs-only-no-separate-api.md`). Embeddings use OpenAI `text-embedding-3-small` (`docs/adr/0002-embeddings-openai-3-small.md`).

## Repository Layout

```text
apps/web/        Next.js site + API routes (chat)
content/         MDX content: projects, hackathons, posts, milestones
ingestion/       build-step chunk → embed → upsert (AI-01)
evals/           fixed 20-question chat eval set + runner (AI-05)
docs/            requirements, ADRs, standards, workflow
```

## Content Pipeline

1. Authors add one MDX file with front matter matching the content model (CM-01..CM-05).
2. The build validates front matter with a schema and fails on invalid files.
3. Pages, cards, the 1mil tracker, skills links (`usedIn` computed), RSS, and sitemap derive from the same files.
4. On deploy, `ingestion/` re-chunks and re-embeds content so new files become answerable by the chat with no manual step.

## AI Chat Flow

```text
build:   MDX + resume → ~500-token chunks → embed → pgvector (url, title)
request: rate-limit → embed question → top-k retrieve → prompt with sources
reply:   stream answer + source chips; refuse off-topic / personal data
guard:   scoped system prompt, max tokens, daily spend cap, anonymized logs
gate:    20-question eval before each deploy
```

The real cost driver is the chat LLM, not embeddings: use a small/flash-tier model plus the daily spend cap.

## Demos On Subdomains

- Each demo is its own repo and Vercel project, mapped to `<name>.1mil.dev`.
- The shared `by 1mil.dev ↗` badge is copied (or a tiny package) and links to `1mil.dev/work/<slug>`.
- Same favicon, accent color, and font.
- Each demo shows a short notice for free-tier cold starts or sample data.

## Development Commands

```text
pnpm install          # once, at the root
pnpm dev              # Next.js dev server (apps/web)
pnpm typecheck        # tsc --noEmit
pnpm lint             # eslint
pnpm build            # production build
pnpm test             # vitest (content model, terminal)
pnpm check:workspace  # typecheck + lint + test + build
```

CI (Plan 05) adds the chat eval and link check (NFR-06).
