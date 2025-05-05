"use client";

import { useState, useEffect } from "react";
import Navigation from "@/components/home/Navigation";
import Footer from "@/components/home/Footer";
import HeroSection from "@/components/events/HeroSection";
import CategoriesSection from "@/components/events/CategoriesSection";
import EventListingsSection from "@/components/events/EventListingsSection";
import dynamic from "next/dynamic";

/**
 * Dynamically import below-the-fold components for better performance
 *
 * Using dynamic imports for components that are not immediately visible
 * reduces the initial bundle size and improves page load time.
 * The loading placeholder maintains layout stability during loading.
 */
const TestimonialsSection = dynamic(() => import("@/components/events/TestimonialsSection"), {
  loading: () => <div className="h-[50vh] bg-black"></div> // Placeholder with same height
});
const InquiryFormSection = dynamic(() => import("@/components/events/InquiryFormSection"), {
  loading: () => <div className="h-[50vh] bg-black"></div> // Placeholder with same height
});

// Import mobile-specific components and utilities
import { isMobileDevice } from "@/utils/mobileUtils";
import MobileOptimizer from "@/components/mobile/MobileOptimizer";
import MobileEventsHeroSectionFixed from "@/components/mobile/MobileEventsHeroSectionFixed";
import MobileEventsCategoriesSection from "@/components/mobile/MobileEventsCategoriesSection";
import MobileEventsListingsSection from "@/components/mobile/MobileEventsListingsSection";
import MobileEventsTestimonialsSection from "@/components/mobile/MobileEventsTestimonialsSection";
import MobileEventsInquiryFormSection from "@/components/mobile/MobileEventsInquiryFormSection";

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

  // Track whether the user is on a mobile device
  const [isMobile, setIsMobile] = useState(false);

  /**
   * Mobile Detection Effect
   *
   * Detects if the user is on a mobile device and updates state accordingly.
   * Also adds a resize listener to handle device orientation changes or
   * browser window resizing that might change the device classification.
   */
  useEffect(() => {
    // Initial device detection
    setIsMobile(isMobileDevice());

    // Handler for window resize events
    const handleResize = () => {
      setIsMobile(isMobileDevice());
    };

    // Add event listener for resize
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener when component unmounts
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array means this effect runs once on mount

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
      description: "Celebrate your special day in style! Explore the best birthday restaurants where unforgettable memories are made. From cozy gatherings to grand celebrations.",
      image: "/images/events/listings/birthday.jpg", // Image named after event type for better organization
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
      {/* Mobile-specific performance optimizations */}
      <MobileOptimizer />

      {/* Navigation bar - shared between mobile and desktop */}
      <Navigation />

      {/*
        Conditional rendering based on device type
        This approach allows for completely separate component trees for
        mobile and desktop, enabling device-specific optimizations
      */}
      {isMobile ? (
        // Mobile version - optimized for touch and smaller screens
        <>
          {/* Mobile-specific hero section with fixed positioning */}
          <MobileEventsHeroSectionFixed />

          {/* Mobile-optimized categories section with touch-friendly filters */}
          <MobileEventsCategoriesSection
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            eventCategories={eventCategories}
          />

          {/* Mobile-optimized event listings with simplified layout */}
          <MobileEventsListingsSection
            filteredEvents={filteredEvents}
            eventCategories={eventCategories}
          />

          {/* Mobile-optimized testimonials with carousel navigation */}
          <MobileEventsTestimonialsSection />

          {/* Mobile-optimized inquiry form with touch-friendly inputs */}
          <MobileEventsInquiryFormSection />
        </>
      ) : (
        // Desktop version - optimized for larger screens
        <>
          {/* Desktop hero section with parallax effects */}
          <HeroSection />

          {/* Desktop categories section with hover effects */}
          <CategoriesSection
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            eventCategories={eventCategories}
          />

          {/* Desktop event listings with alternating layout */}
          <EventListingsSection
            filteredEvents={filteredEvents}
            eventCategories={eventCategories}
          />

          {/*
            Dynamically imported components for below-the-fold content
            These will only load when needed, improving initial page load time
          */}
          <TestimonialsSection />
          <InquiryFormSection />
        </>
      )}

      {/* Footer - shared between mobile and desktop */}
      <Footer />
    </main>
  );
}
