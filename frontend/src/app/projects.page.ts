import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

import { projects } from './portfolio-data';

@Component({
  selector: 'app-projects-page',
  imports: [ButtonModule, CardModule, TagModule],
  template: `
    <section class="section-inner page-header">
      <p class="eyebrow">Projects</p>
      <h1>Work samples and case-study slots</h1>
      <p>
        Replace these entries with real projects as the portfolio fills in. The layout is ready for code,
        writeups, demos, and work-safe impact summaries.
      </p>
    </section>

    <section class="section-inner filter-row" aria-label="Project filters">
      @for (filter of filters; track filter) {
        <button
          pButton
          type="button"
          [label]="filter"
          [outlined]="activeFilter() !== filter"
          [severity]="activeFilter() === filter ? 'primary' : 'secondary'"
          (click)="activeFilter.set(filter)"
        ></button>
      }
    </section>

    <section class="section-inner card-grid project-grid" aria-label="Project list">
      @for (project of filteredProjects(); track project.name) {
        <p-card class="portfolio-card project-card">
          <ng-template #title>{{ project.name }}</ng-template>
          <ng-template #subtitle>{{ project.status }}</ng-template>
          <p>{{ project.summary }}</p>
          <p class="muted">{{ project.impact }}</p>
          <div class="tag-row">
            @for (tech of project.stack; track tech) {
              <p-tag [value]="tech" rounded />
            }
          </div>
          <ng-template #footer>
            <div class="link-cluster">
              @for (link of project.links; track link.label) {
                <a pButton [href]="link.href" target="_blank" rel="noopener" [label]="link.label" [icon]="link.icon" outlined></a>
              }
            </div>
          </ng-template>
        </p-card>
      }
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsPage {
  protected readonly filters = ['All', 'Angular', 'Automation', 'Architecture'];
  protected readonly activeFilter = signal('All');
  protected readonly filteredProjects = computed(() => {
    const filter = this.activeFilter();

    if (filter === 'All') {
      return projects;
    }

    return projects.filter((project) => project.stack.includes(filter));
  });
}
