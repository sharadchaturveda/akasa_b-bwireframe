"use client";

import { memo } from 'react';
import { MenuItem } from '@/types/menu';

interface BarBiteMenuItemCardProps {
  item: MenuItem;
}

const BarBiteMenuItemCard = memo(function BarBiteMenuItemCard({ item }: BarBiteMenuItemCardProps) {
  // Special case for Kathi Roll which has both veg and non-veg options
  const isKathiRoll = item.name === "Kathi Roll";
  
  // Use either vegetarian or is_vegetarian property
  const isVegetarian = item.vegetarian !== undefined ? item.vegetarian : 
                       item.is_vegetarian !== undefined ? item.is_vegetarian : true;

  return (
    <div className="group relative">
      {/* Card background with subtle glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E6C78B]/0 via-[#E6C78B]/30 to-[#E6C78B]/0 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
      
      <div className="relative bg-black/80 backdrop-blur-sm border border-white/5 rounded-lg overflow-hidden transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(230,199,139,0.2)]">
        <div className="p-6 relative">
          {/* Decorative corner accent */}
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-[#E6C78B]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center">
              {/* Vegetarian/Non-vegetarian indicator */}
              {isKathiRoll ? (
                <span className="mr-2 text-lg">
                  🟢/🔴
                </span>
              ) : (
                <span className="mr-2 text-lg">
                  {isVegetarian ? '🟢' : '🔴'}
                </span>
              )}
              <h3 className="text-xl font-playfair text-white group-hover:text-[#E6C78B] transition-colors duration-300">{item.name}</h3>
            </div>
            <span className="text-[#E6C78B] font-medium text-lg">{item.price as string}</span>
          </div>
          
          <p className="text-white/70 font-montserrat text-sm mb-2 leading-relaxed">{item.description}</p>
          
          {/* Special note for Kathi Roll */}
          {isKathiRoll && (
            <p className="text-[#E6C78B]/80 font-montserrat text-xs italic mt-2">
              Available in vegetarian and non-vegetarian options
            </p>
          )}
        </div>
      </div>
    </div>
  );
});

export default BarBiteMenuItemCard;
