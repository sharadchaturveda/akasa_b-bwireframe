"use client";

import Image from "next/image"
;
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/home/Navigation";
import Footer from "@/components/home/Footer";
import { memo } from "react";

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
        <Image src="/images/offers/hero/hero.jpg"
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
  details,
  footnote,
  image,
  validUntil,
  code,
  link
}: {
  title: { text: string; emphasize: string };
  description: string;
  details?: string[];
  footnote?: string;
  image: string;
  validUntil: string;
  code: string;
  link: string;
}) {
  return (
    <div className="group relative h-full">
      {/* Card background with subtle glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E6C78B]/0 via-[#E6C78B]/30 to-[#E6C78B]/0 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

      {/* Card content */}
      <div className="relative h-full flex flex-col bg-black/80 backdrop-blur-sm rounded-lg overflow-hidden border border-[#E6C78B]/10">
        {/* Card image */}
        <div className="relative w-full h-48 md:h-56 overflow-hidden">
          {/* Decorative corner accent */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-[#E6C78B]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-[#E6C78B]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

          <Image src={image}
            alt={title.text}
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

        {/* Card text content */}
        <div className="flex-1 p-5 flex flex-col">
          {/* Title with emphasis */}
          <h3 className="text-xl md:text-2xl font-playfair font-medium mb-3 whitespace-pre-line">
            {title.text}
            {title.emphasize && (
              <span className="text-[#E6C78B]">{title.emphasize}</span>
            )}
          </h3>

          {/* Description */}
          <p className="text-sm md:text-base font-montserrat text-white/80 mb-4 whitespace-pre-line">
            {description}
          </p>

          {/* Details (bullet points) */}
          {details && details.length > 0 && (
            <ul className="list-disc list-outside text-sm font-montserrat text-white/80 mb-4 pl-5 space-y-1.5">
              {details.map((detail, index) => (
                <li key={index} className="leading-tight">{detail}</li>
              ))}
            </ul>
          )}

          {/* Footnote */}
          {footnote && (
            <p className="text-xs italic font-montserrat text-white/60 mb-4">
              {footnote}
            </p>
          )}

          <div className="mt-auto">
            {/* Fancy promo code display */}
            <div className="bg-black p-4 rounded-lg mb-6 border border-[#E6C78B]/20 relative overflow-hidden group-hover:border-[#E6C78B]/40 transition-colors duration-300">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#E6C78B]/0 via-[#E6C78B]/30 to-[#E6C78B]/0"></div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/80">Promo Code:</span>
                <span className="font-medium text-[#E6C78B] text-lg tracking-wider">{code}</span>
              </div>
            </div>

            {/* Standardized button */}
            <Link href={link}>
              <button className="group inline-flex items-center justify-center rounded-full text-sm font-montserrat font-medium tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden shadow-md hover:shadow-lg bg-black text-white px-6 py-3 w-full">
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
    </div>
  );
});

// Current Offers Section Component
const CurrentOffersSection = memo(function CurrentOffersSection() {
  const offers = [
    {
      title: { text: "Akasa Happy Hour Specials!", emphasize: "" },
      description: "Unwind in style with our fantastic Happy Hour deals,\navailable Monday to Friday, 4 PM – 7 PM.\n\nSip, relax, and enjoy amazing prices and 1-for-1 specials on your favorite drinks.\n\nHere's the lineup:\n🟤 Monday: $8 Cocktails & $8 Beers\n🟤 Tuesday: 1-for-1 on Wines\n🟤 Wednesday: 1-for-1 on Draught Beer\n🟤 Thursday: 1-for-1 on Draught Beer, House Wines & Spirits\n🟤 Friday: 1-for-1 on Cocktails\n\n📍 Only at Akasa.\n🧾 T&Cs apply.",
      details: [],
      footnote: "Terms and conditions apply. GST & service charges are additional.",
      image: "/images/offers/promotions/happy-hours.jpg",
      validUntil: "Every Mon-Fri, 4PM-7PM",
      code: "CHEERSAKASA",
      link: "/menu/drinks"
    },
    {
      title: { text: "Akasa Turns ", emphasize: "1" },
      description: "We're turning one, and you're invited to the party.\nThis isn't just any celebration—it's a toast to flavor, friends, and unforgettable moments.\n\nEnjoy an exclusive 10% discount on:\n\n🍸 Happy Hour cocktails\n\n🍽️ A La Carte delights\n\n🍷 Curated drink selections\n\nJust show up hungry—we've got the rest.\nOffer valid only for Capitasky tenants.\n\n📅 Limited-time offer.",
      details: [],
      image: "/images/offers/promotions/akasa-turns-1.jpg",
      validUntil: "15th May to 30th June 2025",
      code: "AKASA1YR",
      link: "/reservations"
    },
    {
      title: { text: "Weekend Family Feast", emphasize: "" },
      description: "Because good food tastes better when it's shared.\n\nGather your tribe—friends, family, neighbors, even your work fam.\nWhen you dine in with a group of 4 or more, you'll enjoy a full spread:\n\n🥟 Shared appetizers to kick things off\n\n🍛 Hearty mains for every taste\n\n🍰 Sweet finales to round out the meal\n\nAll at 10% off the regular price.\nPerfect for birthdays, reunions, or just because.",
      details: [],
      image: "/images/offers/promotions/weekend-family-feast.jpg",
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 auto-rows-fr min-h-[600px]">
          {offers.map((offer, index) => (
            <OfferCard
              key={index}
              title={offer.title}
              description={offer.description}
              details={offer.details}
              footnote={offer.footnote}
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
      {/* Animated background pattern - same as CurrentOffersSection */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e6c78b' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
          animation: 'slideBackground 60s linear infinite'
        }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Coming Soon Banner */}
        <div className="w-full max-w-3xl mx-auto mb-10 bg-gradient-to-r from-[#1A2A3A] via-[#1A2A3A] to-[#1A2A3A] rounded-lg overflow-hidden shadow-lg">
          <div className="h-1 w-full bg-gradient-to-r from-[#E6C78B] via-[#E6C78B] to-transparent"></div>
          <div className="flex items-center justify-center py-3 px-6">
            <div className="w-2 h-2 rounded-full bg-[#E6C78B] mr-3 animate-pulse"></div>
            <p className="text-white font-montserrat text-sm md:text-base tracking-wider">
              <span className="text-[#E6C78B] font-medium">Coming Soon:</span> Our Loyalty Program is being crafted for your enjoyment
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Loyalty Program image with elegant frame */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative aspect-[4/3] overflow-hidden group">
              {/* Decorative frame */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#E6C78B] opacity-70 z-10"></div>
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#E6C78B] opacity-70 z-10"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#E6C78B] opacity-70 z-10"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#E6C78B] opacity-70 z-10"></div>

              <Image src="/images/offers/loyalty_program/loyalty.jpg"
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
          <div className="w-full lg:w-1/2 relative">
            {/* Decorative elements */}
            <div className="absolute -top-6 left-0 w-20 h-1 bg-gradient-to-r from-[#E6C78B] to-transparent"></div>
            <div className="absolute -bottom-6 right-0 w-20 h-1 bg-gradient-to-l from-[#E6C78B] to-transparent"></div>

            <div className="p-8 bg-black/40 backdrop-blur-md border border-white/5 rounded-lg shadow-2xl">
              <h2 className="text-4xl md:text-5xl font-playfair mb-6 relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E6C78B] to-[#D4B679]">Akasa Loyalty Program</span>
                <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-[#E6C78B] to-transparent"></div>
              </h2>

              <p className="text-base md:text-lg font-montserrat mb-8 text-white/90 leading-relaxed first-letter:text-4xl first-letter:font-playfair first-letter:text-[#E6C78B] first-letter:mr-1 first-letter:float-left">
                Join our exclusive loyalty program and earn points with every visit. Redeem your points for complimentary dishes, special experiences, and unique perks available only to our loyal guests.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-black/30 p-4 rounded-lg border border-white/5 hover:border-[#E6C78B]/20 transition-colors duration-300">
                  <h3 className="text-lg font-playfair mb-2 text-[#E6C78B]">Earn Points</h3>
                  <p className="text-sm text-white/80">Accumulate points with every dollar spent at Akasa.</p>
                </div>

                <div className="bg-black/30 p-4 rounded-lg border border-white/5 hover:border-[#E6C78B]/20 transition-colors duration-300">
                  <h3 className="text-lg font-playfair mb-2 text-[#E6C78B]">Exclusive Access</h3>
                  <p className="text-sm text-white/80">Get priority reservations and invitations to special events.</p>
                </div>

                <div className="bg-black/30 p-4 rounded-lg border border-white/5 hover:border-[#E6C78B]/20 transition-colors duration-300">
                  <h3 className="text-lg font-playfair mb-2 text-[#E6C78B]">Redeem Rewards</h3>
                  <p className="text-sm text-white/80">Exchange points for complimentary dishes, drinks, and experiences.</p>
                </div>
              </div>

              {/* Standardized button */}
              <Link href="/loyalty-program">
                <button className="group inline-flex items-center justify-center rounded-full text-sm font-montserrat font-medium tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden shadow-md hover:shadow-lg bg-[#1A2A3A] text-white px-8 py-4">
                  {/* Gold fill animation */}
                  <span className="absolute inset-0 rounded-full bg-[#E6C78B] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>

                  <span className="relative flex-1 text-center group-hover:text-black transition-colors duration-300">
                    Learn More
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
          backgroundImage: "url('/images/home/hero/hero-home.jpg?quality=60&width=1200')",
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



