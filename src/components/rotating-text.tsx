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

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(false);
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setIsAnimating(true);
      }, 300); // Wait for fade out before changing text
      
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-2 text-fd-muted-foreground text-balance text-lg min-h-[5rem] flex flex-col items-center justify-center">
      <p className="text-center font-medium mb-1">
        In Synvo AI we believe -
      </p>
      <p 
        className={`text-center transition-opacity duration-300 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
      >
        {texts[currentIndex]}
      </p>
    </div>
  );
}

