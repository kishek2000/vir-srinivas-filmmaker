/** @jsxImportSource @emotion/react */
import React, { ReactElement, RefObject, useState } from 'react';
import { createRef } from 'react';
import { FC } from 'react';
import {
  AiOutlineDownCircle,
  AiOutlineLeftCircle,
  AiOutlineRightCircle,
} from 'react-icons/ai';
import { computeGridSize } from '../styles/grid';
import { mq } from '../styles/mq';
import { GapHorizontal } from './GapHorizontal';
import { GapVertical } from './GapVertical';

interface VideoSectionProps {}

export const VideoSection: FC<VideoSectionProps> = () => {
  return (
    <section
      css={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
      }}
    >
      <h1
        css={mq({
          fontWeight: 400,
          fontSize: ['36px', '52px', '56px'],
          margin: 0,
        })}
      >
        VIDEOS
      </h1>
      <GapVertical times={12} />
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
        <div
          css={mq({
            position: 'relative',
            display: 'flex',
            flexDirection: ['column', 'row', 'row'],
            width: ['80%', '70%', '70%'],
            alignItems: ['center', 'flex-start', 'flex-start'],
            overflowX: 'hidden',
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
          <VideoForWorkYT
            src={
              <iframe
                src="https://www.youtube.com/watch?v=Igo_pGU08HA"
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
            subtitle=""
          />
        </div>
        <VideosForWorkControl
          factor={1}
          scrollId={'work-videos'}
          isNext={false}
        />
        <VideosForWorkControl
          factor={1}
          scrollId={'work-videos'}
          isNext={true}
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
      <div
        css={mq({
          textAlign: 'center',
          display: ['none', 'flex', 'flex'],
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          fontSize: '20px',
          ':hover': {
            transform: 'scale(1.05)',
          },
        })}
        onClick={() =>
          window.scrollTo({ top: 4 * window.innerHeight, behavior: 'smooth' })
        }
      >
        <p css={{ margin: 0, fontWeight: 300 }}>PRESS</p>
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
  scrollId: string;
  factor: number;
}

export const VideosForWorkControl: FC<VideosForWorkControlProps> = ({
  isNext,
  scrollId,
  factor,
}) => {
  return (
    <div
      css={mq({
        display: ['none', 'flex', 'flex'],
        position: 'absolute',
        right: isNext ? ['0px', '60px', '72px'] : '',
        left: isNext ? '' : ['0px', '60px', '72px'],
        zIndex: 4,
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        fontSize: ['0px', '16px', '24px'],
        ':hover': {
          fontSize: ['0px', '22px', '24px'],
          '& > svg': {
            width: ['0px', '22px', '22px'],
            height: ['0px', '22px', '22px'],
          },
          right: isNext ? ['0px', '60px', '72px'] : '',
          left: isNext ? '' : ['0px', '60px', '72px'],
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
      <p css={{ margin: 0, fontWeight: 200, fontSize: '20px' }}>
        {isNext ? 'Next' : 'Prev'}
      </p>
      <GapVertical times={2} />
      {isNext ? (
        <AiOutlineRightCircle
          css={mq({
            width: ['0px', '20px', '20px'],
            height: ['0px', '20px', '20px'],
          })}
        />
      ) : (
        <AiOutlineLeftCircle
          css={mq({
            width: ['0px', '20px', '20px'],
            height: ['0px', '20px', '20px'],
          })}
        />
      )}
    </div>
  );
};

interface VideoForWorkProps {
  src: string;
  title: string;
  subtitle?: string;
}

export const VideoForWork: FC<VideoForWorkProps> = ({
  src,
  title,
  subtitle = '',
}) => {
  const videoRef: RefObject<HTMLVideoElement> = createRef();
  const [playing, setPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);

  return (
    <div
      css={mq({
        zIndex: 1,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      })}
    >
      <video
        src={src}
        controls={true}
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
        })}
      >
        {title}
      </h2>
      <GapVertical times={3} />
      <p css={{ margin: 0, fontWeight: 200, fontSize: '16px' }}>{subtitle}</p>
    </div>
  );
};

interface VideoForWorkYTProps {
  src: ReactElement;
  title: string;
  subtitle: string;
}

export const VideoForWorkYT: FC<VideoForWorkYTProps> = ({
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
        })}
      >
        {title}
      </h2>
      <GapVertical times={3} />
      <p css={{ margin: 0, fontWeight: 200, fontSize: '16px' }}>{subtitle}</p>
    </div>
  );
};
