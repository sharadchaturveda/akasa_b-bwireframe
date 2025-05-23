"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import {
  MENU_TYPES,
  ANIMATED_BACKGROUND_STYLE,
  BACKGROUND_ANIMATION_KEYFRAMES,
  DOUBLE_CLICK_TIMEOUT
} from "@/constants/menuConstants";
import {
  createClickTracking,
  handleMenuCardClick as handleClick,
  detectMobileDevice
} from "@/utils/menuUtils";
import DesktopMenuCard from "./DesktopMenuCard";
import MobileMenuCard from "./MobileMenuCard";

// Dynamically import the GrabAndGoSection component
const GrabAndGoSection = dynamic(() => import("@/components/menu/GrabAndGoSection"), {
  loading: () => <div className="h-[50vh] bg-black"></div>,
  ssr: true
});

/**
 * MenusSection Component
 *
 * Displays all available menu types with cards that can be clicked to navigate to the menu pages.
 * Features separate layouts for desktop and mobile devices.
 *
 * @returns {JSX.Element} The rendered component
 */
export default function MenusSection() {
  // State for active menu tab
  const [activeMenu, setActiveMenu] = useState("a-la-carte");
  // State to track if device is mobile
  const [isMobile, setIsMobile] = useState(false);

  // Refs for tracking double clicks
  const clickTracking = useRef(createClickTracking());

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(detectMobileDevice());
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Handle menu card click with double-click detection
  const handleMenuCardClick = (menuId: string, url: string, e: React.MouseEvent) => {
    handleClick(menuId, url, e, clickTracking.current, setActiveMenu, DOUBLE_CLICK_TIMEOUT);
  };

  return (
    <>
      <section className="w-full bg-black pt-20 pb-10 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0" style={{ opacity: 0.13 }}>
          <div className="absolute inset-0" style={ANIMATED_BACKGROUND_STYLE}></div>
        </div>

        <div className="container-fluid mx-auto px-1 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-[#E6C78B]/30"></div>
                <svg className="w-10 h-10 text-[#E6C78B]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.1,13.34L3.91,9.16C2.35,7.59 2.35,5.06 3.91,3.5L10.93,10.5L8.1,13.34M14.88,11.53L13.41,13L20.29,19.88L18.88,21.29L12,14.41L5.12,21.29L3.71,19.88L13.47,10.12C12.76,8.59 13.26,6.44 14.85,4.85C16.76,2.93 19.5,2.57 20.96,4.03C22.43,5.5 22.07,8.24 20.15,10.15C18.56,11.74 16.41,12.24 14.88,11.53Z" />
                </svg>
              </div>
            </div>

            <h2 className="text-4xl md:text-6xl font-playfair mb-6 relative inline-block">
              <span className="text-[#E6C78B]">Our Menus</span>
              <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-[#E6C78B]/50"></div>
            </h2>

            <p className="text-lg md:text-xl font-montserrat text-white/80 max-w-3xl mx-auto leading-relaxed italic">
              Explore our diverse menu offerings, each crafted to provide a unique culinary experience
            </p>
          </div>

          {/* Desktop Menu cards in a single row */}
          <div className="relative hidden md:block">
            <div className="pb-4 mb-8 px-2 md:px-6 lg:px-10 xl:px-16">
              <div className="flex justify-between w-full">
                {MENU_TYPES.map((menu) => (
                  <DesktopMenuCard
                    key={menu.id}
                    menu={menu}
                    isActive={activeMenu === menu.id}
                    isMobile={isMobile}
                    onClick={(e) => handleMenuCardClick(menu.id, menu.url, e)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Menu cards - one per row */}
          <div className="md:hidden px-4">
            <div className="flex flex-col space-y-8">
              {MENU_TYPES.map((menu) => (
                <MobileMenuCard
                  key={menu.id}
                  menu={menu}
                  isActive={activeMenu === menu.id}
                  onClick={(e) => handleMenuCardClick(menu.id, menu.url, e)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Add custom CSS for animations */}
        <style jsx>{`
          ${BACKGROUND_ANIMATION_KEYFRAMES}
        `}</style>
      </section>

      {/* Add the Grab & Go section */}
      {/*
      <Suspense fallback={<div className="h-[50vh] bg-black"></div>}>
        <GrabAndGoSection />
      </Suspense>
      */}
    </>
  );
}
