"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/home/Navigation";
import Footer from "@/components/home/Footer";
import { memo, useState, useEffect } from "react";
import { isMobileDevice } from "@/utils/mobileUtils";
import MobileOptimizer from "@/components/mobile/MobileOptimizer";
import MobileOffersPage from "@/components/mobile/MobileOffersPage";

// Hero Section Component
const HeroSection = memo(function HeroSection() {
  return (
    <section className="h-screen w-full bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background image with parallax effect */}
      <div className="absolute inset-0 z-0 transform scale-110" style={{
        willChange: 'transform',
        transform: 'translateZ(-1px) scale(2)',
        zIndex: -1
      }}>
        <Image
          src="/images/offers/gallery5.jpg"
          alt="Offers background"
          fill
          sizes="100vw"
          className="object-cover"
          quality={70}
          priority
          loading="eager"
          style={{
            objectPosition: "center",
            opacity: 0.6
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black/80"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent"></div>
      <div className="absolute top-20 right-10 w-40 h-40 rounded-full bg-[#E6C78B]/10 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-60 h-60 rounded-full bg-[#E6C78B]/5 blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Elegant heading with decorative elements */}
          <div className="mb-6 relative">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-[#E6C78B] to-transparent"></div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair mb-6 relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">Special Offers & Promotions</span>
              <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#E6C78B]/80 to-transparent"></div>
            </h1>
          </div>

          <p className="text-lg md:text-xl font-montserrat text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto">
            {"Discover our exclusive deals and seasonal promotions designed to enhance your dining experience at Akasa."}
          </p>

          {/* Standardized button */}
          <Link href="#current-offers">
            <button className="group inline-flex items-center justify-center rounded-full text-sm font-montserrat font-medium tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden shadow-md hover:shadow-lg bg-[#1A2A3A] text-white px-8 py-4">
              {/* Gold fill animation */}
              <span className="absolute inset-0 rounded-full bg-[#E6C78B] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>

              <span className="relative flex-1 text-center group-hover:text-black transition-colors duration-300">
                View Offers
              </span>
            </button>
          </Link>

          {/* Decorative element */}
          <div className="flex justify-center mt-16">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-[#1A2A3A] opacity-30"></div>
              <svg className="w-8 h-8 text-[#E6C78B]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.41,11.58L12.41,2.58C12.04,2.21 11.53,2 11,2H4C2.9,2 2,2.9 2,4V11C2,11.53 2.21,12.04 2.59,12.41L3,12.81C3.9,12.27 4.94,12 6,12A6,6 0 0,1 12,18C12,19.06 11.73,20.1 11.19,21L11.59,21.4C11.96,21.78 12.47,22 13,22H20C21.1,22 22,21.1 22,20V13C22,12.47 21.79,11.96 21.41,11.58M5.5,7A1.5,1.5 0 0,1 4,5.5A1.5,1.5 0 0,1 5.5,4A1.5,1.5 0 0,1 7,5.5A1.5,1.5 0 0,1 5.5,7M17.27,15.27L13,19.54L10.73,17.27C10.34,16.88 10.34,16.23 10.73,15.85C11.11,15.46 11.77,15.46 12.15,15.85L13,16.71L16.12,13.58C16.51,13.2 17.16,13.2 17.54,13.58C17.93,13.97 17.93,14.62 17.54,15L17.27,15.27Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

// Offer Card Component
const OfferCard = memo(function OfferCard({
  title,
  description,
  image,
  validUntil,
  code,
  link
}: {
  title: string;
  description: string;
  image: string;
  validUntil: string;
  code: string;
  link: string;
}) {
  return (
    <div className="group relative">
      {/* Card background with subtle glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E6C78B]/0 via-[#E6C78B]/30 to-[#E6C78B]/0 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

      <div className="relative bg-black/80 backdrop-blur-sm border border-white/5 rounded-lg overflow-hidden transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(230,199,139,0.2)]">
        <div className="relative h-[280px] overflow-hidden">
          {/* Decorative corner accent */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-[#E6C78B]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-[#E6C78B]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            quality={75}
          />

          {/* Elegant gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

          {/* Validity badge with animation */}
          <div className="absolute top-4 right-4 z-10 transform group-hover:scale-105 transition-transform duration-300">
            <div className="bg-[#E6C78B] text-black px-4 py-2 rounded-full text-xs font-medium shadow-lg">
              {`Valid until ${validUntil}`}
            </div>
          </div>
        </div>

        <div className="p-8 relative">
          <h3 className="text-2xl font-playfair mb-4 group-hover:text-[#E6C78B] transition-colors duration-300">{title}</h3>
          <p className="text-white/70 text-sm mb-6 leading-relaxed">{description}</p>

          {/* Fancy promo code display */}
          <div className="bg-[#1A2A3A] p-4 rounded-lg mb-6 border border-[#E6C78B]/20 relative overflow-hidden group-hover:border-[#E6C78B]/40 transition-colors duration-300">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#E6C78B]/0 via-[#E6C78B]/30 to-[#E6C78B]/0"></div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-white/80">Promo Code:</span>
              <span className="font-medium text-[#E6C78B] text-lg tracking-wider">{code}</span>
            </div>
          </div>

          {/* Standardized button */}
          <Link href={link}>
            <button className="group inline-flex items-center justify-center rounded-full text-sm font-montserrat font-medium tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden shadow-md hover:shadow-lg bg-[#1A2A3A] text-white px-6 py-3 w-full">
              {/* Gold fill animation */}
              <span className="absolute inset-0 rounded-full bg-[#E6C78B] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>

              <span className="relative flex-1 text-center group-hover:text-black transition-colors duration-300">
                Redeem Offer
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
});

// Current Offers Section Component
const CurrentOffersSection = memo(function CurrentOffersSection() {
  const offers = [
    {
      title: "Weekday Lunch Special",
      description: "Enjoy 20% off on all lunch menu items Monday through Thursday. Perfect for business lunches or midday treats.",
      image: "/images/offers/gallery1.jpg",
      validUntil: "December 31, 2025",
      code: "LUNCH20",
      link: "/reservations"
    },
    {
      title: "Anniversary Celebration",
      description: "Celebrating our 5th anniversary! Book a table for dinner and receive a complimentary bottle of premium wine.",
      image: "/images/menu/gallery2.jpg",
      validUntil: "November 30, 2025",
      code: "AKASA5YR",
      link: "/reservations"
    },
    {
      title: "Weekend Family Feast",
      description: "Family-style dining package for groups of 4 or more. Includes appetizers, main courses, and desserts at a special price.",
      image: "/images/menu/gallery3.jpg",
      validUntil: "January 15, 2026",
      code: "FAMILY4+",
      link: "/reservations"
    }
  ];

  return (
    <section id="current-offers" className="w-full bg-black py-20 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e6c78b' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
          animation: 'slideBackground 60s linear infinite'
        }}></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent z-10"></div>
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#E6C78B]/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-[#E6C78B]/10 to-transparent rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Elegant heading with decorative elements */}
        <div className="text-center mb-16 relative">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-[#E6C78B] to-transparent"></div>
          <h2 className="text-4xl md:text-6xl font-playfair mb-6 relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E6C78B] to-[#D4B679]">Current Offers</span>
            <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#E6C78B]/80 to-transparent"></div>
          </h2>
          <p className="text-lg md:text-xl font-montserrat text-white/80 max-w-3xl mx-auto leading-relaxed italic">
            {"Take advantage of these limited-time promotions to experience the best of Akasa at exceptional value."}
          </p>

          {/* Decorative tag icon */}
          <div className="flex justify-center mt-8 mb-4">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-[#1A2A3A] opacity-30"></div>
              <svg className="w-8 h-8 text-[#E6C78B]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.41,11.58L12.41,2.58C12.04,2.21 11.53,2 11,2H4C2.9,2 2,2.9 2,4V11C2,11.53 2.21,12.04 2.59,12.41L3,12.81C3.9,12.27 4.94,12 6,12A6,6 0 0,1 12,18C12,19.06 11.73,20.1 11.19,21L11.59,21.4C11.96,21.78 12.47,22 13,22H20C21.1,22 22,21.1 22,20V13C22,12.47 21.79,11.96 21.41,11.58M5.5,7A1.5,1.5 0 0,1 4,5.5A1.5,1.5 0 0,1 5.5,4A1.5,1.5 0 0,1 7,5.5A1.5,1.5 0 0,1 5.5,7Z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {offers.map((offer, index) => (
            <OfferCard
              key={index}
              title={offer.title}
              description={offer.description}
              image={offer.image}
              validUntil={offer.validUntil}
              code={offer.code}
              link={offer.link}
            />
          ))}
        </div>
      </div>

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes slideBackground {
          0% { background-position: 0 0; }
          100% { background-position: 100% 100%; }
        }
      `}</style>
    </section>
  );
});

// Loyalty Program Section Component
const LoyaltyProgramSection = memo(function LoyaltyProgramSection() {
  return (
    <section className="w-full bg-black py-20 relative overflow-hidden">
      {/* Background with parallax effect */}
      <div className="absolute inset-0 z-0 transform scale-110" style={{
        willChange: 'transform',
        transform: 'translateZ(-1px) scale(1.5)',
        zIndex: -1
      }}>
        <Image
          src="/images/home/drink.jpg"
          alt="Loyalty Program background"
          fill
          sizes="100vw"
          className="object-cover"
          quality={60}
          loading="lazy"
          style={{
            objectPosition: "center",
            opacity: 0.4
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/90"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent z-10"></div>
      <div className="absolute top-40 left-0 w-80 h-80 rounded-full bg-[#E6C78B]/5 blur-3xl"></div>
      <div className="absolute bottom-40 right-0 w-80 h-80 rounded-full bg-[#E6C78B]/5 blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-12 items-center">
          {/* Loyalty Program image with fancy border and effects */}
          <div className="relative group">
            {/* Decorative frame */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#E6C78B] to-[#D4B679] rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-lg border border-[#E6C78B]/20">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#E6C78B] opacity-70 z-10"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#E6C78B] opacity-70 z-10"></div>

              <Image
                src="/images/offers/gallery5.jpg"
                alt="Akasa Loyalty Program"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                quality={80}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

              {/* Loyalty badge overlay */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
                <div className="bg-[#E6C78B] text-black px-6 py-3 rounded-full text-sm font-medium shadow-lg">
                  Exclusive Member Benefits
                </div>
              </div>
            </div>
          </div>

          {/* Loyalty Program description with elegant styling */}
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-6 left-0 w-20 h-1 bg-gradient-to-r from-[#E6C78B] to-transparent"></div>
            <div className="absolute -bottom-6 right-0 w-20 h-1 bg-gradient-to-l from-[#E6C78B] to-transparent"></div>

            <div className="p-8 bg-black/40 backdrop-blur-md border border-white/5 rounded-lg shadow-2xl">
              <h2 className="text-4xl md:text-5xl font-playfair mb-6 relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E6C78B] to-[#D4B679]">Akasa Loyalty Program</span>
                <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-[#E6C78B] to-transparent"></div>
              </h2>

              <p className="text-base md:text-lg font-montserrat mb-8 text-white/90 leading-relaxed first-letter:text-4xl first-letter:font-playfair first-letter:text-[#E6C78B] first-letter:mr-1 first-letter:float-left">
                {"Join our exclusive loyalty program and earn points with every visit. Redeem your points for complimentary dishes, special experiences, and unique perks available only to our loyal guests."}
              </p>

              {/* Fancy tier cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                {/* Silver tier */}
                <div className="group/tier relative overflow-hidden">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E6C78B]/0 via-[#E6C78B]/30 to-[#E6C78B]/0 rounded-lg blur opacity-0 group-hover/tier:opacity-100 transition duration-1000"></div>
                  <div className="relative bg-[#1A2A3A] p-6 rounded-lg text-center border border-white/5 transition-all duration-300 group-hover/tier:border-[#E6C78B]/20">
                    <div className="w-12 h-12 rounded-full bg-[#E6C78B]/10 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-[#E6C78B]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z" />
                      </svg>
                    </div>
                    <h3 className="text-[#E6C78B] font-medium text-xl mb-2">Silver Tier</h3>
                    <p className="text-sm text-white/70">After 5 visits</p>
                    <div className="w-0 h-0.5 bg-[#E6C78B]/50 mx-auto mt-4 group-hover/tier:w-16 transition-all duration-500"></div>
                  </div>
                </div>

                {/* Gold tier */}
                <div className="group/tier relative overflow-hidden">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E6C78B]/0 via-[#E6C78B]/30 to-[#E6C78B]/0 rounded-lg blur opacity-0 group-hover/tier:opacity-100 transition duration-1000"></div>
                  <div className="relative bg-[#1A2A3A] p-6 rounded-lg text-center border border-white/5 transition-all duration-300 group-hover/tier:border-[#E6C78B]/20">
                    <div className="w-12 h-12 rounded-full bg-[#E6C78B]/10 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-[#E6C78B]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,15.4L8.24,17.67L9.24,13.39L5.92,10.51L10.3,10.13L12,6.1L13.71,10.14L18.09,10.52L14.77,13.4L15.77,17.68L12,15.4M20,8.04L14.81,7.64L12,2.5L9.19,7.64L4,8.04L8.46,11.97L7.17,17.13L12,14.33L16.83,17.13L15.54,11.97L20,8.04Z" />
                      </svg>
                    </div>
                    <h3 className="text-[#E6C78B] font-medium text-xl mb-2">Gold Tier</h3>
                    <p className="text-sm text-white/70">After 10 visits</p>
                    <div className="w-0 h-0.5 bg-[#E6C78B]/50 mx-auto mt-4 group-hover/tier:w-16 transition-all duration-500"></div>
                  </div>
                </div>

                {/* Platinum tier */}
                <div className="group/tier relative overflow-hidden">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E6C78B]/0 via-[#E6C78B]/30 to-[#E6C78B]/0 rounded-lg blur opacity-0 group-hover/tier:opacity-100 transition duration-1000"></div>
                  <div className="relative bg-[#1A2A3A] p-6 rounded-lg text-center border border-white/5 transition-all duration-300 group-hover/tier:border-[#E6C78B]/20">
                    <div className="w-12 h-12 rounded-full bg-[#E6C78B]/10 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-[#E6C78B]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                      </svg>
                    </div>
                    <h3 className="text-[#E6C78B] font-medium text-xl mb-2">Platinum Tier</h3>
                    <p className="text-sm text-white/70">After 20 visits</p>
                    <div className="w-0 h-0.5 bg-[#E6C78B]/50 mx-auto mt-4 group-hover/tier:w-16 transition-all duration-500"></div>
                  </div>
                </div>
              </div>

              {/* Standardized button */}
              <Link href="/loyalty-program">
                <button className="group inline-flex items-center justify-center rounded-full text-sm font-montserrat font-medium tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden shadow-md hover:shadow-lg bg-[#1A2A3A] text-white px-8 py-4">
                  {/* Gold fill animation */}
                  <span className="absolute inset-0 rounded-full bg-[#E6C78B] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>

                  <span className="relative flex-1 text-center group-hover:text-black transition-colors duration-300">
                    Join Now
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

// Newsletter Section Component
const NewsletterSection = memo(function NewsletterSection() {
  return (
    <section className="w-full bg-black py-16 relative">
      {/* Background image with explicit dimensions */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/images/home/hero.jpg?quality=60&width=1200')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      ></div>
      <div className="absolute inset-0 bg-black/80"></div>
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-playfair mb-4">{"Stay Updated"}</h2>
          <p className="text-lg font-montserrat text-white/70 mb-8">
            {"Subscribe to our newsletter to receive exclusive offers, event invitations, and culinary insights directly to your inbox."}
          </p>

          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 bg-white/10 border border-white/20 rounded-full text-white"
              required
            />
            <Button className="px-8 py-3 whitespace-nowrap">
              {"Subscribe"}
            </Button>
          </form>

          <p className="text-xs text-white/50 mt-4">
            {"By subscribing, you agree to receive marketing communications from Akasa. You can unsubscribe at any time."}
          </p>
        </div>
      </div>
    </section>
  );
});

export default function OffersPage() {
  // State for device detection
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device on client side
  useEffect(() => {
    setIsMobile(isMobileDevice());

    const handleResize = () => {
      setIsMobile(isMobileDevice());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // If on mobile, render the mobile version
  if (isMobile) {
    return <MobileOffersPage />;
  }

  // Otherwise, render the desktop version (unchanged)
  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />
      <HeroSection />
      <CurrentOffersSection />
      <LoyaltyProgramSection />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
