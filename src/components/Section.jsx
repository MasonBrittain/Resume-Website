import useReveal from '../hooks/useReveal';

const Section = ({ id, kicker, title, children, className = '' }) => {
  const ref = useReveal();

  return (
    <section id={id} className={`px-6 py-24 ${className}`}>
      <div ref={ref} className="reveal mx-auto max-w-5xl">
        <p className="flex items-center gap-3 font-display text-sm font-semibold uppercase tracking-[0.2em] gradient-text">
          <span aria-hidden="true" className="gradient-bg h-px w-8" />
          {kicker}
        </p>
        <h2 className="mt-3 mb-12 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
};

export default Section;
