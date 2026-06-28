import { ChangeDetectionStrategy, Component, computed } from '@angular/core'
import { ButtonDirective } from 'primeng/button'
import { Card } from 'primeng/card'
import { Tag } from 'primeng/tag'

import { projectSections, projects, visibleProjectStack } from '../../portfolio-data'

@Component({
  selector: 'app-projects',
  imports: [ButtonDirective, Card, Tag],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
  protected readonly visibleProjectStack = visibleProjectStack
  protected readonly projectSections = computed(() =>
    projectSections.map((section) => ({
      ...section,
      projects: projects.filter((project) => project.section === section.id),
    })),
  )
}
