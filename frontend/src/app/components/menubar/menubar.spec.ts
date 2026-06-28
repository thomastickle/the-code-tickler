import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideRouter } from '@angular/router'

import { Menubar } from './menubar'

describe('Menubar', () => {
  let component: Menubar
  let fixture: ComponentFixture<Menubar>

  beforeEach(async () => {
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

  it('renders the current page label', () => {
    const element: HTMLElement = fixture.nativeElement

    expect(element.textContent).toContain('Home')
  })

  it('uses a centered header layout for the current page label', () => {
    const element: HTMLElement = fixture.nativeElement
    const shell = element.querySelector('.site-shell-inner')
    const label = element.querySelector('.current-page-label')

    expect(shell).toBeTruthy()
    expect(label?.classList).toContain('justify-self-center')
  })

  it('renders desktop navigation links', () => {
    component['toggleNavigation']()
    fixture.detectChanges()

    const element: HTMLElement = fixture.nativeElement
    const labels = ['Home', 'About', 'Projects', 'Writing', 'Contact']

    for (const label of labels) {
      expect(element.textContent).toContain(label)
    }
  })

  it('keeps the compact trigger in flow when the popout opens', () => {
    component['toggleNavigation']()
    fixture.detectChanges()

    const element: HTMLElement = fixture.nativeElement

    expect(element.querySelector('.brandmark-trigger')).toBeTruthy()
    expect(element.querySelector('.brandmark-menu-popout')).toBeTruthy()
    expect(element.querySelector('.current-page-label')?.textContent).toContain('Home')
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
})
