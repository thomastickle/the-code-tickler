import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((module) => module.Home),
    title: 'The Code Tickler | Developer Portfolio',
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects/projects').then((module) => module.Projects),
    title: 'Projects | The Code Tickler',
  },
  {
    path: 'projects/:slug',
    loadComponent: () =>
      import('./pages/project-detail/project-detail').then((module) => module.ProjectDetail),
    title: 'Project | The Code Tickler',
  },
  {
    path: 'writing',
    loadComponent: () => import('./pages/writing/writing').then((module) => module.Writing),
    title: 'Writing | The Code Tickler',
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then((module) => module.Contact),
    title: 'Contact | The Code Tickler',
  },
  {
    path: '**',
    redirectTo: '',
  },
]
