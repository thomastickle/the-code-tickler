# The Code Tickler Frontend

Angular 21 portfolio frontend for The Code Tickler. The app is a static browser build and is deployable to Cloudflare Pages.

## Local Development

Install dependencies from the frontend directory:

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

Create the production bundle:

```bash
npm run build
```

Angular writes Cloudflare-ready browser assets to:

```text
dist/the-code-tickler/browser
```

The SPA fallback for client-side routes is copied from `public/_redirects`.

## Cloudflare Pages Deployment

Deployment is handled by the root GitHub Actions workflow at `.github/workflows/cloudflare-pages.yml`.

Repository settings required by the workflow:

```text
CLOUDFLARE_API_TOKEN      GitHub secret with Cloudflare Pages edit/deploy access
CLOUDFLARE_ACCOUNT_ID     GitHub secret for the target Cloudflare account
CLOUDFLARE_PROJECT_NAME   Optional GitHub variable; defaults to the-code-tickler
```

The workflow:

- Uses Node from `.node-version`.
- Restores npm cache from `package-lock.json`.
- Caches Angular build artifacts from `.angular/cache`.
- Runs `npm ci`, unit tests, and production build.
- Deploys `dist/the-code-tickler/browser` on branch pushes and manual dispatches.
- Validates pull requests without deploying.

Set the Cloudflare Pages production branch to `master`.
