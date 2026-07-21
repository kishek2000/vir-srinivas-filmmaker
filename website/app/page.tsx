import { Awards } from '@/components/Awards';
import { Contact } from '@/components/Contact';
import { FilmIndex } from '@/components/FilmIndex';
import { Hero } from '@/components/Hero';
import { Intro } from '@/components/Intro';
import { Press } from '@/components/Press';
import { SiteHeader } from '@/components/SiteHeader';

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <FilmIndex />
        <Intro />
        <Awards />
        <Press />
      </main>
      <Contact />
    </>
  );
}
