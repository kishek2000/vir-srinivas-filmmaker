'use client';

import { EMAIL, IMDB_PROFILE, NAME } from '@/lib/content';
import { RevealLines, Rise } from './Reveal';

/**
 * Deliberately bare. No closing statement about the work — the films have
 * already spoken, and a summary line would only narrow them.
 */
export function Contact() {
  return (
    <footer
      id="contact"
      className="gutter rule-top pt-[clamp(5rem,14vh,10rem)] pb-[clamp(2.5rem,6vh,4rem)]"
    >
      <RevealLines
        as="h2"
        lines={['Get in touch']}
        className="meta text-bone-faint mb-[clamp(2rem,5vh,3.5rem)]"
      />

      <Rise>
        <a
          href={`mailto:${EMAIL}`}
          className="display block leading-[1.05] break-words transition-opacity duration-500 hover:opacity-60 text-[clamp(1.75rem,6.5vw,5.5rem)]"
        >
          {EMAIL}
        </a>
      </Rise>

      <Rise delay={0.1}>
        <div className="mt-[clamp(3.5rem,10vh,7rem)] flex flex-wrap items-end justify-between gap-x-10 gap-y-6 border-t border-[var(--rule)] pt-6">
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            <a
              href={IMDB_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="meta link-draw text-bone-muted hover:text-bone transition-colors duration-500"
            >
              IMDb
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="meta link-draw text-bone-muted hover:text-bone transition-colors duration-500"
            >
              Email
            </a>
          </nav>

          <p className="meta-sm text-bone-faint">
            © {new Date().getFullYear()} {NAME}. All rights reserved.
          </p>
        </div>
      </Rise>
    </footer>
  );
}
