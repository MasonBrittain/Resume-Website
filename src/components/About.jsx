import { Award, Database, GraduationCap, MapPin } from 'lucide-react';
import Section from './Section';
import Card from './Card';
import resume from '../data/resume';

const { personalInfo } = resume;

const facts = [
  { icon: Database, label: 'Software & Data Engineering' },
  { icon: GraduationCap, label: 'Dual B.S./B.A. — UW' },
  { icon: Award, label: 'Google Analytics Certified' },
  { icon: MapPin, label: 'Seattle, WA' },
];

const About = () => (
  <Section id="about" kicker="About" title="A little about me">
    <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
      <div className="stagger space-y-5 text-lg leading-relaxed text-ink-soft">
        {personalInfo.summary.map((paragraph, i) => (
          <p key={i} style={{ '--n': i }}>
            {paragraph}
          </p>
        ))}
      </div>

      <ul className="stagger space-y-3 self-start">
        {facts.map(({ icon: Icon, label }, i) => (
          <Card
            as="li"
            key={label}
            style={{ '--n': i + 1 }}
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium"
          >
            <span className="gradient-bg flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white shadow-md shadow-brand-blue/30">
              <Icon size={16} />
            </span>
            {label}
          </Card>
        ))}
      </ul>
    </div>
  </Section>
);

export default About;
