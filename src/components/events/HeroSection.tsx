"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { memo } from "react";

const HeroSection = memo(function HeroSection() {
  return (
    <section className="h-screen w-full bg-[url('/images/event3.jpg')] bg-cover bg-center flex flex-col items-center justify-center relative">
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="container mx-auto px-4 md:px-8 relative z-10 mt-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-playfair mb-6 text-white">{"Host Your Event at Akasa"}</h1>
          <p className="text-lg md:text-xl font-montserrat text-white/90 mb-8 leading-relaxed">
            {"From intimate private dinners to grand celebrations, Akasa offers the perfect setting for your special occasions. Our dedicated events team will work with you to create a memorable experience tailored to your needs."}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="#inquiry">
              <Button className="bg-[#E6C78B] text-black hover:bg-[#D4B679] px-8 py-3">
                {"Inquire Now"}
              </Button>
            </Link>
            <Link href="/reservations">
              <Button className="bg-transparent border border-white text-white hover:bg-white/10 px-8 py-3">
                {"Make a Reservation"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
});

export default HeroSection;
