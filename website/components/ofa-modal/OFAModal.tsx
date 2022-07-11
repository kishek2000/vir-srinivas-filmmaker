/* eslint-disable @next/next/no-img-element */
/** @jsxImportSource @emotion/react */

import { Dialog, DialogContent } from '@mui/material';
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
    <Dialog
      open={isOpen}
      css={mq({
        position: 'fixed',
        left: '0px',
        top: '0px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'white',
        justifyContent: ['normal', 'center', 'center'],
        zIndex: 10,
        overflowY: 'auto',
        background: 'none',
        overflowX: 'hidden',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        fontFamily: 'Oswald',
      })}
      onClose={onClose}
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          justifyContent: 'center',
          overflow: 'hidden',
          alignItems: 'center',
        },
      }}
      fullScreen
    >
      <DialogContent
        css={{
          width: '100%',
          height: '100%',
          background: 'none',
          overflowX: 'hidden',
          color: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
        }}
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
            background: 'transparent',
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
      </DialogContent>
    </Dialog>
  );
};
