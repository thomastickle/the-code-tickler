import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { Button, ButtonDirective } from 'primeng/button'
import { Card } from 'primeng/card'
import { Tag } from 'primeng/tag'

import {
  type Project,
  links,
  profile,
  projects,
  skillGroups,
  visibleProjectStack,
} from '../../portfolio-data'

@Component({
  selector: 'app-home',
  imports: [Button, ButtonDirective, Card, RouterLink, Tag],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly router = inject(Router)
  protected readonly profile = profile
  protected readonly links = links
  protected readonly skillGroups = skillGroups
  protected readonly visibleProjectStack = visibleProjectStack
  protected readonly featuredProjects = projects
    .filter((project) => project.section === 'active')
    .slice(0, 2)

  protected openProject(project: Project): void {
    void this.router.navigate(['/projects', project.slug])
  }

  protected openProjectFromKeyboard(event: Event, project: Project): void {
    event.preventDefault()
    this.openProject(project)
  }
}
