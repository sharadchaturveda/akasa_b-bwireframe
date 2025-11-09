import { generateMetadata } from "@/utils/seo";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = generateMetadata({
  title: "Diwali Menu Akasa Restaurant – Indian Festive Dining",
  description:
    "Explore Akasa’s Diwali menu with vegetarian and non-vegetarian thali options, festive specialties, and authentic Indian flavors in Singapore.",
  url: "menu/diwali",
  ogTitle: "Akasa Restaurant Menu – Diwali, Festive Dishes",
  ogDescription:
    "Discover Akasa’s Diwali menu in Singapore with thali and ala-carte options, featuring Indian festive specialties.",
  keywords:
    "Diwali, Akasa menu, Indian cuisine Singapore, festive menu, thali, vegetarian, non-vegetarian, Akasa restaurant menu, authentic Indian food, Robinson Road dining, Akasa SG menu",
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
