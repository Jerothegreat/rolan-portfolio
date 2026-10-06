# 1mil.dev Roadmap

**Status:** Active master roadmap
**Canonical requirements:** `docs/product/requirements-engineering.md`

**Active plan:** [Plan 00 workflow + monorepo](plans/plan-00-workflow-monorepo/plan.md). **Next:** [Plan 01 foundation](plans/plan-01-foundation/plan.md).

## Goal

Ship 1mil.dev v1 (PG-01..PG-07, SF-01..SF-04, SF-06, CM-01..CM-05, AI-01..AI-05, NFR-01..NFR-06) in four product phases. Each phase ends with something live, so the site is never half-broken.

## Execution Protocol

Use `docs/agents/skill-policy.md` for skill routing, model routing, and completion gates.

1. Execute one plan at a time.
2. Name the exact requirement IDs in every task and change set.
3. Start behavior changes with a failing test where an automated harness exists.
4. Preserve unrelated dirty changes.
5. Do not mark a requirement implemented from placeholder UI, hard-coded content, or an untested happy path.
6. Update `traceability/requirements-map.md` only after the relevant evidence passes.
7. Commit and push only when the user explicitly authorizes those git operations.
8. A plan packet beyond the next one is written only after its dependencies pass their gate; internal steps may adapt to the verified code at that gate.

## Plan Sequence

### Plan 00: Workflow And Monorepo Shell

**Detailed plan:** `plans/plan-00-workflow-monorepo/plan.md`
**Requirements supported:** NFR-06 (repository groundwork); no product requirement.
**Outcome:** One pnpm monorepo (`apps/web`, `content/`, `ingestion/`, `evals/`) with the spec-driven agent workflow, canonical requirements, ADRs, and standards.

### Plan 01: Foundation

**Detailed plan:** `plans/plan-01-foundation/plan.md`
**Requirements supported:** PG-01 (hero, featured projects, contact), SF-03, SF-04, CM-01..CM-04, NFR-02, NFR-04
**Outcome:** Design tokens in CSS variables; button, card, pill, nav, footer; content folders + schemas; Home with hero, featured projects, contact; redesigned `~` terminal.

### Plan 02: Proof

**Requirements supported:** PG-02, PG-03, PG-04, PG-01 (skills, toolbox, hackathon strip, win badge), CM-05, SF-06, NFR-05
**Outcome:** Project pages for Alunsina and the pet chatbot (role, architecture, tradeoffs, evals); demos moved to subdomains with the `by 1mil.dev` badge; Hackathons page with the Infotechnolympics 2025 champion badge on Home; skills + AI toolbox linked to projects.

### Plan 03: Voice

**Requirements supported:** PG-05, PG-06, PG-07, SF-02, NFR-03
**Outcome:** Blog with til/thoughts, RSS, OG images; first 3 posts (a hackathon recap, a RAG til, why 1mil); About page with timeline and now-learning box; 1mil tracker + `/1mil`.

### Plan 04: AI And Polish

**Requirements supported:** SF-01, AI-01..AI-05, NFR-01, NFR-02, NFR-06
**Outcome:** Ask my AI (ingest, retrieve, stream, source chips, rate limit, spend cap); 20-question chat eval in CI; motion pass with reduced motion; dark mode check; Lighthouse 90+; mobile test on iOS Safari + Android Chrome; link check; the 30-second test with 2 friends + 1 recruiter.

## Deferred

- SF-05 command palette (after v1).
- Out-of-scope list in the requirements doc stays out of v1.
