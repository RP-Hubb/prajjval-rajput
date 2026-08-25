import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap font-mono text-sm uppercase tracking-wider font-bold transition-all disabled:pointer-events-none disabled:opacity-50";
    
    const variants = {
      default: "bg-foreground text-background border-2 border-foreground hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_var(--color-accent)] active:translate-x-0 active:translate-y-0 active:shadow-none",
      outline: "border-2 border-border bg-transparent hover:border-accent hover:text-accent hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_var(--color-accent)] active:translate-x-0 active:translate-y-0 active:shadow-none",
      ghost: "hover:bg-accent/10 hover:text-accent",
      link: "text-foreground underline-offset-4 hover:underline",
    };
    
    const sizes = {
      default: "h-12 px-6 py-2",
      sm: "h-10 px-4 text-xs",
      lg: "h-14 px-10 text-base",
      icon: "h-12 w-12",
    };

    return (
      <Comp
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
