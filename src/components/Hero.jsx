import { ArrowDown, Github, Linkedin, Mail, MapPin } from 'lucide-react';
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

const Hero = () => (
  <section
    id="top"
    className="relative overflow-hidden bg-night px-6 pt-32 pb-24 text-white lg:flex lg:min-h-svh lg:items-center"
  >
    {/* Backdrop: line grid fading out at the edges, plus three drifting glow orbs */}
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="bg-grid absolute inset-0 mask-[radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />
      <div className="animate-float absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-brand-violet/40 blur-3xl" />
      <div
        className="animate-float absolute top-1/3 -right-32 h-[30rem] w-[30rem] rounded-full bg-brand-blue/30 blur-3xl"
        style={{ animationDuration: '9s', animationDelay: '-3s' }}
      />
      <div
        className="animate-float absolute -bottom-40 left-1/3 h-[24rem] w-[24rem] rounded-full bg-brand-cyan/25 blur-3xl"
        style={{ animationDuration: '11s', animationDelay: '-6s' }}
      />
    </div>

    <div className="relative mx-auto grid w-full max-w-5xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="text-center lg:text-left">
        <span
          className="rise inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur"
          style={{ '--n': 0 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
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
          className="rise mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/60 lg:mx-0"
          style={{ '--n': 3 }}
        >
          {personalInfo.tagline}
        </p>

        <div
          className="rise mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          style={{ '--n': 4 }}
        >
          <a
            href="#projects"
            className="gradient-bg rounded-full px-6 py-3 font-semibold text-white shadow-lg shadow-brand-blue/40 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-violet/40"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur transition-colors hover:border-white/40 hover:bg-white/10"
          >
            Get in Touch
          </a>
        </div>

        <div
          className="rise mt-9 flex items-center justify-center gap-5 text-white/60 lg:justify-start"
          style={{ '--n': 5 }}
        >
          <a href={personalInfo.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-colors hover:text-white">
            <Github size={22} />
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-white">
            <Linkedin size={22} />
          </a>
          <a href={`mailto:${personalInfo.email}`} aria-label="Email" className="transition-colors hover:text-white">
            <Mail size={22} />
          </a>
          <span className="flex items-center gap-1.5 text-sm">
            <MapPin size={16} />
            {personalInfo.location}
          </span>
        </div>
      </div>

      {/* Glass terminal card */}
      <div className="rise relative mx-auto w-full max-w-md lg:max-w-none" style={{ '--n': 3 }}>
        <div
          aria-hidden="true"
          className="absolute -inset-3 rounded-3xl bg-linear-to-br from-brand-violet/40 via-brand-blue/25 to-brand-cyan/40 blur-2xl"
        />
        <div className="relative rounded-2xl border border-white/10 bg-white/5 p-1.5 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-1.5 px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-[11px] text-white/40">{terminalTitle}</span>
          </div>
          <div className="rounded-xl bg-night/80 px-5 py-4 text-left font-mono text-[13px] leading-7 sm:text-sm">
            {terminalLines.map(({ cmd, out }) => (
              <div key={cmd}>
                <p>
                  <span className="text-brand-cyan">$</span>{' '}
                  <span className="text-white/90">{cmd}</span>
                </p>
                <p className="text-white/60">{out}</p>
              </div>
            ))}
            <p>
              <span className="text-brand-cyan">$</span>{' '}
              <span className="animate-blink text-white/80">▍</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <a
      href="#about"
      aria-label="Scroll to about section"
      className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-white/50 transition-colors hover:text-white md:block"
    >
      <ArrowDown size={20} />
    </a>
  </section>
);

export default Hero;
