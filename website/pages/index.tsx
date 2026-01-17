/** @jsxImportSource @emotion/react */
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useViewportScroll, useTransform } from 'framer-motion';
import Head from 'next/head';
import { mq } from '../styles/mq';
import { HeroSection } from '../components/HeroSection';
import { FilmShowcase, films } from '../components/FilmShowcase';
import { AwardsShowcase } from '../components/AwardsShowcase';
import { ContactFooter } from '../components/ContactFooter';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [pageHeight, setPageHeight] = useState(1);
  const mainRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useViewportScroll();
  
  useEffect(() => {
    const updatePageHeight = () => {
      setPageHeight(document.documentElement.scrollHeight - window.innerHeight || 1);
    };
    updatePageHeight();
    window.addEventListener('resize', updatePageHeight);
    // Update after content loads
    const timer = setTimeout(updatePageHeight, 2000);
    return () => {
      window.removeEventListener('resize', updatePageHeight);
      clearTimeout(timer);
    };
  }, []);
  
  const scrollYProgress = useTransform(scrollY, [0, pageHeight], [0, 1]);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    // Hide loader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Vir Srinivas | Filmmaker</title>
        <meta
          name="description"
          content="Vir Srinivas is an award-winning filmmaker, writer, producer and director. Explore his work including 'Orders from Above', 'The Proselyte', and 'Gradient Descent'."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Vir Srinivas | Filmmaker" />
        <meta
          property="og:description"
          content="Award-winning filmmaker, writer, producer and director."
        />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0a0a" />
      </Head>

      {/* Cinematic loading screen */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            css={{
              position: 'fixed',
              inset: 0,
              background: 'var(--black)',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '32px',
            }}
          >
            {/* Loading name reveal */}
            <div css={{ overflow: 'hidden' }}>
              <motion.h1
                initial={{ y: 60 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                css={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '24px',
                  fontWeight: 400,
                  letterSpacing: '0.3em',
                  color: 'var(--white)',
                  margin: 0,
                }}
              >
                VIR SRINIVAS
              </motion.h1>
            </div>

            {/* Progress bar */}
            <div
              css={{
                width: '120px',
                height: '1px',
                background: 'rgba(255,255,255,0.1)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${Math.min(loadingProgress, 100)}%` }}
                transition={{ duration: 0.1 }}
                css={{
                  height: '100%',
                  background: 'var(--white)',
                }}
              />
            </div>

            {/* Loading text */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              css={{
                fontFamily: 'var(--font-body)',
                fontSize: '10px',
                fontWeight: 400,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)',
              }}
            >
              Filmmaker
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress indicator */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        css={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'var(--white)',
          transformOrigin: '0%',
          zIndex: 100,
          opacity: 0.6,
        }}
      />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main
        ref={mainRef}
        css={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          background: 'var(--black)',
        }}
      >
        {/* Hero */}
        <HeroSection />

        {/* Film showcases with distinct themes */}
        {films.map((film, index) => (
          <FilmShowcase key={film.id} film={film} index={index} />
        ))}

        {/* Awards */}
        <AwardsShowcase />

        {/* Contact & Footer */}
        <ContactFooter />
      </main>

      {/* Noise texture overlay for cinematic feel */}
      <div className="noise-overlay film-grain" />
    </>
  );
}

// Minimal fixed navigation
const Navigation = () => {
  const [visible, setVisible] = useState(false);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setAtTop(currentScroll < 100);
      setVisible(currentScroll < lastScroll || currentScroll < 100);
      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    const sections = document.querySelectorAll('section');
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      css={mq({
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: ['16px 24px', '20px 40px', '24px 60px'],
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: atTop ? 'transparent' : 'rgba(10, 10, 10, 0.9)',
        backdropFilter: atTop ? 'none' : 'blur(10px)',
        transition: 'background 0.3s ease, backdrop-filter 0.3s ease',
      })}
    >
      {/* Logo */}
      <motion.a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        whileHover={{ opacity: 0.7 }}
        css={{
          fontFamily: 'var(--font-display)',
          fontSize: '14px',
          fontWeight: 400,
          letterSpacing: '0.2em',
          color: 'var(--white)',
          textDecoration: 'none',
        }}
      >
        VS
      </motion.a>

      {/* Nav links */}
      <div
        css={mq({
          display: ['none', 'flex', 'flex'],
          alignItems: 'center',
          gap: '40px',
        })}
      >
        {['Films', 'Awards', 'Contact'].map((item, index) => (
          <motion.button
            key={item}
            onClick={() => scrollToSection(index + 1)}
            whileHover={{ opacity: 0.7 }}
            css={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              fontWeight: 400,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--white)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              padding: '4px 0',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '0%',
                height: '1px',
                background: 'var(--white)',
                transition: 'width 0.3s ease',
              },
              '&:hover::after': {
                width: '100%',
              },
            }}
          >
            {item}
          </motion.button>
        ))}
      </div>

      {/* Mobile menu button */}
      <MobileMenuButton />
    </motion.nav>
  );
};

// Mobile menu
const MobileMenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (index: number) => {
    setIsOpen(false);
    setTimeout(() => {
      const sections = document.querySelectorAll('section');
      if (sections[index]) {
        sections[index].scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        css={mq({
          display: ['flex', 'none', 'none'],
          flexDirection: 'column',
          gap: '5px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
        })}
        aria-label="Toggle menu"
      >
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
          css={{ width: '20px', height: '1px', background: 'var(--white)' }}
        />
        <motion.span
          animate={{ opacity: isOpen ? 0 : 1 }}
          css={{ width: '20px', height: '1px', background: 'var(--white)' }}
        />
        <motion.span
          animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
          css={{ width: '20px', height: '1px', background: 'var(--white)' }}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            css={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(10, 10, 10, 0.98)',
              zIndex: 40,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '32px',
            }}
          >
            {['Home', 'Films', 'Awards', 'Contact'].map((item, index) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => scrollToSection(index)}
                css={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '32px',
                  fontWeight: 400,
                  letterSpacing: '0.1em',
                  color: 'var(--white)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {item}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
