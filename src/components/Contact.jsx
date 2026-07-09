import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import useReveal from '../hooks/useReveal';
import resume from '../data/resume';

const { personalInfo } = resume;

const Contact = () => {
  const ref = useReveal();

  return (
    <section id="contact" className="px-6 py-20">
      <div
        ref={ref}
        className="reveal gradient-bg mx-auto max-w-5xl rounded-3xl px-8 py-14 text-center text-white shadow-2xl shadow-brand-blue/25 sm:px-14"
      >
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          Let's build something with data.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/85">
          I'm always happy to talk about data engineering, BI consulting, or
          interesting projects. The fastest way to reach me is email.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${personalInfo.email}`}
            className="flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-brand-blue shadow-lg transition-transform hover:-translate-y-0.5"
          >
            <Mail size={18} /> {personalInfo.email}
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border-2 border-white/70 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
          >
            <Linkedin size={18} /> LinkedIn
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border-2 border-white/70 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
          >
            <Github size={18} /> GitHub
          </a>
        </div>

        <p className="mt-6 flex items-center justify-center gap-2 text-sm text-white/75">
          <Phone size={14} /> {personalInfo.phone}
        </p>
      </div>
    </section>
  );
};

export default Contact;
