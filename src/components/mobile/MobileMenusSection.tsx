"use client";

import { memo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MobilePrimaryButton } from "./MobilePrimaryButton";

/**
 * MobileMenusSection Component
 *
 * A mobile-optimized version of the Menu page menus section
 * Using the same content as the desktop version
 */
const MobileMenusSection = memo(function MobileMenusSection() {
  // State for active menu tab
  const [activeMenu, setActiveMenu] = useState("a-la-carte");

  // Menu types - same as desktop
  const menuTypes = [
    { id: "a-la-carte", name: "À La Carte", description: "Our signature dishes available for individual selection", image: "/images/menu/gallery1.jpg", url: "/menu/a-la-carte" },
    { id: "soul-food", name: "Soul Food Weekends", description: "Special weekend offerings that nourish the soul", image: "/images/menu/gallery2.jpg", url: "/menu/soul-food-weekends" },
    { id: "drinks", name: "Drinks", description: "Signature cocktails, fine wines, and refreshing beverages", image: "/images/menu/gallery3.jpg", url: "/menu/drinks" },
    { id: "bar-bites", name: "Bar Bites", description: "Perfect small plates to accompany your drinks", image: "/images/menu/gallery5.jpg", url: "/menu/bar-bites" },
    { id: "set-lunch", name: "3 Course Set Lunch", description: "A perfect midday dining experience with three exquisite courses", image: "/images/menu/gallery6.jpg", url: "/menu/set-lunch" }
  ];

  return (
    <section className="w-full bg-black py-12 relative overflow-hidden">
      {/* Animated background pattern - same as desktop */}
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
        <div className="text-center mb-10 relative">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-[#E6C78B] to-transparent"></div>
          <h2 className="text-3xl font-playfair mb-4 relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E6C78B] to-[#D4B679]">Our Menus</span>
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#E6C78B]/80 to-transparent"></div>
          </h2>
          <p className="text-sm font-montserrat text-white/80 max-w-xs mx-auto leading-relaxed italic">
            {"Explore our carefully crafted menus, each offering a unique culinary journey through the diverse flavors of India."}
          </p>

          {/* Decorative spoon and fork icon - smaller for mobile */}
          <div className="flex justify-center mt-6 mb-3">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-[#1A2A3A] opacity-30"></div>
              <svg className="w-6 h-6 text-[#E6C78B]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.1,13.34L3.91,9.16C2.35,7.59 2.35,5.06 3.91,3.5L10.93,10.5L8.1,13.34M14.88,11.53L13.41,13L20.29,19.88L18.88,21.29L12,14.41L5.12,21.29L3.71,19.88L13.47,10.12C12.76,8.59 13.26,6.44 14.85,4.85C16.76,2.93 19.5,2.57 20.96,4.03C22.43,5.5 22.07,8.24 20.15,10.15C18.56,11.74 16.41,12.24 14.88,11.53Z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Menu cards - stacked for mobile but with same content as desktop */}
        <div className="flex flex-col gap-6 mb-10">
          {menuTypes.map((menu) => (
            <div
              key={menu.id}
              className="relative overflow-hidden border border-[#E6C78B]/20 shadow-lg rounded-lg"
              onClick={() => setActiveMenu(menu.id)}
            >
              {/* Menu image */}
              <div className="relative h-48 w-full">
                <Image
                  src={menu.image}
                  alt={menu.name}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  quality={75}
                  loading="lazy"
                />

                {/* Semi-transparent overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10"></div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-playfair text-white">{menu.name}</h3>
                  {activeMenu === menu.id && (
                    <div className="bg-black/40 rounded-full p-0.5">
                      <svg className="w-5 h-5 text-[#E6C78B]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>

                <p className="text-sm text-white/80 mb-4 min-h-[60px]">{menu.description}</p>

                <Link href={menu.url} className="block w-full">
                  <MobilePrimaryButton className="w-full" onClick={(e) => e.stopPropagation()}>
                    View Menu
                  </MobilePrimaryButton>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Standardized reservation button */}
        <div className="text-center">
          <Link href="/reservations">
            <MobilePrimaryButton className="px-6 py-3">
              Make a Reservation
            </MobilePrimaryButton>
          </Link>
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

export default MobileMenusSection;
