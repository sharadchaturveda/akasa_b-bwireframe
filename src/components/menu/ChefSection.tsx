"use client";

import { memo, useEffect } from "react";
import { trackLCPElement } from "@/utils/lcpUtils";
import ChefBackground from "./ChefBackground";
import ChefPortrait from "./ChefPortrait";
import ChefBio from "./ChefBio";
import DecorativeSpice from "./DecorativeSpice";

/**
 * ChefSection Component
 *
 * Displays information about the chef with an elegant layout and visual effects.
 * This component is optimized for performance with LCP tracking.
 *
 * @returns {JSX.Element} The rendered component
 */
const ChefSection = memo(function ChefSection() {
  // Optimize LCP image loading
  useEffect(() => {
    // Use the trackLCPElement utility to optimize LCP
    const cleanup = trackLCPElement({
      elementId: 'lcp-image',
      loadedClass: 'loaded',
      markPerformance: true
    });

    // Clean up on unmount
    return cleanup;
  }, []);

  return (
    <section className="min-h-screen w-full bg-black flex flex-col items-center justify-center relative overflow-hidden py-20">
      {/* Background and decorative elements */}
      <ChefBackground />

      {/* Decorative spice illustrations */}
      <DecorativeSpice width={120} height={120} rotation={12} className="top-10 right-10" />
      <DecorativeSpice width={100} height={100} rotation={-12} className="bottom-10 left-10" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-12 items-center">
          {/* Chef portrait */}
          <ChefPortrait />

          {/* Chef biography */}
          <ChefBio />
        </div>
      </div>
    </section>
  );
});

export default ChefSection;


