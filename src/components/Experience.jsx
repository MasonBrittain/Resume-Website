import Section from './Section';
import Card from './Card';
import resume from '../data/resume';

// Bullets written as "30% faster data processing: redesigned…" lead with
// their result. Setting that lead-in in bold ink lets the numbers read first.
const Bullet = ({ text }) => {
  const split = text.indexOf(': ');
  if (split < 1 || split > 90) return <li>{text}</li>;
  return (
    <li>
      <strong className="font-semibold text-ink tabular-nums">{text.slice(0, split)}</strong>
      {text.slice(split)}
    </li>
  );
};

const Bullets = ({ items, className = '' }) => (
  <ul
    className={`max-w-[62ch] list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink-soft marker:text-brand-orange ${className}`}
  >
    {items.map((bullet, i) => (
      <Bullet key={i} text={bullet} />
    ))}
  </ul>
);

const Experience = () => (
  <Section id="experience" title="Where I've worked">
    {/* The timeline rail is a gradient pseudo-element; dots sit centred on it */}
    <ol className="relative space-y-12 pl-6 before:absolute before:top-2 before:bottom-0 before:left-1.75 before:w-0.5 before:bg-linear-to-b before:from-brand-rose before:via-brand-orange before:to-transparent sm:pl-8">
      {resume.experience.map((job) => (
        <li key={job.company} className="relative">
          <span
            aria-hidden="true"
            className={`absolute top-1.5 -left-6 h-4 w-4 rounded-full border-4 border-paper sm:-left-8 ${
              job.current ? 'gradient-bg' : 'bg-stone-300'
            }`}
          />

          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">
              {job.position} <span className="text-brand-orange-deep">@ {job.company}</span>
            </h3>
            <span className="rounded-full border border-stone-200 bg-white px-3 py-1 font-mono text-xs font-medium text-ink-soft">
              {job.duration}
            </span>
          </div>
          {job.location && (
            <p className="mt-1 text-sm text-ink-soft">{job.location}</p>
          )}

          {job.engagements ? (
            <div className="mt-5 space-y-5">
              {job.engagements.map((engagement) => (
                <Card key={engagement.client} className="p-4 sm:p-6">
                  <h4 className="font-display font-semibold text-ink">
                    {engagement.client}
                  </h4>
                  <Bullets items={engagement.bullets} className="mt-2" />
                </Card>
              ))}
            </div>
          ) : (
            <Bullets items={job.bullets} className="mt-3" />
          )}
        </li>
      ))}
    </ol>
  </Section>
);

export default Experience;
