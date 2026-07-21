'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { films, type Film } from '@/lib/content';
import { EASE, RevealLines, Rise } from './Reveal';

/**
 * The index is the spine of the site. Each row is a whole film: hovering
 * bleeds its frame in behind the type and dims every other title, so the
 * reader is always looking at exactly one thing.
 */
export function FilmIndex() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="work" className="relative isolate py-[clamp(5rem,12vh,9rem)]">
      {/* Backdrop: the hovered film's own frame, held behind everything. */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence>
          {active && (
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 1.1, ease: EASE }}
              className="absolute inset-0"
            >
              <Backdrop film={films.find((f) => f.slug === active)!} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <header className="gutter relative z-10 mb-[clamp(3rem,7vh,6rem)] flex items-baseline justify-between gap-6">
        <RevealLines
          as="h2"
          lines={['Films']}
          className="display display-md"
        />
        <span className="meta text-bone-faint">
          {String(films.length).padStart(2, '0')} titles
        </span>
      </header>

      <ul
        onMouseLeave={() => setActive(null)}
        className="relative z-10 border-t border-[var(--rule)]"
      >
        {films.map((film, i) => (
          <FilmRow
            key={film.slug}
            film={film}
            index={i}
            dimmed={active !== null && active !== film.slug}
            onEnter={() => setActive(film.slug)}
          />
        ))}
      </ul>
    </section>
  );
}

function Backdrop({ film }: { film: Film }) {
  return (
    <>
      {film.preview ? (
        <video
          className="h-full w-full object-cover grayscale-[0.3] contrast-[1.05] brightness-[0.85]"
          src={film.preview}
          poster={film.poster}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <Image
          src={film.poster}
          alt=""
          fill
          sizes="100vw"
          className="object-cover grayscale-[0.3] contrast-[1.05] brightness-[0.8]"
        />
      )}
      <div className="absolute inset-0 bg-[var(--color-ink)]/45" />
      <div className="vignette absolute inset-0" />
    </>
  );
}

function FilmRow({
  film,
  index,
  dimmed,
  onEnter,
}: {
  film: Film;
  index: number;
  dimmed: boolean;
  onEnter: () => void;
}) {
  return (
    <li className="border-b border-[var(--rule)]">
      <Rise delay={index * 0.06}>
        <Link
          href={`/${film.slug}`}
          onMouseEnter={onEnter}
          onFocus={onEnter}
          className="gutter group block py-[clamp(1.75rem,4.5vh,3.25rem)] transition-opacity duration-700"
          style={{ opacity: dimmed ? 0.32 : 1 }}
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-10">
            <span className="meta text-bone-faint group-hover:text-bone-muted w-10 shrink-0 pt-2 transition-colors duration-500">
              {String(index + 1).padStart(2, '0')}
            </span>

            <h3 className="display display-lg flex-1">
              <span className="inline-block transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[clamp(0.5rem,1.5vw,1.75rem)]">
                {film.title}
              </span>
            </h3>

            <div className="flex shrink-0 items-center gap-x-8 gap-y-2 md:flex-col md:items-end md:gap-2 md:pt-2">
              <span className="meta text-bone-muted">{film.year}</span>
              <span className="meta text-bone-faint">{film.format}</span>
            </div>

            <span
              aria-hidden
              className="text-bone-muted hidden shrink-0 translate-x-[-0.5rem] opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:opacity-100 md:block"
            >
              <Arrow />
            </span>
          </div>

          <p className="prose-lg text-bone-muted mt-4 max-w-[46ch] md:ml-20 md:max-w-[52ch]">
            {film.logline}
          </p>
        </Link>
      </Rise>
    </li>
  );
}

function Arrow() {
  return (
    <svg width="34" height="12" viewBox="0 0 34 12" fill="none" aria-hidden>
      <path
        d="M0 6h32M27 1l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
      />
    </svg>
  );
}
