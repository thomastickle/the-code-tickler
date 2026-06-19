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
    <section class="section-band grid min-h-[clamp(34rem,78vh,44rem)] items-center overflow-hidden py-12 md:py-20 lg:py-24">
      <div class="mx-auto grid w-[min(1120px,calc(100%_-_2rem))] items-center gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.75fr)] lg:gap-20">
        <div>
          <p class="eyebrow">Gentle prodding for cleaner, happier code</p>
          <h1 class="m-0 max-w-[12ch] text-[clamp(3rem,11vw,7rem)] font-black leading-[0.92] drop-shadow-[0_0_34px_rgba(139,92,246,0.26)]">
            {{ profile.brand }}
          </h1>
          <p class="max-w-3xl text-[clamp(1.05rem,2.2vw,1.35rem)] leading-relaxed text-[var(--muted)]">
            Developer portfolio, project notes, and practical engineering work with Angular, TypeScript,
            backend systems, and the occasional well-placed feather.
          </p>
          <div class="mt-8 flex flex-wrap items-center gap-3" aria-label="Primary actions">
            <p-button label="Write Better Code" icon="pi pi-terminal" routerLink="/projects" />
            <p-button label="Get in Touch" icon="pi pi-send" severity="secondary" outlined routerLink="/contact" />
          </div>
        </div>

        <div class="hero-visual" aria-label="Code Tickler visual">
          <img
            src="code-tickler-hero-1440.webp"
            srcset="code-tickler-hero-960.webp 960w, code-tickler-hero-1440.webp 1440w, code-tickler-hero-1920.webp 1920w, code-tickler-hero-2560.webp 2560w"
            sizes="(max-width: 768px) 190vw, (max-width: 1440px) 110vw, 68rem"
            width="1440"
            height="810"
            alt="The Code Tickler illustrated developer with floating code cards"
          >
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

    <section class="mx-auto w-[min(1120px,calc(100%_-_2rem))] py-12 md:py-20">
      <div class="mb-6 flex items-end justify-between gap-4 max-md:flex-col max-md:items-start">
        <div>
          <p class="eyebrow">Featured work</p>
          <h2 class="m-0 text-[clamp(2rem,5vw,3.25rem)] leading-none">Projects with clear intent</h2>
        </div>
        <a routerLink="/projects" class="text-link">All projects <i class="pi pi-arrow-right" aria-hidden="true"></i></a>
      </div>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
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

    <section class="mx-auto w-[min(1120px,calc(100%_-_2rem))] py-12 md:py-20">
      <div class="mb-6">
        <p class="eyebrow">How I work</p>
        <h2 class="m-0 text-[clamp(2rem,5vw,3.25rem)] leading-none">Useful software, delivered plainly</h2>
      </div>
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
        @for (group of skillGroups; track group.name) {
          <article class="rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-5">
            <h3 class="m-0 mb-4">{{ group.name }}</h3>
            <div class="tag-row">
              @for (skill of group.skills; track skill) {
                <p-tag [value]="skill" rounded />
              }
            </div>
          </article>
        }
      </div>
    </section>

    <section
      class="mx-auto mb-12 flex w-[min(1120px,calc(100%_-_2rem))] items-center justify-between gap-6 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-5 md:mb-20 max-md:flex-col max-md:items-start"
      aria-label="Contact links"
    >
      <div>
        <p class="eyebrow">Next step</p>
        <h2 class="m-0 text-[clamp(2rem,5vw,3.25rem)] leading-none">Start with a conversation.</h2>
      </div>
      <div class="flex flex-wrap items-center gap-3">
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
