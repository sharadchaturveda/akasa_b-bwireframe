// Simple imports for all components
// Start with simplicity - we can add dynamic imports later if needed
import Navigation from "@/components/home/Navigation";
import ScrollBehavior from "@/components/home/ScrollBehavior";
import HeroSection from "@/components/home/HeroSection";
import BrandPhilosophy from "@/components/home/BrandPhilosophy";
import AccoladesSection from "@/components/home/AccoladesSection";
import GallerySection from "@/components/home/GallerySection";
import WhatsHappeningSection from "@/components/home/WhatsHappeningSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import VisitUsSection from "@/components/home/VisitUsSection";
import Footer from "@/components/home/Footer";

// Simple homepage component
export default function HomePage() {
  return (
    <main className="w-full min-h-screen bg-black text-white overflow-x-hidden">
      <ScrollBehavior />
      <Navigation />
      <HeroSection />
      <BrandPhilosophy />
      <AccoladesSection />
      <GallerySection />
      <WhatsHappeningSection />
      <TestimonialsSection />
      <VisitUsSection />
      <Footer />
    </main>
  );
}
