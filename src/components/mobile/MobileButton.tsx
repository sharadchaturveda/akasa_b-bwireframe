"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface MobileButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  fullWidth?: boolean;
}

/**
 * MobileButton Component
 *
 * A mobile-optimized button component with better touch targets and performance.
 */
const MobileButton = forwardRef<HTMLButtonElement, MobileButtonProps>(
  ({ className, variant = "default", fullWidth = true, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-full text-xs font-montserrat font-medium tracking-wider transition-all duration-300 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden shadow-md touch-manipulation",
          variant === "default" && "bg-[#1A2A3A] text-white",
          variant === "outline" && "border border-white text-white",
          fullWidth && "w-full",
          className
        )}
        ref={ref}
        {...props}
      >
        {/* No hover animation for mobile */}
        <span className="relative flex-1 text-center px-4 py-3 font-medium tracking-wide text-xs whitespace-nowrap">{children}</span>
      </button>
    );
  }
);

MobileButton.displayName = "MobileButton";

export { MobileButton };
