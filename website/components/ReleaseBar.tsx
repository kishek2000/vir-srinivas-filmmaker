'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { getFilm } from '@/lib/content';
import { EASE } from './Reveal';

const STORAGE_KEY = 'ofa-release-bar-dismissed';

/**
 * Orders from Above has no site of its own — every piece of marketing for
 * the film points here. This is its permanent landing strip: always
 * present, one line tall, dismissible, and pointing at the film's page.
 */
export function ReleaseBar() {
  const film = getFilm('orders-from-above');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Rendered client-side only so a dismissal survives navigation.
    try {
      setVisible(window.localStorage.getItem(STORAGE_KEY) !== '1');
    } catch {
      setVisible(true);
    }
  }, []);

  if (!film) return null;

  const dismiss = () => {
    setVisible(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* private mode — the bar simply returns next visit */
    }
  };

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="overflow-hidden bg-[var(--color-ink-raised)]"
        >
          <div className="gutter flex items-center justify-between gap-4 border-b border-[var(--rule)] py-2.5">
            <Link
              href={`/${film.slug}`}
              className="group flex min-w-0 items-center gap-3 sm:gap-4"
            >
              <span
                aria-hidden
                className="size-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: 'var(--brass)' }}
              />
              <span className="meta-sm text-bone-muted hidden shrink-0 sm:block">
                Now streaming
              </span>
              <span className="display truncate text-[clamp(0.95rem,2vw,1.25rem)] leading-tight">
                {film.title}
              </span>
              <span className="meta-sm text-bone-faint group-hover:text-bone hidden shrink-0 whitespace-nowrap transition-colors duration-500 md:block">
                Watch free →
              </span>
            </Link>

            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss"
              className="text-bone-faint hover:text-bone shrink-0 p-1 transition-colors duration-500"
            >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
                <path d="M1 1l9 9M10 1l-9 9" stroke="currentColor" strokeWidth="1" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
