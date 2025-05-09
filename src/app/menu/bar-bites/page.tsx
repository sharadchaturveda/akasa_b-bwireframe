"use client";

import { useEffect } from "react";
import Navigation from "@/components/home/Navigation";
import Footer from "@/components/home/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { barBitesMenu } from "@/data/barBitesMenu";
import BarBiteCategorySection from "@/components/menu/BarBiteCategorySection";



export default function BarBitesMenuPage() {

  // Load page-specific styles
  useEffect(() => {
    // Add any page-specific effects here

    // Add loaded class to images when they finish loading for better performance
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      if (img.complete) {
        img.classList.add('loaded');
      } else {
        img.onload = () => {
          img.classList.add('loaded');
        };
      }
    });
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="w-full bg-[url('/images/menu/bar-bites/hero/hero.jpg')] bg-cover bg-center py-32 relative">
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-playfair mb-6 text-white">Bar Bites</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#E6C78B] to-transparent mx-auto mb-6"></div>
          <p className="text-lg md:text-xl font-montserrat text-white/80 max-w-3xl mx-auto">
            Perfect small plates to accompany your drinks
          </p>
        </div>
      </section>

      {/* Menu Content Section */}
      <section className="w-full bg-black py-16 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e6c78b' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
            animation: 'slideBackground 60s linear infinite'
          }}></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          {/* Menu Legend */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center gap-6 bg-black/40 backdrop-blur-sm px-6 py-3 rounded-lg border border-white/10">
              <div className="flex items-center">
                <span className="text-lg mr-2">🟢</span>
                <span className="text-sm font-montserrat text-white/80">Vegetarian</span>
              </div>
              <div className="flex items-center">
                <span className="text-lg mr-2">🔴</span>
                <span className="text-sm font-montserrat text-white/80">Non-Vegetarian</span>
              </div>
            </div>
          </div>

          {/* Menu Categories */}
          {barBitesMenu.categories.map((category, index) => (
            <BarBiteCategorySection key={index} category={category} />
          ))}

          {/* Back to Menus button */}
          <div className="text-center mt-16">
            <Link href="/menu">
              <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A]">
                Back to All Menus
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes slideBackground {
          0% { background-position: 0 0; }
          100% { background-position: 100% 100%; }
        }
      `}</style>
    </main>
  );
}

