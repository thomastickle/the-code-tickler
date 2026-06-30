import { DOCUMENT } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { RouterLink } from '@angular/router'

import { ContactHeroVisual } from './contact-hero-visual/contact-hero-visual'

type ContactTopicId =
  | 'modernization'
  | 'reliability'
  | 'leadership'
  | 'architecture'
  | 'engineering'

interface ContactMethod {
  label: string
  value: string
  description: string
  icon: string
  href?: string
  external?: boolean
  status?: 'available'
}

interface ContactFocus {
  label: string
  summary: string
  icon: string
}

interface ContactTopic {
  id: ContactTopicId
  title: string
  summary: string
  icon: string
  tags: readonly string[]
}

@Component({
  selector: 'app-contact',
  imports: [ContactHeroVisual, ReactiveFormsModule, RouterLink],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  private readonly document = inject(DOCUMENT)
  private readonly formBuilder = inject(NonNullableFormBuilder)
  protected readonly contactEmail = 'hello@thecodetickler.dev'
  protected readonly contactForm = this.formBuilder.group({
    name: this.formBuilder.control('', { validators: [Validators.required] }),
    email: this.formBuilder.control('', { validators: [Validators.required, Validators.email] }),
    company: this.formBuilder.control(''),
    topic: this.formBuilder.control<ContactTopicId>('modernization', {
      validators: [Validators.required],
    }),
    message: this.formBuilder.control('', { validators: [Validators.required] }),
    followUp: this.formBuilder.control(true),
  })
  protected readonly focusItems: readonly ContactFocus[] = [
    {
      label: 'Senior perspective',
      summary: 'Strategy, architecture, and clear trade-offs.',
      icon: 'pi pi-star',
    },
    {
      label: 'Hands-on leader',
      summary: 'Ship value, mentor teams, and elevate engineering.',
      icon: 'pi pi-user',
    },
    {
      label: 'Outcome focused',
      summary: 'Reliability, performance, and long-term impact.',
      icon: 'pi pi-shield',
    },
  ]
  protected readonly contactMethods: readonly ContactMethod[] = [
    {
      label: 'Email',
      value: this.contactEmail,
      description: 'Best for detailed conversations',
      icon: 'pi pi-envelope',
      href: `mailto:${this.contactEmail}`,
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/thomas-tickle',
      description: 'Professional profile and updates',
      icon: 'pi pi-linkedin',
      href: 'https://www.linkedin.com/in/thomas-tickle/',
      external: true,
    },
    {
      label: 'GitHub',
      value: 'github.com/thomastickle',
      description: 'Code, projects, and ideas',
      icon: 'pi pi-github',
      href: 'https://github.com/thomastickle',
      external: true,
    },
    {
      label: 'Availability',
      value: 'Open to new opportunities',
      description: 'Full-time roles, fractional, and advisory',
      icon: 'pi pi-clock',
      status: 'available',
    },
  ]
  protected readonly topics: readonly ContactTopic[] = [
    {
      id: 'modernization',
      title: 'Platform Modernization',
      summary: 'Re-architecting and evolving platforms for speed, safety, and maintainability.',
      icon: 'pi pi-database',
      tags: ['Monoliths', 'Cloud', 'K8s'],
    },
    {
      id: 'reliability',
      title: 'Reliability & Performance',
      summary: 'Building resilient systems with observability, SLOs, and production feedback.',
      icon: 'pi pi-chart-line',
      tags: ['SLOs', 'Observability', 'Perf'],
    },
    {
      id: 'leadership',
      title: 'Staff / Tech Lead Roles',
      summary: 'Leading engineers, aligning teams, and driving technical excellence.',
      icon: 'pi pi-users',
      tags: ['Leadership', 'Mentorship', 'IC+'],
    },
    {
      id: 'architecture',
      title: 'Architecture Reviews',
      summary: 'System design, trade-offs, and architecture reviews that de-risk decisions.',
      icon: 'pi pi-sitemap',
      tags: ['Architecture', 'Design', 'ADR'],
    },
    {
      id: 'engineering',
      title: 'Engineering Leadership',
      summary: 'Helping organizations level up engineering culture, process, and ways of working.',
      icon: 'pi pi-verified',
      tags: ['Culture', 'Process', 'Ops'],
    },
  ]

  protected sendMessage(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched()
      return
    }

    this.document.defaultView?.location.assign(this.buildMailtoHref())
  }

  protected buildMailtoHref(): string {
    const value = this.contactForm.getRawValue()
    const topic = this.topics.find((item) => item.id === value.topic)
    const subject = `The Code Tickler contact: ${topic?.title ?? 'New conversation'}`
    const body = [
      `Name: ${value.name}`,
      `Email: ${value.email}`,
      value.company ? `Company: ${value.company}` : 'Company: Not provided',
      `Topic: ${topic?.title ?? value.topic}`,
      `Open to follow-up: ${value.followUp ? 'Yes' : 'No'}`,
      '',
      value.message,
    ].join('\n')

    return `mailto:${this.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }
}
