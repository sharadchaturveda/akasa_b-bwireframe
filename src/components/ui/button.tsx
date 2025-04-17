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
          "group inline-flex items-center justify-center rounded-md text-sm font-montserrat font-medium tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden shadow-md hover:shadow-lg",
          variant === "default" && "bg-white text-black hover:bg-gray-100",
          variant === "outline" && "border border-white text-white hover:bg-white/10",
          showArrow && "pr-12",
          className
        )}
        ref={ref}
        {...props}
      >
        <span className="flex-1 text-center px-6 py-3 font-medium tracking-wide">{children}</span>
        {showArrow && (
          <span className="absolute right-0 w-12 h-full bg-black/10 flex items-center justify-center group-hover:bg-black/20 transition-colors">
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