import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideRouter } from '@angular/router'

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

  it('renders a brandmark menu trigger without a hamburger trigger', () => {
    const element: HTMLElement = fixture.nativeElement
    const button = element.querySelector('[aria-label="Toggle navigation menu"]')

    expect(button).toBeTruthy()
    expect(element.querySelector('.pi-bars')).toBeNull()
  })

  it('uses WebP brandmark assets for the menu trigger', () => {
    const element: HTMLElement = fixture.nativeElement
    const brandmark = element.querySelector('.brandmark-trigger img') as HTMLImageElement

    expect(brandmark?.getAttribute('src')).toBe('brandmark/brand-mark-1x.webp')
    expect(brandmark?.getAttribute('srcset')).toContain('brandmark/brand-mark-2x.webp 2x')
  })

  it('uses a full-width fixed header with theme toggle before the brand trigger', () => {
    const element: HTMLElement = fixture.nativeElement
    const header = element.querySelector('.site-shell-bar')
    const shell = element.querySelector('.site-shell-inner')
    const firstControl = shell?.querySelector('.theme-toggle')
    const secondControl = shell?.querySelector('.brandmark-trigger')

    expect(header?.classList).toContain('fixed')
    expect(header?.classList).toContain('inset-x-0')
    expect(header?.classList).toContain('z-50')
    expect(shell).toBeTruthy()
    expect(shell?.classList).not.toContain('site-frame')
    expect(firstControl).toBeTruthy()
    expect(secondControl).toBeTruthy()
    expect(element.querySelector('.current-page-label')).toBeNull()
  })

  it('renders the current page cue inside the brand trigger', () => {
    const element: HTMLElement = fixture.nativeElement
    const trigger = element.querySelector('.brandmark-trigger')
    const pageCue = trigger?.querySelector('.brandmark-trigger-page')

    expect(element.querySelector('.current-page-label')).toBeNull()
    expect(pageCue?.textContent).toContain('Home')
  })

  it('uses Projects as the brand trigger cue for project detail routes', () => {
    component['currentUrl'].set('/projects/the-code-tickler')
    fixture.detectChanges()

    const element: HTMLElement = fixture.nativeElement

    expect(element.querySelector('.brandmark-trigger-page')?.textContent).toContain('Projects')
  })

  it('renders navigation links with descriptions', () => {
    component['toggleNavigation']()
    fixture.detectChanges()

    const element: HTMLElement = fixture.nativeElement
    const labels = ['Home', 'About', 'Projects', 'Writing', 'Contact']
    const descriptions = [
      'Welcome back',
      'Background and experience',
      'Things I build and maintain',
      'Engineering notes and ideas',
      "Let's connect",
    ]

    for (const label of labels) {
      expect(element.textContent).toContain(label)
    }

    for (const description of descriptions) {
      expect(element.textContent).toContain(description)
    }
  })

  it('keeps the compact trigger in flow when the popout opens', () => {
    component['toggleNavigation']()
    fixture.detectChanges()

    const element: HTMLElement = fixture.nativeElement

    expect(element.querySelector('.brandmark-trigger')).toBeTruthy()
    expect(element.querySelector('.brandmark-menu-popout')).toBeTruthy()
    expect(element.querySelector('.current-page-label')).toBeNull()
    expect(element.textContent).not.toContain('Currently viewing')
  })

  it('keeps brandmark chrome separate from active navigation links', () => {
    component['toggleNavigation']()
    fixture.detectChanges()

    const element: HTMLElement = fixture.nativeElement

    expect(element.querySelector('.brandmark-trigger.active')).toBeNull()
    expect(element.querySelectorAll('.brandmark-menu-link').length).toBeGreaterThan(0)
  })

  it('opens and closes the brandmark menu', () => {
    component['toggleNavigation']()
    fixture.detectChanges()

    expect(component['menuOpen']()).toBe(true)
    expect(fixture.nativeElement.querySelector('.brandmark-menu-popout')).toBeTruthy()

    component['closeNavigation']()
    fixture.detectChanges()

    expect(component['menuOpen']()).toBe(false)
  })

  it('saves the selected theme preference', () => {
    component['toggleTheme']()
    fixture.detectChanges()

    expect(localStorage.getItem('the-code-tickler-theme')).toBe('light')
    expect(document.documentElement.classList).toContain('app-light')
  })

  it('restores a saved light theme preference', async () => {
    localStorage.setItem('the-code-tickler-theme', 'light')

    const lightFixture = TestBed.createComponent(Menubar)
    lightFixture.detectChanges()
    await lightFixture.whenStable()

    expect(lightFixture.componentInstance['darkMode']()).toBe(false)
    expect(document.documentElement.classList).toContain('app-light')
  })
})
