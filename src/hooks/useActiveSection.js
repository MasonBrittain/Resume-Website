import { useEffect, useState } from 'react';

// Tracks which section is currently under the nav and returns its id.
// The rootMargin shrinks the viewport to a band just below the fixed header,
// so a section becomes active once it scrolls up into that band. The last
// section is often too short to ever reach that band, so at the very bottom
// of the page it wins outright.
export default function useActiveSection(ids) {
  const [active, setActive] = useState('');

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length) return;

    const visible = new Set();
    const atBottom = () =>
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

    const update = () => {
      // Keep document order so overlapping sections resolve to the topmost one.
      // Falls back to '' so nothing stays highlighted once back up in the hero.
      setActive(atBottom() ? ids[ids.length - 1] : ids.find((id) => visible.has(id)) ?? '');
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });
        update();
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', update);
    };
  }, [ids]);

  return active;
}
