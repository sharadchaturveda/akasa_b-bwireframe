"use client";

import { memo } from "react";
import { CHEF_INFO, CHEF_COLORS } from "@/constants/chefConstants";

/**
 * ChefAchievementBadge Component
 * 
 * Renders a single achievement badge for the chef.
 * 
 * @param {Object} props - The component props
 * @param {string} props.text - The achievement text
 * @returns {JSX.Element} The rendered component
 */
const ChefAchievementBadge = memo(function ChefAchievementBadge({ text }: { text: string }) {
  const { darkBlue, gold } = CHEF_COLORS;
  
  return (
    <div className="group relative overflow-hidden">
      <div className={`relative px-5 py-3 bg-[${darkBlue}] border border-[${gold}]/30 rounded-full flex items-center hover:bg-[${darkBlue}]/80 transition-colors duration-300`}>
        <span className={`w-2 h-2 rounded-full bg-[${gold}] mr-2`}></span>
        <span className="text-sm text-white/90">{text}</span>
      </div>
    </div>
  );
});

/**
 * ChefBio Component
 * 
 * Renders the chef's biography and achievements.
 * 
 * @returns {JSX.Element} The rendered component
 */
const ChefBio = memo(function ChefBio() {
  const { name, bio, achievements } = CHEF_INFO;
  const { gold } = CHEF_COLORS;
  
  return (
    <div className="relative">
      {/* Decorative elements */}
      <div className="absolute -top-6 left-0 w-20 h-1 bg-gradient-to-r from-[#E6C78B] to-transparent"></div>
      <div className="absolute -bottom-6 right-0 w-20 h-1 bg-gradient-to-l from-[#E6C78B] to-transparent"></div>

      <div className="p-8 bg-black/40 backdrop-blur-md border border-white/5 rounded-lg shadow-2xl">
        <h1 className="text-4xl md:text-6xl font-playfair mb-6 relative inline-block">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">Meet Our Chef</span>
          <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-[#E6C78B] to-transparent"></div>
        </h1>

        <h2 className="text-2xl md:text-3xl font-playfair mb-8 text-[#E6C78B]">{name}</h2>

        {/* First paragraph with special first letter styling */}
        <p className="text-base md:text-lg font-montserrat mb-6 text-white/90 leading-relaxed first-letter:text-4xl first-letter:font-playfair first-letter:text-[#E6C78B] first-letter:mr-1 first-letter:float-left">
          {bio[0]}
        </p>

        {/* Second paragraph */}
        <p className="text-base md:text-lg font-montserrat mb-8 text-white/90 leading-relaxed">
          {bio[1]}
        </p>

        {/* Achievement badges */}
        <div className="flex flex-wrap gap-4 mb-6">
          {achievements.map((achievement, index) => (
            <ChefAchievementBadge key={index} text={achievement} />
          ))}
        </div>

        {/* Decorative element instead of signature */}
        <div className="mt-8 text-right">
          <div className="inline-block w-16 h-0.5 bg-gradient-to-r from-[#E6C78B] to-transparent"></div>
        </div>
      </div>
    </div>
  );
});

export default ChefBio;
