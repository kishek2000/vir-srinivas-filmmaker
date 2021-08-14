/** @jsxImportSource @emotion/react */
import { GapVertical } from './GapVertical';
import { mq } from '../styles/mq';
import { FC, Fragment } from 'react';
import { motion } from 'framer-motion';
import { BsVolumeUpFill, BsVolumeMuteFill } from 'react-icons/bs';

interface HomeHeaderProps {
  elapsedLoadTime: number;
  mutedReel: boolean;
  handleMute: () => void;
}

export const HomeHeader: FC<HomeHeaderProps> = ({
  elapsedLoadTime,
  mutedReel,
  handleMute,
}) => {
  return (
    <Fragment>
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: elapsedLoadTime === 5 ? 1 : 0 }}
        transition={{ duration: 2 }}
        css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <h1
          css={mq({
            fontWeight: 400,
            fontSize: ['80px'],
            margin: 0,
            zIndex: 2,
            color: elapsedLoadTime === 5 ? 'white' : 'black',
          })}
        >
          VIR SRINIVAS
        </h1>
        <GapVertical times={3} />
        <div
          css={mq({
            height: ['3px'],
            width: ['32px'],
            background: elapsedLoadTime === 5 ? 'white' : 'black',
            zIndex: 2,
          })}
        />
        <GapVertical times={3} />
        <p
          css={mq({
            margin: 0,
            fontSize: ['32px'],
            fontWeight: 200,
            zIndex: 2,
            color: elapsedLoadTime === 5 ? 'white' : 'black',
          })}
        >
          Filmmaker
        </p>
        {elapsedLoadTime === 5 ? (
          <Fragment>
            <div
              css={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                position: 'absolute',
                zIndex: 2,
                bottom: '-48px',
              }}
            >
              {mutedReel ? (
                <BsVolumeUpFill
                  css={{
                    zIndex: 2,
                    width: '36px',
                    height: '36px',
                    cursor: 'pointer',
                    ':hover': {
                      width: '40px',
                      height: '40px',
                      bottom: '-54px',
                    },
                  }}
                  color="white"
                  onClick={handleMute}
                />
              ) : (
                <BsVolumeMuteFill
                  css={{
                    zIndex: 2,
                    width: '36px',
                    height: '36px',
                    cursor: 'pointer',
                    ':hover': {
                      width: '40px',
                      height: '40px',
                      bottom: '-54px',
                    },
                  }}
                  color="white"
                  onClick={handleMute}
                />
              )}
            </div>
          </Fragment>
        ) : null}
      </motion.div>
      {elapsedLoadTime === 5 ? (
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ type: 'spring', damping: 100, duration: 2 }}
        >
          <video
            css={{
              position: 'absolute',
              zIndex: 1,
              width: '100vw',
              height: '100vh',
              top: '0px',
              left: '0px',
            }}
            autoPlay
            muted={mutedReel}
            loop
            src={'/showreel-compressed.mp4'}
          />
        </motion.div>
      ) : null}
    </Fragment>
  );
};
