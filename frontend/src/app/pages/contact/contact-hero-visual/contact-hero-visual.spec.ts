import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ContactHeroVisual } from './contact-hero-visual'

describe('ContactHeroVisual', () => {
  let component: ContactHeroVisual
  let fixture: ComponentFixture<ContactHeroVisual>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactHeroVisual],
    }).compileComponents()

    fixture = TestBed.createComponent(ContactHeroVisual)
    component = fixture.componentInstance
    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('renders the layered hero mark visual', () => {
    const element: HTMLElement = fixture.nativeElement

    expect(element.querySelector('.contact-visual')).toBeTruthy()
    expect(element.querySelector('svg.hero-mark')).toBeTruthy()
  })
})
