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

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [maxHeight, setMaxHeight] = useState('none');

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setMaxHeight('100vh');
      }, 1000);
    } else {
      setMaxHeight('none');
    }
  }, [isOpen]);

  return (
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
        maxHeight: maxHeight,
      }}
    >
      {isOpen ? <OFAModal isOpen={isOpen} onClose={onClose} /> : null}
      <HomeHeader />
      <WorkSection />
      <AwardsSection />
      <VideoSection />
      <MediaSection />
      <GapVertical times={12} />
    </div>
  );
}
