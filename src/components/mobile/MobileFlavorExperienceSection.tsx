"use client";

import { memo } from "react";
import Image from "next/image";

/**
 * MobileFlavorExperienceSection Component
 * 
 * A mobile-optimized version of the Menu page flavor experience section
 */
const MobileFlavorExperienceSection = memo(function MobileFlavorExperienceSection() {
  // Flavor profiles data
  const flavorProfiles = [
    {
      id: "spicy",
      name: "Spicy",
      description: "Bold and fiery flavors that awaken the senses",
      icon: "/images/menu/icons/spicy.svg"
    },
    {
      id: "tangy",
      name: "Tangy",
      description: "Bright, acidic notes that add dimension",
      icon: "/images/menu/icons/tangy.svg"
    },
    {
      id: "aromatic",
      name: "Aromatic",
      description: "Complex spice blends that create depth",
      icon: "/images/menu/icons/aromatic.svg"
    },
    {
      id: "sweet",
      name: "Sweet",
      description: "Subtle sweetness that balances other flavors",
      icon: "/images/menu/icons/sweet.svg"
    }
  ];

  return (
    <section className="w-full bg-black py-12 relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/images/menu/spices-bg.jpg"
          alt="Spices background"
          fill
          sizes="100vw"
          className="object-cover"
          quality={60}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/80"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section heading */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-playfair text-white mb-2">The Flavor Experience</h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-[#E6C78B]/80 to-transparent mx-auto mb-4"></div>
          <p className="text-sm text-white/80 max-w-md mx-auto">
            Our dishes are crafted to balance these key flavor profiles
          </p>
        </div>
        
        {/* Flavor profiles grid - 2 columns for mobile */}
        <div className="grid grid-cols-2 gap-4">
          {flavorProfiles.map((profile) => (
            <div 
              key={profile.id}
              className="bg-black/60 border border-white/10 rounded-lg p-4 text-center"
            >
              {/* Icon */}
              <div className="w-12 h-12 mx-auto mb-3 relative">
                <Image
                  src={profile.icon}
                  alt={profile.name}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              
              {/* Name */}
              <h3 className="text-base font-playfair text-[#E6C78B] mb-1">{profile.name}</h3>
              
              {/* Description */}
              <p className="text-xs text-white/80">{profile.description}</p>
            </div>
          ))}
        </div>
        
        {/* Spice level indicator */}
        <div className="mt-10 bg-black/60 border border-white/10 rounded-lg p-4">
          <h3 className="text-base font-playfair text-white text-center mb-3">Spice Level Guide</h3>
          
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-1"></div>
              <span className="text-xs text-white/80">Mild</span>
            </div>
            
            <div className="text-center">
              <div className="w-4 h-4 bg-yellow-500 rounded-full mx-auto mb-1"></div>
              <span className="text-xs text-white/80">Medium</span>
            </div>
            
            <div className="text-center">
              <div className="w-4 h-4 bg-orange-500 rounded-full mx-auto mb-1"></div>
              <span className="text-xs text-white/80">Spicy</span>
            </div>
            
            <div className="text-center">
              <div className="w-4 h-4 bg-red-500 rounded-full mx-auto mb-1"></div>
              <span className="text-xs text-white/80">Very Spicy</span>
            </div>
          </div>
          
          <p className="text-xs text-white/60 text-center mt-3">
            Our servers can adjust spice levels to your preference
          </p>
        </div>
      </div>
    </section>
  );
});

export default MobileFlavorExperienceSection;
