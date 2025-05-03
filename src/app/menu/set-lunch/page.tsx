"use client";

import { useEffect, useState } from "react";
import Navigation from "@/components/home/Navigation";
import Footer from "@/components/home/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { setLunchMenu } from "@/data/setLunchMenu";
import SetLunchCourseSection from "@/components/menu/SetLunchCourseSection";
import DailySidesSection from "@/components/menu/DailySidesSection";
import { isMobileDevice } from "@/utils/mobileUtils";
import MobileSetLunchCourseSection from "@/components/mobile/MobileSetLunchCourseSection";
import MobileDailySidesSection from "@/components/mobile/MobileDailySidesSection";

export default function SetLunchMenuPage() {
  // State for device detection
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device on client side
  useEffect(() => {
    setIsMobile(isMobileDevice());

    const handleResize = () => {
      setIsMobile(isMobileDevice());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      <section className="w-full bg-[url('/images/menu/set-lunch/hero-set-lunch.jpg')] bg-cover bg-center py-32 relative">
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-playfair mb-6 text-white">3 Course Set Lunch</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#E6C78B] to-transparent mx-auto mb-6"></div>
          <p className="text-lg md:text-xl font-montserrat text-white/80 max-w-3xl mx-auto">
            A perfect midday dining experience with three exquisite courses
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

          {/* Set Menu Price and Description */}
          <div className="text-center mb-12">
            <div className="inline-block bg-[#1A2A3A] px-8 py-4 rounded-lg border border-[#E6C78B]/30 mb-6">
              <h2 className="text-3xl font-playfair text-[#E6C78B] mb-2">{setLunchMenu.price}</h2>
              <p className="text-white/80 font-montserrat">{setLunchMenu.description}</p>
              <p className="text-white/60 text-sm mt-2">Available Monday to Friday, 11:30 AM - 2:30 PM</p>
            </div>
          </div>

          {/* Menu Courses */}
          {setLunchMenu.courses.map((course, index) => (
            isMobile ? (
              <MobileSetLunchCourseSection key={index} course={course} />
            ) : (
              <SetLunchCourseSection key={index} course={course} />
            )
          ))}

          {/* Daily Sides Section */}
          {isMobile ? (
            <MobileDailySidesSection includedSides={setLunchMenu.included_sides} />
          ) : (
            <DailySidesSection includedSides={setLunchMenu.included_sides} />
          )}

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
