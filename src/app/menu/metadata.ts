import { Metadata } from "next";
import { generateMetadata } from "@/utils/seo";

/**
 * Metadata for the Menu Overview page
 */
export const metadata: Metadata = generateMetadata({
  title: "Akasa Menu – Explore Our Diverse Singapore Menu",
  description: "Browse Akasa's full menu featuring family-friendly dishes and affordable dining options in Singapore.",
  keywords: "menu singapore, family restaurant, affordable restaurants in singapore",
  path: "/menu",
  ogImagePath: "/images/menu/hero/hero.jpg",
});
