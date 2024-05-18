/* eslint-disable @next/next/no-img-element */
/** @jsxImportSource @emotion/react */

import { AwardsSection } from '../components/AwardsSection';
import { GapVertical } from '../components/GapVertical';
import { HomeHeader } from '../components/HomeHeader';
import { MediaSection } from '../components/MediaSection';
import { VideoSection } from '../components/VideoSection';
import { WorkSection } from '../components/WorkSection';
import { useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { OFAModal } from '../components/ofa-modal/OFAModal';
import { AiFillCloseCircle } from 'react-icons/ai';
import { mq } from '../styles/mq';
import Head from 'next/head';

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPrompt, setShowPrompt] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      onOpen();
    }, 2000);
  }, [onOpen]);

  return (
    <>
      <Head>
        <title>Vir Srinivas: Filmmaker</title>
      </Head>
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '100vw',
          minHeight: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Oswald',
          overflow: 'hidden',
        }}
      >
        {showPrompt ? (
          <div
            css={mq({
              position: 'fixed',
              zIndex: 5,
              right: '36px',
              bottom: '36px',
              borderRadius: '4px',
              // height: '36px',
              boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.05)',
              background: 'white',
              cursor: 'pointer',
              display: ['none', 'flex', 'flex'],
              flexDirection: 'column',
              alignItems: 'center',
            })}
          >
            <AiFillCloseCircle
              css={{ position: 'absolute', top: '-12px', right: '-12px' }}
              size={24}
              onClick={() => setShowPrompt(false)}
            />
            <img
              src="ofa-poster-2.jpeg"
              css={{
                width: '96px',
                objectFit: 'contain',
                borderTopLeftRadius: '12px',
                borderTopRightRadius: '12px',
              }}
              alt=""
              onClick={onOpen}
            />
            <span
              css={{
                fontFamily: 'Rubik',
                fontSize: '10px',
                textTransform: 'uppercase',
                fontWeight: 500,
                letterSpacing: '0.05rem',
                padding: '12px',
              }}
              onClick={onOpen}
            >
              View Release
            </span>
          </div>
        ) : null}
        <OFAModal isOpen={isOpen} onClose={onClose} />
        <HomeHeader />
        <WorkSection onOpen={onOpen} />
        <AwardsSection />
        <VideoSection />
        <MediaSection />
        <GapVertical times={12} />
      </div>
    </>
  );
}
