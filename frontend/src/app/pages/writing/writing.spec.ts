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
})
