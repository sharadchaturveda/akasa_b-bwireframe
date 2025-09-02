import { generateMetadata } from "@/utils/seo";
import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = generateMetadata({
  title: "Akasa Singapore Events – Parties, Lunches & Corporate",
  description:
    "Akasa offers authentic Indian lunch, dinner, and cocktails in Singapore, blending bold spices, modern flair, and a dining experience to remember.",
  url: "events",
  ogTitle: "Akasa Singapore Events – Parties, Lunches & Corporate",
  ogDescription:
    "Akasa offers authentic Indian lunch, dinner, and cocktails in Singapore, blending bold spices, modern flair, and a dining experience to remember.",
  keywords: "Akasa events Singapore, Indian cuisine events, corporate dining Akasa, party venue Singapore, Akasa restaurant events, fine dining events, Akasa SG parties, Indian food gatherings, Robinson Road events, Akasa cocktail events",
});

export default function EventsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
