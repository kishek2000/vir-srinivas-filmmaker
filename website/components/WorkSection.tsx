/** @jsxImportSource @emotion/react */
import { motion } from 'framer-motion';
import { ClassAttributes, LegacyRef, RefObject, useRef, useState } from 'react';
import { createRef } from 'react';
import { useCallback } from 'react';
import { FC } from 'react';
import {
  AiFillLeftCircle,
  AiFillPauseCircle,
  AiFillPlayCircle,
  AiFillRightCircle,
  AiOutlineDownCircle,
  AiOutlineLeftCircle,
  AiOutlineRightCircle,
} from 'react-icons/ai';
import { computeGridSize } from '../styles/grid';
import { mq } from '../styles/mq';
import { GapHorizontal } from './GapHorizontal';
import { GapVertical } from './GapVertical';

interface WorkSectionProps {}

export const WorkSection: FC<WorkSectionProps> = () => {
  return (
    <section
      css={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        background:
          'radial-gradient(circle, rgba(37,37,37,1) 0%, rgba(18,18,18,1) 50%, rgba(0,0,0,1) 100%)',
        zIndex: 1,
      }}
    >
      <h1 css={{ fontWeight: 400, fontSize: '56px', margin: 0 }}>WORK</h1>
      <GapVertical times={4} />
      <p css={{ margin: 0, fontFamily: 'Rubik', fontWeight: 200 }}>
        Vir&apos;s work over the last few years.
      </p>
      <GapVertical times={12} />
      <div
        css={{
          position: 'relative',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
        }}
      >
        <div
          css={mq({
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            width: ['87.5%', '85%', '90%'],
            alignItems: 'center',
            overflowX: ['auto', 'hidden', 'hidden'],
            overflowY: 'hidden',
            zIndex: 1,
            paddingBottom: [
              computeGridSize(8),
              computeGridSize(0),
              computeGridSize(0),
            ],
          })}
          id="work-videos"
        >
          <VideoForWork
            src="/orders-from-above-trailer-compressed.mp4"
            title="Orders from Above (Trailer)"
            subtitle="Trailer for the award-winning film Orders from Above."
          />
          <GapHorizontal times={12} />
          <VideoForWork
            src="/showreel-compressed.mp4"
            title="Showreel 2021"
            subtitle="A showcase of Vir's work in 2021."
          />
        </div>
        <VideosForWorkControl isNext={false} />
        <VideosForWorkControl isNext={true} />
      </div>
      <GapVertical times={12} />
      <div
        css={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          cursor: 'pointer',
          fontSize: '20px',
          ':hover': {
            fontSize: '24px',
            '& > svg': {
              width: '32px',
              height: '32px',
            },
            marginTop: '-8px',
          },
        }}
        onClick={() =>
          window.scrollTo({ top: 2 * window.innerHeight, behavior: 'smooth' })
        }
      >
        <p css={{ margin: 0, fontWeight: 300 }}>AWARDS</p>
        <GapVertical times={2} />
        <AiOutlineDownCircle
          css={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            marginBottom: '-4px',
          }}
        />
      </div>
    </section>
  );
};

interface VideosForWorkControlProps {
  isNext: boolean;
}

export const VideosForWorkControl: FC<VideosForWorkControlProps> = ({
  isNext,
}) => {
  return (
    <div
      css={mq({
        display: ['none', 'flex', 'flex'],
        position: 'absolute',
        right: isNext ? ['0px', '28px', '48px'] : '',
        left: isNext ? '' : ['0px', '28px', '48px'],
        zIndex: 4,
        flexDirection: 'column',
        alignItems: 'center',
        color: 'white',
        cursor: 'pointer',
        fontSize: ['0px', '16px', '24px'],
        ':hover': {
          fontSize: ['0px', '18px', '28px'],
          '& > svg': {
            width: ['0px', '24px', '32px'],
            height: ['0px', '24px', '32px'],
          },
          right: isNext ? ['0px', '26px', '46px'] : '',
          left: isNext ? '' : ['0px', '26px', '46px'],
        },
      })}
      onClick={() =>
        document.getElementById('work-videos').scrollTo({
          left: isNext ? window.innerWidth : -window.innerWidth,
          behavior: 'smooth',
        })
      }
    >
      <p css={{ margin: 0, fontWeight: 200 }}>{isNext ? 'Next' : 'Prev'}</p>
      <GapVertical times={2} />
      {isNext ? (
        <AiOutlineRightCircle
          css={mq({
            width: ['0px', '20px', '24px'],
            height: ['0px', '20px', '24px'],
          })}
        />
      ) : (
        <AiOutlineLeftCircle
          css={mq({
            width: ['0px', '20px', '24px'],
            height: ['0px', '20px', '24px'],
          })}
        />
      )}
    </div>
  );
};

