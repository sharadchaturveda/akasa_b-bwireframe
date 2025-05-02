"use client";

import { memo } from 'react';
import { MenuItem, PriceOption } from '@/types/menu';

interface DrinkMenuItemCardProps {
  item: MenuItem;
}

const DrinkMenuItemCard = memo(function DrinkMenuItemCard({ item }: DrinkMenuItemCardProps) {
  // Check if price is a complex object (glass/bottle)
  const hasComplexPrice = typeof item.price === 'object';
  const priceObj = hasComplexPrice ? (item.price as PriceOption) : null;

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
            <h3 className="text-xl font-playfair text-white group-hover:text-[#E6C78B] transition-colors duration-300 pr-2 flex-1">{item.name}</h3>

            {/* Price display - handles both simple and complex prices */}
            {!hasComplexPrice ? (
              <span className="text-[#E6C78B] font-medium text-lg">{item.price as string}</span>
            ) : (
              <div className="flex flex-col items-end min-w-[100px] text-right">
                {priceObj?.glass && (
                  <div className="flex justify-between items-center gap-2 mb-1">
                    <span className="text-white/60 text-xs uppercase tracking-wider">Glass</span>
                    <span className="text-[#E6C78B] font-medium text-sm">{priceObj.glass}</span>
                  </div>
                )}
                {priceObj?.bottle && (
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-white/60 text-xs uppercase tracking-wider">Bottle</span>
                    <span className="text-[#E6C78B] font-medium text-sm">{priceObj.bottle}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {item.description && (
            <p className="text-white/70 font-montserrat text-sm mb-2 leading-relaxed">{item.description}</p>
          )}
        </div>
      </div>
    </div>
  );
});

export default DrinkMenuItemCard;
