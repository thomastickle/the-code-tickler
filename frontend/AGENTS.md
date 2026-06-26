
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

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
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
- Pull requests target `main`; pushes to `main` validate and deploy the production build.
- Keep the build output directory as `dist/the-code-tickler/browser` unless `angular.json` output changes and the workflow is updated in the same change.
- Preserve `public/_redirects`; it provides the SPA fallback required for client-side Angular routes on Cloudflare Pages.
