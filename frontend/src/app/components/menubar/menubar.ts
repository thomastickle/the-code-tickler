import { DOCUMENT } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  signal,
} from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'

import { MobileNavDrawer, type NavItem } from '../mobile-nav-drawer/mobile-nav-drawer'
import { ThemeSwitch } from '../theme-switch/theme-switch'

const themePreferenceKey = 'the-code-tickler-theme'
const themePreferenceVersion = 1
const manualThemePreferenceMaxAgeMs = 182 * 24 * 60 * 60 * 1000

type ThemePreference = 'dark' | 'light'

interface StoredThemePreference {
  version: typeof themePreferenceVersion
  value: ThemePreference
  selectedAt: number
  lastSeenAt: number
}

interface InitialThemePreference {
  source: 'manual' | 'system'
  value: ThemePreference
}

@Component({
  selector: 'app-menubar',
  imports: [MobileNavDrawer, RouterLink, RouterLinkActive, ThemeSwitch],
  templateUrl: './menubar.html',
  styleUrl: './menubar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Menubar {
  private readonly document = inject(DOCUMENT)
  private readonly destroyRef = inject(DestroyRef)
  private readonly colorSchemeQuery = this.createColorSchemeQuery()
  private readonly initialThemePreference = this.resolveInitialThemePreference()
  private readonly usesSystemTheme = signal(this.initialThemePreference.source === 'system')

  protected readonly darkMode = signal(this.initialThemePreference.value === 'dark')
  protected readonly mobileMenuOpen = signal(false)
  protected readonly navItems: readonly NavItem[] = [
    { label: 'Projects', path: '/projects' },
    { label: 'Writing', path: '/writing' },
    { label: 'Contact', path: '/contact' },
  ]

  constructor() {
    effect(() => {
      this.applyThemeClasses(this.darkMode())
    })

    if (this.colorSchemeQuery) {
      this.colorSchemeQuery.addEventListener('change', this.handleColorSchemeChange)
      this.destroyRef.onDestroy(() => {
        this.colorSchemeQuery?.removeEventListener('change', this.handleColorSchemeChange)
      })
    }
  }

  protected setDarkMode(isDark: boolean): void {
    this.usesSystemTheme.set(false)
    this.darkMode.set(isDark)
    this.writeThemePreference(isDark ? 'dark' : 'light')
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

  private readonly handleColorSchemeChange = (event: MediaQueryListEvent): void => {
    if (this.usesSystemTheme()) {
      this.darkMode.set(event.matches)
    }
  }

  private applyThemeClasses(isDark: boolean): void {
    this.document.documentElement.classList.toggle('app-dark', isDark)
    this.document.documentElement.classList.toggle('app-light', !isDark)
  }

  private resolveInitialThemePreference(): InitialThemePreference {
    const manualPreference = this.readThemePreference()

    if (manualPreference) {
      return {
        source: 'manual',
        value: manualPreference,
      }
    }

    return {
      source: 'system',
      value: this.readSystemThemePreference(),
    }
  }

  private readThemePreference(): ThemePreference | null {
    const storage = this.getStorage()

    if (!storage) {
      return null
    }

    const rawPreference = storage.getItem(themePreferenceKey)

    if (!rawPreference) {
      return null
    }

    const now = Date.now()

    if (this.isThemePreference(rawPreference)) {
      this.writeThemePreference(rawPreference, now, now)

      return rawPreference
    }

    const preference = this.parseStoredThemePreference(rawPreference)

    if (!preference) {
      storage.removeItem(themePreferenceKey)

      return null
    }

    if (now - preference.lastSeenAt > manualThemePreferenceMaxAgeMs) {
      storage.removeItem(themePreferenceKey)

      return null
    }

    this.writeThemePreference(preference.value, preference.selectedAt, now)

    return preference.value
  }

  private readSystemThemePreference(): ThemePreference {
    if (!this.colorSchemeQuery) {
      return 'dark'
    }

    return this.colorSchemeQuery.matches ? 'dark' : 'light'
  }

  private writeThemePreference(
    preference: ThemePreference,
    selectedAt = Date.now(),
    lastSeenAt = selectedAt,
  ): void {
    const storage = this.getStorage()

    if (!storage) {
      return
    }

    const storedPreference: StoredThemePreference = {
      version: themePreferenceVersion,
      value: preference,
      selectedAt,
      lastSeenAt,
    }

    storage.setItem(themePreferenceKey, JSON.stringify(storedPreference))
  }

  private parseStoredThemePreference(rawPreference: string): StoredThemePreference | null {
    try {
      const preference: unknown = JSON.parse(rawPreference)

      return this.isStoredThemePreference(preference) ? preference : null
    } catch {
      return null
    }
  }

  private createColorSchemeQuery(): MediaQueryList | null {
    const defaultView = this.document.defaultView

    if (!defaultView?.matchMedia) {
      return null
    }

    return defaultView.matchMedia('(prefers-color-scheme: dark)')
  }

  private getStorage(): Storage | null {
    try {
      return this.document.defaultView?.localStorage ?? null
    } catch {
      return null
    }
  }

  private isThemePreference(value: unknown): value is ThemePreference {
    return value === 'dark' || value === 'light'
  }

  private isStoredThemePreference(value: unknown): value is StoredThemePreference {
    if (!value || typeof value !== 'object') {
      return false
    }

    const preference = value as Partial<StoredThemePreference>

    return (
      preference.version === themePreferenceVersion &&
      this.isThemePreference(preference.value) &&
      typeof preference.selectedAt === 'number' &&
      Number.isFinite(preference.selectedAt) &&
      typeof preference.lastSeenAt === 'number' &&
      Number.isFinite(preference.lastSeenAt)
    )
  }
}
