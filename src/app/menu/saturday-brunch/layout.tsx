import { generateMetadata } from "@/utils/seo";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = generateMetadata({
  title: "Soul Weekend Brunch at Akasa – $38++ | Launching 15th November",
  description:
    "Experience Akasa's new Soul Weekend Brunch by Chef Akhilesh Pathak - $38++ per person. A unique mix of buffet and fresh kitchen-to-table dishes every Saturday starting 15th November.",
  url: "menu/soul-weekend-brunch",
  ogTitle: "Soul Weekend Brunch at Akasa – $38++ | Launching 15th November",
  ogDescription:
    "New Soul Weekend Brunch by Chef Akhilesh Pathak. Buffet + fresh kitchen dishes. $38++ per person. Saturdays from 15th November.",
  keywords:
    "Soul Weekend Brunch, Akasa brunch, Indian brunch Singapore, Chef Akhilesh Pathak, Saturday brunch, weekend dining, chaat, tandoori, authentic Indian food, Robinson Road dining, Akasa SG brunch, buffet brunch Singapore",
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
