/** @jsxImportSource @emotion/react */
/* eslint-disable @next/next/no-img-element */
import { FC, useRef, useState, useEffect } from 'react';
import { motion, useTransform, useViewportScroll } from 'framer-motion';
import { mq } from '../styles/mq';

// Custom hook to detect if element is in view
const useInView = (ref: React.RefObject<HTMLElement>, options?: { once?: boolean; margin?: string }) => {
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (options?.once) {
            observer.disconnect();
          }
        } else if (!options?.once) {
          setIsInView(false);
        }
      },
      { rootMargin: options?.margin || '0px' }
    );
    
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options?.once, options?.margin]);
  
  return isInView;
};

interface FilmData {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  duration: string;
  description: string;
  poster: string;
  trailer?: string;
  youtubeUrl?: string;
  imdbUrl?: string;
  awards: string[];
  theme: 'vintage' | 'thriller' | 'tech';
}

// Film data
export const films: FilmData[] = [
  {
    id: 'ofa',
    title: 'ORDERS FROM ABOVE',
    subtitle: 'A Film by Vir Srinivas',
    year: '2021',
    duration: 'Feature Film',
    description: 'The true story of the interrogation of Nazi war criminal Adolf Eichmann by Israeli police. A haunting exploration of how ordinary men can commit extraordinary evil when following orders.',
    poster: '/ofa-poster-2.jpeg',
    trailer: '/orders-from-above-trailer-compressed.mp4',
    youtubeUrl: 'https://www.youtube.com/watch?v=osiqn2u6BMk',
    imdbUrl: 'http://www.imdb.com/title/tt14858134',
    awards: ['Winner - Cannes World Film Festival', 'Winner - Melbourne Underground Film Festival', 'Winner - Berlin Indie Film Festival', '15+ International Awards'],
    theme: 'vintage',
  },
  {
    id: 'proselyte',
    title: 'THE PROSELYTE',
    subtitle: 'A Film by Vir Srinivas',
    year: '2022',
    duration: '20 min',
    description: 'A Catholic priest with a dark past wrestles with his faith after he hears a confession from an active serial killer. A tense moral thriller about sin, redemption, and the sanctity of confession.',
    poster: '/proselyte-poster.png',
    youtubeUrl: 'https://www.youtube.com/watch?v=GG48DnCQrEk',
    imdbUrl: 'http://www.imdb.com/title/tt14755002',
    awards: ['Winner - Perth Independent Film Festival', 'Best Drama'],
    theme: 'thriller',
  },
  {
    id: 'gradient-descent',
    title: 'GRADIENT DESCENT',
    subtitle: 'A Film by Vir Srinivas',
    year: '2024',
    duration: '20 min',
    description: 'A homeless man is recruited by an artificial intelligence company and forced to do horrifying work. A stark commentary on the hidden human cost behind the technology we use daily.',
    poster: '/gd-poster.png',
    youtubeUrl: 'https://www.youtube.com/watch?v=Igo_pGU08HA',
    imdbUrl: 'https://www.imdb.com/title/tt31491453/',
    awards: ['Official Selection'],
    theme: 'tech',
  },
];

// Theme configurations
const themes = {
  vintage: {
    bg: '#0f0d0a',
    text: '#e8e2d5',
    accent: '#d4c5a9',
    secondary: 'rgba(212, 197, 169, 0.4)',
    border: 'rgba(212, 197, 169, 0.2)',
  },
  thriller: {
    bg: '#0d0b0b',
    text: '#d4d0c8',
    accent: '#8b1e1e',
    secondary: 'rgba(201, 162, 39, 0.6)',
    border: 'rgba(139, 30, 30, 0.3)',
  },
  tech: {
    bg: '#fafafa',
    text: '#0a0a0a',
    accent: '#0a0a0a',
    secondary: 'rgba(0, 0, 0, 0.5)',
    border: 'rgba(0, 0, 0, 0.1)',
  },
};

