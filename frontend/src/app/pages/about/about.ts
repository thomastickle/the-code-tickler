import { Component } from '@angular/core';
import { Card } from 'primeng/card';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'app-about',
  imports: [Card, Tag],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  protected readonly byline = 'I help real-world software systems become clearer, faster, safer, and easier to change.';

  protected readonly statements = [
    {
      label: 'The name',
      text:
        'The Code Tickler is a playful name, a nod to my last name and to a serious engineering habit: finding the small pressure points in a system that make everything else work better.',
    },
    {
      label: 'The work',
      text:
        'Sometimes that means untangling legacy code. Sometimes it means finding the query, queue, cache, deployment path, workflow, or design assumption that is quietly holding the system back.',
    },
    {
      label: 'The system',
      text:
        'Sometimes the system is not just software. It can be architecture, business process, developer experience, team workflow, or the space where all of those things overlap.',
    },
  ];

  protected readonly capabilities = [
    {
      icon: 'pi pi-sitemap',
      title: 'Make systems easier to reason about',
      summary:
        'I have spent 20+ years building, modernizing, and operating production systems where clarity matters as much as cleverness.',
      tags: ['Architecture', 'Legacy code', 'Maintainability'],
    },
    {
      icon: 'pi pi-server',
      title: 'Work across product and platform edges',
      summary:
        'My work has covered Java and Spring platforms, Angular applications, Kubernetes migrations, search, data pipelines, and operational debugging.',
      tags: ['Java', 'Spring', 'Angular', 'Kubernetes'],
    },
    {
      icon: 'pi pi-users',
      title: 'Help teams ship with better judgment',
      summary:
        'I enjoy the messy middle where new requirements, reliability, delivery pressure, production reality, and team constraints all meet.',
      tags: ['Technical leadership', 'Mentoring', 'Delivery'],
    },
  ];
}
