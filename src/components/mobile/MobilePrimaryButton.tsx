"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface MobilePrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

/**
 * MobilePrimaryButton Component
 *
 * A mobile-optimized button that exactly matches the desktop design
 * but is specifically optimized for mobile devices.
 */
const MobilePrimaryButton = forwardRef<HTMLButtonElement, MobilePrimaryButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "group inline-flex items-center justify-center rounded-full text-xs font-montserrat font-medium tracking-wider transition-all duration-300 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden shadow-md touch-manipulation w-full bg-[#1A2A3A] text-white hover:bg-[#0A1A2A]",
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Gold fill animation */}
        <span className="absolute inset-0 rounded-full bg-[#E6C78B] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>

        {/* Text container */}
        <span className="relative flex-1 text-center px-4 py-3 font-medium tracking-wide group-hover:text-black transition-colors duration-300 whitespace-nowrap">{children}</span>
      </button>
    );
  }
);

MobilePrimaryButton.displayName = "MobilePrimaryButton";

export { MobilePrimaryButton };
