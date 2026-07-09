import { ArrowDown, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import resume from '../data/resume';

const { personalInfo } = resume;

const Hero = () => (
  <section id="top" className="relative overflow-hidden px-6 pt-36 pb-24">
    {/* Soft gradient blobs behind the hero */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-brand-violet/20 blur-3xl"
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-32 -right-24 h-96 w-96 rounded-full bg-brand-cyan/20 blur-3xl"
    />

    <div className="relative mx-auto max-w-5xl">
      <div className="max-w-3xl text-center md:text-left">
        <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-sm font-medium text-ink-soft shadow-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          {personalInfo.currentRole}
        </span>

        <h1 className="mt-6 font-display text-5xl font-bold leading-tight sm:text-6xl">
          Hi, I'm <span className="gradient-text">{personalInfo.name}</span>
        </h1>

        <p className="mt-4 font-display text-xl font-semibold text-ink sm:text-2xl">
          {personalInfo.title}
        </p>

        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          {personalInfo.tagline}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
          <a
            href="#projects"
            className="gradient-bg rounded-full px-6 py-3 font-semibold text-white shadow-lg shadow-brand-blue/30 transition-transform hover:-translate-y-0.5"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="rounded-full border-2 border-ink px-6 py-3 font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
          >
            Get in Touch
          </a>
        </div>

        <div className="mt-8 flex items-center justify-center gap-5 text-ink-soft md:justify-start">
          <a href={personalInfo.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-colors hover:text-brand-violet">
            <Github size={22} />
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-brand-blue">
            <Linkedin size={22} />
          </a>
          <a href={`mailto:${personalInfo.email}`} aria-label="Email" className="transition-colors hover:text-brand-cyan">
            <Mail size={22} />
          </a>
          <span className="flex items-center gap-1.5 text-sm">
            <MapPin size={16} />
            {personalInfo.location}
          </span>
        </div>
      </div>
    </div>

    <a
      href="#about"
      aria-label="Scroll to about section"
      className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-ink-soft transition-colors hover:text-ink md:block"
    >
      <ArrowDown size={20} />
    </a>
  </section>
);

export default Hero;
