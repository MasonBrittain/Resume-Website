import { useEffect, useRef, useState } from 'react';
import resume from '../data/resume';
import { SECTIONS, pad } from './sections';

const { personalInfo } = resume;
const city = personalInfo.location.split(',')[0];

export function ContactLinks({ onNavigate }) {
  return (
    <>
      <a href={`mailto:${personalInfo.email}`} onClick={onNavigate}>Email</a>
      <a href={personalInfo.github} target="_blank" rel="noreferrer" onClick={onNavigate}>GitHub</a>
      <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" onClick={onNavigate}>LinkedIn</a>
    </>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.classList.add('v2-locked');
    menuRef.current?.querySelector('a')?.focus();
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      root.classList.remove('v2-locked');
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className={`v2-header${scrolled || open ? ' is-solid' : ''}`}>
        <a href="#top" className="v2-mark" aria-label={`${personalInfo.name}, back to top`} onClick={close}>
          MB
        </a>
        <span className="v2-mono v2-header__role">
          {personalInfo.title} · {city}
        </span>
        <span className="v2-header__rule" aria-hidden="true" />
        <nav aria-label="Contact" className="v2-mono v2-header__links">
          <ContactLinks />
        </nav>
        <button
          ref={toggleRef}
          type="button"
          className="v2-dots"
          aria-expanded={open}
          aria-controls="v2-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="v2-dots__grid" aria-hidden="true">
            <i /><i /><i /><i />
          </span>
          <svg className="v2-dots__close" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
            <path d="M5 5l10 10M15 5 5 15" />
          </svg>
        </button>
      </header>

      <div id="v2-menu" ref={menuRef} className={`v2-menu${open ? ' is-open' : ''}`} inert={!open}>
        <nav aria-label="Menu">
          <ol className="v2-menu__list">
            {SECTIONS.map((s, i) => (
              <li key={s.id} style={{ '--i': i }}>
                <a href={`#${s.id}`} onClick={close}>
                  <span className="v2-mono">{pad(i + 1)}</span>
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="v2-mono v2-menu__links">
          <ContactLinks onNavigate={close} />
        </div>
      </div>
    </>
  );
}
