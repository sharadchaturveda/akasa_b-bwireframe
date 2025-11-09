"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import {
  MENU_TYPES,
  ANIMATED_BACKGROUND_STYLE,
  BACKGROUND_ANIMATION_KEYFRAMES,
  DOUBLE_CLICK_TIMEOUT,
} from "@/constants/menuConstants";
import {
  createClickTracking,
  handleMenuCardClick as handleClick,
  detectMobileDevice,
} from "@/utils/menuUtils";
import DesktopMenuCard from "./DesktopMenuCard";
import MobileMenuCard from "./MobileMenuCard";
import Image from "next/image";
import Link from "next/link";

// Dynamically import the GrabAndGoSection component
const GrabAndGoSection = dynamic(
  () => import("@/components/menu/GrabAndGoSection"),
  {
    loading: () => <div className="h-[50vh] bg-black"></div>,
    ssr: true,
  }
);

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
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Handle menu card click with double-click detection
  const handleMenuCardClick = (
    menuId: string,
    url: string,
    e: React.MouseEvent
  ) => {
    handleClick(
      menuId,
      url,
      e,
      clickTracking.current,
      setActiveMenu,
      DOUBLE_CLICK_TIMEOUT
    );
  };

  return (
    <>
      <section className="w-full bg-black pt-20 pb-10 relative overflow-hidden">
        <div className="absolute inset-0" style={{ opacity: 0.13 }}>
          <div
            className="absolute inset-0"
            style={ANIMATED_BACKGROUND_STYLE}
          ></div>
        </div>

        <div className="container-fluid mx-auto px-1 relative z-10">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-[#E6C78B]/30"></div>
                <svg
                  className="w-10 h-10 text-[#E6C78B]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.1,13.34L3.91,9.16C2.35,7.59 2.35,5.06 3.91,3.5L10.93,10.5L8.1,13.34M14.88,11.53L13.41,13L20.29,19.88L18.88,21.29L12,14.41L5.12,21.29L3.71,19.88L13.47,10.12C12.76,8.59 13.26,6.44 14.85,4.85C16.76,2.93 19.5,2.57 20.96,4.03C22.43,5.5 22.07,8.24 20.15,10.15C18.56,11.74 16.41,12.24 14.88,11.53Z" />
                </svg>
              </div>
            </div>

            <h2 className="text-4xl md:text-6xl font-playfair mb-6 relative inline-block">
              <span className="text-[#E6C78B]">Our Menus</span>
              <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-[#E6C78B]/50"></div>
            </h2>

            <p className="text-lg md:text-xl font-montserrat text-white/80 max-w-3xl mx-auto leading-relaxed italic">
              Explore our diverse menu offerings, each crafted to provide a
              unique culinary experience
            </p>
          </div>

          {/* Festive Menu Special Section */}
          {/* <section className="w-full bg-gradient-to-b from-black to-[#0A0A0A] py-16 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[url('/images/menu/festive/bg-pattern.jpg')] bg-repeat opacity-30"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-[#100F0F] to-[#151413] p-6 md:p-10 rounded-xl border border-[#E6C78B]/20 shadow-2xl">
                <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                  <div className="inline-block mb-4 p-1 rounded-full bg-gradient-to-r from-[#E6C78B] to-[#CD9B3F]">
                    <div className="bg-[#100F0F] p-2 rounded-full">
                      <svg
                        className="w-6 h-6 text-[#E6C78B]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A9,9 0 0,0 21,12A9,9 0 0,0 12,3M12,19A7,7 0 0,1 5,12A7,7 0 0,1 12,5A7,7 0 0,1 19,12A7,7 0 0,1 12,19Z" />
                      </svg>
                    </div>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-playfair mb-4 text-[#E6C78B]">
                    Festive Menu <span className="text-white/90">Special</span>
                  </h3>

                  <p className="text-base md:text-lg text-white/70 mb-6 font-montserrat leading-relaxed">
                    Celebrate the season with our exclusive festive menu,
                    featuring traditional holiday favorites with an elegant
                    Akasa twist. Limited time only.
                  </p>
                  <div className="bg-[#E6C78B] text-black px-4 py-2 rounded-full text-xs sm:text-sm font-medium shadow-lg mb-4 text-center mx-auto">
                    Valid for Diwali: 2nd Oct - 8th Nov
                    <br />
                    <span className="font-bold">
                      Mithai Menu Available Year Round!
                    </span>
                  </div>

                  <div className="flex justify-center mt-2">
                    <Link
                      href="/menu/diwali"
                      className="inline-block px-6 py-3 bg-gradient-to-r from-[#E6C78B] via-[#D4B679] to-[#CD9B3F] text-black font-medium rounded-lg transform transition-transform hover:scale-105 hover:shadow-xl text-center w-full sm:w-auto max-w-xs"
                    >
                      <span className="flex items-center justify-center">
                        <svg
                          className="w-4 h-4 mr-2"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
                        </svg>
                        Explore our Diwali Menu
                      </span>
                    </Link>
                  </div>
                  <div className="flex justify-center mt-2">
                    <Link
                      href="/menu/mithai"
                      className="inline-block px-6 py-3 bg-gradient-to-r from-[#E6C78B] via-[#D4B679] to-[#CD9B3F] text-black font-medium rounded-lg transform transition-transform hover:scale-105 hover:shadow-xl text-center w-full sm:w-auto max-w-xs"
                    >
                      <span className="flex items-center justify-center">
                        <svg
                          className="w-4 h-4 mr-2"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
                        </svg>
                        Explore our Mithai Menu
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="md:w-1/2 max-md:hidden relative flex items-center justify-center">
                  <div className="w-full h-64 md:h-80 overflow-hidden rounded-lg relative flex items-end">
                    <Image
                      width={400}
                      height={300}
                      src="/images/menu/festive/image.png"
                      alt="Akasa Festive Menu Special"
                      className="w-full !h-full"
                      priority
                    />
                    <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-center">
                      <span className="px-3 py-1 bg-[#E6C78B] text-black text-sm font-bold rounded shadow-lg">
                        LIMITED TIME
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section> */}

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
