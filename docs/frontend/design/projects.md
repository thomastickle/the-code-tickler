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
  - Hero area with eyebrow, large gradient title, summary copy, and a vertical unboxed stat stack. Each stat row uses three columns: icon, number, then short label.
  - Group projects by Active, Maintained, and Legacy sections.
  - Use dense glass cards for listed projects with icon, status/section label, summary, optional impact, stack tags, links, and detail cue.
- Tablet/mobile:
  - Stack the hero and keep the stat group as vertical rows so the title area does not compete with card-like metric blocks.
  - Project sections and cards become single-column.
  - Preserve keyboard-accessible card navigation and accessible external links.
- Detail route:
  - Use the same global `site-*` primitives for shell width, eyebrow, hero title, summary, glass panels, chips, icons, and links.
  - Keep the stack/source panel beside the title on desktop and stacked below it on narrower screens.
  - Let the project title use the main hero column width; do not cap it so tightly that short names wrap early.
  - Render only real narrative content. Keep placeholder related writing, provisional highlights, and provisional ownership notes hidden until the data is publishable.

## Implementation Notes

- Component: `frontend/src/app/pages/projects`.
- Detail component: `frontend/src/app/pages/project-detail`.
- Use native Angular markup and the shared primitives in `frontend/src/styles/_site-primitives.scss` for cards, chips, buttons, panels, and hero treatments. Avoid PrimeNG generated DOM on projects/detail surfaces where it fights the native glass look.
- Keep page SCSS focused on route-specific layout and sizing. Push reusable look-and-feel into the highest reasonable shared style layer.
- Keep class names page-prefixed for route-specific layout (`projects-*`, `project-*`) and use global `site-*` classes for shared visual primitives.
- PrimeIcons are acceptable for project-page content icons.
- External source links must stop event propagation so they do not also trigger project-card navigation.
- Treat writing entries with `date: 'Placeholder'` as unpublished for project-detail related-writing panels.
