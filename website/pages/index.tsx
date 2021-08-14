/** @jsxImportSource @emotion/react */

import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { HomeHeader } from '../components/HomeHeader';

export default function Home() {
  const [mutedReel, setMutedReel] = useState(false);
  const [elapsedLoadTime, setElapsedLoadTime] = useState(0);
  const handleMute = useCallback(() => {
    setMutedReel(!mutedReel);
  }, [mutedReel]);
  // setInterval(() => setElapsedLoadTime(elapsedLoadTime + 1), 1000);
  useEffect(() => {
    const interval = setInterval(
      () =>
        setElapsedLoadTime((elapsedLoadTime) => {
          if (elapsedLoadTime < 5) {
            return elapsedLoadTime + 1;
          }
          return elapsedLoadTime;
        }),
      1000
    );
    return () => clearInterval(interval);
  }, []);
  return (
    <main
      css={{
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Oswald',
        background: elapsedLoadTime === 5 ? 'black' : '',
      }}
    >
      <HomeHeader
        elapsedLoadTime={elapsedLoadTime}
        mutedReel={mutedReel}
        handleMute={handleMute}
      />
    </main>
  );
}