interface VideoForWorkProps {
  src: string;
  title: string;
  subtitle: string;
}

export const VideoForWork: FC<VideoForWorkProps> = ({
  src,
  title,
  subtitle,
}) => {
  const videoRef: RefObject<HTMLVideoElement> = createRef();
  const [playing, setPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);

  return (
    <div
      css={mq({
        position: 'relative',
        minHeight: ['40vh', '40vh', '50vh'],
        width: '100%',
        zIndex: 1,
      })}
    >
      <video
        src={src}
        controls={showControls}
        ref={videoRef}
        css={mq({
          outline: 'none',
          border: 'none',
          maxWidth: [computeGridSize(100), '75vw', '60vw'],
          minHeight: ['40vh', '40vh', '50vh'],
          background: 'black',
          zIndex: 1,
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
      {!playing ? (
        <motion.div
          css={mq({
            position: 'absolute',
            top: '50%',
            left: '50%',
            color: 'white',
            width: [
              computeGridSize(8),
              computeGridSize(10),
              computeGridSize(12),
            ],
            height: [
              computeGridSize(8),
              computeGridSize(10),
              computeGridSize(12),
            ],
            ':hover': {
              width: [
                computeGridSize(9),
                computeGridSize(11),
                computeGridSize(13),
              ],
              height: [
                computeGridSize(9),
                computeGridSize(11),
                computeGridSize(13),
              ],
            },
            transform: 'translate(-50%, -50%)',
            transition: '0.3s',
            zIndex: 4,
          })}
          animate={playing ? 'closed' : 'open'}
          variants={{ closed: { opacity: 0 }, open: { opacity: 1 } }}
          onClick={() => videoRef.current.play()}
        >
          <AiFillPlayCircle
            css={{
              width: '100%',
              height: '100%',
              cursor: 'pointer',
            }}
          />
        </motion.div>
      ) : (
        <motion.div
          css={mq({
            position: 'absolute',
            top: '50%',
            left: '50%',
            color: 'white',
            width: [
              computeGridSize(8),
              computeGridSize(10),
              computeGridSize(12),
            ],
            height: [
              computeGridSize(8),
              computeGridSize(10),
              computeGridSize(12),
            ],
            ':hover': {
              width: [
                computeGridSize(9),
                computeGridSize(11),
                computeGridSize(13),
              ],
              height: [
                computeGridSize(9),
                computeGridSize(11),
                computeGridSize(13),
              ],
            },
            transform: 'translate(-50%, -50%)',
            transition: '0.3s',
            zIndex: 4,
          })}
          onClick={() => videoRef.current.pause()}
          animate={playing ? 'open' : 'closed'}
          variants={{ closed: { opacity: 0 }, open: { opacity: 1 } }}
        >
          <AiFillPauseCircle
            css={{
              width: '100%',
              height: '100%',
              cursor: 'pointer',
            }}
          />
        </motion.div>
      )}
      <motion.div
        css={mq({
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          bottom: ['20px', '80px', '120px'],
          left: ['10px', '60px', '100px'],
          color: 'white',
          zIndex: 2,
        })}
        animate={playing ? 'closed' : 'open'}
        variants={{ closed: { opacity: 0 }, open: { opacity: 1 } }}
      >
        <h2
          css={mq({
            margin: 0,
            fontSize: ['24px', '36px', '48px'],
            fontWeight: 400,
          })}
        >
          {title}
        </h2>
        <GapVertical times={3} />
        <p css={{ margin: 0, fontWeight: 200 }}>{subtitle}</p>
      </motion.div>
    </div>
  );
};
