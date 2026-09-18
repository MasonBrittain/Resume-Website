import { ArrowUpRight, Github, Star } from 'lucide-react';
import Section from './Section';
import Card from './Card';
import resume from '../data/resume';

const ProjectCard = ({ project, index }) => (
  <Card
    as="article"
    style={{ '--n': index }}
    className={`group flex flex-col p-6 ${
      project.featured
        ? 'card-featured bg-linear-to-br from-white to-brand-violet/5 md:col-span-2 md:p-8'
        : ''
    }`}
  >
    <div className="flex flex-wrap items-center justify-between gap-2">
      <span className="gradient-bg rounded-full px-3 py-1 text-xs font-semibold text-white shadow-md shadow-brand-blue/20">
        {project.type}
      </span>
      <div className="flex items-center gap-3">
        {project.featured && (
          <span className="flex items-center gap-1 text-xs font-semibold text-brand-violet">
            <Star size={14} className="fill-current" /> Featured
          </span>
        )}
        {project.duration && (
          <span className="font-mono text-[11px] font-medium text-ink-soft">
            {project.duration}
          </span>
        )}
      </div>
    </div>

    <h3
      className={`mt-4 font-display font-bold text-ink transition-colors group-hover:text-brand-blue ${
        project.featured ? 'text-2xl' : 'text-xl'
      }`}
    >
      {project.name}
    </h3>

    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
      {project.description}
    </p>

    <div className="mt-5 flex flex-wrap items-center gap-2">
      {project.technologies.map((tech) => (
        <span
          key={tech}
          className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 font-mono text-[11px] font-medium text-ink-soft"
        >
          {tech}
        </span>
      ))}
    </div>

    {project.github && (
      <a
        href={project.github}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-brand-violet"
      >
        <Github size={16} /> View on GitHub
        <ArrowUpRight
          size={14}
          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </a>
    )}
  </Card>
);

const Projects = () => (
  <Section id="projects" kicker="Projects" title="Things I've built">
    <div className="stagger grid gap-6 md:grid-cols-2">
      {resume.projects.map((project, i) => (
        <ProjectCard key={project.name} project={project} index={i} />
      ))}
    </div>
  </Section>
);

export default Projects;
