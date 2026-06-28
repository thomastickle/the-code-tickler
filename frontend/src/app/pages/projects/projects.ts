import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core'
import { Router } from '@angular/router'
import { ButtonDirective } from 'primeng/button'
import { Card } from 'primeng/card'
import { Tag } from 'primeng/tag'

import { type Project, projectSections, projects, visibleProjectStack } from '../../portfolio-data'

@Component({
  selector: 'app-projects',
  imports: [ButtonDirective, Card, Tag],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
  private readonly router = inject(Router)
  protected readonly visibleProjectStack = visibleProjectStack
  protected readonly projectSections = computed(() =>
    projectSections.map((section) => ({
      ...section,
      projects: projects.filter((project) => project.section === section.id),
    })),
  )

  protected openProject(project: Project): void {
    void this.router.navigate(['/projects', project.slug])
  }

  protected openProjectFromKeyboard(event: Event, project: Project): void {
    event.preventDefault()
    this.openProject(project)
  }
}
