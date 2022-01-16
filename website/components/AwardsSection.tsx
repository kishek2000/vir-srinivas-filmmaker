/** @jsxImportSource @emotion/react */

import { Fragment } from 'react';
import { AiOutlineDownCircle } from 'react-icons/ai';
import { mq } from '../styles/mq';
import { GapHorizontal } from './GapHorizontal';
import { GapVertical } from './GapVertical';

const ofaAwards = [
  {
    awarder: 'Melbourne Underground Film Festival',
    award: 'Winner - Best Feature Film',
  },
  {
    awarder: 'Mannheim Arts and Film Festival',
    award: 'Winner - Best History Film',
  },
  {
    awarder: 'International Symbolic Art Film Festival',
    award: 'Winner - Best Feature War Film',
  },
  {
    awarder: 'Las Vegas International Film & Screenwriting Festival',
    award: 'Winner - Best Historical - Period Piece',
  },
  {
    awarder: 'Istanbul Film Awards',
    award: 'Winner - Best First Time Director',
  },
  { awarder: 'Istanbul Film Awards', award: 'Winner - Best Jewish' },
  { awarder: 'Kiez Berlin Film Festival', award: 'Winner - Best History Film' },
  {
    awarder: '​Brussels Capital Film Festival',
    award: 'Winner - Best Historical',
  },
  { awarder: 'Berlin Indie Film Festival', award: 'Winner - Best Historical' },
  { awarder: 'Accolade Global Film Competition', award: 'Winner - Jewish' },
  {
    awarder: 'HALO International Film Festival',
    award: 'Winner - Best War Film',
  },
  {
    awarder: 'HALO International Film Festival',
    award: 'Winner - Best Director Debut​',
  },
  {
    awarder: 'Cannes World Film Festival',
    award: 'Winner - Best Historical Film',
  },
  {
    awarder: 'Cannes World Film Festival',
    award: 'Winner - Best Black & White Film',
  },
  { awarder: 'Cannes World Film Festival', award: 'Winner - Best Jewish Film' },
  { awarder: 'Los Angeles Film Awards', award: 'Winner - Best Docudrama' },
  {
    awarder: 'Los Angeles Film Awards',
    award: 'Nominee - Best First Time Director',
  },
  {
    awarder: 'Cannes World Film Festival',
    award: 'Nominee - Best Biographical Feature Film',
  },
  {
    awarder: 'Cannes World Film Festival',
    award: 'Nominee - Best First Time Filmmaker',
  },
  { awarder: 'Near Nazareth Festival', award: 'Finalist' },
  { awarder: 'Ventotene Film Festival', award: 'Finalist' },
  {
    awarder: 'Flickers’ Rhode Island International Film Festival',
    award: 'Semi-Finalist',
  },
  {
    awarder: 'Lonely Wolf International Film Festival',
    award: 'Semi-Finalist',
  },
  {
    awarder: 'Changing Face International Film Festival',
    award: 'Bi-Annual Semi-Finalist',
  },
  { awarder: 'Sydney Lift-Off Film Festival', award: 'Official Selection' },
  { awarder: 'Melbourne Lift-Off Film Festival', award: 'Official Selection' },
  { awarder: 'First-Time Filmmaker Sessions', award: 'Official Selection' },
  { awarder: 'FLICKERFAIR Film Festival', award: 'Official Selection' },
  { awarder: 'RED Movie Awards', award: 'Official Selection' },
  {
    awarder: 'International Police Award Arts Film Festival',
    award: 'Official Selection',
  },
];

const proselyteAwards = [
  {
    awarder: 'Sanctuary International Film Festival',
    award: 'Nominee - Best Australian Short',
  },
  {
    awarder: 'Lonely Wolf International Film Festival',
    award: 'Semi-Finalist',
  },
  {
    awarder: 'Changing Face International Film Festival',
    award: 'Monthly Finalist',
  },
  {
    awarder: 'Perth Independent Film Festival',
    award: 'Official Selection',
  },
  {
    awarder: 'Sydney Lift-Off Film Festival',
    award: 'Official Selection',
  },
  {
    awarder: 'Melbourne Lift-Off Film Festival',
    award: 'Official Selection',
  },
  {
    awarder: 'World Distribution Award',
    award: 'Honourable Mention',
  },
];

