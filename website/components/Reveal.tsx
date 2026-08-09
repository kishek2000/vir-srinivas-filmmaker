'use client';

import { motion, useInView, type Variants } from 'motion/react';
import { useRef, type ReactNode } from 'react';

/** The one easing curve used across the site. Slow out, no bounce. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Text that rises out of a mask. Each child line clips its own overflow,
 * so the words appear to be lifted off the page rather than faded in.
 */
export function RevealLines({
  lines,
  className = '',
  lineClassName = '',
  delay = 0,
  stagger = 0.08,
  as: Tag = 'div',
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'p';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12% 0px' });

  return (
    <Tag ref={ref as never} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="reveal-line">
          <motion.span
            initial={{ y: '110%' }}
            animate={inView ? { y: 0 } : undefined}
            transition={{
              duration: 1.1,
              ease: EASE,
              delay: delay + i * stagger,
            }}
            className={lineClassName}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** A block that lifts and fades in once, when it enters the viewport. */
export function Rise({
  children,
  delay = 0,
  distance = 28,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: distance }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.95, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** A hairline that draws itself across the container. */
export function Rule({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : undefined}
        transition={{ duration: 1.4, ease: EASE }}
        style={{ transformOrigin: 'left' }}
        className="h-px w-full bg-[var(--rule)]"
      />
    </div>
  );
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};
