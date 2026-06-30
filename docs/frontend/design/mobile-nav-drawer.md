# Mobile Nav Drawer

`MobileNavDrawer` is the collapsed mobile navigation surface used by the menubar. It is intentionally independent of PrimeNG and PrimeIcons so the menubar chrome stays portable and reference-matchable.

## Location

- Component: `frontend/src/app/components/mobile-nav-drawer`
- Selector: `app-mobile-nav-drawer`

## API

- `[open]`: boolean. Controls whether the drawer is rendered; defaults to `false`.
- `[navItems]`: required readonly list of `{ label, path, description? }`.
- `(openChange)`: emits `false` when the user closes the drawer.
- `(navigate)`: emits when the user activates a mobile nav link.

## Visual Contract

- Drawer enters from the right and covers the viewport height.
- Backdrop is a dark blurred overlay.
- Drawer surface uses existing site tokens: `--surface`, `--ink`, `--muted`, `--chrome-line`, `--nav-active`, and `--nav-active-bg`.
- Links are text-only for now; do not require PrimeIcons.
- The close button uses a CSS-drawn icon.

## Implementation Notes

- Use native semantic markup: backdrop `div`, dialog-like `aside`, `button`, `nav`, and router links.
- Do not reintroduce PrimeNG `Drawer` or `Button` for this component.
- The component locks body scrolling while open and restores the previous body overflow value on close/destroy.
- The parent menubar owns navigation state. The drawer should emit `openChange` and `navigate` rather than mutate parent state directly.
