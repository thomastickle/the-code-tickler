import { ChangeDetectionStrategy, Component } from '@angular/core'

import { Menubar } from './components/menubar/menubar'

@Component({
  selector: 'app-root',
  imports: [Menubar],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
