import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Contact } from '@/components/Contact';
import { FilmDetail } from '@/components/FilmDetail';
import { SiteHeader } from '@/components/SiteHeader';
import { films, getFilm, NAME } from '@/lib/content';

/**
 * Films sit at the root — /orders-from-above — so marketing links point at
 * a short, stable URL. Any other path 404s.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return films.map((film) => ({ slug: film.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const film = getFilm(slug);
  if (!film) return {};

  const description = film.synopsis;

  return {
    title: film.title,
    description,
    alternates: { canonical: `/${film.slug}` },
    openGraph: {
      type: 'video.movie',
      title: `${film.title} — ${NAME}`,
      description,
      url: `/${film.slug}`,
      images: [{ url: film.poster, width: 1200, height: 630 }],
    },
  };
}

export default async function FilmPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const film = getFilm(slug);
  if (!film) notFound();

  const index = films.findIndex((f) => f.slug === film.slug);
  const next = films[(index + 1) % films.length];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    name: film.title,
    description: film.synopsis,
    genre: film.genres,
    dateCreated: film.year,
    director: { '@type': 'Person', name: NAME },
    author: { '@type': 'Person', name: NAME },
    image: film.poster,
    sameAs: film.imdb,
    award: film.awards
      .filter((a) => a.result === 'Winner')
      .map((a) => `${a.festival} — ${a.category}`),
  };

  return (
    <>
      <SiteHeader />
      <main>
        <FilmDetail film={film} next={next} />
      </main>
      <Contact />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
