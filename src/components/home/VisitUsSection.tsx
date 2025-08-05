"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import SectionHeading from "@/components/ui/section-heading";
import Icon from "@/components/ui/icon";
import { IMAGES, COLORS } from "@/constants";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

/**
 * BusinessHours component for displaying opening hours
 * Enhanced text styling for better readability
 */
const BusinessHours = memo(function BusinessHours() {
  const { isMobile } = useDeviceDetection();

  if (isMobile) {
    return (
      <div className="flex flex-col items-center justify-center mb-4 sm:mb-6">
        <div className="w-7 h-7 rounded-full bg-[#1A2A3A]/80 flex items-center justify-center mb-2 flex-shrink-0 shadow-sm">
          <Icon name="clock" size={14} color={COLORS.GOLD} strokeWidth={1.5} />
        </div>
        <div className="text-center">
          <p className="text-xs font-montserrat text-white drop-shadow-md mb-1">
            {"Monday to Sautrady:"}
          </p>
          <p className="text-xs font-montserrat text-white drop-shadow-md">
            {"11:30am to 10:30pm"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center mb-4 sm:mb-6">
      <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-[#1A2A3A]/80 flex items-center justify-center mr-2 sm:mr-4 flex-shrink-0 shadow-sm">
        <Icon
          name="clock"
          size={14}
          color={COLORS.GOLD}
          strokeWidth={1.5}
          className="sm:w-5 sm:h-5"
        />
      </div>
      <p className="text-xs sm:text-sm lg:text-base font-montserrat text-white drop-shadow-md">
        {"Monday to Saturday: 11:30am to 10:30pm"}
      </p>
    </div>
  );
});

/**
 * CornerAccents component for decorative corners
 */
const CornerAccents = memo(function CornerAccents() {
  return (
    <>
      <div className="absolute top-0 left-0 w-8 h-8 sm:w-12 sm:h-12 border-t border-l border-[#E6C78B]/30"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 sm:w-12 sm:h-12 border-b border-r border-[#E6C78B]/30"></div>
    </>
  );
});

/**
 * LocationInfo component for displaying address information
 * Enhanced text styling for better readability
 */
const LocationInfo = memo(function LocationInfo() {
  return (
    <>
      <p className="text-sm sm:text-base lg:text-lg font-montserrat text-white drop-shadow-md mb-1 sm:mb-2">
        {"79 Robinson Road, #01-03 Capitasky,"}
      </p>
      <p className="text-sm sm:text-base lg:text-lg font-montserrat text-white drop-shadow-md mb-4 sm:mb-6">
        {"Tanjong Pagar, Singapore 068897"}
      </p>
    </>
  );
});

/**
 * ActionButtons component for displaying call-to-action buttons
 */
const ActionButtons = memo(function ActionButtons() {
  const { isMobile } = useDeviceDetection();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6">
      <DirectionsButton isMobile={isMobile} />
      <ReservationButton isMobile={isMobile} />
    </div>
  );
});

/**
 * DirectionsButton component for the "Get Directions" button
 */
const DirectionsButton = memo(function DirectionsButton({
  isMobile,
}: {
  isMobile: boolean;
}) {
  return (
    <Link
      href="https://maps.app.goo.gl/fVFNWkTNBQhbW91J7"
      target="_blank"
      rel="noopener noreferrer"
    >
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
                  color={COLORS.GOLD}
                  strokeWidth={2}
                />
              </div>
              <span className="text-xs">Get Directions</span>
            </>
          ) : (
            <>
              <Icon name="map-pin" className="mr-2" size={16} strokeWidth={2} />
              <span>Get Directions</span>
            </>
          )}
        </div>
      </Button>
    </Link>
  );
});

/**
 * ReservationButton component for the "Reserve a Table" button
 */
const ReservationButton = memo(function ReservationButton({
  isMobile,
}: {
  isMobile: boolean;
}) {
  return (
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
                  color={COLORS.GOLD}
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
  );
});

/**
 * InfoCard component for displaying the location information card
 * Centered over the background image with enhanced readability
 */
const InfoCard = memo(function InfoCard() {
  return (
    <div className="relative z-10 bg-black/70 backdrop-blur-sm rounded-lg border border-[#E6C78B]/20 p-6 sm:p-8 max-w-lg w-[90%] overflow-hidden shadow-xl">
      {/* Decorative corner accents */}
      <CornerAccents />

      <SectionHeading
        title="Visit Us"
        subtitle="Location"
        titleClassName="text-white drop-shadow-md"
        subtitleClassName="text-[#E6C78B] drop-shadow-md"
        dividerClassName="bg-[#E6C78B]/80"
        centered={true}
        className="mb-6"
      />

      <LocationInfo />
      <BusinessHours />
      <ActionButtons />
    </div>
  );
});

/**
 * VisitUsSection Component
 *
 * Displays location information and call-to-action buttons.
 * This component uses smaller, focused components for better organization.
 * The content is centered both horizontally and vertically over the background image.
 *
 * @returns {JSX.Element} The rendered component
 */
const VisitUsSection = memo(function VisitUsSectionComponent() {
  const { isMobile } = useDeviceDetection();

  return (
    <section
      id="visit-us"
      className="relative min-h-[80vh] flex items-center justify-center text-center px-4 sm:px-8 py-12 sm:py-16 overflow-hidden"
      style={{ height: "600px" }}
    >
      {/* Background image with high quality */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image
          src="/images/home/location.jpg"
          alt="Akasa restaurant location"
          fill
          priority={true}
          quality={95}
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center" }}
        />

        {/* Gradient overlay for better text readability */}
        <div
          className={cn(
            "absolute inset-0",
            "bg-gradient-to-t from-black/70 via-black/40 to-black/30"
          )}
        />
      </div>

      {/* Information card - centered horizontally and vertically */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <InfoCard />
      </div>
    </section>
  );
});

export default VisitUsSection;
