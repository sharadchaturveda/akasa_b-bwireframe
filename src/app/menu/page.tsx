// Simple imports for all components - modularized like homepage
import Navigation from "@/components/home/Navigation";
import Footer from "@/components/home/Footer";
import ChefSection from "@/components/menu/ChefSection";
import FlavorExperienceSection from "@/components/menu/FlavorExperienceSection";
import MenusSection from "@/components/menu/MenusSection";
import FeaturedDishesSection from "@/components/menu/FeaturedDishesSection";

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />
      <ChefSection />
      <MenusSection />
      <FlavorExperienceSection />
      <FeaturedDishesSection />
      <Footer />
    </main>
  );
}