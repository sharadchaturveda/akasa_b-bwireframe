"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image"
;
import { Button } from "@/components/ui/button";
import GrabAndGoSection from "@/components/menu/GrabAndGoSection";

interface MenuType {
  id: string;
  name: string;
  description: string;
  image: string;
  url: string;
}

export default function MenusSection() {
  // State for active menu tab
  const [activeMenu, setActiveMenu] = useState("a-la-carte");
  // State to track if device is mobile
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device on client side
  useEffect(() => {
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
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Refs for tracking double clicks
  const clickTimers = useRef<{ [key: string]: number }>({});
  const clickCounts = useRef<{ [key: string]: number }>({});

  // Handle menu card click with double-click detection
  const handleMenuCardClick = (menuId: string, url: string, e: React.MouseEvent) => {
    // Only process if the click is directly on the card and not on a button
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('button') === null) {
      // Set this menu as active
      setActiveMenu(menuId);

      // Initialize click count if not already set
      if (!clickCounts.current[menuId]) {
        clickCounts.current[menuId] = 0;
      }

      // Increment click count
      clickCounts.current[menuId]++;

      // Clear any existing timer
      if (clickTimers.current[menuId]) {
        window.clearTimeout(clickTimers.current[menuId]);
      }

      // If this is the second click (double-click)
      if (clickCounts.current[menuId] === 2) {
        // Navigate to the menu page
        window.location.href = url;
        // Reset click count
        clickCounts.current[menuId] = 0;
      } else {
        // Set a timer to reset the click count after 300ms (standard double-click time)
        clickTimers.current[menuId] = window.setTimeout(() => {
          clickCounts.current[menuId] = 0;
        }, 300);
      }
    }
  };

  // Menu types
  const menuTypes: MenuType[] = [
    { id: "a-la-carte", name: "À La Carte", description: "Our signature dishes available for individual selection", image: "/images/menu/a-la-carte/hero/hero.jpg", url: "/menu/a-la-carte" },
    { id: "soul-food", name: "Soul Food Weekends", description: "Special weekend offerings that nourish the soul", image: "/images/menu/soul-food-weekends/hero/hero.jpg", url: "/menu/soul-food-weekends" },
    { id: "drinks", name: "Drinks", description: "Signature cocktails, fine wines, and refreshing beverages", image: "/images/menu/drinks/hero/hero.jpg", url: "/menu/drinks" },
    { id: "bar-bites", name: "Bar Bites", description: "Perfect small plates to accompany your drinks", image: "/images/menu/bar-bites/hero/hero.jpg", url: "/menu/bar-bites" },
    { id: "set-lunch", name: "3 Course Set Lunch", description: "A perfect midday dining experience with three exquisite courses", image: "/images/menu/set-lunch/hero/hero.jpg", url: "/menu/set-lunch" }
  ];

  // Render different button styles based on device type
  const renderButton = (url: string) => {
    if (isMobile) {
      // Mobile button - completely static with no hover effects or animations
      return (
        <button className="w-full rounded-full font-montserrat font-medium tracking-wider bg-[#1A2A3A] text-white px-4 py-2 text-sm shadow-md">
          <span className="text-center font-medium tracking-wide w-full">
            View Menu
          </span>
        </button>
      );
    } else {
      // Desktop button - with hover effects and animations
      return (
        <button className="w-full group items-center justify-center rounded-full font-montserrat font-medium tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden shadow-md hover:shadow-lg bg-[#1A2A3A] text-white px-4 py-2 text-sm hover:bg-[#1A2A3A]">
          <span className="absolute inset-0 rounded-full bg-[#E6C78B] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
          <span className="relative flex-1 text-center font-medium tracking-wide w-full group-hover:text-black transition-colors duration-300">
            View Menu
          </span>
        </button>
      );
    }
  };

  return (
    <>
      <section className="w-full bg-black py-20 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e6c78b' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
            animation: 'slideBackground 60s linear infinite'
          }}></div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#E6C78B]/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-[#E6C78B]/10 to-transparent rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E6C78B] to-[#D4B679]">Our Menus</span>
              <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#E6C78B]/80 to-transparent"></div>
            </h2>

            <p className="text-lg md:text-xl font-montserrat text-white/80 max-w-3xl mx-auto leading-relaxed italic">
              Explore our diverse menu offerings, each crafted to provide a unique culinary experience
            </p>
          </div>

          {/* Menu cards in a flex layout with fixed width to ensure 5 in a row */}
          <div className="flex flex-wrap justify-center">
            {menuTypes.map((menu) => (
              <div
                key={menu.id}
                className="group relative dish-card flex flex-col w-full sm:w-1/2 lg:w-1/3 xl:w-1/5 px-3 mb-6"
                onClick={(e) => handleMenuCardClick(menu.id, menu.url, e)}
              >
                {/* Card background with subtle glow effect - only on desktop */}
                {!isMobile && (
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E6C78B]/0 via-[#E6C78B]/30 to-[#E6C78B]/0 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                )}

                <div className={`relative bg-black/80 backdrop-blur-sm border border-white/5 rounded-lg overflow-hidden ${!isMobile ? 'transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(230,199,139,0.2)]' : ''} flex flex-col h-full`}>
                  {/* Menu image with overlay effects */}
                  <div className="relative h-[180px] overflow-hidden">
                    <Image src={`${menu.image}?quality=75&width=800`}
                      alt={menu.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={`object-cover ${!isMobile ? 'transition-transform duration-700 group-hover:scale-110' : ''}`}
                      loading="lazy"
                      quality={75}
                      data-testid="image-component"
                    />
                    
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 ${!isMobile ? 'group-hover:opacity-40 transition-opacity duration-500' : ''}`}></div>
                    
                    {/* Active indicator */}
                    {activeMenu === menu.id && (
                      <div className="absolute top-4 right-4 z-10">
                        <div className="bg-[#E6C78B]/20 backdrop-blur-sm rounded-full p-2 border border-[#E6C78B]/50">
                          <svg className="w-5 h-5 text-[#E6C78B]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* Decorative corner accent - only on desktop */}
                    {!isMobile && (
                      <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-[#E6C78B]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    )}
                  </div>

                  {/* Menu content */}
                  <div className="p-4 relative flex flex-col flex-grow">
                    {/* Decorative corner accent - only on desktop */}
                    {!isMobile && (
                      <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-[#E6C78B]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    )}

                    <div className="flex justify-between items-start mb-2">
                      <h3 className={`text-lg font-playfair text-white ${!isMobile ? 'group-hover:text-[#E6C78B] transition-colors duration-300' : ''}`}>{menu.name}</h3>
                    </div>

                    {/* Description container */}
                    <div className="mb-3 flex-grow">
                      <p className="text-white/70 font-montserrat text-xs leading-relaxed">{menu.description}</p>
                    </div>

                    {/* Button with hover effect - using standard site button styling */}
                    <div className="mt-auto">
                      <a href={menu.url} className="block w-full" onClick={(e) => e.stopPropagation()}>
                        {renderButton(menu.url)}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add custom CSS for animations */}
        <style jsx>{`
          @keyframes slideBackground {
            0% { background-position: 0 0; }
            100% { background-position: 100% 100%; }
          }
        `}</style>
      </section>
      
      {/* Add the Grab & Go section */}
      <GrabAndGoSection />
    </>
  );
}


