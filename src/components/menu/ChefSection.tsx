"use client";

import { memo, useEffect, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * ChefSection Component
 *
 * A section component for displaying information about the chef.
 *
 * @returns {JSX.Element} The rendered component
 */
const ChefSection = memo(function ChefSection() {
  // Reference to the image element for LCP tracking
  const imageRef = useRef<HTMLImageElement>(null);

  // Track LCP (Largest Contentful Paint) for performance monitoring
  useEffect(() => {
    const image = document.getElementById('lcp-image') as HTMLImageElement;

    if (image) {
      // If image is already loaded
      if (image.complete) {
        // Mark LCP as loaded
        if (typeof window.performance !== 'undefined') {
          window.performance.mark('lcp-loaded');
          window.performance.measure('time-to-lcp', 'navigationStart', 'lcp-loaded');

          const lcpTiming = window.performance.getEntriesByName('time-to-lcp');
          if (lcpTiming.length > 0) {
            // Performance measurement: LCP time recorded
            console.log(`LCP loaded in ${lcpTiming[0].duration.toFixed(2)}ms`);
          }
        }

        // Add loaded class for animations
        image.classList.add('loaded');
      } else {
        // Add load event listener if image is not yet loaded
        const handleLoad = () => {
          // Mark LCP as loaded
          if (typeof window.performance !== 'undefined') {
            window.performance.mark('lcp-loaded');
            window.performance.measure('time-to-lcp', 'navigationStart', 'lcp-loaded');

            const lcpTiming = window.performance.getEntriesByName('time-to-lcp');
            if (lcpTiming.length > 0) {
              // Performance measurement: LCP time recorded
              console.log(`LCP loaded in ${lcpTiming[0].duration.toFixed(2)}ms`);
            }
          }

          // Add loaded class for animations
          image.classList.add('loaded');

          // Remove event listener
          image.removeEventListener('load', handleLoad);
        };

        image.addEventListener('load', handleLoad);

        // Clean up
        return () => {
          image.removeEventListener('load', handleLoad);
        };
      }
    }
  }, []);

  return (
    <section className="relative w-full bg-black py-20 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          id="lcp-image"
          ref={imageRef}
          src="/images/menu/chef/background.jpg"
          alt="Chef Akhilesh Pathak"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80"></div>
      </div>

      {/* Content container */}
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Chef image - Now on the left */}
          <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-2xl border border-white/10 order-2 md:order-1">
            <Image
              src="/images/menu/chef/portrait.jpg"
              alt="Chef Akhilesh Pathak portrait"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

            {/* Chef signature */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center">
              <div className="bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full border border-[#E6C78B]/20">
                <p className="text-[#E6C78B] font-playfair italic text-xl">Akhilesh Pathak</p>
              </div>
            </div>
          </div>

          {/* Chef information - Now on the right */}
          <div className="text-white order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-playfair mb-6 relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E6C78B] to-[#D4B679]">
                Meet Our Chef
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-[#E6C78B]/80 to-transparent"></div>
            </h2>

            <p className="text-white/80 font-montserrat mb-6 leading-relaxed">
              Hailing from the vibrant culinary melting pot of Kolkata, Chef Akhilesh Pathak brings over 15 years of expertise in authentic Indian cuisine to Akasa. His journey through the kitchens of renowned establishments across India and Singapore has shaped his distinctive approach to traditional flavors.
            </p>

            <p className="text-white/80 font-montserrat mb-8 leading-relaxed">
              His philosophy is simple: respect the ingredients, honor the traditions, but don't be afraid to innovate. At Akasa, he crafts dishes that tell stories of India's diverse regions while incorporating contemporary techniques and presentations.
            </p>

            {/* Achievement badges */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="bg-[#1A2A3A] border border-[#E6C78B]/30 rounded-full px-4 py-2 text-sm text-[#E6C78B]">
                Taste Guru
              </div>
              <div className="bg-[#1A2A3A] border border-[#E6C78B]/30 rounded-full px-4 py-2 text-sm text-[#E6C78B]">
                Curry Architect
              </div>
              <div className="bg-[#1A2A3A] border border-[#E6C78B]/30 rounded-full px-4 py-2 text-sm text-[#E6C78B]">
                Culinary Trendsetter
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default ChefSection;
