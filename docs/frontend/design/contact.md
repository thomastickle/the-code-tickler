# Contact Page

## Visual Target

- `sample_&_raw_assets/Second Pass/overall_look/Contact.png` is the current visual reference for `/contact`.
- Recreate the composition with live HTML/CSS, not by using the mockup image as a background.
- The page is dark-first and inherits the shared near-black navy site background. Do not add a page-wide background image.
- Use glass panels and restrained blue/violet/purple glow for the page-specific treatment.
- The menubar remains the site chrome at the top; the contact page begins below it and should not alter the menubar component.
- Accepted baseline: the current implementation is good enough to keep while the source assets are revised separately. Future work should preserve behavior unless a new asset/design pass explicitly supersedes it.

## Layout

- Hero section:
  - Eyebrow: `Let's Connect`
  - Title: `Open to meaningful problems and good teams.`
  - Description: senior engineering partnership copy from the mockup.
  - Three compact proof points: senior perspective, hands-on leader, outcome focused.
- Hero visual:
  - Implement the hero image as a dedicated `ContactHeroVisual` component so its layers scale independently from the page text.
  - Use the `{ feather }` brandmark as a foreground layer in a square bordered glass panel.
  - Keep the braces fully visible and the feather optically centered between them.
  - Keep the CSS grid as a separate lower panel layer so the mark floats above it.
  - Pull the grid toward the bottom of the panel so it reads like an infinite floor.
  - Scale the visual inside the two-column hero only; hide it when the hero collapses at `1120px` and below instead of placing it below the hero copy.
  - Keep the component's internal panel class distinct from global `.hero-visual` styles. The global home-page rule sets a large minimum height and can break the square contact visual if reused.
- Main panels:
  - Left: contact methods for Email, LinkedIn, GitHub, and Availability.
  - Right: frontend-only message form.
- Lower section:
  - Topic cards for Platform Modernization, Reliability & Performance, Staff / Tech Lead Roles, Architecture Reviews, and Engineering Leadership.
  - Bottom callout for full-time, fractional, and advisory engagements.
  - Simple footer links may live on the page until shared footer chrome is designed.

## Behavior

- The form is frontend-only until a backend exists.
- Do not show a fake success state or imply server-side delivery.
- Submitting a valid form opens a `mailto:` draft to `hello@thecodetickler.dev` with name, email, company, topic, follow-up preference, and message in the body.
- Invalid required fields should mark as touched and stay on the page.
- External links open in a new tab with `rel="noopener"`.

## Assets

- Raw/reference assets stay ignored under `sample_&_raw_assets/` and should not be treated as production assets.
- Only production-ready, app-used files should be copied into `frontend/src/assets`.
- The contact route should not apply grid, star, or noise treatments as a page-wide background; reserve CSS-native gradient/star/grid layers for contained visual elements only.
- The deleted SVG background and brandmark files are no longer app dependencies. Do not reference them from contact markup, CSS, or docs.
- Known limitation: the hero mark/grid is an approximation built from inline SVG and CSS layers. Do not over-tune it until the asset set is updated.

## Implementation Notes

- Component: `frontend/src/app/pages/contact`.
- Hero visual component: `frontend/src/app/pages/contact/contact-hero-visual`.
- The component uses `contact-visual` as its internal panel class to avoid leaking global hero styles into the contained square.
- Avoid generic page class names such as `.hero-visual` in page-specific components. A global home-page `.hero-visual` minimum height previously broke this square visual.
- Keep the page as a standalone Angular component with separate `.ts`, `.html`, and `.css` files.
- Use local typed data for contact methods, focus items, and topics until shared content modeling resumes.
- PrimeIcons are acceptable for contact-page content icons. The PrimeNG-free rule only applies to menubar chrome components.
- Use custom native controls and CSS for the form and panels so the page can stay close to the mockup.
