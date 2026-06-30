import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideRouter } from '@angular/router'

import { Contact } from './contact'

describe('Contact', () => {
  let component: Contact
  let fixture: ComponentFixture<Contact>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contact],
      providers: [provideRouter([])],
    }).compileComponents()

    fixture = TestBed.createComponent(Contact)
    component = fixture.componentInstance
    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('renders the contact page hero and contact methods', () => {
    const element: HTMLElement = fixture.nativeElement

    expect(element.textContent).toContain('Open to meaningful')
    expect(element.textContent).toContain('problems and good teams.')
    expect(element.textContent).toContain('Get in touch')
    expect(element.textContent).toContain('Send a message')
    expect(element.textContent).toContain('hello@thecodetickler.dev')
  })

  it('renders the expected contact links and conversation topics', () => {
    const element: HTMLElement = fixture.nativeElement
    const anchors = Array.from(fixture.nativeElement.querySelectorAll('a')) as HTMLAnchorElement[]
    const hrefs = anchors.map((anchor) => anchor.href)

    expect(hrefs).toContain('https://github.com/thomastickle')
    expect(hrefs).toContain('https://www.linkedin.com/in/thomas-tickle/')
    expect(hrefs).toContain('mailto:hello@thecodetickler.dev')
    expect(element.textContent).toContain('Platform Modernization')
    expect(element.textContent).toContain('Reliability & Performance')
    expect(element.textContent).toContain('Engineering Leadership')
  })

  it('renders all frontend-only message fields', () => {
    const element: HTMLElement = fixture.nativeElement

    expect(element.querySelector('input[formcontrolname="name"]')).toBeTruthy()
    expect(element.querySelector('input[formcontrolname="email"]')).toBeTruthy()
    expect(element.querySelector('input[formcontrolname="company"]')).toBeTruthy()
    expect(element.querySelector('select[formcontrolname="topic"]')).toBeTruthy()
    expect(element.querySelector('textarea[formcontrolname="message"]')).toBeTruthy()
    expect(element.querySelector('input[formcontrolname="followUp"]')).toBeTruthy()
  })

  it('builds a mailto draft from the form values', () => {
    const harness = component as unknown as {
      contactForm: {
        setValue: (value: {
          name: string
          email: string
          company: string
          topic: string
          message: string
          followUp: boolean
        }) => void
      }
      buildMailtoHref: () => string
    }

    harness.contactForm.setValue({
      name: 'A Builder',
      email: 'builder@example.com',
      company: 'Example Co',
      topic: 'architecture',
      message: 'Can you review a system design?',
      followUp: true,
    })

    const href = decodeURIComponent(harness.buildMailtoHref())

    expect(href).toContain('mailto:hello@thecodetickler.dev')
    expect(href).toContain('The Code Tickler contact: Architecture Reviews')
    expect(href).toContain('Name: A Builder')
    expect(href).toContain('Can you review a system design?')
  })
})
