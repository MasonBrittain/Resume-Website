import { Award, Database, GraduationCap, MapPin } from 'lucide-react';
import Section from './Section';
import resume from '../data/resume';

const { personalInfo } = resume;

const facts = [
  { icon: Database, label: 'Data Engineering & BI' },
  { icon: GraduationCap, label: 'Dual B.S./B.A. — UW' },
  { icon: Award, label: 'Google Analytics Certified' },
  { icon: MapPin, label: 'Seattle, WA' },
];

const About = () => (
  <Section id="about" kicker="About" title="A little about me">
    <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
      <div className="space-y-4 text-lg leading-relaxed text-ink-soft">
        {personalInfo.summary.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <ul className="space-y-3 self-start">
        {facts.map(({ icon: Icon, label }) => (
          <li
            key={label}
            className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium shadow-sm"
          >
            <span className="gradient-bg flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white">
              <Icon size={16} />
            </span>
            {label}
          </li>
        ))}
      </ul>
    </div>
  </Section>
);

export default About;
