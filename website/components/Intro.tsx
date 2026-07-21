'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { INTRO, ROLES } from '@/lib/content';
import { RevealLines, Rise } from './Reveal';

/**
 * The introduction, carried over verbatim from virsrinivas.com. It states
 * who Vir is and what he has made — nothing about what the work is "about".
 */
export function Intro() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section
      id="about"
      ref={ref}
      className="gutter rule-top py-[clamp(5rem,14vh,10rem)]"
    >
      <div className="grid gap-[clamp(2.5rem,6vw,5rem)] lg:grid-cols-12">
        <div className="lg:col-span-4 lg:col-start-1">
          <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden lg:sticky lg:top-24">
            <motion.div style={{ y: portraitY }} className="absolute inset-[-6%]">
              <Image
                src="/dp_v2.png"
                alt="Vir Srinivas"
                fill
                sizes="(max-width: 1024px) 80vw, 32vw"
                className="object-cover grayscale contrast-[1.08] brightness-[0.92]"
              />
            </motion.div>
            <div className="absolute inset-0 ring-1 ring-inset ring-[var(--rule)]" />
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <RevealLines
            as="h2"
            lines={['Introduction']}
            className="meta text-bone-faint mb-[clamp(2rem,5vh,3.5rem)]"
          />

          <div className="space-y-[clamp(1.5rem,3vh,2.25rem)]">
            {INTRO.map((paragraph, i) => (
              <Rise key={i} delay={i * 0.1}>
                <p
                  className={
                    i === 0
                      ? 'display display-sm max-w-[24ch] leading-[1.1]'
                      : 'prose-lg text-bone-muted max-w-[62ch]'
                  }
                >
                  {paragraph}
                </p>
              </Rise>
            ))}
          </div>

          <Rise delay={0.3}>
            <dl className="mt-[clamp(2.5rem,6vh,4rem)] grid grid-cols-3 gap-4 border-t border-[var(--rule)] pt-6">
              {ROLES.map((role) => (
                <div key={role}>
                  <dt className="meta-sm text-bone-faint">Credit</dt>
                  <dd className="display display-sm mt-1.5">{role}</dd>
                </div>
              ))}
            </dl>
          </Rise>
        </div>
      </div>
    </section>
  );
}
