import { FormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { Card } from 'primeng/card';
import { SelectButton } from 'primeng/selectbutton';
import { Tag } from 'primeng/tag';

import { projects } from '../../portfolio-data';

@Component({
  selector: 'app-projects',
  imports: [ButtonDirective, Card, FormsModule, SelectButton, Tag],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
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
