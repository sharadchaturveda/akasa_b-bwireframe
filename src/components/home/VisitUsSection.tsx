"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function VisitUsSection() {
  return (
    <section className="min-h-[80vh] w-full bg-cover bg-center flex items-center justify-center text-center px-8 py-16 relative" style={{ backgroundImage: "url('/images/location.jpg?quality=75&width=1200')" }}>
      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30"></div>

      <div className="relative z-10 bg-black/70 p-6 sm:p-10 rounded-lg border border-white/10 shadow-2xl w-[90%] max-w-lg">
        <h2 className="text-3xl font-playfair mb-4 text-white" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>{"Visit Us"}</h2>
        <p className="text-lg font-montserrat text-white mb-8" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>{"79 Robinson Road, #01-03 Capitasky, Tanjong Pagar, Singapore 068897"}</p>
        <p className="text-base font-montserrat text-white mb-8" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>{"Monday to Saturday: 11:30am to 10:00pm"}</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/order">
            <Button className="uppercase bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-full sm:w-[240px] text-center">{"Order Online"}</Button>
          </Link>
          <Link href="/reservations">
            <Button className="uppercase bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-full sm:w-[240px] text-center">{"Reserve"}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
