import { DOCUMENT } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  effect,
  inject,
  input,
  output,
} from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'

export interface NavItem {
  label: string
  path: string
  description?: string
}

@Component({
  selector: 'app-mobile-nav-drawer',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './mobile-nav-drawer.html',
  styleUrl: './mobile-nav-drawer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileNavDrawer implements OnDestroy {
  private readonly document = inject(DOCUMENT)
  private readonly initialBodyOverflow = this.document.body.style.overflow
  readonly open = input(false)
  readonly navItems = input.required<readonly NavItem[]>()
  readonly openChange = output<boolean>()
  readonly navigate = output<void>()

  constructor() {
    effect(() => {
      this.document.body.style.overflow = this.open() ? 'hidden' : this.initialBodyOverflow
    })
  }

  ngOnDestroy(): void {
    this.document.body.style.overflow = this.initialBodyOverflow
  }

  protected close(): void {
    this.openChange.emit(false)
  }

  protected navigateToItem(): void {
    this.navigate.emit()
  }
}
