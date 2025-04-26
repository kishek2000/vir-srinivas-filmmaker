/** @jsxImportSource @emotion/react */
import React, { ReactElement, RefObject, useState, useEffect } from 'react';
import { createRef } from 'react';
import { FC } from 'react';
import {
  AiOutlineDownCircle,
  AiOutlineLeftCircle,
  AiOutlineRightCircle,
  AiOutlinePlayCircle,
} from 'react-icons/ai';
import { computeGridSize } from '../styles/grid';
import { mq } from '../styles/mq';
import { GapHorizontal } from './GapHorizontal';
import { GapVertical } from './GapVertical';
import { motion } from 'framer-motion';

interface VideoSectionProps {}

export const VideoSection: FC<VideoSectionProps> = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('videos-section');
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
      id="videos-section"
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
      }}
    >
      {/* Subtle background gradient */}
      <div
        css={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, #f8f8f8, #ffffff)',
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
        VIDEOS
      </motion.h1>
      <GapVertical times={4} />
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: isVisible ? 1 : 0, scaleX: isVisible ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        css={{
          height: '2px',
          width: '40px',
          background: 'rgba(0,0,0,0.3)',
          marginBottom: '24px',
        }}
      />
      <GapVertical times={8} />

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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          css={mq({
            position: 'relative',
            display: 'flex',
            flexDirection: ['column', 'row', 'row'],
            width: ['85%', '75%', '75%'],
            alignItems: ['center', 'flex-start', 'flex-start'],
            overflowX: 'hidden',
            overflowY: 'hidden',
            zIndex: 1,
            paddingBottom: [
              computeGridSize(8),
              computeGridSize(0),
              computeGridSize(0),
            ],
            gap: ['40px', '30px', '30px'],
          })}
          id="work-videos"
        >
          <VideoForWorkYT
            src={
              <iframe
                src="https://www.youtube.com/embed/Igo_pGU08HA"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  left: '0px',
                  top: '0px',
                }}
              />
            }
            title="Gradient Descent | 20 min Short Film"
            subtitle="A homeless man is recruited by an artificial intelligence company and forced to do horrifying work."
            index={0}
            isVisible={isVisible}
          />
          <div css={mq({ display: ['none', 'flex', 'flex'] })}>
            <GapHorizontal times={12} />
          </div>
          <div css={mq({ display: ['flex', 'none', 'none'] })}>
            <GapVertical times={12} />
          </div>
          <VideoForWorkYT
            src={
              <iframe
                src="https://www.youtube.com/embed/GG48DnCQrEk"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  left: '0px',
                  top: '0px',
                }}
              />
            }
            title="The Proselyte | 20 min Short Film"
            subtitle="A Catholic priest with a dark past wrestles with his faith after he hears a confession from an active serial killer."
            index={1}
            isVisible={isVisible}
          />
          <div css={mq({ display: ['none', 'flex', 'flex'] })}>
            <GapHorizontal times={12} />
          </div>
          <div css={mq({ display: ['flex', 'none', 'none'] })}>
            <GapVertical times={12} />
          </div>
          <VideoForWorkYT
            src={
              <iframe
                src="https://www.youtube.com/embed/osiqn2u6BMk"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  left: '0px',
                  top: '0px',
                }}
              />
            }
            title="Orders from Above | Official Trailer"
            subtitle="The official trailer for Vir's award-winning feature film."
            index={2}
            isVisible={isVisible}
          />
        </motion.div>
        <VideosForWorkControl
          factor={1}
          scrollId={'work-videos'}
          isNext={false}
          isVisible={isVisible}
        />
        <VideosForWorkControl
          factor={1}
          scrollId={'work-videos'}
          isNext={true}
          isVisible={isVisible}
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
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        css={mq({
          textAlign: 'center',
          display: ['none', 'flex', 'flex'],
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          fontSize: '20px',
          transition: 'all 0.3s ease',
          ':hover': {
            transform: 'translateY(5px)',
          },
        })}
        onClick={() =>
          window.scrollTo({ top: 4 * window.innerHeight, behavior: 'smooth' })
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
          PRESS
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

interface VideosForWorkControlProps {
  isNext: boolean;
  scrollId: string;
  factor: number;
  isVisible: boolean;
}

export const VideosForWorkControl: FC<VideosForWorkControlProps> = ({
  isNext,
  scrollId,
  factor,
  isVisible,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
      css={mq({
        display: ['none', 'flex', 'flex'],
        position: 'absolute',
        right: isNext ? ['0px', '40px', '60px'] : '',
        left: isNext ? '' : ['0px', '40px', '60px'],
        zIndex: 4,
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        fontSize: ['0px', '16px', '24px'],
        transition: 'all 0.3s ease',
        ':hover': {
          transform: isNext ? 'translateX(5px)' : 'translateX(-5px)',
        },
      })}
      onClick={() =>
        document.getElementById(scrollId).scrollBy({
          left: isNext
            ? factor * window.innerWidth
            : factor * -window.innerWidth,
          behavior: 'smooth',
        })
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
        {isNext ? 'Next' : 'Prev'}
      </p>
      <GapVertical times={2} />
      {isNext ? (
        <AiOutlineRightCircle
          css={mq({
            width: ['0px', '24px', '24px'],
            height: ['0px', '24px', '24px'],
          })}
        />
      ) : (
        <AiOutlineLeftCircle
          css={mq({
            width: ['0px', '24px', '24px'],
            height: ['0px', '24px', '24px'],
          })}
        />
      )}
    </motion.div>
  );
};

interface VideoForWorkProps {
  src: string;
  title: string;
  subtitle?: string;
  index: number;
  isVisible: boolean;
}

export const VideoForWork: FC<VideoForWorkProps> = ({
  src,
  title,
  subtitle = '',
  index,
  isVisible,
}) => {
  const videoRef: RefObject<HTMLVideoElement> = createRef();
  const [playing, setPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{
        duration: 0.6,
        delay: 0.3 + 0.2 * index,
        ease: [0.22, 1, 0.36, 1],
      }}
      css={mq({
        zIndex: 1,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      })}
    >
      <video
        src={src}
        controls={showControls}
        ref={videoRef}
        css={mq({
          outline: 'none',
          border: 'none',
          minHeight: ['40vh', '40vh', '40vh'],
          maxHeight: ['40vh', '40vh', '40vh'],
          minWidth: ['100%', '40vw', '40vw'],
          maxWidth: ['100%', '40vw', '40vw'],
          zIndex: 1,
          background: 'black',
          borderRadius: '5px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
        })}
        preload="metadata"
        onPause={() => {
          setPlaying(false);
          setShowControls(false);
        }}
        onPlay={() => {
          setPlaying(true);
          setShowControls(true);
        }}
        title={title}
      />
      <GapVertical times={5} />
      <h2
        css={mq({
          margin: 0,
          fontSize: ['24px', '28px', '32px'],
          fontWeight: 300,
          letterSpacing: '0.03em',
        })}
      >
        {title}
      </h2>
      <GapVertical times={3} />
      <p
        css={{
          margin: 0,
          fontWeight: 300,
          fontSize: '16px',
          fontFamily: 'Rubik',
          color: 'rgba(0, 0, 0, 0.8)',
          letterSpacing: '0.01em',
        }}
      >
        {subtitle}
      </p>
    </motion.div>
  );
};

interface VideoForWorkYTProps {
  src: ReactElement;
  title: string;
  subtitle: string;
  index: number;
  isVisible: boolean;
}

export const VideoForWorkYT: FC<VideoForWorkYTProps> = ({
  src,
  title,
  subtitle,
  index,
  isVisible,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{
        duration: 0.6,
        delay: 0.3 + 0.2 * index,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -10 }}
      css={mq({
        zIndex: 1,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      })}
    >
      <div
        css={mq({
          outline: 'none',
          border: 'none',
          zIndex: 1,
          minHeight: '40vh',
          maxHeight: '40vh',
          minWidth: ['100%', '40vw', '40vw'],
          maxWidth: ['100%', '40vw', '40vw'],
          position: 'relative',
          borderRadius: '5px',
          overflow: 'hidden',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          ':hover': {
            boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)',
          },
        })}
      >
        {src}
      </div>
      <GapVertical times={5} />
      <h2
        css={mq({
          margin: 0,
          fontSize: ['24px', '28px', '32px'],
          fontWeight: 300,
          letterSpacing: '0.03em',
        })}
      >
        {title}
      </h2>
      <GapVertical times={3} />
      <p
        css={{
          margin: 0,
          fontWeight: 300,
          fontSize: '16px',
          fontFamily: 'Rubik',
          color: 'rgba(0, 0, 0, 0.8)',
          letterSpacing: '0.01em',
          lineHeight: '1.5',
        }}
      >
        {subtitle}
      </p>
    </motion.div>
  );
};
