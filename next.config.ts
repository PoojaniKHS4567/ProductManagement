import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Silence the multiple lockfiles warning
  turbopack: {
    root: process.cwd(),
  },
}

export default nextConfig