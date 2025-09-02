import { generateMetadata } from "@/utils/seo";
import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = generateMetadata({
  title: "Akasa Menu – Indian Lunch, Dinner & Cocktails Singapore",
  description:
    "Explore Akasa menu in Singapore with authentic Indian lunch, dinner, and handcrafted cocktails, offering rich flavors and a perfect dining experience.",
  url: "menu",
  ogTitle: "Akasa Menu – Indian Lunch, Dinner & Cocktails Singapore",
  ogDescription:
    "Explore Akasa menu in Singapore with authentic Indian lunch, dinner, and handcrafted cocktails, offering rich flavors and a perfect dining experience.",
  keywords: "Akasa menu, Indian cuisine Singapore, lunch menu, dinner menu, cocktails Singapore, fine dining Indian, Akasa restaurant menu, authentic Indian food, Robinson Road dining, Akasa SG menu",
});

export default function MenuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
