/* eslint-disable @next/next/no-img-element */
/** @jsxImportSource @emotion/react */

import { useEffect, useState, useRef } from 'react';
import { AwardsSection } from '../components/AwardsSection';
import { GapVertical } from '../components/GapVertical';
import { HomeHeader } from '../components/HomeHeader';
import { MediaSection } from '../components/MediaSection';
import { VideoSection } from '../components/VideoSection';
import { WorkSection } from '../components/WorkSection';
import { useDisclosure } from '@chakra-ui/react';
import { OFAModal } from '../components/ofa-modal/OFAModal';
import { AiFillCloseCircle } from 'react-icons/ai';
import { mq } from '../styles/mq';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPrompt, setShowPrompt] = useState(true);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Show the OFA modal after a delay
    const timer = setTimeout(() => {
      onOpen();
    }, 2000);

    // Hide loader after everything is loaded
    const loaderTimer = setTimeout(() => {
      setLoading(false);
    }, 800);

    // Track scroll position
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress(currentScroll / totalScroll);

      // Determine active section
      if (sectionsRef.current.length > 0) {
        const viewportHeight = window.innerHeight;
        const threshold = viewportHeight / 2;

        for (let i = 0; i < sectionsRef.current.length; i++) {
          const section = sectionsRef.current[i];
          if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= threshold && rect.bottom >= threshold) {
              setActiveSection(i);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      clearTimeout(loaderTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [onOpen]);

  // Scroll to section
  const scrollToSection = (index: number) => {
    if (sectionsRef.current[index]) {
      window.scrollTo({
        top: sectionsRef.current[index].offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <Head>
        <title>Vir Srinivas: Filmmaker</title>
        <meta
          name="description"
          content="Vir Srinivas is an award-winning filmmaker, writer, producer and director. Explore his work including 'Orders from Above' and 'The Proselyte'."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Vir Srinivas: Filmmaker" />
        <meta
          property="og:description"
          content="Award-winning filmmaker, writer, producer and director."
        />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Page loader */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            css={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'white',
              zIndex: 1000,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1
                css={{
                  fontSize: '24px',
                  fontWeight: 400,
                  letterSpacing: '0.2em',
                  fontFamily: 'Oswald',
                }}
              >
                VIR SRINIVAS
              </h1>
            </motion.div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '40px' }}
              transition={{ duration: 0.5, delay: 0.3 }}
              css={{ height: '1px', background: 'black', marginTop: '10px' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed navigation dots */}
      <div
        css={mq({
          position: 'fixed',
          right: ['10px', '20px', '30px'],
          top: '50%',
          transform: 'translateY(-50%)',
          display: ['none', 'flex', 'flex'],
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px',
          zIndex: 50,
        })}
      >
        {['Home', 'Work', 'Awards', 'Videos'].map((_, index) => (
          <div
            key={index}
            css={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: activeSection === index ? 'black' : 'rgba(0,0,0,0.2)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              ':hover': {
                transform: 'scale(1.2)',
              },
            }}
            onClick={() => scrollToSection(index)}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div
        css={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '2px',
          background: 'black',
          width: `${scrollProgress * 100}%`,
          zIndex: 100,
          transition: 'width 0.1s linear',
        }}
      />

      {/* OFA film release prompt */}
      {showPrompt ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.5 }}
          css={mq({
            position: 'fixed',
            zIndex: 5,
            right: '36px',
            bottom: '36px',
            borderRadius: '6px',
            boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.1)',
            background: 'white',
            cursor: 'pointer',
            display: ['none', 'flex', 'flex'],
            flexDirection: 'column',
            alignItems: 'center',
            overflow: 'hidden',
            border: '1px solid rgba(0,0,0,0.05)',
            transition: 'all 0.3s ease',
            ':hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.15)',
            },
          })}
        >
          <AiFillCloseCircle
            css={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              background: 'white',
              borderRadius: '50%',
              zIndex: 2,
            }}
            size={24}
            onClick={(e) => {
              e.stopPropagation();
              setShowPrompt(false);
            }}
          />
          <img
            src="ofa-poster-2.jpeg"
            css={{
              width: '120px',
              objectFit: 'cover',
              borderTopLeftRadius: '6px',
              borderTopRightRadius: '6px',
            }}
            alt="Orders from Above Movie Poster"
            onClick={onOpen}
          />
          <span
            css={{
              fontFamily: 'Rubik',
              fontSize: '11px',
              textTransform: 'uppercase',
              fontWeight: 500,
              letterSpacing: '0.08rem',
              padding: '12px 20px',
              transition: 'all 0.3s ease',
              ':hover': {
                background: 'rgba(0,0,0,0.03)',
              },
            }}
            onClick={onOpen}
          >
            View Release
          </span>
        </motion.div>
      ) : null}

      <OFAModal isOpen={isOpen} onClose={onClose} />

      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '100vw',
          minHeight: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Oswald',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          ref={(el) => {
            if (el) sectionsRef.current[0] = el;
          }}
          css={{ width: '100%' }}
        >
          <HomeHeader />
        </div>
        <div
          ref={(el) => {
            if (el) sectionsRef.current[1] = el;
          }}
          css={{ width: '100%' }}
        >
          <WorkSection onOpen={onOpen} />
        </div>
        <div
          ref={(el) => {
            if (el) sectionsRef.current[2] = el;
          }}
          css={{ width: '100%' }}
        >
          <AwardsSection />
        </div>
        <div
          ref={(el) => {
            if (el) sectionsRef.current[3] = el;
          }}
          css={{ width: '100%' }}
        >
          <VideoSection />
        </div>
        <div
          ref={(el) => {
            if (el) sectionsRef.current[4] = el;
          }}
          css={{ width: '100%' }}
        >
          <MediaSection />
        </div>
        <GapVertical times={12} />

        {/* Footer */}
        <footer
          css={{
            width: '100%',
            padding: '20px 0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderTop: '1px solid rgba(0,0,0,0.05)',
          }}
        >
          <p
            css={{
              fontFamily: 'Rubik',
              fontSize: '12px',
              color: 'rgba(0,0,0,0.6)',
              fontWeight: 300,
            }}
          >
            © {new Date().getFullYear()} Vir Srinivas. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
}
