import type { Metadata, Viewport } from 'next';
import {
  Instrument_Serif,
  Geist,
  Geist_Mono,
  Courier_Prime,
  Cormorant_Garamond,
  Bebas_Neue,
} from 'next/font/google';
import { EMAIL, NAME } from '@/lib/content';
import './globals.css';

const display = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

const sans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

const mono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

/* ── One face per film ────────────────────────────────────────────────
   Each film speaks in its own typeface, not a size variant of the house
   serif. Courier Prime is the screenwriting standard, which is apt twice
   over: Orders from Above is a transcript of an interrogation, and Vir is
   a prize-winning screenwriter. Cormorant is a light old-style face that
   sets like an inscription. Bebas is a condensed display sans with no
   lowercase — a system's voice, not a person's. */

const typewriter = Courier_Prime({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-courier-prime',
  display: 'swap',
});

const liturgical = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-cormorant',
  display: 'swap',
});

const condensed = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas',
  display: 'swap',
});

const SITE = 'https://virsrinivas.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: `${NAME} — Writer, Director, Producer`,
    template: `%s — ${NAME}`,
  },
  description:
    'Vir is an award-winning writer, producer and director. His credits include Orders from Above, The Proselyte and Gradient Descent.',
  authors: [{ name: NAME }],
  openGraph: {
    type: 'website',
    siteName: NAME,
    url: SITE,
    title: `${NAME} — Writer, Director, Producer`,
    description:
      'Award-winning writer, producer and director. Orders from Above, The Proselyte, Gradient Descent.',
    images: [{ url: '/ofa-poster.jpeg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/' },
  other: { 'contact:email': EMAIL },
};

export const viewport: Viewport = {
  themeColor: '#08080a',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} ${typewriter.variable} ${liturgical.variable} ${condensed.variable}`}
    >
      <body className="grain">{children}</body>
    </html>
  );
}
