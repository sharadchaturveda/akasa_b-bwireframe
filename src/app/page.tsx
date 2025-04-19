// This is a Server Component by default in Next.js App Router
// We don't need "use client" here since we're just importing client components
// Using dynamic imports with next/dynamic for better code splitting and performance

import dynamic from 'next/dynamic';

// Critical components loaded normally
import Navigation from "@/components/home/Navigation";
import ScrollBehavior from "@/components/home/ScrollBehavior";
import HeroSection from "@/components/home/HeroSection";

// Dynamic imports for non-critical components with loading optimization
const BrandPhilosophy = dynamic(
  () => import("@/components/home/BrandPhilosophy").then(mod => mod.default),
  { loading: () => <div className="h-[50vh] bg-black"></div> }
);

const AccoladesSection = dynamic(
  () => import("@/components/home/AccoladesSection").then(mod => mod.default),
  { loading: () => <div className="h-[50vh] bg-black"></div> }
);

const GallerySection = dynamic(
  () => import("@/components/home/GallerySection").then(mod => mod.default),
  { loading: () => <div className="h-[50vh] bg-black"></div> }
);

const WhatsHappeningSection = dynamic(
  () => import("@/components/home/WhatsHappeningSection").then(mod => mod.default),
  { loading: () => <div className="h-[50vh] bg-black"></div> }
);

const TestimonialsSection = dynamic(
  () => import("@/components/home/TestimonialsSection").then(mod => mod.default),
  { loading: () => <div className="h-[50vh] bg-black"></div> }
);

const VisitUsSection = dynamic(
  () => import("@/components/home/VisitUsSection").then(mod => mod.default),
  { loading: () => <div className="h-[50vh] bg-black"></div> }
);

const Footer = dynamic(
  () => import("@/components/home/Footer").then(mod => mod.default),
  { loading: () => <div className="h-[40px] bg-black"></div> }
);

// Component for the Akasa Restaurant homepage
export default function HomePage() {
  // This is a server component that imports client components
  // Each section is modularized into its own client component file
  // This keeps the main page clean and optimized
  // Dynamic imports improve initial load time and enable code splitting

  return (
    <main className="w-full min-h-screen bg-black text-white overflow-x-hidden will-change-transform hardware-accelerated scroll-view">
      {/* Apply scroll behavior fixes */}
      <ScrollBehavior />
      {/* ===== HEADER & NAVIGATION ===== */}
      <Navigation />

      {/* ===== HERO SECTION ===== */}
      <HeroSection />

      {/* ===== BRAND PHILOSOPHY & LOCATION ===== */}
      <BrandPhilosophy />
      {/* ===== ACCOLADES & AWARDS ===== */}
      <AccoladesSection />
      {/* ===== GALLERY & PRIVATE DINING ===== */}
      <GallerySection />
      {/* ===== WHAT'S HAPPENING ===== */}
      <WhatsHappeningSection />
      {/* ===== TESTIMONIALS ===== */}
      <TestimonialsSection />
      {/* ===== VISIT US ===== */}
      <VisitUsSection />
      {/* ===== FOOTER ===== */}
      <Footer />
    </main>
  );
}
