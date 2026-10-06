# ADR 0003: Site Chat Is Same-Origin; Agent Protocols Live In A Separate, Authenticated Showcase

**Status:** Accepted (2026-10-07)

## Context

Rolan wants a terminal-style chat like charles.dev and wants to learn A2A and MCP. charles.dev's chat calls a separate A2A service that publishes `/.well-known/agent.json` with `"security": []` and ships its API key in public JavaScript, so any agent on the internet can discover it and spend its LLM credits; it also stores visitor transcripts by IP. An A2A agent runs the owner's LLM on every call, while a read-only MCP server that returns public content runs no LLM on the owner's side. As of 2026 both protocols are active Linux Foundation (Agentic AI Foundation) standards and are complementary (MCP: agent → tools/data; A2A: agent → agent).

## Decision

- The site chat (Ask my AI and the terminal `ask` command) is reachable only from 1mil.dev pages through same-origin Next.js routes: no agent card, no `llms.txt` advertising it, no API key in client code, no tools tied to personal accounts, per-visitor rate limit, daily spend cap that disables the chat, message size limits, and no stored IPs or raw transcripts.
- A2A and MCP are learned through a separate showcase project with its own plan: first a read-only, rate-limited MCP server over public site content; then an A2A agent whose agent card requires an API key issued manually with a small per-key quota.
- A dedicated chat security plan is Plan 04 and precedes the AI chat in Plan 05.

## Consequences

- No visitor or agent can reach the site's LLM except through the site UI and its limits.
- Agent-protocol work never shares keys, quotas, or routes with the site chat.
- Exposing the site chat to agents later requires superseding this ADR.
