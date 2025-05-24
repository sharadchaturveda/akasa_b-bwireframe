"use client";

import { useEffect } from "react";
import Navigation from "@/components/home/Navigation";
import Footer from "@/components/home/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import MenuCategorySection from "@/components/menu/MenuCategorySection";

// Vegan Menu Data (Injected from user)
const veganMenuData = {
  "restaurant_name": "AKASA",
  "menu_type": "VEGAN MENU",
  "sections": [
    {
      "name": "APPETIZER",
      "items": [
        {
          "name": "Pilla Mirch Broccoli Kebab"
        },
        {
          "name": "Multani Soy Chaap"
        }
      ]
    },
    {
      "name": "MAIN COURSE",
      "items": [
        {
          "name": "Subz Hundi"
        },
        {
          "name": "Palak Lessoni"
        },
        {
          "name": "Gajar Matter Masala"
        },
        {
          "name": "Gobi Aloo Adrakhi"
        },
        {
          "name": "Kheere Tamatar Tarkari"
        },
        {
          "name": "Aloo Jeera"
        },
        {
          "name": "Mushroom Masala"
        },
        {
          "name": "Dal Dhaba"
        },
        {
          "name": "Dal Tadka"
        },
        {
          "name": "Matar Dum pulao"
        },
        {
          "name": "Jeera Rice"
        },
        {
          "name": "Steamed Rice"
        }
      ]
    },
    {
      "name": "INDIAN BREAD",
      "items": [
        {
          "name": "Roti | Paratha"
        }
      ]
    },
    {
      "name": "DESSERT",
      "items": [
        {
          "name": "Dal Payasam"
        }
      ]
    }
  ]
};

//Transform the data to match the expected structure for MenuCategorySection
const categories = veganMenuData.sections.map(section => ({
  category_name: section.name, // Correct mapping
  items: section.items.map(item => {
    // Set prices for specific items
    let price = "TBD";

    // APPETIZER prices
    if (item.name.includes("Broccoli")) price = "$23";
    if (item.name.includes("Soy Chaap")) price = "$22";

    if (item.name.includes("Subz")) price = "$22";
    if (item.name.includes("Palak")) price = "$23";
    if (item.name.includes("Gajar")) price = "$22";
    if (item.name.includes("Kheere") || item.name.includes("Tamatar")) price = "$20";
    if (item.name === "Dal Dhaba") price = "$20";
    if (item.name === "Dal Tadka") price = "$20";
    if (item.name.includes("Matar") || item.name.includes("pulao")) price = "$24";

    // DESSERT prices
    if (item.name.includes("Payasam")) price = "$14";

    return { name: item.name, price, description: null };
  })
}));


export default function VeganMenuPage() {
  // Load page-specific styles
  useEffect(() => {
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
      <Navigation />;

      {/* Hero Section */}
      <section className="w-full bg-[url('/images/menu/vegan/hero/hero.jpg')] bg-cover bg-center py-64 relative">
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-playfair mb-6 text-white">Vegan Menu</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#E6C78B] to-transparent mx-auto mb-6"></div>
          <p className="text-lg md:text-xl font-montserrat text-white/80 max-w-3xl mx-auto">
            Explore our delicious plant-based options
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
          {/* Menu Categories */}
          {categories.map((category, index) => (
            <MenuCategorySection key={index} category={category} />
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