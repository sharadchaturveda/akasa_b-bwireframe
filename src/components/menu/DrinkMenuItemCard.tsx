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
      <div className="relative bg-black/80 border border-white/5 rounded-lg overflow-hidden transition-colors duration-300 hover:border-[#E6C78B]/30">
        <div className="p-6 relative">

          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-playfair text-white pr-2 flex-1">{item.name}</h3>

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
                  <div className="flex justify-between items-center gap-2 mb-1">
                    <span className="text-white/60 text-xs uppercase tracking-wider">Bottle</span>
                    <span className="text-[#E6C78B] font-medium text-sm">{priceObj.bottle}</span>
                  </div>
                )}
                {priceObj?.pour_30ml && (
                  <div className="flex justify-between items-center gap-2 mb-1">
                    <span className="text-white/60 text-xs uppercase tracking-wider">30ml</span>
                    <span className="text-[#E6C78B] font-medium text-sm">{priceObj.pour_30ml}</span>
                  </div>
                )}
                {priceObj?.bottle_larger && (
                  <div className="flex justify-between items-center gap-2 mb-1">
                    <span className="text-white/60 text-xs uppercase tracking-wider">Bottle</span>
                    <span className="text-[#E6C78B] font-medium text-sm">{priceObj.bottle_larger}</span>
                  </div>
                )}
                {priceObj?.bottle_500ml && (
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-white/60 text-xs uppercase tracking-wider">500ml</span>
                    <span className="text-[#E6C78B] font-medium text-sm">{priceObj.bottle_500ml}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {item.description && (
            <p className="text-white/70 font-montserrat text-sm mb-2 leading-relaxed">{item.description}</p>
          )}

          {/* Variants if available */}
          {item.variants && item.variants.length > 0 && (
            <div className="mt-2 border-t border-white/10 pt-2">
              {item.variants.map((variant, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-white/60 font-montserrat">{variant.type}</span>
                  <span className="text-[#E6C78B] font-medium">
                    {typeof variant.price === 'number' ? `$${variant.price}` : variant.price}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default DrinkMenuItemCard;
