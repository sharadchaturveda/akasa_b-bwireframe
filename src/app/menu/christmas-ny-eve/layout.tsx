import { generateMetadata } from "@/utils/seo";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = generateMetadata({
  title: "Christmas/NY Eve at Akasa – $48++ | 24th & 25th December",
  description:
    "Celebrate Christmas with Akasa's Christmas/NY Eve by Chef Akhilesh Pathak - $48++ per person. Available 24th Dec Dinner and 25th Dec Brunch/Dinner. Featuring Christmas Tandoori Chicken and festive specialties.",
  url: "menu/christmas-ny-eve",
  ogTitle: "Christmas/NY Eve at Akasa – $48++ | 24th & 25th December",
  ogDescription:
    "Christmas/NY Eve by Chef Akhilesh Pathak. Special festive menu with Christmas Tandoori Chicken. $48++ per person. 24-25 December.",
  ogImageUrl:
    "https://cdn.jsdelivr.net/gh/sharadchaturveda/akasa_b-bwireframe@master/public/menus/soul-weekend-brunch/DSC06273-topaz.jpg",
  keywords:
    "Christmas Brunch Singapore, Christmas/NY Eve, Christmas Dinner Singapore, Indian Christmas Menu, Chef Akhilesh Pathak, Holiday Dining, Christmas Tandoori Chicken, Festive Menu Singapore, Christmas Eve Dinner, Christmas Day Brunch, Robinson Road Christmas, Akasa Festive Menu, Indian Christmas Feast",
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
