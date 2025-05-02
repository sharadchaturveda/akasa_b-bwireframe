"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface MobileHeroButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

/**
 * MobileHeroButton Component
 *
 * A mobile-optimized button specifically for the hero section
 * that exactly matches the desktop design but is optimized for mobile.
 */
const MobileHeroButton = forwardRef<HTMLButtonElement, MobileHeroButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-full text-xs font-montserrat font-medium tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden shadow-md touch-manipulation w-full",
          variant === "primary" && "bg-[#1A2A3A] text-white",
          variant === "secondary" && "bg-transparent border border-white text-white",
          className
        )}
        ref={ref}
        {...props}
      >
        <span className="relative flex-1 text-center px-4 py-3 font-medium tracking-wide whitespace-nowrap">{children}</span>
      </button>
    );
  }
);

MobileHeroButton.displayName = "MobileHeroButton";

export { MobileHeroButton };
