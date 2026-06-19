import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

import { links, profile, projects, skillGroups } from './portfolio-data';

@Component({
  selector: 'app-home-page',
  imports: [ButtonModule, CardModule, RouterLink, TagModule],
  template: `
    <section class="hero section-band">
      <div class="section-inner hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">Gentle prodding for cleaner, happier code</p>
          <h1>{{ profile.brand }}</h1>
          <p class="hero-lede">
            Developer portfolio, project notes, and practical engineering work with Angular, TypeScript,
            backend systems, and the occasional well-placed feather.
          </p>
          <div class="hero-actions" aria-label="Primary actions">
            <p-button label="Write Better Code" icon="pi pi-terminal" routerLink="/projects" />
            <p-button label="Get in Touch" icon="pi pi-send" severity="secondary" outlined routerLink="/contact" />
          </div>
        </div>

        <div class="hero-visual" aria-label="Code Tickler visual">
          <img src="code-tickler-hero.png" alt="The Code Tickler illustrated developer with floating code cards">
          <div class="floating-card spring">
            <strong>Spring Boot</strong>
            <code>&#64;GetMapping("/&#123;id&#125;")</code>
          </div>
          <div class="floating-card angular">
            <strong>Angular</strong>
            <code>&#64;Component(&#123; selector: 'user-card' &#125;)</code>
          </div>
        </div>
      </div>
    </section>

    <section class="section-inner content-section">
      <div class="section-heading">
        <p class="eyebrow">Featured work</p>
        <h2>Projects with clear intent</h2>
        <a routerLink="/projects" class="text-link">All projects <i class="pi pi-arrow-right" aria-hidden="true"></i></a>
      </div>

      <div class="card-grid">
        @for (project of featuredProjects; track project.name) {
          <p-card class="portfolio-card">
            <ng-template #title>{{ project.name }}</ng-template>
            <ng-template #subtitle>{{ project.status }}</ng-template>
            <p>{{ project.summary }}</p>
            <p class="muted">{{ project.impact }}</p>
            <div class="tag-row" aria-label="Project stack">
              @for (tech of project.stack; track tech) {
                <p-tag [value]="tech" severity="secondary" rounded />
              }
            </div>
          </p-card>
        }
      </div>
    </section>

    <section class="section-inner content-section">
      <div class="section-heading">
        <p class="eyebrow">How I work</p>
        <h2>Useful software, delivered plainly</h2>
      </div>
      <div class="skill-grid">
        @for (group of skillGroups; track group.name) {
          <article class="skill-block">
            <h3>{{ group.name }}</h3>
            <div class="tag-row">
              @for (skill of group.skills; track skill) {
                <p-tag [value]="skill" rounded />
              }
            </div>
          </article>
        }
      </div>
    </section>

    <section class="section-inner contact-strip" aria-label="Contact links">
      <div>
        <p class="eyebrow">Next step</p>
        <h2>Start with a conversation.</h2>
      </div>
      <div class="link-cluster">
        @for (link of links; track link.label) {
          <a pButton [href]="link.href" target="_blank" rel="noopener" [label]="link.label" [icon]="link.icon"></a>
        }
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  protected readonly profile = profile;
  protected readonly links = links;
  protected readonly skillGroups = skillGroups;
  protected readonly featuredProjects = projects.slice(0, 2);
}
