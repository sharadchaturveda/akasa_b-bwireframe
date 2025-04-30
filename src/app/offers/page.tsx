"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/home/Navigation";
import Footer from "@/components/home/Footer";
import { memo } from "react";

// Hero Section Component
const HeroSection = memo(function HeroSection() {
  return (
    <section className="h-screen w-full bg-[url('/images/offers/gallery5.jpg')] bg-cover bg-center flex flex-col items-center justify-center relative">
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="container mx-auto px-4 md:px-8 relative z-10 mt-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-playfair mb-6 text-white">{"Special Offers & Promotions"}</h1>
          <p className="text-lg md:text-xl font-montserrat text-white/90 mb-8 leading-relaxed">
            {"Discover our exclusive deals and seasonal promotions designed to enhance your dining experience at Akasa."}
          </p>
          <Link href="#current-offers">
            <Button className="bg-[#E6C78B] text-black hover:bg-[#D4B679] px-8 py-3">
              {"View Offers"}
            </Button>
          </Link>
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
    <div className="bg-black/80 backdrop-blur-sm rounded-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
      <div className="relative h-[250px] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-[#E6C78B] text-black px-3 py-1 rounded-full text-xs font-medium">
          {`Valid until ${validUntil}`}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-playfair mb-3">{title}</h3>
        <p className="text-white/70 text-sm mb-4">{description}</p>

        <div className="bg-[#1A2A3A] p-3 rounded mb-4 flex justify-between items-center">
          <span className="text-sm text-white/80">Promo Code:</span>
          <span className="font-medium text-[#E6C78B]">{code}</span>
        </div>

        <Link href={link}>
          <Button className="w-full bg-[#1A2A3A] text-white hover:bg-[#0A1A2A]" showArrow>
            {"Redeem Offer"}
          </Button>
        </Link>
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
    <section id="current-offers" className="w-full bg-[url('/images/menu/gallery6.jpg')] bg-cover bg-fixed py-16 relative">
      <div className="absolute inset-0 bg-black/75"></div>
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-playfair mb-4">{"Current Offers"}</h2>
          <p className="text-lg font-montserrat text-white/70 max-w-2xl mx-auto">
            {"Take advantage of these limited-time promotions to experience the best of Akasa at exceptional value."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    </section>
  );
});

// Loyalty Program Section Component
const LoyaltyProgramSection = memo(function LoyaltyProgramSection() {
  return (
    <section className="w-full bg-[url('/images/events/event3.jpg')] bg-cover bg-center py-16 relative">
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-8 items-center">
          <div className="relative h-[300px] md:h-[400px] overflow-hidden rounded-lg">
            <Image
              src="/images/offers/gallery5.jpg"
              alt="Akasa Loyalty Program"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          </div>

          <div className="p-6 md:p-8 bg-black/70 backdrop-blur-sm rounded-lg">
            <h2 className="text-3xl md:text-4xl font-playfair mb-4 text-white">{"Akasa Loyalty Program"}</h2>
            <p className="text-base md:text-lg font-montserrat mb-6 text-white/90 leading-relaxed">
              {"Join our exclusive loyalty program and earn points with every visit. Redeem your points for complimentary dishes, special experiences, and unique perks available only to our loyal guests."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-[#1A2A3A] p-4 rounded-lg text-center">
                <h3 className="text-[#E6C78B] font-medium mb-2">Silver Tier</h3>
                <p className="text-sm text-white/70">After 5 visits</p>
              </div>
              <div className="bg-[#1A2A3A] p-4 rounded-lg text-center">
                <h3 className="text-[#E6C78B] font-medium mb-2">Gold Tier</h3>
                <p className="text-sm text-white/70">After 10 visits</p>
              </div>
              <div className="bg-[#1A2A3A] p-4 rounded-lg text-center">
                <h3 className="text-[#E6C78B] font-medium mb-2">Platinum Tier</h3>
                <p className="text-sm text-white/70">After 20 visits</p>
              </div>
            </div>

            <Link href="/loyalty-program">
              <Button className="bg-[#E6C78B] text-black hover:bg-[#D4B679] px-8 py-3" showArrow>
                {"Join Now"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
});

// Newsletter Section Component
const NewsletterSection = memo(function NewsletterSection() {
  return (
    <section className="w-full bg-[url('/images/home/hero.jpg')] bg-cover bg-center py-16 relative">
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
              className="flex-grow px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white"
              required
            />
            <Button className="bg-[#E6C78B] text-black hover:bg-[#D4B679] px-8 py-3 whitespace-nowrap">
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
