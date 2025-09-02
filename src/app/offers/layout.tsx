import { generateMetadata } from "@/utils/seo";
import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = generateMetadata({
  title: "Akasa Special Offers – Happy Hour & Dining Deals",
  description:
    "Celebrate at Akasa with parties, lunches, or corporate gatherings in Singapore, where fine Indian food, cocktails, and warm service create memorable moments.",
  url: "offers",
  ogTitle: "Akasa Special Offers – Happy Hour & Dining Deals",
  ogDescription:
    "Celebrate at Akasa with parties, lunches, or corporate gatherings in Singapore, where fine Indian food, cocktails, and warm service create memorable moments.",
  keywords: "Akasa special offers, dining deals Singapore, happy hour Akasa, Indian cuisine promotions, Akasa restaurant offers, fine dining discounts, Akasa SG specials, Indian food deals, Robinson Road dining offers, Akasa cocktail specials",  
});

export default function OffersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
