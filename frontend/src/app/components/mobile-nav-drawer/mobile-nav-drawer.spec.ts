import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideRouter } from '@angular/router'

import { MobileNavDrawer } from './mobile-nav-drawer'

describe('MobileNavDrawer', () => {
  let fixture: ComponentFixture<MobileNavDrawer>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileNavDrawer],
      providers: [provideRouter([])],
    }).compileComponents()

    fixture = TestBed.createComponent(MobileNavDrawer)
    fixture.componentRef.setInput('open', true)
    fixture.componentRef.setInput('navItems', [
      { label: 'Home', path: '/' },
      { label: 'About', path: '/about' },
      { label: 'Projects', path: '/projects' },
      { label: 'Writing', path: '/writing' },
      { label: 'Contact', path: '/contact' },
    ])
    await fixture.whenStable()
  })

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy()
  })

  it('renders all mobile navigation links', () => {
    const element: HTMLElement = fixture.nativeElement

    for (const label of ['Home', 'About', 'Projects', 'Writing', 'Contact']) {
      expect(element.textContent).toContain(label)
    }
  })

  it('emits navigate when a mobile link is clicked', () => {
    const navigateSpy = vi.fn()
    fixture.componentInstance.navigate.subscribe(navigateSpy)
    const firstLink = fixture.nativeElement.querySelector('a') as HTMLAnchorElement

    firstLink.click()

    expect(navigateSpy).toHaveBeenCalled()
  })
})
