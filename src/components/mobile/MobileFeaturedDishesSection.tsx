"use client";

import { memo, useState } from "react";
import Image from "next/image";

/**
 * MobileFeaturedDishesSection Component
 * 
 * A mobile-optimized version of the Menu page featured dishes section
 */
const MobileFeaturedDishesSection = memo(function MobileFeaturedDishesSection() {
  // Featured dishes data
  const featuredDishes = [
    {
      id: "butter-chicken",
      name: "Butter Chicken",
      description: "Tender chicken in a rich, creamy tomato sauce with aromatic spices",
      image: "/images/menu/butter-chicken.jpg",
      price: "$24",
      spiceLevel: "Medium",
      tags: ["Signature", "Popular"]
    },
    {
      id: "lamb-biryani",
      name: "Lamb Biryani",
      description: "Fragrant basmati rice layered with tender lamb and saffron",
      image: "/images/menu/biryani.jpg",
      price: "$28",
      spiceLevel: "Medium-Spicy",
      tags: ["Chef's Special"]
    },
    {
      id: "paneer-tikka",
      name: "Paneer Tikka",
      description: "Marinated cottage cheese, bell peppers, and onions grilled in the tandoor",
      image: "/images/menu/paneer-tikka.jpg",
      price: "$18",
      spiceLevel: "Mild",
      tags: ["Vegetarian"]
    }
  ];
  
  // State for current dish index
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Get current dish
  const currentDish = featuredDishes[currentIndex];
  
  // Handle navigation
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? featuredDishes.length - 1 : prev - 1));
  };
  
  const goToNext = () => {
    setCurrentIndex((prev) => (prev === featuredDishes.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full bg-black py-12 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black"></div>
      
      {/* Subtle animated particles */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-[#E6C78B] animate-float" style={{ animationDuration: '15s' }}></div>
        <div className="absolute top-1/3 left-2/3 w-1 h-1 rounded-full bg-[#E6C78B] animate-float" style={{ animationDuration: '20s' }}></div>
        <div className="absolute top-2/3 left-1/3 w-1 h-1 rounded-full bg-[#E6C78B] animate-float" style={{ animationDuration: '25s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section heading */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-playfair text-white mb-2">Featured Dishes</h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-[#E6C78B]/80 to-transparent mx-auto mb-4"></div>
          <p className="text-sm text-white/80 max-w-md mx-auto">
            Our most celebrated creations that showcase our culinary philosophy
          </p>
        </div>
        
        {/* Featured dish carousel - simplified for mobile */}
        <div className="max-w-sm mx-auto">
          {/* Dish image */}
          <div className="relative h-64 w-full rounded-t-lg overflow-hidden">
            <Image
              src={currentDish.image}
              alt={currentDish.name}
              fill
              sizes="100vw"
              className="object-cover"
              quality={75}
              loading="lazy"
            />
            
            {/* Tags */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-2">
              {currentDish.tags.map((tag) => (
                <span 
                  key={tag}
                  className="bg-black/70 text-[#E6C78B] text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Navigation arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white touch-manipulation"
              aria-label="Previous dish"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white touch-manipulation"
              aria-label="Next dish"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
          
          {/* Dish details */}
          <div className="bg-black/40 border border-white/10 rounded-b-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-playfair text-white">{currentDish.name}</h3>
              <span className="text-[#E6C78B] font-medium">{currentDish.price}</span>
            </div>
            
            <p className="text-sm text-white/80 mb-3">{currentDish.description}</p>
            
            <div className="flex items-center">
              <span className="text-xs text-white/60 mr-2">Spice Level:</span>
              <span className="text-xs text-white/80">{currentDish.spiceLevel}</span>
            </div>
          </div>
          
          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {featuredDishes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-[#E6C78B]' : 'bg-white/30'
                }`}
                aria-label={`Go to dish ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default MobileFeaturedDishesSection;
