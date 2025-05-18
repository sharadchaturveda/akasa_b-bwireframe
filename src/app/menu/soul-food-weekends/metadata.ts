import { Metadata } from "next";
import { generateMetadata } from "@/utils/seo";

/**
 * Metadata for the Soul Food Weekends Menu page
 */
export const metadata: Metadata = generateMetadata({
  title: "Akasa Soul Food Weekends – Comfort Food Specials",
  description: "Join us for soul food weekends featuring butter chicken, chicken biryani, mutton soup, and dal tadka specials.",
  keywords: "butter chicken recipe, chicken biryani, mutton soup, dal tadka",
  path: "/menu/soul-food-weekends",
  ogImagePath: "/images/menu/soul-food-weekends/hero/hero.jpg",
});
