# The Code Tickler Frontend Agent Notes

This directory contains the Angular frontend for The Code Tickler portfolio site. Work here should be deliberate, accessible, and consistent with the existing Angular 21, PrimeNG 21, PrimeUIX Aura, Tailwind CSS v4, and Cloudflare Pages setup.

## Current Redesign State

- The site is intentionally in a reset state.
- `src/app/app.html` renders `<app-menubar />` plus the routed `<main>` again so page-by-page redesign work can continue.
- Do not restore old page sections, old hero layouts, or unrelated landing content unless the user explicitly asks.
- The finished menubar is the established site chrome. Current page work should build under it without changing its design unless requested.
- The accepted page baseline is `/contact`; treat `docs/frontend/design/contact.md` as the source of truth for that page.
- The active page design target is `/writing`; treat `../docs/frontend/design/writing.md` as the source of truth for this branch.
- For new page work, create or update a matching document in `../docs/frontend/design/` before committing the page.
- Keep changes narrow. If the user gives detailed design guidance, implement that guidance directly instead of reviving prior redesign assumptions.

## Stack And Source Of Truth

- Angular 21 application configured in `angular.json`.
- Standalone component model is the default; do not add NgModules for app code unless a library integration truly requires one.
- PrimeNG 21 provides interactive controls, navigation/chrome primitives, cards, tags, drawers, and repeated UI surfaces.
- PrimeUIX Aura theming is configured through `providePrimeNG` in `src/app/app.config.ts`.
- Tailwind CSS v4 and `tailwindcss-primeui` are loaded from `src/styles.css`.
- PrimeIcons is the icon set.
- Track PrimeNG fit problems in `../docs/frontend/primeng-fit.md`; use it to decide when PrimeNG should be avoided or removed.
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
- Use native HTML plus focused CSS for brand-critical or reference-matched controls when PrimeNG generated DOM, tokens, or state styling prevent a close visual match.
- When PrimeNG gets in the way, update `../docs/frontend/primeng-fit.md` with the issue and decision before repeating similar workarounds.
- Use Tailwind for layout, spacing, typography, responsive grids, and token-backed color utilities.
- Use Prime token-backed Tailwind utilities such as `primary-*` and `surface-*` before adding custom color variables.
- Keep custom CSS focused on brand styling, layout details, PrimeNG generated-DOM adapters, and effects that cannot be expressed cleanly with utilities.
- Do not add a parallel theme system. Theme configuration belongs in `providePrimeNG`.
- Dark and light mode are class-driven through `.app-dark` and `.app-light`.
- Use page-prefixed class names for page-specific visual components. Avoid generic names such as `.hero-visual` unless the intent is to share global behavior; the contact hero visual was broken by an unrelated global `.hero-visual` minimum height.

## Menubar Rules

- Treat `docs/frontend/design/menubar.md` as the source of truth for menubar design decisions.
- Treat `docs/frontend/design/theme-switch.md` as the source of truth for the reusable theme switch API and styling variables.
- Treat `docs/frontend/design/mobile-nav-drawer.md` as the source of truth for the native mobile drawer.
- Preserve the established menubar layout: brandmark and "The Code Tickler" home link on the left, empty center, Projects/Writing/About/Contact links on desktop, mobile drawer collapse on narrow screens, and the theme toggle at the far right.
- The menubar chrome is PrimeNG-free by design. Do not use PrimeNG `Button`, `Drawer`, `ToggleSwitch`, or PrimeIcons in `menubar`, `mobile-nav-drawer`, or `theme-switch`.
- The theme toggle is implemented by `src/app/components/theme-switch`. Keep it reusable, native, CSS-variable driven, and independent of PrimeNG/PrimeIcons so it can be copied into other projects.
- Light mode is left/off and dark mode is right/on, matching the sample image.
- Keep the toggle border thin, fading from almost black/navy on the left toward blue/pink/purple on the right; the selected dark-state moon should be white in a dark right-side area.
- Keep the toggle thumb matte. The color strength belongs in the thin gradient border and dark pill background, not in a glowing thumb or handle.
- The sun and moon glyphs are custom CSS shapes. The moon is a filled crescent with the bright arc on the left and cutout opening toward the upper-right; do not use `pi pi-moon` for the selected moon because the PrimeIcons outline shape does not match the sample.
- Preserve the custom switch layering: outer pill/background, static endpoint icons, and moving thumb. This was chosen because the PrimeNG `ToggleSwitch` generated DOM made the sample geometry difficult to match closely.
- Preserve theme persistence through the `the-code-tickler-theme` localStorage key.

## Contact Page Rules

- Treat `docs/frontend/design/contact.md` as the source of truth for the contact page.
- Recreate `sample/new-design/Contact.png` with live Angular templates and CSS, not as a screenshot background.
- Let the contact page inherit the shared site background; do not add a page-wide background image.
- Keep the contact hero visual in `src/app/pages/contact/contact-hero-visual`; it owns the relative mark/grid composition, two-column scaling behavior, and hiding at the hero-collapse breakpoint.
- Do not use the global `.hero-visual` class inside the contact hero visual. The global home-page rule includes a large minimum height and breaks the contact component's square sizing.
- Keep the contact form honest until a backend exists. It may open a `mailto:` draft, but it must not show a fake server-side success state.
- Use the promoted SVG assets under `src/assets/brandmark` and `src/assets/backgrounds` for contained visual elements only.
- PrimeIcons may be used for contact-page content icons. The PrimeNG-free rule applies to menubar chrome, not this page.

## Writing Page Rules

- Treat `../docs/frontend/design/writing.md` as the source of truth for the writing page.
- Recreate `sample/new-design/Writing.png` with live Angular templates and CSS, not as a screenshot background.
- Treat writing entries as planned notes or previews unless the user confirms published content.
- Do not link cards to missing `/writing/:slug` routes yet.
- Keep the subscribe panel visual-only until a backend exists; do not show fake success or imply a real subscription.

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
