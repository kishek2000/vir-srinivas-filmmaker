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
  const [auto, setAuto] = useState(true);
  const [awake, setAwake] = useState(true);

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
    setAuto(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  // Stop while the tab is in the background. Otherwise the sequence runs on
  // unwatched, and returning to the tab means walking into the middle of a
  // dissolve rather than onto a held frame.
  useEffect(() => {
    const onVisibility = () => setAwake(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const running = auto && awake;

  // A timeout keyed on the current index rather than a standing interval, so
  // that choosing a frame by hand restarts its full hold instead of
  // inheriting whatever was left of the previous one.
  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(
      () => setIndex((i) => (i + 1) % stills.length),
      HOLD_MS,
    );
    return () => window.clearTimeout(id);
  }, [index, running]);

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
              animate={{ scale: running ? 1.07 : 1.0 }}
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

          <div className="flex flex-col items-start gap-3 sm:items-end">
            {/* Naming the frame is the one piece of information here: it says
                what you are looking at, and that there is more than one
                film. */}
            <p className="meta text-figure-faint flex items-center gap-2.5">
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

            <StillProgress
              index={index}
              running={running}
              onSelect={setIndex}
            />
          </div>
        </motion.div>
      </motion.div>

      <ScrollCue />
    </section>
  );
}

/**
 * The reel counter: one segment per still, the current one filling over its
 * hold. Without it nothing on the page suggests the frame is about to
 * change, so the first dissolve reads as a glitch rather than as a sequence.
 * Each segment is also a control, so the frames are browsable rather than
 * only watchable.
 */
function StillProgress({
  index,
  running,
  onSelect,
}: {
  index: number;
  running: boolean;
  onSelect: (i: number) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Film stills"
      className="flex items-center gap-1.5"
    >
      {stills.map((s, i) => {
        const past = i < index;
        const current = i === index;
        return (
          <button
            key={s.src}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={`Show still from ${s.film}, ${s.year}`}
            aria-current={current ? 'true' : undefined}
            // A hairline is too small a hit target, so the control is padded
            // well beyond the mark it draws.
            className="group -my-2 px-0.5 py-2"
          >
            <span className="relative block h-[2px] w-8 overflow-hidden bg-[color-mix(in_oklab,var(--figure)_22%,transparent)] transition-colors duration-300 group-hover:bg-[color-mix(in_oklab,var(--figure)_45%,transparent)] sm:w-11">
              {/* Keyed on the active index so every segment remounts on each
                  change. Swapping element types at one slot let React reuse
                  the node, which meant `initial` never re-applied and a
                  newly-selected segment carried on from the last one's
                  progress instead of starting its own. */}
              <motion.span
                key={`${i}-${index}`}
                initial={{ scaleX: current ? 0 : past ? 1 : 0 }}
                animate={{ scaleX: current && running ? 1 : past ? 1 : 0 }}
                transition={{
                  duration: current && running ? HOLD_MS / 1000 : 0,
                  ease: 'linear',
                }}
                style={{
                  transformOrigin: 'left',
                  opacity: past && !current ? 0.4 : 1,
                }}
                className="block h-full w-full bg-[var(--figure)]"
              />
            </span>
          </button>
        );
      })}
    </div>
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
