import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const withMDX = createMDX();

const config: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/docs',
  assetPrefix: '/docs/',
  // reactStrictMode: true,
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
        source: "/",
        destination: "/1.0/synvo-api/api-keys-authentication",
        permanent: false,
      },
      {
        source: "/1.0",
        destination: "/1.0/synvo-api/api-keys-authentication",
        permanent: false,
      },

      // Default missing version to 1.0 for all nested paths
      // Exclude when the first segment is already version 1.0
      {
        source: "/:first((?!1\\.0).*)/:path*",
        destination: "/1.0/:first/:path*",
        permanent: false,
      },
    ];
  },
};

export default withMDX(config);
