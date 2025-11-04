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
      // Root redirect to quick-start
      {
        source: "/docs",
        destination: "/docs/quick-start",
        permanent: false,
      },
    ];
  },
};

export default withMDX(config);
