"use client";

import { memo } from 'react';
import Image from 'next/image';
import { IMAGES } from '@/constants';

/**
 * FallbackMobileHero Component
 *
 * A simple fallback component that displays a static image when the video fails to load.
 * This ensures users always see something, even if video playback fails.
 *
 * @returns {JSX.Element} The rendered component
 */
const FallbackMobileHero = memo(function FallbackMobileHero() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Fallback image - no darkening overlay */}
      <div className="absolute inset-0 z-10">
        <Image
          src="/images/home/hero/carousel/hero1.jpg"
          alt="Akasa restaurant ambiance"
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover"
          style={{
            filter: 'brightness(1.15)',
            objectFit: 'cover',
            objectPosition: 'center',
            transform: 'translateZ(0)', // Force hardware acceleration
            willChange: 'transform' // Hint to browser to optimize
          }}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQIGAwAAAAAAAAAAAAABAgMABAUGERIhMUFRcf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AnnWzYxyKis7MQFA5JNRnGMbxG8jCWbIrdIVBSFfYXgn36ooor//Z"
        />
      </div>
    </div>
  );
});

export default FallbackMobileHero;
