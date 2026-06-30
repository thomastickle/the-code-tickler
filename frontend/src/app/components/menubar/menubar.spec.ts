import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { provideRouter } from '@angular/router'

import { MobileNavDrawer } from '../mobile-nav-drawer/mobile-nav-drawer'
import { Menubar } from './menubar'

describe('Menubar', () => {
  let component: Menubar
  let fixture: ComponentFixture<Menubar>

  beforeEach(async () => {
    localStorage.clear()

    await TestBed.configureTestingModule({
      imports: [Menubar],
      providers: [provideRouter([])],
    }).compileComponents()

    fixture = TestBed.createComponent(Menubar)
    component = fixture.componentInstance
    fixture.detectChanges()
    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('links the brand to the home page', () => {
    const element: HTMLElement = fixture.nativeElement
    const brandLink = element.querySelector('.brand-link') as HTMLAnchorElement
    const brandmark = brandLink.querySelector('.brandmark') as HTMLImageElement

    expect(brandLink.getAttribute('href')).toBe('/')
    expect(brandLink.textContent).toContain('The Code Tickler')
    expect(brandmark.getAttribute('src')).toBe('brandmark/brand-mark-1x.webp')
    expect(brandmark.getAttribute('srcset')).toContain('brandmark/brand-mark-2x.webp 2x')
  })

  it('renders four desktop nav links without a Home nav item', () => {
    const element: HTMLElement = fixture.nativeElement
    const links = Array.from(element.querySelectorAll('.desktop-links .nav-link'))

    expect(links.map((link) => link.textContent?.trim())).toEqual([
      'Projects',
      'Writing',
      'About',
      'Contact',
    ])
    expect(links.some((link) => link.textContent?.trim() === 'Home')).toBe(false)
  })

  it('defaults to dark mode and stores the preference', () => {
    const themeSwitch = fixture.nativeElement.querySelector('.theme-switch') as HTMLButtonElement

    expect(document.documentElement.classList).toContain('app-dark')
    expect(document.documentElement.classList).not.toContain('app-light')
    expect(localStorage.getItem('the-code-tickler-theme')).toBe('dark')
    expect(themeSwitch.getAttribute('aria-checked')).toBe('true')
    expect(themeSwitch.getAttribute('aria-label')).toBe('Switch to light mode')
  })

  it('uses a custom filled moon glyph in dark mode', () => {
    const element: HTMLElement = fixture.nativeElement

    expect(element.querySelector('.theme-switch-thumb .theme-icon-moon')).not.toBeNull()
  })

  it('restores a saved light theme preference', async () => {
    localStorage.setItem('the-code-tickler-theme', 'light')

    const lightFixture = TestBed.createComponent(Menubar)
    lightFixture.detectChanges()
    await lightFixture.whenStable()

    const themeSwitch = lightFixture.nativeElement.querySelector(
      '.theme-switch',
    ) as HTMLButtonElement

    expect(document.documentElement.classList).toContain('app-light')
    expect(document.documentElement.classList).not.toContain('app-dark')
    expect(themeSwitch.getAttribute('aria-checked')).toBe('false')
    expect(themeSwitch.getAttribute('aria-label')).toBe('Switch to dark mode')
  })

  it('persists theme changes from the toggle switch', async () => {
    const themeSwitch = fixture.nativeElement.querySelector('.theme-switch') as HTMLElement

    themeSwitch.click()
    fixture.detectChanges()
    await fixture.whenStable()

    expect(localStorage.getItem('the-code-tickler-theme')).toBe('light')
    expect(document.documentElement.classList).toContain('app-light')
  })

  it('opens and closes the mobile navigation drawer', async () => {
    const menuButton = fixture.nativeElement.querySelector(
      '.mobile-menu-button',
    ) as HTMLButtonElement

    menuButton.click()
    fixture.detectChanges()
    await fixture.whenStable()

    const drawer = fixture.debugElement.query(By.directive(MobileNavDrawer))
      .componentInstance as MobileNavDrawer

    expect(drawer.open()).toBe(true)

    drawer.navigate.emit()
    fixture.detectChanges()
    await fixture.whenStable()

    expect(drawer.open()).toBe(false)
  })
})
