"use client";

import { usePathname } from "next/navigation";
import FloatingActionButtons from "@/components/ui/FloatingActionButtons";
import React from "react";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideFloatingButtons = pathname && (pathname === "/blog/studio" || pathname.startsWith("/blog/studio/"));

  return (
    <>
      {children}
      {!hideFloatingButtons && <FloatingActionButtons />}
    </>
  );
}
