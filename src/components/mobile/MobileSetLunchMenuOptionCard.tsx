"use client";

import { memo } from 'react';
import { MenuOption } from '@/types/setLunchMenu';

interface MobileSetLunchMenuOptionCardProps {
  option: MenuOption;
}

const MobileSetLunchMenuOptionCard = memo(function MobileSetLunchMenuOptionCard({ option }: MobileSetLunchMenuOptionCardProps) {
  return (
    <div className="relative bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden transition-all duration-300 active:bg-black/70 p-4">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          {/* Vegetarian/Non-vegetarian indicator */}
          <span className="mr-2 text-base">
            {option.is_vegetarian ? '🟢' : '🔴'}
          </span>
          <h3 className="text-lg font-playfair text-white pr-2 flex-1">{option.name}</h3>
        </div>
        {option.surcharge && (
          <span className="text-[#E6C78B] font-medium text-base">{option.surcharge}</span>
        )}
      </div>
      
      {option.description && (
        <p className="text-white/70 font-montserrat text-xs pl-6 leading-relaxed mt-1">{option.description}</p>
      )}
    </div>
  );
});

export default MobileSetLunchMenuOptionCard;
