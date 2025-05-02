"use client";

import { memo } from 'react';
import { MenuItem } from '@/types/menu';

interface MobileBarBiteMenuItemCardProps {
  item: MenuItem;
}

const MobileBarBiteMenuItemCard = memo(function MobileBarBiteMenuItemCard({ item }: MobileBarBiteMenuItemCardProps) {
  // Special case for Kathi Roll which has both veg and non-veg options
  const isKathiRoll = item.name === "Kathi Roll";
  
  // Use either vegetarian or is_vegetarian property
  const isVegetarian = item.vegetarian !== undefined ? item.vegetarian : 
                       item.is_vegetarian !== undefined ? item.is_vegetarian : true;

  return (
    <div className="relative bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden transition-all duration-300 active:bg-black/70 p-4">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          {/* Vegetarian/Non-vegetarian indicator */}
          {isKathiRoll ? (
            <span className="mr-2 text-base">
              🟢/🔴
            </span>
          ) : (
            <span className="mr-2 text-base">
              {isVegetarian ? '🟢' : '🔴'}
            </span>
          )}
          <h3 className="text-lg font-playfair text-white">{item.name}</h3>
        </div>
        <span className="text-[#E6C78B] font-medium text-base">{item.price as string}</span>
      </div>
      
      <p className="text-white/70 font-montserrat text-xs pl-6 leading-relaxed">{item.description}</p>
      
      {/* Special note for Kathi Roll */}
      {isKathiRoll && (
        <p className="text-[#E6C78B]/80 font-montserrat text-xs italic mt-2 pl-6">
          Available in vegetarian and non-vegetarian options
        </p>
      )}
    </div>
  );
});

export default MobileBarBiteMenuItemCard;
