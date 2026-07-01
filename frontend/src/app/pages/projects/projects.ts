import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core'
import { Router } from '@angular/router'

import { type Project, projectSections, projects, visibleProjectStack } from '../../portfolio-data'

interface ProjectStat {
  label: string
  value: string
  icon: string
}

@Component({
  selector: 'app-projects',
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
  protected readonly projectStats = computed<ProjectStat[]>(() => {
    const projectCount = projects.length
    const stackCount = new Set(projects.flatMap((project) => visibleProjectStack(project))).size
    const linkCount = projects.reduce((count, project) => count + project.links.length, 0)

    return [
      {
        label: 'Published projects',
        value: `${projectCount}`,
        icon: 'pi pi-box',
      },
      {
        label: 'Technologies shown',
        value: `${stackCount}`,
        icon: 'pi pi-code',
      },
      {
        label: 'Source links',
        value: `${linkCount}`,
        icon: 'pi pi-github',
      },
    ]
  })

  protected openProject(project: Project): void {
    void this.router.navigate(['/projects', project.slug])
  }

  protected openProjectFromKeyboard(event: Event, project: Project): void {
    event.preventDefault()
    this.openProject(project)
  }
}
