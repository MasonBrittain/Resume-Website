import useActiveSection from '../hooks/useActiveSection';
import { SECTIONS, SECTION_IDS, pad } from './sections';

// The numbered index pinned to the left edge on wide screens.
export default function Rail() {
  const active = useActiveSection(SECTION_IDS);

  return (
    <nav className="v2-rail" aria-label="Sections">
      <ol>
        {SECTIONS.map((s, i) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <a href={`#${s.id}`} className={isActive ? 'is-active' : undefined} aria-current={isActive ? 'true' : undefined}>
                <b>{pad(i + 1)}</b>
                <span className="v2-mono">{s.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
