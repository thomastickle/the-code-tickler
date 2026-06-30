# PrimeNG Fit Log

Track cases where PrimeNG helps or gets in the way during the frontend redesign. This is not a complaint list; it is a decision tool for deciding whether PrimeNG remains a net benefit.

## Counting Rules

Count a PrimeNG fit issue when a PrimeNG component or theme contract blocks an approved design direction after a reasonable styling attempt and one of these is true:

- The component's generated DOM or internal state styling prevents a close visual match.
- The implementation needs fragile deep selectors or token overrides that are harder to maintain than a native component.
- The workaround takes enough iteration that future use of the same component family should be questioned.
- The component creates accessibility, layout, test, or bundle-size complexity beyond the value it provides.

Do not count normal styling work, ordinary responsive tuning, or a one-off bug that PrimeNG does not materially cause.

## Decision Threshold

- At 2 counted issues in the same component family, stop using that PrimeNG family for new work unless there is a strong reason.
- At 3 high-impact counted issues across the redesign, pause before adding new PrimeNG components and write a replacement plan.
- At 5 counted issues across the redesign, treat removing PrimeNG as the default recommendation unless there is a clear counterargument.

Removal should still be deliberate. Do not rip PrimeNG out automatically; first inventory current usage, replacement costs, accessibility impact, test impact, and theme-token dependencies.

## Current Count

Counted issues: 1

| Date | Area | PrimeNG Piece | Issue | Decision |
| --- | --- | --- | --- | --- |
| 2026-06-30 | Menubar theme toggle | `ToggleSwitch` | The generated DOM, checked-state model, and styling tokens made it difficult to match `menubar-example.png` closely. Repeated attempts produced handle alignment and visual-fidelity problems. | Replaced with a native accessible `button role="switch"` using layered CSS. Keep PrimeNG for standard app controls, but avoid it for reference-matched brand chrome when it fights the target. |

## Related Observations

- 2026-06-30: The PrimeIcons `pi pi-moon` glyph was not counted as a PrimeNG fit issue because it was an icon asset mismatch rather than component friction. The reusable `ThemeSwitch` uses custom CSS sun and moon shapes so the extracted control does not depend on PrimeIcons.
- 2026-06-30: PrimeNG `Button` and `Drawer` were removed from the menubar/mobile drawer after the menubar chrome was clarified as PrimeNG-free. This is a component-boundary decision rather than a new counted fit issue.
