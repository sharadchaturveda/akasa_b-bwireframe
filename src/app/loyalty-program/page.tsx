"use client";

import { useEffect } from 'react';
import Navigation from "@/components/home/Navigation";
import Footer from "@/components/home/Footer";
import LoyaltyHero from "@/components/loyalty/LoyaltyHero";
import LoyaltyQRCode from "@/components/loyalty/LoyaltyQRCode";
import LoyaltyTermsConditions from "@/components/loyalty/LoyaltyTermsConditions";
import LoyaltyNewsletter from "@/components/loyalty/LoyaltyNewsletter";

export default function LoyaltyProgramPage() {
  useEffect(() => {
    // Add loaded class to images when they finish loading for better performance
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      if (img.complete) {
        img.classList.add('loaded');
      } else {
        img.onload = () => {
          img.classList.add('loaded');
        };
      }
    });
  }, []);

  return (
    <main className="">
      <Navigation />
      <LoyaltyHero />
      <LoyaltyQRCode />
      <LoyaltyTermsConditions />
      {/* <LoyaltyNewsletter /> */}
      <Footer />
    </main>
  );
} 