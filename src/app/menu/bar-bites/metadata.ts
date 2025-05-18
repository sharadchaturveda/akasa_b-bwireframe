import { Metadata } from "next";
import { generateMetadata } from "@/utils/seo";

/**
 * Metadata for the Chaat & Bites Menu page
 */
export const metadata: Metadata = generateMetadata({
  title: "Akasa Chaat & Bites – Flavorful Snacks & Drinks",
  description: "Enjoy authentic papdi chaat paired with cocktails, beer, and wine at Akasa's vibrant bar in Singapore.",
  keywords: "papdi chaat, cocktail bar, beer, wine bar singapore",
  path: "/menu/bar-bites",
  ogImagePath: "/images/menu/bar-bites/hero/hero.jpg",
});
