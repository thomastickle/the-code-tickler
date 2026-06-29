# The Code Tickler Agent Notes

This repository contains The Code Tickler portfolio frontend. It is an Angular 21 static web app built with PrimeNG, PrimeUIX Aura theming, Tailwind CSS v4, and Cloudflare Pages deployment.

## Repo Scope

- Frontend application work lives under `frontend/`.
- Read `frontend/AGENTS.md` before changing Angular, CSS, frontend tests, assets, or frontend package/config files.
- Root-level work is limited to repository documentation, CI/CD, Codex configuration, and shared project notes unless the user says otherwise.
- Leave the untracked `sample/` image directory alone unless the user explicitly asks for it.

## Current Redesign State

- The site is intentionally reset for a careful redesign.
- `frontend/src/app/app.html` currently keeps only the menubar active.
- Do not re-enable routed page content, rebuild landing sections, or restore previous page layouts unless the user explicitly asks.
- The immediate redesign focus is the menubar. Treat broader page work as out of scope until the menubar direction is nailed down.

## Codex CLI Setup

- The Codex CLI MCP source of truth is `.codex/config.toml`.
- The configured CLI MCP server is `angular-cli`.
- Do not treat editor-specific MCP files as Codex CLI configuration.
- If MCP tools are unavailable, use installed package metadata and official Angular/PrimeNG documentation instead of guessing.

## Verification

- For UI-impacting frontend changes, run verification from `frontend/`:
  - `npm run format:check`
  - `npm run lint`
  - `npm run test:ci`
  - `npm run build:production`
- Instruction-only edits, including AGENTS.md changes, do not require frontend verification.
- Preserve Cloudflare Pages deployment assumptions unless the user requests deployment work:
  - Production browser output: `frontend/dist/the-code-tickler/browser`
  - SPA fallback file: `frontend/public/_redirects`
