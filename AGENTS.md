# The Code Tickler Agent Notes

This repository is an Angular portfolio frontend with PrimeNG, PrimeUIX themes, Tailwind CSS, and Cloudflare Pages-oriented static hosting.

## Codex CLI Setup

- The Codex CLI MCP source of truth is `.codex/config.toml`.
- The configured CLI MCP servers are `angular-cli`.
- If MCP tools are unavailable in a session, use the installed package metadata and official Angular/PrimeNG documentation as the fallback source of truth.

## Repository Rules

- Frontend work lives under `frontend/`; read `frontend/AGENTS.md` before changing Angular code.
- Leave the untracked `sample/` image directory alone unless the user explicitly asks for it.
- Run frontend verification from `frontend/` after UI-impacting changes:
  - `npm run build`
  - `npm test -- --watch=false`
