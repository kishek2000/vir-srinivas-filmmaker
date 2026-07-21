import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, Geist, Geist_Mono } from 'next/font/google';
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
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="grain">{children}</body>
    </html>
  );
}
