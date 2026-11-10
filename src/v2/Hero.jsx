import resume from '../data/resume';
import { Arrow } from './Arrow';
import { slug } from './sections';

const { personalInfo, projects } = resume;
const city = personalInfo.location.split(',')[0];
const nameLines = personalInfo.name.split(' ');
const peek = projects.slice(0, 4);

export default function Hero() {
  return (
    <section id="top" className="v2-hero">
      <div className="v2-hero__body">
        <div>
          <h1 className="v2-name">
            {nameLines.map((word, i) => (
              <span key={word} className="v2-line">
                <span style={{ '--i': i }}>{word}</span>
              </span>
            ))}
          </h1>
          <p className="v2-mono v2-hero__title v2-in" style={{ '--i': 0 }}>
            {personalInfo.title}, {city}
          </p>
          <p className="v2-hero__lede v2-in" style={{ '--i': 1 }}>
            {personalInfo.tagline}
          </p>
          <div className="v2-ctas v2-in" style={{ '--i': 2 }}>
            <a className="v2-btn v2-btn--primary v2-mono" href={`mailto:${personalInfo.email}`}>
              Email me <Arrow />
            </a>
            <a className="v2-btn v2-btn--ghost v2-mono" href="#projects">
              View projects <Arrow />
            </a>
          </div>
        </div>

        <div className="v2-status v2-mono v2-in" style={{ '--i': 3 }}>
          <span className="v2-status__now">Now</span>
          <strong>{personalInfo.currentRole}</strong>
          <span className="v2-status__note">Open to the right role</span>
        </div>
      </div>

      <div className="v2-strip v2-in" style={{ '--i': 4 }}>
        <div className="v2-strip__head v2-mono">
          <h2 className="v2-strip__title">Selected projects</h2>
          <a href="#projects">View all</a>
        </div>
        <ol className="v2-strip__list">
          {peek.map((p) => (
            <li key={p.name}>
              <a className="v2-strip__card" href={`#project-${slug(p.name)}`}>
                <span className="v2-strip__name">{p.name}</span>
                <span className="v2-strip__type">{p.type}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
