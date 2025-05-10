"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { memo } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedText from "@/components/ui/AnimatedText";
import DecorativeCorners from "@/components/ui/DecorativeCorners";
import AnimatedParticles from "@/components/ui/AnimatedParticles";

/**
 * BrandPhilosophy Component
 *
 * A section that displays the brand philosophy and location information.
 *
 * @returns {JSX.Element} The rendered component
 */
const BrandPhilosophy = memo(function BrandPhilosophy() {
  // Use the intersection observer hook to detect when the component is in viewport
  const { isIntersecting: isVisible, ref } = useIntersectionObserver({
    threshold: 0.1,
    disconnectOnIntersect: true
  });
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="brand-philosophy"
      className="w-full grid grid-cols-1 md:grid-cols-[40%_60%] bg-black -mt-2 sm:mt-0"
      style={{ marginTop: '-2px', position: 'relative', zIndex: 5 }}>
      {/* Top gradient overlay for smoother transition on mobile */}
      <div className="absolute top-0 left-0 right-0 h-[20px] bg-gradient-to-b from-black to-transparent z-[1] sm:hidden"></div>
      {/* Left Side - Brand Philosophy - Optimized for mobile */}
      <div className="relative pt-8 pb-12 sm:py-16 px-6 md:py-8 md:px-12 flex flex-col justify-center bg-black overflow-hidden min-h-[500px]">
        {/* Background image with animation */}
        <AnimatedBackground
          src="/images/home/philosophy/background.jpg"
          alt="Philosophy background"
          isAnimated={isVisible}
          scale={1.05}
          duration={8}
          opacity={0.9}
          quality={75}
          priority={false}
          sizes="(max-width: 768px) 100vw, 40vw"
          objectPosition="center"
          withOverlay={true}
          withGradientOverlay={true}
          gradientDirection="to-br"
        />

        {/* Decorative corners */}
        <DecorativeCorners
          color="border-[#E6C78B]/20"
          size="responsive"
          position="all"
        />

        <div className="relative max-w-md mx-auto md:mx-0 z-[2]">
          <SectionHeading
            label="Our Philosophy"
            subtitle="Not just a meal."
            title="An experience."
            withAnimation={true}
            withDivider={true}
          />

          <AnimatedText
            as="p"
            animation="fadeSlideUp"
            delay={0.4}
            className="font-montserrat text-sm sm:text-base text-white/90 mb-6 leading-relaxed"
          >
            We prioritize organic, sustainable sourcing to bring you the freshest seasonal ingredients, carefully selected to nourish both body and soul. Inspired by India's rich culinary heritage, we use heirloom grains, vibrant spices, and pasture-raised meats to craft soulful dishes. Enjoy them the traditional way—family style. <br />
              Whether you order à la carte or try our chef's selection, everything is served to share.
          </AnimatedText>

          <AnimatedText
            as="div"
            animation="fadeSlideUp"
            delay={0.5}
            className="flex justify-center md:justify-start"
          >
            <Link href="#visit-us">
              <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-[200px] sm:w-[240px] px-4 sm:px-6 py-2 sm:py-3 text-center shadow-lg text-sm sm:text-base">
                Our Location
              </Button>
            </Link>
          </AnimatedText>
        </div>
      </div>

      {/* Right Side - Location Info - Optimized for mobile */}
      <div className="relative bg-black overflow-hidden min-h-[500px]">
        {/* Background image with animation */}
        <AnimatedBackground
          src="/images/home/philosophy/drink.jpg"
          alt="Drink background"
          isAnimated={isVisible}
          scale={1.05}
          duration={8}
          opacity={0.9}
          quality={75}
          priority={false}
          sizes="(max-width: 768px) 100vw, 60vw"
          objectPosition="center"
          withOverlay={true}
          withGradientOverlay={true}
          gradientDirection="to-tl"
        />

        {/* Subtle animated particles */}
        <AnimatedParticles
          particles={[
            { top: 'top-1/4', position: 'right', value: '1/4', size: 1, duration: 15 },
            { top: 'top-3/4', position: 'right', value: '1/3', size: 1, duration: 20 }
          ]}
          color="bg-[#E6C78B]"
          opacity={0.2}
        />

        <div className="relative h-full flex flex-col justify-center pt-8 pb-12 sm:py-16 px-6 md:py-8 md:px-12">
          <div className="max-w-md mx-auto md:mx-0 z-[2]">
            <SectionHeading
              label="Visit Us"
              title="Singapore"
              withAnimation={true}
              withDivider={true}
            />

            <AnimatedText
              as="div"
              animation="fadeSlideUp"
              delay={0.4}
              className="space-y-3 sm:space-y-4"
            >
              <div>
                <p className="text-[#E6C78B]/80 text-xs sm:text-sm font-montserrat">address:</p>
                <p className="text-white text-base sm:text-lg font-montserrat">79 Robinson Road, #01-03 Capitasky,</p>
                <p className="text-white text-base sm:text-lg font-montserrat">Tanjong Pagar, Singapore 068897</p>
              </div>
              <div>
                <p className="text-[#E6C78B]/80 text-xs sm:text-sm font-montserrat">hours:</p>
                <p className="text-white text-base sm:text-lg font-montserrat">Monday to Saturday: 11:30am to 10:00pm</p>
              </div>
            </AnimatedText>

            <AnimatedText
              as="div"
              animation="fadeSlideUp"
              delay={0.5}
              className="mt-6 sm:mt-8 flex flex-col items-center md:items-start gap-3"
            >
              <Link href="https://akasa.oddle.me/en_SG/" className="w-full sm:w-auto" target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-[200px] sm:w-[240px] px-4 sm:px-6 py-2 sm:py-3 text-center shadow-lg text-sm sm:text-base">
                  Order Online
                </Button>
              </Link>
              <Link href="/reservations" className="w-full sm:w-auto">
                <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-[200px] sm:w-[240px] px-4 sm:px-6 py-2 sm:py-3 text-center shadow-lg text-sm sm:text-base">
                  Reserve Table
                </Button>
              </Link>
            </AnimatedText>
          </div>
        </div>
      </div>
    </section>
  );
});

export default BrandPhilosophy;

