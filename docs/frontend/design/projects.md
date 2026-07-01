# Projects Page

## Visual Target

- `sample_&_raw_assets/Second Pass/overall_look/Projects.png` is the current visual reference for `/projects`.
- Recreate the project-dashboard feel with live Angular templates and CSS, not as a screenshot background.
- Use the established contact/writing language: near-black navy background, dark glass panels, blue/violet/purple accents, PrimeIcons, and restrained light-mode variants.
- Keep production app assets limited to brandmarks unless a future art pass explicitly promotes page artwork.

## Content Direction

- Keep the project list honest. Render only current real project data from `portfolio-data.ts`.
- Do not add mock project cards from the reference art.
- Keep empty sections visible for maintained and legacy work so the taxonomy stays clear.
- Keep `/projects/:slug` visually aligned with `/projects`; it should feel like the same native glass system, not an older PrimeNG card view.

## Layout

- Desktop:
  - Hero area with eyebrow, large gradient title, summary copy, and compact real-data stats.
  - Group projects by Active, Maintained, and Legacy sections.
  - Use dense glass cards for listed projects with icon, status/section label, summary, optional impact, stack tags, links, and detail cue.
- Tablet/mobile:
  - Stack the hero and stats.
  - Project sections and cards become single-column.
  - Preserve keyboard-accessible card navigation and accessible external links.
- Detail route:
  - Use the same global `site-*` primitives for shell width, eyebrow, hero title, summary, glass panels, chips, icons, and links.
  - Keep the stack/source panel beside the title on desktop and stacked below it on narrower screens.
  - Use narrative glass panels for project description, related writing, highlights, and ownership notes.

## Implementation Notes

- Component: `frontend/src/app/pages/projects`.
- Detail component: `frontend/src/app/pages/project-detail`.
- Use native Angular markup and the shared primitives in `frontend/src/styles.css` for cards, chips, buttons, panels, and hero treatments. Avoid PrimeNG generated DOM on projects/detail surfaces where it fights the native glass look.
- Keep page CSS focused on route-specific layout and sizing. Push reusable look-and-feel into the highest reasonable shared CSS layer.
- Keep class names page-prefixed for route-specific layout (`projects-*`, `project-*`) and use global `site-*` classes for shared visual primitives.
- PrimeIcons are acceptable for project-page content icons.
- External source links must stop event propagation so they do not also trigger project-card navigation.
