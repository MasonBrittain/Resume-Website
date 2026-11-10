import resume from '../data/resume';
import Section from './Section';

const { personalInfo, education } = resume;
const school = education[0];

const facts = [
  ['Based in', personalInfo.location],
  ['Currently', personalInfo.currentRole],
  ['Studied', `${school.institution}, ${school.degree.replace(/^B\.S\.\s*/, '')}`],
  ['Works in', personalInfo.stack.join(', ')],
];

export default function About() {
  return (
    <Section id="about" title="About">
      <div className="v2-about">
        <div className="v2-about__text">
          {personalInfo.summary.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
        <dl className="v2-facts">
          {facts.map(([label, value]) => (
            <div key={label}>
              <dt className="v2-mono">{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
