"use client";

import { usePathname } from "next/navigation";
import FloatingActionButtons from "./FloatingActionButtons";

export default function ConditionalFloatingActionButtons() {
  const pathname = usePathname();
  const hideFloatingButtons = pathname && (pathname === "/blog/studio" || pathname.startsWith("/blog/studio/"));

  console.log("ConditionalFloatingActionButtons - Pathname:", pathname);
  console.log("ConditionalFloatingActionButtons - Hide buttons:", hideFloatingButtons);

  if (hideFloatingButtons) {
    return null;
  }

  return <FloatingActionButtons />;
}
