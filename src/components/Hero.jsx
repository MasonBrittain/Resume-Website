import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import resume from '../data/resume';

const { personalInfo } = resume;

// Everything on the mock terminal comes from resume.js
const [firstName] = personalInfo.name.split(' ');
const city = personalInfo.location.split(',')[0];
const terminalTitle = `${firstName.toLowerCase()}@${city.toLowerCase()} — zsh`;
const terminalLines = [
  { cmd: 'whoami', out: personalInfo.name.toLowerCase().replace(/\s+/g, '-') },
  { cmd: 'cat role.txt', out: personalInfo.currentRole },
  { cmd: 'echo $LOCATION', out: personalInfo.location },
  { cmd: 'cat stack.txt', out: personalInfo.stack.join(' · ') },
];

// The terminal "runs" once on load: each command types out, its output
// appears, then the next prompt. Delays are cumulative, in ms, and start
// while the card is still rising in.
const TYPE_START = 450;
const MS_PER_CHAR = 24;
const OUTPUT_GAP = 70;
const NEXT_PROMPT_GAP = 110;

const terminalTimeline = terminalLines.reduce((steps, line) => {
  const prev = steps[steps.length - 1];
  const start = prev ? prev.outputAt + NEXT_PROMPT_GAP : TYPE_START;
  const typing = line.cmd.length * MS_PER_CHAR;
  return [...steps, { ...line, start, typing, outputAt: start + typing + OUTPUT_GAP }];
}, []);

const socialLinkClass =
  'inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-medium text-white/70 transition-colors hover:text-white';

const Hero = () => (
  <section
    id="top"
    className="relative overflow-hidden bg-night px-6 pt-28 pb-16 text-white sm:pt-32 lg:flex lg:min-h-svh lg:items-center"
  >
    {/* Backdrop: line grid fading out at the edges, plus three still glow orbs */}
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="bg-grid absolute inset-0 mask-[radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />
      <div className="absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-brand-rose/30 blur-3xl" />
      <div className="absolute top-1/3 -right-32 h-[30rem] w-[30rem] rounded-full bg-brand-orange/20 blur-3xl" />
      <div className="absolute -bottom-40 left-1/3 h-[24rem] w-[24rem] rounded-full bg-brand-amber/15 blur-3xl" />
    </div>

    <div className="relative mx-auto grid w-full max-w-5xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="text-center lg:text-left">
        <span
          className="rise inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80"
          style={{ '--n': 0 }}
        >
          {personalInfo.currentRole}
        </span>

        <h1
          className="rise mt-7 font-display font-bold leading-[1.05] tracking-tight"
          style={{ '--n': 1 }}
        >
          <span className="block text-2xl font-semibold text-white/70 sm:text-3xl">
            Hi, I'm
          </span>
          <span className="gradient-text mt-2 block text-[2.75rem] sm:text-6xl lg:text-7xl">
            {personalInfo.name}
          </span>
        </h1>

        <p
          className="rise mt-5 font-display text-xl font-semibold text-white/90 sm:text-2xl"
          style={{ '--n': 2 }}
        >
          {personalInfo.title}
        </p>

        <p
          className="rise mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/70 lg:mx-0"
          style={{ '--n': 3 }}
        >
          {personalInfo.tagline}
        </p>

        <div
          className="rise mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          style={{ '--n': 4 }}
        >
          <a
            href={`mailto:${personalInfo.email}`}
            className="press gradient-bg inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white shadow-md shadow-black/30 hover:brightness-110"
          >
            <Mail size={18} aria-hidden="true" /> Email me
          </a>
          <a
            href="#projects"
            className="press rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white hover:border-white/40 hover:bg-white/10"
          >
            View projects
          </a>
        </div>

        <div
          className="rise mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 lg:-ml-3 lg:justify-start"
          style={{ '--n': 5 }}
        >
          <a href={personalInfo.github} target="_blank" rel="noreferrer" className={socialLinkClass}>
            <Github size={18} aria-hidden="true" /> GitHub
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className={socialLinkClass}>
            <Linkedin size={18} aria-hidden="true" /> LinkedIn
          </a>
          <span className="inline-flex items-center gap-1.5 px-3 text-sm text-white/70">
            <MapPin size={16} aria-hidden="true" />
            {personalInfo.location}
          </span>
        </div>
      </div>

      {/* Glass terminal card */}
      <div
        className="rise relative mx-auto w-full max-w-md lg:max-w-none"
        style={{ '--n': 3 }}
      >
        <div className="rounded-2xl border border-white/10 bg-white/5 p-1.5 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-1.5 px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-xs text-white/60">{terminalTitle}</span>
          </div>
          <div className="rounded-xl bg-night/80 px-5 py-4 text-left font-mono text-[13px] leading-7 sm:text-sm">
            {terminalTimeline.map(({ cmd, out, start, typing, outputAt }) => (
              <div key={cmd}>
                <p className="term-line" style={{ '--delay': `${start}ms` }}>
                  <span className="text-brand-amber">$</span>{' '}
                  <span
                    className="term-type text-white/90"
                    style={{ '--delay': `${start}ms`, '--dur': `${typing}ms`, '--chars': cmd.length }}
                  >
                    {cmd}
                  </span>
                </p>
                <p className="term-line text-white/70" style={{ '--delay': `${outputAt}ms` }}>
                  {out}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
