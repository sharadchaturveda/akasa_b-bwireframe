"use client";

import { memo } from "react";
import Image from "next/image";
import { MenuType } from "@/constants/menuConstants";

interface DesktopMenuCardProps {
  menu: MenuType;
  isActive: boolean;
  isMobile: boolean;
  onClick: (e: React.MouseEvent) => void;
}

/**
 * DesktopMenuCard Component
 * 
 * A card component for displaying menu options on desktop devices.
 * 
 * @param {DesktopMenuCardProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const DesktopMenuCard = memo(function DesktopMenuCard({
  menu,
  isActive,
  isMobile,
  onClick
}: DesktopMenuCardProps) {
  return (
    <div
      key={menu.id}
      className="group relative dish-card flex-shrink-0 flex flex-col w-[calc(100%/7-8px)] mx-[4px]"
      onClick={onClick}
    >
      <div className={`relative bg-black/80 border border-white/5 rounded-lg overflow-hidden ${!isMobile ? 'transition-colors duration-300 hover:border-[#E6C78B]/30' : ''} flex flex-col h-full`}>
        {/* Menu image with overlay effects */}
        <div className="relative h-[220px] overflow-hidden">
          <Image src={`${menu.image}?quality=60&width=400`}
            alt={menu.name}
            fill
            sizes="(max-width: 768px) 100vw, 14vw"
            className="object-cover"
            loading="lazy"
            quality={60}
            data-testid="image-component"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60"></div>

          {/* Active indicator */}
          {isActive && (
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
        <div className="p-4 relative flex flex-col flex-grow h-[220px]">
          <div className="flex justify-center items-start mb-3">
            <h3 className="text-lg font-playfair text-white text-center">{menu.name}</h3>
          </div>

          {/* Description - with more space */}
          <div className="mb-6">
            <p className="text-white/70 font-montserrat text-sm text-center line-clamp-4 h-20 overflow-hidden">
              {menu.description}
            </p>
          </div>

          {/* Button with hover effect - using standard site button styling */}
          <div className="mt-auto">
            <a href={menu.url} className="block w-full" onClick={(e) => e.stopPropagation()}>
              <button className="w-full rounded-full font-montserrat font-medium tracking-wider bg-[#1A2A3A] text-white px-4 py-2 text-sm shadow-md hover:bg-[#E6C78B] hover:text-black transition-colors duration-300">
                <span className="text-center font-medium tracking-wide w-full">
                  View Menu
                </span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});

export default DesktopMenuCard;
