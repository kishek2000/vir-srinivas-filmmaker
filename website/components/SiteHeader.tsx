'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'motion/react';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { films, NAME, type Film } from '@/lib/content';
import { ReleaseBar } from './ReleaseBar';
import { EASE } from './Reveal';

/**
 * Only Films earns a menu. It is the one item with real pages behind it —
 * the other four are places on the homepage, and giving them panels too
 * would be decoration rather than navigation.
 */
const SECTIONS = [
  { label: 'About', href: '/#about' },
  { label: 'Awards', href: '/#awards' },
  { label: 'Press', href: '/#press' },
  { label: 'Contact', href: '/#contact' },
];

export function SiteHeader() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [last, setLast] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 80);
    // Never retract while the menu is open — the panel hangs off the
    // header, so hiding one takes the other with it.
    setHidden(!mobileOpen && y > last && y > 400);
    setLast(y);
  });

  // Any navigation closes the menu, including a hash jump on this page.
  useEffect(() => setMobileOpen(false), [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const onFilm = films.some((f) => pathname === `/${f.slug}`);

  return (
    <motion.header
      animate={{ y: hidden ? '-110%' : '0%' }}
      transition={{ duration: 0.55, ease: EASE }}
      // The chrome keeps the site's own colours rather than borrowing the
      // colours of whichever section happens to be beneath it — it is a
      // fixed layer above the page, and reads as one.
      className="fixed inset-x-0 top-0 z-50"
    >
      <ReleaseBar />

      <div
        className="gutter flex items-center justify-between gap-6 py-4 transition-colors duration-700"
        style={{
          backgroundColor:
            scrolled || mobileOpen ? 'rgba(8, 8, 10, 0.86)' : 'transparent',
          backdropFilter: scrolled || mobileOpen ? 'blur(16px)' : undefined,
          WebkitBackdropFilter:
            scrolled || mobileOpen ? 'blur(16px)' : undefined,
          borderBottom:
            scrolled || mobileOpen
              ? '1px solid var(--rule)'
              : '1px solid transparent',
        }}
      >
        {/* On a film page the name is the way back, so it is always there.
            On the homepage the hero already says it, so it waits. */}
        <Link
          href="/"
          className="meta transition-opacity duration-700 hover:opacity-60"
          style={{
            opacity: scrolled || onFilm || mobileOpen ? 1 : 0,
            pointerEvents:
              scrolled || onFilm || mobileOpen ? 'auto' : 'none',
          }}
        >
          {NAME}
        </Link>

        <nav aria-label="Primary" className="hidden sm:flex sm:items-center sm:gap-x-7">
          <FilmsMenu currentPath={pathname} />
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

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="site-menu"
          className="meta text-figure-muted hover:text-figure -mr-1 flex items-center gap-2.5 p-1 transition-colors duration-500 sm:hidden"
        >
          {mobileOpen ? 'Close' : 'Menu'}
          <MenuGlyph open={mobileOpen} />
        </button>
      </div>

      <MobileMenu
        open={mobileOpen}
        currentPath={pathname}
        onNavigate={() => setMobileOpen(false)}
      />
    </motion.header>
  );
}

/* ─── Films, on desktop ────────────────────────────────────────────
   A disclosure rather than a menubar: the panel holds links, and links
   are already reachable by Tab, so the extra roles would only get in the
   way of what the browser does correctly on its own.
   ─────────────────────────────────────────────────────────────── */
function FilmsMenu({ currentPath }: { currentPath: string }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const panelId = useId();

  const active = films.some((f) => currentPath === `/${f.slug}`);

  const cancelClose = useCallback(() => {
    window.clearTimeout(closeTimer.current);
  }, []);

  // A grace period, so crossing the gap between the trigger and the panel
  // does not dismiss it.
  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpen(false), 220);
  }, [cancelClose]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);

  return (
    <div
      ref={wrap}
      className="relative"
      onPointerEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onPointerLeave={scheduleClose}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={trigger}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="meta hover:text-figure whitespace-nowrap transition-colors duration-500"
        style={{ color: active ? 'var(--figure)' : undefined }}
      >
        {/* The underline belongs to the word, not to the word plus its
            chevron — and `link-draw` sets display:inline-block, so it can
            only live on a child here. On the button itself it silently
            cancelled the flex layout, which is why the gap never applied. */}
        <span className="link-draw">Films</span>
        <motion.span
          aria-hidden
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="ml-3 inline-block translate-y-[-1px] align-middle"
        >
          <Chevron />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: EASE }}
            // Sits just under the header rule, right-aligned to the trigger.
            className="absolute top-[calc(100%+1.1rem)] right-0 w-[23rem] overflow-hidden border border-[var(--rule)] bg-[rgba(8,8,10,0.94)] backdrop-blur-xl"
          >
            <ul>
              {films.map((film) => (
                <li key={film.slug}>
                  <FilmRow
                    film={film}
                    current={currentPath === `/${film.slug}`}
                    onNavigate={() => setOpen(false)}
                  />
                </li>
              ))}
            </ul>
            <Link
              href="/#work"
              onClick={() => setOpen(false)}
              className="meta text-figure-faint hover:text-figure group flex items-center justify-between border-t border-[var(--rule)] px-4 py-3.5 transition-colors duration-500"
            >
              All films
              <span
                aria-hidden
                className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** One film in the menu: its own frame, its own accent, its own facts. */
