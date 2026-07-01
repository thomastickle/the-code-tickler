# Writing Page

## Visual Target

- `sample_&_raw_assets/Second Pass/overall_look/Writing.png` is the current visual reference for `/writing`.
- Recreate the composition with live Angular templates and CSS, not as a screenshot background.
- The page shares the near-black navy site background and the menubar/contact visual language.
- Use a desktop left rail, dark glass content panels, contained brand/grid visuals, PrimeIcons, and restrained blue/violet/purple accents.

## Content Direction

- Use a hybrid honest content model:
  - Treat current article titles as planned notes or previews unless they are real published writing.
  - Do not link note cards to missing detail routes yet.
  - Avoid implying a publication date or live article backend before those exist.
- Hero copy:
  - Eyebrow: `Writing`
  - Title: `Notes from the Workbench`
  - Summary should emphasize architecture, reliability, delivery, and technical leadership.
- Topic groups: Architecture, Reliability, Leadership, Developer Experience, and Platform Strategy.

## Layout

- Desktop:
  - Left rail for topics, filters, popular tags, and visual-only subscribe panel.
  - Main content with hero, featured note, all-note cards, and compact recent field-note rows.
  - The hero uses a compact `writing-mini-hero` quill image beside the title/summary area. It should read as small title-adjacent brand art, not as a full hero image, framed panel, or large illustration.
- Tablet/mobile:
  - Main writing content appears before the sidebar so the page title is visible first.
  - Sidebar stacks below the main content.
  - The mini-hero scales down or hides when it competes with the title.
  - Note cards become two columns on tablet and one column on phone.
- Subscribe panel is visual-only until a backend exists. Inputs/buttons should be disabled and must not show fake success.

## Implementation Notes

- Component: `frontend/src/app/pages/writing`.
- Use native Angular markup and page-specific CSS for panels/cards so the styling stays close to the mockup.
- Keep class names page-prefixed (`writing-*`, `note-*`, `field-note-*`, `sidebar-*`) and avoid generic global names such as `.hero-visual`.
- PrimeIcons are acceptable for writing-page content icons.
- Raw/reference assets stay ignored under `sample_&_raw_assets/`. Only app-used production files should be copied into `frontend/src/assets`.
- Production writing mini-hero files live under `frontend/src/assets/writing/writing-mini-hero/`; use the clean quill WebP variant by default.
- Deleted SVG background/brandmark files should not be referenced. Use CSS-native gradients, subtle star/noise effects, and grid-line layers where the page still needs that visual language.
