import useReveal from '../hooks/useReveal';

const Section = ({ id, kicker, title, children, className = '' }) => {
  const ref = useReveal();

  return (
    <section id={id} className={`px-6 py-20 ${className}`}>
      <div ref={ref} className="reveal mx-auto max-w-5xl">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] gradient-text">
          {kicker}
        </p>
        <h2 className="mt-2 mb-10 font-display text-3xl font-bold text-ink sm:text-4xl">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
};

export default Section;
