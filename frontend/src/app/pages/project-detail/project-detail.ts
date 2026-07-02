import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute, RouterLink } from '@angular/router'
import { map } from 'rxjs'

import {
  type Project,
  projectBySlug,
  relatedWritingForProject,
  visibleProjectStack,
} from '../../portfolio-data'

const placeholderDate = 'Placeholder'

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetail {
  private readonly route = inject(ActivatedRoute)
  private readonly slug = toSignal(this.route.paramMap.pipe(map((params) => params.get('slug'))), {
    initialValue: this.route.snapshot.paramMap.get('slug'),
  })

  protected readonly visibleProjectStack = visibleProjectStack
  protected readonly project = computed(() => projectBySlug(this.slug()))
  protected readonly relatedWriting = computed(() => {
    const project = this.project()

    return project
      ? relatedWritingForProject(project).filter((post) => post.date !== placeholderDate)
      : []
  })

  protected hasProjectNotes(project: Project): boolean {
    return (
      this.projectHighlights(project).length > 0 || this.projectOwnershipNotes(project).length > 0
    )
  }

  protected projectHighlights(project: Project): string[] {
    return project.detail.highlights ?? []
  }

  protected projectOwnershipNotes(project: Project): string[] {
    return project.detail.ownershipNotes ?? []
  }
}
