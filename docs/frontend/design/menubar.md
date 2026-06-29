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
- The theme toggle should read left-to-right: dark mode on the left/off side, light mode on the right/on side.
- On narrow screens, collapse the page links into a mobile menu button while keeping the brand and theme toggle visible.

## Theme

- The menubar should have a glowing edge / shadow to help differentiate it from the items behind.
- The target feel is a clean future / retro future glass panel with blue and purple neon edges.
- The theme toggle background should incorporate the site's purple Prime tokens, with cyan used as a secondary glow/accent rather than the dominant color.
- Light mode should keep the same structure and affordances while using restrained lighter surfaces.

## Implementation Notes

- The component lives at `frontend/src/app/components/menubar`.
- Use PrimeNG `ToggleSwitch` for the theme control, not a hand-rolled switch.
- Style the switch using PrimeNG toggle token variables such as `--p-toggleswitch-width`, `--p-toggleswitch-height`, `--p-toggleswitch-gap`, and `--p-toggleswitch-handle-size`; avoid raw size overrides that break handle travel.
- Persist the theme preference under `the-code-tickler-theme`.
- Apply theme classes to `document.documentElement` as `.app-dark` and `.app-light`.
- Reuse `MobileNavDrawer` for collapsed mobile navigation.
