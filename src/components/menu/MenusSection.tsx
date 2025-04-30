"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, memo } from "react";

const MenusSection = memo(function MenusSection() {
  // State for active menu tab
  const [activeMenu, setActiveMenu] = useState("dinner");

  // Menu types
  const menuTypes = [
    { id: "dinner", name: "Dinner Menu", description: "Our signature evening dining experience", image: "/images/menu/gallery1.jpg", pdfUrl: "/menus/dinner-menu.pdf" },
    { id: "lunch", name: "Lunch Menu", description: "Express lunch options for busy professionals", image: "/images/menu/gallery2.jpg", pdfUrl: "/menus/lunch-menu.pdf" },
    { id: "tasting", name: "Tasting Menu", description: "Chef's curated multi-course journey", image: "/images/menu/gallery3.jpg", pdfUrl: "/menus/tasting-menu.pdf" }
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          {menuTypes.map((menu) => (
            <div
              key={menu.id}
              className={`group perspective cursor-pointer`}
              onClick={() => setActiveMenu(menu.id)}
            >
              <div className={`relative preserve-3d transition-all duration-500 ${
                activeMenu === menu.id ? 'rotate-y-10' : 'hover:rotate-y-10'
              }`}>
                {/* Front of card */}
                <div className="relative overflow-hidden h-[400px] backface-hidden border border-[#E6C78B]/20 shadow-xl shadow-black/30">
                  {/* Gold accent corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#E6C78B] to-transparent z-10 opacity-80"></div>

                  <Image
                    src={menu.image}
                    alt={menu.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    quality={80}
                  />

                  {/* Elegant gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                    <div className="flex justify-between items-end mb-3">
                      <h3 className="text-2xl md:text-3xl font-playfair text-white">
                        {menu.name}
                      </h3>
                      {activeMenu === menu.id && (
                        <div className="flex items-center">
                          <span className="w-3 h-3 rounded-full bg-[#E6C78B] mr-2"></span>
                          <span className="text-[#E6C78B] text-sm font-medium">Selected</span>
                        </div>
                      )}
                    </div>

                    <p className="text-white/80 mb-6 font-montserrat">{menu.description}</p>

                    <button
                      className="group inline-flex items-center justify-center rounded-full text-sm font-montserrat font-medium tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden shadow-md hover:shadow-lg bg-[#1A2A3A] text-white px-6 py-3"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(menu.pdfUrl, '_blank');
                      }}
                    >
                      {/* Gold fill animation */}
                      <span className="absolute inset-0 rounded-full bg-[#E6C78B] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>

                      <span className="relative flex items-center group-hover:text-black transition-colors duration-300">
                        <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        View Menu
                      </span>
                    </button>
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
              <span className="flex items-center">
                Make a Reservation
                <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
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
      `}</style>
    </section>
  );
});

export default MenusSection;
