import Navigation from "@/components/home/Navigation";
import FloatingActionButtons from "@/components/ui/FloatingActionButtons";
import ScrollBehavior from "@/components/home/ScrollBehavior";
import FacebookPixel from "@/components/tracking/FacebookPixel";
import React from "react";
import Footer from "@/components/home/Footer";
import { generateMetadata } from "@/utils/seo";
import { Metadata } from "next";

export const metadata: Metadata = generateMetadata({
  title: "Akasa Restaurant Services – Lunch, Dinner & Event Guides",
  description:
    "Akasa in Singapore offers curated services including Indian lunch, dinner, and private dining event guides for every celebration and special occasion.",
  url: "service",
  ogTitle: "Akasa Restaurant Services – Lunch, Dinner & Event Guides",
  ogDescription:
    "Discover Akasa's curated services for Indian lunch, dinner, and private dining events in Singapore.",
  keywords: "Akasa services, Indian lunch, Indian dinner, private dining Singapore, event guides, Akasa restaurant services, Robinson Road dining, fine dining Indian, Akasa SG services, restaurant event planning",
});

export default function ServiceLayout({
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


        {/* Apply scroll behavior optimizations */}
        <ScrollBehavior />

        {children}
        <Footer />
      </div>
    </>
  );
}
