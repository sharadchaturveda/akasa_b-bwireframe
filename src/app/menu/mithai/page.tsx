"use client";

import { Key, useEffect } from "react";
import Navigation from "@/components/home/Navigation";
import Footer from "@/components/home/Footer";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import MithaiCategorySection from "@/components/menu/MithaiCategorySection";
import { MenuCategory } from "@/types/menu";
import { mithaiMenu } from "@/data/mithaiMenu";

export default function MithaiMenuPage() {
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
            Mithai Menu
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#E6C78B] to-transparent mx-auto mb-6"></div>
          <p className="text-lg md:text-xl font-montserrat text-white/80 max-w-3xl mx-auto">
            Traditional Indian sweet delicacies made with authentic recipes
          </p>
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
          {/* Mithai Showcase */}
          <div className="text-center mb-12">
            <div className="bg-[#1A1A1A] p-6 rounded-lg border border-[#E6C78B]/20 shadow-lg">
              <h2 className="text-2xl md:text-3xl font-playfair mb-6 relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E6C78B] to-[#D4B679]">
                  Our Mithai Collection
                </span>
                <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#E6C78B]/80 to-transparent"></div>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="overflow-hidden rounded-md">
                  <Image
                    src="/images/menu/mithai/box.JPG"
                    alt="Mithai Gift Boxes"
                    width={400}
                    height={600}
                    className="w-full h-80 object-cover rounded-md hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="overflow-hidden rounded-md">
                  <Image
                    src="/images/menu/mithai/box-info.JPG"
                    alt="Ladoo Collection"
                    width={400}
                    height={600}
                    className="w-full h-80 object-cover rounded-md hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="overflow-hidden rounded-md">
                  <Image
                    src="/images/menu/mithai/Mithai.JPG"
                    alt="Gift Jars"
                    width={400}
                    height={600}
                    className="w-full h-80 object-cover rounded-md hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <p className="mt-4 text-white/70 font-montserrat text-sm">
                Our traditional sweets are available as individual items, in
                gift boxes, or in premium gift jars
              </p>
            </div>
          </div>

          {/* Vegetarian Only Legend */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center gap-6 bg-black/40 backdrop-blur-sm px-6 py-3 rounded-lg border border-white/10">
              <div className="flex items-center">
                <span className="text-lg mr-2">🟢</span>
                <span className="text-sm font-montserrat text-white/80">
                  Vegetarian
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-xs font-montserrat text-[#E6C78B] italic">
                  All our mithai products are vegetarian
                </span>
              </div>
            </div>
          </div>

          {/* Menu Categories */}
          {mithaiMenu.categories.map(
            (category: MenuCategory, index: Key | null | undefined) => (
              <MithaiCategorySection key={index} category={category} />
            )
          )}

          {/* Disclaimer */}
          <div className="text-center mt-10 text-sm text-white/70 italic">
            {mithaiMenu.disclaimer}
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
