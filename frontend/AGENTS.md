You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## Project Stack

- Angular 21 standalone components.
- PrimeNG 21 for interactive controls and repeated UI surfaces.
- PrimeUIX Aura theming configured through `providePrimeNG`.
- Tailwind CSS v4 with `tailwindcss-primeui` for Prime token-backed utilities.
- PrimeIcons for iconography.

## PrimeNG And Tailwind Rules

- Prefer PrimeNG components for interactive controls, navigation/chrome primitives, cards, tags, segmented choices, and repeated content surfaces.
- Prefer standalone PrimeNG exports such as `Button`, `ButtonDirective`, `Card`, `Tag`, `Toolbar`, and `SelectButton` over NgModule imports when available.
- Use Tailwind for page layout, spacing, typography, responsive grids, and token-backed color utilities.
- Use Prime token-backed Tailwind utilities such as `primary-*` and `surface-*` before adding new custom color variables.
- Keep custom CSS for brand/effect work: hero image positioning, floating code cards, background washes, pseudo-elements, and small adapters for PrimeNG-generated DOM.
- PrimeNG theme configuration belongs in `providePrimeNG`; do not add a parallel component theme system.
- Dark mode is class-driven through `.app-dark` and `.app-light`.

## Agent Workflow

- For Codex CLI, use the root `.codex/config.toml` MCP setup. The VS Code MCP file is not the CLI source of truth.
- If Angular or PrimeNG MCP tools are unavailable, inspect installed packages and official docs instead of guessing.
- Run `npm run build:production` and `npm run test:ci` after UI-impacting changes.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Use Angular's default standalone component model; do not introduce NgModules for app code unless a library integration requires one.
- Do not set `standalone: true` inside Angular decorators. It is already the default in Angular 19+. Use `standalone: false` only for rare NgModule compatibility cases.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- New UI should avoid known axe violations and be written so axe-based checks can pass when accessibility tooling is added.
- Follow WCAG AA fundamentals: keyboard access, visible focus, sufficient color contrast, accessible labels/names, semantic structure, and valid ARIA.

### Components

- Keep components small and focused on a single responsibility
- Prefer `input()` and `output()` functions for new components; use decorators when needed for compatibility or clearer integration.
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Use separate `.html`, `.ts`, and `.css` files for components to keep structure, behavior, and styling easy to scan.
- Prefer Reactive forms instead of Template-driven ones
- Prefer native `[class]` and `[style]` bindings over `ngClass` and `ngStyle`; use `ngClass` or `ngStyle` only when they clearly improve readability for complex bindings.
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

## Deployment

- Cloudflare Pages deployment is frontend-only and is driven by the root `.github/workflows/ci-cd.yml` workflow.
- Pull requests normally target `development`; pushes to `development` validate and deploy a Cloudflare Pages preview.
- Pushes to `main` validate and deploy the production Cloudflare Pages build.
- Keep the build output directory as `dist/the-code-tickler/browser` unless `angular.json` output changes and the workflow is updated in the same change.
- Preserve `public/_redirects`; it provides the SPA fallback required for client-side Angular routes on Cloudflare Pages.
