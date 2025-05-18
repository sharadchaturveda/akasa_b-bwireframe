import { Metadata } from "next";
import { generateMetadata } from "@/utils/seo";

/**
 * Metadata for the À la Carte Menu page
 */
export const metadata: Metadata = generateMetadata({
  title: "Akasa A La Carte – Crafted Dishes for Every Taste",
  description: "Choose from Akasa's fine dining a la carte menu with the best vegetarian and fried chicken options in Singapore.",
  keywords: "fine dining singapore, best vegetarian restaurant singapore, best fried chicken singapore",
  path: "/menu/a-la-carte",
  ogImagePath: "/images/menu/a-la-carte/hero/hero.jpg",
});
