import { useEffect, useRef, useState } from 'react';
import { Mail, Menu, X } from 'lucide-react';
import useActiveSection from '../hooks/useActiveSection';
import resume from '../data/resume';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

// Module-level so the array identity stays stable across renders.
const sectionIds = links.map((link) => link.href.slice(1));

const mailto = `mailto:${resume.personalInfo.email}`;

const Nav = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const active = useActiveSection(sectionIds);
  const toggleRef = useRef(null);

  // Transparent while sitting over the dark hero, frosted paper once scrolled.
  // pastHero flips once the hero (and its own "Email me" button) is out of view.
  useEffect(() => {
    const hero = document.getElementById('top');
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setPastHero(hero ? window.scrollY > hero.offsetHeight - 80 : true);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // While the mobile menu is open, Escape or a real scroll closes it.
  useEffect(() => {
    if (!open) return;
    const openedAt = window.scrollY;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onScroll = () => {
      if (Math.abs(window.scrollY - openedAt) > 48) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onScroll);
    };
  }, [open]);

  const solid = scrolled || open;

  const linkClass = (href) => {
    if (active === href.slice(1)) {
      return solid ? 'font-semibold text-brand-orange-deep' : 'font-semibold text-white';
    }
    return solid ? 'text-ink-soft hover:text-ink' : 'text-white/70 hover:text-white';
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ease-out ${
        solid
          ? 'border-stone-200/70 bg-paper/80 backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <a
          href="#top"
          className={`font-display text-lg font-bold transition-colors ${solid ? 'text-ink' : 'text-white'}`}
        >
          MB
        </a>

        <div className="hidden items-center gap-7 sm:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={active === link.href.slice(1) ? 'true' : undefined}
              className={`py-2 text-sm font-medium transition-colors ${linkClass(link.href)}`}
            >
              {link.label}
            </a>
          ))}
          {/* Outlined while the hero's own "Email me" is on screen, so there is one
              primary button at a time; solid once the page scrolls past it */}
          <a
            href={mailto}
            className={`press inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold ${
              pastHero
                ? 'gradient-bg border-transparent text-white hover:brightness-110'
                : solid
                  ? 'border-stone-300 text-ink hover:border-stone-400 hover:bg-stone-100'
                  : 'border-white/30 bg-white/5 text-white hover:border-white/50 hover:bg-white/10'
            }`}
          >
            <Mail size={15} aria-hidden="true" /> Email me
          </a>
        </div>

        <button
          ref={toggleRef}
          className={`press -mr-2.5 inline-flex h-11 w-11 items-center justify-center rounded-full sm:hidden ${
            solid ? 'text-ink' : 'text-white'
          }`}
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Always mounted so it can animate both ways: drops in from under the
          bar on open, leaves faster on close. `invisible` takes the closed
          menu out of the tab order and the accessibility tree. */}
      <div
        id="mobile-menu"
        className={`absolute inset-x-0 top-full flex max-h-[calc(100dvh-4.25rem)] flex-col overflow-y-auto overscroll-contain border-b border-stone-200/70 bg-paper px-6 pt-2 pb-5 shadow-lg shadow-stone-900/5 transition-[opacity,translate,visibility] ease-out motion-reduce:translate-y-0 sm:hidden ${
          open ? 'visible translate-y-0 opacity-100 duration-200' : 'invisible -translate-y-2 opacity-0 duration-150'
        }`}
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            aria-current={active === link.href.slice(1) ? 'true' : undefined}
            className={`py-3 text-base font-medium ${linkClass(link.href)}`}
          >
            {link.label}
          </a>
        ))}
        <a
          href={mailto}
          onClick={() => setOpen(false)}
          className="press gradient-bg mt-3 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-semibold text-white"
        >
          <Mail size={18} aria-hidden="true" /> Email me
        </a>
      </div>
    </header>
  );
};

export default Nav;
