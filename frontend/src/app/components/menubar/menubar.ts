import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { Button } from 'primeng/button'

@Component({
  selector: 'app-menubar',
  imports: [Button, RouterLink, RouterLinkActive],
  templateUrl: './menubar.html',
  styleUrl: './menubar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Menubar {

}
