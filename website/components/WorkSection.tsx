/* eslint-disable @next/next/no-img-element */
/** @jsxImportSource @emotion/react */
import { FC } from 'react';
import { AiOutlineDownCircle } from 'react-icons/ai';
import { computeGridSize } from '../styles/grid';
import { mq } from '../styles/mq';
import { GapHorizontal } from './GapHorizontal';
import { GapVertical } from './GapVertical';

interface WorkSectionProps {}

export const WorkSection: FC<WorkSectionProps> = () => {
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
          fontSize: ['44px', '52px', '56px'],
          margin: 0,
        })}
      >
        WORK
      </h1>
      <GapVertical times={4} />
      <p
        css={mq({
          margin: 0,
          fontFamily: 'Rubik',
          fontWeight: 200,
          fontSize: ['16px', '18px', '20px'],
        })}
      >
        Vir&apos;s work over the last few years.
      </p>
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
          })}
        >
          <div
            css={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img
              alt=""
              src="ofa-poster.jpeg"
              css={mq({ height: ['45vh', '60vh', '60vh'] })}
            />
            <GapVertical times={3} />
            <button
              css={{
                border: 'none',
                fontWeight: 400,
                borderRadius: '4px',
                outline: 'none',
                padding: '12px 20px',
                textTransform: 'uppercase',
                // fontWeight: 200,
                background: '#f6c802',
                cursor: 'pointer',
                fontSize: '16px',
              }}
              onClick={() =>
                window.open('http://www.imdb.com/title/tt14858134')
              }
            >
              View on IMDB
            </button>
          </div>
          <div css={mq({ display: ['none', 'flex', 'flex'] })}>
            <GapHorizontal times={12} />
          </div>
          <div css={mq({ display: ['flex', 'none', 'none'] })}>
            <GapVertical times={12} />
          </div>{' '}
          <div
            css={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img
              alt=""
              src="proselyte-poster.jpeg"
              css={mq({ height: ['45vh', '60vh', '60vh'] })}
            />
            <GapVertical times={3} />
            <button
              css={{
                border: 'none',
                fontWeight: 400,
                borderRadius: '4px',
                outline: 'none',
                padding: '12px 20px',
                textTransform: 'uppercase',
                // fontWeight: 200,
                background: '#f6c802',
                cursor: 'pointer',
                fontSize: '16px',
              }}
              onClick={() =>
                window.open('http://www.imdb.com/title/tt14755002')
              }
            >
              View on IMDB
            </button>
          </div>
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