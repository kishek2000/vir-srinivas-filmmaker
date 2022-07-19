/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/** @jsxImportSource @emotion/react */

import React from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { RiExternalLinkFill } from 'react-icons/ri';
import {
  ofaCableLocations,
  ofaHomeEntertainmentPlatforms,
  ofaOnlineLocations,
} from '../../constants/channels';
import { mq } from '../../styles/mq';
import { GapVertical } from '../GapVertical';

export const OFAMovieInfo = () => {
  return (
    <div
      css={mq({
        display: 'flex',
        flexDirection: 'column',
        gap: ['24px', '32px', '36px'],
        width: ['90%', '40%', '40%'],
        height: '100%',
        overflowY: ['unset', 'auto', 'auto'],
        paddingRight: ['24px', '32px', '12px'],
        margin: '0 auto',
        alignItems: ['center', 'normal', 'normal'],
      })}
    >
      <hgroup
        css={mq({
          display: 'flex',
          flexDirection: 'column',
          gap: ['20px', '28px', '32px'],
        })}
      >
        <hgroup
          css={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <h1
            css={mq({
              fontSize: ['42px', '42px', '56px'],
              margin: '0px',
            })}
          >
            <strong>Orders from Above</strong>
          </h1>
          <dl
            css={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '24px',
              fontFamily: 'Rubik',
              fontWeight: 400,
              fontSize: '12px',
              color: 'rgba(200, 200, 200)',
            }}
          >
            <dt
              css={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <AiOutlineClockCircle /> 1h 27m
            </dt>
            <dt
              css={{
                display: 'flex',
                flexDirection: 'row',
                gap: '8px',
              }}
            >
              {['Biography', 'Drama', 'History'].map((genre, index) => (
                <span
                  key={index}
                  css={{
                    padding: '6px 12px',
                    // border: '1px solid grey',
                    borderRadius: '12px',
                    background: 'rgba(200, 200, 200)',
                    color: 'black',
                    // textTransform: 'uppercase',
                    fontWeight: 500,
                  }}
                >
                  {genre}
                </span>
              ))}
            </dt>
          </dl>
        </hgroup>
      </hgroup>
      <p css={{ fontFamily: 'Rubik', lineHeight: '150%' }}>
        Adolf Eichmann is finally captured and brought to Israel to stand trial.
        Without enough evidence to prosecute him, Police Captain Avner Less must
        extract a confession from the mastermind of the Holocaust.
      </p>
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          height: '100%',
        }}
      >
        <h3 css={{ margin: 0 }}>Available On:</h3>
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            height: '100%',
          }}
        >
          <MovieLinks title="Online" links={ofaOnlineLocations} />
          <MovieLinks title="Cable (USA)" links={ofaCableLocations} />
          <MovieLinks
            title="Retail and Libraries"
            links={ofaHomeEntertainmentPlatforms}
          />
        </div>
      </div>
      <div css={mq({ display: ['flex', 'none', 'none'] })}>
        <GapVertical times={20} />
      </div>
    </div>
  );
};

const MovieLinks: React.FC<{
  links: { name: string; location: string; link?: string }[];
  title: string;
}> = ({ title, links }) => {
  const handleRedirect = React.useCallback((channel: { link?: string }) => {
    if (channel.link) {
      window.open(channel.link, '_blank');
    }
  }, []);

  return (
    <div css={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <p css={{ margin: 0, fontFamily: 'Rubik' }}>{title}</p>
      <div
        css={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        {links.map((channel, index) => (
          <div
            key={index}
            css={mq({
              width: ['70px', '80px', '100px'],
              height: ['28px', '36px', '48px'],
              borderRadius: '8px',
              background: 'white',
              padding: '4px 12px',
              cursor: channel.link ? 'pointer' : 'unset',
              position: 'relative',
            })}
            onClick={() => handleRedirect(channel)}
          >
            <img
              src={`logo/${channel.name}`}
              css={{ width: '95%', height: '95%', objectFit: 'contain' }}
            />
            {channel.link ? (
              <div
                css={mq({
                  position: 'absolute',
                  right: ['-6px', '-8px', '-8px'],
                  top: ['-6px', '-8px', '-8px'],
                  zIndex: 200,
                  color: 'white',
                  background: 'rgba(130, 130, 130)',
                  width: ['20px', '24px', '24px'],
                  height: ['20px', '24px', '24px'],
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                })}
              >
                <RiExternalLinkFill
                  css={mq({ width: ['12px', '16px', '16px'] })}
                />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};
