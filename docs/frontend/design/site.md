# The Code Tickler Website

The Code Tickler is a website using Angular 21 as its base framework. PrimeNG components are a strongly recommended choice for pre-built UI elements, and theme work should stay aligned with PrimeUIX tokens rather than becoming a separate component theme system.

## Overall Theme design

### Colors

The site overall is a combination of a clean future and retro future aesthetic: near-black navy dark backgrounds, dark glass, restrained light-mode surfaces, purple and cyan accents, and controlled glow effects. In dark mode, the page background should stay almost black navy so the menubar edge treatment and future content surfaces have room to stand out.

### Overall page design

This section describes common elements that should appear on each page.

#### Menubar
The detailed menubar direction lives in `docs/frontend/design/menubar.md`. It establishes the first reusable piece of site chrome before broader page redesign resumes. Future shared chrome should preserve the same basic language: glassy dark-first surfaces, purple token-backed accents, cyan edge glow used sparingly, sample-like controls with matte moving parts, and restrained light-mode variants.

#### Contact
The detailed contact-page direction lives in `docs/frontend/design/contact.md`. It extends the menubar language into the first page body: near-black navy background, subtle star/noise texture, retro grid horizon, glass panels, blue/violet/purple accents, and honest frontend-only form behavior until a backend exists.

#### Writing
The detailed writing-page direction lives in `docs/frontend/design/writing.md`. It adapts the contact language into an engineering-notes page: desktop topic rail, planned-note previews, compact field-note rows, and a visual-only subscribe panel until a backend exists.

#### Page implementation rules
Page-specific visual components should use page-prefixed internal class names instead of generic global names. The contact hero visual intentionally uses `contact-visual` because the existing global `.hero-visual` rule is tuned for the home page and can leak layout constraints into other pages.

Build new pages from the established menubar/contact language: shared near-black navy background, constrained content aligned to the menubar width, dark glass panels, restrained blue/violet/purple accents, and no page-wide mockup images. Use sample images as references only.
