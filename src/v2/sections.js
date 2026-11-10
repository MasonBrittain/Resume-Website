// Section order shared by the side rail, the menu, and the page itself.
export const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export const SECTION_IDS = SECTIONS.map((s) => s.id);

export const pad = (n) => String(n).padStart(2, '0');

export const slug = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
