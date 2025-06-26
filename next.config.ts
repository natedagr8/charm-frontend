import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['scandi-image-uploads.s3.amazonaws.com'],
  },
};

export default nextConfig;
