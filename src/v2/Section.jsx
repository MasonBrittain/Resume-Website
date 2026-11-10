// Every section opens the same way: its name at poster scale and a hairline
// that draws across as the heading scrolls in. The side rail carries the index.
export default function Section({ id, title, className = '', children }) {
  return (
    <section id={id} className={`v2-section ${className}`} aria-labelledby={`${id}-title`}>
      <div className="v2-section__head">
        <h2 id={`${id}-title`} className="v2-section__title">{title}</h2>
        <span className="v2-section__rule" aria-hidden="true" />
      </div>
      {children}
    </section>
  );
}
