/** @jsxImportSource @emotion/react */
/* eslint-disable @next/next/no-img-element */
import { FC, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  tagline: string;
  year: string;
  duration: string;
  description: string;
  poster: string;
  videoEmbed?: string;
  localVideo?: string;
  youtubeUrl?: string;
  imdbUrl?: string;
  theme: 'vintage' | 'thriller' | 'tech';
}

// Film data
export const films: FilmData[] = [
  {
    id: 'ofa',
    title: 'ORDERS FROM ABOVE',
    tagline: 'How does an ordinary man commit extraordinary evil?',
    year: '2021',
    duration: 'Feature Film',
    description: 'The true story of the interrogation of Nazi war criminal Adolf Eichmann by Israeli police captain Avner Less. A haunting exploration of bureaucratic evil and the banality of genocide.',
    poster: '/ofa-poster-2.jpeg',
    videoEmbed: 'https://www.youtube.com/embed/osiqn2u6BMk',
    localVideo: '/orders-from-above-trailer-compressed.mp4',
    youtubeUrl: 'https://www.youtube.com/watch?v=osiqn2u6BMk',
    imdbUrl: 'http://www.imdb.com/title/tt14858134',
    theme: 'vintage',
  },
  {
    id: 'proselyte',
    title: 'THE PROSELYTE',
    tagline: 'The seal of confession is absolute.',
    year: '2022',
    duration: '20 min',
    description: 'A Catholic priest with a dark past wrestles with his faith after he hears a confession from an active serial killer. Bound by the sacred seal of confession, he must choose between divine law and human justice.',
    poster: '/proselyte-poster.png',
    videoEmbed: 'https://www.youtube.com/embed/GG48DnCQrEk',
    youtubeUrl: 'https://www.youtube.com/watch?v=GG48DnCQrEk',
    imdbUrl: 'http://www.imdb.com/title/tt14755002',
    theme: 'thriller',
  },
  {
    id: 'gradient-descent',
    title: 'GRADIENT DESCENT',
    tagline: 'The human cost of artificial intelligence.',
    year: '2024',
    duration: '20 min',
    description: 'A homeless man is recruited by an artificial intelligence company and forced to do horrifying work. A stark commentary on the exploitation hidden behind the technology we use daily.',
    poster: '/gd-poster.png',
    videoEmbed: 'https://www.youtube.com/embed/Igo_pGU08HA',
    youtubeUrl: 'https://www.youtube.com/watch?v=Igo_pGU08HA',
    imdbUrl: 'https://www.imdb.com/title/tt31491453/',
    theme: 'tech',
  },
];

export const FilmShowcase: FC<{ film: FilmData; index: number }> = ({ film, index }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Render themed showcase based on film type
  if (film.theme === 'vintage') {
    return <VintageFilmShowcase film={film} containerRef={containerRef} isInView={isInView} />;
  }
  if (film.theme === 'thriller') {
    return <ThrillerFilmShowcase film={film} containerRef={containerRef} isInView={isInView} />;
  }
  return <TechFilmShowcase film={film} containerRef={containerRef} isInView={isInView} />;
};

