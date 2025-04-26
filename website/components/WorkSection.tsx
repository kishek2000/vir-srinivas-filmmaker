/* eslint-disable @next/next/no-img-element */
/** @jsxImportSource @emotion/react */
import { FC, useEffect, useState } from 'react';
import { AiOutlineDownCircle } from 'react-icons/ai';
import { computeGridSize } from '../styles/grid';
import { mq } from '../styles/mq';
import { GapHorizontal } from './GapHorizontal';
import { GapVertical } from './GapVertical';
import { motion } from 'framer-motion';

interface WorkSectionProps {
  onOpen: VoidFunction;
}

const prosPoster: { poster: string; links: PosterLink[] } = {
  poster: 'proselyte-poster.png',
  links: [
    {
      link: 'http://www.imdb.com/title/tt14755002',
      name: 'View on IMDB',
    },
    {
      link: 'https://www.youtube.com/watch?v=GG48DnCQrEk',
      name: 'Watch on YouTube',
    },
  ],
};

const gdPoster: { poster: string; links: PosterLink[] } = {
  poster: 'gd-poster.png',
  links: [
    {
      link: 'https://www.imdb.com/title/tt31491453/',
      name: 'View on IMDB',
    },
    {
      link: 'https://www.youtube.com/watch?v=Igo_pGU08HA',
      name: 'Watch on YouTube',
    },
  ],
};

export const WorkSection: FC<WorkSectionProps> = ({ onOpen }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('work-section');
      if (section) {
        const rect = section.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.75;
        if (isInView) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Check once on mount
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ofaPoster: { poster: string; links: PosterLink[] } = {
    poster: 'ofa-poster-2.jpeg',
    links: [
      {
        link: 'http://www.imdb.com/title/tt14858134',
        name: 'View on IMDB',
      },
      {
        link: onOpen,
        name: 'View Release Info',
      },
    ],
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section
      id="work-section"
      css={{
        minHeight: '100vh',
        paddingBottom: ['0px', '0px', '12px', '60px'],
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        position: 'relative',
      }}
    >
      <div
        css={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'linear-gradient(180deg, rgba(245,245,245,0.3) 0%, rgba(255,255,255,1) 100%)',
          zIndex: -1,
        }}
      />

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        css={mq({
          fontWeight: 400,
          fontSize: ['36px', '52px', '56px'],
          margin: 0,
          letterSpacing: '0.05em',
        })}
      >
        WORK
      </motion.h1>
      <GapVertical times={12} />

      <motion.div
        variants={container}
        initial="hidden"
        animate={isVisible ? 'show' : 'hidden'}
        css={mq({
          position: 'relative',
          width: '100%',
          display: 'flex',
          flexDirection: ['column', 'row', 'row'],
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
        })}
      >
        <div
          css={mq({
            position: 'relative',
            display: 'flex',
            flexDirection: ['column', 'row', 'row'],
            width: ['87.5%', '85%', '90%'],
            alignItems: 'center',
            justifyContent: 'center',
            overflowX: ['auto', 'hidden', 'hidden'],
            overflowY: 'hidden',
            zIndex: 1,
            paddingBottom: [
              computeGridSize(8),
              computeGridSize(0),
              computeGridSize(0),
            ],
            gap: '48px',
          })}
        >
          <Poster posterProps={ofaPoster} index={0} />
          <Poster posterProps={gdPoster} index={1} />
          <Poster posterProps={prosPoster} index={2} />
        </div>
      </motion.div>
      <div css={mq({ display: ['none', 'none', 'flex'] })}>
        <GapVertical times={30} />
      </div>
      <div css={mq({ display: ['none', 'flex', 'none'] })}>
        <GapVertical times={16} />
      </div>
      <div css={mq({ display: ['flex', 'none', 'none'] })}>
        <GapVertical times={20} />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        css={mq({
          textAlign: 'center',
          fontSize: '20px',
          display: ['none', 'flex', 'flex'],
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          position: 'relative',
          transition: 'all 0.3s ease',
          ':hover': {
            transform: 'translateY(5px)',
          },
        })}
        onClick={() =>
          window.scrollTo({ top: 2 * window.innerHeight, behavior: 'smooth' })
        }
      >
        <p
          css={{
            margin: 0,
            fontWeight: 300,
            fontSize: '16px',
            letterSpacing: '0.05em',
          }}
        >
          AWARDS
        </p>
        <GapVertical times={2} />
        <div
          css={{
            animation: 'bounce 2s infinite',
            '@keyframes bounce': {
              '0%, 20%, 50%, 80%, 100%': {
                transform: 'translateY(0)',
              },
              '40%': {
                transform: 'translateY(-10px)',
              },
              '60%': {
                transform: 'translateY(-5px)',
              },
            },
          }}
        >
          <AiOutlineDownCircle
            css={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              marginBottom: '-4px',
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};

interface PosterLink {
  link: string | VoidFunction;
  name: string;
}

const Poster: React.FC<{
  posterProps: { poster: string; links: PosterLink[] };
  index: number;
}> = ({ posterProps, index }) => {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.1 * index,
      },
    },
  };

  return (
    <motion.div
      variants={item}
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      <motion.div
        whileHover={{
          y: -10,
          boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
        }}
        transition={{ duration: 0.3 }}
        css={{
          overflow: 'hidden',
          borderRadius: '4px',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
        }}
      >
        <img
          alt={`${posterProps.poster} poster`}
          src={posterProps.poster}
          css={mq({
            maxHeight: ['45vh', '60vh', '60vh'],
            objectFit: 'contain',
            width: '100%',
            transition: 'transform 0.5s ease',
            ':hover': {
              transform: 'scale(1.02)',
            },
          })}
        />
      </motion.div>

      <div
        css={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        {posterProps.links.map((link, i) => {
          const isString = typeof link.link === 'string';
          return (
            <motion.button
              key={i}
              whileHover={{
                scale: 1.05,
                backgroundColor: isString
                  ? (link.link as string).includes('imdb')
                    ? '#f6c802'
                    : (link.link as string).includes('youtube')
                    ? 'red'
                    : 'black'
                  : 'black',
                color: isString
                  ? (link.link as string).includes('imdb')
                    ? 'black'
                    : 'white'
                  : 'white',
              }}
              transition={{ duration: 0.2 }}
              css={{
                borderRadius: '2px',
                outline: 'none',
                padding: '12px 20px',
                textTransform: 'uppercase',
                border: `1.5px solid ${posterLinkBG(link.link, isString)}`,
                background: 'none',
                cursor: 'pointer',
                fontSize: '11px',
                color: 'black',
                fontFamily: 'Rubik',
                letterSpacing: '0.1rem',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 5px rgba(0,0,0,0.06)',
              }}
              onClick={
                isString
                  ? () => window.open(link.link as string)
                  : (link.link as VoidFunction)
              }
            >
              {link.name}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

const posterLinkBG = (link: string | VoidFunction, isString: boolean) => {
  if (isString) {
    if ((link as String).includes('imdb')) {
      return '#f6c802';
    } else if ((link as String).includes('youtube')) {
      return 'red';
    }
  } else {
    return 'black';
  }
};

const posterLinkColor = (link: string | VoidFunction, isString: boolean) => {
  if (isString) {
    if ((link as string).includes('imdb')) {
      return 'black';
    } else if ((link as string).includes('youtube')) {
      return 'white';
    }
  } else {
    return 'white';
  }
};
