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
      { label: 'Projects', path: '/projects' },
      { label: 'Writing', path: '/writing' },
      { label: 'Contact', path: '/contact' },
    ])
    fixture.detectChanges()
    await fixture.whenStable()
  })

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy()
  })

  it('renders all mobile navigation links', () => {
    const element: HTMLElement = fixture.nativeElement

    for (const label of ['Home', 'Projects', 'Writing', 'Contact']) {
      expect(element.textContent).toContain(label)
    }

    expect(element.textContent).not.toContain('About')
  })

  it('does not render the drawer when closed', () => {
    fixture.componentRef.setInput('open', false)
    fixture.detectChanges()

    expect(fixture.nativeElement.querySelector('.mobile-nav-drawer')).toBeNull()
  })

  it('emits openChange when closed from the close button', () => {
    const openChangeSpy = vi.fn()
    fixture.componentInstance.openChange.subscribe(openChangeSpy)
    const closeButton = fixture.nativeElement.querySelector(
      '.mobile-nav-close',
    ) as HTMLButtonElement

    closeButton.click()

    expect(openChangeSpy).toHaveBeenCalledWith(false)
  })

  it('emits navigate when a mobile link is clicked', () => {
    const navigateSpy = vi.fn()
    fixture.componentInstance.navigate.subscribe(navigateSpy)
    const firstLink = fixture.nativeElement.querySelector('a') as HTMLAnchorElement

    firstLink.click()

    expect(navigateSpy).toHaveBeenCalled()
  })
})
