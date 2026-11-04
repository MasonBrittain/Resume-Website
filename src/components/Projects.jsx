import { ArrowUpRight, Github, Star } from 'lucide-react';
import Section from './Section';
import Card from './Card';
import resume from '../data/resume';

// A card with a repo is one big link (the "View on GitHub" link stretches over
// it), so its hover lift is honest. Cards without a repo stay still.
const ProjectCard = ({ project, wide }) => (
  <Card
    as="article"
    interactive={Boolean(project.github)}
    className={`group flex flex-col p-6 ${project.featured ? 'md:p-8' : ''} ${
      wide ? 'md:col-span-2' : ''
    }`}
  >
    <div className="flex flex-wrap items-center justify-between gap-2">
      <span className="rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-semibold text-brand-orange-deep">
        {project.type}
      </span>
      <div className="flex items-center gap-3">
        {project.featured && (
          <span className="flex items-center gap-1 text-xs font-semibold text-rose-700">
            <Star size={14} className="fill-current" aria-hidden="true" /> Featured
          </span>
        )}
        {project.duration && (
          <span className="font-mono text-xs font-medium text-ink-soft">
            {project.duration}
          </span>
        )}
      </div>
    </div>

    <h3
      className={`mt-4 font-display font-bold text-ink ${
        project.github ? 'transition-colors group-hover:text-brand-orange-deep' : ''
      } ${project.featured ? 'text-2xl' : 'text-xl'}`}
    >
      {project.name}
    </h3>

    <p className="mt-2 max-w-[62ch] flex-1 text-base leading-relaxed text-ink-soft">
      {project.description}
    </p>

    <ul className="mt-5 flex flex-wrap items-center gap-2" aria-label="Technologies">
      {project.technologies.map((tech) => (
        <li
          key={tech}
          className="rounded-md border border-stone-200 bg-stone-50 px-2 py-1 font-mono text-xs font-medium text-ink-soft"
        >
          {tech}
        </li>
      ))}
    </ul>

    {project.github && (
      <a
        href={project.github}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-ink after:absolute after:inset-0 after:rounded-2xl"
      >
        <Github size={16} aria-hidden="true" /> View on GitHub
        <span className="sr-only">: {project.name}</span>
        <ArrowUpRight
          size={14}
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </a>
    )}
  </Card>
);

const Projects = () => {
  const rest = resume.projects.filter((project) => !project.featured);
  // With an odd number of regular cards, the last one takes the whole row
  // instead of sitting next to an empty cell.
  const lastOdd = rest.length % 2 === 1 ? rest[rest.length - 1] : null;

  return (
    <Section id="projects" title="Things I've built">
      <div className="grid gap-6 md:grid-cols-2">
        {resume.projects.map((project) => (
          <ProjectCard
            key={project.name}
            project={project}
            wide={project.featured || project === lastOdd}
          />
        ))}
      </div>
    </Section>
  );
};

export default Projects;
