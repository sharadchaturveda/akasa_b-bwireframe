import Navigation from "@/components/home/Navigation";
import FloatingActionButtons from "@/components/ui/FloatingActionButtons";
import ScrollBehavior from "@/components/home/ScrollBehavior";
import FacebookPixel from "@/components/tracking/FacebookPixel";
import React from "react";
import { Metadata } from "next";
import { generateMetadata } from "@/utils/seo";

export const metadata: Metadata = generateMetadata({
  title: "Loyalty Program | Akasa - Exclusive Member Benefits",
  description:
    "Join Akasa's exclusive loyalty program and enjoy exclusive benefits, discounts, and special treats. Earn points with every visit and unlock exclusive member perks.",
  url: "https://akasa.sg/loyalty-program",
  ogTitle: "Loyalty Program | Akasa - Exclusive Member Benefits",
  ogDescription:
    "Join Akasa's exclusive loyalty program and enjoy exclusive benefits, discounts, and special treats. Earn points with every visit and unlock exclusive member perks.",
  ogImageUrl: "https://akasa.sg/images/offers/loyalty_program/loyalty.jpg",
  keywords: "Akasa loyalty program, premium dining rewards, exclusive member benefits, Singapore restaurant loyalty, fine dining rewards, Akasa membership, Indian restaurant rewards, VIP dining perks, member discounts, Akasa SG loyalty",
});

export default function LoyaltyProgramLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      {/* Facebook Pixel - Global tracking */}
      <FacebookPixel />

      {/* This div will contain the main content and have a semi-transparent background */}
      <div className="relative z-10 min-h-screen">
        {/* Desktop Navigation */}
        <Navigation />

        {/* Floating Action Buttons - Fixed on all pages */}
        <FloatingActionButtons />

        {/* Apply scroll behavior optimizations */}
        <ScrollBehavior />

        {children}
      </div>
    </>
  );
}
