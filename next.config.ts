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
  async redirects() {
    return [
      {
        source: "/admin/products",
        has: [
          {
            type: "query",
            key: "list",
            value: "featured",
          },
        ],
        destination: "/admin/featured-products",
        permanent: false,
      },
      {
        source: "/admin/products",
        has: [
          {
            type: "query",
            key: "list",
            value: "special",
          },
        ],
        destination: "/admin/special-offers",
        permanent: false,
      },
      {
        source: "/admin/products",
        has: [
          {
            type: "query",
            key: "list",
            value: "pending",
          },
        ],
        destination: "/admin/pending-products",
        permanent: false,
      },
      {
        source: "/admin/products",
        has: [
          {
            type: "query",
            key: "list",
            value: "hidden",
          },
        ],
        destination: "/admin/hidden-products",
        permanent: false,
      },
      {
        source: "/admin/products",
        has: [
          {
            type: "query",
            key: "list",
            value: "expired",
          },
        ],
        destination: "/admin/expired-products",
        permanent: false,
      },
      {
        source: "/admin/products",
        has: [
          {
            type: "query",
            key: "list",
            value: "sold",
          },
        ],
        destination: "/admin/sold-products",
        permanent: false,
      },
      {
        source: "/admin/products",
        has: [
          {
            type: "query",
            key: "list",
            value: "deleted",
          },
        ],
        destination: "/admin/deleted-products",
        permanent: false,
      },
      {
        source: "/admin/products",
        has: [
          {
            type: "query",
            key: "list",
            value: "drafts",
          },
        ],
        destination: "/admin/drafts",
        permanent: false,
      },
    ];
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
