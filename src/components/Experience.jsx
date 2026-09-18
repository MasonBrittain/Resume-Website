import Section from './Section';
import Card from './Card';
import resume from '../data/resume';

const Bullets = ({ items, className = '' }) => (
  <ul
    className={`list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink-soft marker:text-brand-blue ${className}`}
  >
    {items.map((bullet, i) => (
      <li key={i}>{bullet}</li>
    ))}
  </ul>
);

const Experience = () => (
  <Section id="experience" kicker="Experience" title="Where I've worked">
    {/* The timeline rail is a gradient pseudo-element; dots sit centred on it */}
    <ol className="stagger relative space-y-12 pl-8 before:absolute before:top-2 before:bottom-0 before:left-1.75 before:w-0.5 before:bg-linear-to-b before:from-brand-violet before:via-brand-blue before:to-transparent">
      {resume.experience.map((job, i) => (
        <li key={job.company} className="relative" style={{ '--n': i }}>
          <span aria-hidden="true" className="absolute top-1.5 -left-8 flex h-4 w-4">
            {job.current && (
              <span className="gradient-bg absolute inline-flex h-full w-full animate-ping rounded-full opacity-50" />
            )}
            <span
              className={`relative inline-flex h-4 w-4 rounded-full border-4 border-paper ${
                job.current
                  ? 'gradient-bg shadow-[0_0_18px_rgba(37,99,235,0.6)]'
                  : 'bg-zinc-300'
              }`}
            />
          </span>

          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">
              {job.position} <span className="gradient-text">@ {job.company}</span>
            </h3>
            <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 font-mono text-[11px] font-medium text-ink-soft">
              {job.duration}
            </span>
          </div>
          {job.location && (
            <p className="mt-1 text-sm text-ink-soft">{job.location}</p>
          )}

          {job.engagements ? (
            <div className="mt-5 space-y-5">
              {job.engagements.map((engagement) => (
                <Card key={engagement.client} className="p-5 sm:p-6">
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
