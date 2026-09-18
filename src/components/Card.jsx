// White surface with hover lift, gradient border ring and cursor spotlight
// (styles live in index.css under .card). The pointer position is written
// straight onto the element as --mx/--my so hovering never re-renders.
const setSpotlight = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
};

const Card = ({ as: Tag = 'div', className = '', children, ...props }) => (
  <Tag onMouseMove={setSpotlight} className={`card ${className}`} {...props}>
    {children}
  </Tag>
);

export default Card;
