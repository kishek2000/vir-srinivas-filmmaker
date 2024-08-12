/* eslint-disable @next/next/no-img-element */
/** @jsxImportSource @emotion/react */
import { FC } from 'react';
import { AiOutlineDownCircle } from 'react-icons/ai';
import { computeGridSize } from '../styles/grid';
import { mq } from '../styles/mq';
import { GapHorizontal } from './GapHorizontal';
import { GapVertical } from './GapVertical';

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
  ],
};

export const WorkSection: FC<WorkSectionProps> = ({ onOpen }) => {
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

  return (
    <section
      css={{
        minHeight: '100vh',
        paddingBottom: ['0px', '0px', '12px', '60px'],
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
        WORK
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
          <Poster posterProps={ofaPoster} />
          <Poster posterProps={gdPoster} />
          <Poster posterProps={prosPoster} />
        </div>
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
          fontSize: '20px',
          display: ['none', 'flex', 'flex'],
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          ':hover': {
            transform: 'scale(1.05)',
          },
        })}
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

interface PosterLink {
  link: string | VoidFunction;
  name: string;
}

const Poster: React.FC<{
  posterProps: { poster: string; links: PosterLink[] };
}> = ({ posterProps }) => {
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <img
        alt=""
        src={posterProps.poster}
        css={mq({
          maxHeight: ['45vh', '60vh', '60vh'],
          objectFit: 'contain',
          width: '100%',
        })}
      />
      <div
        css={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        {posterProps.links.map((link, index) => {
          const isString = typeof link.link === 'string';
          return (
            <button
              key={index}
              css={{
                borderRadius: '2px',
                outline: 'none',
                padding: '12px 20px',
                textTransform: 'uppercase',
                border: `1.5px solid ${posterLinkBG(link.link, isString)}`,
                background: 'none',
                cursor: 'pointer',
                fontSize: '10px',
                color: 'black',
                // color: posterLinkColor(link.link, isString),
                fontFamily: 'Rubik',
                letterSpacing: '0.075rem',
              }}
              onClick={
                isString
                  ? () => window.open(link.link as string)
                  : (link.link as VoidFunction)
              }
            >
              {link.name}
            </button>
          );
        })}
      </div>
    </div>
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
