'use client';

import { press } from '@/lib/content';
import { RevealLines, Rise } from './Reveal';

export function Press() {
  return (
    <section
      id="press"
      className="gutter rule-top py-[clamp(5rem,14vh,10rem)]"
    >
      <header className="mb-[clamp(3rem,7vh,5rem)] flex items-baseline justify-between gap-6">
        <RevealLines as="h2" lines={['Press']} className="display display-md" />
        <span className="meta text-figure-faint">
          {String(press.length).padStart(2, '0')} pieces
        </span>
      </header>

      <ul className="border-t border-[var(--rule)]">
        {press.map((item, i) => (
          <li key={item.href} className="border-b border-[var(--rule)]">
            <Rise delay={Math.min(i, 4) * 0.05}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid gap-3 py-7 transition-colors duration-500 lg:grid-cols-12 lg:gap-8"
              >
                <span className="meta text-figure-faint group-hover:text-figure-muted transition-colors duration-500 lg:col-span-3">
                  {item.outlet}
                </span>

                <div className="lg:col-span-8">
                  <h3 className="display display-sm max-w-[24ch] leading-[1.15] transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                    {item.headline}
                  </h3>
                  <p className="text-figure-muted mt-3 max-w-[64ch] text-[0.95rem] leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>

                <span
                  aria-hidden
                  className="text-figure-faint group-hover:text-figure hidden justify-end pt-2 transition-colors duration-500 lg:col-span-1 lg:flex"
                >
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path
                      d="M1 12L12 1M12 1H3.5M12 1v8.5"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </svg>
                </span>
              </a>
            </Rise>
          </li>
        ))}
      </ul>
    </section>
  );
}
