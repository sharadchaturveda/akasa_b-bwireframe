"use client";

import Image from "next/image";
import { memo } from "react";

const FeaturedDishesSection = memo(function FeaturedDishesSection() {
  // Featured dishes for the gallery
  const featuredDishes = [
    {
      name: "Butter Chicken",
      description: "Tender chicken in a rich, aromatic tomato and butter sauce",
      image: "/images/gallery1.jpg",
      price: "$28",
      category: "Signature"
    },
    {
      name: "Lamb Rogan Josh",
      description: "Slow-cooked lamb in a fragrant Kashmiri spice blend",
      image: "/images/gallery2.jpg",
      price: "$32",
      category: "Chef's Special"
    },
    {
      name: "Tandoori Prawns",
      description: "Jumbo prawns marinated in yogurt and spices, cooked in the tandoor",
      image: "/images/gallery3.jpg",
      price: "$36",
      category: "Seafood"
    },
    {
      name: "Vegetable Biryani",
      description: "Fragrant basmati rice with seasonal vegetables and aromatic spices",
      image: "/images/gallery5.jpg",
      price: "$24",
      category: "Vegetarian"
    },
    {
      name: "Mango Kulfi",
      description: "Traditional Indian ice cream with alphonso mango and cardamom",
      image: "/images/gallery6.jpg",
      price: "$14",
      category: "Dessert"
    },
    {
      name: "Masala Dosa",
      description: "Crispy rice crepe filled with spiced potatoes, served with sambar and chutneys",
      image: "/images/event3.jpg",
      price: "$18",
      category: "Breakfast"
    }
  ];

  return (
    <section className="w-full bg-[url('/images/gallery5.jpg')] bg-cover bg-fixed py-16 relative">
      <div className="absolute inset-0 bg-black/75"></div>
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-playfair mb-4">{"Featured Dishes"}</h2>
          <p className="text-lg font-montserrat text-white/70 max-w-2xl mx-auto">
            {"A showcase of our most celebrated creations, each dish representing the pinnacle of Indian culinary artistry."}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDishes.map((dish, index) => (
            <div key={index} className="bg-black/80 backdrop-blur-sm rounded-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="relative h-[250px] overflow-hidden">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-[#E6C78B] text-black px-3 py-1 rounded-full text-xs font-medium">
                  {dish.category}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-playfair">{dish.name}</h3>
                  <span className="text-[#E6C78B] font-medium">{dish.price}</span>
                </div>
                <p className="text-white/70 text-sm mb-4">{dish.description}</p>
                <button className="text-[#E6C78B] text-sm font-medium flex items-center group-hover:underline">
                  Order Now
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default FeaturedDishesSection;
