# Menubar

## Overall Guidance

- The menubar is a component that provides navigation and actions for the application.
- It should take up ~90% of the available horizontal space.
- For now, it should sit at the top of the page in normal document flow and scroll away with the page.
- It should be at the top of the page.
- `menubar-example.png` is the desktop visual target, adapted to the site's Angular/PrimeNG/Tailwind implementation and existing theme tokens.
- The desktop feel should stay close to the example image: dark glass panel, blue/purple neon edge, brand left, empty center, links and theme control right.

## Layout

- The brandmark image should be placed on the left side of the menubar.
- Immediately to the right of the brandmark image should be the text "The Code Tickler".
- The middle of the menubar is empty.
- The right side of the menubar has a set of options which link out to other pages. Use Projects, Writing, About, and Contact.
- Clicking on the brandmark or text "The Code Tickler" should return the user to the home page.
- Do not include Home as a right-side nav item; the brand link is the home affordance.
- The rightmost element should be a toggle switch between the default dark mode and light mode. The site should remember the user's choice there.
- The theme toggle should match the sample direction: light mode on the left/off side and dark mode on the right/on side.
- On narrow screens, collapse the page links into a mobile menu button while keeping the brand and theme toggle visible.

## Theme

- The menubar should have a glowing edge / shadow to help differentiate it from the items behind.
- The target feel is a clean future / retro future glass panel with blue and purple neon edges.
- The theme toggle background should stay dark and quiet; the color accent belongs primarily on the border.
- The theme toggle border should read like the original sample: a thin pill edge that moves from almost black/navy on the left through blue and pink into the site's purple on the right.
- In dark mode, the selected moon sits on the right and is white inside a matte dark thumb. Use a filled crescent moon shape, not an outline icon; the bright arc should sit on the left with the cutout opening toward the right. The thumb should not glow. The left side keeps only a small subdued-white sun indicator.
- Light mode should keep the same structure and affordances while using restrained lighter surfaces.

## Implementation Notes

- The menubar component lives at `frontend/src/app/components/menubar`.
- The reusable theme switch lives at `frontend/src/app/components/theme-switch`.
- Detailed theme switch API and portability notes live in `docs/frontend/design/theme-switch.md`.
- Use the `ThemeSwitch` component for the theme control. It renders a native accessible `button` with `role="switch"` and stays intentionally custom so it can closely match `menubar-example.png`.
- Keep the switch visually close to the sample: small dark pill, thin gradient border, subdued sun left, white moon in the right selected area, and no glow on the moving thumb.
- Build the switch as separate visual layers: the outer pill/background, static endpoint icons, and a moving thumb. This keeps the sample-like geometry controllable without fighting generated component DOM.
- Render the sun and moon as CSS shapes inside `ThemeSwitch`; do not require PrimeIcons for the extracted control.
- Persist the theme preference under `the-code-tickler-theme`.
- Apply theme classes to `document.documentElement` as `.app-dark` and `.app-light`.
- Reuse `MobileNavDrawer` for collapsed mobile navigation.
