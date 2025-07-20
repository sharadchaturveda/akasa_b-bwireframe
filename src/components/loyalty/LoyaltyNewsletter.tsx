"use client";

import { memo } from "react";

const LoyaltyNewsletter = memo(function LoyaltyNewsletter() {
  return (
    <section className="w-full bg-black py-16 relative">
      {/* Background image with explicit dimensions */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/images/home/hero/hero-home.jpg?quality=60&width=1200')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      ></div>
      <div className="absolute inset-0 bg-black/80"></div>
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-playfair mb-4">Stay Updated</h2>
          <p className="text-lg font-montserrat text-white/70 mb-8">
            Subscribe to our newsletter to receive exclusive loyalty program updates, event invitations, and culinary insights directly to your inbox.
          </p>

          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 bg-white/10 border border-white/20 rounded-full text-white"
              required
            />
            <button className="group inline-flex items-center justify-center rounded-full text-sm font-montserrat font-medium tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden shadow-md hover:shadow-lg bg-[#1A2A3A] text-white px-8 py-3">
              {/* Gold fill animation */}
              <span className="absolute inset-0 rounded-full bg-[#E6C78B] transform -translate-x-[105%] group-hover:translate-x-0 transition-transform duration-500 will-change-transform"></span>
              <span className="relative flex-1 text-center group-hover:text-black transition-colors duration-300">
                Subscribe
              </span>
            </button>
          </form>

          <p className="text-xs text-white/50 mt-4">
            By subscribing, you agree to receive marketing communications from Akasa. You can unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
});

export default LoyaltyNewsletter; 