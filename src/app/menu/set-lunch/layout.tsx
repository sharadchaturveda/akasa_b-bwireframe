import { generateMetadata } from "@/utils/seo";
import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = generateMetadata({
  title: "Set Lunch Menu Akasa Restaurant Singapore Lunch Special",
  description:
    "Akasa’s set lunch menu in Singapore features delicious Indian curries, kebabs, and fresh vegetarian options designed for the perfect midday meal.",
  url: "menu/set-lunch",
  ogTitle: "Akasa Restaurant Set Lunch Menu – Singapore Lunch Special",
  ogDescription:
    "Akasa’s set lunch menu in Singapore features delicious Indian curries, kebabs, and fresh vegetarian options designed for the perfect midday meal.",
  keywords: "Set lunch, Akasa menu, Indian cuisine Singapore, lunch special, fine dining Indian, Akasa restaurant menu, authentic Indian food, Robinson Road dining, Akasa SG menu",
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
