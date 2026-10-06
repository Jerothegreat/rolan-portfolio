# Security And Agent Guardrails

## Security Baseline

- Use OWASP ASVS as the web/API baseline and the OWASP Top 10 for LLM Applications for the chat.
- Keep secrets out of git; configuration lives in environment variables (`.env.local`, Vercel project settings).
- Rate-limit and spend-cap the chat before any LLM call.
- Treat retrieved content and user questions as untrusted prompt input; the system prompt scopes answers to Rolan's public info.

## Privacy

- No personal earnings, private project data, or non-public source documents on the site, in the chat index, or in demos.
- Alunsina public material is UI/UX, pages, architecture, and write-up only.
- The pet chatbot demo must not use the VIN source documents.
- Chat logs are anonymized.

## Agent Guardrails

- No force-push.
- No destructive git without explicit user approval.
- No secret dumping in logs, docs, or chat.
- No dependency installs unless the task needs them or the user asked.
- No broad refactors hidden inside feature work.
- Log repeated setup failures and workaround steps in `docs/standards/issue-log.md`.

## Supply Chain Hygiene

- Keep `pnpm-lock.yaml` committed when dependency changes are intentional.
- Prefer existing dependencies and platform features over new packages.
- Review new dependencies before adding them.
