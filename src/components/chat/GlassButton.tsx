import { forwardRef, ButtonHTMLAttributes } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "ghost" | "danger";

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "btn-primary text-primary-foreground font-medium",
  ghost: "btn-ghost text-foreground/90",
  danger: "btn-ghost btn-danger",
};

export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant = "primary", children, disabled, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "px-5 py-3.5 text-[15px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all",
          variantClasses[variant],
          className
        )}
        disabled={disabled}
        {...(props as any)}
      >
        {children}
      </motion.button>
    );
  }
);

GlassButton.displayName = "GlassButton";
