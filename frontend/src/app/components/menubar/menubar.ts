import { DOCUMENT } from '@angular/common'
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core'
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router'
import { Button } from 'primeng/button'
import { filter } from 'rxjs'

import { type NavItem } from '../mobile-nav-drawer/mobile-nav-drawer'

const themePreferenceKey = 'the-code-tickler-theme'
type ThemePreference = 'dark' | 'light'

@Component({
  selector: 'app-menubar',
  imports: [Button, RouterLink, RouterLinkActive],
  templateUrl: './menubar.html',
  styleUrl: './menubar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Menubar {
  private readonly document = inject(DOCUMENT)
  private readonly router = inject(Router)
  protected readonly darkMode = signal(this.readThemePreference() !== 'light')
  protected readonly menuOpen = signal(false)
  protected readonly currentUrl = signal(this.router.url)
  protected readonly navItems: readonly NavItem[] = [
    { label: 'Home', path: '/', icon: 'pi pi-home', description: 'Welcome back' },
    {
      label: 'About',
      path: '/about',
      icon: 'pi pi-user',
      description: 'Background and experience',
    },
    {
      label: 'Projects',
      path: '/projects',
      icon: 'pi pi-code',
      description: 'Things I build and maintain',
    },
    {
      label: 'Writing',
      path: '/writing',
      icon: 'pi pi-file',
      description: 'Engineering notes and ideas',
    },
    { label: 'Contact', path: '/contact', icon: 'pi pi-envelope', description: "Let's connect" },
  ]
  protected readonly currentPageLabel = computed(() => {
    const currentPath = this.currentUrl().split('?')[0].split('#')[0]

    return (
      this.navItems.find(
        (item) =>
          currentPath === item.path ||
          (item.path !== '/' && currentPath.startsWith(`${item.path}/`)),
      )?.label ?? this.navItems[0].label
    )
  })

  constructor() {
    effect(() => {
      const isDark = this.darkMode()
      this.document.documentElement.classList.toggle('app-dark', isDark)
      this.document.documentElement.classList.toggle('app-light', !isDark)
      this.writeThemePreference(isDark ? 'dark' : 'light')
    })

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentUrl.set(event.urlAfterRedirects)
        this.closeNavigation()
      })
  }

  protected toggleTheme(): void {
    this.darkMode.update((value) => !value)
  }

  protected toggleNavigation(): void {
    this.menuOpen.update((value) => !value)
  }

  protected closeNavigation(): void {
    this.menuOpen.set(false)
  }

  private readThemePreference(): ThemePreference | null {
    const preference = this.document.defaultView?.localStorage.getItem(themePreferenceKey)

    return preference === 'dark' || preference === 'light' ? preference : null
  }

  private writeThemePreference(preference: ThemePreference): void {
    this.document.defaultView?.localStorage.setItem(themePreferenceKey, preference)
  }
}
