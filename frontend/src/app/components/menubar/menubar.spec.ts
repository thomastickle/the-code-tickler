import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { provideRouter } from '@angular/router'

import { MobileNavDrawer } from '../mobile-nav-drawer/mobile-nav-drawer'
import { Menubar } from './menubar'

const themePreferenceKey = 'the-code-tickler-theme'
const themePreferenceVersion = 1
const manualThemePreferenceMaxAgeMs = 182 * 24 * 60 * 60 * 1000
const now = new Date('2026-07-02T12:00:00.000Z').getTime()

type ThemePreference = 'dark' | 'light'

interface StoredThemePreference {
  version: typeof themePreferenceVersion
  value: ThemePreference
  selectedAt: number
  lastSeenAt: number
}

interface MatchMediaMock {
  addEventListenerSpy: ReturnType<typeof vi.fn>
  removeEventListenerSpy: ReturnType<typeof vi.fn>
  setMatches: (matches: boolean) => void
}

describe('Menubar', () => {
  let component: Menubar
  let fixture: ComponentFixture<Menubar> | undefined
  let mediaQuery: MatchMediaMock

  beforeEach(async () => {
    localStorage.clear()
    document.documentElement.classList.remove('app-dark', 'app-light')
    mediaQuery = installMatchMedia(true)
    vi.spyOn(Date, 'now').mockReturnValue(now)

    await TestBed.configureTestingModule({
      imports: [Menubar],
      providers: [provideRouter([])],
    }).compileComponents()
  })

  afterEach(() => {
    fixture?.destroy()
    localStorage.clear()
    document.documentElement.classList.remove('app-dark', 'app-light')
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('should create', async () => {
    await createMenubar()

    expect(component).toBeTruthy()
  })

  it('links the brand to the home page', async () => {
    await createMenubar()

    const element: HTMLElement = fixtureElement()
    const brandLink = element.querySelector('.brand-link') as HTMLAnchorElement
    const brandmark = brandLink.querySelector('.brandmark') as HTMLImageElement

    expect(brandLink.getAttribute('href')).toBe('/')
    expect(brandLink.textContent).toContain('The Code Tickler')
    expect(brandmark.getAttribute('src')).toBe('brandmark/brand-mark-1x.webp')
    expect(brandmark.getAttribute('srcset')).toContain('brandmark/brand-mark-2x.webp 2x')
  })

  it('renders three desktop nav links without a Home nav item', async () => {
    await createMenubar()

    const element: HTMLElement = fixtureElement()
    const links = Array.from(element.querySelectorAll('.desktop-links .nav-link'))

    expect(links.map((link) => link.textContent?.trim())).toEqual([
      'Projects',
      'Writing',
      'Contact',
    ])
    expect(links.some((link) => link.textContent?.trim() === 'Home')).toBe(false)
    expect(links.some((link) => link.textContent?.trim() === 'About')).toBe(false)
  })

  it('defaults to the OS dark preference without storing a preference', async () => {
    mediaQuery.setMatches(true)

    await createMenubar()

    const themeSwitch = fixtureElement().querySelector('.theme-switch') as HTMLButtonElement

    expect(document.documentElement.classList).toContain('app-dark')
    expect(document.documentElement.classList).not.toContain('app-light')
    expect(localStorage.getItem(themePreferenceKey)).toBeNull()
    expect(themeSwitch.getAttribute('aria-checked')).toBe('true')
    expect(themeSwitch.getAttribute('aria-label')).toBe('Switch to light mode')
  })

  it('defaults to the OS light preference without storing a preference', async () => {
    mediaQuery.setMatches(false)

    await createMenubar()

    const themeSwitch = fixtureElement().querySelector('.theme-switch') as HTMLButtonElement

    expect(document.documentElement.classList).toContain('app-light')
    expect(document.documentElement.classList).not.toContain('app-dark')
    expect(localStorage.getItem(themePreferenceKey)).toBeNull()
    expect(themeSwitch.getAttribute('aria-checked')).toBe('false')
    expect(themeSwitch.getAttribute('aria-label')).toBe('Switch to dark mode')
  })

  it('uses a custom filled moon glyph in dark mode', async () => {
    mediaQuery.setMatches(true)

    await createMenubar()

    const element: HTMLElement = fixtureElement()

    expect(element.querySelector('.theme-switch-thumb .theme-icon-moon')).not.toBeNull()
  })

  it('writes a JSON manual preference when the theme switch changes', async () => {
    mediaQuery.setMatches(true)

    await createMenubar()

    const themeSwitch = fixtureElement().querySelector('.theme-switch') as HTMLElement

    themeSwitch.click()
    fixture?.detectChanges()
    await fixture?.whenStable()

    expect(readStoredThemePreference()).toEqual({
      version: themePreferenceVersion,
      value: 'light',
      selectedAt: now,
      lastSeenAt: now,
    })
    expect(document.documentElement.classList).toContain('app-light')
  })

  it('uses a valid manual preference over the OS preference and refreshes lastSeenAt', async () => {
    const selectedAt = now - 30 * 24 * 60 * 60 * 1000
    const lastSeenAt = now - 10 * 24 * 60 * 60 * 1000

    mediaQuery.setMatches(true)
    localStorage.setItem(themePreferenceKey, serializePreference('light', selectedAt, lastSeenAt))

    await createMenubar()

    expect(document.documentElement.classList).toContain('app-light')
    expect(document.documentElement.classList).not.toContain('app-dark')
    expect(readStoredThemePreference()).toEqual({
      version: themePreferenceVersion,
      value: 'light',
      selectedAt,
      lastSeenAt: now,
    })
  })

  it('expires an old manual preference and uses the OS default', async () => {
    mediaQuery.setMatches(true)
    localStorage.setItem(
      themePreferenceKey,
      serializePreference(
        'light',
        now - manualThemePreferenceMaxAgeMs,
        now - manualThemePreferenceMaxAgeMs - 1,
      ),
    )

    await createMenubar()

    expect(document.documentElement.classList).toContain('app-dark')
    expect(document.documentElement.classList).not.toContain('app-light')
    expect(localStorage.getItem(themePreferenceKey)).toBeNull()
  })

  it('restores and upgrades a legacy raw dark preference', async () => {
    await expectLegacyRawPreferenceUpgrade('dark')
  })

  it('restores and upgrades a legacy raw light preference', async () => {
    await expectLegacyRawPreferenceUpgrade('light')
  })

  it('responds to live OS color scheme changes while using the system default', async () => {
    mediaQuery.setMatches(false)

    await createMenubar()

    expect(document.documentElement.classList).toContain('app-light')

    mediaQuery.setMatches(true)
    fixture?.detectChanges()
    await fixture?.whenStable()

    const themeSwitch = fixtureElement().querySelector('.theme-switch') as HTMLButtonElement

    expect(document.documentElement.classList).toContain('app-dark')
    expect(document.documentElement.classList).not.toContain('app-light')
    expect(localStorage.getItem(themePreferenceKey)).toBeNull()
    expect(themeSwitch.getAttribute('aria-checked')).toBe('true')
  })

  it('ignores live OS color scheme changes after a manual preference is set', async () => {
    mediaQuery.setMatches(true)

    await createMenubar()

    const themeSwitch = fixtureElement().querySelector('.theme-switch') as HTMLElement

    themeSwitch.click()
    fixture?.detectChanges()
    await fixture?.whenStable()

    mediaQuery.setMatches(false)
    mediaQuery.setMatches(true)
    fixture?.detectChanges()
    await fixture?.whenStable()

    expect(document.documentElement.classList).toContain('app-light')
    expect(document.documentElement.classList).not.toContain('app-dark')
    expect(readStoredThemePreference().value).toBe('light')
  })

  it('cleans up the OS color scheme listener when destroyed', async () => {
    await createMenubar()

    expect(mediaQuery.addEventListenerSpy).toHaveBeenCalledWith('change', expect.any(Function))

    fixture?.destroy()
    fixture = undefined

    expect(mediaQuery.removeEventListenerSpy).toHaveBeenCalledWith('change', expect.any(Function))
  })

  it('opens and closes the mobile navigation drawer', async () => {
    await createMenubar()

    const menuButton = fixtureElement().querySelector('.mobile-menu-button') as HTMLButtonElement

    menuButton.click()
    fixture?.detectChanges()
    await fixture?.whenStable()

    const drawer = fixture?.debugElement.query(By.directive(MobileNavDrawer))
      .componentInstance as MobileNavDrawer

    expect(drawer.open()).toBe(true)

    drawer.navigate.emit()
    fixture?.detectChanges()
    await fixture?.whenStable()

    expect(drawer.open()).toBe(false)
  })

  async function createMenubar(): Promise<void> {
    fixture = TestBed.createComponent(Menubar)
    component = fixture.componentInstance
    fixture.detectChanges()
    await fixture.whenStable()
  }

  function fixtureElement(): HTMLElement {
    return fixture?.nativeElement as HTMLElement
  }

  async function expectLegacyRawPreferenceUpgrade(
    legacyPreference: ThemePreference,
  ): Promise<void> {
    mediaQuery.setMatches(legacyPreference === 'light')
    localStorage.setItem(themePreferenceKey, legacyPreference)

    await createMenubar()

    expect(document.documentElement.classList).toContain(`app-${legacyPreference}`)
    expect(readStoredThemePreference()).toEqual({
      version: themePreferenceVersion,
      value: legacyPreference,
      selectedAt: now,
      lastSeenAt: now,
    })
  }
})

function installMatchMedia(initialMatches: boolean): MatchMediaMock {
  let matches = initialMatches
  const listeners = new Set<(event: MediaQueryListEvent) => void>()
  const addEventListenerSpy = vi.fn(
    (type: string, listener: EventListenerOrEventListenerObject) => {
      if (type === 'change' && typeof listener === 'function') {
        listeners.add(listener as (event: MediaQueryListEvent) => void)
      }
    },
  )
  const removeEventListenerSpy = vi.fn(
    (type: string, listener: EventListenerOrEventListenerObject) => {
      if (type === 'change' && typeof listener === 'function') {
        listeners.delete(listener as (event: MediaQueryListEvent) => void)
      }
    },
  )

  const mediaQueryList = {
    get matches(): boolean {
      return matches
    },
    media: '(prefers-color-scheme: dark)',
    onchange: null,
    addEventListener: addEventListenerSpy,
    removeEventListener: removeEventListenerSpy,
    dispatchEvent: (event: Event): boolean => {
      listeners.forEach((listener) => listener(event as MediaQueryListEvent))

      return true
    },
    addListener: vi.fn(),
    removeListener: vi.fn(),
  } as MediaQueryList

  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue(mediaQueryList))

  return {
    addEventListenerSpy,
    removeEventListenerSpy,
    setMatches: (nextMatches: boolean): void => {
      matches = nextMatches
      mediaQueryList.dispatchEvent({
        matches,
        media: mediaQueryList.media,
      } as MediaQueryListEvent)
    },
  }
}

function serializePreference(
  value: ThemePreference,
  selectedAt: number,
  lastSeenAt: number,
): string {
  return JSON.stringify({
    version: themePreferenceVersion,
    value,
    selectedAt,
    lastSeenAt,
  } satisfies StoredThemePreference)
}

function readStoredThemePreference(): StoredThemePreference {
  const preference = localStorage.getItem(themePreferenceKey)

  expect(preference).not.toBeNull()

  return JSON.parse(preference ?? '{}') as StoredThemePreference
}
