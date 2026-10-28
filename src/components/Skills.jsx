import { BadgeCheck, Cloud, Code2, Wrench } from 'lucide-react';
import Section from './Section';
import Card from './Card';
import resume from '../data/resume';

const accentStyles = {
  rose: 'bg-brand-rose/10 text-rose-700 hover:bg-brand-rose hover:text-white hover:shadow-lg hover:shadow-brand-rose/30',
  orange:
    'bg-brand-orange/10 text-orange-700 hover:bg-brand-orange hover:text-white hover:shadow-lg hover:shadow-brand-orange/30',
  amber: 'bg-brand-amber/10 text-amber-700 hover:bg-brand-amber hover:text-white hover:shadow-lg hover:shadow-brand-amber/30',
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
                  <span className="gradient-bg flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white shadow-md shadow-brand-orange/30">
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
              <BadgeCheck className="text-brand-orange" size={20} />
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
