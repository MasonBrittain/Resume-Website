import resume from '../data/resume';
import Section from './Section';

export default function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="v2-skills">
        {resume.skills.map((group) => (
          <div key={group.group} className="v2-skill">
            <h3>{group.group}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item} className="v2-mono">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
