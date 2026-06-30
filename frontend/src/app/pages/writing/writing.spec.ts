import { ComponentFixture, TestBed } from '@angular/core/testing'

import { Writing } from './writing'

describe('Writing', () => {
  let component: Writing
  let fixture: ComponentFixture<Writing>
  let element: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Writing],
    }).compileComponents()

    fixture = TestBed.createComponent(Writing)
    component = fixture.componentInstance
    fixture.detectChanges()
    await fixture.whenStable()
    element = fixture.nativeElement as HTMLElement
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('renders the redesigned writing hero and topic rail', () => {
    expect(element.textContent).toContain('Notes from')
    expect(element.textContent).toContain('the Workbench')
    expect(element.textContent).toContain('Explore Topics')
    expect(element.textContent).toContain('Architecture')
    expect(element.textContent).toContain('Platform Strategy')
  })

  it('renders featured and planned note previews', () => {
    expect(element.textContent).toContain('Featured Note')
    expect(element.textContent).toContain('Designing for Change: Modular Monoliths Done Right')
    expect(element.textContent).toContain('SLOs That Matter')
    expect(element.textContent).toContain('Technical Leadership Without Authority')
    expect(element.textContent).toContain('Planned feature note')
  })

  it('renders recent field note previews', () => {
    expect(element.textContent).toContain('Recent Field Notes')
    expect(element.textContent).toContain('Observability as a Product, Not a Project')
    expect(element.textContent).toContain('Runbooks That People Actually Use')
    expect(element.textContent).toContain('Building Feedback Loops into Delivery')
  })

  it('keeps the subscribe panel visual-only', () => {
    const input = element.querySelector<HTMLInputElement>('.subscribe-preview input')
    const button = element.querySelector<HTMLButtonElement>('.subscribe-preview button')

    expect(element.textContent).toContain('Stay in the Loop')
    expect(input?.disabled).toBe(true)
    expect(button?.disabled).toBe(true)
  })
})
