"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { memo, useEffect, useState } from "react";
import Image from "next/image";

const WhatsHappeningSection = memo(function WhatsHappeningSection() {
  const [isVisible, setIsVisible] = useState(false);

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
        {/* Left side image with subtle zoom effect */}
        <div className="h-[50vh] md:h-[80vh] w-full relative overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
        </div>

        {/* Right side content */}
        <div className="h-[50vh] md:h-[80vh] relative w-full flex flex-col justify-center p-6 md:p-16 overflow-hidden">
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

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-[#E6C78B]/20"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-[#E6C78B]/20"></div>

          <div className="relative">
            <span className="text-[#E6C78B] text-sm tracking-widest uppercase mb-2 block font-montserrat animate-fadeSlideUp" style={{ animationDelay: '0.1s' }}>Events & Offers</span>
            <h2 className="text-4xl font-playfair text-white mb-4 animate-fadeSlideUp" style={{ animationDelay: '0.2s', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{"What's Happening"}</h2>

            <div className="w-16 h-[1px] bg-gradient-to-r from-[#E6C78B]/80 to-transparent mb-6 animate-fadeSlideUp" style={{ animationDelay: '0.3s' }}></div>

            <p className="text-white/90 mb-8 leading-relaxed font-montserrat animate-fadeSlideUp" style={{ animationDelay: '0.4s' }}>
              {"At Akasa, we're always cooking up something new with exciting offers & events. Join us for special tastings, chef's tables, and seasonal celebrations."}
            </p>

            <div className="animate-fadeSlideUp" style={{ animationDelay: '0.5s' }}>
              <Link href="/events">
                <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-[240px] text-center shadow-lg" showArrow>
                  {"Find Out More"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default WhatsHappeningSection;
