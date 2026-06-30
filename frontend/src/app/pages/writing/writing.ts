import { ChangeDetectionStrategy, Component } from '@angular/core'

interface WritingTopic {
  title: string
  summary: string
  icon: string
  active?: boolean
}

interface WritingFilter {
  label: string
  summary: string
  icon: string
  active?: boolean
}

interface WritingNote {
  category: string
  title: string
  summary: string
  meta: string
  readTime: string
  icon: string
  tags: string[]
}

interface FieldNote {
  title: string
  meta: string
  readTime: string
}

@Component({
  selector: 'app-writing',
  templateUrl: './writing.html',
  styleUrl: './writing.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Writing {
  protected readonly topics: WritingTopic[] = [
    {
      title: 'Architecture',
      summary: 'Boundaries and change',
      icon: 'pi pi-sitemap',
      active: true,
    },
    {
      title: 'Reliability',
      summary: 'Signals and operations',
      icon: 'pi pi-verified',
    },
    {
      title: 'Leadership',
      summary: 'Teams and influence',
      icon: 'pi pi-users',
    },
    {
      title: 'Developer Experience',
      summary: 'Tools and flow',
      icon: 'pi pi-code',
    },
    {
      title: 'Platform Strategy',
      summary: 'Leverage and scale',
      icon: 'pi pi-database',
    },
  ]
  protected readonly filters: WritingFilter[] = [
    {
      label: 'All Notes',
      summary: 'Everything planned',
      icon: 'pi pi-sparkles',
      active: true,
    },
    {
      label: 'Essays',
      summary: 'Longer arguments',
      icon: 'pi pi-file-edit',
    },
    {
      label: 'Patterns',
      summary: 'Repeatable approaches',
      icon: 'pi pi-compass',
    },
    {
      label: 'Field Notes',
      summary: 'Short working notes',
      icon: 'pi pi-file',
    },
    {
      label: 'Playbooks',
      summary: 'Team practices',
      icon: 'pi pi-book',
    },
  ]
  protected readonly popularTags = [
    'Architecture',
    'Reliability',
    'SLOs',
    'Leadership',
    'Platform',
    'DX',
    'Observability',
    'Resilience',
    'Org Design',
    'Culture',
  ]
  protected readonly featuredNote: WritingNote = {
    category: 'Architecture',
    title: 'Designing for Change: Modular Monoliths Done Right',
    summary:
      'Practical patterns for scaling systems without premature distribution. How to keep teams fast, boundaries clear, and change safe.',
    meta: 'Planned feature note',
    readTime: '12 min preview',
    icon: 'pi pi-box',
    tags: ['Architecture', 'Modularity', 'Delivery'],
  }
  protected readonly notes: WritingNote[] = [
    this.featuredNote,
    {
      category: 'Reliability',
      title: 'SLOs That Matter',
      summary:
        'Choosing the right signals, setting meaningful targets, and building a culture of reliability.',
      meta: 'Planned reliability note',
      readTime: '9 min preview',
      icon: 'pi pi-bolt',
      tags: ['Reliability', 'SLOs'],
    },
    {
      category: 'Leadership',
      title: 'Technical Leadership Without Authority',
      summary:
        'Influence through trust, clarity, and consistency when the org chart is not the tool.',
      meta: 'Planned leadership note',
      readTime: '8 min preview',
      icon: 'pi pi-users',
      tags: ['Leadership', 'Culture'],
    },
    {
      category: 'Reliability',
      title: 'Resilience Patterns in the Real World',
      summary: 'Fallbacks, bulkheads, and timeouts that work when things go sideways.',
      meta: 'Planned field essay',
      readTime: '11 min preview',
      icon: 'pi pi-shield',
      tags: ['Resilience', 'Operations'],
    },
    {
      category: 'Developer Experience',
      title: 'Developer Experience Is a Force Multiplier',
      summary: 'Small investments that remove friction and compound over time.',
      meta: 'Planned DX note',
      readTime: '10 min preview',
      icon: 'pi pi-code',
      tags: ['DX', 'Tooling'],
    },
    {
      category: 'Platform Strategy',
      title: 'Platform Thinking: Build Once, Enable Many',
      summary: 'Designing platforms that empower teams without becoming bottlenecks.',
      meta: 'Planned platform note',
      readTime: '10 min preview',
      icon: 'pi pi-database',
      tags: ['Platform', 'Architecture'],
    },
  ]
  protected readonly fieldNotes: FieldNote[] = [
    {
      title: 'Observability as a Product, Not a Project',
      meta: 'Field note preview',
      readTime: '6 min',
    },
    {
      title: 'Runbooks That People Actually Use',
      meta: 'Field note preview',
      readTime: '6 min',
    },
    {
      title: 'The Hidden Cost of Context Switching',
      meta: 'Field note preview',
      readTime: '5 min',
    },
    {
      title: 'Incident Reviews That Drive Change',
      meta: 'Field note preview',
      readTime: '7 min',
    },
    {
      title: 'When to Say No to a Feature',
      meta: 'Field note preview',
      readTime: '4 min',
    },
    {
      title: 'Building Feedback Loops into Delivery',
      meta: 'Field note preview',
      readTime: '5 min',
    },
  ]
}
