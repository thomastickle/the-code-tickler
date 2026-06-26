# The Code Tickler Frontend

Angular 21 portfolio frontend for The Code Tickler. The app is a static browser build and is deployable to Cloudflare Pages.

## Stack

- Angular 21
- PrimeNG 21
- PrimeUIX Aura themes
- Tailwind CSS v4
- `tailwindcss-primeui` for Prime token-backed Tailwind utilities
- PrimeIcons

PrimeNG is configured in `src/app/app.config.ts` with `providePrimeNG`. Tailwind is loaded from `src/styles.css`.

## Local Development

Install dependencies from this `frontend/` directory:

```bash
npm ci
```

Start the development server:

```bash
npm start
```

The app runs at `http://localhost:4200/` by default.

## Build And Test

Run the unit test suite once:

```bash
npm test -- --watch=false
```

Run the CI test suite with JUnit and coverage reports:

```bash
npm run test:ci
```

Create the production bundle:

```bash
npm run build:production
```

Angular writes Cloudflare-ready browser assets to:

```text
dist/the-code-tickler/browser
```

The SPA fallback for client-side routes is copied from `public/_redirects`.

## UI Architecture

- Route pages live under `src/app/pages`.
- Shared shell components live under `src/app/components`.
- Prefer PrimeNG components for controls, chrome, cards, tags, and repeated surfaces.
- Use Tailwind utilities for layout and spacing.
- Keep custom CSS focused on brand effects and small PrimeNG generated-DOM adapters.

## Cloudflare Pages Deployment

Deployment is handled by the root GitHub Actions workflow at `.github/workflows/ci-cd.yml`.

GitHub Environment settings required by the workflow:

```text
CLOUDFLARE_API_TOKEN      Environment secret with Cloudflare Pages edit/deploy access
CLOUDFLARE_ACCOUNT_ID     Environment secret for the target Cloudflare account
CLOUDFLARE_PROJECT_NAME   Optional environment variable; defaults to the-code-tickler
```

Create these values under the repository Environment named `Cloudflare`. The project name should be the Cloudflare Pages project slug, for example `the-code-tickler`.

The workflow:

- Uses Node from `.node-version`.
- Restores npm cache from `package-lock.json`.
- Caches Angular build artifacts from `.angular/cache`.
- Runs `npm ci`, CI unit tests, and production build.
- Uploads JUnit test results, coverage reports, and the production build as GitHub Actions artifacts.
- Validates pull requests to `main` without requiring Cloudflare credentials.
- Deploys `dist/the-code-tickler/browser` from the `Cloudflare` Environment on `main` branch pushes.

Set the Cloudflare Pages production branch to `main`. Merging changes to `main` is the production release path.

## Agent Notes

Read `AGENTS.md` in this directory and the repository root before making broad UI changes.