export const FilmShowcase: FC<{ film: FilmData; index: number }> = ({ film, index }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const theme = themes[film.theme];
  const [elementTop, setElementTop] = useState(0);
  
  const { scrollY } = useViewportScroll();
  
  useEffect(() => {
    if (containerRef.current) {
      setElementTop(containerRef.current.offsetTop);
    }
  }, []);
  
  const posterY = useTransform(scrollY, [elementTop - 500, elementTop + 500], [50, -50]);
  const contentY = useTransform(scrollY, [elementTop - 500, elementTop + 500], [30, -30]);

  return (
    <section
      ref={containerRef}
      css={mq({
        position: 'relative',
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.bg,
        overflow: 'hidden',
        padding: ['80px 24px', '100px 60px', '120px 80px'],
      })}
    >
      {/* Theme-specific background treatments */}
      {film.theme === 'vintage' && <VintageBackground isInView={isInView} />}
      {film.theme === 'thriller' && <ThrillerBackground isInView={isInView} />}
      {film.theme === 'tech' && <TechBackground isInView={isInView} />}

      {/* Film number */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 0.06 : 0 }}
        transition={{ duration: 1 }}
        css={mq({
          position: 'absolute',
          top: ['60px', '80px', '100px'],
          left: ['24px', '60px', '80px'],
          fontFamily: 'var(--font-display)',
          fontSize: ['80px', '120px', '160px'],
          fontWeight: 400,
          color: theme.text,
          lineHeight: 1,
        })}
      >
        0{index + 1}
      </motion.div>

      {/* Main content grid */}
      <div
        css={mq({
          display: 'grid',
          gridTemplateColumns: ['1fr', '1fr', '1fr 1fr'],
          gap: ['48px', '60px', '80px'],
          maxWidth: '1400px',
          width: '100%',
          alignItems: 'center',
          zIndex: 2,
        })}
      >
        {/* Poster section */}
        <motion.div
          style={{ y: posterY }}
          css={mq({
            position: 'relative',
            order: [1, 1, index % 2 === 0 ? 1 : 2],
          })}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.95 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            css={{
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: '-20px',
                border: `1px solid ${theme.border}`,
                zIndex: -1,
              },
            }}
          >
            {/* Poster with optional grain overlay for vintage */}
            <div
              css={{
                position: 'relative',
                overflow: 'hidden',
                boxShadow: film.theme === 'tech' 
                  ? '0 40px 80px rgba(0,0,0,0.15)'
                  : '0 40px 80px rgba(0,0,0,0.5)',
              }}
            >
              <img
                src={film.poster}
                alt={`${film.title} poster`}
                css={mq({
                  width: '100%',
                  maxHeight: ['50vh', '60vh', '70vh'],
                  objectFit: 'contain',
                  filter: film.theme === 'vintage' ? 'sepia(10%) contrast(1.05)' : 'none',
                })}
              />
              {film.theme === 'vintage' && (
                <div
                  css={{
                    position: 'absolute',
                    inset: 0,
                    background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 2px)',
                    pointerEvents: 'none',
                  }}
                />
              )}
            </div>
          </motion.div>

          {/* Awards ticker for vintage theme */}
          {film.theme === 'vintage' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              css={mq({
                marginTop: ['24px', '32px', '40px'],
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              })}
            >
              <span
                css={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: theme.accent,
                }}
              >
                ★ Winner of 15+ International Awards
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Info section */}
        <motion.div
          style={{ y: contentY }}
          css={mq({
            order: [2, 2, index % 2 === 0 ? 2 : 1],
            display: 'flex',
            flexDirection: 'column',
            gap: ['24px', '32px', '40px'],
          })}
        >
          {/* Year and duration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            css={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
            }}
          >
            <span
              css={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                fontWeight: 400,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: theme.secondary,
              }}
            >
              {film.year}
            </span>
            <span css={{ width: '40px', height: '1px', background: theme.border }} />
            <span
              css={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                fontWeight: 400,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: theme.secondary,
              }}
            >
              {film.duration}
            </span>
          </motion.div>

          {/* Title */}
          <div css={{ overflow: 'hidden' }}>
            <motion.h2
              initial={{ y: 80 }}
              animate={{ y: isInView ? 0 : 80 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              css={mq({
                fontFamily: 'var(--font-display)',
                fontSize: ['36px', '48px', '64px'],
                fontWeight: 400,
                letterSpacing: '0.02em',
                lineHeight: 1,
                color: theme.text,
                margin: 0,
              })}
            >
              {film.title}
            </motion.h2>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            css={{
              fontFamily: 'var(--font-serif)',
              fontSize: '18px',
              fontWeight: 300,
              fontStyle: 'italic',
              color: theme.secondary,
              margin: 0,
            }}
          >
            {film.subtitle}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            css={mq({
              fontFamily: 'var(--font-body)',
              fontSize: ['14px', '15px', '16px'],
              fontWeight: 300,
              lineHeight: 1.8,
              color: theme.secondary,
              maxWidth: '500px',
              margin: 0,
            })}
          >
            {film.description}
          </motion.p>

          {/* Awards list (for non-vintage) */}
          {film.theme !== 'vintage' && film.awards.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              css={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              {film.awards.slice(0, 2).map((award, i) => (
                <span
                  key={i}
                  css={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: film.theme === 'thriller' ? theme.secondary : theme.accent,
                    padding: '8px 16px',
                    border: `1px solid ${theme.border}`,
                  }}
                >
                  {award}
                </span>
              ))}
            </motion.div>
          )}

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            css={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
              marginTop: '8px',
            }}
          >
            {film.youtubeUrl && (
              <FilmButton 
                href={film.youtubeUrl} 
                primary 
                theme={film.theme}
              >
                Watch Film
              </FilmButton>
            )}
            {film.imdbUrl && (
              <FilmButton 
                href={film.imdbUrl} 
                theme={film.theme}
              >
                IMDb
              </FilmButton>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Film button component
const FilmButton: FC<{
  href: string;
  children: React.ReactNode;
  primary?: boolean;
  theme: 'vintage' | 'thriller' | 'tech';
}> = ({ href, children, primary, theme }) => {
  const themeColors = themes[theme];
  const isLight = theme === 'tech';

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      css={{
        fontFamily: 'var(--font-body)',
        fontSize: '12px',
        fontWeight: 500,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        padding: '14px 28px',
        border: primary 
          ? 'none' 
          : `1px solid ${themeColors.border}`,
        background: primary 
          ? (isLight ? themeColors.accent : themeColors.accent)
          : 'transparent',
        color: primary 
          ? (isLight ? '#fff' : themeColors.text)
          : themeColors.text,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        textDecoration: 'none',
        display: 'inline-block',
        '&:hover': {
          background: primary 
            ? (theme === 'thriller' ? '#a52b2b' : (isLight ? '#1a1a1a' : themeColors.text))
            : `${themeColors.accent}15`,
          color: primary 
            ? (isLight ? '#fff' : themeColors.bg)
            : themeColors.text,
          borderColor: themeColors.accent,
        },
      }}
    >
      {children}
    </motion.a>
  );
};

// Vintage background (WW2 era)
const VintageBackground: FC<{ isInView: boolean }> = ({ isInView }) => (
  <>
    {/* Vignette effect */}
    <div
      css={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
        pointerEvents: 'none',
      }}
    />
    {/* Film scratches */}
    <motion.div
      animate={{ 
        backgroundPosition: ['0% 0%', '100% 100%'],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      css={{
        position: 'absolute',
        inset: 0,
        opacity: 0.03,
        background: `repeating-linear-gradient(
          90deg,
          transparent,
          transparent 50px,
          rgba(255,255,255,0.1) 50px,
          rgba(255,255,255,0.1) 51px
        )`,
        pointerEvents: 'none',
      }}
    />
    {/* Date stamp */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 1, delay: 1 }}
      css={mq({
        position: 'absolute',
        bottom: ['40px', '60px', '80px'],
        right: ['24px', '60px', '80px'],
        fontFamily: 'var(--font-body)',
        fontSize: '10px',
        fontWeight: 400,
        letterSpacing: '0.3em',
        color: 'rgba(212, 197, 169, 0.3)',
        textTransform: 'uppercase',
      })}
    >
      Jerusalem, 1961
    </motion.div>
  </>
);

// Thriller background (religious/dark)
const ThrillerBackground: FC<{ isInView: boolean }> = ({ isInView }) => (
  <>
    {/* Deep shadow overlay */}
    <div
      css={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 70% 30%, transparent 0%, rgba(0,0,0,0.7) 100%)',
        pointerEvents: 'none',
      }}
    />
    {/* Subtle cross pattern */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 0.02 : 0 }}
      transition={{ duration: 1.5 }}
      css={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(139, 30, 30, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(139, 30, 30, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '100px 100px',
        pointerEvents: 'none',
      }}
    />
    {/* Candle glow effect */}
    <motion.div
      animate={{ 
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      css={mq({
        position: 'absolute',
        top: '20%',
        left: ['10%', '15%', '20%'],
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(201, 162, 39, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        filter: 'blur(60px)',
      })}
    />
  </>
);

// Tech background (clinical/digital)
const TechBackground: FC<{ isInView: boolean }> = ({ isInView }) => (
  <>
    {/* Grid pattern */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 1 }}
      css={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
      }}
    />
    {/* Data streams */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 0.4 : 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      css={mq({
        position: 'absolute',
        top: '10%',
        right: ['5%', '10%', '15%'],
        fontFamily: 'monospace',
        fontSize: '10px',
        color: 'rgba(0,0,0,0.1)',
        lineHeight: 1.8,
        whiteSpace: 'pre',
        pointerEvents: 'none',
        display: ['none', 'none', 'block'],
      })}
    >
      {`01001000 01010101 01001101
01000001 01001110 00100000
01000011 01001111 01010011
01010100 00100000 01001111
01000110 00100000 01000001
01001001 00101110 00101110`}
    </motion.div>
    {/* Corner brackets */}
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.9 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      css={mq({
        position: 'absolute',
        top: ['40px', '60px', '80px'],
        left: ['24px', '60px', '80px'],
        width: '60px',
        height: '60px',
        borderTop: '2px solid rgba(0,0,0,0.1)',
        borderLeft: '2px solid rgba(0,0,0,0.1)',
      })}
    />
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.9 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      css={mq({
        position: 'absolute',
        bottom: ['40px', '60px', '80px'],
        right: ['24px', '60px', '80px'],
        width: '60px',
        height: '60px',
        borderBottom: '2px solid rgba(0,0,0,0.1)',
        borderRight: '2px solid rgba(0,0,0,0.1)',
      })}
    />
  </>
);

export default FilmShowcase;

