"use client";

import { memo, useState } from "react";
import { MobilePrimaryButton } from "./MobilePrimaryButton";

/**
 * MobileNewsletterSection Component
 *
 * A mobile-optimized version of the Offers page newsletter section
 * Using the same content as the desktop version
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
      {/* Background image with explicit dimensions - mobile optimized */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/images/home/hero/hero-home.jpg?quality=60&width=800')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      ></div>
      <div className="absolute inset-0 bg-black/80"></div>

      <div className="px-4 relative z-10">
        <div className="max-w-sm mx-auto text-center">
          {/* Section heading - same content as desktop */}
          <h2 className="text-2xl font-playfair mb-4">{"Stay Updated"}</h2>
          <p className="text-sm font-montserrat text-white/70 mb-6">
            {"Subscribe to our newsletter to receive exclusive offers, event invitations, and culinary insights directly to your inbox."}
          </p>

          {/* Newsletter form - optimized for mobile */}
          {isSubmitted ? (
            <div className="bg-[#1A2A3A] border border-white/20 rounded-lg p-6 text-center animate-fadeIn shadow-lg">
              <svg className="w-10 h-10 text-[#E6C78B] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="text-xl font-playfair text-white mb-2">Thank You!</h3>
              <p className="text-sm text-white/80">
                You've been successfully subscribed to our newsletter.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-full text-white text-sm"
              />

              <MobilePrimaryButton
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </MobilePrimaryButton>
            </form>
          )}

          <p className="text-xs text-white/50 mt-4">
            {"By subscribing, you agree to receive marketing communications from Akasa. You can unsubscribe at any time."}
          </p>
        </div>
      </div>
    </section>
  );
});

export default MobileNewsletterSection;

