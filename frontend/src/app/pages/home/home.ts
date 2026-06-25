import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

import { links, profile, projects, skillGroups } from '../../portfolio-data';

@Component({
  selector: 'app-home',
  imports: [ButtonModule, CardModule, RouterLink, TagModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly profile = profile;
  protected readonly links = links;
  protected readonly skillGroups = skillGroups;
  protected readonly featuredProjects = projects.slice(0, 2);
}
