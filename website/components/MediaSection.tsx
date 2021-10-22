/** @jsxImportSource @emotion/react */

import { FC } from 'react';
import { computeGridSize } from '../styles/grid';
import { mq } from '../styles/mq';
import { GapVertical } from './GapVertical';
import { SocialIcon } from 'react-social-icons';
import { GapHorizontal } from './GapHorizontal';

export const MediaSection: FC = () => {
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
        MEDIA
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
        Media mentions of Vir&apos;s work.
      </p>
      <GapVertical times={16} />
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
            background: 'white',
            boxShadow: '0px 0px 24px rgba(0, 0, 0, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            width: ['80%', computeGridSize(85), computeGridSize(110)],
            height: [
              computeGridSize(92),
              computeGridSize(87.5),
              computeGridSize(110),
            ],
            alignItems: 'center',
            justifyContent: 'center',
          })}
        >
          <div
            css={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '90%',
              height: '80%',
            }}
          >
            <h1
              css={mq({
                fontWeight: 500,
                margin: 0,
                fontSize: ['24px', '28px', '32px'],
              })}
            >
              Indian Link
            </h1>
            <GapVertical times={3} />
            <p
              css={mq({
                margin: 0,
                fontWeight: 300,
                textAlign: 'center',
                width: '80%',
                fontSize: ['16px', '16px', '18px'],
              })}
            >
              Vir Srinivas, 20, wins at Cannes with debut film Orders From Above
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
                lineHeight: '150%',
              })}
            >
              Vir settled on a story that was interesting, yet possible to be
              shot in one or two simple indoor locations: the true story of the
              interrogation of Nazi war criminal, Adolf Eichmann, by Israeli
              police.
            </p>
            <GapVertical times={7} />
            <button
              css={{
                border: '1px solid black',
                borderRadius: '4px',
                outline: 'none',
                padding: '8px 12px',
                textTransform: 'uppercase',
                fontWeight: 200,
                background: 'none',
                cursor: 'pointer',
                fontSize: '12px',
              }}
              onClick={() =>
                window.open(
                  'https://www.indianlink.com.au/entertainment/global/orders-from-above-film-vir-srinivas-cannes-debut-win/ '
                )
              }
            >
              Read Full
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
        css={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '20px',
        }}
      >
        <div css={{ height: '2px', width: '48px', background: 'black' }} />
        <GapVertical times={8} />
        <p
          css={{
            margin: 0,
          }}
        >
          Contact
        </p>
        <GapVertical times={4} />
        <div
          css={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
        >
          <div
            css={{
              width: computeGridSize(9),
              height: computeGridSize(9),
              backgroundImage: 'url(/imdb.png)',
              borderRadius: '50%',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '50% 50%',
              backgroundColor: '#f6c802',
              cursor: 'pointer',
            }}
          />
          <GapHorizontal times={2} />
          <SocialIcon
            url="mailto:virsrinivasfilmmaker@gmail.com"
            css={{
              maxWidth: computeGridSize(9),
              maxHeight: computeGridSize(9),
            }}
          />
          <GapHorizontal times={2} />
          <SocialIcon
            url="https://www.linkedin.com/in/vir-srinivas/"
            css={{
              maxWidth: computeGridSize(9),
              maxHeight: computeGridSize(9),
            }}
          />
          <GapHorizontal times={2} />
          <SocialIcon
            url="https://twitter.com"
            css={{
              maxWidth: computeGridSize(9),
              maxHeight: computeGridSize(9),
            }}
          />
        </div>
      </div>
    </section>
  );
};
