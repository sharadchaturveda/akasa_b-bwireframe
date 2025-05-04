"use client";

import { memo } from 'react';
import { ANIMATIONS, COLORS, LAYOUT } from './constants';

interface TestimonialBackgroundProps {
  isMounted: boolean;
  scrollY: number;
}

const TestimonialBackground = memo(function TestimonialBackground({
  isMounted,
  scrollY
}: TestimonialBackgroundProps) {
  return (
    <div className="absolute inset-0 w-full h-full">
      {/* During SSR or before hydration, show a simple background */}
      {!isMounted ? (
        <div className="absolute inset-0 bg-black"></div>
      ) : (
        <>
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: "url('/images/home/testimonials/background-alt.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              transform: `translateY(${scrollY * ANIMATIONS.PARALLAX_FACTOR}px)`, // Subtle parallax effect
              transition: 'transform 0.1s ease-out',
              width: '100%',
              height: `${LAYOUT.BACKGROUND_HEIGHT_PERCENT}%`, // Extend beyond the container to avoid gaps
              top: `${LAYOUT.BACKGROUND_TOP_OFFSET_PERCENT}%` // Offset to ensure coverage at the top
            }}
          ></div>
        </>
      )}
      {/* Overlay for better text readability */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundColor: COLORS.BLACK_TRANSPARENT_60,
          height: `${LAYOUT.BACKGROUND_HEIGHT_PERCENT}%`,
          top: `${LAYOUT.BACKGROUND_TOP_OFFSET_PERCENT}%`
        }}
      ></div>
    </div>
  );
});

export default TestimonialBackground;

