import { generateMetadata } from "@/utils/seo";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = generateMetadata({
  title: "Festive Wine Pairing Menu at Akasa | Limited Time",
  description:
    "Experience Akasa's exclusive Festive Wine Pairing Menu by Chef Akhilesh Pathak. A 5-course culinary journey with carefully selected international wines. $88++ per person during festive season.",
  url: "menu/wine-pairing",
  ogTitle: "Festive Wine Pairing Menu at Akasa | Limited Time",
  ogDescription:
    "5-course wine pairing menu by Chef Akhilesh Pathak. Authentic Indian cuisine meets international wines. $88++ per person. Festive season special.",
  ogImageUrl:
    "https://cdn.jsdelivr.net/gh/sharadchaturveda/akasa_b-bwireframe@master/public/images/menu/wine-pairing/hero-1.jpg",
  keywords:
    "wine pairing menu Singapore, wine pairing dinner, Indian food wine pairing, festive menu Singapore, wine tasting menu, Robinson Road wine dinner, Akasa wine pairing, Chardonnay pairing, Cabernet Sauvignon pairing, Prosecco pairing, Riesling pairing, fine dining Singapore, wine and dine Singapore, special occasion dining",
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
