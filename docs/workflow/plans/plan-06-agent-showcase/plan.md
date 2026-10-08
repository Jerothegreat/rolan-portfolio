# Plan 06: Agent Protocol Showcase

**Status:** Outline (after v1 ships; governed by ADR 0003)
**Owner:** separate app (not the site chat)
**Requirements:** none in v1 (learning showcase)

## Ticket Outline

| # | Ticket | Blocked by |
| --- | --- | --- |
| 01 | Read-only MCP server over public site content (tools: list projects, get project, list posts, get post), no LLM, own rate limit, separate deploy | v1 shipped |
| 02 | A2A agent: agent card requires an API key; keys issued manually with small per-key quotas; its own LLM budget, never shared with the site chat | 01 |
| 03 | Project page for the showcase as a content MDX file (owner write-up) | 01 |
