'use client';

import { INTRO, ROLES, totals } from '@/lib/content';
import { RevealLines, Rise } from './Reveal';

/**
 * The introduction, carried over verbatim from virsrinivas.com.
 *
 * There is no portrait here. A filmmaker's page should lead with the work,
 * and with the photograph gone the text can take the full measure of the
 * page rather than squeezing into a column beside it.
 */
export function Intro() {
  return (
    <section id="about" className="gutter rule-top py-[clamp(5rem,14vh,10rem)]">
      <RevealLines
        as="h2"
        lines={['Introduction']}
        className="meta text-figure-faint mb-[clamp(2.5rem,7vh,4.5rem)]"
      />

      <div className="grid gap-[clamp(2rem,5vw,4rem)] lg:grid-cols-12">
        {/* The opening sentence, at display scale. */}
        <div className="lg:col-span-7">
          <Rise>
            <p className="display max-w-[16ch] text-[clamp(2rem,5vw,4.25rem)] leading-[1.04]">
              {INTRO[0]}
            </p>
          </Rise>
        </div>

        {/* The rest, as a reading column. */}
        <div className="space-y-[clamp(1.25rem,2.5vh,1.75rem)] lg:col-span-5">
          {INTRO.slice(1).map((paragraph, i) => (
            <Rise key={i} delay={0.1 + i * 0.08}>
              <p className="prose-lg text-figure-muted max-w-[52ch]">
                {paragraph}
              </p>
            </Rise>
          ))}
        </div>
      </div>

      <Rise delay={0.24}>
        <dl className="mt-[clamp(3rem,8vh,5rem)] grid grid-cols-2 gap-x-8 gap-y-8 border-t border-[var(--rule)] pt-7 sm:grid-cols-5">
          {ROLES.map((role) => (
            <div key={role}>
              <dt className="meta-sm text-figure-faint">Credit</dt>
              <dd className="display display-sm mt-2">{role}</dd>
            </div>
          ))}
          <div>
            <dt className="meta-sm text-figure-faint">Wins</dt>
            <dd className="display display-sm mt-2 tabular-nums">
              {totals.wins}
            </dd>
          </div>
          <div>
            <dt className="meta-sm text-figure-faint">Nominations</dt>
            <dd className="display display-sm mt-2 tabular-nums">
              {totals.nominations}
            </dd>
          </div>
        </dl>
      </Rise>
    </section>
  );
}
