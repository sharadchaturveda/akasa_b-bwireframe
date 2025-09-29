"use client";

import { memo } from 'react';
import { MenuItem } from '@/types/menu';

interface MithaiMenuItemCardProps {
  item: MenuItem;
}

const MithaiMenuItemCard = memo(function MithaiMenuItemCard({ item }: MithaiMenuItemCardProps) {
  // Use either vegetarian or is_vegetarian property
  const isVegetarian = item.vegetarian !== undefined ? item.vegetarian :
                       item.is_vegetarian !== undefined ? item.is_vegetarian : true;

  return (
    <div className="group relative">
      <div className="relative bg-black/80 border border-white/5 rounded-lg overflow-hidden transition-colors duration-300 hover:border-[#E6C78B]/30">
        <div className="p-6 relative">

          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center">
              {/* Vegetarian indicator */}
              <span className="mr-2 text-lg">
                {isVegetarian ? '🟢' : '🔴'}
              </span>
              <h3 className="text-xl font-playfair text-white">{item.name}</h3>
            </div>
            <span className="text-[#E6C78B] font-medium text-lg">{item.price as string}</span>
          </div>

          <p className="text-white/70 font-montserrat text-sm mb-2 leading-relaxed">{item.description}</p>
          
          {/* Allergen information */}
          {item.allergens && (
            <p className="text-amber-300/80 font-montserrat text-xs italic mt-3 border-t border-amber-300/20 pt-2">
              Allergens: {item.allergens}
            </p>
          )}
        </div>
      </div>
    </div>
  );
});

export default MithaiMenuItemCard;
