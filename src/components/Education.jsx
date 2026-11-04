import { GraduationCap } from 'lucide-react';
import Section from './Section';
import Card from './Card';
import resume from '../data/resume';

const Education = () => (
  <Section id="education" title="Where I studied">
    <div className="grid gap-6 md:grid-cols-2">
      {resume.education.map((edu) => (
        <Card key={edu.institution} className="p-6">
          <div className="flex items-start justify-between gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-brand-orange-deep">
              <GraduationCap size={22} aria-hidden="true" />
            </span>
            <span className="rounded-full border border-stone-200 bg-white px-3 py-1 font-mono text-xs font-medium text-ink-soft">
              {edu.duration}
            </span>
          </div>
          <h3 className="mt-5 font-display text-lg font-bold text-ink">
            {edu.institution}
          </h3>
          <p className="mt-1 font-medium text-ink-soft">{edu.degree}</p>
          {edu.secondDegree && (
            <p className="font-medium text-ink-soft">{edu.secondDegree}</p>
          )}
        </Card>
      ))}
    </div>
  </Section>
);

export default Education;
