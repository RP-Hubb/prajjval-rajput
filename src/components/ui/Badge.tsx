import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "accent";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const baseStyles = "inline-flex items-center px-2.5 py-0.5 font-mono text-xs font-bold uppercase tracking-widest transition-colors border-2";
  
  const variants = {
    default: "border-foreground bg-foreground text-background hover:bg-background hover:text-foreground",
    secondary: "border-border bg-card text-foreground hover:border-accent",
    destructive: "border-red-500 bg-red-500 text-white hover:bg-background hover:text-red-500",
    outline: "text-foreground border-border hover:border-accent hover:text-accent",
    accent: "border-accent bg-accent text-black hover:bg-background hover:text-accent",
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props} />
  )
}

export { Badge }
