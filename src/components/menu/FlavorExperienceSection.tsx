"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { memo } from "react";

const FlavorExperienceSection = memo(function FlavorExperienceSection() {
  return (
    <section className="w-full">
      <div className="min-h-[27vh] w-full grid grid-cols-1 md:grid-cols-[40%_60%]">
      {/* Left Side - Experience the Flavors */}
      <div className="relative p-4 md:py-6 md:px-8 flex flex-col justify-center" style={{ backgroundImage: "url('/images/philosophy-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-md">
          <h3 className="text-xl font-montserrat text-white mb-1">{"A culinary journey"}</h3>
          <h2 className="text-3xl font-playfair text-white mb-2">{"Experience the Flavors of India"}</h2>
          <p className="font-montserrat text-white mb-4 text-sm md:text-base">
            {"Our menu celebrates India's diverse culinary landscape, from aromatic North Indian spices to South Indian coconut-infused curries. Each dish reflects our commitment to tradition and quality."}
          </p>
          <Link href="/reservations">
            <Button className="bg-[#E6C78B] text-black hover:bg-[#D4B679] w-auto px-6 flex items-center justify-center text-sm">
              {"Reserve a Table"}
            </Button>
          </Link>
        </div>
      </div>

      {/* Right Side - Culinary Highlights */}
      <div className="relative" style={{ backgroundImage: "url('/images/drink.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative h-full flex flex-col justify-center p-4 md:py-6 md:px-8">
          <h2 className="text-3xl font-playfair mb-2">{"Our Culinary Philosophy"}</h2>

          <p className="text-white/90 font-montserrat mb-3 text-sm md:text-base">
            {"At Akasa, food is a celebration of culture and tradition. Our menu is guided by three principles:"}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <h3 className="text-[#E6C78B] text-base font-playfair mb-1">{"Tradition"}</h3>
              <p className="text-white/90 font-montserrat text-xs md:text-sm">
                {"Honoring authentic recipes passed down through generations."}
              </p>
            </div>
            <div>
              <h3 className="text-[#E6C78B] text-base font-playfair mb-1">{"Quality"}</h3>
              <p className="text-white/90 font-montserrat text-xs md:text-sm">
                {"Sourcing the finest ingredients and authentic spices."}
              </p>
            </div>
            <div>
              <h3 className="text-[#E6C78B] text-base font-playfair mb-1">{"Innovation"}</h3>
              <p className="text-white/90 font-montserrat text-xs md:text-sm">
                {"Elevating classic flavors with creative techniques."}
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
});

export default FlavorExperienceSection;
