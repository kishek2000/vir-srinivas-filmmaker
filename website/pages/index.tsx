/** @jsxImportSource @emotion/react */

import { AwardsSection } from '../components/AwardsSection';
import { GapVertical } from '../components/GapVertical';
import { HomeHeader } from '../components/HomeHeader';
import { MediaSection } from '../components/MediaSection';
import { VideoSection } from '../components/VideoSection';
import { WorkSection } from '../components/WorkSection';

export default function Home() {
  return (
    <main
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
      <HomeHeader />
      <WorkSection />
      <AwardsSection />
      <VideoSection />
      <MediaSection />
      <GapVertical times={12} />
    </main>
  );
}
