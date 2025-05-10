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
      <div className="relative bg-black/80 border border-white/5 rounded-lg overflow-hidden transition-colors duration-300 hover:border-[#E6C78B]/30">
        <div className="p-6 relative">

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
              <h3 className="text-xl font-playfair text-white">{item.name}</h3>
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
