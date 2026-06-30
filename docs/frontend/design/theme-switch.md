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

## Visual Contract

- Light/off sits on the left; dark/on sits on the right.
- The outer pill carries the color accent through a thin border gradient.
- The moving thumb stays matte and does not glow.
- Sun and moon are CSS shapes, not icon-font glyphs.
- The moon is a filled crescent with the bright arc on the left and the cutout opening toward the right.

## Styling

Tune the component through CSS custom properties on `app-theme-switch` rather than editing component internals first. Important variables include:

- `--theme-switch-width`
- `--theme-switch-height`
- `--theme-switch-border-gradient`
- `--theme-switch-track-bg`
- `--theme-switch-thumb-size`
- `--theme-switch-thumb-gap`
- `--theme-switch-checked-thumb-bg`
- `--theme-switch-unchecked-thumb-bg`

If the component is copied into another project, preserve the native `button role="switch"` behavior and the `checked` / `checkedChange` controlled API.
