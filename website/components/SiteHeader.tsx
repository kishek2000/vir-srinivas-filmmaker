'use client';

import Link from 'next/link';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useState } from 'react';
import { NAME } from '@/lib/content';
import { ReleaseBar } from './ReleaseBar';
import { EASE } from './Reveal';

const SECTIONS = [
  { label: 'Films', href: '/#work' },
  { label: 'About', href: '/#about' },
  { label: 'Awards', href: '/#awards' },
  { label: 'Press', href: '/#press' },
  { label: 'Contact', href: '/#contact' },
];

/**
 * One fixed stack: the Orders from Above release strip sits above the
 * navigation so the two can never overlap. The whole stack retracts on
 * the way down the page and returns on the way up.
 */
export function SiteHeader() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [last, setLast] = useState(0);

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 80);
    setHidden(y > last && y > 400);
    setLast(y);
  });

  return (
    <motion.header
      animate={{ y: hidden ? '-110%' : '0%' }}
      transition={{ duration: 0.55, ease: EASE }}
      // Until it has a backdrop of its own, the whole chrome stack is
      // floating over the hero footage, so it has to read as light-on-dark
      // regardless of which film's theme the page is carrying. Once it
      // gains a ground-coloured backdrop it adopts that theme instead.
      className={`fixed inset-x-0 top-0 z-50 ${scrolled ? '' : 'on-media'}`}
    >
      <ReleaseBar />

      <div
        className="gutter flex items-center justify-end gap-6 py-4 transition-colors duration-700 sm:justify-between"
        style={{
          backgroundColor: scrolled
            ? 'color-mix(in oklab, var(--ground) 74%, transparent)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : undefined,
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : undefined,
          borderBottom: scrolled
            ? '1px solid var(--rule)'
            : '1px solid transparent',
        }}
      >
        <Link
          href="/"
          className="meta hidden transition-opacity duration-700 hover:opacity-60 sm:block"
          style={{
            opacity: scrolled ? 1 : 0,
            pointerEvents: scrolled ? 'auto' : 'none',
          }}
        >
          {NAME}
        </Link>

        {/* On narrow screens the list scrolls sideways rather than
            collapsing into a menu — five links do not warrant a drawer. */}
        <nav className="-mx-1 flex w-full justify-between gap-x-4 px-1 sm:w-auto sm:justify-end sm:gap-x-7">
          {SECTIONS.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="meta link-draw text-figure-muted hover:text-figure whitespace-nowrap transition-colors duration-500"
            >
              {section.label}
            </Link>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
