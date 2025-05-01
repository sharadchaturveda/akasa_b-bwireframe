"use client";

import { memo, useState } from "react";
import { MobilePrimaryButton } from "./MobilePrimaryButton";

/**
 * MobileEventsInquiryFormSection Component
 * 
 * A mobile-optimized version of the Events page inquiry form section
 */
const MobileEventsInquiryFormSection = memo(function MobileEventsInquiryFormSection() {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    guestCount: "",
    date: "",
    message: ""
  });
  
  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        eventType: "",
        guestCount: "",
        date: "",
        message: ""
      });
      
      // Reset submission status after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1000);
  };

  return (
    <section className="w-full bg-black py-12 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section heading */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-playfair text-white mb-2">Inquire About Your Event</h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-[#E6C78B]/80 to-transparent mx-auto mb-4"></div>
          <p className="text-sm text-white/80 max-w-md mx-auto">
            Fill out the form below and our events team will get back to you within 24 hours.
          </p>
        </div>
        
        {/* Inquiry form - optimized for mobile */}
        <div className="max-w-md mx-auto">
          {isSubmitted ? (
            <div className="bg-[#1A2A3A]/50 border border-[#E6C78B]/30 rounded-lg p-6 text-center animate-fadeIn">
              <svg className="w-12 h-12 text-[#E6C78B] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="text-xl font-playfair text-white mb-2">Thank You!</h3>
              <p className="text-sm text-white/80">
                Your inquiry has been submitted successfully. Our team will contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name field */}
              <div>
                <label htmlFor="name" className="block text-xs text-white/80 mb-1">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/40 border border-white/20 rounded-md px-3 py-2 text-sm text-white focus:border-[#E6C78B]/50 focus:outline-none"
                />
              </div>
              
              {/* Email field */}
              <div>
                <label htmlFor="email" className="block text-xs text-white/80 mb-1">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/40 border border-white/20 rounded-md px-3 py-2 text-sm text-white focus:border-[#E6C78B]/50 focus:outline-none"
                />
              </div>
              
              {/* Phone field */}
              <div>
                <label htmlFor="phone" className="block text-xs text-white/80 mb-1">Phone *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/40 border border-white/20 rounded-md px-3 py-2 text-sm text-white focus:border-[#E6C78B]/50 focus:outline-none"
                />
              </div>
              
              {/* Event Type field */}
              <div>
                <label htmlFor="eventType" className="block text-xs text-white/80 mb-1">Event Type *</label>
                <select
                  id="eventType"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/40 border border-white/20 rounded-md px-3 py-2 text-sm text-white focus:border-[#E6C78B]/50 focus:outline-none"
                >
                  <option value="">Select Event Type</option>
                  <option value="Private Dining">Private Dining</option>
                  <option value="Corporate Event">Corporate Event</option>
                  <option value="Celebration">Celebration</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              {/* Guest Count field */}
              <div>
                <label htmlFor="guestCount" className="block text-xs text-white/80 mb-1">Number of Guests *</label>
                <input
                  type="number"
                  id="guestCount"
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full bg-black/40 border border-white/20 rounded-md px-3 py-2 text-sm text-white focus:border-[#E6C78B]/50 focus:outline-none"
                />
              </div>
              
              {/* Date field */}
              <div>
                <label htmlFor="date" className="block text-xs text-white/80 mb-1">Preferred Date *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/40 border border-white/20 rounded-md px-3 py-2 text-sm text-white focus:border-[#E6C78B]/50 focus:outline-none"
                />
              </div>
              
              {/* Message field */}
              <div>
                <label htmlFor="message" className="block text-xs text-white/80 mb-1">Additional Information</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-black/40 border border-white/20 rounded-md px-3 py-2 text-sm text-white focus:border-[#E6C78B]/50 focus:outline-none"
                ></textarea>
              </div>
              
              {/* Submit button */}
              <div className="pt-2">
                <MobilePrimaryButton
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                </MobilePrimaryButton>
              </div>
              
              {/* Privacy note */}
              <p className="text-xs text-white/50 text-center mt-4">
                By submitting this form, you agree to our privacy policy and terms of service.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
});

export default MobileEventsInquiryFormSection;
