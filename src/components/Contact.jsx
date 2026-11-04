import { useEffect, useState } from 'react';
import { Check, Copy, Github, Linkedin, Mail, Phone } from 'lucide-react';
import resume from '../data/resume';

const { personalInfo } = resume;

// On very narrow screens the address may need two lines; offer a break right
// after the "@" so it splits as "name@" / "domain" instead of mid-word.
const [emailUser, emailDomain] = personalInfo.email.split('@');

const ghostButton =
  'press inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white hover:border-white/40 hover:bg-white/10';

const copyLabels = {
  idle: 'Copy address',
  copied: 'Copied',
  failed: "Couldn't copy. Select the address instead",
};

const Contact = () => {
  // A mailto link does nothing without a mail app, so offer the address on
  // the clipboard as a fallback. 'failed' covers browsers that block it.
  const [copyState, setCopyState] = useState('idle');
  // Only animate the icon/label swap once the visitor has actually copied,
  // so nothing plays on page load.
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    if (copyState === 'idle') return;
    const id = setTimeout(() => setCopyState('idle'), 2500);
    return () => clearTimeout(id);
  }, [copyState]);

  const copyEmail = async () => {
    setHasCopied(true);
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
  };

  return (
    <section id="contact" className="px-6 pt-8 pb-24 sm:pt-12">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-night px-6 py-16 text-center text-white shadow-2xl shadow-stone-900/20 ring-1 ring-white/10 sm:px-14 sm:py-20">
        {/* Same dark stage as the hero: grid + still glow orbs */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="bg-grid absolute inset-0 mask-[radial-gradient(ellipse_60%_80%_at_50%_50%,black,transparent)]" />
          <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-brand-rose/30 blur-3xl" />
          <div className="absolute -right-16 -bottom-24 h-72 w-72 rounded-full bg-brand-amber/20 blur-3xl" />
        </div>

        <div className="relative">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
            Let's build something <span className="text-brand-amber">with data.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/70">
            I'm a data engineer at Raining Virtue, and I'm open to the right full-time
            software or data engineering role. Email is the fastest way to reach me.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${personalInfo.email}`}
              className="press gradient-bg inline-flex max-w-full items-center gap-2 rounded-full px-6 py-3 font-semibold text-white shadow-md shadow-black/30 hover:brightness-110"
            >
              <Mail size={18} aria-hidden="true" className="shrink-0" />
              <span className="min-w-0 wrap-anywhere">
                {emailUser}@<wbr />
                {emailDomain}
              </span>
            </a>
            <button type="button" onClick={copyEmail} className={ghostButton}>
              {copyState === 'copied' ? (
                <Check key="check" size={18} aria-hidden="true" className={hasCopied ? 'swap-in' : ''} />
              ) : (
                <Copy key="copy" size={18} aria-hidden="true" className={hasCopied ? 'swap-in' : ''} />
              )}
              <span aria-live="polite">
                <span key={copyState} className={`inline-block ${hasCopied ? 'swap-in' : ''}`}>
                  {copyLabels[copyState]}
                </span>
              </span>
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className={ghostButton}>
              <Linkedin size={18} aria-hidden="true" /> LinkedIn
            </a>
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className={ghostButton}>
              <Github size={18} aria-hidden="true" /> GitHub
            </a>
          </div>

          <a
            href={`tel:${personalInfo.phone.replace(/[^\d+]/g, '')}`}
            className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 px-3 font-mono text-sm text-white/70 transition-colors hover:text-white"
          >
            <Phone size={14} aria-hidden="true" /> {personalInfo.phone}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
