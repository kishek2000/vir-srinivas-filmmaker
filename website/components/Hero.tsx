'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { NAME, ROLES } from '@/lib/content';
import { EASE } from './Reveal';

/**
 * The showreel runs full-bleed and silent behind the name. There is no
 * tagline here by design — the work is not described, only shown.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // The reel sinks slightly slower than the page, and dims as it leaves.
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const mediaOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-32%']);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = muted;
    // Some browsers ignore the autoplay attribute but honour an explicit
    // call; if sound was just turned on and playback is refused, fall back
    // to muted rather than leaving a silent, stalled frame.
    void video.play().catch(() => {
      if (!muted) setMuted(true);
    });
  }, [muted]);

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
        {/* The poster sits behind the video, so a slow load or a blocked
            autoplay still shows a frame of the film, never a black box. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center grayscale-[0.15] contrast-[1.06] brightness-[0.82]"
          style={{ backgroundImage: 'url(/hero-poster.jpg)' }}
        />
        <video
          ref={videoRef}
          className="relative h-full w-full object-cover grayscale-[0.15] contrast-[1.06] brightness-[0.82] transition-opacity duration-1000"
          style={{ opacity: playing ? 1 : 0 }}
          poster="/hero-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source src="/hero-reel.mp4" type="video/mp4" />
        </video>
        <div className="vignette absolute inset-0" />
        {/* Grounds the type at the foot of the frame without drowning it. */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/35 to-transparent" />
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
                  {char === ' ' ? ' ' : char}
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
          <p className="meta text-bone-muted flex gap-x-5 gap-y-2">
            {ROLES.map((role) => (
              <span key={role}>{role}</span>
            ))}
          </p>

          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              className="meta text-bone-muted hover:text-bone flex items-center gap-2.5 transition-colors duration-500"
              aria-pressed={!muted}
            >
              <SoundBars active={!muted && playing} />
              {muted ? 'Sound off' : 'Sound on'}
            </button>
          </div>
        </motion.div>
      </motion.div>

      <ScrollCue />
    </section>
  );
}

/** Four bars that idle flat and animate only while sound is actually on. */
function SoundBars({ active }: { active: boolean }) {
  return (
    <span aria-hidden className="flex h-3 items-end gap-[2px]">
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className="w-[2px] bg-current"
          initial={{ height: 3 }}
          animate={active ? { height: [3, 12, 5, 10, 3] } : { height: 3 }}
          transition={
            active
              ? {
                  duration: 1.1 + i * 0.17,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
              : { duration: 0.3 }
          }
        />
      ))}
    </span>
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
