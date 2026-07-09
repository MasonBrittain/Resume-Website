import { Github, Star } from 'lucide-react';
import Section from './Section';
import resume from '../data/resume';

const ProjectCard = ({ project }) => (
  <article
    className={`group flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-blue/10 ${
      project.featured ? 'md:col-span-2 md:p-8' : ''
    }`}
  >
    <div className="flex flex-wrap items-center justify-between gap-2">
      <span className="gradient-bg rounded-full px-3 py-1 text-xs font-semibold text-white">
        {project.type}
      </span>
      <div className="flex items-center gap-3">
        {project.featured && (
          <span className="flex items-center gap-1 text-xs font-semibold text-brand-violet">
            <Star size={14} className="fill-current" /> Featured
          </span>
        )}
        {project.duration && (
          <span className="text-xs font-medium text-ink-soft">{project.duration}</span>
        )}
      </div>
    </div>

    <h3 className="mt-4 font-display text-xl font-bold text-ink transition-colors group-hover:text-brand-blue">
      {project.name}
    </h3>

    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
      {project.description}
    </p>

    <div className="mt-4 flex flex-wrap items-center gap-2">
      {project.technologies.map((tech) => (
        <span
          key={tech}
          className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-ink-soft"
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
      </a>
    )}
  </article>
);

const Projects = () => (
  <Section id="projects" kicker="Projects" title="Things I've built">
    <div className="grid gap-6 md:grid-cols-2">
      {resume.projects.map((project) => (
        <ProjectCard key={project.name} project={project} />
      ))}
    </div>
  </Section>
);

export default Projects;
