export interface LinkItem {
  label: string;
  href: string;
  icon: string;
}

export interface Project {
  name: string;
  status: string;
  summary: string;
  impact: string;
  stack: string[];
  links: LinkItem[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  summary: string;
  wins: string[];
}

export interface SkillGroup {
  name: string;
  skills: string[];
}

export const profile = {
  brand: 'The Code Tickler',
  headline: 'Developer portfolio for thoughtful, practical software work.',
  intro:
    'A playful brand for serious engineering: clear systems, maintainable code, and user-facing details that hold up after launch.',
  availability: 'Open to developer conversations',
};

export const links: LinkItem[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/thomastickle',
    icon: 'pi pi-github',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/thomas-tickle/',
    icon: 'pi pi-linkedin',
  },
];

export const projects: Project[] = [
  {
    name: 'Portfolio Platform',
    status: 'In progress',
    summary: 'A fast Angular and PrimeNG portfolio built for Cloudflare Pages.',
    impact: 'Shows frontend architecture, deployment awareness, and polished product judgment.',
    stack: ['Angular', 'PrimeNG', 'TypeScript', 'Cloudflare Pages'],
    links: [
      {
        label: 'Site',
        href: 'https://thecodetickler.com',
        icon: 'pi pi-external-link',
      },
    ],
  },
  {
    name: 'Developer Tooling Showcase',
    status: 'Placeholder',
    summary: 'Replace this with a tool, automation project, integration, or internal platform you built.',
    impact: 'Describe the before-and-after: time saved, defects reduced, or decisions clarified.',
    stack: ['TypeScript', 'APIs', 'Automation'],
    links: [
      {
        label: 'Repository',
        href: 'https://github.com/thecodetickler',
        icon: 'pi pi-github',
      },
    ],
  },
  {
    name: 'Production System Story',
    status: 'Placeholder',
    summary: 'Use this slot for a work-safe case study about scaling, reliability, or user workflow design.',
    impact: 'Focus on ownership, tradeoffs, and the measurable result without exposing private details.',
    stack: ['Architecture', 'Testing', 'Observability'],
    links: [
      {
        label: 'Notes',
        href: 'mailto:hello@thecodetickler.com?subject=Production%20system%20story',
        icon: 'pi pi-send',
      },
    ],
  },
];

export const experience: ExperienceItem[] = [
  {
    period: 'Recent',
    role: 'Software Developer',
    company: 'Replace with current or latest role',
    summary: 'Builds and improves applications with a bias toward clear behavior and maintainable systems.',
    wins: ['Turns ambiguous needs into shippable slices', 'Keeps implementation details visible and testable'],
  },
  {
    period: 'Earlier',
    role: 'Application Engineer',
    company: 'Replace with prior team',
    summary: 'Worked across frontend, backend, and integration boundaries to make everyday workflows smoother.',
    wins: ['Improved internal tools and delivery habits', 'Collaborated with product and operations stakeholders'],
  },
  {
    period: 'Ongoing',
    role: 'Technical Learner',
    company: 'The Code Tickler',
    summary: 'Keeps the craft sharp through small experiments, code review, and pragmatic technology choices.',
    wins: ['Documents decisions', 'Prefers useful abstractions over novelty'],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    name: 'Frontend',
    skills: ['Angular', 'TypeScript', 'PrimeNG', 'Responsive UI', 'Accessibility'],
  },
  {
    name: 'Systems',
    skills: ['API design', 'Integration work', 'Testing strategy', 'Operational debugging'],
  },
  {
    name: 'Delivery',
    skills: ['Clear planning', 'Incremental rollout', 'Code review', 'Developer tooling'],
  },
];
