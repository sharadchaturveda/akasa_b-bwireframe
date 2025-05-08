"use client";

import { useState, useRef, memo } from "react";
import { MenuType } from '@/types/menu';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';
import MenuCard from './MenuCard';

/**
 * MenusSection Component
 *
 * A section component for displaying menu types.
 *
 * @returns {JSX.Element} The rendered component
 */
const MenusSection = memo(function MenusSection() {
  // State for active menu tab
  const [activeMenu, setActiveMenu] = useState("a-la-carte");

  // Use the device detection hook
  const { isMobile } = useDeviceDetection();

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

  return (
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
            <MenuCard
              key={menu.id}
              menu={menu}
              isActive={activeMenu === menu.id}
              isMobile={isMobile}
              onClick={(e) => handleMenuCardClick(menu.id, menu.url, e)}
            />
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
  );
});

export default MenusSection;
