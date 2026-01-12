import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface GlassInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "glass-input w-full px-4 py-3.5 text-foreground text-[15px] placeholder:text-muted-foreground outline-none",
          className
        )}
        {...props}
      />
    );
  }
);

GlassInput.displayName = "GlassInput";
