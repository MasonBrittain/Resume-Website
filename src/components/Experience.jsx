import Section from './Section';
import resume from '../data/resume';

const Experience = () => (
  <Section id="experience" kicker="Experience" title="Where I've worked">
    <ol className="relative space-y-10 border-l-2 border-zinc-200 pl-8">
      {resume.experience.map((job) => (
        <li key={job.company} className="relative">
          <span
            aria-hidden="true"
            className={`absolute -left-[41px] top-1.5 h-4 w-4 rounded-full border-4 border-paper ${
              job.current ? 'gradient-bg' : 'bg-zinc-300'
            }`}
          />

          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="font-display text-xl font-bold text-ink">
              {job.position} <span className="gradient-text">@ {job.company}</span>
            </h3>
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-ink-soft">
              {job.duration}
            </span>
          </div>
          <p className="mt-1 text-sm text-ink-soft">{job.location}</p>

          {job.engagements ? (
            <div className="mt-4 space-y-5">
              {job.engagements.map((engagement) => (
                <div
                  key={engagement.client}
                  className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm"
                >
                  <h4 className="font-display font-semibold text-ink">
                    {engagement.client}
                  </h4>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink-soft">
                    {engagement.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink-soft">
              {job.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  </Section>
);

export default Experience;
