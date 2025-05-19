"use client";

import { memo } from "react";
import Image from "next/image";
import { MenuType } from "@/constants/menuConstants";

interface MobileMenuCardProps {
  menu: MenuType;
  isActive: boolean;
  onClick: (e: React.MouseEvent) => void;
}

/**
 * MobileMenuCard Component
 * 
 * A card component for displaying menu options on mobile devices.
 * 
 * @param {MobileMenuCardProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const MobileMenuCard = memo(function MobileMenuCard({
  menu,
  isActive,
  onClick
}: MobileMenuCardProps) {
  return (
    <div
      key={menu.id}
      className="group cursor-pointer mx-auto w-full max-w-sm"
      onClick={onClick}
    >
      <div className={`relative transition-all duration-500 transform ${
        isActive ? 'scale-[1.02]' : ''
      } hover:scale-[1.02]`}>
        {/* Card with equal parts image and content */}
        <div className="relative overflow-hidden border border-[#E6C78B]/30 rounded-lg shadow-lg shadow-black/30 bg-black/80 backdrop-blur-sm">
          {/* Image section - 50% of card height */}
          <div className="relative w-full aspect-square">
            <Image
              src={menu.image}
              alt={menu.name}
              fill
              sizes="(max-width: 640px) 100vw, 384px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              quality={80}
            />

            {/* Selected indicator */}
            {isActive && (
              <div className="absolute top-2 right-2 z-10">
                <div className="bg-[#E6C78B]/20 backdrop-blur-sm rounded-full p-1 border border-[#E6C78B]/50">
                  <svg className="w-6 h-6 text-[#E6C78B]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* Content section - 50% of card height */}
          <div className="p-6">
            <h3 className="text-2xl font-serif text-white font-semibold mb-3 group-hover:text-[#E6C78B] transition-colors duration-300 text-center">
              {menu.name}
            </h3>

            <p className="text-white/80 text-sm mb-5 line-clamp-3 text-center">
              {menu.description}
            </p>

            <a href={menu.url} className="block w-full" onClick={(e) => e.stopPropagation()}>
              <button className="w-full bg-transparent hover:bg-[#E6C78B] text-[#E6C78B] hover:text-black border border-[#E6C78B] rounded-full py-3 px-6 transition-all duration-300 flex items-center justify-center">
                <span className="relative flex-1 text-center font-medium text-base">
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

export default MobileMenuCard;
