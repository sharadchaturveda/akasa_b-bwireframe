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
    { id: "dinner", name: "Dinner Menu", description: "Our signature evening dining experience", image: "/images/gallery1.jpg", pdfUrl: "/menus/dinner-menu.pdf" },
    { id: "lunch", name: "Lunch Menu", description: "Express lunch options for busy professionals", image: "/images/gallery2.jpg", pdfUrl: "/menus/lunch-menu.pdf" },
    { id: "tasting", name: "Tasting Menu", description: "Chef's curated multi-course journey", image: "/images/gallery3.jpg", pdfUrl: "/menus/tasting-menu.pdf" }
  ];

  return (
    <section className="w-full bg-[url('/images/gallery2.jpg')] bg-cover bg-center py-16 pb-0 relative">
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-playfair mb-4">{"Our Menus"}</h2>
          <p className="text-lg font-montserrat text-white/70 max-w-2xl mx-auto">
            {"Explore our carefully crafted menus, each offering a unique culinary journey through the diverse flavors of India."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {menuTypes.map((menu) => (
            <div
              key={menu.id}
              className={`relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 group ${activeMenu === menu.id ? 'ring-2 ring-[#E6C78B]' : ''}`}
              onClick={() => {
                setActiveMenu(menu.id);
                // Only select the menu, don't open the PDF
              }}
            >
              <div className="relative h-[250px]">
                <Image
                  src={menu.image}
                  alt={menu.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-playfair">{menu.name}</h3>
                  {activeMenu === menu.id && (
                    <span className="bg-[#E6C78B] text-black text-xs px-2 py-1 rounded-full">
                      Selected
                    </span>
                  )}
                </div>
                <p className="text-sm text-white/70">{menu.description}</p>
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  className="bg-[#E6C78B] text-black px-6 py-3 rounded-md text-sm font-medium flex items-center hover:bg-[#D4B679] transition-colors shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the parent onClick
                    window.open(menu.pdfUrl, '_blank');
                  }}
                >
                  <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Open PDF Menu
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/reservations">
            <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] px-8 py-3" showArrow>
              {"Make a Reservation"}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
});

export default MenusSection;
