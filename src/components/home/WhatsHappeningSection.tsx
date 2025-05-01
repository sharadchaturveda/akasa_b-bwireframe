"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { memo, useEffect, useState } from "react";
import Image from "next/image";
import { isMobileDevice } from "@/utils/mobileUtils";
import MobileWhatsHappeningButton from "@/components/mobile/MobileWhatsHappeningButton";

const WhatsHappeningSection = memo(function WhatsHappeningSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device on client side
  useEffect(() => {
    setIsMobile(isMobileDevice());

    const handleResize = () => {
      setIsMobile(isMobileDevice());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Use Intersection Observer to detect when component is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only need to trigger once
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('whats-happening');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);
  return (
    <section id="whats-happening" className="w-full py-0">
      <div className="grid grid-cols-1 md:grid-cols-[60%_40%]">
        {/* Left side image with subtle zoom effect - Optimized for mobile */}
        <div className="h-[40vh] sm:h-[50vh] md:h-[80vh] w-full relative overflow-hidden">
          {/* Use Next.js Image for better performance */}
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/images/whats-happening.jpg"
              alt="What's happening"
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover"
              quality={75}
              loading="lazy"
              style={{
                objectPosition: "center",
                transform: isVisible ? "scale(1.05)" : "scale(1)",
                transition: "transform 8s ease-in-out",
                transformOrigin: "center"
              }}
            />
          </div>

          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent md:block hidden"></div>
          {/* Mobile-specific overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 md:hidden block"></div>
        </div>

        {/* Right side content - Optimized for mobile */}
        <div className="min-h-[400px] sm:min-h-[450px] md:h-[80vh] relative w-full flex flex-col justify-center py-16 px-6 md:p-16 overflow-hidden">
          {/* Use Next.js Image for better performance */}
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/images/whats-happening-bg.jpg"
              alt="What's happening background"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
              quality={75}
              loading="lazy"
              style={{
                objectPosition: "center"
              }}
            />
          </div>

          {/* Enhanced overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70"></div>

          {/* Decorative elements - smaller on mobile */}
          <div className="absolute top-0 left-0 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 border-t border-l border-[#E6C78B]/20"></div>
          <div className="absolute bottom-0 right-0 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 border-b border-r border-[#E6C78B]/20"></div>

          <div className="relative max-w-md mx-auto md:mx-0">
            <span className="text-[#E6C78B] text-xs sm:text-sm tracking-widest uppercase mb-2 block font-montserrat animate-fadeSlideUp" style={{ animationDelay: '0.1s' }}>Events & Offers</span>
            <h2 className="text-3xl sm:text-4xl font-playfair text-white mb-4 animate-fadeSlideUp" style={{ animationDelay: '0.2s', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{"What's Happening"}</h2>

            <div className="w-16 h-[1px] bg-gradient-to-r from-[#E6C78B]/80 to-transparent mb-4 sm:mb-6 animate-fadeSlideUp" style={{ animationDelay: '0.3s' }}></div>

            <p className="text-white/90 mb-6 sm:mb-8 leading-relaxed font-montserrat text-sm sm:text-base animate-fadeSlideUp" style={{ animationDelay: '0.4s' }}>
              {"At Akasa, we're always cooking up something new with exciting offers & events. Join us for special tastings, chef's tables, and seasonal celebrations."}
            </p>

            <div className="animate-fadeSlideUp flex justify-center md:justify-start" style={{ animationDelay: '0.5s' }}>
              {isMobile ? (
                <MobileWhatsHappeningButton href="/events" text="Find Out More" />
              ) : (
                <Link href="/events" className="w-full sm:w-auto">
                  <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-full sm:w-[200px] md:w-[240px] text-center shadow-lg text-sm sm:text-base">
                    <span className="whitespace-nowrap">Find Out More</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default WhatsHappeningSection;
