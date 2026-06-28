import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Card } from 'primeng/card'
import { Tag } from 'primeng/tag'

import { writingPosts } from '../../portfolio-data'

@Component({
  selector: 'app-writing',
  imports: [Card, Tag],
  templateUrl: './writing.html',
  styleUrl: './writing.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Writing {
  protected readonly posts = writingPosts
}
