"use client";

import { memo } from "react";
import Navigation from "@/components/home/Navigation";
import Footer from "@/components/home/Footer";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { LayoutProps } from "@/types/common";

/**
 * PageLayout Component
 *
 * A shared layout component that wraps content with common elements like navigation and footer.
 * It also includes error boundaries and mobile optimizations.
 *
 * @param {LayoutProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const PageLayout = memo(function PageLayout({
  children,
  className = ""
}: LayoutProps) {
  return (
    <ErrorBoundary>
      <main className={`min-h-screen bg-black text-white ${className}`}>
        <Navigation />
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <Footer />
      </main>
    </ErrorBoundary>
  );
});

export default PageLayout;
