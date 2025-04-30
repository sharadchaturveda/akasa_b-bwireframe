"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  showArrow?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", showArrow = false, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "group inline-flex items-center justify-center rounded-full text-sm font-montserrat font-medium tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden shadow-md hover:shadow-lg",
          variant === "default" && "bg-[#1A2A3A] text-white",
          variant === "outline" && "border border-white text-white hover:bg-white/10",
          showArrow && "pr-12",
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Gold fill animation */}
        <span className="absolute inset-0 rounded-full bg-[#E6C78B] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>

        <span className="relative flex-1 text-center px-6 py-3 font-medium tracking-wide w-full group-hover:text-black transition-colors duration-300">{children}</span>
        {showArrow && (
          <span className="absolute right-0 w-12 h-full bg-black/10 flex items-center justify-center group-hover:bg-black/20 transition-colors rounded-r-full z-10">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transform group-hover:translate-x-1 transition-transform"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };