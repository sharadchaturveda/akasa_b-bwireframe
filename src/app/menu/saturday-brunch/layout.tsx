import { generateMetadata } from "@/utils/seo";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = generateMetadata({
  title: "Saturday Brunch at Akasa – $38++ | Launching 15th November",
  description:
    "Experience Akasa's new Saturday Brunch by Chef Akhilesh Pathak - $38++ per person. A unique mix of buffet and fresh kitchen-to-table dishes every Saturday starting 15th November.",
  url: "menu/saturday-brunch",
  ogTitle: "Saturday Brunch at Akasa – $38++ | Launching 15th November",
  ogDescription:
    "New Saturday Brunch by Chef Akhilesh Pathak. Buffet + fresh kitchen dishes. $38++ per person. Saturdays from 15th November.",
  ogImageUrl: 'https://cdn.jsdelivr.net/gh/sharadchaturveda/akasa_b-bwireframe@master/public/menus/soul-weekend-brunch/DSC06273-topaz.jpg',
    keywords:
    "Saturday Brunch, Soul Weekend Brunch, Akasa brunch, Indian brunch Singapore, Chef Akhilesh Pathak, Saturday brunch, weekend dining, chaat, tandoori, authentic Indian food, Robinson Road dining, Akasa SG brunch, buffet brunch Singapore",
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
