"use client";

import { ButtonHTMLAttributes, forwardRef, memo } from "react";

import { cn } from "@/lib/utils";
import { COLORS } from "@/constants";

/**
 * Button variants
 */
export type ButtonVariant = "default" | "outline" | "secondary" | "text";

/**
 * Button sizes
 */
export type ButtonSize = "small" | "medium" | "large";

/**
 * Props for the Button component
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The button variant that determines its appearance
   * @default "default"
   */
  variant?: ButtonVariant;

  /**
   * The button size
   * @default "medium"
   */
  size?: ButtonSize;

  /**
   * Whether to show a gold fill animation on hover
   * This is disabled on mobile devices
   * @default true
   */
  showHoverAnimation?: boolean;

  /**
   * Whether to use full width
   * @default false
   */
  fullWidth?: boolean;
}

/**
 * Button Component
 *
 * A reusable button component with various styles and states.
 * This component follows Akasa's design guidelines with rounded corners
 * and gold fill animations on hover (for desktop only).
 */
const Button = memo(forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = "default",
    size = "medium",
    showHoverAnimation = true,
    fullWidth = false,
    children,
    ...props
  }, ref) => {
    // Use the device detection hook to determine if we're on mobile


    // Size classes
    const sizeClasses = {
      small: "px-4 py-2 text-xs",
      medium: "px-6 py-3 text-sm",
      large: "px-8 py-4 text-base"
    };

    // Width classes
    const widthClass = fullWidth ? "w-full" : "inline-flex";

    return (
      <button
        className={cn(
          "group items-center justify-center rounded-full font-montserrat font-medium tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden shadow-md hover:shadow-lg",
          widthClass,
          sizeClasses[size],
          variant === "default" && "bg-[#1A2A3A] text-white",
          variant === "outline" && "border border-white text-white hover:bg-white/10",
          variant === "secondary" && "bg-gray-200 text-gray-800 hover:bg-gray-300",
          variant === "text" && "bg-transparent text-[#1A2A3A] shadow-none hover:bg-[#1A2A3A]/5",
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Gold fill animation - only shown when enabled */}
        {showHoverAnimation && variant === "default" && (
          <span className="absolute inset-0 rounded-full bg-[#E6C78B] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
        )}

        <span className={cn(
          "relative flex-1 text-center font-medium tracking-wide w-full",
          variant === "default" && "group-hover:text-black transition-colors duration-300"
        )}>
          {children}
        </span>
      </button>
    );
  }
));

Button.displayName = "Button";

export { Button };
export default Button;