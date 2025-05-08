"use client";

import { memo } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface SpiceCardProps {
  /**
   * The title of the card
   */
  title: string;
  
  /**
   * The subtitle of the card
   */
  subtitle: string;
  
  /**
   * The description of the card
   */
  description: string;
  
  /**
   * The animation delay in seconds
   */
  animationDelay: string;
  
  /**
   * The URL to link to
   */
  linkUrl: string;
  
  /**
   * The text for the button
   */
  buttonText: string;
}

/**
 * SpiceCard Component
 * 
 * A card component for displaying spice information in the SpicesSection.
 * 
 * @param {SpiceCardProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const SpiceCard = memo(function SpiceCard({
  title,
  subtitle,
  description,
  animationDelay,
  linkUrl,
  buttonText
}: SpiceCardProps) {
  return (
    <div className="bg-black/70 p-8 rounded-lg border border-[#E6C78B]/20 shadow-2xl backdrop-blur-sm animate-fadeSlideUp relative flex flex-col h-full" style={{ animationDelay }}>
      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-[#E6C78B]/30"></div>
      <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-[#E6C78B]/30"></div>

      <span className="text-[#E6C78B] text-sm tracking-widest uppercase mb-2 block font-montserrat">Spices</span>
      <h2 className="text-3xl font-playfair mb-2 text-white" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{title}</h2>

      <div className="w-16 h-[1px] bg-gradient-to-r from-[#E6C78B]/80 to-transparent mb-4"></div>

      <h3 className="text-xl font-playfair mb-2 text-white/90">{subtitle}</h3>
      <p className="text-base font-montserrat mb-8 text-white/90">{description}</p>

      <div className="flex flex-col gap-4 w-full mt-auto">
        <Link href={linkUrl} className="w-full flex justify-center">
          <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-full px-4 sm:px-6 py-2 sm:py-3 text-center shadow-lg text-sm sm:text-base">
            {buttonText}
          </Button>
        </Link>
      </div>
    </div>
  );
});

export default SpiceCard;
