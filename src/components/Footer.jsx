import resume from '../data/resume';

const Footer = () => (
  <footer className="border-t border-zinc-200 px-6 py-8">
    <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 text-sm text-ink-soft sm:flex-row">
      <p>
        © {new Date().getFullYear()} {resume.personalInfo.name}
      </p>
      <p>
        Built with React, Vite &amp; Tailwind CSS ·{' '}
        <a
          href="https://github.com/MasonBrittain/Resume-Website"
          target="_blank"
          rel="noreferrer"
          className="font-medium gradient-text"
        >
          Source
        </a>
      </p>
    </div>
  </footer>
);

export default Footer;
