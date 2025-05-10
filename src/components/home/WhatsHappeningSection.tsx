"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { memo } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedText from "@/components/ui/AnimatedText";
import DecorativeCorners from "@/components/ui/DecorativeCorners";

/**
 * WhatsHappeningSection Component
 *
 * A section that displays information about events and offers.
 *
 * @returns {JSX.Element} The rendered component
 */
const WhatsHappeningSection = memo(function WhatsHappeningSection() {
  // Use the intersection observer hook to detect when the component is in viewport
  const { isIntersecting: isVisible, ref } = useIntersectionObserver({
    threshold: 0.1,
    disconnectOnIntersect: true
  });
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="whats-happening"
      className="w-full py-0">
      <div className="grid grid-cols-1 md:grid-cols-[60%_40%]">
        {/* Left side image with subtle zoom effect - Optimized for mobile */}
        <div className="h-[40vh] sm:h-[50vh] md:h-[80vh] w-full relative overflow-hidden">
          <AnimatedBackground
            src="/images/home/whats-happening/main.jpg"
            alt="What's happening"
            isAnimated={isVisible}
            scale={1.05}
            duration={8}
            opacity={1}
            quality={75}
            priority={false}
            sizes="(max-width: 768px) 100vw, 60vw"
            objectPosition="center"
            withOverlay={true}
            overlayColor="bg-gradient-to-r from-black/50 to-transparent"
          />
        </div>

        {/* Right side content - Optimized for mobile */}
        <div className="min-h-[400px] sm:min-h-[450px] md:h-[80vh] relative w-full flex flex-col justify-center py-16 px-6 md:p-16 overflow-hidden">
          {/* Background image with gradient overlay */}
          <AnimatedBackground
            src="/images/home/whats-happening/background.jpg"
            alt="What's happening background"
            isAnimated={false}
            opacity={1}
            quality={75}
            priority={false}
            sizes="(max-width: 768px) 100vw, 40vw"
            objectPosition="center"
            withOverlay={true}
            withGradientOverlay={true}
            gradientDirection="to-br"
            gradientFromColor="from-black/70"
            gradientViaColor="via-black/50"
            gradientToColor="to-black/70"
          />

          {/* Decorative corners */}
          <DecorativeCorners
            color="border-[#E6C78B]/20"
            size="responsive"
            position="all"
          />

          <div className="relative max-w-md mx-auto md:mx-0">
            <SectionHeading
              label="Events & Offers"
              title="What's Happening"
              withAnimation={true}
              withDivider={true}
              labelDelay={0.1}
              titleDelay={0.2}
              dividerDelay={0.3}
            />

            <AnimatedText
              as="p"
              animation="fadeSlideUp"
              delay={0.4}
              className="text-white/90 mb-6 sm:mb-8 leading-relaxed font-montserrat text-sm sm:text-base"
            >
              At Akasa, we're always cooking up something new with exciting offers & events. Join us for special tastings, chef's tables, and seasonal celebrations.
            </AnimatedText>

            <AnimatedText
              as="div"
              animation="fadeSlideUp"
              delay={0.5}
              className="flex justify-center md:justify-start"
            >
              <Link href="/events" className="w-full sm:w-auto">
                <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-full sm:w-[200px] md:w-[240px] text-center shadow-lg text-sm sm:text-base">
                  <span className="whitespace-nowrap">Find Out More</span>
                </Button>
              </Link>
            </AnimatedText>
          </div>
        </div>
      </div>
    </section>
  );
});

export default WhatsHappeningSection;

