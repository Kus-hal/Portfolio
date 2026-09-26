import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export keeps hosting open: `next build` emits a plain `out/` folder.
  output: "export",
  experimental: {
    // One page, ~7 KB of Tailwind, mostly first-time visitors: inlining removes the
    // render-blocking stylesheet request, which was the main cost on slow mobile networks.
    inlineCss: true,
  },
  images: {
    // The default loader needs a server; the only raster image is pre-sized.
    unoptimized: true,
  },
};

export default nextConfig;
