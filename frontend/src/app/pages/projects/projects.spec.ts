import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Router, provideRouter } from '@angular/router'

import { Projects } from './projects'

describe('Projects', () => {
  let component: Projects
  let fixture: ComponentFixture<Projects>
  let compiled: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Projects],
      providers: [provideRouter([])],
    }).compileComponents()

    fixture = TestBed.createComponent(Projects)
    component = fixture.componentInstance
    fixture.detectChanges()
    await fixture.whenStable()
    compiled = fixture.nativeElement as HTMLElement
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('renders the compact independent-project intro', () => {
    expect(compiled.querySelector('.projects-page')).toBeTruthy()
    expect(compiled.querySelector('.projects-hero')).toBeTruthy()
    expect(compiled.textContent).toContain('Projects that move')
    expect(compiled.textContent).toContain('systems forward.')
    expect(compiled.textContent).toContain(
      'A living portfolio of software I’m building, maintaining, and refining under The Code Tickler brand.',
    )
    expect(compiled.textContent).toContain('long-term code ownership')
    expect(compiled.textContent).not.toContain('Independent projects')
    expect(compiled.textContent).not.toContain('Work samples and case-study slots')
  })

  it('shows The Code Tickler under the active section eyebrow', () => {
    const sections = Array.from(compiled.querySelectorAll('.projects-section'))
    const activeSection = sections.find((section) => section.textContent?.includes('Active'))

    expect(compiled.textContent).not.toContain('Currently working on')
    expect(activeSection?.textContent).toContain('The Code Tickler')
    expect(activeSection?.textContent).not.toContain('In progress')
    expect(activeSection?.textContent).toContain('Angular')
    expect(activeSection?.textContent).toContain('PrimeNG')
    expect(activeSection?.textContent).toContain('Tailwind CSS')
    expect(activeSection?.textContent).toContain('Cloudflare Pages')
  })

  it('does not render placeholder project content', () => {
    expect(compiled.textContent).not.toContain('Developer Tooling Showcase')
    expect(compiled.textContent).not.toContain('Production System Story')
    expect(compiled.textContent).not.toContain('Platform Modernization')
    expect(compiled.textContent).not.toContain('Observability by Design')
    expect(compiled.textContent).not.toContain('Placeholder')
  })

  it('renders source link without a site self-link for the active project', () => {
    const links = Array.from(compiled.querySelectorAll('a'))

    expect(links.some((link) => link.textContent?.includes('Site'))).toBe(false)
    expect(links.some((link) => link.href === 'https://thecodetickler.com/')).toBe(false)
    expect(
      links.some(
        (link) =>
          link.textContent?.includes('Source') &&
          link.href === 'https://github.com/thomastickle/the-code-tickler',
      ),
    ).toBe(true)
  })

  it('opens The Code Tickler detail from the project card', () => {
    const router = TestBed.inject(Router)
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true)
    const projectCard = compiled.querySelector(
      '[aria-label="Open project details for The Code Tickler"]',
    )

    projectCard?.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(projectCard?.getAttribute('role')).toBe('link')
    expect(projectCard?.getAttribute('tabindex')).toBe('0')
    expect(navigateSpy).toHaveBeenCalledWith(['/projects', 'the-code-tickler'])
  })

  it('opens The Code Tickler detail from keyboard activation', () => {
    const router = TestBed.inject(Router)
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true)
    const projectCard = compiled.querySelector(
      '[aria-label="Open project details for The Code Tickler"]',
    )

    projectCard?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))

    expect(navigateSpy).toHaveBeenCalledWith(['/projects', 'the-code-tickler'])
  })

  it('keeps empty maintained and legacy sections visible without project cards', () => {
    const sections = Array.from(compiled.querySelectorAll('.projects-section'))
    const maintainedSection = sections.find((section) =>
      section.textContent?.includes('Maintained'),
    )
    const legacySection = sections.find((section) =>
      section.textContent?.includes('Legacy (No Active Maintenance)'),
    )

    expect(maintainedSection?.textContent).toContain(
      'No maintained independent projects are listed yet.',
    )
    expect(legacySection?.textContent).toContain('No legacy independent projects are listed yet.')
    expect(maintainedSection?.querySelector('.project-card')).toBeNull()
    expect(legacySection?.querySelector('.project-card')).toBeNull()
  })
})
