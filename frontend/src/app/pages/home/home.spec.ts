import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Router, provideRouter } from '@angular/router'

import { Home } from './home'

describe('Home', () => {
  let component: Home
  let fixture: ComponentFixture<Home>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([])],
    }).compileComponents()

    fixture = TestBed.createComponent(Home)
    component = fixture.componentInstance
    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('opens the featured project detail from the project card', () => {
    const router = TestBed.inject(Router)
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true)

    fixture.detectChanges()

    const element: HTMLElement = fixture.nativeElement
    const projectCard = element.querySelector(
      '[aria-label="Open project details for The Code Tickler"]',
    )

    projectCard?.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(projectCard?.getAttribute('role')).toBe('link')
    expect(navigateSpy).toHaveBeenCalledWith(['/projects', 'the-code-tickler'])
  })
})
