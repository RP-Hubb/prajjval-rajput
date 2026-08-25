"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useCursor } from "@/context/CursorContext";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { setCursorType } = useCursor();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8" />;
  }

  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      onMouseEnter={() => setCursorType("hover")}
      onMouseLeave={() => setCursorType("default")}
      className="relative flex items-center justify-center w-10 h-10 border-2 border-border bg-card text-foreground transition-all duration-300 hover:border-accent hover:brutalist-shadow-hover overflow-hidden group focus:outline-none"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          y: isDark ? 0 : -40,
          opacity: isDark ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute"
      >
        <Moon size={20} className="group-hover:text-accent transition-colors" />
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          y: isDark ? 40 : 0,
          opacity: isDark ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute"
      >
        <Sun size={20} className="group-hover:text-accent transition-colors" />
      </motion.div>
    </button>
  );
}
