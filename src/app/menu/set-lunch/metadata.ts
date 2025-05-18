import { Metadata } from "next";
import { generateMetadata } from "@/utils/seo";

/**
 * Metadata for the 3-Course Set Lunch Menu page
 */
export const metadata: Metadata = generateMetadata({
  title: "Akasa 3 Course Set Lunch – Affordable Gourmet Lunches",
  description: "Enjoy our affordable set lunch menu, perfect for lunch near you in Singapore.",
  keywords: "set lunch singapore, affordable set lunch singapore, lunch near me",
  path: "/menu/set-lunch",
  ogImagePath: "/images/menu/set-lunch/hero/hero.jpg",
});
