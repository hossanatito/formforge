import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // This is required for dynamic routes with empty generateStaticParams
  // in static export mode when using client-side routing
};

export default nextConfig;