// ============================================
// ORDERS FROM ABOVE - Vintage Documentary Style
// ============================================
const VintageFilmShowcase: FC<{
  film: FilmData;
  containerRef: React.RefObject<HTMLDivElement>;
  isInView: boolean;
}> = ({ film, containerRef, isInView }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section
      ref={containerRef}
      css={mq({
        position: 'relative',
        minHeight: '100vh',
        width: '100vw',
        background: '#0c0a07',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      })}
    >
      {/* Archival paper texture */}
      <div
        css={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          pointerEvents: 'none',
        }}
      />

      {/* Top section - Title & Info */}
      <div
        css={mq({
          padding: ['60px 24px 40px', '80px 60px 60px', '100px 100px 80px'],
          display: 'flex',
          flexDirection: 'column',
          borderBottom: '1px solid rgba(180, 160, 120, 0.15)',
        })}
      >
        {/* Document header styling */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          css={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <span
            css={{
              fontFamily: '"Courier New", monospace',
              fontSize: '11px',
              fontWeight: 400,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(180, 160, 120, 0.6)',
            }}
          >
            Case File No. 1961-040
          </span>
          <div css={{ flex: 1, height: '1px', background: 'rgba(180, 160, 120, 0.2)' }} />
          <span
            css={{
              fontFamily: '"Courier New", monospace',
              fontSize: '11px',
              letterSpacing: '0.1em',
              color: 'rgba(180, 160, 120, 0.5)',
            }}
          >
            Jerusalem, Israel
          </span>
        </motion.div>

        {/* Main title - typewriter style */}
        <div css={{ overflow: 'hidden' }}>
          <motion.h1
            initial={{ y: 100 }}
            animate={{ y: isInView ? 0 : 100 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            css={mq({
              fontFamily: '"Courier New", monospace',
              fontSize: ['32px', '48px', '64px'],
              fontWeight: 700,
              letterSpacing: '0.05em',
              color: '#d4c5a9',
              margin: 0,
              lineHeight: 1.1,
              textTransform: 'uppercase',
            })}
          >
            {film.title}
          </motion.h1>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          css={mq({
            fontFamily: 'var(--font-serif)',
            fontSize: ['18px', '22px', '26px'],
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'rgba(180, 160, 120, 0.7)',
            margin: 0,
            marginTop: '16px',
          })}
        >
          "{film.tagline}"
        </motion.p>

        {/* Meta info - document style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          css={{
            display: 'flex',
            gap: '32px',
            marginTop: '32px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { label: 'Classification', value: film.duration },
            { label: 'Year', value: film.year },
            { label: 'Status', value: 'DECLASSIFIED' },
          ].map((item) => (
            <div key={item.label} css={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span
                css={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: '10px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(180, 160, 120, 0.4)',
                }}
              >
                {item.label}
              </span>
              <span
                css={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#d4c5a9',
                  letterSpacing: '0.05em',
                }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Video section - full width immersive */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        css={mq({
          position: 'relative',
          width: '100%',
          aspectRatio: '16/9',
          maxHeight: '70vh',
          background: '#000',
          overflow: 'hidden',
        })}
      >
        {/* Film grain overlay */}
        <div
          css={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            pointerEvents: 'none',
            background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)',
            mixBlendMode: 'multiply',
          }}
        />
        
        {/* Vignette */}
        <div
          css={{
            position: 'absolute',
            inset: 0,
            zIndex: 3,
            pointerEvents: 'none',
            boxShadow: 'inset 0 0 150px rgba(0,0,0,0.7)',
          }}
        />

        <iframe
          src={`${film.videoEmbed}?rel=0&modestbranding=1&color=white`}
          title={film.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setVideoLoaded(true)}
          css={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            filter: 'sepia(20%) contrast(1.1)',
          }}
        />
      </motion.div>

      {/* Bottom section - Description & Links */}
      <div
        css={mq({
          padding: ['40px 24px 60px', '60px 60px 80px', '80px 100px 100px'],
          display: 'grid',
          gridTemplateColumns: ['1fr', '1fr', '2fr 1fr'],
          gap: ['32px', '48px', '80px'],
        })}
      >
        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p
            css={mq({
              fontFamily: 'var(--font-serif)',
              fontSize: ['16px', '18px', '20px'],
              fontWeight: 300,
              lineHeight: 1.8,
              color: 'rgba(212, 197, 169, 0.8)',
              margin: 0,
              maxWidth: '600px',
            })}
          >
            {film.description}
          </p>
          
          {/* Awards badge */}
          <div
            css={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              marginTop: '32px',
              padding: '12px 20px',
              border: '1px solid rgba(180, 160, 120, 0.3)',
              background: 'rgba(180, 160, 120, 0.05)',
            }}
          >
            <span css={{ fontSize: '20px' }}>🏆</span>
            <span
              css={{
                fontFamily: '"Courier New", monospace',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#d4c5a9',
              }}
            >
              Winner of 15+ International Awards
            </span>
          </div>
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          css={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <FilmLink href={film.youtubeUrl} variant="vintage">
            Watch Full Film
          </FilmLink>
          <FilmLink href={film.imdbUrl} variant="vintage" secondary>
            View on IMDb
          </FilmLink>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// THE PROSELYTE - Gothic Religious Thriller
// ============================================
const ThrillerFilmShowcase: FC<{
  film: FilmData;
  containerRef: React.RefObject<HTMLDivElement>;
  isInView: boolean;
}> = ({ film, containerRef, isInView }) => {
  return (
    <section
      ref={containerRef}
      css={mq({
        position: 'relative',
        minHeight: '100vh',
        width: '100vw',
        background: '#080606',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      })}
    >
      {/* Deep shadow vignette */}
      <div
        css={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 30%, transparent 0%, rgba(0,0,0,0.5) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Stained glass inspired accent - subtle */}
      <div
        css={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1px',
          height: '200px',
          background: 'linear-gradient(to bottom, rgba(139, 30, 30, 0.4), transparent)',
          pointerEvents: 'none',
        }}
      />

      {/* Full-width video header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 1 }}
        css={mq({
          position: 'relative',
          width: '100%',
          aspectRatio: '21/9',
          maxHeight: '50vh',
          minHeight: ['250px', '350px', '400px'],
          overflow: 'hidden',
        })}
      >
        {/* Dark overlay for text readability */}
        <div
          css={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(8,6,6,0.3) 0%, rgba(8,6,6,0.9) 100%)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        <iframe
          src={`${film.videoEmbed}?rel=0&modestbranding=1&autoplay=0`}
          title={film.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          css={{
            position: 'absolute',
            inset: '-20%',
            width: '140%',
            height: '140%',
            filter: 'brightness(0.6) contrast(1.1)',
          }}
        />

        {/* Overlay title */}
        <div
          css={mq({
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: ['40px 24px', '60px 60px', '80px 100px'],
            zIndex: 3,
          })}
        >
          {/* Genre tag */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            css={{
              display: 'inline-block',
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#8b1e1e',
              marginBottom: '16px',
            }}
          >
            Psychological Thriller
          </motion.span>

          <div css={{ overflow: 'hidden' }}>
            <motion.h1
              initial={{ y: 100 }}
              animate={{ y: isInView ? 0 : 100 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              css={mq({
                fontFamily: 'var(--font-serif)',
                fontSize: ['36px', '56px', '80px'],
                fontWeight: 400,
                fontStyle: 'italic',
                letterSpacing: '-0.02em',
                color: '#e8e2d5',
                margin: 0,
                lineHeight: 1,
              })}
            >
              The Proselyte
            </motion.h1>
          </div>
        </div>
      </motion.div>

      {/* Content section */}
      <div
        css={mq({
          flex: 1,
          padding: ['40px 24px 60px', '60px 60px 80px', '80px 100px 100px'],
          display: 'flex',
          flexDirection: 'column',
        })}
      >
        {/* Tagline - prominent */}
        <motion.blockquote
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          css={mq({
            fontFamily: 'var(--font-serif)',
            fontSize: ['24px', '32px', '40px'],
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'rgba(201, 162, 39, 0.8)',
            margin: 0,
            marginBottom: ['32px', '48px', '64px'],
            maxWidth: '800px',
            lineHeight: 1.3,
            borderLeft: '2px solid rgba(139, 30, 30, 0.5)',
            paddingLeft: '24px',
          })}
        >
          "{film.tagline}"
        </motion.blockquote>

        <div
          css={mq({
            display: 'grid',
            gridTemplateColumns: ['1fr', '1fr', '2fr 1fr'],
            gap: ['32px', '48px', '80px'],
          })}
        >
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p
              css={mq({
                fontFamily: 'var(--font-body)',
                fontSize: ['15px', '16px', '17px'],
                fontWeight: 300,
                lineHeight: 1.9,
                color: 'rgba(212, 208, 200, 0.7)',
                margin: 0,
                maxWidth: '550px',
              })}
            >
              {film.description}
            </p>

            {/* Meta */}
            <div
              css={{
                display: 'flex',
                gap: '32px',
                marginTop: '32px',
                paddingTop: '24px',
                borderTop: '1px solid rgba(139, 30, 30, 0.2)',
              }}
            >
              <div>
                <span css={{ 
                  fontFamily: 'var(--font-body)', 
                  fontSize: '10px', 
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(212, 208, 200, 0.4)',
                  display: 'block',
                  marginBottom: '4px',
                }}>
                  Runtime
                </span>
                <span css={{ 
                  fontFamily: 'var(--font-serif)', 
                  fontSize: '16px', 
                  fontStyle: 'italic',
                  color: 'rgba(212, 208, 200, 0.8)',
                }}>
                  {film.duration}
                </span>
              </div>
              <div>
                <span css={{ 
                  fontFamily: 'var(--font-body)', 
                  fontSize: '10px', 
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(212, 208, 200, 0.4)',
                  display: 'block',
                  marginBottom: '4px',
                }}>
                  Year
                </span>
                <span css={{ 
                  fontFamily: 'var(--font-serif)', 
                  fontSize: '16px', 
                  fontStyle: 'italic',
                  color: 'rgba(212, 208, 200, 0.8)',
                }}>
                  {film.year}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Links & Awards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            css={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <FilmLink href={film.youtubeUrl} variant="thriller">
              Watch Film
            </FilmLink>
            <FilmLink href={film.imdbUrl} variant="thriller" secondary>
              IMDb
            </FilmLink>
            
            {/* Award */}
            <div
              css={{
                marginTop: '16px',
                padding: '16px',
                background: 'rgba(139, 30, 30, 0.1)',
                border: '1px solid rgba(139, 30, 30, 0.2)',
              }}
            >
              <span css={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(201, 162, 39, 0.8)',
              }}>
                🏆 Winner — Best Drama
              </span>
              <span css={{
                display: 'block',
                fontFamily: 'var(--font-serif)',
                fontSize: '13px',
                fontStyle: 'italic',
                color: 'rgba(212, 208, 200, 0.5)',
                marginTop: '4px',
              }}>
                Perth Independent Film Festival
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// GRADIENT DESCENT - Tech Noir / Clinical
// ============================================
const TechFilmShowcase: FC<{
  film: FilmData;
  containerRef: React.RefObject<HTMLDivElement>;
  isInView: boolean;
}> = ({ film, containerRef, isInView }) => {
  return (
    <section
      ref={containerRef}
      css={mq({
        position: 'relative',
        minHeight: '100vh',
        width: '100vw',
        background: '#fafafa',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      })}
    >
      {/* Grid pattern */}
      <div
        css={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <div
        css={mq({
          padding: ['60px 24px 40px', '80px 60px 60px', '100px 100px 80px'],
          display: 'flex',
          flexDirection: 'column',
        })}
      >
        {/* System status bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          css={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          <div css={{ 
            width: '8px', 
            height: '8px', 
            borderRadius: '50%', 
            background: '#00c853',
            boxShadow: '0 0 8px rgba(0, 200, 83, 0.5)',
          }} />
          <span
            css={{
              fontFamily: 'monospace',
              fontSize: '11px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.4)',
            }}
          >
            sys.film.load — {film.year}
          </span>
        </motion.div>

        {/* Title - stark and bold */}
        <div css={{ overflow: 'hidden' }}>
          <motion.h1
            initial={{ y: 100 }}
            animate={{ y: isInView ? 0 : 100 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            css={mq({
              fontFamily: 'var(--font-display)',
              fontSize: ['40px', '64px', '96px'],
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: '#0a0a0a',
              margin: 0,
              lineHeight: 0.95,
            })}
          >
            GRADIENT
            <br />
            DESCENT
          </motion.h1>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          css={mq({
            fontFamily: 'monospace',
            fontSize: ['14px', '16px', '18px'],
            fontWeight: 400,
            color: 'rgba(0,0,0,0.5)',
            margin: 0,
            marginTop: '24px',
            maxWidth: '400px',
          })}
        >
          // {film.tagline}
        </motion.p>
      </div>

      {/* Video - clean full width */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        css={mq({
          position: 'relative',
          width: ['calc(100% - 48px)', 'calc(100% - 120px)', 'calc(100% - 200px)'],
          margin: '0 auto',
          aspectRatio: '16/9',
          maxHeight: '60vh',
          background: '#0a0a0a',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
        })}
      >
        <iframe
          src={`${film.videoEmbed}?rel=0&modestbranding=1`}
          title={film.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          css={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
          }}
        />
      </motion.div>

      {/* Footer content */}
      <div
        css={mq({
          flex: 1,
          padding: ['40px 24px 60px', '60px 60px 80px', '80px 100px 100px'],
          display: 'grid',
          gridTemplateColumns: ['1fr', '1fr', '1fr 1fr'],
          gap: ['32px', '48px', '80px'],
          alignItems: 'start',
        })}
      >
        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p
            css={mq({
              fontFamily: 'var(--font-body)',
              fontSize: ['15px', '16px', '17px'],
              fontWeight: 300,
              lineHeight: 1.8,
              color: 'rgba(0,0,0,0.6)',
              margin: 0,
              maxWidth: '500px',
            })}
          >
            {film.description}
          </p>

          {/* Runtime badge */}
          <div
            css={{
              display: 'inline-flex',
              gap: '24px',
              marginTop: '32px',
              padding: '12px 0',
              borderTop: '1px solid rgba(0,0,0,0.1)',
            }}
          >
            <span css={{
              fontFamily: 'monospace',
              fontSize: '12px',
              color: 'rgba(0,0,0,0.4)',
            }}>
              runtime: {film.duration}
            </span>
            <span css={{
              fontFamily: 'monospace',
              fontSize: '12px',
              color: 'rgba(0,0,0,0.4)',
            }}>
              format: digital
            </span>
          </div>
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          css={mq({
            display: 'flex',
            flexDirection: ['row', 'row', 'column'],
            gap: '16px',
            justifyContent: ['flex-start', 'flex-start', 'flex-start'],
          })}
        >
          <FilmLink href={film.youtubeUrl} variant="tech">
            Watch Film
          </FilmLink>
          <FilmLink href={film.imdbUrl} variant="tech" secondary>
            IMDb
          </FilmLink>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// Reusable Link Component
// ============================================
const FilmLink: FC<{
  href?: string;
  children: React.ReactNode;
  variant: 'vintage' | 'thriller' | 'tech';
  secondary?: boolean;
}> = ({ href, children, variant, secondary }) => {
  const styles = {
    vintage: {
      bg: secondary ? 'transparent' : 'rgba(180, 160, 120, 0.15)',
      border: 'rgba(180, 160, 120, 0.4)',
      color: '#d4c5a9',
      hoverBg: 'rgba(180, 160, 120, 0.25)',
    },
    thriller: {
      bg: secondary ? 'transparent' : 'rgba(139, 30, 30, 0.2)',
      border: 'rgba(139, 30, 30, 0.4)',
      color: '#e8e2d5',
      hoverBg: 'rgba(139, 30, 30, 0.35)',
    },
    tech: {
      bg: secondary ? 'transparent' : '#0a0a0a',
      border: '#0a0a0a',
      color: secondary ? '#0a0a0a' : '#fafafa',
      hoverBg: secondary ? 'rgba(0,0,0,0.05)' : '#1a1a1a',
    },
  };

  const s = styles[variant];

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      css={mq({
        fontFamily: variant === 'vintage' ? '"Courier New", monospace' : 'var(--font-body)',
        fontSize: '12px',
        fontWeight: 500,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        padding: ['12px 24px', '14px 28px', '16px 32px'],
        background: s.bg,
        border: `1px solid ${s.border}`,
        color: s.color,
        textDecoration: 'none',
        display: 'inline-block',
        textAlign: 'center',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          background: s.hoverBg,
        },
      })}
    >
      {children}
    </motion.a>
  );
};

export default FilmShowcase;