function FilmRow({
  film,
  current,
  onNavigate,
}: {
  film: Film;
  current: boolean;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={`/${film.slug}`}
      onClick={onNavigate}
      aria-current={current ? 'page' : undefined}
      className="group flex items-center gap-3.5 border-b border-[var(--rule)] px-4 py-3 transition-colors duration-300 last:border-b-0 hover:bg-[rgba(236,231,222,0.05)]"
    >
      <span className="relative block h-11 w-[4.5rem] shrink-0 overflow-hidden">
        <Image
          src={film.thumb}
          alt=""
          fill
          sizes="72px"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
        {/* The film's own accent, so the menu carries the same three worlds
            the page does. */}
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[2px]"
          style={{ backgroundColor: film.identity.accent }}
        />
      </span>

      <span className="min-w-0 flex-1">
        <span className="text-figure block truncate text-[0.95rem] leading-tight">
          {film.title}
        </span>
        <span className="meta-sm text-figure-faint mt-1 block">
          {film.format} · {film.year}
        </span>
      </span>

      <span
        aria-hidden
        className="text-figure-faint group-hover:text-figure shrink-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5"
      >
        →
      </span>
    </Link>
  );
}

/* ─── Everything, on mobile ────────────────────────────────────────
   Five links fitted across a phone; eight do not, and the films deserve
   to be named rather than hidden behind a section jump. So the narrow
   layout gets a real panel.
   ─────────────────────────────────────────────────────────────── */
function MobileMenu({
  open,
  currentPath,
  onNavigate,
}: {
  open: boolean;
  currentPath: string;
  onNavigate: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="site-menu"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="max-h-[calc(100svh-7rem)] overflow-y-auto border-b border-[var(--rule)] bg-[rgba(8,8,10,0.97)] backdrop-blur-xl sm:hidden"
        >
          <p className="meta text-figure-faint gutter pt-5 pb-2.5">Films</p>
          <ul>
            {films.map((film) => (
              <li key={film.slug}>
                <FilmRow
                  film={film}
                  current={currentPath === `/${film.slug}`}
                  onNavigate={onNavigate}
                />
              </li>
            ))}
          </ul>

          <p className="meta text-figure-faint gutter pt-6 pb-1">Elsewhere</p>
          <ul className="pb-5">
            {[{ label: 'All films', href: '/#work' }, ...SECTIONS].map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  onClick={onNavigate}
                  className="gutter group text-figure flex items-center justify-between border-b border-[var(--rule)] py-3.5 text-[0.95rem] last:border-b-0"
                >
                  {s.label}
                  <span
                    aria-hidden
                    className="text-figure-faint transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Chevron() {
  return (
    <svg width="9" height="6" viewBox="0 0 9 6" fill="none" aria-hidden>
      <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/** Two rules that cross into an X when the panel is open. */
function MenuGlyph({ open }: { open: boolean }) {
  return (
    <span aria-hidden className="relative block h-2.5 w-4">
      <motion.span
        className="absolute left-0 block h-px w-full bg-current"
        animate={{ top: open ? 5 : 1, rotate: open ? 45 : 0 }}
        transition={{ duration: 0.3, ease: EASE }}
      />
      <motion.span
        className="absolute left-0 block h-px w-full bg-current"
        animate={{ top: open ? 5 : 9, rotate: open ? -45 : 0 }}
        transition={{ duration: 0.3, ease: EASE }}
      />
    </span>
  );
}
