import { generateMetadata } from "@/utils/seo";
import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = generateMetadata({
  title: "Akasa Restaurant Menu – À La Carte, Explore Dishes",
  description:
    "Explore Akasa’s à la carte menu with Indian curries, biryanis, tandoor grills, and vegetarian specialties crafted with authentic flavors in Singapore.",
  url: "menu/a-la-carte",
  ogTitle: "Akasa Restaurant Menu – À La Carte, Explore Dishes",
  ogDescription:
    "Explore Akasa’s à la carte menu in Singapore with authentic Indian curries, biryanis, tandoor grills, and vegetarian specialties.",
  keywords: "À la carte, Akasa menu, Indian cuisine Singapore, lunch menu, dinner menu, cocktails Singapore, fine dining Indian, Akasa restaurant menu, authentic Indian food, Robinson Road dining, Akasa SG menu",
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
