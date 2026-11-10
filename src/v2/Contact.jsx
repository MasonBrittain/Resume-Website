import { useEffect, useState } from 'react';
import resume from '../data/resume';
import { Arrow, ArrowOut } from './Arrow';
import Section from './Section';

const { personalInfo } = resume;
const [emailUser, emailDomain] = personalInfo.email.split('@');

const copyLabels = {
  idle: 'Copy address',
  copied: 'Copied',
  failed: "Couldn't copy. Select the address instead",
};

export default function Contact() {
  // mailto does nothing without a mail app, so the address can go on the
  // clipboard instead; 'failed' covers browsers that block clipboard access.
  const [copyState, setCopyState] = useState('idle');

  useEffect(() => {
    if (copyState === 'idle') return;
    const id = setTimeout(() => setCopyState('idle'), 2500);
    return () => clearTimeout(id);
  }, [copyState]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
  };

  return (
    <Section id="contact" title="Let's build something with data." className="v2-contact">
      <p className="v2-contact__copy">
        I'm a data engineer at Raining Virtue, and I'm open to the right full-time software or data
        engineering role. Email is the fastest way to reach me.
      </p>

      <div className="v2-contact__actions">
        <a className="v2-btn v2-btn--primary v2-btn--address" href={`mailto:${personalInfo.email}`}>
          <span className="v2-btn__address">
            {emailUser}@<wbr />
            {emailDomain}
          </span>
          <Arrow />
        </a>
        <button
          type="button"
          className={`v2-btn v2-btn--ghost v2-mono${copyState === 'copied' ? ' is-done' : ''}`}
          onClick={copyEmail}
        >
          <span aria-live="polite">{copyLabels[copyState]}</span>
        </button>
      </div>

      <ul className="v2-contact__links v2-mono">
        <li>
          <a href={`tel:${personalInfo.phone.replace(/[^\d+]/g, '')}`}>{personalInfo.phone}</a>
        </li>
        <li>
          <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">
            LinkedIn <ArrowOut />
          </a>
        </li>
        <li>
          <a href={personalInfo.github} target="_blank" rel="noreferrer">
            GitHub <ArrowOut />
          </a>
        </li>
      </ul>
    </Section>
  );
}
