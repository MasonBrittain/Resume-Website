import { useEffect, useRef } from 'react';
import { createField } from './particles';

// Each group is cleared as one rectangle spanning its first to last element.
const QUIET_GROUPS = [['.v2-status'], ['.v2-contact__copy', '.v2-contact__links']];

const unionRect = (selectors) => {
  const rects = selectors.map((sel) => document.querySelector(sel)?.getBoundingClientRect()).filter(Boolean);
  if (!rects.length) return null;
  return {
    left: Math.min(...rects.map((r) => r.left)),
    right: Math.max(...rects.map((r) => r.right)),
    top: Math.min(...rects.map((r) => r.top)),
    bottom: Math.max(...rects.map((r) => r.bottom)),
  };
};

const smooth = (edge0, edge1, x) => {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

// Full strength over the first screen, dimmed behind the reading sections,
// back to full for the contact close. Phones run it a little quieter because
// text there spans the whole width.
export default function Field() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const field = createField(canvasRef.current, { reducedMotion });
    if (!field) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      const y = window.scrollY;
      const narrow = window.innerWidth < 700;
      const hero = 1 - smooth(0.1 * vh, 0.85 * vh, y);
      const contact = document.getElementById('contact');
      const close = contact ? 1 - smooth(0.25 * vh, 0.85 * vh, contact.getBoundingClientRect().top) : 0;
      const [low, high] = narrow ? [0.2, 0.72] : [0.26, 1];
      field.setGlow(low + (high - low) * Math.max(hero, close));
      field.setDrift(y / vh);

      // Clear the field from behind whichever text block sits over its
      // brightest stretches: the "Now" note at the top, the contact block at
      // the close. They are never on screen together.
      const canvas = canvasRef.current;
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      if (!cw) return;
      const pad = 20;
      const rect = QUIET_GROUPS.map(unionRect).find((r) => r && r.bottom > -pad && r.top < ch + pad);
      field.setQuiet(
        rect
          ? [(rect.left - pad) / cw * 2 - 1, 1 - (rect.bottom + pad) / ch * 2, (rect.right + pad) / cw * 2 - 1, 1 - (rect.top - pad) / ch * 2]
          : null
      );
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    document.fonts?.ready.then(onScroll); // webfonts can shift the note's position
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      field.destroy();
    };
  }, []);

  return <canvas ref={canvasRef} className="v2-field" aria-hidden="true" />;
}
