"use client";

import { memo } from 'react';
import SpiceCard from './SpiceCard';

/**
 * SpicesSection Component
 *
 * A section component for displaying spice information.
 *
 * @returns {JSX.Element} The rendered component
 */
const SpicesSection = memo(function SpicesSection() {
  // Spice card data
  const spiceCards = [
    {
      title: "Rooted in Purity",
      subtitle: "The Origin of Flavor",
      description: "We handpick ingredients from trusted farms, ethical suppliers, and ancient markets. From sun-dried turmeric to wild-foraged pepper, every flavor begins with care.",
      animationDelay: "0.1s",
      linkUrl: "/menu",
      buttonText: "Explore Our Menus"
    },
    {
      title: "Regions of Spice",
      subtitle: "Flavors That Travel",
      description: "India is a mosaic of spice cultures. Our dishes carry notes from Rajasthan's red chili heat, Punjab's rich warmth, and Kashmir's fragrant saffron. Every plate is a journey.",
      animationDelay: "0.3s",
      linkUrl: "/menu",
      buttonText: "Explore Our Menus"
    },
    {
      title: "Crafted With Fire",
      subtitle: "The Akasa Method",
      description: "We roast, grind, toast, and temper spices in-house. No shortcuts. Just ancient techniques and instinct-driven craft. It's not just food—it's a ritual.",
      animationDelay: "0.5s",
      linkUrl: "/menu",
      buttonText: "Explore Our Menus"
    }
  ];

  return (
    <section className="min-h-screen sm:h-screen w-full bg-cover bg-center relative py-16 sm:py-0 overflow-hidden" style={{ backgroundImage: "url('/images/home/gallery/awards.jpg')" }}>
      {/* Enhanced overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>

      {/* Subtle animated particles */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-[#E6C78B] animate-float" style={{ animationDuration: '15s' }}></div>
        <div className="absolute top-1/3 left-2/3 w-1 h-1 rounded-full bg-[#E6C78B] animate-float" style={{ animationDuration: '20s' }}></div>
        <div className="absolute top-2/3 left-1/3 w-1 h-1 rounded-full bg-[#E6C78B] animate-float" style={{ animationDuration: '25s' }}></div>
      </div>

      {/* Content container */}
      <div className="relative h-full w-full flex items-center justify-center z-10">
        <div className="container mx-auto px-4 md:px-8">
          {/* Grid for the three cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {spiceCards.map((card, index) => (
              <SpiceCard
                key={index}
                title={card.title}
                subtitle={card.subtitle}
                description={card.description}
                animationDelay={card.animationDelay}
                linkUrl={card.linkUrl}
                buttonText={card.buttonText}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default SpicesSection;
