"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamically import the GrabAndGoSection component
const GrabAndGoSection = dynamic(() => import("@/components/menu/GrabAndGoSection"), {
  loading: () => <div className="h-[50vh] bg-black"></div>,
  ssr: true
});

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
  const renderButton = () => {
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
      // Desktop button - simplified for better performance
      return (
        <button className="w-full items-center justify-center rounded-full font-montserrat font-medium tracking-wider transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative bg-[#1A2A3A] hover:bg-[#E6C78B] text-white hover:text-black px-4 py-2 text-sm">
          <span className="flex-1 text-center font-medium tracking-wide w-full">
            View Menu
          </span>
        </button>
      );
    }
  };

  return (
    <>
      <section className="w-full bg-black py-20 relative overflow-hidden">
        {/* Static background pattern for better performance */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e6c78b' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

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
              <span className="text-[#E6C78B]">Our Menus</span>
              <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-[#E6C78B]/50"></div>
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
                {/* Removed card glow effect for better performance */}

                <div className={`relative bg-black/80 border border-white/5 rounded-lg overflow-hidden ${!isMobile ? 'transition-colors duration-300 hover:border-[#E6C78B]/30' : ''} flex flex-col h-full`}>
                  {/* Menu image with overlay effects */}
                  <div className="relative h-[180px] overflow-hidden">
                    <Image src={`${menu.image}?quality=60&width=800`}
                      alt={menu.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                      className="object-cover"
                      loading="lazy"
                      quality={60}
                      data-testid="image-component"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60"></div>

                    {/* Active indicator */}
                    {activeMenu === menu.id && (
                      <div className="absolute top-4 right-4 z-10">
                        <div className="bg-[#E6C78B]/20 rounded-full p-2 border border-[#E6C78B]/50">
                          <svg className="w-5 h-5 text-[#E6C78B]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Menu content */}
                  <div className="p-4 relative flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-playfair text-white">{menu.name}</h3>
                    </div>

                    {/* Description container */}
                    <div className="mb-3 flex-grow">
                      <p className="text-white/70 font-montserrat text-xs leading-relaxed">{menu.description}</p>
                    </div>

                    {/* Button with hover effect - using standard site button styling */}
                    <div className="mt-auto">
                      <a href={menu.url} className="block w-full" onClick={(e) => e.stopPropagation()}>
                        {renderButton()}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Removed custom CSS for animations */}
      </section>

      {/* Add the Grab & Go section */}
      <Suspense fallback={<div className="h-[50vh] bg-black"></div>}>
        <GrabAndGoSection />
      </Suspense>
    </>
  );
}


