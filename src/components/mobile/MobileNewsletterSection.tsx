"use client";

import { memo, useState } from "react";
import { MobilePrimaryButton } from "./MobilePrimaryButton";

/**
 * MobileNewsletterSection Component
 * 
 * A mobile-optimized version of the Offers page newsletter section
 */
const MobileNewsletterSection = memo(function MobileNewsletterSection() {
  // Form state
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail("");
      
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
        <div className="text-center mb-6">
          <h2 className="text-2xl font-playfair text-white mb-2">Stay Updated</h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-[#E6C78B]/80 to-transparent mx-auto mb-4"></div>
          <p className="text-sm text-white/80 max-w-md mx-auto">
            Subscribe to our newsletter for exclusive offers and updates
          </p>
        </div>
        
        {/* Newsletter form - optimized for mobile */}
        <div className="max-w-md mx-auto">
          {isSubmitted ? (
            <div className="bg-[#1A2A3A]/50 border border-[#E6C78B]/30 rounded-lg p-6 text-center animate-fadeIn">
              <svg className="w-12 h-12 text-[#E6C78B] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="text-xl font-playfair text-white mb-2">Thank You!</h3>
              <p className="text-sm text-white/80">
                You've been successfully subscribed to our newsletter.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-xs text-white/80 mb-1">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-black/40 border border-white/20 rounded-md px-3 py-2 text-sm text-white focus:border-[#E6C78B]/50 focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>
              
              <div className="pt-2">
                <MobilePrimaryButton
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </MobilePrimaryButton>
              </div>
            </form>
          )}
          
          <p className="text-xs text-white/50 text-center mt-4">
            By subscribing, you agree to receive marketing communications from Akasa. You can unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
});

export default MobileNewsletterSection;
