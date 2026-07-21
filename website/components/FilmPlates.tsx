'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef } from 'react';
import { countAwards, films, type Film } from '@/lib/content';
import { EASE, RevealLines, Rise } from './Reveal';

/**
 * Three films, three plates, three worlds.
 *
 * A single shared row template would have been easier, but it would also
 * have flattened three very different pictures into one house style. Each
 * plate instead takes its composition, its palette and its typographic
 * voice from the film it holds — and while a plate owns the viewport it
 * drives the page's --accent, so the whole site changes temperature as
 * you move down it.
 */
export function FilmPlates() {
  return (
    <section id="work" className="relative">
      <PlatesHeader />
      {films.map((film, i) => (
        <Plate key={film.slug} film={film} index={i} />
      ))}
    </section>
  );
}

function PlatesHeader() {
  return (
    <header className="gutter flex items-baseline justify-between gap-6 pt-[clamp(4rem,10vh,7rem)] pb-[clamp(2rem,5vh,3.5rem)]">
      <RevealLines as="h2" lines={['Films']} className="display display-md" />
      <span className="meta text-bone-faint">
        {String(films.length).padStart(2, '0')} titles
      </span>
    </header>
  );
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V'];

function Plate({ film, index }: { film: Film; index: number }) {
  const ref = useRef<HTMLElement>(null);
  // Hand the page over to this film once the plate covers most of the view.
  const owns = useInView(ref, { margin: '-45% 0px -45% 0px' });

  useEffect(() => {
    if (!owns) return;
    const root = document.documentElement;
    root.style.setProperty('--accent', film.identity.accent);
    root.style.setProperty('--on-accent', film.identity.onAccent);
    root.style.setProperty('--ground', film.identity.ground);
    return () => {
      root.style.setProperty('--accent', '#ece7de');
      root.style.setProperty('--on-accent', '#08080a');
      root.style.setProperty('--ground', '#08080a');
    };
  }, [owns, film.identity]);

  const Composition = {
    documentary: DocumentaryPlate,
    liturgical: LiturgicalPlate,
    systemic: SystemicPlate,
  }[film.identity.register];

  return (
    <article
      ref={ref as never}
      className={`register-${film.identity.register} relative overflow-hidden`}
    >
      <Composition film={film} numeral={ROMAN[index]} />
    </article>
  );
}

interface PlateProps {
  film: Film;
  numeral: string;
}

/* ───────────────────────────────────────────────────────────────────
   I — Documentary. Orders from Above.

   Evidentiary and wide. The frame runs edge to edge in hard monochrome
   with the title laid across the bottom of it, the way a title card sits
   over the last shot of a scene. No colour, because the film has none.
   ─────────────────────────────────────────────────────────────────── */
function DocumentaryPlate({ film, numeral }: PlateProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <PlateLink film={film}>
      <div
        ref={ref}
        className="relative flex h-[92svh] min-h-[560px] items-end overflow-hidden"
      >
        <motion.div style={{ y }} className="absolute inset-[-8%] z-0">
          <video
            className="plate-media h-full w-full object-cover"
            src={film.preview}
            poster={film.poster}
            autoPlay
            loop
            muted
            playsInline
          />
        </motion.div>
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[var(--ground)] via-[var(--ground)]/35 to-[var(--ground)]/55" />

        <div className="gutter relative z-10 w-full pb-[clamp(2rem,6vh,4rem)]">
          <PlateIndex numeral={numeral} film={film} />

          <h3 className="display display-lg mt-6">
            <PlateTitle lines={film.titleLines} />
          </h3>

          <div className="mt-7 grid gap-6 border-t border-[var(--rule)] pt-5 md:grid-cols-12">
            <p className="prose-lg text-bone-muted md:col-span-6 md:max-w-[var(--plate-measure)]">
              {film.logline}
            </p>
            <div className="md:col-span-4 md:col-start-9 md:text-right">
              <PlateAwards film={film} align="end" />
            </div>
          </div>
        </div>
      </div>
    </PlateLink>
  );
}

/* ───────────────────────────────────────────────────────────────────
   II — Liturgical. The Proselyte.

   A shaft of candlelight falling into a blue dark. Everything is centred
   and still: the poster hangs like an altarpiece, the type is set narrow
   beneath it, and nothing moves quickly.
   ─────────────────────────────────────────────────────────────────── */
function LiturgicalPlate({ film, numeral }: PlateProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });

  return (
    <PlateLink film={film}>
      <div
        ref={ref}
        className="relative flex min-h-[92svh] flex-col items-center justify-center overflow-hidden py-[clamp(4rem,10vh,7rem)]"
      >
        {/* The light. A single soft shaft, angled, from above. */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0.7 }}
          animate={inView ? { opacity: 1, scaleY: 1 } : undefined}
          transition={{ duration: 2.4, ease: EASE }}
          style={{ transformOrigin: 'top' }}
          className="light-shaft pointer-events-none absolute top-[-14%] left-1/2 z-0 h-[105%] w-[26vw] max-w-[20rem] -translate-x-1/2 rotate-[4deg]"
        />

        <div className="gutter relative z-10 flex w-full flex-col items-center text-center">
          <PlateIndex numeral={numeral} film={film} centred />

          <Rise delay={0.15}>
            <div className="relative mt-8 aspect-[2/3] w-[min(58vw,15rem)] overflow-hidden">
              <Image
                src={film.poster}
                alt={`${film.title} poster`}
                fill
                sizes="(max-width: 768px) 58vw, 15rem"
                className="plate-media object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-[var(--rule)]" />
            </div>
          </Rise>

          <h3 className="display display-lg mt-9">
            <PlateTitle lines={[film.title]} />
          </h3>

          <p className="prose-lg text-bone-muted mt-6 max-w-[var(--plate-measure)]">
            {film.logline}
          </p>

          <div className="accent-rule mt-9 h-px w-16" />

          <div className="mt-6">
            <PlateAwards film={film} align="center" />
          </div>
        </div>
      </div>
    </PlateLink>
  );
}

