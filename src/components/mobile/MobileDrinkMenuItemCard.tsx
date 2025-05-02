"use client";

import { memo } from 'react';
import { MenuItem, PriceOption } from '@/types/menu';

interface MobileDrinkMenuItemCardProps {
  item: MenuItem;
}

const MobileDrinkMenuItemCard = memo(function MobileDrinkMenuItemCard({ item }: MobileDrinkMenuItemCardProps) {
  // Check if price is a complex object (glass/bottle)
  const hasComplexPrice = typeof item.price === 'object';
  const priceObj = hasComplexPrice ? (item.price as PriceOption) : null;

  // Use either vegetarian or is_vegetarian property
  const isVegetarian = item.vegetarian !== undefined ? item.vegetarian :
                       item.is_vegetarian !== undefined ? item.is_vegetarian : true;

  return (
    <div className="relative bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden transition-all duration-300 active:bg-black/70 p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-playfair text-white">{item.name}</h3>

        {/* Price display - handles both simple and complex prices */}
        {!hasComplexPrice ? (
          <span className="text-[#E6C78B] font-medium text-base">{item.price as string}</span>
        ) : (
          <div className="flex flex-col items-end">
            {priceObj?.glass && (
              <span className="text-[#E6C78B] font-medium text-xs">
                Glass: {priceObj.glass}
              </span>
            )}
            {priceObj?.bottle && (
              <span className="text-[#E6C78B] font-medium text-xs">
                Bottle: {priceObj.bottle}
              </span>
            )}
          </div>
        )}
      </div>

      {item.description && (
        <p className="text-white/70 font-montserrat text-xs leading-relaxed">{item.description}</p>
      )}
    </div>
  );
});

export default MobileDrinkMenuItemCard;
