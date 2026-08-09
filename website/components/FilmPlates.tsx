'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import type { CSSProperties } from 'react';
import { useRef } from 'react';
import { films, themeVars, type Film } from '@/lib/content';
import { EASE, RevealLines, Rise } from './Reveal';

/**
 * Three films, three plates, three worlds.
 *
 * The first pass here was one row template nudged three ways — left,
 * centred, left-with-poster — in a single typeface. That reads as a house
 * style, not as three pictures. So each plate now changes its typeface,
 * its scale and its skeleton, and every one of those choices is traced to
 * something the film actually contains: the total absence of colour in one,
 * the polyptych poster of another, the machine-text face of the third.
 *
 * Each plate paints its own ground and scopes its own theme variables, so
 * the colour is simply what that section is — correct on first paint, with
 * no global state and nothing to animate between.
 */
export function FilmPlates() {
  return (
    <section id="work">
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
      <span className="meta text-figure-faint">
        {String(films.length).padStart(2, '0')} titles
      </span>
    </header>
  );
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V'];

/** A shallow Romanesque arch — an altarpiece is arched, and the top panel
 *  of the Proselyte poster is a face, which an arch frames rather than
 *  spoils. Kept shallow so none of the face is lost. */
const ARCH = '50% 50% 0 0 / 20% 20% 0 0';

function Plate({ film, index }: { film: Film; index: number }) {
  const Composition = {
    documentary: DocumentaryPlate,
    liturgical: LiturgicalPlate,
    systemic: SystemicPlate,
  }[film.identity.register];

  return (
    <article
      style={themeVars(film.identity) as CSSProperties}
      className={`register-${film.identity.register} relative overflow-hidden border-t border-[var(--rule)]`}
    >
      <Composition film={film} numeral={ROMAN[index]} />
    </article>
  );
}

interface PlateProps {
  film: Film;
  numeral: string;
}

/* ═══════════════════════════════════════════════════════════════════
   I — THE ROOM.  Orders from Above.

   The whole film happens in one low-lit room: two men, a desk, a
   typewriter running. So the plate is that room. The frame fills the
   screen and the title lies across the foot of it at the largest scale
   on the site, the way a title card sits over the last shot of a scene.

   The ground is a warm sepia black rather than a neutral one — the film
   is monochrome but it is not cold, and the warmth is what separates
   this room from the blue chapel that follows it.

   It closes on the roll of festivals. Sixteen wins is the most
   remarkable fact about this film, and a number in a box wastes it, so
   every festival is named.
   ═══════════════════════════════════════════════════════════════════ */
function DocumentaryPlate({ film, numeral }: PlateProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-9%', '9%']);

  const wins = film.awards.filter((a) => a.result === 'Winner');
  // Several festivals gave it more than one prize. Listing the name once
  // per prize looks like a duplication bug, so the roll names each
  // festival once and the count above it carries the full total.
  const festivals = [...new Set(wins.map((a) => a.festival))];

  return (
    <PlateLink film={film}>
      <div
        ref={ref}
        className="relative flex h-[96svh] min-h-[600px] items-end overflow-hidden"
      >
        <motion.div style={{ y }} className="absolute inset-[-9%] z-0">
          <video
            className="plate-media h-full w-full object-cover"
            src={film.preview}
            poster={film.previewPoster}
            autoPlay
            loop
            muted
            playsInline
          />
        </motion.div>
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[var(--ground)] via-[var(--ground)]/45 to-[var(--ground)]/62" />
        {/* Scanlines, as on a tape dub of the original recording. */}
        <div
          aria-hidden
          className="scanlines pointer-events-none absolute inset-0 z-0 opacity-70 mix-blend-multiply"
        />

        {/* Edge code, running down the left margin of the frame. */}
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 hidden w-[var(--gutter)] items-center justify-center lg:flex">
          <span className="edge-code meta-sm text-figure-faint">
            {film.title} · {film.year} · {film.runtime}
          </span>
        </div>

        <div className="gutter relative z-10 w-full pb-[clamp(2rem,6vh,3.5rem)]">
          <PlateIndex numeral={numeral} film={film} />

          <h3 className="voice mt-5">
            <PlateTitle lines={film.titleLines} />
          </h3>

          <div className="mt-8 grid gap-x-10 gap-y-7 border-t border-[var(--rule)] pt-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="prose-lg text-figure-muted max-w-[var(--plate-measure)]">
                {film.logline}
              </p>
              <div className="mt-7">
                <PlateAction />
              </div>
            </div>

            {/* The roll of festivals. Every win, named. */}
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="meta accent mb-3.5">
                Winner · {wins.length} awards across {festivals.length}{' '}
                festivals
              </p>
              <ul className="meta-sm text-figure-faint columns-2 gap-x-8 [column-fill:balance] sm:columns-3">
                {festivals.map((festival) => (
                  <li
                    key={festival}
                    className="mb-2 break-inside-avoid leading-snug"
                  >
                    {festival}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PlateLink>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   II — LITURGICAL.  The Proselyte.

   The poster is a polyptych: four stacked panels, each face lit in a
   different colour, read top to bottom like an altarpiece. So the plate
   is built as one — narrow, vertical, symmetrical, standing in a blue
   dark under a single shaft of candlelight.

   The title is an inscription rather than a headline: small, wide,
   letterspaced, cut above the door. This is the one plate that does not
   raise its voice, and the silence is the point.
   ═══════════════════════════════════════════════════════════════════ */
function LiturgicalPlate({ film, numeral }: PlateProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-18% 0px' });
  // The single most significant award, stated in full rather than counted.
  const headline = film.awards.find((a) => a.result === 'Winner');

  return (
    <PlateLink film={film}>
      <div
        ref={ref}
        className="relative flex min-h-[96svh] flex-col items-center justify-center overflow-hidden py-[clamp(3.5rem,9vh,6rem)]"
      >
        {/* Blood: a wash seeping in along the top edge, and a single line
            running down from it. */}
        <div
          aria-hidden
          className="blood-wash pointer-events-none absolute inset-x-0 top-0 z-0 h-[22%]"
        />
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : undefined}
          transition={{ duration: 2.6, ease: EASE }}
          style={{ transformOrigin: 'top' }}
          className="blood-bleed pointer-events-none absolute top-0 left-1/2 z-0 h-[46%] w-[2px] -translate-x-1/2"
        />

        <motion.div
          initial={{ opacity: 0, scaleY: 0.65 }}
          animate={inView ? { opacity: 1, scaleY: 1 } : undefined}
          transition={{ duration: 2.8, ease: EASE }}
          style={{ transformOrigin: 'top' }}
          className="light-shaft pointer-events-none absolute top-[-16%] left-1/2 z-0 h-[112%] w-[24vw] max-w-[19rem] -translate-x-1/2 rotate-[3deg]"
        />

        <div className="gutter relative z-10 flex w-full max-w-[38rem] flex-col items-center text-center">
          <PlateIndex numeral={numeral} film={film} align="center" />

          {/* The altarpiece. Tall, narrow, standing in the light. */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1.8, ease: EASE, delay: 0.25 }}
            style={{ borderRadius: ARCH }}
            className="relative mt-8 aspect-[2/3] w-[min(46vw,11.5rem)] overflow-hidden"
          >
            <Image
              src={film.poster}
              alt={`${film.title} poster`}
              fill
              sizes="(max-width: 768px) 56vw, 14rem"
              className="plate-media object-cover"
            />
            <div
              style={{ borderRadius: ARCH }}
              className="absolute inset-0 ring-1 ring-inset ring-[var(--rule-strong)]"
            />
          </motion.div>

          {/* The inscription. */}
          <h3 className="voice accent mt-9">
            <PlateTitle lines={[film.title]} />
          </h3>

          <div className="accent-rule mt-7 h-px w-12" />

          <p className="prose-lg text-figure-muted mt-7 max-w-[var(--plate-measure)]">
            {film.logline}
          </p>

          {headline && (
            <p className="meta text-figure-faint mt-7">
              {headline.result} · {headline.category} · {headline.festival}
            </p>
          )}

          <div className="mt-7">
            <PlateAction />
          </div>
        </div>
      </div>
    </PlateLink>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   III — THE WHITE ROOM.  Gradient Descent.

   Every frame of this film is a bright fluorescent office: rows of people
   in white shirts at white desks, being processed. So the page inverts
   for it. Near-white ground, faint grid, black monospace title — the way
   a system addresses a record rather than the way a person says a name —
   and the poster's red as the only colour in the room.

   Coming out of the blue chapel into this is a hard cut out of the dark,
   which is the same cut the film makes.
   ═══════════════════════════════════════════════════════════════════ */
function SystemicPlate({ film, numeral }: PlateProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12% 0px' });

  return (
    <PlateLink film={film}>
      <div
        ref={ref}
        className="relative flex min-h-[96svh] items-center overflow-hidden py-[clamp(4rem,10vh,7rem)]"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: 1.8, ease: EASE }}
          className="grid-rule pointer-events-none absolute inset-0 z-0"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              'radial-gradient(120% 70% at 22% 62%, color-mix(in oklab, var(--accent) 5%, transparent), transparent 62%)',
          }}
        />

        <div className="gutter relative z-10 grid w-full items-center gap-[clamp(2.5rem,6vw,4.5rem)] lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="mb-6 flex items-center gap-3">
              <span
                aria-hidden
                className="size-2 rounded-full"
                style={{ backgroundColor: 'var(--signal)' }}
              />
              <PlateIndex numeral={numeral} film={film} />
            </div>

            <h3 className="voice">
              <PlateTitle lines={film.titleLines} />
            </h3>

            <p className="prose-lg text-figure-muted mt-7 max-w-[var(--plate-measure)]">
              {film.logline}
            </p>

            {/* The manifest. */}
            <dl className="meta text-figure-faint mt-9 grid max-w-lg grid-cols-3 gap-x-6 gap-y-1 border-t border-[var(--rule)] pt-5">
              <dt>Runtime</dt>
              <dt>Year</dt>
              <dt>Format</dt>
              <dd className="text-figure-muted">{film.runtime}</dd>
              <dd className="text-figure-muted">{film.year}</dd>
              <dd className="text-figure-muted">{film.format}</dd>
            </dl>

            <div className="mt-9">
              <PlateAction />
            </div>
          </div>

          <Rise delay={0.15} className="lg:col-span-4 lg:col-start-9">
            <div className="relative aspect-[2/3] w-[min(56vw,16rem)] overflow-hidden lg:w-full">
              <Image
                src={film.poster}
                alt={`${film.title} poster`}
                fill
                sizes="(max-width: 1024px) 56vw, 22vw"
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
      className="group block"
    >
      {children}
    </Link>
  );
}

/** The reel counter, in the accent of the moment. */
function PlateIndex({
  numeral,
  film,
  align = 'start',
}: {
  numeral: string;
  film: Film;
  align?: 'start' | 'center';
}) {
  return (
    <Rise>
      <div
        className={`flex items-center gap-4 ${align === 'center' ? 'justify-center' : ''}`}
      >
        <span className="display accent text-[1.375rem] leading-none">
          {numeral}
        </span>
        <span className="accent-rule h-px w-9" />
        <span className="meta text-figure-muted">
          {film.format} · {film.year}
        </span>
      </div>
    </Rise>
  );
}

/** The one call to action, identical on every plate so it stays findable. */
function PlateAction() {
  return (
    <span className="meta text-figure-faint group-hover:text-figure inline-flex items-center gap-2.5 transition-colors duration-500">
      View the film
      <span
        aria-hidden
        className="inline-block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
      >
        →
      </span>
    </span>
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
