import type { MetadataRoute } from 'next';
import { films } from '@/lib/content';

const SITE = 'https://www.virsrinivas.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE, changeFrequency: 'monthly', priority: 1 },
    ...films.map((film) => ({
      url: `${SITE}/${film.slug}`,
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    })),
  ];
}
