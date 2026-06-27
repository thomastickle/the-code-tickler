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

  it('renders desktop navigation links', () => {
    const element: HTMLElement = fixture.nativeElement
    const labels = ['Home', 'About', 'Projects', 'Writing', 'Contact']

    for (const label of labels) {
      expect(element.textContent).toContain(label)
    }
  })

  it('opens and closes the brandmark menu', () => {
    component['toggleNavigation']()
    fixture.detectChanges()

    expect(component['menuOpen']()).toBe(true)
    expect(fixture.nativeElement.querySelector('.brandmark-menu.open')).toBeTruthy()

    component['closeNavigation']()
    fixture.detectChanges()

    expect(component['menuOpen']()).toBe(false)
  })
})
