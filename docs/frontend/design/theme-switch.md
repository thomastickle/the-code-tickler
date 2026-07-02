# Theme Switch

`ThemeSwitch` is the reusable dark/light toggle used by the menubar. It is intentionally independent of PrimeNG and PrimeIcons so it can be copied into another Angular project with minimal dependencies.

## Location

- Component: `frontend/src/app/components/theme-switch`
- Selector: `app-theme-switch`

## API

- `[checked]`: boolean. `true` means the right-side/dark-mode state is selected.
- `(checkedChange)`: emits the next boolean value when the user toggles the switch.
- `[checkedActionLabel]`: accessible action label used when `checked` is `true`; defaults to `Switch to light mode`.
- `[uncheckedActionLabel]`: accessible action label used when `checked` is `false`; defaults to `Switch to dark mode`.

## Usage

Use `ThemeSwitch` as a controlled component. The parent owns the state and handles persistence or document-level theme classes.

```html
<app-theme-switch [checked]="darkMode()" (checkedChange)="setDarkMode($event)" />
```

```ts
protected readonly darkMode = signal(true)

protected setDarkMode(isDark: boolean): void {
  this.darkMode.set(isDark)
}
```

## Theme Ownership

- `ThemeSwitch` does not read storage, call `matchMedia`, or apply document classes.
- The menubar owns `.app-dark` / `.app-light`, the `the-code-tickler-theme` localStorage key, and browser/OS defaulting.
- With no active manual preference, the menubar follows `prefers-color-scheme` and does not write storage.
- Manual choices are stored as JSON with `version`, `value`, `selectedAt`, and `lastSeenAt`, and expire after 182 days since `lastSeenAt`.
- Legacy raw `dark` / `light` values remain valid and are upgraded by the menubar on the next visit.

## Visual Contract

- Light/off sits on the left; dark/on sits on the right.
- The outer pill uses a crisp blue-gray border around the full toggle, with violet/pink accent concentrated on the right curve.
- Render the right-edge accent as a separate masked ring layer, not as the same background layer as the track fill. This keeps the curved edges cleaner and closer to the sample.
- The moving thumb stays matte and does not glow.
- Sun and moon are CSS shapes, not icon-font glyphs.
- The moon is a filled crescent with the bright arc on the left and the cutout opening toward the upper-right.

## Styling

Tune the component through CSS custom properties on `app-theme-switch` rather than editing component internals first. Important variables include:

- `--theme-switch-width`
- `--theme-switch-height`
- `--theme-switch-border-color`
- `--theme-switch-edge-accent`
- `--theme-switch-track-bg`
- `--theme-switch-thumb-size`
- `--theme-switch-thumb-gap`
- `--theme-switch-checked-thumb-bg`
- `--theme-switch-unchecked-thumb-bg`

If the component is copied into another project, preserve the native `button role="switch"` behavior and the `checked` / `checkedChange` controlled API.
