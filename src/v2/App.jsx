import About from './About';
import Contact from './Contact';
import Education from './Education';
import Experience from './Experience';
import Field from './Field';
import Header from './Header';
import Hero from './Hero';
import Projects from './Projects';
import Rail from './Rail';
import Skills from './Skills';
import resume from '../data/resume';

const { personalInfo } = resume;

export default function App() {
  return (
    <>
      <a className="v2-skip" href="#main">Skip to content</a>
      <div className="v2-ground" aria-hidden="true" />
      <Field />
      <div className="v2-vignette" aria-hidden="true" />
      <div className="v2-grain" aria-hidden="true" />

      <Header />
      <Rail />

      <main id="main" className="v2-main v2-wrap">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>

      <footer className="v2-footer v2-wrap v2-mono">
        <span>© {new Date().getFullYear()} {personalInfo.name}</span>
        <span className="v2-footer__links">
          <a href="/">Previous version</a>
          <a href="https://github.com/MasonBrittain/Resume-Website" target="_blank" rel="noreferrer">Source</a>
        </span>
      </footer>
    </>
  );
}
