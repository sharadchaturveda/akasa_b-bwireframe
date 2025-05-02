"use client";

import { useState, useEffect } from "react";
import Navigation from "@/components/home/Navigation";
import Footer from "@/components/home/Footer";
import HeroSection from "@/components/events/HeroSection";
import CategoriesSection from "@/components/events/CategoriesSection";
import EventListingsSection from "@/components/events/EventListingsSection";
import TestimonialsSection from "@/components/events/TestimonialsSection";
import InquiryFormSection from "@/components/events/InquiryFormSection";
import { isMobileDevice } from "@/utils/mobileUtils";
import MobileOptimizer from "@/components/mobile/MobileOptimizer";
import MobileEventsHeroSectionFixed from "@/components/mobile/MobileEventsHeroSectionFixed";
import MobileEventsCategoriesSection from "@/components/mobile/MobileEventsCategoriesSection";
import MobileEventsListingsSection from "@/components/mobile/MobileEventsListingsSection";
import MobileEventsTestimonialsSection from "@/components/mobile/MobileEventsTestimonialsSection";
import MobileEventsInquiryFormSection from "@/components/mobile/MobileEventsInquiryFormSection";

export default function EventsPage() {
  // State for active event category
  const [activeCategory, setActiveCategory] = useState("all");
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

  // Event categories
  const eventCategories = [
    { id: "all", name: "All Events" },
    { id: "private", name: "Private Dining" },
    { id: "corporate", name: "Corporate Events" },
    { id: "celebrations", name: "Celebrations" }
  ];

  // Event data
  const events = [
    {
      id: 1,
      title: "Private Dining Experience",
      description: "An intimate dining experience in our exclusive private room, perfect for special occasions and gatherings of up to 20 guests.",
      image: "/images/event3.jpg",
      category: "private",
      features: ["Customized menu", "Dedicated service staff", "Elegant table settings", "Capacity: 8-20 guests"],
      price: "Starting at $1,200"
    },
    {
      id: 2,
      title: "Corporate Luncheons",
      description: "Impress your clients and colleagues with our sophisticated corporate lunch packages, featuring a selection of our signature dishes.",
      image: "/images/gallery1.jpg",
      category: "corporate",
      features: ["Express service option", "Presentation equipment available", "Customizable menu packages", "Capacity: up to 50 guests"],
      price: "Starting at $45 per person"
    },
    {
      id: 3,
      title: "Wedding Receptions",
      description: "Celebrate your special day with an unforgettable culinary experience. Our wedding packages include customized menus and dedicated event planning.",
      image: "/images/gallery2.jpg",
      category: "celebrations",
      features: ["Full venue rental option", "Custom cocktail creation", "Wedding cake service", "Capacity: up to 100 guests"],
      price: "Starting at $8,000"
    },
    {
      id: 4,
      title: "Chef's Table Experience",
      description: "An exclusive dining experience at our Chef's Table, where Chef Akhilesh will personally prepare and present a special tasting menu for your group.",
      image: "/images/gallery3.jpg",
      category: "private",
      features: ["7-course tasting menu", "Wine pairing option", "Direct interaction with the chef", "Capacity: 6-8 guests"],
      price: "Starting at $180 per person"
    }
  ];

  // Filter events based on active category
  const filteredEvents = activeCategory === "all"
    ? events
    : events.filter(event => event.category === activeCategory);

  return (
    <main className="min-h-screen bg-black text-white">
      <MobileOptimizer />
      <Navigation />

      {isMobile ? (
        // Mobile version
        <>
          <MobileEventsHeroSectionFixed />
          <MobileEventsCategoriesSection
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            eventCategories={eventCategories}
          />
          <MobileEventsListingsSection
            filteredEvents={filteredEvents}
            eventCategories={eventCategories}
          />
          <MobileEventsTestimonialsSection />
          <MobileEventsInquiryFormSection />
        </>
      ) : (
        // Desktop version - unchanged
        <>
          <HeroSection />
          <CategoriesSection
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            eventCategories={eventCategories}
          />
          <EventListingsSection
            filteredEvents={filteredEvents}
            eventCategories={eventCategories}
          />
          <TestimonialsSection />
          <InquiryFormSection />
        </>
      )}

      <Footer />
    </main>
  );
}
