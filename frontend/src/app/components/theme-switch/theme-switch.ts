import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core'

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.html',
  styleUrl: './theme-switch.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitch {
  readonly checked = input(false)
  readonly checkedChange = output<boolean>()
  readonly checkedActionLabel = input('Switch to light mode')
  readonly uncheckedActionLabel = input('Switch to dark mode')

  protected readonly ariaLabel = computed(() =>
    this.checked() ? this.checkedActionLabel() : this.uncheckedActionLabel(),
  )

  protected toggle(): void {
    this.checkedChange.emit(!this.checked())
  }
}
