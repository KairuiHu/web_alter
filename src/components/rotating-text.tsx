"use client";

import { useEffect, useState } from "react";

const texts = [
  "Every file tells a story.",
  "Your user's files define their digital self.",
  "Files are the fingerprints of your users' digital lives.",
  "To know your user, read their files.",
  "Files are more than data—they're reflections of the owner.",
  "Every file your user interacts with shapes their persona.",
  "Your users are modelled not only by conversation—but by their files.",
];

export function RotatingText() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 2; // Update every 100ms for smooth animation (5000ms / 50 steps = 100ms)
      });
    }, 100);

    // Text rotation
    const interval = setInterval(() => {
      setIsAnimating(false);
      setProgress(0);
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setIsAnimating(true);
      }, 300); // Wait for fade out before changing text
      
    }, 5000); // Change every 5 seconds

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="mb-2 text-fd-muted-foreground text-balance text-lg min-h-[3rem] flex items-center justify-center gap-3">
      <p 
        className={`text-center transition-opacity duration-300 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="font-medium">In Synvo AI we believe - </span>
        {texts[currentIndex]}
      </p>
      <div 
        className="relative flex-shrink-0 w-6 h-6 rounded-full transition-all duration-100 ease-linear"
        style={{
          background: `conic-gradient(currentColor ${progress}%, transparent ${progress}% 100%)`,
          opacity: 0.6
        }}
      />
    </div>
  );
}

