"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import SectionHeading from "@/components/ui/section-heading";
import Icon from "@/components/ui/icon";
import { IMAGES } from "@/constants";

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
 * CornerAccents component for decorative corners
 */
const CornerAccents = () => {
  return (
    <>
      <div className="absolute top-0 left-0 w-8 h-8 sm:w-12 sm:h-12 border-t border-l border-[#E6C78B]/30"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 sm:w-12 sm:h-12 border-b border-r border-[#E6C78B]/30"></div>
    </>
  );
};

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
    <div
      id="visit-us"
      className="relative min-h-[80vh] flex items-center justify-center text-center px-4 sm:px-8 py-12 sm:py-16 overflow-hidden"
      style={{
        backgroundImage: `url('${backgroundImageUrl}')`,
        backgroundPosition: isMobile ? 'center center' : 'center',
        backgroundSize: 'cover'
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/40"></div>

      {/* Styled card with semi-transparency and gold accents */}
      <div className="relative z-10 bg-black/70 backdrop-blur-sm rounded-lg border border-[#E6C78B]/20 p-6 sm:p-8 max-w-lg w-[90%] overflow-hidden">
        {/* Decorative corner accents */}
        <CornerAccents />

        <SectionHeading
          title="Visit Us"
          subtitle="Location"
          titleClassName="text-white"
          subtitleClassName="text-[#E6C78B]"
          dividerClassName="bg-[#E6C78B]/80"
          centered={true}
          className="mb-6"
        />

        <p className="text-sm sm:text-base lg:text-lg font-montserrat text-white/90 mb-1 sm:mb-2">{"79 Robinson Road, #01-03 Capitasky,"}</p>
        <p className="text-sm sm:text-base lg:text-lg font-montserrat text-white/90 mb-4 sm:mb-6">{"Tanjong Pagar, Singapore 068897"}</p>

        <BusinessHours />

        {/* Action buttons with consistent styling matching the site's design */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6">
          <Link href="https://maps.app.goo.gl/fVFNWkTNBQhbW91J7" target="_blank" rel="noopener noreferrer">
            <Button
              variant="default"
              size={isMobile ? "small" : "medium"}
              showHoverAnimation={!isMobile}
              fullWidth={isMobile}
              className="font-montserrat"
            >
              <div className="inline-flex items-center justify-center">
                {isMobile ? (
                  <>
                    <div className="flex items-center justify-center w-5 h-5 mr-1.5">
                      <Icon
                        name="map-pin"
                        size={14}
                        color="#E6C78B"
                        strokeWidth={2}
                      />
                    </div>
                    <span className="text-xs">Get Directions</span>
                  </>
                ) : (
                  <>
                    <Icon
                      name="map-pin"
                      className="mr-2"
                      size={16}
                      strokeWidth={2}
                    />
                    <span>Get Directions</span>
                  </>
                )}
              </div>
            </Button>
          </Link>
          <Link href="/reservations">
            <Button
              variant="default"
              size={isMobile ? "small" : "medium"}
              showHoverAnimation={!isMobile}
              fullWidth={isMobile}
              className="font-montserrat"
            >
              <div className="inline-flex items-center justify-center">
                {isMobile ? (
                  <>
                    <div className="flex items-center justify-center w-5 h-5 mr-1.5">
                      <Icon
                        name="calendar"
                        size={14}
                        color="#E6C78B"
                        strokeWidth={2}
                      />
                    </div>
                    <span className="text-xs">Reserve a Table</span>
                  </>
                ) : (
                  <>
                    <Icon
                      name="calendar"
                      className="mr-2"
                      size={16}
                      strokeWidth={2}
                    />
                    <span>Reserve a Table</span>
                  </>
                )}
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
