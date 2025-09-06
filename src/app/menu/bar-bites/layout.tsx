import { generateMetadata } from "@/utils/seo";
import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = generateMetadata({
  title: "Akasa Restaurant Bar Bites Menu – Small Plates & Chaat",
  description:
    "Akasa’s bar bites menu features Indian chaat, street food flavors, and small plates perfectly paired with creative cocktails in Singapore.",
  url: "menu/bar-bites",
  ogTitle: "Akasa Restaurant Bar Bites Menu – Small Plates & Chaat",
  ogDescription:
    "Akasa’s bar bites menu features Indian chaat, street food flavors, and small plates perfectly paired with creative cocktails in Singapore.",
  keywords: "Bar bites, Akasa menu, Indian cuisine Singapore, small plates, chaat, cocktails Singapore, fine dining Indian, Akasa restaurant menu, authentic Indian food, Robinson Road dining, Akasa SG menu",
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
