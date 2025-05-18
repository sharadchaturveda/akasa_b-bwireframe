import { Metadata } from "next";
import { generateMetadata } from "@/utils/seo";

/**
 * Metadata for the Offers page
 */
export const metadata: Metadata = generateMetadata({
  title: "Akasa Offers – Exclusive Deals & Promotions",
  description: "Check out Akasa's happy hour specials, anniversary offers, and birthday dinner deals for great value dining in Singapore.",
  keywords: "happy hour singapore, cheap and good restaurants in singapore, anniversary dinner singapore, birthday dinner singapore",
  path: "/offers",
  ogImagePath: "/images/offers/hero/hero.jpg",
});
