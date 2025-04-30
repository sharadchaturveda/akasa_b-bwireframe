"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface TestimonialBackgroundImageProps {
  scrollY: number;
}

const TestimonialBackgroundImage = ({ scrollY }: TestimonialBackgroundImageProps) => {
  // Use client-side only rendering to avoid hydration mismatch
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Return a simple placeholder during SSR to avoid hydration errors
  if (!isMounted) {
    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
        {/* Simple placeholder that won't cause hydration mismatches */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/testimonial.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat"
          }}
        ></div>
      </div>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>
    </div>
  );
};

export default TestimonialBackgroundImage;
