"use client";

import { Button } from "@/components/ui/button";
import { memo } from "react";
import Image from "next/image"
;

/**
 * InquiryFormSection Component
 *
 * Displays a contact form for event inquiries with a subtle background image.
 * This component is used on the Events page to allow users to submit event requests.
 *
 * Features:
 * - Responsive form layout (1 column on mobile, 2 columns on desktop)
 * - Required field validation
 * - Event type selection dropdown
 * - Date picker for preferred event date
 *
 * Note: Form submission is currently handled client-side only.
 * TODO: Connect to backend API for form submission handling
 *
 * @returns {JSX.Element} A section containing the inquiry form
 */
const InquiryFormSection = memo(function InquiryFormSection() {
  return (
    <section id="inquiry" className="w-full bg-black pb-16 relative">
      {/* Background image - Using next/image for better performance and optimization */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image src="/images/menu/hero/gallery-6.jpg"
          alt="Inquiry form background"
          fill
          sizes="100vw" // Full viewport width since this is a background
          className="object-cover"
          quality={60} // Lower quality is acceptable for a dimmed background
          loading="lazy" // This component is below the fold
          priority={false}
        />
      </div>

      {/* Dark overlay to improve text readability over the background image */}
      <div className="absolute inset-0 bg-black/80"></div>

      {/* Main content container with higher z-index to appear above background */}
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Section heading */}
          <div className="text-center mb-12 pt-16"> {/* Added pt-16 for top padding */}
            <h2 className="text-3xl md:text-4xl font-playfair mb-4">Inquire About Your Event</h2>
            <p className="text-lg font-montserrat text-white/70 max-w-2xl mx-auto">
              Let us know what you're planning, and our events team will get back to you shortly.
            </p>
          </div>

          {/* Inquiry form with semi-transparent background and blur effect */}
          <form className="bg-black/70 p-8 backdrop-blur-sm border border-[#1A2A3A]">
            {/* First row: Name and Email - 2 columns on desktop, 1 on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="name" className="block mb-2 font-montserrat">Full Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-[#1A2A3A] border border-[#2A3A4A] text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 font-montserrat">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-[#1A2A3A] border border-[#2A3A4A] text-white"
                  required
                />
              </div>
            </div>

            {/* Second row: Phone and Event Type - 2 columns on desktop, 1 on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="phone" className="block mb-2 font-montserrat">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 bg-[#1A2A3A] border border-[#2A3A4A] text-white"
                  // Phone is optional, so no required attribute
                />
              </div>
              <div>
                <label htmlFor="eventType" className="block mb-2 font-montserrat">Event Type</label>
                <select
                  id="eventType"
                  className="w-full px-4 py-3 bg-[#1A2A3A] border border-[#2A3A4A] text-white"
                  required
                >
                  <option value="">Select Event Type</option>
                  <option value="private">Private Dining</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="wedding">Wedding</option>
                  <option value="birthday">Birthday</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Third row: Date and Guests - 2 columns on desktop, 1 on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="date" className="block mb-2 font-montserrat">Preferred Date</label>
                <input
                  type="date"
                  id="date"
                  className="w-full px-4 py-3 bg-[#1A2A3A] border border-[#2A3A4A] text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="guests" className="block mb-2 font-montserrat">Number of Guests</label>
                <input
                  type="number"
                  id="guests"
                  min="1"
                  max="100" // Setting a reasonable maximum for planning purposes
                  className="w-full px-4 py-3 bg-[#1A2A3A] border border-[#2A3A4A] text-white"
                  required
                />
              </div>
            </div>

            {/* Fourth row: Additional Information - full width */}
            <div className="mb-6">
              <label htmlFor="message" className="block mb-2 font-montserrat">Additional Information</label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-3 bg-[#1A2A3A] border border-[#2A3A4A] text-white"
                // Message is optional, so no required attribute
              ></textarea>
            </div>

            {/* Submit button - full width on mobile, auto width on desktop */}
            <div className="text-center mt-4">
              <Button className="bg-[#1A2A3A] text-white px-8 py-3 w-full md:w-auto">
                Submit Inquiry
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
});

export default InquiryFormSection;



