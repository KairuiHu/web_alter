import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <Image
            src="/assets/logo-only.svg"
            alt="Synvo Logo"
            width={32}
            height={32}
            className="align-top"
          />
          <span>Synvo</span>
        </>
      ),
    },
    githubUrl: "https://github.com/synvo-ai",
    // see https://fumadocs.dev/docs/ui/navigation/links
    links: [
      {
        text: "Discord",
        url: "https://discord.com/",
        icon: <ExternalLinkIcon />,
      },
      {
        text: "Playground",
        url: "/playground",
      },
    ],
  };
}
