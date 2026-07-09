import { GraduationCap } from 'lucide-react';
import Section from './Section';
import resume from '../data/resume';

const Education = () => (
  <Section id="education" kicker="Education" title="Where I studied">
    <div className="grid gap-6 md:grid-cols-2">
      {resume.education.map((edu) => (
        <div
          key={edu.institution}
          className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <span className="gradient-bg flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white">
              <GraduationCap size={20} />
            </span>
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-ink-soft">
              {edu.duration}
            </span>
          </div>
          <h3 className="mt-4 font-display text-lg font-bold text-ink">
            {edu.institution}
          </h3>
          <p className="mt-1 text-sm font-medium text-ink-soft">{edu.degree}</p>
          {edu.secondDegree && (
            <p className="text-sm font-medium text-ink-soft">{edu.secondDegree}</p>
          )}
        </div>
      ))}
    </div>
  </Section>
);

export default Education;
