"use client";

import Image from "next/image";
import { memo, useEffect } from "react";

const FeaturedDishesSection = memo(function FeaturedDishesSection() {
  // Add image loading optimization
  useEffect(() => {
    // Add loaded class to images when they finish loading
    const images = document.querySelectorAll('.dish-card img');
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
  // Featured dishes for the gallery
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
    },
    {
      name: "Vegetable Biryani",
      description: "Fragrant basmati rice with seasonal vegetables and aromatic spices",
      image: "/images/menu/gallery5.jpg",
      price: "$24",
      category: "Vegetarian"
    },
    {
      name: "Mango Kulfi",
      description: "Traditional Indian ice cream with alphonso mango and cardamom",
      image: "/images/menu/gallery6.jpg",
      price: "$14",
      category: "Dessert"
    },
    {
      name: "Masala Dosa",
      description: "Crispy rice crepe filled with spiced potatoes, served with sambar and chutneys",
      image: "/images/events/event3.jpg",
      price: "$18",
      category: "Breakfast"
    }
  ];

  return (
    <section className="w-full bg-black py-20 relative overflow-hidden">
      {/* Animated background pattern - Exactly like Menus section */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e6c78b' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
          animation: 'slideBackground 60s linear infinite'
        }}></div>
      </div>

      {/* Decorative elements - Exactly like Menus section */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#E6C78B]/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-[#E6C78B]/10 to-transparent rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Elegant heading with decorative elements */}
        <div className="text-center mb-20 relative">
          <div className="flex justify-center mb-6">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-[#E6C78B]/30"></div>
              <svg className="w-10 h-10 text-[#E6C78B]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.1,13.34L3.91,9.16C2.35,7.59 2.35,5.06 3.91,3.5L10.93,10.5L8.1,13.34M14.88,11.53L13.41,13L20.29,19.88L18.88,21.29L12,14.41L5.12,21.29L3.71,19.88L13.47,10.12C12.76,8.59 13.26,6.44 14.85,4.85C16.76,2.93 19.5,2.57 20.96,4.03C22.43,5.5 22.07,8.24 20.15,10.15C18.56,11.74 16.41,12.24 14.88,11.53Z" />
              </svg>
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-playfair mb-6 relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E6C78B] to-[#D4B679]">Featured Dishes</span>
            <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#E6C78B]/80 to-transparent"></div>
          </h2>

          <p className="text-lg md:text-xl font-montserrat text-white/80 max-w-3xl mx-auto leading-relaxed italic">
            {"A showcase of our most celebrated creations, each dish representing the pinnacle of Indian culinary artistry."}
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center mt-10">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#E6C78B]/50 to-transparent"></div>
            <div className="w-2 h-2 rounded-full bg-[#E6C78B]/50 mx-2"></div>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#E6C78B]/50 to-transparent"></div>
          </div>
        </div>

        {/* Fancy dish cards with hover effects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredDishes.map((dish, index) => (
            <div
              key={index}
              className="group relative dish-card"
            >
              {/* Card background with subtle glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E6C78B]/0 via-[#E6C78B]/30 to-[#E6C78B]/0 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

              <div className="relative bg-black/80 backdrop-blur-sm border border-white/5 rounded-lg overflow-hidden transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(230,199,139,0.2)]">
                {/* Dish image with fancy overlay effects */}
                <div className="relative h-[280px] overflow-hidden">
                  <Image
                    src={`${dish.image}?quality=75&width=800`}
                    alt={dish.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    quality={75}
                  />

                  {/* Elegant gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

                  {/* Category badge with animation */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-[#E6C78B] text-black px-4 py-1.5 rounded-full text-xs font-medium shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                      {dish.category}
                    </div>
                  </div>

                  {/* Decorative corner accent */}
                  <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-[#E6C78B]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Dish content with elegant styling */}
                <div className="p-8 relative">
                  {/* Decorative corner accent */}
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-[#E6C78B]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-playfair text-white group-hover:text-[#E6C78B] transition-colors duration-300">{dish.name}</h3>
                    <span className="text-[#E6C78B] font-medium text-lg">{dish.price}</span>
                  </div>

                  <p className="text-white/70 font-montserrat text-sm mb-6 leading-relaxed">{dish.description}</p>

                  {/* Standardized button */}
                  <button className="group inline-flex items-center justify-center rounded-full text-sm font-montserrat font-medium tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden shadow-md hover:shadow-lg bg-[#1A2A3A] text-white px-4 py-2">
                    {/* Gold fill animation */}
                    <span className="absolute inset-0 rounded-full bg-[#E6C78B] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>

                    <span className="relative flex-1 text-center group-hover:text-black transition-colors duration-300">
                      Order Now
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
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

export default FeaturedDishesSection;
