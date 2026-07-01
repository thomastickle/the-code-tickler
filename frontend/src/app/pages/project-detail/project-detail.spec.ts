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

    expect(element.textContent).toContain('The Code Tickler')
    expect(element.textContent).toContain('What this project is')
    expect(element.textContent).toContain('Cloudflare Pages-oriented static deployment')
    expect(element.textContent).toContain('Project stack')
  })

  it('uses native glass surfaces instead of PrimeNG detail cards', async () => {
    await createComponent('the-code-tickler')

    const element: HTMLElement = fixture.nativeElement

    expect(element.querySelector('.project-detail-page')).toBeTruthy()
    expect(element.querySelectorAll('.site-panel').length).toBeGreaterThanOrEqual(4)
    expect(element.querySelector('p-card')).toBeNull()
    expect(element.querySelector('p-tag')).toBeNull()
  })

  it('renders related writing tied to The Code Tickler', async () => {
    await createComponent('the-code-tickler')

    const element: HTMLElement = fixture.nativeElement

    expect(element.textContent).toContain('Related writing')
    expect(element.textContent).toContain('How I review code')
    expect(element.textContent).toContain('Angular patterns worth keeping')
    expect(element.textContent).not.toContain('Small tools, real leverage')
  })

  it('shows a not-found state for an unknown project slug', async () => {
    await createComponent('missing-project')

    const element: HTMLElement = fixture.nativeElement

    expect(element.textContent).toContain('Project not found')
    expect(element.textContent).toContain('No project lives here yet.')
    expect(element.textContent).not.toContain('What this project is')
  })
})
