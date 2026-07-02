import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router'
import { BehaviorSubject } from 'rxjs'

import { ProjectDetail } from './project-detail'

describe('ProjectDetail', () => {
  let fixture: ComponentFixture<ProjectDetail>
  let paramMap: BehaviorSubject<ReturnType<typeof convertToParamMap>>

  const createComponent = async (slug: string) => {
    paramMap = new BehaviorSubject(convertToParamMap({ slug }))

    await TestBed.configureTestingModule({
      imports: [ProjectDetail],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: paramMap.asObservable(),
            snapshot: {
              paramMap: convertToParamMap({ slug }),
            },
          },
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(ProjectDetail)
    fixture.detectChanges()
    await fixture.whenStable()
  }

  afterEach(() => {
    TestBed.resetTestingModule()
  })

  it('renders The Code Tickler project detail content', async () => {
    await createComponent('the-code-tickler')

    const element: HTMLElement = fixture.nativeElement
    const sourceLink = Array.from(element.querySelectorAll('a')).find((link) =>
      link.textContent?.includes('Source'),
    )

    expect(element.textContent).toContain('The Code Tickler')
    expect(element.textContent).toContain('What this project is')
    expect(element.textContent).toContain('The Code Tickler is the working home')
    expect(element.textContent).toContain('Project stack')
    expect(sourceLink?.getAttribute('href')).toBe(
      'https://github.com/thomastickle/the-code-tickler',
    )
  })

  it('uses native glass surfaces instead of PrimeNG detail cards', async () => {
    await createComponent('the-code-tickler')

    const element: HTMLElement = fixture.nativeElement

    expect(element.querySelector('.project-detail-page')).toBeTruthy()
    expect(element.querySelectorAll('.site-panel').length).toBeGreaterThanOrEqual(2)
    expect(element.querySelector('p-card')).toBeNull()
    expect(element.querySelector('p-tag')).toBeNull()
  })

  it('hides placeholder writing and provisional note panels', async () => {
    await createComponent('the-code-tickler')

    const element: HTMLElement = fixture.nativeElement

    expect(element.textContent).not.toContain('Related writing')
    expect(element.textContent).not.toContain('Placeholder')
    expect(element.textContent).not.toContain('How I review code')
    expect(element.textContent).not.toContain('Angular patterns worth keeping')
    expect(element.textContent).not.toContain('Small tools, real leverage')
    expect(element.textContent).not.toContain('Highlights')
    expect(element.textContent).not.toContain('Ownership notes')
    expect(element.querySelector('.project-detail-grid')?.classList).not.toContain(
      'has-project-notes',
    )
  })

  it('shows a not-found state for an unknown project slug', async () => {
    await createComponent('missing-project')

    const element: HTMLElement = fixture.nativeElement

    expect(element.textContent).toContain('Project not found')
    expect(element.textContent).toContain('No project lives here yet.')
    expect(element.textContent).not.toContain('What this project is')
  })
})
