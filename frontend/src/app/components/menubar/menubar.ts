import { DOCUMENT } from '@angular/common'
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { Button } from 'primeng/button'

import { MobileNavDrawer, type NavItem } from '../mobile-nav-drawer/mobile-nav-drawer'

const themePreferenceKey = 'the-code-tickler-theme'
type ThemePreference = 'dark' | 'light'

@Component({
  selector: 'app-menubar',
  imports: [Button, MobileNavDrawer, RouterLink, RouterLinkActive],
  templateUrl: './menubar.html',
  styleUrl: './menubar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Menubar {
  private readonly document = inject(DOCUMENT)
  protected readonly darkMode = signal(this.readThemePreference() !== 'light')
  protected readonly mobileMenuOpen = signal(false)
  protected readonly navItems: readonly NavItem[] = [
    { label: 'Projects', path: '/projects', icon: 'pi pi-code' },
    { label: 'Writing', path: '/writing', icon: 'pi pi-file-edit' },
    { label: 'About', path: '/about', icon: 'pi pi-user' },
    { label: 'Contact', path: '/contact', icon: 'pi pi-envelope' },
  ]

  constructor() {
    effect(() => {
      const isDark = this.darkMode()
      this.document.documentElement.classList.toggle('app-dark', isDark)
      this.document.documentElement.classList.toggle('app-light', !isDark)
      this.writeThemePreference(isDark ? 'dark' : 'light')
    })
  }

  protected toggleTheme(): void {
    this.darkMode.update((isDark) => !isDark)
  }

  protected openMobileMenu(): void {
    this.mobileMenuOpen.set(true)
  }

  protected setMobileMenuOpen(open: boolean): void {
    this.mobileMenuOpen.set(open)
  }

  protected closeMobileMenu(): void {
    this.mobileMenuOpen.set(false)
  }

  private readThemePreference(): ThemePreference | null {
    const preference = this.document.defaultView?.localStorage.getItem(themePreferenceKey)

    return preference === 'dark' || preference === 'light' ? preference : null
  }

  private writeThemePreference(preference: ThemePreference): void {
    this.document.defaultView?.localStorage.setItem(themePreferenceKey, preference)
  }
}