const gunsAtCowraAwards = [
  {
    awarder: 'Discovery Int Fest of Film & Story',
    award: 'Winner',
  },
  {
    awarder: 'Fade In Awards True Story/Biopic Competition',
    award: '2nd Place',
  },
  {
    awarder: 'Fade In Awards First Ten Pages Competition',
    award: 'Semi-Finalist',
  },
  {
    awarder: 'StoryPros International Screenplay Contest',
    award: 'Quarter-Finalist',
  },
  {
    awarder: 'Miami Screenplay Awards',
    award: 'Quarter-Finalist',
  },
  {
    awarder: 'Wiki Screenplay Contest',
    award: 'Quarter-Finalist',
  },
];

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
          display: 'flex',
          flexDirection: ['column', 'row', 'row'],
          alignItems: 'center',
          justifyContent: 'center',
          width: '85%',
        })}
      >
        <div
          css={mq({
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'auto',
            width: ['80%', '65%', '65%'],
          })}
        >
          <h3>Orders from Above</h3>
          <div
            css={mq({
              display: 'flex',
              flexDirection: 'column',
              flexWrap: ['unset', 'wrap', 'wrap'],
              height: ['', '50vh', '45vh'],
              width: '100%',
              gridColumnGap: '24px',
            })}
          >
            {ofaAwards.map((award, index) => (
              <Fragment key={index}>
                <div
                  key={index}
                  css={{ display: 'flex', flexDirection: 'column' }}
                >
                  <p
                    css={mq({
                      margin: 0,
                      fontWeight: 200,
                      fontFamily: 'Rubik',
                      fontSize: ['14px', '14px', '16px'],
                    })}
                  >
                    <strong>{award.awarder}</strong>
                    <GapVertical times={1.25} />
                    {award.award}
                  </p>
                </div>
                <GapVertical times={6} />
              </Fragment>
            ))}
          </div>
        </div>
        <GapHorizontal times={12} />
        <div
          css={mq({
            display: 'flex',
            flexDirection: 'column',
            width: ['80%', 'unset', 'unset'],
            overflowX: 'auto',
          })}
        >
          <h3>The Proselyte</h3>
          <div
            css={mq({
              display: 'flex',
              flexDirection: 'column',
              flexWrap: ['unset', 'wrap', 'wrap'],
              height: ['', '50vh', '45vh'],
              width: '100%',
              gridColumnGap: '24px',
            })}
          >
            {proselyteAwards.map((award, index) => (
              <Fragment key={index}>
                <div
                  key={index}
                  css={{ display: 'flex', flexDirection: 'column' }}
                >
                  <p
                    css={mq({
                      margin: 0,
                      fontWeight: 200,
                      fontFamily: 'Rubik',
                      fontSize: ['14px', '14px', '16px'],
                    })}
                  >
                    <strong>{award.awarder}</strong>
                    <GapVertical times={1.25} />
                    {award.award}
                  </p>
                </div>
                <GapVertical times={6} />
              </Fragment>
            ))}
          </div>
        </div>
        <GapHorizontal times={12} />
        <div
          css={mq({
            display: 'flex',
            flexDirection: 'column',
            width: ['80%', 'unset', 'unset'],
            overflowX: 'auto',
          })}
        >
          <h3>The Guns at Cowra (screenplay)</h3>
          <div
            css={mq({
              display: 'flex',
              flexDirection: 'column',
              flexWrap: ['unset', 'wrap', 'wrap'],
              height: ['', '50vh', '45vh'],
              width: '100%',
              gridColumnGap: '24px',
            })}
          >
            {gunsAtCowraAwards.map((award, index) => (
              <Fragment key={index}>
                <div
                  key={index}
                  css={{ display: 'flex', flexDirection: 'column' }}
                >
                  <p
                    css={mq({
                      margin: 0,
                      fontWeight: 200,
                      fontFamily: 'Rubik',
                      fontSize: ['14px', '14px', '16px'],
                    })}
                  >
                    <strong>{award.awarder}</strong>
                    <GapVertical times={1.25} />
                    {award.award}
                  </p>
                </div>
                <GapVertical times={6} />
              </Fragment>
            ))}
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
