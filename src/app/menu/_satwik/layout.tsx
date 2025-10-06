import { generateMetadata } from "@/utils/seo";
import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = generateMetadata({
  title: "Satwik Menu Akasa Restaurant – Vegetarian Indian Dining",
  description:
    "Explore Akasa’s Satwik menu with Indian curries, biryanis, tandoor grills, and vegetarian specialties crafted with authentic flavors in Singapore.",
  url: "menu/satwik",
  ogTitle: "Akasa Restaurant Menu – Satwik, Explore Dishes",
  ogDescription:
    "Explore Akasa’s Satwik menu in Singapore with authentic Indian curries, biryanis, tandoor grills, and vegetarian specialties.",
  keywords: "Satwik, Akasa menu, Indian cuisine Singapore, lunch menu, dinner menu, cocktails Singapore, fine dining Indian, Akasa restaurant menu, authentic Indian food, Robinson Road dining, Akasa SG menu",
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
