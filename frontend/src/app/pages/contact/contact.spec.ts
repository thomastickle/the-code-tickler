import { ComponentFixture, TestBed } from '@angular/core/testing'

import { Contact } from './contact'

describe('Contact', () => {
  let component: Contact
  let fixture: ComponentFixture<Contact>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contact],
    }).compileComponents()

    fixture = TestBed.createComponent(Contact)
    component = fixture.componentInstance
    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('renders the simplified contact copy', () => {
    const element: HTMLElement = fixture.nativeElement

    expect(element.textContent).toContain('Want to get in touch?')
    expect(element.textContent).toContain('Find me elsewhere.')
    expect(element.textContent).toContain('I am open to a conversation.')
  })

  it('links to GitHub and LinkedIn without email or resume actions', () => {
    const anchors = Array.from(fixture.nativeElement.querySelectorAll('a')) as HTMLAnchorElement[]
    const hrefs = anchors.map((anchor) => anchor.href)

    expect(hrefs).toContain('https://github.com/thomastickle')
    expect(hrefs).toContain('https://www.linkedin.com/in/thomas-tickle/')
    expect(hrefs.some((href) => href.startsWith('mailto:'))).toBeFalsy()
    expect(fixture.nativeElement.textContent).not.toContain('Request resume')
  })

  it('does not render removed contact prompt copy', () => {
    const element: HTMLElement = fixture.nativeElement

    expect(element.textContent).not.toContain('No contact form yet.')
    expect(element.textContent).not.toContain('Comparing approaches')
    expect(element.textContent).not.toContain('Untangling a system')
    expect(element.textContent).not.toContain('Looking for practical engineering judgment')
  })
})
