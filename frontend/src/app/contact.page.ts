import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

import { links, profile } from './portfolio-data';

@Component({
  selector: 'app-contact-page',
  imports: [ButtonModule, CardModule, TagModule],
  template: `
    <section class="section-inner page-header">
      <p class="eyebrow">Contact</p>
      <h1>Reach out without a form in the middle</h1>
      <p>
        The first version keeps contact simple: direct links, no backend, and no static form provider to maintain.
      </p>
    </section>

    <section class="section-inner contact-layout">
      <p-card class="portfolio-card contact-card">
        <ng-template #title>{{ profile.brand }}</ng-template>
        <ng-template #subtitle>{{ profile.availability }}</ng-template>
        <p>{{ profile.headline }}</p>
        <div class="tag-row">
          <p-tag [value]="profile.location" icon="pi pi-map-marker" rounded />
          <p-tag value="Cloudflare Pages-ready" icon="pi pi-cloud" severity="info" rounded />
        </div>
      </p-card>

      <div class="contact-links">
        @for (link of links; track link.label) {
          <a pButton [href]="link.href" target="_blank" rel="noopener" [label]="link.label" [icon]="link.icon"></a>
        }
        <a
          pButton
          href="mailto:hello@thecodetickler.com?subject=Resume%20request"
          label="Request resume"
          icon="pi pi-file"
          severity="secondary"
          outlined
        ></a>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPage {
  protected readonly profile = profile;
  protected readonly links = links;
}
