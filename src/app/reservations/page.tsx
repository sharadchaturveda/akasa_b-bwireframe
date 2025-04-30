"use client";

import { Button } from "@/components/ui/button";
import Navigation from "@/components/home/Navigation";
import Footer from "@/components/home/Footer";
import Image from "next/image";
import { memo } from "react";

// Hero Section Component
const HeroSection = memo(function HeroSection() {
  return (
    <section className="h-screen w-full bg-[url('/images/reservations/gallery3.jpg')] bg-cover bg-center flex flex-col items-center justify-center relative">
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="container mx-auto px-4 md:px-8 relative z-10 mt-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-playfair mb-6 text-white">{"Reserve Your Table"}</h1>
          <p className="text-lg md:text-xl font-montserrat text-white/90 mb-8 leading-relaxed">
            {"Secure your dining experience at Akasa. We look forward to serving you the finest Indian cuisine in an elegant atmosphere."}
          </p>
        </div>
      </div>
    </section>
  );
});

export default function ReservationsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />
      <HeroSection />
      <div className="container mx-auto px-8 py-24">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-playfair mb-8 text-center">{"Complete Your Reservation"}</h2>

          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="date" className="block mb-2">{"Date"}</label>
                <input
                  type="date"
                  id="date"
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="time" className="block mb-2">{"Time"}</label>
                <input
                  type="time"
                  id="time"
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded text-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="guests" className="block mb-2">{"Number of Guests"}</label>
                <select
                  id="guests"
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded text-white"
                  required
                >
                  <option value="">{"Select number of guests"}</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>{`${num} ${num === 1 ? "guest" : "guests"}`}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="occasion" className="block mb-2">{"Occasion"}</label>
                <select
                  id="occasion"
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded text-white"
                >
                  <option value="">{"Select occasion"}</option>
                  <option value="birthday">{"Birthday"}</option>
                  <option value="anniversary">{"Anniversary"}</option>
                  <option value="business">{"Business"}</option>
                  <option value="other">{"Other"}</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="name" className="block mb-2">{"Full Name"}</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2">{"Email"}</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block mb-2">{"Phone Number"}</label>
              <input
                type="tel"
                id="phone"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="notes" className="block mb-2">{"Special Requests"}</label>
              <textarea
                id="notes"
                rows={4}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded text-white"
              ></textarea>
            </div>

            <div className="text-center">
              <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A] w-full max-w-xs" showArrow>
                {"Book Now"}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
}