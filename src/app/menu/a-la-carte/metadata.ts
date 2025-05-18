import { Metadata } from "next";
import { generateMetadata } from "@/utils/seo";

/**
 * Metadata for the À la Carte Menu page
 */
export const metadata: Metadata = generateMetadata({
  title: "À la Carte Menu",
  description: "Explore our exquisite à la carte dishes at Akasa, where creativity meets flavor.",
  keywords: "à la carte, Indian menu, fine dining menu, Akasa menu, Indian dishes, Singapore restaurant menu",
  path: "/menu/a-la-carte",
  ogImagePath: "/images/menu/a-la-carte/hero/hero.jpg",
});
