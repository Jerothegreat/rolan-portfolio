# Requirements Map

Current requirement-to-implementation status. Update a row only after the owning plan's evidence passes. Statuses follow `docs/workflow/README.md`.

| ID | Requirement | Owning plan | Status | Evidence |
| --- | --- | --- | --- | --- |
| PG-01 | Home | 01, 02, 03 | Partial | Plan 01 slice (hero, Spotlight, recent projects, contact) verified: plan-01 evidence FD-02..FD-10. Skills, competition strip, toolbox, posts pending. |
| PG-02 | Work + timeline | 02 | Planned | |
| PG-03 | Project page | 02 | Planned | |
| PG-04 | Hackathons & contests | 02 | Planned | |
| PG-05 | Blog | 03 | Planned | |
| PG-06 | About | 03 | Planned | |
| PG-07 | 1mil page | 02 (list), 03 (counter) | Planned | |
| SF-01 | Ask my AI | 05 | Planned | |
| SF-02 | 1mil tracker | 03 | Planned | |
| SF-03 | Terminal easter egg | 01, 05 | Partial | Browser-only commands verified (plan-01 FD-08, FD-09, FD-10); AI chat inside it is Plan 05. |
| SF-04 | Dark mode | 01 | Ready for independent review | plan-01 FD-04, FD-10. |
| SF-05 | Command palette | — | Deferred | |
| SF-06 | Demo subdomains | — | Deferred | Until a demo Rolan controls exists (Plan 02 decision). |
| SF-07 | Ask page `/ask` | 05 | Planned | |
| CM-01 | Project schema | 01 | Ready for independent review | plan-01 FD-02, FD-05. |
| CM-02 | Competition schema | 01, 02 | Partial | Base schema plan-01 FD-06; result and year-only dates in Plan 02. |
| CM-03 | Post schema | 01 | Ready for independent review | plan-01 FD-06 (schema only; no posts). |
| CM-04 | Milestone schema | 01, 02 | Partial | Base schema plan-01 FD-06; highlight fields (photo, summary, featured) in Plan 02. |
| CM-05 | Skill / Tool | 02 | Planned | |
| AI-01 | Ingestion build step | 05 | Planned | |
| AI-02 | Retrieval request | 05 | Planned | |
| AI-03 | Streamed answer + refusals | 05 | Planned | |
| AI-04 | Guardrails + same-origin exposure | 04, 05 | Planned | |
| AI-05 | Chat eval | 05 | Planned | |
| NFR-01 | Performance | 05 | Planned | |
| NFR-02 | Accessibility | 01, 05 | Partial | Plan 01 keyboard, focus-ring, reduced-motion, and no-JS checks pass (FD-10); full WCAG audit in Plan 05. |
| NFR-03 | SEO | 03 | Planned | |
| NFR-04 | Responsive | 01 | Ready for independent review | 375/1024/1280 px light and dark, no horizontal scroll (FD-10). |
| NFR-05 | Privacy | 02, 04 | Planned | |
| NFR-06 | Maintenance / CI | 00, 05 | Partial | Plan 00 adds `pnpm check:workspace`; CI, eval, and link check pending. |
