# The Code Tickler Frontend Agent Notes

This directory contains the Angular frontend for The Code Tickler portfolio site. Work here should be deliberate, accessible, and consistent with the existing Angular 21, PrimeNG 21, PrimeUIX Aura, Tailwind CSS v4, and Cloudflare Pages setup.

## Current Redesign State

- The site is intentionally in a reset state.
- `src/app/app.html` currently renders only `<app-menubar />`; the routed `<main>` is commented out.
- Do not re-enable routes, rebuild page sections, restore old hero layouts, or create new landing content unless the user explicitly asks.
- The active design target is `src/app/components/menubar`. Treat the menubar as the first component to get right before broader site work continues.
- Keep changes narrow. If the user gives detailed design guidance, implement that guidance directly instead of reviving prior redesign assumptions.

## Stack And Source Of Truth

- Angular 21 application configured in `angular.json`.
- Standalone component model is the default; do not add NgModules for app code unless a library integration truly requires one.
- PrimeNG 21 provides interactive controls, navigation/chrome primitives, cards, tags, drawers, and repeated UI surfaces.
- PrimeUIX Aura theming is configured through `providePrimeNG` in `src/app/app.config.ts`.
- Tailwind CSS v4 and `tailwindcss-primeui` are loaded from `src/styles.css`.
- PrimeIcons is the icon set.
- Codex CLI MCP configuration lives at the repository root in `.codex/config.toml`.
- If Angular or PrimeNG MCP tools are unavailable, inspect installed packages and official docs instead of guessing.

## Angular And TypeScript Rules

- Use strict TypeScript. Avoid `any`; use `unknown` when a type is genuinely uncertain.
- Prefer inference when the type is obvious.
- Use signals for local component state and `computed()` for derived state.
- Update signals with `set` or `update`; do not use `mutate`.
- Use `inject()` instead of constructor injection for services and framework dependencies.
- Set `changeDetection: ChangeDetectionStrategy.OnPush` on components.
- Do not set `standalone: true`; it is already the Angular default. Use `standalone: false` only for rare compatibility cases.
- Do not use `@HostBinding` or `@HostListener`; put host bindings in the component or directive `host` object.
- Prefer `input()` and `output()` for new component APIs unless decorators make an integration clearer.
- Keep components focused, with separate `.ts`, `.html`, and `.css` files.
- Use paths relative to the component TypeScript file for external templates and styles.

## Template And UI Rules

- Use native Angular control flow: `@if`, `@for`, and `@switch`.
- Prefer native `[class]` and `[style]` bindings. Use `ngClass` or `ngStyle` only when complex bindings become clearer.
- Do not assume browser globals such as `new Date()` are available in templates.
- Use the async pipe for observables used in templates.
- Prefer PrimeNG components and directives for interactive UI.
- Prefer standalone PrimeNG exports such as `Button`, `ButtonDirective`, `Card`, `Tag`, `Toolbar`, and `SelectButton` when available.
- Use Tailwind for layout, spacing, typography, responsive grids, and token-backed color utilities.
- Use Prime token-backed Tailwind utilities such as `primary-*` and `surface-*` before adding custom color variables.
- Keep custom CSS focused on brand styling, layout details, PrimeNG generated-DOM adapters, and effects that cannot be expressed cleanly with utilities.
- Do not add a parallel theme system. Theme configuration belongs in `providePrimeNG`.
- Dark and light mode are class-driven through `.app-dark` and `.app-light`.

## Menubar Rules

- Treat `docs/frontend/design/menubar.md` as the source of truth for menubar design decisions.
- Preserve the established menubar layout: brandmark and "The Code Tickler" home link on the left, empty center, Projects/Writing/About/Contact links on desktop, mobile drawer collapse on narrow screens, and the theme toggle at the far right.
- The theme toggle uses PrimeNG `ToggleSwitch`; dark mode is left/off and light mode is right/on.
- Style the toggle with PrimeNG token variables so handle alignment and horizontal travel remain correct.
- Keep the toggle background tied to the site's purple Prime tokens, with cyan only as a secondary glow/accent.
- Preserve theme persistence through the `the-code-tickler-theme` localStorage key.

## Accessibility And Assets

- New UI should be keyboard-accessible and written so axe-based checks can pass when accessibility tooling is added.
- Follow WCAG AA basics: visible focus, sufficient contrast, accessible names, semantic structure, and valid ARIA.
- Use icon-only buttons only when they have clear accessible labels.
- Preserve responsive behavior down to a 320px viewport.
- Use `NgOptimizedImage` for static Angular-managed images when practical.
- Do not use `NgOptimizedImage` for inline base64 images.

## Verification

- Run commands from this `frontend/` directory.
- For UI-impacting changes, run:
  - `npm run format:check`
  - `npm run lint`
  - `npm run test:ci`
  - `npm run build:production`
- For quick local development, `npm start` serves the app at `http://localhost:4200/`.
- Instruction-only edits do not require frontend verification.

## Deployment Constraints

- Deployment is frontend-only and driven by the root `.github/workflows/ci-cd.yml` workflow.
- Pull requests to `main` and `development` are validated by CI.
- Pushes to `development` deploy a Cloudflare Pages preview.
- Pushes to `main` deploy the production Cloudflare Pages build.
- Keep the production output path as `dist/the-code-tickler/browser` unless `angular.json` and CI/CD are updated together.
- Preserve `public/_redirects`; it provides the SPA fallback for client-side Angular routes on Cloudflare Pages.
