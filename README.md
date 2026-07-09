# Mason Brittain — Resume Website

Personal portfolio and resume site for Mason Brittain, Data Engineer & Business Intelligence Consultant. A bold, colorful single-page site with a gradient design system, scroll-reveal animations, and sections for experience, projects, skills, education, and contact.

**Live site:** https://masonbrittain.com/

## Tech Stack

- **React 19** + **Vite 7**
- **Tailwind CSS 4** (via `@tailwindcss/vite`)
- **lucide-react** icons
- Deployed on **Vercel**

## Updating Content

All resume content lives in one file: [`src/data/resume.js`](src/data/resume.js). Edit that file to update jobs, projects, skills, or contact info — no component changes needed.

## Development

```bash
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # production build to dist/
npm run preview  # serve the production build locally
```

## Project Structure

```
index.html              entry HTML (fonts, meta tags)
src/
  data/resume.js        all site content
  components/           one component per section
  hooks/useReveal.js    scroll-reveal animation hook
  index.css             Tailwind theme + design system
public/                 favicon, avatar, robots.txt
```
