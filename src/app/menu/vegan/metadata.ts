import { Metadata } from "next";
import { generateMetadata } from "@/utils/seo";

/**
 * Metadata for the Vegan Menu page
 */
export const metadata: Metadata = generateMetadata({
  title: "Akasa Vegan Menu – Creative Plant-Based Dishes",
  description: "Discover Akasa's vegan food offerings, recognized among the best vegan restaurants in Singapore.",
  keywords: "vegan food singapore, best vegan restaurant singapore, vegan vs vegetarian",
  path: "/menu/vegan",
  ogImagePath: "/images/menu/vegan/hero/hero.jpg",
});
