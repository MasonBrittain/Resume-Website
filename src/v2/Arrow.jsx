// Thin arrows drawn at the same stroke weight as the page's hairlines.
export function Arrow({ className = '' }) {
  return (
    <svg className={`v2-arrow ${className}`} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M3 10h13M11 5l5 5-5 5" />
    </svg>
  );
}

export function ArrowOut({ className = '' }) {
  return (
    <svg className={`v2-arrow ${className}`} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M6 14 14 6M7 6h7v7" />
    </svg>
  );
}
