import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Drawer } from 'primeng/drawer';

export interface NavItem {
  label: string;
  path: string;
}

@Component({
  selector: 'app-mobile-nav-drawer',
  imports: [Drawer, RouterLink, RouterLinkActive],
  templateUrl: './mobile-nav-drawer.html',
  styleUrl: './mobile-nav-drawer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileNavDrawer {
  readonly open = input.required<boolean>();
  readonly navItems = input.required<readonly NavItem[]>();
  readonly openChange = output<boolean>();
  readonly navigate = output<void>();
}
