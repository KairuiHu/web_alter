"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface ThemeAwareImageProps {
  darkSrc: string;
  lightSrc: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  unoptimized?: boolean;
}

export function ThemeAwareImage({
  darkSrc,
  lightSrc,
  alt,
  width,
  height,
  className,
  priority = false,
  unoptimized = false,
}: ThemeAwareImageProps) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine if we're in dark mode
  const isDarkMode = resolvedTheme === 'dark' || 
    (resolvedTheme === 'system' && mounted && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const currentSrc = isDarkMode ? darkSrc : lightSrc;

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <Image
        src={lightSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        unoptimized={unoptimized}
      />
    );
  }

  return (
    <Image
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      unoptimized={unoptimized}
    />
  );
}
