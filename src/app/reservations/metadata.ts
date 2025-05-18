import { Metadata } from "next";
import { generateMetadata } from "@/utils/seo";

/**
 * Metadata for the Reservations page
 */
export const metadata: Metadata = generateMetadata({
  title: "Akasa Reservations – Book Your Table Online",
  description: "Easily reserve your table at Akasa for lunch, romantic dinners, and birthday celebrations in Singapore.",
  keywords: "lunch near me, romantic dinner singapore, birthday dinner singapore",
  path: "/reservations",
  ogImagePath: "/images/reservations/hero/hero.jpg",
});
