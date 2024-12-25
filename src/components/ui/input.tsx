import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-lg border transition-all duration-200",
          "bg-white/50 backdrop-blur-sm border-gray-200/30",
          "px-4 py-2 text-base text-gray-800",
          "placeholder:text-gray-400",
          // Focus states
          "focus:border-purple-300/50 focus:bg-white/70",
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-purple-400/30 focus-visible:ring-offset-2",
          "focus-visible:ring-offset-transparent",
          // Hover states
          "hover:border-purple-200/40 hover:bg-white/60",
          // Disabled states
          "disabled:cursor-not-allowed disabled:opacity-50",
          // File input specifics
          "file:border-0 file:bg-transparent",
          "file:text-sm file:font-medium",
          "file:text-gray-700",
          // Responsive text size
          "md:text-sm",
          // Shadow effects
          "shadow-sm",
          // Allow custom classes to override
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
