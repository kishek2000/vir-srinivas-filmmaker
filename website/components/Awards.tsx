'use client';

import { motion, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import {
  countAwards,
  films,
  screenplays,
  totals,
  type Award,
} from '@/lib/content';
import { EASE, RevealLines, Rise } from './Reveal';

interface Ledger {
  title: string;
  kind: string;
  awards: Award[];
}

const ledgers: Ledger[] = [
  ...films
    .filter((film) => film.awards.length > 0)
    .map((film) => ({
      title: film.title,
      kind: film.format,
      awards: film.awards,
    })),
  ...screenplays.map((s) => ({
    title: s.title,
    kind: 'Screenplay',
    awards: s.awards,
  })),
];

/**
 * A credits-roll ledger rather than a wall of trophy cards. Every line is
 * one festival and one category, set the way a festival laurel reads.
 */
export function Awards() {
  return (
    <section
      id="awards"
      className="gutter rule-top py-[clamp(5rem,14vh,10rem)]"
    >
      <header className="mb-[clamp(3rem,8vh,6rem)] flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
        <RevealLines
          as="h2"
          lines={['Honours', 'and awards']}
          className="display display-md"
        />

        <dl className="flex gap-x-[clamp(2rem,5vw,4rem)]">
          <Tally value={totals.wins} label="Wins" />
          <Tally value={totals.nominations} label="Nominations" />
        </dl>
      </header>

      <div className="space-y-[clamp(3rem,7vh,5rem)]">
        {ledgers.map((ledger, i) => (
          <LedgerBlock key={ledger.title} ledger={ledger} index={i} />
        ))}
      </div>
    </section>
  );
}

function LedgerBlock({ ledger, index }: { ledger: Ledger; index: number }) {
  const { wins, nominations } = countAwards(ledger.awards);

  return (
    <Rise delay={Math.min(index, 3) * 0.05}>
      <div className="grid gap-6 border-t border-[var(--rule)] pt-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-3">
          <h3 className="display display-sm">{ledger.title}</h3>
          <p className="meta-sm text-bone-faint mt-2">
            {ledger.kind}
            {' · '}
            {wins} {wins === 1 ? 'win' : 'wins'}
            {nominations > 0 && ` · ${nominations} nom.`}
          </p>
        </div>

        <ul className="lg:col-span-9">
          {ledger.awards.map((award, i) => (
            <AwardRow key={`${award.festival}-${award.category}`} award={award} index={i} />
          ))}
        </ul>
      </div>
    </Rise>
  );
}

function AwardRow({ award, index }: { award: Award; index: number }) {
  const isWin = award.result === 'Winner';

  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.7, ease: EASE, delay: Math.min(index, 8) * 0.03 }}
      className="group flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-[var(--rule)] py-3.5 last:border-b-0"
    >
      <span
        className="meta w-[5.5rem] shrink-0"
        style={{ color: isWin ? 'var(--brass)' : undefined }}
      >
        {award.note ?? award.result}
      </span>
      <span className="flex-1 text-[0.95rem] leading-snug">
        {award.category}
      </span>
      <span className="text-bone-muted w-full text-[0.8125rem] leading-snug sm:w-auto sm:max-w-[42%] sm:text-right">
        {award.festival}
      </span>
    </motion.li>
  );
}

/** Counts up once, on entry. */
function Tally({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(value);
      return;
    }
    const duration = 1100;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // easeOutExpo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setShown(Math.round(eased * value));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <div ref={ref}>
      <dd className="display display-md tabular-nums leading-none">{shown}</dd>
      <dt className="meta-sm text-bone-faint mt-3">{label}</dt>
    </div>
  );
}
