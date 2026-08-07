import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import useActiveSection from '../hooks/useActiveSection';

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

const Nav = () => {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-200/70 bg-paper/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-lg font-bold gradient-text">
          MB
        </a>

        <div className="hidden items-center gap-7 sm:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={active === link.href.slice(1) ? 'true' : undefined}
              className={`text-sm font-medium transition-colors ${
                active === link.href.slice(1)
                  ? 'gradient-text font-semibold'
                  : 'text-ink-soft hover:text-ink'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="gradient-bg rounded-full px-4 py-1.5 text-sm font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5"
          >
            Hire me
          </a>
        </div>

        <button
          className="sm:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="flex flex-col gap-1 border-t border-zinc-200/70 bg-paper px-6 py-4 sm:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              aria-current={active === link.href.slice(1) ? 'true' : undefined}
              className={`py-2 text-sm font-medium ${
                active === link.href.slice(1)
                  ? 'gradient-text font-semibold'
                  : 'text-ink-soft hover:text-ink'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Nav;
