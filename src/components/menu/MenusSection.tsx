"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, memo } from "react";

const MenusSection = memo(function MenusSection() {
  // State for active menu tab
  const [activeMenu, setActiveMenu] = useState("a-la-carte");

  // Menu types
  const menuTypes = [
    { id: "a-la-carte", name: "À La Carte", description: "Our signature dishes available for individual selection", image: "/images/menu/a-la-carte/hero-a-la-carte.jpg", url: "/menu/a-la-carte" },
    { id: "soul-food", name: "Soul Food Weekends", description: "Special weekend offerings that nourish the soul", image: "/images/menu/soul-food-weekends/hero-soul-food-weekends.jpg", url: "/menu/soul-food-weekends" },
    { id: "drinks", name: "Drinks", description: "Signature cocktails, fine wines, and refreshing beverages", image: "/images/menu/drinks/hero-drinks.jpg", url: "/menu/drinks" },
    { id: "bar-bites", name: "Bar Bites", description: "Perfect small plates to accompany your drinks", image: "/images/menu/bar-bites/hero-bar-bites.jpg", url: "/menu/bar-bites" },
    { id: "set-lunch", name: "3 Course Set Lunch", description: "A perfect midday dining experience with three exquisite courses", image: "/images/menu/set-lunch/hero-set-lunch.jpg", url: "/menu/set-lunch" }
  ];

  return (
    <section className="w-full bg-black py-16 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e6c78b' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
          animation: 'slideBackground 60s linear infinite'
        }}></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#E6C78B]/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-[#E6C78B]/10 to-transparent rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Elegant heading with decorative elements */}
        <div className="text-center mb-16 relative">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-[#E6C78B] to-transparent"></div>
          <h2 className="text-4xl md:text-6xl font-playfair mb-6 relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E6C78B] to-[#D4B679]">Our Menus</span>
            <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#E6C78B]/80 to-transparent"></div>
          </h2>
          <p className="text-lg md:text-xl font-montserrat text-white/80 max-w-3xl mx-auto leading-relaxed italic">
            {"Explore our carefully crafted menus, each offering a unique culinary journey through the diverse flavors of India."}
          </p>

          {/* Decorative spoon and fork icon */}
          <div className="flex justify-center mt-8 mb-4">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-[#1A2A3A] opacity-30"></div>
              <svg className="w-8 h-8 text-[#E6C78B]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.1,13.34L3.91,9.16C2.35,7.59 2.35,5.06 3.91,3.5L10.93,10.5L8.1,13.34M14.88,11.53L13.41,13L20.29,19.88L18.88,21.29L12,14.41L5.12,21.29L3.71,19.88L13.47,10.12C12.76,8.59 13.26,6.44 14.85,4.85C16.76,2.93 19.5,2.57 20.96,4.03C22.43,5.5 22.07,8.24 20.15,10.15C18.56,11.74 16.41,12.24 14.88,11.53Z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Fancy menu cards with 3D hover effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-6 mb-20 max-w-[1600px] mx-auto">
          {menuTypes.map((menu) => (
            <div
              key={menu.id}
              className={`group perspective cursor-pointer`}
              onClick={(e) => {
                // Only set active menu if the click is directly on the card
                // and not on a button
                if (e.target === e.currentTarget ||
                    (e.target.closest('button') === null)) {
                  setActiveMenu(menu.id);
                }
              }}
            >
              <div className={`relative preserve-3d transition-all duration-500 ${
                activeMenu === menu.id ? 'rotate-y-10' : 'hover:rotate-y-10'
              }`}>
                {/* Front of card */}
                <div className="relative overflow-hidden h-[340px] backface-hidden border border-[#E6C78B]/20 shadow-xl shadow-black/30">
                  {/* No gold accent corner to avoid blocking text */}

                  <Image
                    src={menu.image}
                    alt={menu.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    quality={80}
                  />

                  {/* Semi-transparent overlay for better text readability without black bars */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10 pointer-events-none"></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-between">
                    {/* Top section with title and selected indicator */}
                    <div className="p-6 pt-6 flex flex-col">
                      <div className="relative mb-4">
                        {/* Title with improved visibility for longer titles */}
                        <div className="min-h-[60px] flex items-start">
                          <h3 className="text-xl font-playfair text-white font-semibold pr-8 leading-tight text-shadow-md">
                            {menu.name}
                          </h3>
                          {activeMenu === menu.id && (
                            <div className="absolute top-0 right-0 flex-shrink-0">
                              <div className="bg-black/40 rounded-full p-0.5">
                                <svg className="w-6 h-6 text-[#E6C78B]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Description with more space */}
                      <p className="text-white/90 font-montserrat text-sm mb-4 min-h-[60px]"
                         style={{
                           display: '-webkit-box',
                           WebkitLineClamp: 3,
                           WebkitBoxOrient: 'vertical',
                           overflow: 'hidden'
                         }}>
                        {menu.description}
                      </p>
                    </div>

                    {/* Bottom section with button only - restored layout with improved clickability */}
                    <div className="p-6 pt-0 relative z-[100]">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = menu.url;
                        }}
                        className="group inline-flex items-center justify-center rounded-full text-xs font-montserrat font-medium tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden shadow-md hover:shadow-lg bg-[#1A2A3A] text-white px-4 py-2 h-[36px] w-full cursor-pointer"
                      >
                        {/* Standard gold fill animation */}
                        <span className="absolute inset-0 rounded-full bg-[#E6C78B] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>

                        <span className="relative flex-1 text-center group-hover:text-black transition-colors duration-300">
                          <span className="whitespace-nowrap">View Menu</span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Standardized reservation button */}
        <div className="text-center">
          <Link href="/reservations">
            <Button className="px-8 py-4 text-lg">
              Make a Reservation
            </Button>
          </Link>
        </div>
      </div>

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes slideBackground {
          0% { background-position: 0 0; }
          100% { background-position: 100% 100%; }
        }

        .perspective {
          perspective: 1000px;
        }

        .preserve-3d {
          transform-style: preserve-3d;
        }

        .backface-hidden {
          backface-visibility: hidden;
        }

        .rotate-y-10 {
          transform: rotateY(10deg);
        }

        .hover\:rotate-y-10:hover {
          transform: rotateY(10deg);
        }

        .text-shadow-md {
          text-shadow: 0 2px 4px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.6);
        }
      `}</style>
    </section>
  );
});

export default MenusSection;
