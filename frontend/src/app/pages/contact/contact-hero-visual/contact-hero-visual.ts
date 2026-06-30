import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-contact-hero-visual',
  templateUrl: './contact-hero-visual.html',
  styleUrl: './contact-hero-visual.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactHeroVisual {}
