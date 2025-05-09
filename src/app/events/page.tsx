"use client";

import { useState, useEffect } from "react";
import Navigation from "@/components/home/Navigation";
import Footer from "@/components/home/Footer";
import HeroSection from "@/components/events/HeroSection";
import CategoriesSection from "@/components/events/CategoriesSection";
import EventListingsSection from "@/components/events/EventListingsSection";


/**
 * Import components directly for now to ensure they appear
 * We'll optimize with dynamic imports after fixing the layout issues
 */
import TestimonialsSection from "@/components/events/TestimonialsSection";
import InquiryFormSection from "@/components/events/InquiryFormSection";

/**
 * EventsPage Component
 *
 * Main page component for the Events section of the website.
 * Features:
 * - Responsive design with separate mobile and desktop components
 * - Event filtering by category
 * - Dynamic imports for below-the-fold content
 * - Optimized performance with mobile-specific optimizations
 *
 * @returns {JSX.Element} The complete Events page
 */
export default function EventsPage() {
  /**
   * State Management
   */
  // Track the currently selected event category filter
  const [activeCategory, setActiveCategory] = useState("all");

  // We've removed the visibility tracking for now to ensure components appear

  // Preload event images for better performance
  useEffect(() => {
    // Preload critical event images
    const preloadImages = () => {
      // Get the first few event images to preload
      const imagesToPreload = events.slice(0, 3).map(event => event.image);

      // Preload each image
      imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };

    // Use requestIdleCallback for better performance if available
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(preloadImages, { timeout: 2000 });
    } else {
      // Fallback to setTimeout
      setTimeout(preloadImages, 1000);
    }
  }, []);

  // We've removed the visibility tracking useEffect

  /**
   * Event Categories Data
   *
   * Defines the available event categories for filtering.
   * Each category has an id (used for filtering) and a display name.
   */
  const eventCategories = [
    { id: "all", name: "All Events" },
    { id: "birthday", name: "Birthday" },
    { id: "anniversary", name: "Anniversary" },
    { id: "office-lunch", name: "Office Lunch" },
    { id: "office-parties", name: "Office Parties" },
    { id: "networking", name: "Networking Events" }
  ];

  /**
   * Event Data
   *
   * Comprehensive information about each event type offered.
   * Each event includes:
   * - id: Unique identifier
   * - title: Event type name
   * - description: Detailed description of the event offering
   * - image: Path to the event image (optimized for both mobile and desktop)
   * - category: Category ID for filtering (matches eventCategories)
   * - features: Array of key features/amenities included
   * - price: Starting price information
   */
  const events = [
    {
      id: 1,
      title: "Birthday",
      description: "Make your birthday celebration truly special! Discover the finest restaurants for a birthday celebration in Singapore. Whether it's an elegant dinner or an intimate evening.",
      image: "/images/events/listings/birthday.jpg", // Verify this path exists in your public folder
      category: "birthday",
      features: ["Customized menu", "Dedicated service staff", "Elegant table settings", "Capacity: 8-50 guests"],
      price: "Starting at $1,200"
    },
    {
      id: 2,
      title: "Anniversary",
      description: "Make your anniversary unforgettable! Discover the finest restaurants for a romantic celebration in Singapore. Whether it's an elegant dinner or an intimate evening.",
      image: "/images/events/listings/anniversary.jpg",
      category: "anniversary",
      features: ["Elegant dining setup", "Romantic ambiance", "Special anniversary menu", "Complimentary glass of prosecco for the couple"],
      price: "Starting at $180 per couple",
      termsApply: true
    },
    {
      id: 3,
      title: "Office Lunch",
      description: "Elevate your office lunch experience! Discover the best dining options and catering services to make your team meals enjoyable and stress-free.",
      image: "/images/events/listings/office-lunch.jpg",
      category: "office-lunch",
      features: ["Express service option", "Customizable menu packages", "Private dining area", "Capacity: up to 50 guests"],
      price: "Contact for pricing"
    },
    {
      id: 4,
      title: "Office Parties",
      description: "Make your office parties unforgettable! Whether it's a team celebration, holiday gathering, or milestone event, find the perfect venue or catering services.",
      image: "/images/events/listings/office-parties.jpg",
      category: "office-parties",
      features: ["Full venue rental option", "Custom cocktail creation", "Entertainment options", "Capacity: up to 60 guests"],
      price: "Starting at $2,500"
    },
    {
      id: 5,
      title: "Networking Events",
      description: "Host networking events that leave a lasting impression! Discover the perfect venues and services to create a professional yet inviting atmosphere for meaningful connections.",
      image: "/images/events/listings/networking-events.jpg",
      category: "networking",
      features: ["Professional setup", "Audio-visual equipment", "Networking-friendly layout", "Catering options available"],
      price: "Contact for pricing",
      pdfMenu: "/menus/event-menu.pdf"
    }
  ];

  /**
   * Filter events based on the active category
   *
   * If "all" is selected, show all events
   * Otherwise, filter to only show events matching the selected category
   */
  const filteredEvents = activeCategory === "all"
    ? events
    : events.filter(event => event.category === activeCategory);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navigation bar */}
      <Navigation />

      {/* Desktop hero section with parallax effects */}
      <HeroSection />

      {/* Desktop categories section with hover effects - hidden on mobile */}
      <div className="hidden md:block">
        <CategoriesSection
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          eventCategories={eventCategories}
        />
      </div>

      {/* Desktop event listings with alternating layout */}
      <EventListingsSection
        filteredEvents={filteredEvents}
        eventCategories={eventCategories}
      />

      {/* Testimonials section */}
      <TestimonialsSection />

      {/* Inquiry form section */}
      <InquiryFormSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
