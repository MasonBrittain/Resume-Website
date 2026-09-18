import { GraduationCap } from 'lucide-react';
import Section from './Section';
import Card from './Card';
import resume from '../data/resume';

const Education = () => (
  <Section id="education" kicker="Education" title="Where I studied">
    <div className="stagger grid gap-6 md:grid-cols-2">
      {resume.education.map((edu, i) => (
        <Card key={edu.institution} style={{ '--n': i }} className="p-6">
          <div className="flex items-start justify-between gap-4">
            <span className="gradient-bg flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-md shadow-brand-blue/30">
              <GraduationCap size={22} />
            </span>
            <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 font-mono text-[11px] font-medium text-ink-soft">
              {edu.duration}
            </span>
          </div>
          <h3 className="mt-5 font-display text-lg font-bold text-ink">
            {edu.institution}
          </h3>
          <p className="mt-1 text-sm font-medium text-ink-soft">{edu.degree}</p>
          {edu.secondDegree && (
            <p className="text-sm font-medium text-ink-soft">{edu.secondDegree}</p>
          )}
        </Card>
      ))}
    </div>
  </Section>
);

export default Education;
