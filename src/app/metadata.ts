import { Metadata } from "next";
import { generateMetadata } from "@/utils/seo";

/**
 * Metadata for the Home page
 */
export const metadata: Metadata = generateMetadata({
  title: "Akasa Restaurant – Contemporary Dining Experience in Singapore",
  description: "Discover Akasa, one of the best new restaurants in Singapore, offering a warm ambiance and exceptional cuisine.",
  keywords: "good restaurants in singapore, best new restaurants singapore, nice restaurants in singapore",
  path: "/",
  ogImagePath: "/images/home/hero/carousel/hero1.jpg",
  isHomePage: true,
});
