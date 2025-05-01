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
          "group inline-flex items-center justify-center rounded-full text-xs font-montserrat font-medium tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden shadow-md touch-manipulation w-full",
          variant === "primary" && "bg-[#1A2A3A] text-white hover:bg-[#0A1A2A]",
          variant === "secondary" && "bg-transparent border border-white text-white hover:bg-white/10",
          className
        )}
        ref={ref}
        {...props}
      >
        {variant === "primary" && (
          <span className="absolute inset-0 rounded-full bg-[#E6C78B] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
        )}

        <span className="relative flex-1 text-center px-4 py-3 font-medium tracking-wide group-hover:text-black transition-colors duration-300">{children}</span>
      </button>
    );
  }
);

MobileHeroButton.displayName = "MobileHeroButton";

export { MobileHeroButton };
