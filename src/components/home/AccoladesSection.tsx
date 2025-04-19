"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AccoladesSection() {
  return (
    <section className="min-h-screen sm:h-screen w-full bg-cover bg-center relative py-16 sm:py-0" style={{ backgroundImage: "url('/images/awards.jpg')" }}>
      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>

      {/* Content container */}
      <div className="relative h-full w-full flex items-end justify-start p-17 z-10">
        <div className="max-w-sm ml-8 mb-24 bg-black/70 p-6 rounded-lg border border-[#8B4513]/20 shadow-xl">
          <h2 className="text-2xl font-playfair mb-2 text-white">{"Celebrated & Savored"}</h2>
          <p className="text-base italic font-montserrat mb-6 text-gray-200">{"Where spice meets soul – Indian cuisine, reimagined."}</p>
          <div className="flex flex-col gap-4 w-full">
            <Link href="/order">
              <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-full px-6 py-3 text-center" showArrow>
                {"Order Online"}
              </Button>
            </Link>
            <Link href="/reservations">
              <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-full px-6 py-3 text-center" showArrow>
                {"Make a Reservation"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
