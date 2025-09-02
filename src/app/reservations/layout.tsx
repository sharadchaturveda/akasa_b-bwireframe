import { generateMetadata } from "@/utils/seo";
import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = generateMetadata({
  title: "Reserve a Table at Akasa Restaurant Singapore",
  description:
    "Reserve a table at Akasa and enjoy authentic Indian cuisine, tandoor specialties, vegetarian delights, and signature cocktails in a cozy Singapore setting.",
  url: "reservations",
  ogTitle: "Akasa Restaurant Reservations – Book Your Table Now",
  ogDescription:
    "Reserve your table at Akasa and indulge in a memorable dining experience with our exquisite Indian cuisine and warm hospitality.",
  keywords: "Akasa reservations, book a table Singapore, Indian restaurant reservations, Akasa dining experience, Robinson Road reservations, fine dining Singapore, Akasa SG bookings",
});

export default function ReservationsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
