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

  it('renders a brandmark mobile menu button without a hamburger trigger', () => {
    const element: HTMLElement = fixture.nativeElement
    const button = element.querySelector('[aria-label="Open navigation menu"]')

    expect(button).toBeTruthy()
    expect(element.querySelector('.pi-bars')).toBeNull()
  })

  it('renders the current page label', () => {
    const element: HTMLElement = fixture.nativeElement

    expect(element.textContent).toContain('Home')
  })

  it('renders desktop navigation links', () => {
    const element: HTMLElement = fixture.nativeElement
    const labels = ['Home', 'About', 'Projects', 'Writing', 'Contact']

    for (const label of labels) {
      expect(element.textContent).toContain(label)
    }
  })

  it('opens and closes the mobile menu', () => {
    component['openMobileMenu']()
    fixture.detectChanges()

    expect(component['mobileMenuLoaded']()).toBe(true)
    expect(component['mobileMenuOpen']()).toBe(true)

    component['updateMobileMenuVisibility'](false)
    fixture.detectChanges()

    expect(component['mobileMenuOpen']()).toBe(false)
  })

  it('toggles the desktop rail', () => {
    const button = fixture.nativeElement.querySelector(
      '[aria-label="Toggle navigation rail"]',
    ) as HTMLButtonElement

    expect(component['railExpanded']()).toBe(false)

    button.click()
    fixture.detectChanges()

    expect(component['railExpanded']()).toBe(true)
    expect(button.getAttribute('aria-expanded')).toBe('true')
  })
})
