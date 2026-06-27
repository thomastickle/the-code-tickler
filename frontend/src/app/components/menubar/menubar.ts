import { DOCUMENT } from '@angular/common'
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { Button } from 'primeng/button'
import { Toolbar } from 'primeng/toolbar'

import { MobileNavDrawer } from '../mobile-nav-drawer/mobile-nav-drawer'

@Component({
  selector: 'app-menubar',
  imports: [Button, MobileNavDrawer, RouterLink, RouterLinkActive, Toolbar],
  templateUrl: './menubar.html',
  styleUrl: './menubar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Menubar {
  private readonly document = inject(DOCUMENT)
  protected readonly darkMode = signal(true)
  protected readonly mobileMenuLoaded = signal(false)
  protected readonly mobileMenuOpen = signal(false)
  protected readonly navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Projects', path: '/projects' },
    { label: 'Writing', path: '/writing' },
    { label: 'Contact', path: '/contact' },
  ]

  constructor() {
    effect(() => {
      const isDark = this.darkMode()
      this.document.documentElement.classList.toggle('app-dark', isDark)
      this.document.documentElement.classList.toggle('app-light', !isDark)
    })
  }

  protected toggleTheme(): void {
    this.darkMode.update((value) => !value)
  }

  protected openMobileMenu(): void {
    this.mobileMenuLoaded.set(true)
    this.mobileMenuOpen.set(true)
  }

  protected closeMobileMenu(): void {
    this.mobileMenuOpen.set(false)
  }

  protected updateMobileMenuVisibility(visible: boolean): void {
    this.mobileMenuOpen.set(visible)
  }
}
