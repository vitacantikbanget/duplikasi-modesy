import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async rewrites() {
    return [
      { source: "/clothing", destination: "/category/clothing" },
      { source: "/shoes", destination: "/category/shoes" },
      { source: "/home-living", destination: "/category/home-living" },
      { source: "/jewelry-accessories", destination: "/category/jewelry-accessories" },
      { source: "/toys-entertainment", destination: "/category/toys-entertainment" },
      { source: "/graphics-photos", destination: "/category/graphics-photos" },
      { source: "/video-audio", destination: "/category/video-audio" },
      { source: "/web-templates-code", destination: "/category/web-templates-code" },
      { source: "/womens-clothing", destination: "/category/womens-clothing" },
      { source: "/mens-clothing", destination: "/category/mens-clothing" },
      { source: "/kids-clothing", destination: "/category/kids-clothing" },
    ];
  },
};

export default nextConfig;
