"use client";

import { memo } from 'react';
import { FixedMenuItem } from '@/types/setLunchMenu';

interface MobileSetLunchFixedItemCardProps {
  item: FixedMenuItem;
}

const MobileSetLunchFixedItemCard = memo(function MobileSetLunchFixedItemCard({ item }: MobileSetLunchFixedItemCardProps) {
  return (
    <div className="relative bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden transition-all duration-300 active:bg-black/70 p-4">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          {/* Vegetarian/Non-vegetarian indicator */}
          <span className="mr-2 text-base">
            {item.is_vegetarian ? '🟢' : '🔴'}
          </span>
          <h3 className="text-lg font-playfair text-white">{item.name}</h3>
        </div>
      </div>
      
      {item.description && (
        <p className="text-white/70 font-montserrat text-xs pl-6 leading-relaxed mt-1">{item.description}</p>
      )}
    </div>
  );
});

export default MobileSetLunchFixedItemCard;
