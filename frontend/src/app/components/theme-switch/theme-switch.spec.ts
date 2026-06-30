import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ThemeSwitch } from './theme-switch'

describe('ThemeSwitch', () => {
  let fixture: ComponentFixture<ThemeSwitch>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeSwitch],
    }).compileComponents()

    fixture = TestBed.createComponent(ThemeSwitch)
    fixture.detectChanges()
  })

  it('renders as an accessible unchecked switch by default', () => {
    const button = fixture.nativeElement.querySelector('.theme-switch') as HTMLButtonElement

    expect(button.getAttribute('role')).toBe('switch')
    expect(button.getAttribute('aria-checked')).toBe('false')
    expect(button.getAttribute('aria-label')).toBe('Switch to dark mode')
    expect(button.classList).not.toContain('is-checked')
  })

  it('renders the checked state with a custom filled moon glyph', () => {
    fixture.componentRef.setInput('checked', true)
    fixture.detectChanges()

    const button = fixture.nativeElement.querySelector('.theme-switch') as HTMLButtonElement

    expect(button.getAttribute('aria-checked')).toBe('true')
    expect(button.getAttribute('aria-label')).toBe('Switch to light mode')
    expect(button.classList).toContain('is-checked')
    expect(button.querySelector('.theme-switch-thumb .theme-icon-moon')).not.toBeNull()
  })

  it('emits the next checked value when clicked', () => {
    const emitted: boolean[] = []
    const button = fixture.nativeElement.querySelector('.theme-switch') as HTMLButtonElement

    fixture.componentInstance.checkedChange.subscribe((checked) => emitted.push(checked))

    button.click()

    expect(emitted).toEqual([true])
  })

  it('supports custom action labels', () => {
    fixture.componentRef.setInput('checkedActionLabel', 'Disable dark mode')
    fixture.componentRef.setInput('uncheckedActionLabel', 'Enable dark mode')
    fixture.componentRef.setInput('checked', true)
    fixture.detectChanges()

    const button = fixture.nativeElement.querySelector('.theme-switch') as HTMLButtonElement

    expect(button.getAttribute('aria-label')).toBe('Disable dark mode')
  })
})
