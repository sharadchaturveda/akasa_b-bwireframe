import { generateMetadata } from "@/utils/seo";
import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = generateMetadata({
  title: "Akasa Restaurant Drinks Menu – Cocktails, Wine & Tea",
  description:
    "Sip Akasa’s drinks menu with handcrafted cocktails, fine wines, and Indian teas thoughtfully crafted to enhance your dining experience in Singapore.",
  url: "menu/drinks",
  ogTitle: "Akasa Restaurant Drinks Menu – Cocktails, Wine & Tea",
  ogDescription:
    "Sip Akasa’s drinks menu with handcrafted cocktails, fine wines, and Indian teas thoughtfully crafted to enhance your dining experience in Singapore.",
  keywords: "Drinks, Akasa menu, Indian cuisine Singapore, cocktails, wine, tea, fine dining Indian, Akasa restaurant menu, authentic Indian food, Robinson Road dining, Akasa SG menu",
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
