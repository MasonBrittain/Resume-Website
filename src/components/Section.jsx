const Section = ({ id, title, children, className = '' }) => (
  <section id={id} className={`px-6 py-20 sm:py-24 ${className}`}>
    <div className="mx-auto max-w-5xl">
      <h2 className="mb-10 font-display text-4xl font-bold tracking-tight text-ink sm:mb-12 sm:text-5xl">
        {title}
      </h2>
      {children}
    </div>
  </section>
);

export default Section;
