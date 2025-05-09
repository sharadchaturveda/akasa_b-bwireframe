"use client";

/**
 * Mobile-only hero section with video background
 * This component is completely separate from the desktop hero
 * and will only be rendered on mobile devices
 *
 * This is a simplified version that uses a direct video element
 * without any React state or refs to ensure maximum compatibility
 */
const MobileHero = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
      {/* Direct video element with inline attributes for maximum compatibility */}
      <video
        className="absolute inset-0 w-full h-full"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/home/hero/mobile-poster.jpg"
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%'
        }}
      >
        <source src="/images/home/hero/mobile-video/heromobilevid.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default MobileHero;
