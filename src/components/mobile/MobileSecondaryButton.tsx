"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface MobileSecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

/**
 * MobileSecondaryButton Component
 *
 * A mobile-optimized secondary button that exactly matches the desktop design
 * but is specifically optimized for mobile devices.
 */
const MobileSecondaryButton = forwardRef<HTMLButtonElement, MobileSecondaryButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "group inline-flex items-center justify-center rounded-full text-xs font-montserrat font-medium tracking-wider transition-all duration-300 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden shadow-md touch-manipulation w-full bg-transparent border border-white text-white hover:bg-white/10",
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Text container */}
        <span className="relative flex-1 text-center px-4 py-3 font-medium tracking-wide transition-colors duration-300 whitespace-nowrap">{children}</span>
      </button>
    );
  }
);

MobileSecondaryButton.displayName = "MobileSecondaryButton";

export { MobileSecondaryButton };
