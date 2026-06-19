import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-writing-page',
  imports: [CardModule, TagModule],
  template: `
    <section class="section-inner page-header">
      <p class="eyebrow">Writing</p>
      <h1>Notes from the workbench</h1>
      <p>
        A place for short technical notes, project writeups, and lessons learned. These placeholders can become
        posts once the site has real articles.
      </p>
    </section>

    <section class="section-inner card-grid project-grid" aria-label="Writing list">
      @for (post of posts; track post.title) {
        <p-card class="portfolio-card">
          <ng-template #title>{{ post.title }}</ng-template>
          <ng-template #subtitle>{{ post.date }}</ng-template>
          <p>{{ post.summary }}</p>
          <div class="tag-row">
            @for (tag of post.tags; track tag) {
              <p-tag [value]="tag" rounded />
            }
          </div>
        </p-card>
      }
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WritingPage {
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
