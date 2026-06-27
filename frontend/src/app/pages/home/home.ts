import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button, ButtonDirective } from 'primeng/button';
import { Card } from 'primeng/card';
import { Tag } from 'primeng/tag';

import { links, profile, projects, skillGroups, visibleProjectStack } from '../../portfolio-data';

@Component({
  selector: 'app-home',
  imports: [Button, ButtonDirective, Card, RouterLink, Tag],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly profile = profile;
  protected readonly links = links;
  protected readonly skillGroups = skillGroups;
  protected readonly visibleProjectStack = visibleProjectStack;
  protected readonly featuredProjects = projects
    .filter((project) => project.section === 'active')
    .slice(0, 2);
}
