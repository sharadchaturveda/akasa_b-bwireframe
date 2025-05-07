"use client";

import { memo, useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useDisableOptimizations } from "@/hooks/useDisableOptimizations";
import { disableDiningInfoDebug } from "@/utils/disableDebugScripts";
import { startTracing } from "@/utils/reservationInfoTracer";

const ReservationInfo = memo(function ReservationInfo() {
  const [isMobile, setIsMobile] = useState(false);
  // Use our custom hook to disable performance optimizations for this component
  const optimizationDisabledRef = useDisableOptimizations();
  // Keep the existing ref for backward compatibility
  const componentRef = useRef<HTMLDivElement>(null);

  // Disable debug scripts, load override CSS, and start tracing
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    // Disable the dining info debug script
    disableDiningInfoDebug();

    // Load our override CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/reservation-info-override.css';
    link.id = 'reservation-info-override-css';
    document.head.appendChild(link);

    // Start tracing to help debug any future issues
    startTracing();

    // Log that we're using the new protection system
    // ReservationInfo component mounted with protection system

    return () => {
      // Only run in browser environment
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
      }

      // Remove the override CSS when the component unmounts
      const cssLink = document.getElementById('reservation-info-override-css');
      if (cssLink) {
        cssLink.remove();
      }

      // We don't stop tracing on unmount to catch any post-unmount modifications
    };
  }, []);

  // Detect mobile device on client side
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined' || typeof navigator === 'undefined') {
      return;
    }

    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;

      setIsMobile(isMobileDevice || (isTouchDevice && isSmallScreen));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      // Only run in browser environment
      if (typeof window === 'undefined') {
        return;
      }

      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Apply and maintain our styles to override any optimization interference
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    if (!componentRef.current) return;

    // Function to apply our styles - this is now a backup to our protector script
    const applyStyles = () => {
      if (!componentRef.current) return;

      // Ensure the data-exclude-optimization attribute is set
      componentRef.current.setAttribute('data-exclude-optimization', 'true');

      // Get all the content containers
      const contentContainers = componentRef.current.querySelectorAll('.content-container');
      contentContainers.forEach(container => {
        // Force flex-grow with !important to override any other styles
        (container as HTMLElement).style.setProperty('flex-grow', '1', 'important');
        (container as HTMLElement).style.setProperty('min-width', '0', 'important');
      });

      // Get all the icon containers
      const iconContainers = componentRef.current.querySelectorAll('.icon-container');
      iconContainers.forEach(container => {
        // Force flex-shrink with !important
        (container as HTMLElement).style.setProperty('flex-shrink', '0', 'important');
      });

      // Get all the label spans
      const labelSpans = componentRef.current.querySelectorAll('.label-span');
      labelSpans.forEach(span => {
        // Force width and flex-shrink with !important
        (span as HTMLElement).style.setProperty('flex-shrink', '0', 'important');
        if (window.innerWidth >= 640) { // sm breakpoint
          (span as HTMLElement).style.setProperty('width', '9rem', 'important'); // 36 in tailwind
        }
      });
    };

    // Apply styles immediately
    applyStyles();

    // Set up a MutationObserver to watch for changes
    const observer = new MutationObserver((mutations) => {
      // Check if any of the mutations are style changes
      const hasStyleChanges = mutations.some(mutation =>
        mutation.type === 'attributes' &&
        (mutation.attributeName === 'style' || mutation.attributeName === 'class')
      );

      if (hasStyleChanges) {
        // Style changes detected, reapplying styles
        applyStyles();
      }
    });

    observer.observe(componentRef.current, {
      attributes: true,
      attributeFilter: ['style', 'class'],
      childList: true,
      subtree: true
    });

    // Also reapply on resize
    window.addEventListener('resize', applyStyles);

    // We don't need the interval anymore since we have the protector script
    // But we'll keep a less frequent one as a backup
    const intervalId = setInterval(applyStyles, 2000);

    return () => {
      // Only run in browser environment
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
      }

      if (observer && observer.disconnect) {
        observer.disconnect();
      }

      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', applyStyles);
      }

      clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      ref={(el) => {
        // Assign to both refs
        componentRef.current = el;
        if (optimizationDisabledRef && typeof optimizationDisabledRef === 'object') {
          // Use type assertion without deprecated MutableRefObject
          (optimizationDisabledRef as any).current = el;
        }
      }}
      className="bg-black/40 backdrop-blur-sm p-6 sm:p-8 md:p-12 border border-white/10 rounded-lg shadow-xl relative overflow-hidden"
      data-exclude-optimization="true">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      ></div>

      <div className="relative z-10">
        <h2 className="text-2xl sm:text-3xl font-playfair mb-6 sm:mb-8 text-center text-white">
          <span className="relative inline-block">
            Dining Information
            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#E6C78B]/80 to-transparent"></span>
          </span>
        </h2>

        <div className="space-y-6 sm:space-y-8">
          {/* Hours */}
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-start" style={{display: 'flex'}}>
            <div className="icon-container flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1A2A3A] flex items-center justify-center" style={{flexShrink: 0}}>
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#E6C78B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="content-container flex-grow" style={{flexGrow: 1, minWidth: 0}}>
              <h3 className="text-lg sm:text-xl font-playfair text-white mb-2 sm:mb-4">Hours of Operation</h3>
              <div className="space-y-2 text-white/80">
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <span className="label-span sm:w-36 font-medium mb-1 sm:mb-0" style={{flexShrink: 0}}>Monday - Saturday:</span>
                  <span className="text-[#E6C78B]">11:30 AM - 10:00 PM</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <span className="label-span sm:w-36 font-medium mb-1 sm:mb-0" style={{flexShrink: 0}}>Sunday:</span>
                  <span className="text-[#E6C78B]">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-start" style={{display: 'flex'}}>
            <div className="icon-container flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1A2A3A] flex items-center justify-center" style={{flexShrink: 0}}>
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#E6C78B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="content-container flex-grow" style={{flexGrow: 1, minWidth: 0}}>
              <h3 className="text-lg sm:text-xl font-playfair text-white mb-2 sm:mb-4">Location</h3>
              <div className="space-y-2 text-white/80">
                <p className="break-words">79 Robinson Road, #01-03 Capitasky<br />Tanjong Pagar, Singapore 068897</p>
                <div className="flex flex-col sm:flex-row items-start mt-2">
                  <span className="label-span sm:w-36 font-medium shrink-0 mb-1 sm:mb-0" style={{flexShrink: 0}}>Parking:</span>
                  <span className="max-w-full">Public parking available at nearby Capitasky building. MRT station within walking distance.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Policies */}
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-start" style={{display: 'flex'}}>
            <div className="icon-container flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1A2A3A] flex items-center justify-center" style={{flexShrink: 0}}>
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#E6C78B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="content-container flex-grow" style={{flexGrow: 1, minWidth: 0}}>
              <h3 className="text-lg sm:text-xl font-playfair text-white mb-2 sm:mb-4">Reservation Policies</h3>
              <div className="space-y-3 text-white/80">
                <div className="flex items-start">
                  <span className="text-[#E6C78B] mr-2 sm:mr-3 flex-shrink-0">•</span>
                  <span className="text-sm sm:text-base">Reservations are held for 15 minutes past the reserved time.</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#E6C78B] mr-2 sm:mr-3 flex-shrink-0">•</span>
                  <span className="text-sm sm:text-base">For parties of 6 or more, a credit card is required to secure your reservation.</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#E6C78B] mr-2 sm:mr-3 flex-shrink-0">•</span>
                  <span className="text-sm sm:text-base">Cancellations must be made at least 24 hours in advance to avoid a $25 per person fee.</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#E6C78B] mr-2 sm:mr-3 flex-shrink-0">•</span>
                  <span className="text-sm sm:text-base">For private dining or large parties, please contact us directly.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-start" style={{display: 'flex'}}>
            <div className="icon-container flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1A2A3A] flex items-center justify-center" style={{flexShrink: 0}}>
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#E6C78B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div className="content-container flex-grow" style={{flexGrow: 1, minWidth: 0}}>
              <h3 className="text-lg sm:text-xl font-playfair text-white mb-2 sm:mb-4">Contact Us</h3>
              <div className="space-y-2 text-white/80">
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <span className="label-span sm:w-36 font-medium mb-1 sm:mb-0" style={{flexShrink: 0}}>Phone:</span>
                  <span className="text-[#E6C78B]">+65 6123 4567</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <span className="label-span sm:w-36 font-medium mb-1 sm:mb-0" style={{flexShrink: 0}}>Email:</span>
                  <span className="text-[#E6C78B] break-all">reservations@akasa.com</span>
                </div>
                <p className="mt-2">For immediate assistance or same-day reservations, please call us directly.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-4 sm:pt-6 text-center">
            <Link href="/menu" className="inline-block w-full sm:w-auto">
              {isMobile ? (
                <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-full sm:w-auto">
                  View Our Menus
                </Button>
              ) : (
                <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-full sm:w-auto group relative overflow-hidden">
                  <span className="absolute inset-0 w-full h-full bg-[#E6C78B] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                  <span className="relative z-10 group-hover:text-black transition-colors duration-300">View Our Menus</span>
                </Button>
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ReservationInfo;
