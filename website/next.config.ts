import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Short links used in Orders from Above marketing.
  async redirects() {
    return [
      { source: '/ofa', destination: '/orders-from-above', permanent: true },
      {
        source: '/orders-from-above-film',
        destination: '/orders-from-above',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
