import { Metadata } from "next";
import { generateMetadata } from "@/utils/seo";

/**
 * Metadata for the Events page
 */
export const metadata: Metadata = generateMetadata({
  title: "Akasa Events – Live Music & Special Occasions",
  description: "Stay updated on Akasa's events including the Singapore Food Festival and special dinners like birthday and Chinese New Year celebrations.",
  keywords: "singapore food festival, birthday dinner singapore, chinese new year dinner",
  path: "/events",
  ogImagePath: "/images/events/hero/hero.jpg",
});
