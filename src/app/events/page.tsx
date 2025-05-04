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
    { id: "birthday", name: "Birthday" },
    { id: "anniversary", name: "Anniversary" },
    { id: "office-lunch", name: "Office Lunch" },
    { id: "office-parties", name: "Office Parties" },
    { id: "networking", name: "Networking Events" }
  ];

  // Event data
  const events = [
    {
      id: 1,
      title: "Birthday",
      description: "Celebrate your special day in style! Explore the best birthday restaurants where unforgettable memories are made. From cozy gatherings to grand celebrations.",
      image: "/images/events/listings/birthday.jpg",
      category: "birthday",
      features: ["Customized menu", "Dedicated service staff", "Elegant table settings", "Capacity: 8-20 guests"],
      price: "Starting at $1,200"
    },
    {
      id: 2,
      title: "Anniversary",
      description: "Make your anniversary unforgettable! Discover the finest restaurants for a romantic celebration in Singapore. Whether it's an elegant dinner or an intimate evening.",
      image: "/images/events/listings/anniversary.jpg",
      category: "anniversary",
      features: ["Elegant dining setup", "Romantic ambiance", "Special anniversary menu", "Complimentary champagne toast"],
      price: "Starting at $180 per couple"
    },
    {
      id: 3,
      title: "Office Lunch",
      description: "Elevate your office lunch experience! Discover the best dining options and catering services to make your team meals enjoyable and stress-free.",
      image: "/images/events/listings/office-lunch.jpg",
      category: "office-lunch",
      features: ["Express service option", "Customizable menu packages", "Private dining area", "Capacity: up to 50 guests"],
      price: "Starting at $45 per person"
    },
    {
      id: 4,
      title: "Office Parties",
      description: "Make your office parties unforgettable! Whether it's a team celebration, holiday gathering, or milestone event, find the perfect venue or catering services.",
      image: "/images/events/listings/office-parties.jpg",
      category: "office-parties",
      features: ["Full venue rental option", "Custom cocktail creation", "Entertainment options", "Capacity: up to 100 guests"],
      price: "Starting at $2,500"
    },
    {
      id: 5,
      title: "Networking Events",
      description: "Host networking events that leave a lasting impression! Discover the perfect venues and services to create a professional yet inviting atmosphere for meaningful connections.",
      image: "/images/events/listings/networking-events.jpg",
      category: "networking",
      features: ["Professional setup", "Audio-visual equipment", "Networking-friendly layout", "Catering options available"],
      price: "Starting at $1,800"
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
