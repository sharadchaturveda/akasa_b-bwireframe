"use client";

import Image from "next/image"
;
import { useState, useRef } from "react";

interface MenuType {
  id: string;
  name: string;
  description: string;
  image: string;
  url: string;
}

export default function MenuCardRow() {
  // State for active menu tab
  const [activeMenu, setActiveMenu] = useState("a-la-carte");

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
    <div className="overflow-x-auto pb-8 mb-16">
      <div className="min-w-max px-4">
        <div className="flex flex-row space-x-10">
          {menuTypes.map((menu) => (
            <div 
              key={menu.id} 
              className="group cursor-pointer flex-shrink-0"
              style={{ width: "800px" }}
              onClick={(e) => handleMenuCardClick(menu.id, menu.url, e)}
            >
              <div className={`relative transition-all duration-500 transform ${
                activeMenu === menu.id ? 'scale-105' : ''
              } hover:scale-105`}>
                {/* Front of card */}
                <div className="relative overflow-hidden h-[450px] border border-[#E6C78B]/30 rounded-lg shadow-xl shadow-black/50">
                  <Image src={menu.image}
                    alt={menu.name}
                    fill
                    sizes="800px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    quality={90}
                  />

                  {/* Enhanced gradient overlay for better readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 pointer-events-none"></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-between">
                    {/* Top section with title and selected indicator */}
                    <div className="p-10 pt-10 flex flex-col">
                      <div className="relative mb-6">
                        {/* Title with improved visibility for longer titles */}
                        <div className="min-h-[70px] flex items-start">
                          <h3 className="text-4xl font-serif text-white font-semibold pr-16 leading-tight drop-shadow-lg">
                            {menu.name}
                          </h3>
                          {activeMenu === menu.id && (
                            <div className="absolute top-0 right-0 flex-shrink-0">
                              <div className="bg-[#E6C78B]/20 backdrop-blur-sm rounded-full p-2 border border-[#E6C78B]/50">
                                <svg className="w-10 h-10 text-[#E6C78B]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Description with more space */}
                      <p className="text-white/90 font-sans text-xl mb-8 min-h-[100px] leading-relaxed"
                         style={{
                           display: '-webkit-box',
                           WebkitLineClamp: 3,
                           WebkitBoxOrient: 'vertical',
                           overflow: 'hidden'
                         }}>
                        {menu.description}
                      </p>
                    </div>

                    {/* Bottom section with enhanced button */}
                    <div className="p-10 pt-0 relative z-[100]">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = menu.url;
                        }}
                        className="w-full bg-transparent hover:bg-[#E6C78B] text-[#E6C78B] hover:text-black border border-[#E6C78B] rounded-full py-5 px-10 transition-all duration-300 flex items-center justify-center group-hover:bg-[#E6C78B] group-hover:text-black shadow-lg shadow-black/30 hover:shadow-xl hover:shadow-black/40"
                      >
                        <span className="relative flex-1 text-center font-medium text-2xl group-hover:text-black transition-colors duration-300">
                          <span className="whitespace-nowrap">View Menu</span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add custom CSS for enhanced effects */}
      <style jsx>{`
        @keyframes glow {
          0% { box-shadow: 0 0 5px rgba(230, 199, 139, 0.3); }
          50% { box-shadow: 0 0 20px rgba(230, 199, 139, 0.5); }
          100% { box-shadow: 0 0 5px rgba(230, 199, 139, 0.3); }
        }
        
        .drop-shadow-lg {
          filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.4)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.2));
        }
      `}</style>
    </div>
  );
}








