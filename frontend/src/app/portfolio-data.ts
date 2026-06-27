export interface LinkItem {
  label: string
  href: string
  icon: string
}

export type ProjectSection = 'active' | 'maintained' | 'legacy'

export interface Project {
  name: string
  status?: string
  section: ProjectSection
  summary: string
  impact: string
  stack: string[]
  links: LinkItem[]
}

export interface ProjectSectionSummary {
  id: ProjectSection
  title: string
  emptyMessage: string
}

export interface ExperienceItem {
  period: string
  role: string
  company: string
  summary: string
  wins: string[]
}

export interface SkillGroup {
  name: string
  skills: string[]
}

export const profile = {
  brand: 'The Code Tickler',
  headline: 'Developer portfolio for thoughtful, practical software work.',
  intro:
    'A playful brand for serious engineering: clear systems, maintainable code, and user-facing details that hold up after launch.',
  availability: 'Open to developer conversations',
}

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
]

export const projects: Project[] = [
  {
    name: 'The Code Tickler',
    section: 'active',
    summary:
      'A personal portfolio site for independent project notes, practical engineering work, and public-facing craft.',
    impact:
      'Keeps the frontend, deployment path, and project writing in one maintainable Angular codebase.',
    stack: ['Angular', 'PrimeNG', 'Tailwind CSS', 'Cloudflare Pages'],
    links: [
      {
        label: 'Source',
        href: 'https://github.com/thomastickle/the-code-tickler',
        icon: 'pi pi-github',
      },
    ],
  },
]

export const projectSections: ProjectSectionSummary[] = [
  {
    id: 'active',
    title: 'Active',
    emptyMessage: 'No active independent project is published yet.',
  },
  {
    id: 'maintained',
    title: 'Maintained',
    emptyMessage: 'No maintained independent projects are listed yet.',
  },
  {
    id: 'legacy',
    title: 'Legacy (No Active Maintenance)',
    emptyMessage: 'No legacy independent projects are listed yet.',
  },
]

export const visibleProjectStack = (project: Project): string[] => project.stack.slice(0, 4)

export const experience: ExperienceItem[] = [
  {
    period: 'Recent',
    role: 'Software Developer',
    company: 'Replace with current or latest role',
    summary:
      'Builds and improves applications with a bias toward clear behavior and maintainable systems.',
    wins: [
      'Turns ambiguous needs into shippable slices',
      'Keeps implementation details visible and testable',
    ],
  },
  {
    period: 'Earlier',
    role: 'Application Engineer',
    company: 'Replace with prior team',
    summary:
      'Worked across frontend, backend, and integration boundaries to make everyday workflows smoother.',
    wins: [
      'Improved internal tools and delivery habits',
      'Collaborated with product and operations stakeholders',
    ],
  },
  {
    period: 'Ongoing',
    role: 'Technical Learner',
    company: 'The Code Tickler',
    summary:
      'Keeps the craft sharp through small experiments, code review, and pragmatic technology choices.',
    wins: ['Documents decisions', 'Prefers useful abstractions over novelty'],
  },
]

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
]
