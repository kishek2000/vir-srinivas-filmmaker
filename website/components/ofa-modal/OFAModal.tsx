/* eslint-disable @next/next/no-img-element */
/** @jsxImportSource @emotion/react */

import { Dialog, DialogContent, Zoom } from '@mui/material';
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
        backgroundColor: [
          'rgba(0, 0, 0, 0.8)',
          'rgba(0, 0, 0, 0.9)',
          'rgba(0, 0, 0, 0.9)',
        ],
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
        css={mq({
          width: '100%',
          height: '100%',
          background: 'none',
          overflowX: 'hidden',
          color: 'white',
          alignItems: ['normal', 'center', 'center'],
          justifyContent: 'center',
          display: 'flex',
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
            alignItems: ['center', 'flex-start', 'flex-start'],
            width: ['95%', '90%', '80%'],
            height: ['unset', '80%', '80%'],
            justifyContent: ['normal', 'center', 'center'],
            gap: ['80px', '60px', '90px'],
            background: 'transparent',
          })}
        >
          <div
            css={mq({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: ['normal', 'center', 'center'],
              height: ['90%', '90%', '90%'],
              width: ['80%', '45%', '40%'],
              gap: '24px',
              margin: '0 auto',
              paddingTop: '36px',
            })}
          >
            <img
              src="ofa-poster-2.jpeg"
              alt=""
              css={mq({
                objectFit: 'contain',
                width: ['65%', '90%', '90%'],
                height: '100%',
              })}
            />
            <span>Winner of over 15 international awards</span>
          </div>
          <OFAMovieInfo />
        </div>
      </DialogContent>
    </Dialog>
  );
};
