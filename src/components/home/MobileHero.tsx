"use client";

import { memo } from 'react';
import BaseHero from './BaseHero';
import HeroBackgroundVideo from './HeroBackgroundVideo';

/**
 * MobileHero Component
 *
 * Mobile-only hero section with video background.
 * This component is completely separate from the desktop hero
 * and will only be rendered on mobile devices.
 *
 * @returns {JSX.Element} The rendered component
 */
const MobileHero = memo(function MobileHero() {
  // Custom content for mobile hero
  const customContent = (
    <div className="flex flex-col items-center justify-center px-4 text-center">
      <p className="text-white/90 uppercase tracking-widest text-sm mb-4">
        Experience
      </p>

      <h1 className="text-white text-4xl font-playfair italic mb-6"
          style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
        Exquisite Indian Cuisine
      </h1>

      <div className="flex items-center w-full max-w-xs justify-center mb-6">
        <div className="h-px bg-white/50 flex-1"></div>
        <div className="mx-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1" />
            <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>
        <div className="h-px bg-white/50 flex-1"></div>
      </div>

      <p className="text-white/80 mb-8 text-sm">
        Fine Dining at the Heart of Singapore
      </p>
    </div>
  );

  // Background content for mobile hero
  const backgroundContent = (
    <HeroBackgroundVideo
      src="/images/home/hero/mobile-video/heromobilevid.mp4"
      fallbackImageSrc="/images/home/hero/mobile-video/fallback.jpg"
      fallbackImageAlt="Akasa restaurant ambiance"
    />
  );

  return (
    <BaseHero
      backgroundContent={backgroundContent}
      customContent={customContent}
      showLogo={false}
    />
  );
});

export default MobileHero;
