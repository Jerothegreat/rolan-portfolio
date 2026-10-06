# 1mil.dev Roadmap

**Status:** Active master roadmap
**Canonical requirements:** `docs/product/requirements-engineering.md`

**Active plan:** [Plan 00 workflow + monorepo](plans/plan-00-workflow-monorepo/plan.md) (awaiting independent review). **Next:** [Plan 01 foundation](plans/plan-01-foundation/plan.md) (spec final; next step `to-tickets`).

## Goal

Ship 1mil.dev v1 (PG-01..PG-07, SF-01..SF-04, SF-06, SF-07, CM-01..CM-05, AI-01..AI-05, NFR-01..NFR-06). Each plan ends with something live, so the site is never half-broken.

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
**Requirements supported:** PG-01 (hero, Spotlight, recent projects, contact), SF-03, SF-04, CM-01..CM-04, NFR-02, NFR-04
**Outcome:** One-go rebuild on the soft-neobrutal design system; Velite content with drafts, unlisted projects, and competitions; Home with Alunsina as Spotlight; browser-only terminal; Vitest content and terminal tests.

### Plan 02: Proof

**Requirements supported:** PG-02 (with timeline view), PG-03, PG-04, PG-01 (skills, toolbox, competition strip, win badge), CM-05, SF-06, NFR-05
**Outcome:** `/work` with filters and timeline; case-study pages for listed projects (Alunsina with showcase video and evals, linking to its team-owned product site); demos on subdomains with the `by 1mil.dev` badge; Hackathons & contests page with the Infotechnolympics 2025 champion badge on Home; skills + AI toolbox linked to projects.

### Plan 03: Voice

**Requirements supported:** PG-05, PG-06, PG-07, SF-02, NFR-03
**Outcome:** Blog with til/thoughts, RSS, OG images; first 3 posts (a hackathon recap, a RAG til, why 1mil); About page with timeline and now-learning box; 1mil tracker + `/1mil`.

### Plan 04: Chat Security

**Requirements supported:** AI-04, NFR-05
**Outcome:** The hardening layer from `docs/adr/0003-site-chat-same-origin-agent-protocols-separate.md` exists and is tested before any LLM is reachable: same-origin chat route skeleton, per-visitor rate limit, daily spend cap kill switch, message size limits, prompt-injection defenses, anonymized abuse/cost counters, no stored IPs or transcripts.

### Plan 05: AI And Polish

**Requirements supported:** SF-01, SF-07, AI-01..AI-05, NFR-01, NFR-02, NFR-06
**Outcome:** Ask my AI in the terminal and the `/ask` recruiter page (ingest, retrieve, stream, source chips); 20-question chat eval in CI; motion pass with reduced motion; dark mode check; Lighthouse 90+; mobile test on iOS Safari + Android Chrome; link check; the 30-second test with 2 friends + 1 recruiter.

### Plan 06: Agent Protocol Showcase

**Requirements supported:** none in v1 (learning showcase, governed by ADR 0003)
**Outcome:** A read-only, rate-limited MCP server over public site content, then a key-gated A2A agent (manually issued keys, small quotas), with its own project page.

## Deferred

- SF-05 command palette (after v1).
- New showcase projects (including a public policy-bot-style assistant) are added as content when built; the two unlisted placeholders track them.
- Out-of-scope list in the requirements doc stays out of v1.
