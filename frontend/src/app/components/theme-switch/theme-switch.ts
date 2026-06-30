import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core'

/**
 * Reusable dark/light mode switch.
 *
 * This is a controlled component: callers own the selected state through
 * `checked` and react to user interaction through `checkedChange`.
 *
 * Example:
 *
 * ```html
 * <app-theme-switch
 *   [checked]="darkMode()"
 *   (checkedChange)="setDarkMode($event)"
 * />
 * ```
 *
 * `checked === true` represents the right-side dark-mode state. The component
 * intentionally avoids PrimeNG and icon-font dependencies so it can be copied
 * into other Angular projects with only its template and stylesheet.
 */
@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.html',
  styleUrl: './theme-switch.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitch {
  /** Whether the right-side dark-mode state is selected. */
  readonly checked = input(false)

  /** Emits the next selected state when the user activates the switch. */
  readonly checkedChange = output<boolean>()

  /** Accessible action label announced while checked, usually for switching back to light mode. */
  readonly checkedActionLabel = input('Switch to light mode')

  /** Accessible action label announced while unchecked, usually for switching to dark mode. */
  readonly uncheckedActionLabel = input('Switch to dark mode')

  protected readonly ariaLabel = computed(() =>
    this.checked() ? this.checkedActionLabel() : this.uncheckedActionLabel(),
  )

  protected toggle(): void {
    this.checkedChange.emit(!this.checked())
  }
}
