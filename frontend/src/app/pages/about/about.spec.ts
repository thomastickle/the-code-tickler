import { ComponentFixture, TestBed } from '@angular/core/testing'

import { About } from './about'

describe('About', () => {
  let component: About
  let fixture: ComponentFixture<About>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [About],
    }).compileComponents()

    fixture = TestBed.createComponent(About)
    component = fixture.componentInstance
    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('uses the shared site frame for about content', () => {
    fixture.detectChanges()

    const element: HTMLElement = fixture.nativeElement

    expect(element.querySelectorAll('.site-frame').length).toBe(2)
  })
})
