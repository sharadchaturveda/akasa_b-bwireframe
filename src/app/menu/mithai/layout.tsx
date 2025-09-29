import { generateMetadata } from "@/utils/seo";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = generateMetadata({
  title: "Mithai Menu Akasa Restaurant – Traditional Indian Sweets",
  description:
    "Explore Akasa's Mithai menu featuring traditional Indian sweets like ladoos, barfis, and specialty treats made with natural ingredients and authentic recipes.",
  url: "menu/mithai",
  ogTitle: "Akasa Restaurant Menu – Mithai, Traditional Indian Sweets",
  ogDescription:
    "Discover Akasa's Mithai menu in Singapore with authentic traditional Indian sweets including various ladoos and specialty sweet treats.",
  keywords:
    "Mithai, Indian sweets, ladoo, barfi, traditional Indian desserts, Akasa menu, Indian cuisine Singapore, Akasa restaurant menu, authentic Indian food, Robinson Road dining, Akasa SG menu",
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
