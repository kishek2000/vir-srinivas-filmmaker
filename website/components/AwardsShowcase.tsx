/** @jsxImportSource @emotion/react */
import { FC, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { mq } from '../styles/mq';
import {
  ofaAwards,
  proselyteAwards,
  theProsecutionAwards,
  gunsAtCowraAwards,
} from '../constants/awards';

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

interface Award {
  awarder: string;
  award: string;
}

interface AwardCategory {
  title: string;
  subtitle?: string;
  awards: Award[];
  type: 'film' | 'screenplay';
}

const awardCategories: AwardCategory[] = [
  {
    title: 'Orders from Above',
    subtitle: 'Feature Film',
    awards: ofaAwards,
    type: 'film',
  },
  {
    title: 'The Proselyte',
    subtitle: 'Short Film',
    awards: proselyteAwards,
    type: 'film',
  },
  {
    title: 'The Prosecution',
    subtitle: 'Screenplay',
    awards: theProsecutionAwards,
    type: 'screenplay',
  },
  {
    title: 'The Guns at Cowra',
    subtitle: 'Screenplay',
    awards: gunsAtCowraAwards,
    type: 'screenplay',
  },
];

export const AwardsShowcase: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Count total wins
  const totalWins = awardCategories.reduce((acc, cat) => {
    return acc + cat.awards.filter(a => a.award.toLowerCase().includes('winner')).length;
  }, 0);

  return (
    <section
      ref={containerRef}
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
        padding: ['80px 24px', '100px 60px', '120px 80px'],
      })}
    >
      {/* Subtle static background */}
      <div
        css={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(255,255,255,0.015) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.015) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        }}
      />

      {/* Large background number - static */}
      <div
        css={mq({
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'var(--font-display)',
          fontSize: ['120px', '200px', '300px'],
          fontWeight: 400,
          color: 'var(--white)',
          opacity: 0.03,
          lineHeight: 1,
          pointerEvents: 'none',
        })}
      >
        {totalWins}+
      </div>

      {/* Header section */}
      <div
        css={mq({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: ['48px', '64px', '80px'],
          zIndex: 2,
        })}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          css={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <div css={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.3)' }} />
          <span
            css={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              fontWeight: 400,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            Recognition
          </span>
          <div css={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.3)' }} />
        </motion.div>

        <div css={{ overflow: 'hidden' }}>
          <motion.h2
            initial={{ y: 80 }}
            animate={{ y: isInView ? 0 : 80 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            css={mq({
              fontFamily: 'var(--font-display)',
              fontSize: ['40px', '56px', '72px'],
              fontWeight: 400,
              letterSpacing: '0.02em',
              color: 'var(--white)',
              margin: 0,
              textAlign: 'center',
            })}
          >
            HONOURS & AWARDS
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          css={mq({
            fontFamily: 'var(--font-serif)',
            fontSize: ['16px', '18px', '20px'],
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.4)',
            marginTop: '16px',
            textAlign: 'center',
          })}
        >
          Recognized at festivals worldwide
        </motion.p>
      </div>

      {/* Awards grid */}
      <div
        css={mq({
          display: 'grid',
          gridTemplateColumns: ['1fr', '1fr 1fr', '1fr 1fr'],
          gap: ['40px', '48px', '64px'],
          maxWidth: '1200px',
          width: '100%',
          zIndex: 2,
        })}
      >
        {awardCategories.map((category, index) => (
          <AwardCard 
            key={category.title} 
            category={category} 
            index={index}
            isInView={isInView}
          />
        ))}
      </div>
    </section>
  );
};

const AwardCard: FC<{ 
  category: AwardCategory; 
  index: number;
  isInView: boolean;
}> = ({ category, index, isInView }) => {
  const wins = category.awards.filter(a => 
    a.award.toLowerCase().includes('winner') || 
    a.award.toLowerCase().includes('1st') ||
    a.award.toLowerCase().includes('2nd')
  );
  const nominations = category.awards.filter(a => 
    a.award.toLowerCase().includes('nominee') ||
    a.award.toLowerCase().includes('finalist') ||
    a.award.toLowerCase().includes('selection')
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      css={mq({
        display: 'flex',
        flexDirection: 'column',
        padding: ['24px', '32px', '40px'],
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.4s ease',
        '&:hover': {
          background: 'rgba(255,255,255,0.04)',
          borderColor: 'rgba(255,255,255,0.1)',
        },
      })}
    >
      {/* Type indicator */}
      <div
        css={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          fontFamily: 'var(--font-body)',
          fontSize: '10px',
          fontWeight: 400,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.25)',
        }}
      >
        {category.type}
      </div>

      {/* Title */}
      <h3
        css={mq({
          fontFamily: 'var(--font-display)',
          fontSize: ['24px', '28px', '32px'],
          fontWeight: 400,
          letterSpacing: '0.02em',
          color: 'var(--white)',
          margin: 0,
          marginBottom: '4px',
        })}
      >
        {category.title}
      </h3>

      {category.subtitle && (
        <span
          css={{
            fontFamily: 'var(--font-serif)',
            fontSize: '14px',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.4)',
            marginBottom: '24px',
          }}
        >
          {category.subtitle}
        </span>
      )}

      {/* Stats */}
      <div
        css={{
          display: 'flex',
          gap: '24px',
          marginBottom: '24px',
          paddingBottom: '24px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {wins.length > 0 && (
          <div css={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span
              css={{
                fontFamily: 'var(--font-display)',
                fontSize: '32px',
                color: 'var(--white)',
              }}
            >
              {wins.length}
            </span>
            <span
              css={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 400,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
              }}
            >
              {wins.length === 1 ? 'Win' : 'Wins'}
            </span>
          </div>
        )}
        {nominations.length > 0 && (
          <div css={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span
              css={{
                fontFamily: 'var(--font-display)',
                fontSize: '32px',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              {nominations.length}
            </span>
            <span
              css={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 400,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)',
              }}
            >
              {nominations.length === 1 ? 'Nom' : 'Noms'}
            </span>
          </div>
        )}
      </div>

      {/* Awards list */}
      <div
        css={mq({
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          maxHeight: ['none', '200px', '240px'],
          overflowY: 'auto',
          paddingRight: '8px',
          '&::-webkit-scrollbar': {
            width: '3px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(255,255,255,0.02)',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '2px',
          },
        })}
      >
        {category.awards.slice(0, 6).map((award, i) => (
          <div key={i} css={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span
              css={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              {award.awarder}
            </span>
            <span
              css={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 300,
                color: award.award.toLowerCase().includes('winner') 
                  ? 'rgba(255,215,0,0.7)' 
                  : 'rgba(255,255,255,0.4)',
                letterSpacing: '0.05em',
              }}
            >
              {award.award}
            </span>
          </div>
        ))}
        {category.awards.length > 6 && (
          <span
            css={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginTop: '8px',
            }}
          >
            +{category.awards.length - 6} more
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default AwardsShowcase;

