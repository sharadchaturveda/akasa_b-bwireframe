"use client";

import { usePathname } from "next/navigation";
import Navigation from '@/components/home/Navigation';
import FloatingActionButtons from '@/components/ui/FloatingActionButtons';
import ScrollBehavior from '@/components/home/ScrollBehavior';
import FacebookPixel from '@/components/tracking/FacebookPixel';
import React from "react";
import Footer from "@/components/home/Footer";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideFloatingButtons = pathname && (pathname === "/blog/studio" || pathname.startsWith("/blog/studio/"));

  return (
    <>
      {/* Facebook Pixel - Global tracking */}
      <FacebookPixel />

      {/* This div will contain the main content and have a semi-transparent background */}
      <div className="relative z-10 min-h-screen">
        {/* Desktop Navigation */}
        <Navigation />

        {/* Floating Action Buttons - Fixed on all pages */}
        {!hideFloatingButtons && <FloatingActionButtons />}

        {/* Apply scroll behavior optimizations */}
        <ScrollBehavior />

        {children}
                <Footer />
      </div>
    </>
  );
}
