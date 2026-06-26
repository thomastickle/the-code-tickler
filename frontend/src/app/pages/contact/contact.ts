import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { Card } from 'primeng/card';

import { links, profile } from '../../portfolio-data';

@Component({
  selector: 'app-contact',
  imports: [ButtonDirective, Card],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  protected readonly profile = profile;
  protected readonly links = links;
  protected readonly prompts = [
    'Comparing approaches before a build or modernization effort',
    'Untangling a system that has become hard to explain',
    'Looking for practical engineering judgment across product and implementation details',
  ];
}
