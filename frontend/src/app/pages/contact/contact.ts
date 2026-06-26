import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { Card } from 'primeng/card';
import { Tag } from 'primeng/tag';

import { links, profile } from '../../portfolio-data';

@Component({
  selector: 'app-contact',
  imports: [ButtonDirective, Card, Tag],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  protected readonly profile = profile;
  protected readonly links = links;
}
