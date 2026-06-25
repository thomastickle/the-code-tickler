import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-writing',
  imports: [CardModule, TagModule],
  templateUrl: './writing.html',
  styleUrl: './writing.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Writing {
  protected readonly posts = [
    {
      title: 'How I review code',
      date: 'Placeholder',
      summary: 'A future note about reading for behavior, maintainability, and product fit.',
      tags: ['Code review', 'Delivery'],
    },
    {
      title: 'Angular patterns worth keeping',
      date: 'Placeholder',
      summary: 'A future writeup about component boundaries, signals, and practical UI state.',
      tags: ['Angular', 'TypeScript'],
    },
    {
      title: 'Small tools, real leverage',
      date: 'Placeholder',
      summary: 'A future case study on developer tooling that removes repetitive work.',
      tags: ['Automation', 'Tooling'],
    },
  ];
}