/* ───────────────────────────────────────────────────────────────────
   III — Systemic. Gradient Descent.

   A machine looking at a person. The plate is ruled into a hairline grid,
   the meta is monospaced and left-aligned like a manifest, and the poster
   sits inside the grid as one more cell — the only red on the site.
   ─────────────────────────────────────────────────────────────────── */
function SystemicPlate({ film, numeral }: PlateProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });

  return (
    <PlateLink film={film}>
      <div
        ref={ref}
        className="relative flex min-h-[92svh] items-center overflow-hidden py-[clamp(4rem,10vh,7rem)]"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: 1.6, ease: EASE }}
          className="grid-rule pointer-events-none absolute inset-0 z-0"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              'radial-gradient(120% 70% at 22% 62%, color-mix(in oklab, var(--accent) 9%, transparent), transparent 62%)',
          }}
        />

        <div className="gutter relative z-10 grid w-full items-center gap-[clamp(2.5rem,6vw,4.5rem)] lg:grid-cols-12">
          <div className="lg:col-span-7">
            <PlateIndex numeral={numeral} film={film} />

            <h3 className="display display-lg mt-6">
              <PlateTitle lines={film.titleLines} />
            </h3>

            <p className="prose-lg text-bone-muted mt-6 max-w-[var(--plate-measure)]">
              {film.logline}
            </p>

            <dl className="meta text-bone-faint mt-9 flex flex-wrap gap-x-8 gap-y-2 border-t border-[var(--rule)] pt-5">
              <div className="flex gap-2">
                <dt>Runtime</dt>
                <dd className="text-bone-muted">{film.runtime}</dd>
              </div>
              <div className="flex gap-2">
                <dt>Year</dt>
                <dd className="text-bone-muted">{film.year}</dd>
              </div>
              <div className="flex gap-2">
                <dt>Format</dt>
                <dd className="text-bone-muted">{film.format}</dd>
              </div>
            </dl>

            <div className="mt-8">
              <PlateAwards film={film} align="start" />
            </div>
          </div>

          <Rise delay={0.15} className="lg:col-span-4 lg:col-start-9">
            <div className="relative aspect-[2/3] w-[min(58vw,17rem)] overflow-hidden lg:w-full">
              <Image
                src={film.poster}
                alt={`${film.title} poster`}
                fill
                sizes="(max-width: 1024px) 58vw, 22vw"
                className="plate-media object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-[var(--rule)]" />
            </div>
          </Rise>
        </div>
      </div>
    </PlateLink>
  );
}

/* ─── Shared parts ─────────────────────────────────────────────────── */

function PlateLink({
  film,
  children,
}: {
  film: Film;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={`/${film.slug}`}
      aria-label={`${film.title} — ${film.format}, ${film.year}`}
      className="group block border-t border-[var(--rule)]"
    >
      {children}
    </Link>
  );
}

/** The reel counter and the film's stamp, in the accent of the moment. */
function PlateIndex({
  numeral,
  film,
  centred = false,
}: {
  numeral: string;
  film: Film;
  centred?: boolean;
}) {
  return (
    <Rise>
      <div
        className={`flex items-center gap-4 ${centred ? 'justify-center' : ''}`}
      >
        <span className="display accent text-[1.5rem] leading-none">
          {numeral}
        </span>
        <span className="accent-rule h-px w-10" />
        <span className="meta text-bone-muted">
          {film.format} · {film.year}
        </span>
      </div>
    </Rise>
  );
}

/** Awards for this film, stated plainly or omitted entirely. */
function PlateAwards({
  film,
  align = 'start',
}: {
  film: Film;
  /** Follows the plate's composition rather than a single house rule. */
  align?: 'start' | 'center' | 'end';
}) {
  const { wins, nominations } = countAwards(film.awards);
  const alignment = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-start md:items-end',
  }[align];

  return (
    <div className={`flex flex-col gap-2 ${alignment}`}>
      {wins > 0 && (
        <p className="meta accent">
          {wins} {wins === 1 ? 'win' : 'wins'}
          {nominations > 0 && ` · ${nominations} nominations`}
        </p>
      )}
      <span className="meta text-bone-faint group-hover:text-bone inline-flex items-center gap-2.5 transition-colors duration-500">
        View the film
        <span
          aria-hidden
          className="inline-block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
        >
          →
        </span>
      </span>
    </div>
  );
}

/** The title, rising out of a mask and drifting on hover. */
function PlateTitle({ lines }: { lines: string[] }) {
  return (
    <span className="inline-block transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[clamp(0.35rem,1vw,1.25rem)]">
      <RevealLines lines={lines} delay={0.1} />
    </span>
  );
}
