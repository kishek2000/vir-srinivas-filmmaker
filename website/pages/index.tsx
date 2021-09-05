/** @jsxImportSource @emotion/react */

import { HomeHeader } from '../components/HomeHeader';
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
    </main>
  );
}
