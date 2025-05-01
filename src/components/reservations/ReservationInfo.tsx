"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ReservationInfo = memo(function ReservationInfo() {
  return (
    <div className="bg-black/40 backdrop-blur-sm p-8 md:p-12 border border-white/10 rounded-lg shadow-xl relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      ></div>

      <div className="relative z-10">
        <h2 className="text-3xl font-playfair mb-8 text-center text-white">
          <span className="relative">
            Dining Information
            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#E6C78B]/80 to-transparent"></span>
          </span>
        </h2>

        <div className="space-y-8">
          {/* Hours */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#1A2A3A] flex items-center justify-center">
              <svg className="w-6 h-6 text-[#E6C78B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-playfair text-white mb-4">Hours of Operation</h3>
              <div className="space-y-2 text-white/80">
                <div className="flex items-center">
                  <span className="w-36 font-medium">Monday - Saturday:</span>
                  <span className="text-[#E6C78B]">11:30 AM - 10:00 PM</span>
                </div>
                <div className="flex items-center">
                  <span className="w-36 font-medium">Sunday:</span>
                  <span className="text-[#E6C78B]">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#1A2A3A] flex items-center justify-center">
              <svg className="w-6 h-6 text-[#E6C78B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-playfair text-white mb-4">Location</h3>
              <div className="space-y-2 text-white/80">
                <p>79 Robinson Road, #01-03 Capitasky<br />Tanjong Pagar, Singapore 068897</p>
                <div className="flex items-start mt-2">
                  <span className="w-36 font-medium shrink-0">Parking:</span>
                  <span>Public parking available at nearby Capitasky building. MRT station within walking distance.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Policies */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#1A2A3A] flex items-center justify-center">
              <svg className="w-6 h-6 text-[#E6C78B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-playfair text-white mb-4">Reservation Policies</h3>
              <div className="space-y-3 text-white/80">
                <div className="flex items-start">
                  <span className="text-[#E6C78B] mr-3">•</span>
                  <span>Reservations are held for 15 minutes past the reserved time.</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#E6C78B] mr-3">•</span>
                  <span>For parties of 6 or more, a credit card is required to secure your reservation.</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#E6C78B] mr-3">•</span>
                  <span>Cancellations must be made at least 24 hours in advance to avoid a $25 per person fee.</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#E6C78B] mr-3">•</span>
                  <span>For private dining or large parties, please contact us directly.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#1A2A3A] flex items-center justify-center">
              <svg className="w-6 h-6 text-[#E6C78B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-playfair text-white mb-4">Contact Us</h3>
              <div className="space-y-2 text-white/80">
                <div className="flex items-center">
                  <span className="w-36 font-medium">Phone:</span>
                  <span className="text-[#E6C78B]">+65 6123 4567</span>
                </div>
                <div className="flex items-center">
                  <span className="w-36 font-medium">Email:</span>
                  <span className="text-[#E6C78B]">reservations@akasa.com</span>
                </div>
                <p className="mt-2">For immediate assistance or same-day reservations, please call us directly.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-4 text-center">
            <Link href="/menus">
              <Button className="bg-[#1A2A3A] text-white hover:bg-[#0A1A2A]">
                View Our Menus
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ReservationInfo;
