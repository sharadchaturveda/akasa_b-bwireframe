import { generateMetadata } from "@/utils/seo";
import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = generateMetadata({
  title: "Tasting Menu Akasa Restaurant – Multi-Course Indian Menu",
  description:
    "Experience Akasa’s tasting menu in Singapore with multi-course Indian dining, combining traditional recipes, modern flavors, and perfect pairings.",
  url: "menu/tasting-menu",
  ogTitle: "Akasa Restaurant Tasting Menu – Multi-Course Indian Menu",
  ogDescription:
    "Experience Akasa’s tasting menu in Singapore with multi-course Indian dining, combining traditional recipes, modern flavors, and perfect pairings.",
  keywords: "Tasting menu, Akasa menu, Indian cuisine Singapore, multi-course dining, fine dining Indian, Akasa restaurant menu, authentic Indian food, Robinson Road dining, Akasa SG menu",
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
