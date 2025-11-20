"use client";

import { useEffect, useState } from "react";
// import Navigation from "@/components/home/Navigation";
import Footer from "@/components/home/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import DesktopNavigation from "@/components/navigation/DesktopNavigation";
import { brunchImages, soulBrunchMenu } from "@/data/soulBrunchMenu";



interface MenuItem {
  name: string;
  description: string;
  is_vegetarian: boolean;
}

interface MenuCategory {
  category_name: string;
  items: MenuItem[];
}

interface MenuCategorySectionProps {
  category: MenuCategory;
}

const MenuCategorySection = ({ category }: MenuCategorySectionProps) => {
  return (
    <div className="mb-16">
      <div className="relative mb-8">
        <h2 className="text-3xl md:text-4xl font-playfair text-center text-[#D4AF37] mb-4 tracking-wider">
          {category.category_name}
        </h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {category.items.map((item, itemIndex) => (
          <div
            key={itemIndex}
            className=" relative text-white hover:text-[#D4AF37]"
          >
            {/* Card background with subtle glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/30 to-[#D4AF37]/0 rounded-2xl blur opacity-0 hover:opacity-100 transition duration-1000 hover:duration-200"></div>

            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/10">
              {/* Decorative corner accent */}
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-[#D4AF37]/30 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-montserrat font-semibold  transition-colors duration-300">
                  {item.name}
                </h3>
                <span className="text-2xl ml-2 flex-shrink-0">
                  {item.is_vegetarian ? "🟢" : "🔴"}
                </span>
              </div>
              <p className="text-white/80 font-montserrat text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function SoulWeekendBrunchPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % brunchImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Load page-specific styles
  useEffect(() => {
    // Add loaded class to images when they finish loading for better performance
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      if (img.complete) {
        img.classList.add("loaded");
      } else {
        img.onload = () => {
          img.classList.add("loaded");
        };
      }
    });
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Launch Announcement Banner */}
      <div className=" relative z-50 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] py-3">
        <div className="container mx-auto px-4 text-center">
          <p className="text-black font-montserrat font-semibold text-sm md:text-base">
            🎉 NEW LAUNCH: Soul Weekend Brunch starts{" "}
            {soulBrunchMenu.launch_date} | Every Saturday |{" "}
            {soulBrunchMenu.price} per person
          </p>
        </div>
      </div>

      <DesktopNavigation className="absolute top-10 left-0 right-0 z-50" />

      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "40px 40px",
            animation: "float 20s ease-in-out infinite",
          }}
        ></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-20">
        {/* Background Image Carousel */}
        <div className="absolute inset-0">
          {brunchImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80"></div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair mb-6 text-white leading-tight">
              Saturday
              <span className="block text-[#D4AF37] mt-2">Brunch</span>
            </h1>

            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-8"></div>

            <p className="text-2xl md:text-3xl font-playfair text-[#D4AF37] mb-4 italic">
              {soulBrunchMenu.subtitle}
            </p>

            {/* Price and Launch Info */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
              <div className="bg-gradient-to-r from-[#D4AF37]/20 to-[#B8941F]/20 backdrop-blur-sm px-6 py-3 rounded-full border border-[#D4AF37]/30">
                <span className="text-xl md:text-2xl font-playfair text-[#D4AF37] font-bold">
                  {soulBrunchMenu.price} per person
                </span>
              </div>
              <div className="bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 backdrop-blur-sm px-6 py-3 rounded-full border border-emerald-500/30">
                <span className="text-lg font-montserrat text-emerald-400">
                  Launching {soulBrunchMenu.launch_date}
                </span>
              </div>
            </div>

            {/* Chef Information */}
            <div className="mb-8">
              <p className="text-lg font-montserrat text-[#D4AF37]/90 mb-2">
                Curated by
              </p>
              <p className="text-xl md:text-2xl font-playfair text-white font-semibold">
                {soulBrunchMenu.chef}
              </p>
            </div>

            {/* Experience Description */}
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-2xl border border-white/10 mb-8">
              <p className="text-lg md:text-xl font-montserrat text-white/90 max-w-3xl mx-auto leading-relaxed mb-4">
                Experience our{" "}
                <span className="text-[#D4AF37] font-semibold">
                  Saturday Brunch
                </span>{" "}
                - a unique dining concept combining the convenience of a buffet
                with the freshness of dishes prepared and served directly from
                our kitchen to your table.
              </p>
              <p className="text-base md:text-lg font-montserrat text-white/80 max-w-3xl mx-auto leading-relaxed">
                Perfect for both Indian food enthusiasts and newcomers to Indian
                cuisine, featuring authentic flavors, gourmet chaats, and
                innovative dishes that celebrate tradition with a modern twist.
              </p>
            </div>

            {/* Image Indicators */}
            <div className="flex justify-center mt-12 space-x-2">
              {brunchImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? "bg-[#D4AF37] scale-125"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#D4AF37] rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#D4AF37] rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Menu Content Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          {/* How It Works Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair text-[#D4AF37] mb-8">
              How Our Brunch Experience Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <div className="w-16 h-16 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🍽️</span>
                </div>
                <h3 className="text-xl font-playfair text-white mb-3">
                  Buffet Selection
                </h3>
                <p className="text-white/80 font-montserrat text-sm leading-relaxed">
                  Choose from our curated buffet featuring salads, chaats, and
                  appetizers you can serve yourself
                </p>
              </div>
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <div className="w-16 h-16 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👨‍🍳</span>
                </div>
                <h3 className="text-xl font-playfair text-white mb-3">
                  Fresh from Kitchen
                </h3>
                <p className="text-white/80 font-montserrat text-sm leading-relaxed">
                  Hot main courses, breads, and desserts prepared fresh and
                  served directly to your table
                </p>
              </div>
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 md:col-span-2 lg:col-span-1">
                <div className="w-16 h-16 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌶️</span>
                </div>
                <h3 className="text-xl font-playfair text-white mb-3">
                  Authentic Indian Flavors
                </h3>
                <p className="text-white/80 font-montserrat text-sm leading-relaxed">
                  Traditional recipes with modern presentation, perfect for both
                  Indian food lovers and first-time explorers
                </p>
              </div>
            </div>
          </div>

          {/* Menu Legend */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center gap-8 bg-black/30 backdrop-blur-sm px-8 py-4 rounded-2xl border border-white/20">
              <div className="flex items-center">
                <span className="text-2xl mr-3">🟢</span>
                <span className="text-base font-montserrat text-white">
                  Vegetarian
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-3">🔴</span>
                <span className="text-base font-montserrat text-white">
                  Non-Vegetarian
                </span>
              </div>
            </div>
          </div>

          {/* Menu Categories */}
          {soulBrunchMenu.categories.map((category, index) => (
            <MenuCategorySection key={index} category={category} />
          ))}

          {/* Indian Food Guide for Non-Indian Customers */}
          <div className="mt-20 mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair text-center text-[#D4AF37] mb-8">
              New to Indian Cuisine? We've Got You Covered!
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <h3 className="text-xl font-playfair text-[#D4AF37] mb-4">
                  🥗 Chaat - Indian Street Food
                </h3>
                <p className="text-white/80 font-montserrat text-sm leading-relaxed mb-3">
                  Chaat refers to savory snacks typically served at roadside
                  tracks in India. Think of them as flavorful appetizers with a
                  perfect balance of sweet, sour, spicy, and tangy tastes.
                </p>
                <p className="text-white/70 font-montserrat text-xs">
                  Try: Pani Puri (crispy shells with flavored water) or Chole
                  Aloo Tikki (spiced chickpeas with potato patties)
                </p>
              </div>
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <h3 className="text-xl font-playfair text-[#D4AF37] mb-4">
                  🔥 Small Plates - Kebabs & Tikkas
                </h3>
                <p className="text-white/80 font-montserrat text-sm leading-relaxed mb-3">
                  Kebabs are marinated meats, seafood, or vegetables grilled in
                  our traditional tandoor clay oven. These smoky, aromatic small
                  plates are perfect for sharing and showcase the art of Indian
                  grilling.
                </p>
                <p className="text-white/70 font-montserrat text-xs">
                  Try: Bhatti Paneer Multani Tikka (grilled cottage cheese) or
                  Dhaba Murgh Dhuadar Tikka (smoky chicken tikka)
                </p>
              </div>
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <h3 className="text-xl font-playfair text-[#D4AF37] mb-4">
                  🍛 Main Courses
                </h3>
                <p className="text-white/80 font-montserrat text-sm leading-relaxed mb-3">
                  Our main courses feature rich curries, grilled specialties,
                  and comfort foods. Most dishes come with aromatic spices but
                  can be adjusted for spice level preferences.
                </p>
                <p className="text-white/70 font-montserrat text-xs">
                  Try: Pindi Chole (spiced chickpeas) - a mild and flavorful
                  vegetarian option
                </p>
              </div>
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <h3 className="text-xl font-playfair text-[#D4AF37] mb-4">
                  🫓 Indian Breads
                </h3>
                <p className="text-white/80 font-montserrat text-sm leading-relaxed mb-3">
                  Indian breads are perfect for scooping up curries and gravies.
                  From soft naan to crispy parathas, each type offers a unique
                  texture and flavor.
                </p>
                <p className="text-white/70 font-montserrat text-xs">
                  Recommended: Start with plain naan or roti - mild and
                  versatile
                </p>
              </div>
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <h3 className="text-xl font-playfair text-[#D4AF37] mb-4">
                  🍮 Desserts
                </h3>
                <p className="text-white/80 font-montserrat text-sm leading-relaxed mb-3">
                  Indian desserts are typically milk-based and sweetened with
                  natural ingredients like cardamom and saffron. They're rich,
                  aromatic, and the perfect ending to your meal.
                </p>
                <p className="text-white/70 font-montserrat text-xs">
                  Must-try: Gulab Jamun - warm, soft dumplings in sweet syrup
                </p>
              </div>
            </div>
            <div className="text-center mt-8">
              <p className="text-white/70 font-montserrat text-sm italic">
                Our staff is always happy to explain dishes and help you choose
                items based on your taste preferences and spice tolerance!
              </p>
            </div>
          </div>

          {/* Back to Menus button */}
          <div className="text-center mt-20 mb-16">
            <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/10 backdrop-blur-sm p-8 rounded-3xl border border-[#D4AF37]/20 max-w-4xl mx-auto mb-8">
              <h3 className="text-2xl md:text-3xl font-playfair text-[#D4AF37] mb-4">
                Ready to Experience Soul Weekend Brunch?
              </h3>
              <p className="text-white/80 font-montserrat mb-6 leading-relaxed">
                Join us every Saturday starting {soulBrunchMenu.launch_date} for
                an unforgettable culinary journey. Reserve your table now and be
                among the first to experience Chef Akhilesh Pathak's innovative
                brunch concept.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/reservations">
                  <Button className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-black hover:from-[#B8941F] hover:to-[#D4AF37] font-montserrat font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#D4AF37]/25">
                    Reserve Your Table
                  </Button>
                </Link>
                <Link href={"tel:+65 80121181"} className="ml-0 sm:ml-4">
                  <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black font-montserrat font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105">
                    or call us for more information : +65 80121181
                  </Button>
                </Link>
              </div>
            </div>

            <Link href="/menu">
              <Button className="bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-montserrat font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105">
                Back to All Menus
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
