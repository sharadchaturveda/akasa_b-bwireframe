"use client";

import Image from "next/image";
import { memo } from "react";

interface LogoProps {
  className?: string;
  size?: "small" | "medium" | "large" | "desktop" | "mobile";
  width?: number;
  height?: number;
}

/**
 * Logo Component
 *
 * A clean, reusable logo component that can be used throughout the site.
 * Supports different sizes and additional className props for flexibility.
 */
const Logo = memo(function Logo({ className = "", size = "medium", width, height }: LogoProps) {
  // Determine size based on prop or custom dimensions
  let dimensions;

  if (width && height) {
    // Use custom dimensions if provided
    dimensions = { width, height };
  } else {
    // Use predefined sizes - significantly increased
    dimensions = {
      small: { width: 250, height: 100 },
      medium: { width: 350, height: 140 },
      large: { width: 450, height: 180 },
      desktop: { width: 500, height: 200 }, // Much larger for desktop
      mobile: { width: 300, height: 120 },  // Much larger for mobile
    }[size];
  }

  // Remove client-side detection to avoid hydration issues
  // We'll use CSS media queries instead

  return (
    <div
      className={`relative logo-container logo-fade-in ${className} logo-size-${size}`}
      style={{
        width: dimensions.width,
        height: dimensions.height,
        margin: "0 auto", // Center horizontally
      }}
    >
      <Image
        src="/images/brand/logo.svg"
        alt="Akasa Logo"
        fill
        sizes={`(max-width: 640px) ${dimensions.width}px, ${dimensions.width}px`}
        className="object-contain"
        priority
        loading="eager"
        fetchPriority="high"
      />
    </div>
  );
});

export default Logo;

