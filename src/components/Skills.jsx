import { BadgeCheck } from 'lucide-react';
import Section from './Section';
import resume from '../data/resume';

const accentStyles = {
  violet: 'bg-brand-violet/10 text-brand-violet',
  blue: 'bg-brand-blue/10 text-brand-blue',
  cyan: 'bg-brand-cyan/10 text-brand-cyan',
};

const Skills = () => (
  <Section id="skills" kicker="Skills" title="What I work with">
    <div className="space-y-8">
      {resume.skills.map((group) => (
        <div key={group.group}>
          <h3 className="mb-3 font-display text-lg font-semibold text-ink">
            {group.group}
          </h3>
          <div className="flex flex-wrap gap-2">
            {group.items.map((skill) => (
              <span
                key={skill}
                className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${accentStyles[group.accent]}`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}

      <div>
        <h3 className="mb-3 font-display text-lg font-semibold text-ink">
          Certifications
        </h3>
        <div className="flex flex-wrap gap-3">
          {resume.certifications.map((cert) => (
            <div
              key={cert.name}
              className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 shadow-sm"
            >
              <BadgeCheck className="text-brand-blue" size={20} />
              <div>
                <p className="text-sm font-semibold text-ink">{cert.name}</p>
                <p className="text-xs text-ink-soft">
                  {cert.issuer} · {cert.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Section>
);

export default Skills;
