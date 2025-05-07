"use client";

import { memo, useEffect } from "react";
import Navigation from "@/components/home/Navigation";
import Footer from "@/components/home/Footer";
import HeroSection from "@/components/reservations/HeroSection";
import ReservationForm from "@/components/reservations/ReservationForm";
// Import our clean component instead of the old one
import ReservationInfo from "@/components/reservations/ReservationInfoClean";
import ReservationFAQ from "@/components/reservations/ReservationFAQ";
import { loadPageStyles } from '@/utils/loadPageStyles';

// Optimized Reservations Page
const ReservationsPage = memo(function ReservationsPage() {
  // Load page-specific CSS
  useEffect(() => {
    loadPageStyles('reservations');
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />
      <HeroSection />

      {/* Main content with decorative background */}
      <div className="relative pt-24 pb-8 md:pb-12">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-full opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}
          ></div>
        </div>

        {/* Content container */}
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          {/* Two-column layout for desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Reservation form */}
            <div className="order-2 lg:order-1">
              <ReservationForm />
            </div>

            {/* Restaurant information */}
            <div className="order-1 lg:order-2">
              <ReservationInfo />
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-24">
            <ReservationFAQ />
          </div>

          {/* Decorative separator */}
          <div className="w-24 h-1 mx-auto mt-24 mb-4 md:mb-8 bg-gradient-to-r from-transparent via-[#E6C78B] to-transparent"></div>
        </div>
      </div>

      <Footer />

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideBackground {
          0% { background-position: 0 0; }
          100% { background-position: 100% 100%; }
        }
      `}</style>
    </main>
  );
});

export default ReservationsPage;