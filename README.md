# The Code Tickler

The Code Tickler is a personal portfolio site for practical software engineering work: project notes, writing, and examples of how real systems are clarified, modernized, and made easier to operate.

The site is intentionally small and static. It is meant to be fast to load, simple to deploy, and easy to evolve as the portfolio gains real case studies and articles.

## What This Project Is For

- Present The Code Tickler brand and portfolio in a polished, maintainable web app.
- Provide a place for projects, technical writing, and contact links without requiring a backend.
- Keep the frontend architecture straightforward enough that content and design can evolve quickly.
- Exercise a modern Angular stack with PrimeNG, Tailwind CSS, and Cloudflare Pages deployment.

## Stack

- Angular 21
- PrimeNG and PrimeIcons
- PrimeUIX Aura theming
- Tailwind CSS
- GitHub Actions CI/CD
- Cloudflare Pages static hosting

The frontend lives in `frontend/`. The production build emits static browser assets to `frontend/dist/the-code-tickler/browser`.

## Development

Run commands from the `frontend/` directory:

```bash
npm ci
npm start
```

Useful verification commands:

```bash
npm run test:ci
npm run build:production
```

## Deployment

The `CI/CD` GitHub Actions workflow validates pull requests to `main` and `development`.

Pushes to `main` deploy the production build to Cloudflare Pages using the `Cloudflare` GitHub Environment. Pushes to `development` deploy a Cloudflare Pages preview because `development` is not the production branch. The Cloudflare Pages project should use `main` as its production branch.
