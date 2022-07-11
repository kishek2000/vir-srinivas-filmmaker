/* eslint-disable @next/next/no-img-element */
/** @jsxImportSource @emotion/react */

import { motion } from 'framer-motion';
import { mq } from '../../styles/mq';
import { GapVertical } from '../GapVertical';
import { OFAModalCloseButton } from './OFAModalCloseButton';
import { OFAMovieInfo } from './OFAMovieInfo';

export const OFAModal: React.FC<{ isOpen: boolean; onClose: VoidFunction }> = ({
  isOpen,
  onClose,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      css={mq({
        position: 'fixed',
        left: '0px',
        top: '0px',
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        background: 'rgba(0,0,0, 0.95)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'white',
        justifyContent: ['normal', 'center', 'center'],
        zIndex: 10,
        overflowY: 'auto',
      })}
    >
      <div css={mq({ display: ['flex', 'none', 'none'] })}>
        <GapVertical times={20} />
      </div>
      <OFAModalCloseButton onClose={onClose} />
      <div
        css={mq({
          display: 'flex',
          flexDirection: ['column', 'row', 'row'],
          alignItems: 'center',
          width: ['95%', '100%', '80%'],
          height: ['100%', '80%', '80%'],
          justifyContent: ['normal', 'center', 'center'],
          gap: ['60px', '100px', '100px'],
        })}
      >
        <img
          src="ofa-poster-2.jpeg"
          alt=""
          css={mq({
            height: ['40%', '100%', '100%'],
            width: ['80%', '40%', '40%'],
            objectFit: 'contain',
          })}
        />
        <OFAMovieInfo />
      </div>
    </motion.div>
  );
};
