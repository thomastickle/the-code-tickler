import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menubar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menubar.html',
  styleUrl: './menubar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Menubar {
  private readonly document = inject(DOCUMENT);
  protected readonly darkMode = signal(true);
  protected readonly navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Projects', path: '/projects' },
    { label: 'Writing', path: '/writing' },
    { label: 'Contact', path: '/contact' },
  ];

  constructor() {
    effect(() => {
      const isDark = this.darkMode();
      this.document.documentElement.classList.toggle('app-dark', isDark);
      this.document.documentElement.classList.toggle('app-light', !isDark);
    });
  }

  protected toggleTheme(): void {
    this.darkMode.update((value) => !value);
  }
}
