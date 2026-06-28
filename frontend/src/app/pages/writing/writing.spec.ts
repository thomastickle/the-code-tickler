import { ComponentFixture, TestBed } from '@angular/core/testing'

import { Writing } from './writing'

describe('Writing', () => {
  let component: Writing
  let fixture: ComponentFixture<Writing>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Writing],
    }).compileComponents()

    fixture = TestBed.createComponent(Writing)
    component = fixture.componentInstance
    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('renders shared writing posts', () => {
    fixture.detectChanges()

    const element: HTMLElement = fixture.nativeElement

    expect(element.textContent).toContain('How I review code')
    expect(element.textContent).toContain('Angular patterns worth keeping')
    expect(element.textContent).toContain('Small tools, real leverage')
  })

  it('renders the engineering notes intro without a separate eyebrow', () => {
    fixture.detectChanges()

    const element: HTMLElement = fixture.nativeElement

    expect(element.querySelector('.eyebrow')).toBeNull()
    expect(element.querySelector('h1')?.textContent).toContain('Engineering Notes')
    expect(element.textContent).not.toContain('Notes from the workbench')
    expect(element.textContent).toContain(
      'Practical writing about building, debugging, modernizing, and operating software.',
    )
  })
})
