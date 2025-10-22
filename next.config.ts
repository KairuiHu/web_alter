import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const withMDX = createMDX();

const config: NextConfig = {
  // reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Fix for image-size package trying to use node:fs in client context
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }
    return config;
  },
  async rewrites() {
    return {
      beforeFiles: [
        // MDX passthroughs for LLM routes
        {
          source: "/docs/:path*.mdx",
          destination: "/llms.mdx/:path*",
        },
      ],
    };
  },
  async redirects() {
    return [
      // Root redirect to version 1.0
      {
        source: "/docs",
        destination: "/docs/1.0/cookbook",
        permanent: false,
      },
      {
        source: "/docs/1.0",
        destination: "/docs/1.0/cookbook",
        permanent: false,
      },

      // Default missing version to 1.0 for all nested paths (e.g., /docs/api/...)
      // Exclude when the first segment is already version 1.0
      {
        source: "/docs/:first((?!1\\.0).*)/:path*",
        destination: "/docs/1.0/:first/:path*",
        permanent: false,
      },
    ];
  },
};

export default withMDX(config);
