/** @jsxImportSource @emotion/react */

import { FC, useEffect, useState } from 'react';
import { computeGridSize } from '../styles/grid';
import { mq } from '../styles/mq';
import { GapVertical } from './GapVertical';
import { SocialIcon } from 'react-social-icons';
import { GapHorizontal } from './GapHorizontal';
import { articles } from '../constants/media';
import { VideosForWorkControl } from './VideoSection';
import { motion } from 'framer-motion';

export const MediaSection: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('press-section');
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

  return (
    <section
      id="press-section"
      css={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        position: 'relative',
        padding: '60px 0',
        boxSizing: 'border-box',
      }}
    >
      {/* Subtle background pattern for depth */}
      {/* <div
        css={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.02' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          zIndex: -1,
        }}
      />

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        css={mq({
          fontWeight: 400,
          fontSize: ['36px', '52px', '56px'],
          margin: 0,
          letterSpacing: '0.05em',
        })}
      >
        PRESS
      </motion.h1>

      <GapVertical times={16} />

      <div
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          css={mq({
            width: ['95%', '70%', '70%'],
            alignItems: 'center',
            zIndex: 1,
            display: 'flex',
            gap: '24px',
            flexDirection: ['column', 'row', 'row'],
            overflowX: 'hidden',
          })}
          id="media-articles"
        >
          {articles.map((article, index) => (
            <MediaArticleCard {...article} key={index} index={index} />
          ))}
        </motion.div>
        <VideosForWorkControl
          factor={0.5}
          scrollId="media-articles"
          isNext={false}
          isVisible
        />
        <VideosForWorkControl
          factor={0.5}
          scrollId="media-articles"
          isNext={true}
          isVisible
        />
      </div>

      <div css={mq({ display: ['none', 'none', 'flex'] })}>
        <GapVertical times={30} />
      </div>
      <div css={mq({ display: ['none', 'flex', 'none'] })}>
        <GapVertical times={16} />
      </div>
      <div css={mq({ display: ['flex', 'none', 'none'] })}>
        <GapVertical times={20} />
      </div> */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        css={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '20px',
          marginTop: '20px',
        }}
      >
        <div css={{ height: '2px', width: '48px', background: 'black' }} />
        <GapVertical times={8} />
        <p
          css={{
            margin: 0,
            fontWeight: 300,
            fontFamily: 'Rubik',
            fontSize: '16px',
            letterSpacing: '0.02em',
          }}
        >
          Contact Vir at{' '}
          <a
            href="mailto:virsrinivasfilmmaker@gmail.com"
            css={{
              fontWeight: 500,
              color: 'black',
              textDecoration: 'none',
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                width: '100%',
                height: '1px',
                bottom: '-2px',
                left: 0,
                backgroundColor: 'black',
                transform: 'scaleX(0)',
                transformOrigin: 'bottom right',
                transition: 'transform 0.3s ease-out',
              },
              '&:hover:after': {
                transform: 'scaleX(1)',
                transformOrigin: 'bottom left',
              },
            }}
          >
            virsrinivasfilmmaker@gmail.com
          </a>
        </p>
        <GapVertical times={12} />
        <div
          css={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
        >
          <SocialMediaButton
            type="imdb"
            url="http://www.imdb.com/name/nm12504238"
          />
          <GapHorizontal times={2} />
          <SocialMediaButton
            url="https://www.linkedin.com/in/vir-srinivas/"
            network="linkedin"
          />
          <GapHorizontal times={2} />
          <SocialMediaButton
            url="https://instagram.com/virsrinivas"
            network="instagram"
          />
        </div>
      </motion.div>
    </section>
  );
};

interface MediaArticleCardProps {
  providerTitle: string;
  providerHeadline: string;
  articleDesc: string;
  articleLink: string;
  index: number;
}

const MediaArticleCard: FC<MediaArticleCardProps> = ({
  providerTitle,
  providerHeadline,
  articleDesc,
  articleLink,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      whileHover={{ y: -5, boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.08)' }}
      css={mq({
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        minWidth: ['unset', computeGridSize(90), computeGridSize(100)],
        maxWidth: computeGridSize(100),
        minHeight: [
          computeGridSize(92),
          computeGridSize(100),
          computeGridSize(110),
        ],
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid black',
        borderRadius: '4px',
        transition: 'all 0.3s ease',
      })}
    >
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '90%',
          height: '85%',
        }}
      >
        <h1
          css={mq({
            fontWeight: 500,
            margin: 0,
            fontSize: ['24px', '28px', '32px'],
            letterSpacing: '0.03em',
          })}
        >
          {providerTitle}
        </h1>
        <GapVertical times={3} />
        <div
          css={{
            height: '1px',
            width: '40px',
            background: 'rgba(0,0,0,0.2)',
            margin: '10px 0',
          }}
        />
        <p
          css={mq({
            margin: 0,
            fontWeight: 300,
            textAlign: 'center',
            width: '80%',
            fontSize: ['16px', '16px', '18px'],
            letterSpacing: '0.02em',
          })}
        >
          {providerHeadline}
        </p>
        <GapVertical times={8} />
        <p
          css={mq({
            margin: 0,
            fontWeight: 200,
            textAlign: 'center',
            width: '80%',
            fontFamily: 'Rubik',
            fontSize: ['14px', '14px', '16px'],
            lineHeight: '160%',
            color: 'rgba(0,0,0,0.8)',
          })}
        >
          {articleDesc}
        </p>
        <GapVertical times={7} />
        <button
          css={{
            borderRadius: '2px',
            outline: 'none',
            padding: '12px 20px',
            textTransform: 'uppercase',
            cursor: 'pointer',
            fontSize: '11px',
            color: 'black',
            background: 'white',
            letterSpacing: '0.12rem',
            fontFamily: 'Rubik',
            border: '1px solid black',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden',
            zIndex: 1,
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'black',
              zIndex: -2,
              transform: 'scaleY(0)',
              transformOrigin: 'bottom center',
              transition: 'transform 0.3s ease-out',
            },
            '&:hover': {
              color: 'white',
              '&:after': {
                transform: 'scaleY(1)',
              },
            },
          }}
          onClick={() => window.open(articleLink)}
        >
          Read Full
        </button>
      </div>
    </motion.div>
  );
};

interface SocialMediaButtonProps {
  url: string;
  network?: string;
  type?: 'imdb';
}

const SocialMediaButton: FC<SocialMediaButtonProps> = ({
  url,
  network,
  type,
}) => {
  if (type === 'imdb') {
    return (
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
        css={mq({
          width: computeGridSize(9),
          height: computeGridSize(9),
          backgroundImage: 'url(/imdb.png)',
          borderRadius: '50%',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '50% 50%',
          backgroundColor: '#f6c802',
          cursor: 'pointer',
          transition: '0.3s',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        })}
        onClick={() => window.open(url)}
      />
    );
  }

  return (
    <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
      <SocialIcon
        url={url}
        network={network}
        css={mq({
          maxWidth: computeGridSize(9),
          maxHeight: computeGridSize(9),
          transition: '0.3s',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        })}
      />
    </motion.div>
  );
};
