"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import Section from "@/components/ui/section";
import SectionHeading from "@/components/ui/section-heading";
import Icon from "@/components/ui/icon";
import { COLORS, IMAGES } from "@/constants";
import { cn } from "@/lib/utils";

/**
 * InfoCard component for the VisitUs section
 */
const InfoCard = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn(
    "relative z-10 bg-black/70 rounded-lg border border-[#E6C78B]/20 shadow-2xl backdrop-blur-sm animate-fadeSlideUp",
    className
  )}>
    <CornerAccents />
    {children}
  </div>
);

/**
 * CornerAccents component for decorative corners
 */
const CornerAccents = () => {
  const { isMobile } = useDeviceDetection();

  return (
    <>
      <div className={`absolute top-0 left-0 ${isMobile ? 'w-6 h-6' : 'w-8 h-8 sm:w-12 md:w-16 sm:h-12 md:h-16'} border-t border-l border-[#E6C78B]/30`}></div>
      <div className={`absolute bottom-0 right-0 ${isMobile ? 'w-6 h-6' : 'w-8 h-8 sm:w-12 md:w-16 sm:h-12 md:h-16'} border-b border-r border-[#E6C78B]/30`}></div>
    </>
  );
};

/**
 * BusinessHours component for displaying opening hours
 */
const BusinessHours = () => {
  const { isMobile } = useDeviceDetection();

  if (isMobile) {
    return (
      <div className="flex flex-col items-center justify-center mb-4 sm:mb-6">
        <div className="w-7 h-7 rounded-full bg-[#1A2A3A]/80 flex items-center justify-center mb-2 flex-shrink-0">
          <Icon name="clock" size={14} color="#E6C78B" strokeWidth={1.5} />
        </div>
        <div className="text-center">
          <p className="text-xs font-montserrat text-white/90 mb-1">{"Monday to Saturday:"}</p>
          <p className="text-xs font-montserrat text-white/90">{"11:30am to 10:00pm"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center mb-4 sm:mb-6">
      <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-[#1A2A3A]/80 flex items-center justify-center mr-2 sm:mr-4 flex-shrink-0">
        <Icon name="clock" size={14} color="#E6C78B" strokeWidth={1.5} className="sm:w-5 sm:h-5" />
      </div>
      <p className="text-xs sm:text-sm lg:text-base font-montserrat text-white/90">
        {"Monday to Saturday: 11:30am to 10:00pm"}
      </p>
    </div>
  );
};

/**
 * ActionButtons component for CTA buttons
 */
const ActionButtons = () => {
  const { isMobile } = useDeviceDetection();

  return (
    <div className={`flex ${isMobile ? 'flex-col' : 'flex-col sm:flex-row'} gap-3 sm:gap-4 justify-center`}>
      <Link href="https://akasa.oddle.me/en_SG/" className="w-full flex justify-center" target="_blank" rel="noopener noreferrer">
        <Button
          className={cn(
            "uppercase bg-[#1A2A3A] text-white w-full px-3 sm:px-6 py-2 sm:py-3 text-center shadow-lg text-xs sm:text-sm",
            !isMobile && "hover:bg-[#0A1A2A]",
            isMobile ? "min-h-[44px] touch-manipulation" : "",
            "sm:w-[200px] md:w-[240px]"
          )}
        >
          Order Online
        </Button>
      </Link>
      <Link href="/reservations" className="w-full flex justify-center">
        <Button
          className={cn(
            "uppercase bg-[#1A2A3A] text-white w-full px-3 sm:px-6 py-2 sm:py-3 text-center shadow-lg text-xs sm:text-sm",
            !isMobile && "hover:bg-[#0A1A2A]",
            isMobile ? "min-h-[44px] touch-manipulation" : "",
            "sm:w-[200px] md:w-[240px]"
          )}
        >
          Reserve Table
        </Button>
      </Link>
    </div>
  );
};

/**
 * AnimatedParticles component for subtle background animation
 */
const AnimatedParticles = () => (
  <div className="absolute inset-0 opacity-20 pointer-events-none">
    <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-white animate-float" style={{ animationDuration: '15s' }}></div>
    <div className="absolute top-1/3 left-2/3 w-1 h-1 rounded-full bg-white animate-float" style={{ animationDuration: '20s' }}></div>
    <div className="absolute top-2/3 left-1/3 w-1 h-1 rounded-full bg-white animate-float" style={{ animationDuration: '25s' }}></div>
  </div>
);

/**
 * VisitUsSection Component
 *
 * Displays location information and call-to-action buttons.
 */
export default function VisitUsSection() {
  const { isMobile } = useDeviceDetection();

  // Background image URL with quality optimization
  const backgroundImageUrl = `/images/home/gallery/location.jpg?quality=${isMobile ? IMAGES.LOW_QUALITY : IMAGES.DEFAULT_QUALITY}&width=${isMobile ? '800' : '1200'}`;

  return (
    <Section
      id="visit-us"
      className="min-h-[80vh] flex items-center justify-center text-center px-4 sm:px-8 py-12 sm:py-16 overflow-hidden"
      useContainer={false}
      style={{
        backgroundImage: `url('${backgroundImageUrl}')`,
        backgroundPosition: isMobile ? 'center center' : 'center',
        backgroundSize: 'cover'
      }}
    >
      {/* Enhanced overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/40"></div>

      {/* Subtle animated particles - hidden on mobile for better performance */}
      {!isMobile && <AnimatedParticles />}

      <InfoCard className={`${isMobile ? 'p-4 w-[95%]' : 'p-5 sm:p-8 md:p-12 w-[92%] sm:w-[90%]'} max-w-lg`}>
        <SectionHeading
          title="Visit Us"
          subtitle="Location"
          titleClassName="text-white text-shadow"
        />

        <p className="text-sm sm:text-base lg:text-lg font-montserrat text-white/90 mb-1 sm:mb-2">{"79 Robinson Road, #01-03 Capitasky,"}</p>
        <p className="text-sm sm:text-base lg:text-lg font-montserrat text-white/90 mb-4 sm:mb-6">{"Tanjong Pagar, Singapore 068897"}</p>

        <BusinessHours />
        <ActionButtons />
      </InfoCard>
    </Section>
  );
}