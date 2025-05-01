"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { MobilePrimaryButton } from "./MobilePrimaryButton";

/**
 * MobileMenusSection Component
 * 
 * A mobile-optimized version of the Menu page menus section
 */
const MobileMenusSection = memo(function MobileMenusSection() {
  // Menu data
  const menus = [
    {
      id: "a-la-carte",
      title: "À La Carte",
      description: "Our signature dishes available for individual selection",
      image: "/images/menu/a-la-carte.jpg",
      link: "/menu/a-la-carte"
    },
    {
      id: "soul-food",
      title: "Soul Food Weekends",
      description: "Regional specialties served family-style every weekend",
      image: "/images/menu/soul-food.jpg",
      link: "/menu/soul-food"
    },
    {
      id: "drinks",
      title: "Drinks",
      description: "Signature cocktails, wines, and non-alcoholic beverages",
      image: "/images/menu/drinks.jpg",
      link: "/menu/drinks"
    },
    {
      id: "bar-bites",
      title: "Bar Bites",
      description: "Small plates perfect for sharing at the bar",
      image: "/images/menu/bar-bites.jpg",
      link: "/menu/bar-bites"
    },
    {
      id: "set-lunch",
      title: "3 Course Set Lunch",
      description: "A curated lunch experience at a special price",
      image: "/images/menu/set-lunch.jpg",
      link: "/menu/set-lunch"
    }
  ];

  return (
    <section className="w-full bg-black py-12 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-40 right-0 w-64 h-64 rounded-full bg-[#E6C78B]/5 blur-3xl"></div>
      <div className="absolute bottom-40 left-0 w-64 h-64 rounded-full bg-[#E6C78B]/5 blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-playfair text-white mb-2">Our Menus</h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-[#E6C78B]/80 to-transparent mx-auto mb-4"></div>
          <p className="text-sm text-white/80 max-w-md mx-auto">
            Explore our carefully crafted menus featuring the finest Indian cuisine
          </p>
        </div>
        
        {/* Menu cards - stacked for mobile */}
        <div className="flex flex-col gap-6">
          {menus.map((menu) => (
            <div 
              key={menu.id}
              className="bg-black/40 border border-white/10 rounded-lg overflow-hidden shadow-lg"
            >
              {/* Menu image */}
              <div className="relative h-48 w-full">
                <Image
                  src={menu.image}
                  alt={menu.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  quality={75}
                  loading="lazy"
                />
              </div>
              
              {/* Menu details */}
              <div className="p-4">
                <h3 className="text-lg font-playfair text-white mb-2">{menu.title}</h3>
                <p className="text-sm text-white/80 mb-4">{menu.description}</p>
                
                <Link href={menu.link}>
                  <MobilePrimaryButton className="w-full">
                    View Menu
                  </MobilePrimaryButton>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default MobileMenusSection;
