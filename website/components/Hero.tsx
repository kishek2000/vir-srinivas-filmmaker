'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { NAME, ROLES, stills } from '@/lib/content';
import { EASE } from './Reveal';

const HOLD_MS = 5200;

/**
 * The homepage is the name over the work, and nothing else.
 *
 * It used to run the Orders from Above trailer here, which quietly made the
 * whole site look like it was about one film. It now runs stills from all
 * three — two each — so the first thing you see is the range: a black and
 * white interrogation, a chiaroscuro thriller, a cold fluorescent office.
 *
 * There is no tagline by design. The work is not described, only shown.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // The stills sink slightly slower than the page, and dim as they leave.
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const mediaOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % stills.length),
      HOLD_MS,
    );
    return () => window.clearInterval(id);
  }, []);

  const still = stills[index];
  const letters = NAME.split('');

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[100svh] min-h-[560px] w-full items-end overflow-hidden"
    >
      <motion.div
        style={{ y: mediaY, opacity: mediaOpacity }}
        className="absolute inset-0 z-0"
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={still.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            {/* A slow drift, so a held frame reads as a photograph being
                looked at rather than as a stalled video. */}
            <motion.div
              initial={{ scale: 1.0 }}
              animate={{ scale: 1.07 }}
              transition={{ duration: (HOLD_MS + 1400) / 1000, ease: 'linear' }}
              className="absolute inset-0"
            >
              <Image
                src={still.src}
                alt=""
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover brightness-[0.72] contrast-[1.05]"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <div className="vignette absolute inset-0" />
        {/* Grounds the type at the foot of the frame without drowning it. */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--ground)] via-[var(--ground)]/40 to-transparent" />
      </motion.div>

      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="gutter relative z-10 w-full pb-[clamp(2rem,5vh,4rem)]"
      >
        <h1 className="display display-xl">
          <span className="sr-only">{NAME}</span>
          <span aria-hidden className="flex flex-wrap">
            {letters.map((char, i) => (
              <span key={i} className="reveal-line">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1.25,
                    ease: EASE,
                    delay: 0.15 + i * 0.028,
                  }}
                >
                  {/* A plain space is whitespace-only and collapses to
                      zero width inside a flex row, closing up the name. */}
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.9 }}
          className="mt-6 flex flex-col gap-3 border-t border-[var(--rule)] pt-5 sm:mt-8 sm:flex-row sm:items-end sm:justify-between sm:gap-6"
        >
          <p className="meta text-figure-muted flex gap-x-5 gap-y-2">
            {ROLES.map((role) => (
              <span key={role}>{role}</span>
            ))}
          </p>

          {/* Naming the frame is the one piece of information here: it says
              what you are looking at, and that there is more than one film. */}
          <p
            aria-live="off"
            className="meta text-figure-faint flex items-center gap-2.5"
          >
            <span className="hidden sm:inline">Still from</span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={still.src}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="text-figure-muted"
              >
                {still.film} · {still.year}
              </motion.span>
            </AnimatePresence>
          </p>
        </motion.div>
      </motion.div>

      <ScrollCue />
    </section>
  );
}

function ScrollCue() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.4 }}
      className="pointer-events-none absolute bottom-0 left-1/2 z-10 hidden h-24 w-px -translate-x-1/2 overflow-hidden md:block"
    >
      <motion.span
        className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent to-[var(--rule-strong)]"
        animate={{ y: ['-100%', '200%'] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}
