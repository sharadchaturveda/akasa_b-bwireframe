import { generateMetadata } from "@/utils/seo";
import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = generateMetadata({
  title: "Soul Food Menu Akasa Restaurant Weekend Delicacies",
  description:
    "Savor Akasa’s soul food weekend menu in Singapore with hearty Indian delicacies, biryanis, curries, and tandoor grills made for sharing and enjoyment.",
  url: "menu/soul-food-weekends",
  ogTitle: "Akasa Restaurant Soul Food Menu – Weekend Delicacies",
  ogDescription:
    "Savor Akasa’s soul food weekend menu in Singapore with hearty Indian delicacies, biryanis, curries, and tandoor grills made for sharing and enjoyment.",
  keywords: "Soul food, Akasa menu, Indian cuisine Singapore, weekend specials, fine dining Indian, Akasa restaurant menu, authentic Indian food, Robinson Road dining, Akasa SG menu",
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
