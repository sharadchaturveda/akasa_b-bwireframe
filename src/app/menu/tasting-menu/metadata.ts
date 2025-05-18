import { Metadata } from "next";
import { generateMetadata } from "@/utils/seo";

/**
 * Metadata for the Tasting Menu page
 */
export const metadata: Metadata = generateMetadata({
  title: "Akasa Tasting Menu – A Curated Culinary Journey",
  description: "Experience a multi-course dinner with Akasa's chef's selection tasting menu, an unforgettable Singapore dining experience.",
  keywords: "tasting menu singapore, multi-course dinner singapore, chef's selection",
  path: "/menu/tasting-menu",
  ogImagePath: "/images/menu/tasting-menu/hero/hero.jpg",
});
