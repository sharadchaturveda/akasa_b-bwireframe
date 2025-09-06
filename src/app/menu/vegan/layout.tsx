import { generateMetadata } from "@/utils/seo";
import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = generateMetadata({
  title: "Vegan Menu Akasa Restaurant – Authentic Indian Vegan Dining",
  description:
    "Akasa’s vegan menu in Singapore offers flavorful plant-based curries, spiced lentils, and authentic Indian vegan specialties crafted with passion.",
  url: "menu/vegan",
  ogTitle: "Akasa Restaurant Vegan Menu – Authentic Indian Vegan Dining",
  ogDescription:
    "Akasa’s vegan menu in Singapore offers flavorful plant-based curries, spiced lentils, and authentic Indian vegan specialties crafted with passion.",
  keywords: "Vegan, Akasa menu, Indian cuisine Singapore, plant-based, fine dining Indian, Akasa restaurant menu, authentic Indian food, Robinson Road dining, Akasa SG menu",
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
