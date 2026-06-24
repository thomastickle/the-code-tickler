import {Component} from '@angular/core';
import {Card} from "primeng/card"
import {Tag} from "primeng/tag"
import {Timeline} from "primeng/timeline"

import {experience, skillGroups} from '../../portfolio-data';

@Component({
  selector: 'app-about',
  imports: [
    Card,
    Tag,
    Timeline
  ],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {
  protected readonly experience = experience;
  protected readonly skillGroups = skillGroups;
}
