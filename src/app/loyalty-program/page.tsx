import Navigation from "@/components/home/Navigation";
import Footer from "@/components/home/Footer";
import LoyaltyHero from "@/components/loyalty/LoyaltyHero";
import LoyaltyQRCode from "@/components/loyalty/LoyaltyQRCode";
import LoyaltyTermsConditions from "@/components/loyalty/LoyaltyTermsConditions";

export default function LoyaltyProgramPage() {

  return (
    <main className="">
      <Navigation />
      <LoyaltyHero />
      <LoyaltyQRCode />
      <LoyaltyTermsConditions />
      <Footer />
    </main>
  );
} 