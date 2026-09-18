import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import useReveal from '../hooks/useReveal';
import resume from '../data/resume';

const { personalInfo } = resume;

const Contact = () => {
  const ref = useReveal();

  return (
    <section id="contact" className="px-6 py-24">
      <div
        ref={ref}
        className="reveal relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-night px-8 py-16 text-center text-white shadow-2xl shadow-brand-blue/20 ring-1 ring-white/10 sm:px-14 sm:py-20"
      >
        {/* Same dark stage as the hero: grid + glow orbs */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="bg-grid absolute inset-0 mask-[radial-gradient(ellipse_60%_80%_at_50%_50%,black,transparent)]" />
          <div className="animate-float absolute -top-24 -left-16 h-72 w-72 rounded-full bg-brand-violet/40 blur-3xl" />
          <div
            className="animate-float absolute -right-16 -bottom-24 h-72 w-72 rounded-full bg-brand-cyan/30 blur-3xl"
            style={{ animationDuration: '10s', animationDelay: '-4s' }}
          />
        </div>

        <div className="relative">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
            Let's build something <span className="gradient-text">with data.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/65">
            I'm always happy to talk about data engineering, BI consulting, or
            interesting projects. The fastest way to reach me is email.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${personalInfo.email}`}
              className="gradient-bg flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white shadow-lg shadow-brand-blue/40 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-violet/40"
            >
              <Mail size={18} /> {personalInfo.email}
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur transition-colors hover:border-white/40 hover:bg-white/10"
            >
              <Linkedin size={18} /> LinkedIn
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur transition-colors hover:border-white/40 hover:bg-white/10"
            >
              <Github size={18} /> GitHub
            </a>
          </div>

          <p className="mt-7 flex items-center justify-center gap-2 font-mono text-sm text-white/50">
            <Phone size={14} /> {personalInfo.phone}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
