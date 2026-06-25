import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

import { links, profile } from '../../portfolio-data';

@Component({
  selector: 'app-contact',
  imports: [ButtonModule, CardModule, TagModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  protected readonly profile = profile;
  protected readonly links = links;
}
