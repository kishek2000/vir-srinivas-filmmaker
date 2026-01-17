/** @jsxImportSource @emotion/react */
import { FC, useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { mq } from '../styles/mq';

export const HeroSection: FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    const contentTimer = setTimeout(() => setShowContent(true), 800);
    return () => {
      clearTimeout(timer);
      clearTimeout(contentTimer);
    };
  }, []);

  const scrollToFilms = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity, scale }}
      css={mq({
        position: 'relative',
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--black)',
        overflow: 'hidden',
      })}
    >
      {/* Subtle grid pattern background */}
      <div
        css={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          opacity: 0.5,
        }}
      />

      {/* Corner marks - cinematic framing */}
      <div css={{ position: 'absolute', top: '40px', left: '40px', display: 'flex', gap: '8px' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: loaded ? 40 : 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          css={{ height: '1px', background: 'rgba(255,255,255,0.3)' }}
        />
      </div>
      <div css={{ position: 'absolute', top: '40px', right: '40px' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: loaded ? 40 : 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          css={{ height: '1px', background: 'rgba(255,255,255,0.3)', marginLeft: 'auto' }}
        />
      </div>

      {/* Main content */}
      <motion.div
        style={{ y }}
        css={mq({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          zIndex: 2,
          padding: ['0 24px', '0 40px', '0 60px'],
        })}
      >
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          css={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <div css={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.4)' }} />
          <span
            css={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              fontWeight: 400,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            Award-Winning Filmmaker
          </span>
          <div css={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.4)' }} />
        </motion.div>

        {/* Main title with reveal effect */}
        <div css={{ overflow: 'hidden' }}>
          <motion.h1
            initial={{ y: 120 }}
            animate={{ y: showContent ? 0 : 120 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            css={mq({
              fontFamily: 'var(--font-display)',
              fontSize: ['60px', '100px', '140px'],
              fontWeight: 400,
              lineHeight: 0.9,
              letterSpacing: '0.02em',
              color: 'var(--white)',
              margin: 0,
            })}
          >
            VIR SRINIVAS
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          css={mq({
            display: 'flex',
            alignItems: 'center',
            gap: ['16px', '24px', '32px'],
            marginTop: ['24px', '32px', '40px'],
          })}
        >
          {['Writer', 'Director', 'Producer'].map((role, index) => (
            <motion.span
              key={role}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 10 }}
              transition={{ duration: 0.6, delay: 0.9 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              css={mq({
                fontFamily: 'var(--font-serif)',
                fontSize: ['16px', '20px', '24px'],
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'rgba(255,255,255,0.7)',
                display: 'flex',
                alignItems: 'center',
                gap: ['16px', '24px', '32px'],
                '&:not(:last-child)::after': {
                  content: '"·"',
                  marginLeft: 'inherit',
                  color: 'rgba(255,255,255,0.3)',
                },
              })}
            >
              {role}
            </motion.span>
          ))}
        </motion.div>

        {/* Brief bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          css={mq({
            fontFamily: 'var(--font-body)',
            fontSize: ['14px', '15px', '16px'],
            fontWeight: 300,
            lineHeight: 1.8,
            color: 'rgba(255,255,255,0.5)',
            maxWidth: '600px',
            marginTop: ['32px', '40px', '48px'],
            textAlign: 'center',
          })}
        >
          Crafting stories that explore the depths of human nature—from the horrors of war 
          to the moral complexities of faith and the hidden costs of technology.
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        css={mq({
          position: 'absolute',
          bottom: ['60px', '80px', '100px'],
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
          gap: '12px',
        })}
        onClick={scrollToFilms}
      >
        <span
          css={{
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            fontWeight: 400,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          Explore Work
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          css={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)',
          }}
        />
      </motion.div>

      {/* Film strip decorations on sides */}
      <div
        css={mq({
          position: 'absolute',
          left: ['16px', '30px', '50px'],
          top: '50%',
          transform: 'translateY(-50%)',
          display: ['none', 'flex', 'flex'],
          flexDirection: 'column',
          gap: '8px',
          opacity: 0.15,
        })}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: showContent ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 1 + i * 0.05 }}
            css={{ width: '4px', height: '20px', background: 'var(--white)' }}
          />
        ))}
      </div>
      <div
        css={mq({
          position: 'absolute',
          right: ['16px', '30px', '50px'],
          top: '50%',
          transform: 'translateY(-50%)',
          display: ['none', 'flex', 'flex'],
          flexDirection: 'column',
          gap: '8px',
          opacity: 0.15,
        })}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: showContent ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 1 + i * 0.05 }}
            css={{ width: '4px', height: '20px', background: 'var(--white)' }}
          />
        ))}
      </div>
    </motion.section>
  );
};

