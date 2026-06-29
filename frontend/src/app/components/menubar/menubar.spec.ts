import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideRouter } from '@angular/router'

import { Menubar } from './menubar'

describe('Menubar', () => {
  let component: Menubar
  let fixture: ComponentFixture<Menubar>

  beforeEach(async () => {
    localStorage.clear()

    await TestBed.configureTestingModule({
      imports: [Menubar],
      providers: [provideRouter([])],
    }).compileComponents()

    fixture = TestBed.createComponent(Menubar)
    component = fixture.componentInstance
    fixture.detectChanges()
    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
