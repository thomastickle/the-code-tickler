# Frontend Project Direction

The Code Tickler is currently a static Angular portfolio frontend intended to be polished enough to share publicly. The near-term goal is a small, fast site that presents the brand, active independent work, writing, and contact paths without requiring a backend.

## Current Frontend

- Angular owns routing, page composition, and project data display.
- PrimeNG provides cards, buttons, tags, and other repeated UI surfaces.
- Tailwind CSS handles layout, spacing, responsive behavior, and token-backed utility styling.
- Cloudflare Pages hosts the production static build from `frontend/dist/the-code-tickler/browser`.
- Project metadata lives in frontend source for now, including section placement, summaries, links, and display tags.

## Project Metadata

Project tags are curated display metadata, not generated dependency or language statistics. This keeps the public site readable and avoids exposing noisy implementation details as portfolio labels.

For the current site project, the public tags are:

- Angular
- PrimeNG
- Tailwind CSS
- Cloudflare Pages

Future projects should keep tags short, recognizable, and useful to a reader scanning the portfolio. A project can use dependency-heavy tooling internally without listing every package on the card.

## Future Backend Ideas

A backend is not required for the current shareable frontend. It becomes useful when the site needs live or private data flows, such as:

- Syncing project metadata from GitHub repositories.
- Generating GitHub-style language or technology stats.
- Managing writing drafts, publishing workflows, or richer project case studies.
- Protecting API tokens and avoiding browser-side rate-limit or CORS problems.
- Supporting contact workflows beyond external profile links.

Automated project tags can still be generated without a runtime backend if the work happens during local development or CI. A future build-time script could inspect repository files and package metadata, write static project metadata, and let curated labels override noisy generated output.

If the site needs live GitHub-style repository stats after deployment, use a backend or Cloudflare Worker rather than calling GitHub directly from the browser.
