import resume from '../data/resume';
import { ArrowOut } from './Arrow';
import Section from './Section';
import { slug } from './sections';

// The featured project leads the list and is set larger; the rest follow.
export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <ol className="v2-projects">
        {resume.projects.map((p) => (
          <li
            key={p.name}
            id={`project-${slug(p.name)}`}
            className={`v2-project${p.github ? ' has-link' : ''}${p.featured ? ' is-featured' : ''}`}
          >
            <div className="v2-project__main">
              <h3 className="v2-project__name">{p.name}</h3>
              <p className="v2-project__desc">{p.description}</p>
              <ul className="v2-tags" aria-label="Built with">
                {p.technologies.map((t) => (
                  <li key={t} className="v2-mono">{t}</li>
                ))}
              </ul>
            </div>
            <div className="v2-project__side v2-mono">
              <span className="v2-project__type">{p.type}</span>
              {p.duration && <span className="v2-project__dates">{p.duration}</span>}
              {p.github && (
                <a className="v2-project__link" href={p.github} target="_blank" rel="noreferrer">
                  Source<span className="v2-sr"> code for {p.name}</span> <ArrowOut />
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
