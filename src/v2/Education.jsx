import resume from '../data/resume';
import Section from './Section';

export default function Education() {
  return (
    <Section id="education" title="Education">
      <ol className="v2-edu">
        {resume.education.map((e) => (
          <li key={e.institution} className="v2-edu__item">
            <span className="v2-mono v2-edu__meta">{e.duration}</span>
            <div>
              <h3 className="v2-edu__name">{e.institution}</h3>
              <p>{e.degree}</p>
              {e.secondDegree && <p>{e.secondDegree}</p>}
            </div>
          </li>
        ))}
        {resume.certifications.map((c) => (
          <li key={c.name} className="v2-edu__item">
            <span className="v2-mono v2-edu__meta">Certified {c.date}</span>
            <div>
              <h3 className="v2-edu__name">{c.name}</h3>
              <p>{c.issuer}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
