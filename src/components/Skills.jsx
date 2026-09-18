import { BadgeCheck, Cloud, Code2, Wrench } from 'lucide-react';
import Section from './Section';
import Card from './Card';
import resume from '../data/resume';

const accentStyles = {
  violet:
    'bg-brand-violet/10 text-brand-violet hover:bg-brand-violet hover:text-white hover:shadow-lg hover:shadow-brand-violet/30',
  blue: 'bg-brand-blue/10 text-brand-blue hover:bg-brand-blue hover:text-white hover:shadow-lg hover:shadow-brand-blue/30',
  cyan: 'bg-brand-cyan/10 text-brand-cyan hover:bg-brand-cyan hover:text-white hover:shadow-lg hover:shadow-brand-cyan/30',
};

const groupIcons = {
  Languages: Code2,
  'Data & Cloud': Cloud,
  Tools: Wrench,
};

const Skills = () => (
  <Section id="skills" kicker="Skills" title="What I work with">
    <div className="space-y-8">
      <div className="stagger grid gap-6 md:grid-cols-3">
        {resume.skills.map((group, i) => {
          const Icon = groupIcons[group.group] ?? Code2;
          return (
            <Card key={group.group} style={{ '--n': i }} className="p-6">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="gradient-bg flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white shadow-md shadow-brand-blue/30">
                    <Icon size={18} />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {group.group}
                  </h3>
                </div>
                <span className="font-mono text-xs text-ink-soft">
                  {String(group.items.length).padStart(2, '0')}
                </span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-all hover:-translate-y-0.5 ${accentStyles[group.accent]}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      <div>
        <h3 className="mb-3 font-display text-lg font-semibold text-ink">
          Certifications
        </h3>
        <div className="flex flex-wrap gap-3">
          {resume.certifications.map((cert) => (
            <Card key={cert.name} className="flex items-center gap-3 px-4 py-3">
              <BadgeCheck className="text-brand-blue" size={20} />
              <div>
                <p className="text-sm font-semibold text-ink">{cert.name}</p>
                <p className="text-xs text-ink-soft">
                  {cert.issuer} · {cert.date}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </Section>
);

export default Skills;
