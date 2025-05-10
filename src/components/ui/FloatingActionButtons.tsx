"use client";

import { memo, useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import { throttle } from "@/utils/functionUtils";

/**
 * FloatingActionButtons Component
 *
 * Displays floating CTA buttons (Book Now and WhatsApp) that are fixed on the screen
 * and visible across all pages. WhatsApp button is positioned on the left side,
 * while Book Now button is on the right side.
 *
 * The buttons automatically adjust their position to stop at the footer's top edge
 * to prevent overlapping with footer links and content.
 */
const FloatingActionButtons = memo(function FloatingActionButtons() {
  const { isMobile } = useDeviceDetection();
  const [buttonsPosition, setButtonsPosition] = useState({ bottom: isMobile ? 16 : 24 }); // Default bottom position in pixels
  const footerRef = useRef<HTMLElement | null>(null);
  const ticking = useRef(false);
  const defaultBottom = useRef(isMobile ? 16 : 24);
  const bufferMargin = 10; // 10px buffer

  // WhatsApp message and phone number
  const whatsappNumber = "+6580121181"; // Singapore number format with country code
  const whatsappMessage = "Hello, I'd like to make a reservation at Akasa. Could you please assist me?";
  // WhatsApp API requires the number without the plus sign
  const whatsappUrlNumber = whatsappNumber.replace('+', '');
  const whatsappUrl = `https://wa.me/${whatsappUrlNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  // Adjust size based on device
  const buttonSize = isMobile ? "w-10 h-10" : "w-12 h-12";
  const iconSize = isMobile ? "20" : "24";

  // Use the high-resolution SVG WhatsApp icon
  const whatsAppIconPath = "/images/whatsapp-icon.svg";

  // Function to update button positions based on footer location - optimized for performance
  const updateButtonPosition = () => {
    // Skip if already processing a frame or footer ref not set
    if (ticking.current || !footerRef.current) return;

    ticking.current = true;

    // Use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      const footer = footerRef.current;
      if (!footer) {
        ticking.current = false;
        return;
      }

      // Get viewport height and footer position
      const viewportHeight = window.innerHeight;
      const footerRect = footer.getBoundingClientRect();
      const footerTop = footerRect.top;

      // Calculate the distance from the bottom of the viewport to the top of the footer
      const distanceToFooter = viewportHeight - footerTop;

      // If footer is in view, position buttons just above the footer
      if (footerTop < viewportHeight) {
        setButtonsPosition({ bottom: distanceToFooter + bufferMargin });
      } else {
        // Otherwise, use the default position
        setButtonsPosition({ bottom: defaultBottom.current });
      }

      ticking.current = false;
    });
  };

  // Set up scroll listener to update button position
  useEffect(() => {
    // Cache the footer element reference to avoid repeated DOM queries
    footerRef.current = document.querySelector('footer');
    defaultBottom.current = isMobile ? 16 : 24;

    // Initial position update
    updateButtonPosition();

    // Create throttled versions of the update function for better performance
    const throttledUpdatePosition = throttle(updateButtonPosition, 200);

    // Add scroll event listener with throttling and passive option for better performance
    window.addEventListener('scroll', throttledUpdatePosition, { passive: true });
    window.addEventListener('resize', throttledUpdatePosition, { passive: true });

    // Clean up
    return () => {
      window.removeEventListener('scroll', throttledUpdatePosition);
      window.removeEventListener('resize', throttledUpdatePosition);
    };
  }, [isMobile]);

  return (
    <>
      {/* WhatsApp Button - Left Side */}
      <div
        className="fixed left-4 md:left-6 z-50 transition-all duration-300"
        style={{
          bottom: `${buttonsPosition.bottom}px`,
        }}
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center ${buttonSize} transition-all duration-300 transform hover:scale-105`}
          aria-label="Contact us on WhatsApp"
          style={{
            padding: 0
          }}
        >
          <Image
            src={whatsAppIconPath}
            alt="WhatsApp"
            width={isMobile ? 40 : 48}
            height={isMobile ? 40 : 48}
            className="w-full h-full"
            priority={true}
          />
        </a>
      </div>

      {/* Book Now Button - Right Side */}
      <div
        className="fixed right-4 md:right-6 z-50 transition-all duration-300"
        style={{
          bottom: `${buttonsPosition.bottom}px`,
        }}
      >
        <Link href="/reservations">
          <Button
            variant="default"
            size={isMobile ? "small" : "medium"}
            className="rounded-full bg-[#1A2A3A] text-white shadow-lg hover:shadow-xl"
            showHoverAnimation={!isMobile}
            style={{
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <span className="whitespace-nowrap px-2">Book Now</span>
          </Button>
        </Link>
      </div>
    </>
  );
});

export default FloatingActionButtons;
