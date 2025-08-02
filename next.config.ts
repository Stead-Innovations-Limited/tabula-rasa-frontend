import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-7341407af1b446f5bf80c88b1eac8df6.r2.dev',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**', // This is where Google profile pictures are typically hosted
      },
      {
        protocol: 'https',
        hostname: 'example.com',
        pathname: '/**', // This is where Google profile pictures are typically hosted
      },
    ],
  },
};

export default nextConfig;
