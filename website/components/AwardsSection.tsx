/** @jsxImportSource @emotion/react */

import { Fragment } from 'react';
import { AiOutlineDownCircle } from 'react-icons/ai';
import { mq } from '../styles/mq';
import { GapVertical } from './GapVertical';
import {
  ofaAwards,
  proselyteAwards,
  gunsAtCowraAwards,
  atTheGatesAwards,
} from '../constants/awards';

export const AwardsSection = () => {
  return (
    <section
      css={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1
        css={mq({
          fontWeight: 400,
          fontSize: ['44px', '52px', '56px'],
          margin: 0,
          textAlign: 'center',
        })}
      >
        HONOURS AND AWARDS
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
        Vir is a multi-award winning filmmaker.
      </p>
      <GapVertical times={12} />
      <div
        css={mq({
          display: 'grid',
          gridTemplateColumns: [
            'repeat(auto-fill, 100%)',
            'repeat(auto-fill, 40%)',
            'repeat(auto-fill, 40%)',
          ],
          width: ['75%', '85%', '85%'],
          rowGap: ['24px', '40px', '64px'],
          columnGap: ['0px', '40px', '64px'],
          justifyContent: 'center',
        })}
      >
        <AwardBlock mediaTitle="Orders from Above" awards={ofaAwards} />
        <AwardBlock mediaTitle="The Proselyte" awards={proselyteAwards} />
        <AwardBlock
          mediaTitle="The Guns at Cowra (screenplay)"
          awards={gunsAtCowraAwards}
        />
        <AwardBlock
          mediaTitle="At the Gates (screenplay)"
          awards={atTheGatesAwards}
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
          window.scrollTo({ top: 3 * window.innerHeight, behavior: 'smooth' })
        }
      >
        <p css={{ margin: 0, fontWeight: 300 }}>VIDEOS</p>
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

interface AwardBlockProps {
  mediaTitle: string;
  awards: {
    awarder: string;
    award: string;
  }[];
}

const AwardBlock: React.FC<AwardBlockProps> = ({ mediaTitle, awards }) => {
  return (
    <div
      css={mq({
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        overflowY: ['unset', 'auto', 'auto'],
        maxHeight: ['unset', '30vh', '30vh'],
      })}
    >
      <h3>{mediaTitle}</h3>
      <div
        css={mq({
          width: '100%',
          display: 'grid',
          gridTemplateColumns: [
            'repeat(auto-fill, 1fr)',
            'repeat(auto-fill, 40%)',
            'repeat(auto-fill, 28%)',
          ],
          alignItems: 'center',
          gap: '20px',
          // height: '100%',
        })}
      >
        {awards.map((award, index) => (
          <div
            key={index}
            css={mq({
              margin: 0,
              fontWeight: 200,
              fontFamily: 'Rubik',
              fontSize: ['14px', '14px', '16px'],
            })}
          >
            <strong>{award.awarder}</strong>
            <GapVertical times={1.25} />
            <p style={{ margin: 0 }}>{award.award}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
