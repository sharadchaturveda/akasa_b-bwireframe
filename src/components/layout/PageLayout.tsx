"use client";

import { memo } from "react";
import Navigation from "@/components/home/Navigation";
import Footer from "@/components/home/Footer";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import MobileOptimizer from "@/components/mobile/MobileOptimizer";
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
  className = "",
  withMobileOptimizer = true
}: LayoutProps) {
  const { isMobile } = useDeviceDetection();

  return (
    <ErrorBoundary>
      <main className={`min-h-screen bg-black text-white ${className}`}>
        {withMobileOptimizer && isMobile && <MobileOptimizer />}
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
