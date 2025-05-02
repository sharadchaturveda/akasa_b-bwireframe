"use client";

import { memo, useState, useEffect } from "react";
import Image from "next/image";

/**
 * MobileFeaturedDishesSection Component
 *
 * A mobile-optimized version of the Menu page featured dishes section
 * Using the same content as the desktop version
 */
const MobileFeaturedDishesSection = memo(function MobileFeaturedDishesSection() {
  // Add image loading optimization
  useEffect(() => {
    // Add loaded class to images when they finish loading
    const images = document.querySelectorAll('.mobile-dish-card img');
    images.forEach((img: Element) => {
      const imgElement = img as HTMLImageElement;
      if (imgElement.complete) {
        imgElement.classList.add('loaded');
      } else {
        imgElement.onload = () => {
          imgElement.classList.add('loaded');
        };
      }
    });
  }, []);

  // Featured dishes for the gallery - same as desktop
  const featuredDishes = [
    {
      name: "Butter Chicken",
      description: "Tender chicken in a rich, aromatic tomato and butter sauce",
      image: "/images/menu/gallery1.jpg",
      price: "$28",
      category: "Signature"
    },
    {
      name: "Lamb Rogan Josh",
      description: "Slow-cooked lamb in a fragrant Kashmiri spice blend",
      image: "/images/menu/gallery2.jpg",
      price: "$32",
      category: "Chef's Special"
    },
    {
      name: "Tandoori Prawns",
      description: "Jumbo prawns marinated in yogurt and spices, cooked in the tandoor",
      image: "/images/menu/gallery3.jpg",
      price: "$36",
      category: "Seafood"
    }
  ];

  // State for current dish index
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className="w-full bg-black py-12 relative overflow-hidden">
      {/* Animated background pattern - same as desktop but simplified for mobile */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e6c78b' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
          animation: 'slideBackground 60s linear infinite'
        }}></div>
      </div>

      {/* Decorative elements - simplified for mobile */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-[#E6C78B]/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-[#E6C78B]/10 to-transparent rounded-full blur-3xl"></div>

      <div className="px-4 relative z-10">
        {/* Elegant heading with decorative elements - mobile optimized */}
        <div className="text-center mb-8 relative">
          <div className="flex justify-center mb-4">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-[#E6C78B]/30"></div>
              <svg className="w-6 h-6 text-[#E6C78B]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.1,13.34L3.91,9.16C2.35,7.59 2.35,5.06 3.91,3.5L10.93,10.5L8.1,13.34M14.88,11.53L13.41,13L20.29,19.88L18.88,21.29L12,14.41L5.12,21.29L3.71,19.88L13.47,10.12C12.76,8.59 13.26,6.44 14.85,4.85C16.76,2.93 19.5,2.57 20.96,4.03C22.43,5.5 22.07,8.24 20.15,10.15C18.56,11.74 16.41,12.24 14.88,11.53Z" />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-playfair mb-3 relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E6C78B] to-[#D4B679]">Featured Dishes</span>
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#E6C78B]/80 to-transparent"></div>
          </h2>

          <p className="text-sm font-montserrat text-white/80 max-w-xs mx-auto leading-relaxed italic">
            {"A showcase of our most celebrated creations, each dish representing the pinnacle of Indian culinary artistry."}
          </p>
        </div>

        {/* Featured dish carousel - simplified for mobile */}
        <div className="max-w-sm mx-auto">
          {/* Dish image */}
          <div className="relative h-64 w-full rounded-t-lg overflow-hidden mobile-dish-card">
            <Image
              src={featuredDishes[currentIndex].image}
              alt={featuredDishes[currentIndex].name}
              fill
              sizes="100vw"
              className="object-cover"
              quality={75}
              loading="lazy"
            />

            {/* Category badge */}
            <div className="absolute top-3 left-3">
              <div className="bg-[#E6C78B] text-black px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                {featuredDishes[currentIndex].category}
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={() => setCurrentIndex(prev => (prev === 0 ? featuredDishes.length - 1 : prev - 1))}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white touch-manipulation"
              aria-label="Previous dish"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              onClick={() => setCurrentIndex(prev => (prev === featuredDishes.length - 1 ? 0 : prev + 1))}
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
              <h3 className="text-lg font-playfair text-white">{featuredDishes[currentIndex].name}</h3>
              <span className="text-[#E6C78B] font-medium">{featuredDishes[currentIndex].price}</span>
            </div>

            <p className="text-sm text-white/80 mb-3">{featuredDishes[currentIndex].description}</p>

            {/* Order button */}
            <button className="w-full py-2 px-4 bg-[#1A2A3A] text-white text-sm rounded-full relative overflow-hidden">
              <span className="relative z-10">Order Now</span>
            </button>
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

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes slideBackground {
          0% { background-position: 0 0; }
          100% { background-position: 100% 100%; }
        }
      `}</style>
    </section>
  );
});

export default MobileFeaturedDishesSection;
