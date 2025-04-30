"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { memo } from "react";

const CallToActionSection = memo(function CallToActionSection() {
  return (
    <section className="w-full bg-[url('/images/home/hero.jpg')] bg-cover bg-center py-24 relative">
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-playfair mb-6">{"Experience the Flavors of India"}</h2>
        <p className="text-lg font-montserrat text-white/90 max-w-2xl mx-auto mb-8">
          {"Join us for an unforgettable culinary journey through the diverse and vibrant flavors of Indian cuisine."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/reservations">
            <Button className="bg-[#E6C78B] text-black hover:bg-[#D4B679] w-[180px]">
              {"Reserve a Table"}
            </Button>
          </Link>
          <Link href="/order">
            <Button className="bg-transparent border border-white text-white hover:bg-white/10 w-[180px]">
              {"Order Online"}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
});

export default CallToActionSection;
