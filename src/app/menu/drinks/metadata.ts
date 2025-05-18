import { Metadata } from "next";
import { generateMetadata } from "@/utils/seo";

/**
 * Metadata for the Drinks Menu page
 */
export const metadata: Metadata = generateMetadata({
  title: "Akasa Drinks Menu – Coffee, Tea & Cocktails",
  description: "Explore Akasa's coffee menu featuring flat whites, lattes, espressos, and refreshing cocktails in Singapore.",
  keywords: "coffee menu singapore, flat white, latte, espresso",
  path: "/menu/drinks",
  ogImagePath: "/images/menu/drinks/hero/hero.jpg",
});
