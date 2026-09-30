import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: __dirname },
  images: {
    // Temporary photography is served from Unsplash's CDN through a custom
    // loader (src/components/media/Img.tsx) that requests AVIF/WebP at the
    // exact rendered width. Real Bellagio photos dropped into /public/media
    // go through Next's own optimiser instead.
    remotePatterns: [new URL("https://images.unsplash.com/**"), new URL("https://assets.mixkit.co/**")],
    qualities: [60, 75, 85],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
