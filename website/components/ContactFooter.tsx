/** @jsxImportSource @emotion/react */
import { FC, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { mq } from '../styles/mq';
import { SocialIcon } from 'react-social-icons';

export const ContactFooter: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  const socialLinks = [
    { url: 'http://www.imdb.com/name/nm12504238', network: 'imdb' },
    { url: 'https://www.linkedin.com/in/vir-srinivas/', network: 'linkedin' },
    { url: 'https://instagram.com/virsrinivas', network: 'instagram' },
    { url: 'https://www.youtube.com/@virsrinivas', network: 'youtube' },
  ];

  return (
    <footer
      ref={containerRef}
      css={mq({
        position: 'relative',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--charcoal)',
        overflow: 'hidden',
        padding: ['80px 24px', '100px 60px', '120px 80px'],
      })}
    >
      {/* Decorative line at top */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isInView ? 1 : 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        css={{
          position: 'absolute',
          top: 0,
          left: '10%',
          right: '10%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          transformOrigin: 'center',
        }}
      />

      {/* Main content */}
      <div
        css={mq({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: ['32px', '40px', '48px'],
          maxWidth: '800px',
          textAlign: 'center',
        })}
      >
        {/* Let's work together */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          css={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div css={{ width: '24px', height: '1px', background: 'rgba(255,255,255,0.3)' }} />
          <span
            css={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              fontWeight: 400,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            Get in Touch
          </span>
          <div css={{ width: '24px', height: '1px', background: 'rgba(255,255,255,0.3)' }} />
        </motion.div>

        {/* Name as logo */}
        <div css={{ overflow: 'hidden' }}>
          <motion.h2
            initial={{ y: 60 }}
            animate={{ y: isInView ? 0 : 60 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            css={mq({
              fontFamily: 'var(--font-display)',
              fontSize: ['32px', '40px', '48px'],
              fontWeight: 400,
              letterSpacing: '0.1em',
              color: 'var(--white)',
              margin: 0,
            })}
          >
            VIR SRINIVAS
          </motion.h2>
        </div>

        {/* Email link */}
        <motion.a
          href="mailto:virsrinivasfilmmaker@gmail.com"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          css={mq({
            fontFamily: 'var(--font-serif)',
            fontSize: ['18px', '20px', '24px'],
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.6)',
            textDecoration: 'none',
            position: 'relative',
            padding: '8px 0',
            transition: 'color 0.3s ease',
            '&:hover': {
              color: 'var(--white)',
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: '50%',
              width: 0,
              height: '1px',
              background: 'var(--white)',
              transition: 'all 0.3s ease',
              transform: 'translateX(-50%)',
            },
            '&:hover::after': {
              width: '100%',
            },
          })}
        >
          virsrinivasfilmmaker@gmail.com
        </motion.a>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          css={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          {socialLinks.map((link, index) => (
            <motion.div
              key={link.network}
              whileHover={{ scale: 1.1, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              {link.network === 'imdb' ? (
                <IMDbButton url={link.url} />
              ) : (
                <SocialIcon
                  url={link.url}
                  network={link.network}
                  bgColor="transparent"
                  fgColor="rgba(255,255,255,0.5)"
                  style={{ 
                    width: 40, 
                    height: 40,
                    transition: 'all 0.3s ease',
                  }}
                  css={{
                    '&:hover': {
                      '& svg path': {
                        fill: 'var(--white) !important',
                      },
                    },
                  }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isInView ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          css={{
            width: '60px',
            height: '1px',
            background: 'rgba(255,255,255,0.15)',
            transformOrigin: 'center',
            margin: '16px 0',
          }}
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          css={mq({
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            fontWeight: 300,
            lineHeight: 1.8,
            color: 'rgba(255,255,255,0.35)',
            maxWidth: '400px',
          })}
        >
          Creating stories that illuminate the human condition—
          one frame at a time.
        </motion.p>
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        css={mq({
          position: 'absolute',
          bottom: ['24px', '32px', '40px'],
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 24px',
        })}
      >
        <span
          css={{
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            fontWeight: 300,
            letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.2)',
          }}
        >
          © {new Date().getFullYear()} Vir Srinivas. All rights reserved.
        </span>
      </motion.div>

      {/* Decorative corner elements */}
      <div
        css={mq({
          position: 'absolute',
          bottom: ['24px', '32px', '40px'],
          left: ['24px', '60px', '80px'],
          display: ['none', 'flex', 'flex'],
          alignItems: 'center',
          gap: '8px',
        })}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 0.2 : 0 }}
            transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
            css={{ width: '4px', height: '4px', background: 'var(--white)' }}
          />
        ))}
      </div>
      <div
        css={mq({
          position: 'absolute',
          bottom: ['24px', '32px', '40px'],
          right: ['24px', '60px', '80px'],
          display: ['none', 'flex', 'flex'],
          alignItems: 'center',
          gap: '8px',
        })}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 0.2 : 0 }}
            transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
            css={{ width: '4px', height: '4px', background: 'var(--white)' }}
          />
        ))}
      </div>
    </footer>
  );
};

// Custom IMDb button
const IMDbButton: FC<{ url: string }> = ({ url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    css={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: 'transparent',
      transition: 'all 0.3s ease',
      '&:hover': {
        background: 'rgba(246, 200, 2, 0.15)',
        '& span': {
          color: '#f6c802',
        },
      },
    }}
  >
    <span
      css={{
        fontFamily: 'var(--font-body)',
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.02em',
        color: 'rgba(255,255,255,0.5)',
        transition: 'color 0.3s ease',
      }}
    >
      IMDb
    </span>
  </a>
);

export default ContactFooter;

