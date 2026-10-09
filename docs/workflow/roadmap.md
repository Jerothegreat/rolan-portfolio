# 1mil.dev Roadmap

**Status:** Active master roadmap
**Canonical requirements:** `docs/product/requirements-engineering.md`

**Active plan:** [Plan 02 proof](plans/plan-02-proof/plan.md): ticket 01 done, 8 tickets ready, built on the [Plan 02a](plans/plan-02a-retro-os/plan.md) retro-OS look (promoted to `master` 2026-10-09; independent review owed).
**Build loop:** [`playbook.md`](playbook.md). [Plan 01](plans/plan-01-foundation/plan.md) complete pending promotion to `master`; [Plan 00](plans/plan-00-workflow-monorepo/plan.md) complete.

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
8. Plans 03 and 04 were written ahead (owner request, 2026-10-09) so flash-tier sessions can run in parallel; tickets may adapt to the verified code at each gate. Plans 05 and 06 stay outlines until their dependencies pass.
9. Parallel flash-tier sessions each run in their own git worktree and branch (`../1mil-wt/<branch>`); the review tier merges each branch into `test`.

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

**Detailed plan:** `plans/plan-02-proof/plan.md`
**Requirements supported:** PG-01 (skills, AI toolbox, In the news), PG-02, PG-03, PG-04, PG-07 (list), CM-02, CM-04, CM-05, NFR-05
**Outcome:** Skills registry with computed "used in"; `/work` with tag filters and a dots-and-line timeline; case studies that appear once written (Alunsina with screenshots, architecture, and evals); `/hackathons` with results, year-only dates, and flip cards; highlights with a featured "In the news" card on Home and the full list on `/1mil`. SF-06 deferred.

### Plan 02a: Retro-OS Redesign

**Detailed plan:** `plans/plan-02a-retro-os/plan.md`
**Requirements supported:** PG-01 (hero tracker, look), SF-02, CM-04 (highlight, summary, stamp, education), NFR-02
**Outcome:** Promoted 2026-10-09. The site re-skinned as a retro desktop of tilted, overlapping neobrutal windows with pixel chrome (ADR 0004). The 1mil tracker appears as `1mil.exe`, and `road_to_1M.map` shows the road from UMak to 1,000,000 with a maximize view of every milestone. It runs after Plan 02 ticket 01, so the rest of Plan 02 is built on the new look.

### Plan 03: Voice

**Detailed plan:** `plans/plan-03-voice/plan.md` (6 tickets)
**Requirements supported:** PG-05, PG-06, PG-07 (counter), NFR-03 (SF-02 moved to Plan 02a)
**Outcome:** Blog with til/thoughts, RSS, OG images; first 3 posts (a hackathon recap, a RAG til, why 1mil); About page with timeline and now-learning box; 1mil tracker + `/1mil`.

### Plan 04: Chat Security

**Detailed plan:** `plans/plan-04-chat-security/plan.md` (5 tickets; needs an Upstash Redis database)
**Requirements supported:** AI-04, NFR-05
**Outcome:** The hardening layer from `docs/adr/0003-site-chat-same-origin-agent-protocols-separate.md` exists and is tested before any LLM is reachable: same-origin chat route skeleton, per-visitor rate limit, daily spend cap kill switch, message size limits, prompt-injection defenses, anonymized abuse/cost counters, no stored IPs or transcripts.

### Plan 05: AI And Polish

**Outline:** `plans/plan-05-ai-polish/plan.md` (tickets after Plan 04 gate and owner LLM / vector-store choice)
**Requirements supported:** SF-01, SF-07, AI-01..AI-05, NFR-01, NFR-02, NFR-06
**Outcome:** Ask my AI in the terminal and the `/ask` recruiter page (ingest, retrieve, stream, source chips); 20-question chat eval in CI; motion pass with reduced motion; dark mode check; Lighthouse 90+; mobile test on iOS Safari + Android Chrome; link check; the 30-second test with 2 friends + 1 recruiter.

### Plan 06: Agent Protocol Showcase

**Outline:** `plans/plan-06-agent-showcase/plan.md`
**Requirements supported:** none in v1 (learning showcase, governed by ADR 0003)
**Outcome:** A read-only, rate-limited MCP server over public site content, then a key-gated A2A agent (manually issued keys, small quotas), with its own project page.

## Content And Setup Owed

Setup: Vercel Root Directory `apps/web`; Upstash Redis env vars for the visitor counter (`apps/web/.env.example`).

Content hidden or shown as a labeled placeholder until supplied (never invented): Globe Telecom `details` (`content/milestones/2026-07-internship-globe-telecom.mdx`); confirm the policy bot belongs under Sofi AI; project covers and videos; hackathon photos; news photo; blog posts; "why 1mil" (3 sentences, `content/1mil.mdx`); eGovPH award photo; Alunsina screenshots and architecture image; which skills are `daily`; Problem / What I built / Lessons write-ups per project; remaining competition months, placements, and results; certification months; "Sumakses" (May 2025).

## Deferred

- SF-06 demo badge and subdomains, until a demo Rolan controls exists.

- SF-05 command palette (after v1).
- New showcase projects (including a public policy-bot-style assistant) are added as content when built; the two unlisted placeholders track them.
- Out-of-scope list in the requirements doc stays out of v1.
