import resume from '../data/resume';
import Section from './Section';

// Bullets written as "result: how" lead with the result in bold.
const splitLead = (text) => {
  const at = text.indexOf(': ');
  return at > 0 && at < 70 ? [text.slice(0, at), text.slice(at + 2)] : [null, text];
};

function Bullets({ items }) {
  return (
    <ul className="v2-bullets">
      {items.map((text) => {
        const [lead, rest] = splitLead(text);
        return (
          <li key={text.slice(0, 40)}>
            {lead && <strong>{lead}:</strong>} {rest}
          </li>
        );
      })}
    </ul>
  );
}

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="v2-roles">
        {resume.experience.map((role) => (
          <li key={role.company} className="v2-role">
            <div className="v2-role__meta v2-mono">
              {role.current && <span className="v2-now">Now</span>}
              <span className="v2-role__dates">{role.duration}</span>
              <span className="v2-role__place">{role.location}</span>
            </div>
            <div>
              <h3 className="v2-role__company">{role.company}</h3>
              <p className="v2-mono v2-role__position">{role.position}</p>
              {role.engagements ? (
                <div className="v2-engagements">
                  {role.engagements.map((e) => (
                    <div key={e.client} className="v2-engagement">
                      <h4>{e.client}</h4>
                      <Bullets items={e.bullets} />
                    </div>
                  ))}
                </div>
              ) : (
                <Bullets items={role.bullets} />
              )}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
