"use client";

import { Key, useEffect } from "react";
import Navigation from "@/components/home/Navigation";
import Footer from "@/components/home/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BarBiteCategorySection from "@/components/menu/BarBiteCategorySection";
import { MenuCategory } from "@/types/menu";
import { diwaliMenu } from "@/data/diwali";

export default function DiwaliMenuPage() {
  useEffect(() => {
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      if (img.complete) {
        img.classList.add("loaded");
      } else {
        img.onload = () => img.classList.add("loaded");
      }
    });
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="w-full bg-[url('/images/menu/festive/image.png')] bg-cover bg-center py-64 relative">
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center flex flex-col items-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-playfair mb-6 text-white">
            Diwali Menu
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#E6C78B] to-transparent mx-auto mb-6"></div>
          <p className="text-lg md:text-xl font-montserrat text-white/80 max-w-3xl mx-auto">
            Festive vegetarian & non-vegetarian thali and ala-carte specialties
          </p>
          <div className="bg-[#232B38] text-[#E6C78B] px-4 py-2 rounded-md text-xs font-medium shadow border border-[#E6C78B]/30 w-fit mx-auto">
            Valid from 2nd Oct - 8th Nov
          </div>
          <div className="text-xs text-white/70 mt-2">
            Thali menu available for 4 guests and above. All prices subject to
            10% service charge and prevailing GST.
          </div>
        </div>
      </section>

      {/* Menu Content */}
      <section className="w-full bg-black py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e6c78b' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
              animation: "slideBackground 60s linear infinite",
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          {/* Menu Categories */}
          {diwaliMenu.categories.map(
            (category: MenuCategory, index: Key | null | undefined) => (
              <BarBiteCategorySection key={index} category={category} />
            )
          )}

          {/* Disclaimer */}
          <div className="text-center mt-10 text-sm text-white/70 italic">
            {diwaliMenu.disclaimer}
          </div>

          {/* Back Button */}
          <div className="text-center mt-8">
            <Link href="/menu">
              <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A]">
                Back to All Menus
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes slideBackground {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 100% 100%;
          }
        }
      `}</style>
    </main>
  );
}
