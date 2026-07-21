'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { countAwards, type Film } from '@/lib/content';
import { EASE, RevealLines, Rise } from './Reveal';

export function FilmDetail({ film, next }: { film: Film; next: Film }) {
  const { wins, nominations } = countAwards(film.awards);

  return (
    <>
      <FilmHero film={film} />

      <div className="gutter">
        {/* ─── Synopsis and facts ─────────────────────────────── */}
        <section className="grid gap-[clamp(2.5rem,6vw,5rem)] py-[clamp(3.5rem,10vh,7rem)] lg:grid-cols-12">
          <div className="lg:col-span-7">
            <RevealLines
              as="h2"
              lines={['Synopsis']}
              className="meta text-bone-faint mb-8"
            />
            <Rise>
              <p className="display display-sm max-w-[26ch] leading-[1.12]">
                {film.synopsis}
              </p>
            </Rise>

            {(film.watch || film.trailer || film.imdb) && (
              <Rise delay={0.12}>
                <div className="mt-[clamp(2.5rem,6vh,4rem)] flex flex-wrap gap-3">
                  {film.watch && (
                    <Action href={film.watch.href} primary>
                      {film.watch.label}
                    </Action>
                  )}
                  {film.trailer && (
                    <Action href={film.trailer.href}>
                      {film.trailer.label}
                    </Action>
                  )}
                  {film.imdb && <Action href={film.imdb}>View on IMDb</Action>}
                </div>
              </Rise>
            )}
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <Rise delay={0.1}>
              <dl className="divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
                <Fact label="Format" value={film.format} />
                <Fact label="Year" value={film.year} />
                <Fact label="Runtime" value={film.runtime} />
                <Fact label="Genre" value={film.genres.join(', ')} />
                <Fact label="Credits" value={film.roles.join(', ')} />
                {wins > 0 && (
                  <Fact
                    label="Awards"
                    value={`${wins} ${wins === 1 ? 'win' : 'wins'}${
                      nominations ? `, ${nominations} nominations` : ''
                    }`}
                  />
                )}
              </dl>
            </Rise>
          </div>
        </section>

        {/* ─── Where to watch ─────────────────────────────────── */}
        {film.watchGroups && film.watchGroups.length > 0 && (
          <section className="rule-top py-[clamp(3.5rem,10vh,7rem)]">
            <RevealLines
              as="h2"
              lines={['Where to watch']}
              className="display display-md mb-[clamp(2.5rem,6vh,4rem)]"
            />

            <div className="space-y-[clamp(2.5rem,6vh,4rem)]">
              {film.watchGroups.map((group, gi) => (
                <Rise key={group.label} delay={gi * 0.06}>
                  <div className="grid gap-5 border-t border-[var(--rule)] pt-5 lg:grid-cols-12 lg:gap-10">
                    <h3 className="meta text-bone-faint lg:col-span-3">
                      {group.label}
                    </h3>

                    <div className="lg:col-span-9">
                      <ul className="grid gap-px bg-[var(--rule)] sm:grid-cols-2">
                        {group.links.map((link) => (
                          <li key={link.href} className="bg-[var(--color-ink)]">
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex items-baseline justify-between gap-4 px-1 py-4 transition-opacity duration-500 hover:opacity-60 sm:px-4"
                            >
                              <span className="flex items-baseline gap-3">
                                {link.free && (
                                  <span
                                    aria-hidden
                                    className="size-1.5 shrink-0 translate-y-[-0.2em] rounded-full"
                                    style={{ backgroundColor: 'var(--brass)' }}
                                  />
                                )}
                                <span className="display display-sm leading-none">
                                  {link.name}
                                </span>
                              </span>
                              <span className="meta-sm text-bone-faint shrink-0 text-right">
                                {link.note}
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>

                      {group.footnote && (
                        <p className="text-bone-faint mt-5 max-w-[70ch] text-[0.8125rem] leading-relaxed">
                          {group.footnote}
                        </p>
                      )}
                    </div>
                  </div>
                </Rise>
              ))}
            </div>
          </section>
        )}

        {/* ─── Awards for this film ───────────────────────────── */}
        {film.awards.length > 0 && (
          <section className="rule-top py-[clamp(3.5rem,10vh,7rem)]">
            <RevealLines
              as="h2"
              lines={['Selected awards']}
              className="display display-md mb-[clamp(2.5rem,6vh,4rem)]"
            />
            <ul className="border-t border-[var(--rule)]">
              {film.awards.map((award, i) => (
                <motion.li
                  key={`${award.festival}-${award.category}`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-8% 0px' }}
                  transition={{
                    duration: 0.7,
                    ease: EASE,
                    delay: Math.min(i, 8) * 0.03,
                  }}
                  className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-[var(--rule)] py-3.5"
                >
                  <span
                    className="meta w-[5.5rem] shrink-0"
                    style={{
                      color:
                        award.result === 'Winner' ? 'var(--brass)' : undefined,
                    }}
                  >
                    {award.note ?? award.result}
                  </span>
                  <span className="flex-1 text-[0.95rem]">{award.category}</span>
                  <span className="text-bone-muted w-full text-[0.8125rem] sm:w-auto sm:max-w-[42%] sm:text-right">
                    {award.festival}
                  </span>
                </motion.li>
              ))}
            </ul>
          </section>
        )}

        {/* ─── Next ───────────────────────────────────────────── */}
        <section className="rule-top py-[clamp(3.5rem,10vh,7rem)]">
          <Link href={`/${next.slug}`} className="group block">
            <span className="meta text-bone-faint">Next film</span>
            <h2 className="display display-lg mt-4">
              <span className="inline-block transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[clamp(0.5rem,1.5vw,1.75rem)]">
                {next.title}
              </span>
            </h2>
          </Link>
        </section>
      </div>
    </>
  );
}

/**
 * Two hero treatments, chosen by what the film actually has.
 *
 * With footage, the frame runs full-bleed behind the title. Without it,
 * all we have is a portrait one-sheet that carries its own title and
 * credits — cropping that to a landscape band would maim the artwork and
 * print the title twice, so it is shown as what it is: a poster, whole,
 * standing beside the type.
 */
function FilmHero({ film }: { film: Film }) {
  return film.preview ? <ReelHero film={film} /> : <PosterHero film={film} />;
}

function ReelHero({ film }: { film: Film }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.1]);

  return (
    <section
      ref={ref}
      className="relative flex h-[86svh] min-h-[520px] w-full items-end overflow-hidden"
    >
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <video
          className="h-full w-full object-cover grayscale-[0.15] contrast-[1.06] brightness-[0.8]"
          src={film.preview}
          poster={film.poster}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="vignette absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/50 to-transparent" />
      </motion.div>

      <div className="gutter relative z-10 w-full pb-[clamp(2rem,5vh,4rem)]">
        <BackLink />

        <RevealLines
          as="h1"
          lines={film.titleLines}
          className="display display-lg"
          delay={0.15}
        />

        <HeroMeta film={film} />
      </div>
    </section>
  );
}

function PosterHero({ film }: { film: Film }) {
  return (
    <section className="gutter relative w-full pt-[clamp(6rem,16vh,10rem)] pb-[clamp(2rem,6vh,4rem)]">
      <BackLink />

      <div className="grid items-end gap-[clamp(2.5rem,6vw,5rem)] lg:grid-cols-12">
        <div className="lg:col-span-7">
          <RevealLines
            as="h1"
            lines={film.titleLines}
            className="display display-lg"
            delay={0.15}
          />
        </div>

        <Rise delay={0.25} className="lg:col-span-4 lg:col-start-9">
          <div className="relative mx-auto aspect-[2/3] w-full max-w-[19rem] overflow-hidden lg:mx-0">
            <Image
              src={film.poster}
              alt={`${film.title} poster`}
              fill
              priority
              sizes="(max-width: 1024px) 70vw, 26vw"
              className="object-cover"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-[var(--rule)]" />
          </div>
        </Rise>
      </div>

      <HeroMeta film={film} />
    </section>
  );
}

function BackLink() {
  return (
    <Rise>
      <Link
        href="/#work"
        className="meta text-bone-muted hover:text-bone mb-8 inline-flex items-center gap-2.5 transition-colors duration-500"
      >
        <span aria-hidden>←</span> All films
      </Link>
    </Rise>
  );
}

function HeroMeta({ film }: { film: Film }) {
  return (
    <div className="mt-8 flex flex-wrap items-end justify-between gap-x-10 gap-y-4 border-t border-[var(--rule)] pt-5">
      <Rise delay={0.35}>
        <p className="meta text-bone-muted flex flex-wrap gap-x-5 gap-y-2">
          <span>{film.year}</span>
          <span>{film.format}</span>
          <span>{film.runtime}</span>
          <span>{film.genres.join(' · ')}</span>
        </p>
      </Rise>

      {film.accolade && (
        <Rise delay={0.45}>
          <p className="meta whitespace-nowrap" style={{ color: 'var(--brass)' }}>
            {film.accolade}
          </p>
        </Rise>
      )}
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6 py-3.5">
      <dt className="meta-sm text-bone-faint">{label}</dt>
      <dd className="text-right text-[0.9375rem]">{value}</dd>
    </div>
  );
}

function Action({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`meta inline-flex items-center gap-2.5 px-6 py-3.5 transition-colors duration-500 ${
        primary
          ? 'bg-[var(--color-bone)] text-[var(--color-ink)] hover:bg-[var(--color-bone)]/80'
          : 'text-bone-muted hover:text-bone border border-[var(--rule-strong)] hover:border-[var(--color-bone)]'
      }`}
    >
      {children}
      <span aria-hidden>→</span>
    </a>
  );
}
