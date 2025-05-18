import { Metadata } from "next";
import { generateMetadata } from "@/utils/seo";

/**
 * Metadata for the Home page
 */
export const metadata: Metadata = generateMetadata({
  title: "Finest Indian Cuisine in Singapore",
  description: "Experience the finest Indian cuisine at Akasa. Located at 79 Robinson Road, Singapore. Open Monday to Saturday, 11:30am to 10:30pm.",
  keywords: "Akasa, Indian restaurant, Singapore dining, fine dining, Robinson Road, authentic Indian cuisine, luxury restaurant",
  path: "/",
  ogImagePath: "/images/home/hero/carousel/hero1.jpg",
  isHomePage: true,
});
