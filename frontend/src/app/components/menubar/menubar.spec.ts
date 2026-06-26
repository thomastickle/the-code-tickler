import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Menubar } from './menubar';

describe('Menubar', () => {
  let component: Menubar;
  let fixture: ComponentFixture<Menubar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Menubar],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Menubar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders a mobile menu button', () => {
    const button = fixture.nativeElement.querySelector('[aria-label="Open navigation menu"]');

    expect(button).toBeTruthy();
  });

  it('renders desktop navigation links', () => {
    const element: HTMLElement = fixture.nativeElement;
    const labels = ['Home', 'About', 'Projects', 'Writing', 'Contact'];

    for (const label of labels) {
      expect(element.textContent).toContain(label);
    }
  });

  it('opens and closes the mobile menu', () => {
    component['openMobileMenu']();
    fixture.detectChanges();

    expect(component['mobileMenuLoaded']()).toBe(true);
    expect(component['mobileMenuOpen']()).toBe(true);

    component['updateMobileMenuVisibility'](false);
    fixture.detectChanges();

    expect(component['mobileMenuOpen']()).toBe(false);
  });
});
