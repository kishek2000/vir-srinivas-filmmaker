/** @jsxImportSource @emotion/react */

import { FC } from 'react';
import { computeGridSize } from '../styles/grid';
import { mq } from '../styles/mq';
import { GapVertical } from './GapVertical';
import { SocialIcon } from 'react-social-icons';
import { GapHorizontal } from './GapHorizontal';
import { articles } from '../constants/media';

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
        PRESS
      </h1>
      <GapVertical times={16} />
      <div
        css={mq({
          position: 'relative',
          width: ['95%', '60%', '60%'],
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: [
            'repeat(auto-fill, 80%)',
            `repeat(auto-fill, ${computeGridSize(90)})`,
            `repeat(auto-fill, ${computeGridSize(110)})`,
          ],
          gap: '24px',
        })}
      >
        {articles.map((article, index) => (
          <MediaArticleCard {...article} key={index} />
        ))}
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
            fontWeight: 300,
          }}
        >
          Contact Vir at <strong>virsrinivasfilmmaker@gmail.com</strong>
        </p>
        <GapVertical times={6} />
        <div
          css={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
        >
          <div
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
              ':hover': {
                transform: ['unset', 'scale(1.05)', 'scale(1.05)'],
              },
              transition: '0.3s',
            })}
            onClick={() => window.open('http://www.imdb.com/name/nm12504238')}
          />
          <GapHorizontal times={2} />
          <SocialIcon
            url="https://www.linkedin.com/in/vir-srinivas/"
            css={mq({
              maxWidth: computeGridSize(9),
              maxHeight: computeGridSize(9),
              ':hover': {
                transform: ['unset', 'scale(1.05)', 'scale(1.05)'],
              },
              transition: '0.3s',
            })}
          />
          <GapHorizontal times={2} />
          <SocialIcon
            url="https://instagram.com/virsrinivas"
            css={mq({
              maxWidth: computeGridSize(9),
              maxHeight: computeGridSize(9),
              ':hover': {
                transform: ['unset', 'scale(1.05)', 'scale(1.05)'],
              },
              transition: '0.3s',
            })}
          />
          <GapHorizontal times={2} />
          <SocialIcon
            url="https://twitter.com/VirSrinivas"
            css={mq({
              maxWidth: computeGridSize(9),
              maxHeight: computeGridSize(9),
              ':hover': {
                transform: ['unset', 'scale(1.05)', 'scale(1.05)'],
              },
              transition: '0.3s',
            })}
          />
        </div>
      </div>
    </section>
  );
};

interface MediaArticleCardProps {
  providerTitle: string;
  providerHeadline: string;
  articleDesc: string;
  articleLink: string;
}

const MediaArticleCard: FC<MediaArticleCardProps> = ({
  providerTitle,
  providerHeadline,
  articleDesc,
  articleLink,
}) => {
  return (
    <div
      css={mq({
        background: 'white',
        // boxShadow: '0px 0px 24px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        // width: ['80%', computeGridSize(90), computeGridSize(110)],
        width: '100%',
        height: [
          computeGridSize(92),
          computeGridSize(100),
          computeGridSize(110),
        ],
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid black',
        borderRadius: '4px',
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
          {providerTitle}
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
            lineHeight: '150%',
          })}
        >
          {articleDesc}
        </p>
        <GapVertical times={7} />
        <button
          css={{
            // border: '1px solid black',
            borderRadius: '4px',
            outline: 'none',
            padding: '8px 12px',
            textTransform: 'uppercase',
            fontWeight: 300,
            // background: 'none',
            cursor: 'pointer',
            fontSize: '12px',
            background: 'black',
            color: 'white',
            letterSpacing: '0.1em',
          }}
          onClick={() => window.open(articleLink)}
        >
          Read Full
        </button>
      </div>
    </div>
  );
};
