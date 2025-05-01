"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { memo, useEffect, useState } from "react";
import Image from "next/image";

const BrandPhilosophy = memo(function BrandPhilosophy() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Use Intersection Observer to detect when component is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only need to trigger once
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('brand-philosophy');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);
  return (
    <section id="brand-philosophy" className="min-h-[45vh] w-full grid grid-cols-1 md:grid-cols-[40%_60%]">
      {/* Left Side - Brand Philosophy */}
      <div className="relative p-6 md:py-8 md:px-12 flex flex-col justify-center bg-black overflow-hidden">
        {/* Background image with Next.js Image component for better optimization */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/home/philosophy-bg.jpg"
            alt="Philosophy background"
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover"
            quality={75}
            priority={false}
            loading="lazy"
            style={{
              transform: isVisible ? "scale(1.05)" : "scale(1)",
              transition: "transform 8s ease-in-out",
              opacity: 0.9,
              objectPosition: "center",
            }}
          />
        </div>

        {/* Elegant overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70"></div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-[#E6C78B]/20"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-[#E6C78B]/20"></div>

        <div className="relative max-w-md">
          <span className="text-[#E6C78B] text-sm tracking-widest uppercase mb-2 block font-montserrat">Our Philosophy</span>
          <h3 className="text-2xl font-montserrat text-white mb-2 animate-fadeSlideUp" style={{ animationDelay: '0.1s' }}>{"Not just a meal."}</h3>
          <h2 className="text-4xl font-playfair text-white mb-4 animate-fadeSlideUp" style={{ animationDelay: '0.2s', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{"An experience."}</h2>

          <div className="w-16 h-[1px] bg-gradient-to-r from-[#E6C78B]/80 to-transparent mb-6 animate-fadeSlideUp" style={{ animationDelay: '0.3s' }}></div>

          <p className="font-montserrat text-white/90 mb-6 leading-relaxed animate-fadeSlideUp" style={{ animationDelay: '0.4s' }}>
            {"We work closely with local farmers to bring you the freshest seasonal ingredients. Inspired by India's rich culinary heritage, we use heirloom grains, vibrant spices, and pasture-raised meats to craft soulful dishes. Enjoy them the traditional way—family style. Whether you order à la carte or try our chef's selection, everything is served to share."}
          </p>

          <div className="animate-fadeSlideUp" style={{ animationDelay: '0.5s' }}>
            <Link href="/location">
              <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-[240px] px-6 text-center shadow-lg" showArrow>
                {"Our Location"}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Location Info */}
      <div className="relative bg-black overflow-hidden">
        {/* Background image with Next.js Image component for better optimization */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/home/drink.jpg"
            alt="Drink background"
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover"
            quality={75}
            priority={false}
            loading="lazy"
            style={{
              transform: isVisible ? "scale(1.05)" : "scale(1)",
              transition: "transform 8s ease-in-out",
              opacity: 0.9,
              objectPosition: "center",
            }}
          />
        </div>

        {/* Elegant overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-tl from-black/70 via-black/50 to-black/70"></div>

        {/* Subtle animated particles */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-1 h-1 rounded-full bg-[#E6C78B] animate-float" style={{ animationDuration: '15s' }}></div>
          <div className="absolute top-3/4 right-1/3 w-1 h-1 rounded-full bg-[#E6C78B] animate-float" style={{ animationDuration: '20s' }}></div>
        </div>

        <div className="relative h-full flex flex-col justify-center p-6 md:py-8 md:px-12">
          <span className="text-[#E6C78B] text-sm tracking-widest uppercase mb-2 block font-montserrat animate-fadeSlideUp" style={{ animationDelay: '0.1s' }}>Visit Us</span>
          <h2 className="text-4xl font-playfair mb-4 text-white animate-fadeSlideUp" style={{ animationDelay: '0.2s', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{"Singapore"}</h2>

          <div className="w-16 h-[1px] bg-gradient-to-r from-[#E6C78B]/80 to-transparent mb-6 animate-fadeSlideUp" style={{ animationDelay: '0.3s' }}></div>

          <div className="space-y-4 animate-fadeSlideUp" style={{ animationDelay: '0.4s' }}>
            <div>
              <p className="text-[#E6C78B]/80 text-sm font-montserrat">{"address:"}</p>
              <p className="text-white text-lg font-montserrat">{"79 Robinson Road, #01-03 Capitasky,"}</p>
              <p className="text-white text-lg font-montserrat">{"Tanjong Pagar, Singapore 068897"}</p>
            </div>
            <div>
              <p className="text-[#E6C78B]/80 text-sm font-montserrat">{"hours:"}</p>
              <p className="text-white text-lg font-montserrat">{"Monday to Saturday: 11:30am to 10:00pm"}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 animate-fadeSlideUp" style={{ animationDelay: '0.5s' }}>
            <Link href="/order">
              <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-[240px] px-6 py-3 text-center shadow-lg" showArrow>
                {"Order Online"}
              </Button>
            </Link>
            <Link href="/reservations">
              <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-[240px] px-6 py-3 text-center shadow-lg" showArrow>
                {"Make a Reservation"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
});

export default BrandPhilosophy;
