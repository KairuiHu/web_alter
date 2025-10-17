import "@/app/global.css";

import { Analytics } from "@vercel/analytics/next";
import { RootProvider } from "fumadocs-ui/provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Synvo",
    template: "%s | Synvo",
  },
  description: "Multimodal Contextualization System for AI Agents",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        <RootProvider>{children}</RootProvider>
        <Analytics />
      </body>
    </html>
  );
}
