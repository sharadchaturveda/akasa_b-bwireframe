"use client";

import { memo } from 'react';
import Image from "next/image";
import { MenuType } from '@/types/menu';

interface MenuCardProps {
  /**
   * The menu data to display
   */
  menu: MenuType;
  
  /**
   * Whether this menu is active
   */
  isActive: boolean;
  
  /**
   * Whether the device is mobile
   */
  isMobile: boolean;
  
  /**
   * Function to handle card click
   */
  onClick: (e: React.MouseEvent) => void;
}

/**
 * MenuCard Component
 * 
 * A card component for displaying menu types in the menus section.
 * 
 * @param {MenuCardProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const MenuCard = memo(function MenuCard({
  menu,
  isActive,
  isMobile,
  onClick
}: MenuCardProps) {
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
    <div
      className="group relative dish-card flex flex-col w-full sm:w-1/2 lg:w-1/3 xl:w-1/5 px-3 mb-6"
      onClick={onClick}
    >
      {/* Card background with subtle glow effect - only on desktop */}
      {!isMobile && (
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E6C78B]/0 via-[#E6C78B]/30 to-[#E6C78B]/0 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
      )}

      <div className={`relative bg-black/80 backdrop-blur-sm border border-white/5 rounded-lg overflow-hidden ${!isMobile ? 'transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(230,199,139,0.2)]' : ''} flex flex-col h-full`}>
        {/* Menu image with overlay effects */}
        <div className="relative h-[180px] overflow-hidden">
          <Image
            src={`${menu.image}?quality=75&width=800`}
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
          {isActive && (
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
              {renderButton()}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MenuCard;
