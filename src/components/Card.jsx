// White surface (styles live in index.css under .card). Pass `interactive`
// only when the whole card is a link, so hover feedback is never a false
// promise on static content.
const Card = ({ as: Tag = 'div', interactive = false, className = '', children, ...props }) => (
  <Tag className={`card ${interactive ? 'card-link' : ''} ${className}`} {...props}>
    {children}
  </Tag>
);

export default Card;
