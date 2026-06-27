import { DOCUMENT } from '@angular/common'
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core'
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router'
import { Button } from 'primeng/button'
import { filter } from 'rxjs'

import { MobileNavDrawer } from '../mobile-nav-drawer/mobile-nav-drawer'

@Component({
  selector: 'app-menubar',
  imports: [Button, MobileNavDrawer, RouterLink, RouterLinkActive],
  templateUrl: './menubar.html',
  styleUrl: './menubar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Menubar {
  private readonly document = inject(DOCUMENT)
  private readonly router = inject(Router)
  protected readonly darkMode = signal(true)
  protected readonly railExpanded = signal(false)
  protected readonly currentUrl = signal(this.router.url)
  protected readonly mobileMenuLoaded = signal(false)
  protected readonly mobileMenuOpen = signal(false)
  protected readonly navItems = [
    { label: 'Home', path: '/', icon: 'pi pi-home' },
    { label: 'About', path: '/about', icon: 'pi pi-user' },
    { label: 'Projects', path: '/projects', icon: 'pi pi-briefcase' },
    { label: 'Writing', path: '/writing', icon: 'pi pi-pencil' },
    { label: 'Contact', path: '/contact', icon: 'pi pi-send' },
  ]
  protected readonly currentPageLabel = computed(
    () =>
      this.navItems.find((item) => this.currentUrl().split('?')[0] === item.path)?.label ??
      this.navItems[0].label,
  )

  constructor() {
    effect(() => {
      const isDark = this.darkMode()
      this.document.documentElement.classList.toggle('app-dark', isDark)
      this.document.documentElement.classList.toggle('app-light', !isDark)
    })

    effect(() => {
      this.document.documentElement.classList.toggle('nav-rail-expanded', this.railExpanded())
    })

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.currentUrl.set(event.urlAfterRedirects))
  }

  protected toggleTheme(): void {
    this.darkMode.update((value) => !value)
  }

  protected toggleRail(): void {
    this.railExpanded.update((value) => !value)
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
