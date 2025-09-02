// "use client";

// import { usePathname } from "next/navigation";
import Navigation from '@/components/home/Navigation';
import ScrollBehavior from '@/components/home/ScrollBehavior';
import FacebookPixel from '@/components/tracking/FacebookPixel';
import React from "react";
import Footer from "@/components/home/Footer";
import { Metadata } from "next";
import { generateMetadata } from "@/utils/seo";

export const metadata: Metadata = generateMetadata({
  title: "Akasa Restaurant Blog – Dining Stories & Insights",
  description:
    "Discover the Akasa blog with dining inspiration, Indian food stories, and insights into our authentic menu, cocktails, and events in Singapore.",
  url: "blog",
  ogTitle: "Akasa Restaurant Blog – Dining Stories & Insights",
  ogDescription:
    "Explore the Akasa blog for the latest dining stories, Indian cuisine insights, and updates on our menu and events.",
  keywords: "Akasa blog, Indian food stories, dining inspiration, Singapore restaurant blog, Akasa dining insights, Indian cuisine blog, Robinson Road dining, Akasa SG blog, cocktail stories, restaurant events Singapore",
});


export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const pathname = usePathname();
  // const hideFloatingButtons = pathname && (pathname === "/blog/studio" || pathname.startsWith("/blog/studio/"));

  return (
    <>
      {/* Facebook Pixel - Global tracking */}
      <FacebookPixel />

      {/* This div will contain the main content and have a semi-transparent background */}
      <div className="relative z-10 min-h-screen">
        {/* Desktop Navigation */}
        <Navigation />

        {/* Floating Action Buttons - Fixed on all pages */}
        {/* {!hideFloatingButtons && <FloatingActionButtons />} */}

        {/* Apply scroll behavior optimizations */}
        <ScrollBehavior />

        {children}
                <Footer />
      </div>
    </>
  );
}
