import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home.page').then((module) => module.HomePage),
    title: 'The Code Tickler | Developer Portfolio',
  },
  {
    path: 'about',
    loadComponent: () => import('./experience.page').then((module) => module.ExperiencePage),
    title: 'About | The Code Tickler',
  },
  {
    path: 'experience',
    redirectTo: 'about',
  },
  {
    path: 'projects',
    loadComponent: () => import('./projects.page').then((module) => module.ProjectsPage),
    title: 'Projects | The Code Tickler',
  },
  {
    path: 'writing',
    loadComponent: () => import('./writing.page').then((module) => module.WritingPage),
    title: 'Writing | The Code Tickler',
  },
  {
    path: 'contact',
    loadComponent: () => import('./contact.page').then((module) => module.ContactPage),
    title: 'Contact | The Code Tickler',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
